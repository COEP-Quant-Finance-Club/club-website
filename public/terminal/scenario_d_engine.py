"""
Scenario D: Causal Predictive Regime Forecasting Engine
========================================================
Production implementation of the zero-lookahead predictive regime strategy:
- Feature generation (causal momentum, volatility, and HMM forward posteriors).
- Logistic Regression HMM State predictor trained on rolling historical window.
- Out-of-sample execution simulator with inverse-volatility risk parity sizing.
"""

import os
import sys
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
import warnings

warnings.filterwarnings("ignore")

# Static HMM parameter definitions (Gaussian 3-State HMM emissions & transitions)
HMM_MEANS = np.array([-0.2, 0.0, 0.2])
HMM_COVS  = np.array([0.8, 0.3, 0.6])
HMM_TRANS = np.array([
    [0.85, 0.10, 0.05],
    [0.10, 0.80, 0.10],
    [0.05, 0.15, 0.80]
])

def compute_hmm_posteriors_production(rets: np.ndarray) -> np.ndarray:
    n = len(rets)
    posteriors = np.zeros((n, 3))
    posteriors[:20, 1] = 1.0 # Neutral warmup

    for t in range(20, n):
        obs = rets[t]
        liks = 1.0 / (np.sqrt(2 * np.pi * HMM_COVS)) * np.exp(-0.5 * ((obs - HMM_MEANS) ** 2) / HMM_COVS)
        prior = posteriors[t-1] @ HMM_TRANS
        post = prior * liks
        post_sum = post.sum()
        posteriors[t] = post / post_sum if post_sum > 1e-12 else np.array([0.0, 1.0, 0.0])

    return posteriors

class ScenarioDEngine:
    def __init__(self, forecast_horizon=4, max_slots=10, leverage=1.3):
        self.forecast_horizon = forecast_horizon
        self.max_slots = max_slots
        self.leverage = leverage
        self.clf = LogisticRegression(class_weight="balanced", random_state=42)

    def extract_features(self, rets: np.ndarray, posteriors: np.ndarray) -> tuple:
        mom5  = pd.Series(rets).rolling(5, min_periods=1).sum().values
        mom20 = pd.Series(rets).rolling(20, min_periods=1).sum().values
        std10 = pd.Series(rets).rolling(10, min_periods=1).std().fillna(0.1).values
        std40 = pd.Series(rets).rolling(40, min_periods=1).std().fillna(0.1).values
        
        # Combine into feature matrix [n, 7]
        features = np.column_stack([
            mom5, mom20, std10, std40,
            posteriors[:, 0], posteriors[:, 1], posteriors[:, 2]
        ])
        return features, std40

    def fit_predictor(self, processed_stocks: dict):
        X_train, y_train = [], []
        
        for sym, stk in processed_stocks.items():
            closes = stk["closes"]
            n = len(closes)
            if n < 200:
                continue
                
            train_len = int(n * 0.67)
            rets = stk["rets"]
            posteriors = stk["posteriors"]
            
            features, _ = self.extract_features(rets, posteriors)
            raw_s = np.argmax(posteriors, axis=1)
            future_s = np.roll(raw_s, -self.forecast_horizon)
            
            for t in range(40, train_len - self.forecast_horizon):
                X_train.append(features[t])
                y_train.append(1 if future_s[t] == 2 else 0)
                
        X_train = np.array(X_train)
        y_train = np.array(y_train)
        
        if len(X_train) > 0:
            self.clf.fit(X_train, y_train)
            return True
        return False

    def predict_state(self, features_t: np.ndarray) -> tuple:
        """
        Predicts future state probability and binary class at time t.
        """
        feat = features_t.reshape(1, -1)
        pred = self.clf.predict(feat)[0]
        prob = self.clf.predict_proba(feat)[0][1]
        return pred, prob
