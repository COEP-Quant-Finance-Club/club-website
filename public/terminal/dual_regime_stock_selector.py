"""
Module 5: Dual-Regime Stock Selection Matrix (Macro Sector + Micro Stock)
==========================================================================
Architecture:
- Entry Gatekeeper: Requires BOTH Sector Index (S_Sector = 2) AND Stock Price (S_Stock = 2) to be Bullish.
- Execution: Next-Day Open (O_t) based on Yesterday's Close (C_{t-1}) signals (Zero-Lookahead Bias).

Scenarios Tested:
1. Scenario 1 (User's Scenario A: Sector-Governed Exit):
   - Entry: S_Sector_{t-1} == 2 AND S_Stock_{t-1} == 2.
   - Exit: S_Sector_{t-1} in {0, 1} (Sector Index exits Bullish state).

2. Scenario 2 (User's Scenario B: Stock-Governed Exit):
   - Entry: S_Sector_{t-1} == 2 AND S_Stock_{t-1} == 2.
   - Exit: S_Stock_{t-1} in {0, 1} (Stock's OWN price exits Bullish state).
"""

import os
import glob
import logging
import numpy as np
import pandas as pd
from pathlib import Path

LOG = logging.getLogger(__name__)

def compute_raw_3state(close_series: np.ndarray) -> np.ndarray:
    """Discretizes close prices into 3 macro states (0=Bearish, 1=Neutral, 2=Bullish)."""
    n = len(close_series)
    if n < 5:
        return np.ones(n, dtype=int)
    rets = np.zeros(n)
    rets[1:] = np.diff(close_series) / (close_series[:-1] + 1e-6) * 100.0
    mom3 = pd.Series(rets).rolling(3, min_periods=1).sum().values
    quantiles = np.percentile(mom3, np.linspace(0, 100, 8))
    quantiles[0] -= 1e-5
    quantiles[-1] += 1e-5
    causal_7state = np.clip(np.digitize(mom3, quantiles) - 1, 0, 6)
    return np.where(causal_7state <= 2, 0, np.where(causal_7state >= 4, 2, 1))

def apply_hysteresis_smoothing(raw_states: np.ndarray, k: int) -> np.ndarray:
    """Applies hysteresis smoothing over window k."""
    if k <= 1:
        return raw_states.copy()
    half = k // 2
    n = len(raw_states)
    smoothed = np.zeros(n, dtype=int)
    for i in range(n):
        s = max(0, i - half)
        e = min(n, i + half + 1)
        smoothed[i] = int(np.median(raw_states[s:e]))
    return smoothed

def backtest_single_stock_dual_regime(
    stock_df: pd.DataFrame,
    sector_df: pd.DataFrame,
    k: int = 7,
    scenario: str = "scenario_1"
) -> pd.DataFrame:
    """
    Simulates Next-Day Open execution for a single stock against its sector index.
    
    scenario_1 (Sector Exit): Entry when S_Sec==2 & S_Stk==2. Exit when S_Sec != 2.
    scenario_2 (Stock Exit):  Entry when S_Sec==2 & S_Stk==2. Exit when S_Stk != 2.
    """
    common_idx = stock_df.index.intersection(sector_df.index)
    if len(common_idx) < 20:
        return pd.DataFrame()
    
    stk = stock_df.loc[common_idx].copy().sort_index()
    sec = sector_df.loc[common_idx].copy().sort_index()
    
    stk_closes = stk["Close"].values
    stk_opens = stk["Open"].values if "Open" in stk.columns else stk_closes
    sec_closes = sec["Close"].values
    
    n = len(common_idx)
    
    raw_stk = compute_raw_3state(stk_closes)
    raw_sec = compute_raw_3state(sec_closes)
    
    s_stk = apply_hysteresis_smoothing(raw_stk, k)
    s_sec = apply_hysteresis_smoothing(raw_sec, k)
    
    position = np.zeros(n, dtype=int)
    daily_ret = np.zeros(n)
    
    curr_pos = 0
    for i in range(1, n):
        prev_stk = s_stk[i-1]
        prev_sec = s_sec[i-1]
        
        # Check Entry & Exit rules on Yesterday's Close (i-1)
        if curr_pos == 0:
            if prev_sec == 2 and prev_stk == 2:
                curr_pos = 1
                # Entry Day return: Open to Close
                daily_ret[i] = (stk_closes[i] - stk_opens[i]) / stk_opens[i]
        else:
            # Holding position
            if scenario == "scenario_1":
                # Exit when Sector leaves Bullish
                exit_signal = (prev_sec != 2)
            else: # scenario_2
                # Exit when Stock leaves Bullish
                exit_signal = (prev_stk != 2)
                
            if exit_signal:
                curr_pos = 0
                # Exit Day return: Yesterday Close to Today Open
                daily_ret[i] = (stk_opens[i] - stk_closes[i-1]) / stk_closes[i-1]
            else:
                # Full holding return: Yesterday Close to Today Close
                daily_ret[i] = (stk_closes[i] - stk_closes[i-1]) / stk_closes[i-1]
                
        position[i] = curr_pos
        
    result = pd.DataFrame({
        "Close": stk_closes,
        "Open": stk_opens,
        "S_Sector": s_sec,
        "S_Stock": s_stk,
        "Position": position,
        "Strategy_Return": daily_ret,
        "BH_Return": np.insert(np.diff(stk_closes) / stk_closes[:-1], 0, 0.0)
    }, index=common_idx)
    
    return result
