"""
Module 6: Multi-Factor Fundamental Quality Scorer Integration
================================================================
Architecture:
- Loads Hedge Fund Scores from scored_csv/*.csv.
- Ranks constituent stocks by Combined Score.
- Filters dual-bullish stocks to Top N (e.g., Top 3 to Top 5) per sector.
- Applies fundamental score weighting (w_i proportional to Score_i).
"""

import os
import glob
import logging
import numpy as np
import pandas as pd
from pathlib import Path

LOG = logging.getLogger(__name__)

def load_sector_fundamental_scores(scored_csv_dir: str) -> dict[str, pd.DataFrame]:
    """Loads all sector_scored.csv files and returns a dictionary of symbol -> score mappings per sector."""
    scores_by_sector = {}
    csv_files = glob.glob(os.path.join(scored_csv_dir, "*_scored.csv"))
    
    for fpath in csv_files:
        sec_name = os.path.basename(fpath).replace("_scored.csv", "").strip()
        if sec_name in ["scoring_manifest", "global_ranking", "top_bottom_20"]:
            continue
        try:
            df = pd.read_csv(fpath)
            if "Symbol" in df.columns and "Combined Score" in df.columns:
                df_clean = df.dropna(subset=["Symbol", "Combined Score"]).copy()
                scores_by_sector[sec_name] = df_clean.set_index("Symbol")[["Combined Score", "Hedge Fund Score"]]
        except Exception as e:
            LOG.warning(f"Could not load scores for {sec_name}: {e}")
            
    return scores_by_sector

def filter_top_n_fundamental_stocks(
    sector_stocks: list[str],
    sector_scores_df: pd.DataFrame,
    top_n: int = 3
) -> list[str]:
    """
    Given a list of currently dual-bullish stock symbols in a sector,
    returns the top_n symbols sorted by fundamental Combined Score.
    """
    if not sector_stocks:
        return []
    if sector_scores_df is None or sector_scores_df.empty:
        # Fallback to all active dual-bullish stocks if scores unavailable
        return sector_stocks[:top_n]
        
    avail_scores = []
    for sym in sector_stocks:
        if sym in sector_scores_df.index:
            score = float(sector_scores_df.at[sym, "Combined Score"])
        else:
            score = 30.0 # Default baseline for unranked stocks
        avail_scores.append((sym, score))
        
    avail_scores.sort(key=lambda x: x[1], reverse=True)
    return [sym for sym, score in avail_scores[:top_n]]

def calculate_fundamental_weights(
    selected_symbols: list[str],
    sector_scores_df: pd.DataFrame
) -> dict[str, float]:
    """Calculates capital weights proportional to fundamental score."""
    if not selected_symbols:
        return {}
    if len(selected_symbols) == 1:
        return {selected_symbols[0]: 1.0}
        
    scores = []
    for sym in selected_symbols:
        if sector_scores_df is not None and sym in sector_scores_df.index:
            s = float(sector_scores_df.at[sym, "Combined Score"])
        else:
            s = 30.0
        scores.append(max(s, 1.0))
        
    total_score = sum(scores)
    return {sym: s / total_score for sym, s in zip(selected_symbols, scores)}
