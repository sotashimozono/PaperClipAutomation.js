import { getValSafe, safeClick } from "../core/utils.js";
import { CONFIG } from "../core/config.js";

/**
 * 資金の分配最適化
 */
export function optimizeInvestment(funds, unsold, clipRate) {
  const wireCost = getValSafe("wireCost");
  const adCost = getValSafe("adCost");
  const megaCost = getValSafe("megaClippersCost");
  const clipperCost = getValSafe("clipperCost");

  // 針金代（安全マージン）を確保
  let wireReserve = (CONFIG.MAIN_TICK / 1000) * wireCost * 2;
  let budget = funds - wireReserve;
  if (budget <= 0) return;

  // 在庫が生産速度の5秒分を超えているなら、需要喚起（Marketing）のみ許可
  let targetInventory = (clipRate * CONFIG.MAIN_TICK) / 1000;
  const isSupplyOverwhelming = unsold > targetInventory;

  if (isSupplyOverwhelming) {
    if (adCost && budget >= adCost) {
      safeClick("btnExpandMarketing");
    }
  }

  // --- 通常投資：効率の高い方から購入 ---
  if (megaCost && budget >= megaCost) {
    safeClick("btnBuyMegaClipper");
  } else if (clipperCost && budget >= clipperCost) {
    safeClick("btnMakeClipper");
  }

  if (adCost && budget >= adCost) {
    safeClick("btnExpandMarketing");
  }
}
