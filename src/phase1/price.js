import { safeClick } from "../core/utils.js";
import { CONFIG } from "../core/config.js";

let lastPriceChange = Date.now();
const PRICE_COOLDOWN = CONFIG.MAIN_TICK / 4;

/**
 * 在庫量に基づいた動的価格調整
 * 目標：生産速度の10秒分程度の在庫を維持し、利益を最大化する
 */
export function optimize_price(unsold, demand, clipRate, funds, wireCost) {
  const now = Date.now();
  if (now - lastPriceChange < PRICE_COOLDOWN) return;

  const priceEl = document.getElementById("margin");
  if (!priceEl) return;
  const currentPrice = parseFloat(priceEl.innerText.replace("$ ", ""));

  // 1. 目標在庫の設定（定常状態の維持）
  // I_target = 10秒分の生産量。ただし最低500個は確保
  let I_target = (CONFIG.MAIN_TICK * clipRate) / 1000;
  const targetInventory = Math.max(I_target, 500);

  // 2. 在庫フィードバックによる価格スキャン
  if (unsold > targetInventory) {
    // 在庫過多：需要不足。価格を下げて J_out を増やす
    if (currentPrice > CONFIG.SAFE_PRICE_FLOOR) {
      if (safeClick("btnLowerPrice")) {
        lastPriceChange = now;
        console.log(`[Price] Down: Inventory(${unsold}) is too high.`);
      }
    }
  } else if (unsold < targetInventory && demand > 0) {
    // 在庫不足：需要過多。価格を上げて単価利益を最大化する
    if (safeClick("btnRaisePrice")) {
      lastPriceChange = now;
      console.log(`[Price] Up: Scrutinizing higher profit margin.`);
    }
  }
}
