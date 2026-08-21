"""
Module 7: Risk-Parity & Volatility Portfolio Allocator
======================================================
Architecture:
1. Calculates 20-day rolling annualized volatility (\sigma_i) for active stocks.
2. Implements Inverse Volatility Weighting: w_i \propto 1 / \sigma_i
3. Implements Fundamental Risk-Parity Weighting: w_i \propto Score_i / \sigma_i
4. Dynamically rescales active position sizes so low-volatility compounders receive higher weight,
   reducing overall portfolio drawdown and boosting Sharpe Ratio.
"""

import numpy as np
import pandas as pd

def calculate_rolling_volatility(close_series: np.ndarray, window: int = 20) -> np.ndarray:
    """Calculates 20-day rolling annualized volatility for a stock close price series."""
    if len(close_series) < window:
        return np.full(len(close_series), 0.20)
    rets = pd.Series(close_series).pct_change().fillna(0)
    vol = rets.rolling(window, min_periods=5).std().fillna(0.02).values * np.sqrt(252.0)
    return np.clip(vol, 0.05, 1.5)

def calculate_inverse_volatility_weights(volatilities: dict[str, float]) -> dict[str, float]:
    """Weights active stocks inversely proportional to their rolling volatility."""
    if not volatilities:
        return {}
    if len(volatilities) == 1:
        return {list(volatilities.keys())[0]: 1.0}
    inv_vols = {sym: 1.0 / max(vol, 0.05) for sym, vol in volatilities.items()}
    tot = sum(inv_vols.values())
    return {sym: iv / tot for sym, iv in inv_vols.items()}

def calculate_fundamental_risk_parity_weights(
    volatilities: dict[str, float],
    fundamental_scores: dict[str, float]
) -> dict[str, float]:
    """Weights active stocks proportional to Fundamental Score / Volatility."""
    if not volatilities:
        return {}
    if len(volatilities) == 1:
        return {list(volatilities.keys())[0]: 1.0}
    frp_vals = {}
    for sym, vol in volatilities.items():
        score = fundamental_scores.get(sym, 30.0)
        frp_vals[sym] = max(score, 1.0) / max(vol, 0.05)
    tot = sum(frp_vals.values())
    return {sym: frp / tot for sym, frp in frp_vals.items()}
