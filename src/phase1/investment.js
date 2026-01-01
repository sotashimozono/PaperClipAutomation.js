import { getValSafe, safeClick } from '../core/utils.js';

/**
 * 資金の分配最適化
 */
export function optimizeInvestment(funds, unsold, clipRate) {
    const wireCost = getValSafe('wireCost');
    const adCost = getValSafe('adCost');
    const megaCost = getValSafe('megaClippersCost');
    const clipperCost = getValSafe('clipperCost');
    
    // 針金代（安全マージン）を確保
    let budget = funds - (wireCost * 10);
    if (budget <= 0) return;

    // --- 門番ロジック：供給過剰の判定 ---
    // 在庫が生産速度の5秒分を超えているなら、需要喚起（Marketing）のみ許可
    const isSupplyOverwhelming = unsold > (clipRate * 5);
    
    if (isSupplyOverwhelming) {
        if (adCost && budget >= adCost) {
            safeClick('btnExpandMarketing');
        }
        return; // Clipper購入をスキップ
    }

    // --- 通常投資：効率の高い方から購入 ---
    if (megaCost && budget >= megaCost) {
        safeClick('btnBuyMegaClipper');
    } else if (clipperCost && budget >= clipperCost) {
        safeClick('btnMakeClipper');
    }
    
    if (adCost && budget >= adCost) {
        safeClick('btnExpandMarketing');
    }
}