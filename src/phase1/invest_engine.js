import { getValSafe, safeClick, getFundsSafe } from "../core/utils.js";

/**
 * 投資エンジンの自動制御
 */
export function runInvestEngine() {
  const funds = getFundsSafe();
  const investCash = getValSafe("investmentBankroll");

  // 1. 所持 Yomi と アップグレードコストを正しく取得
  const currentYomi = getValSafe("yomiDisplay");
  const upgradeCost = getValSafe("investUpgradeCost");

  // 資金を投資に回す
  if (funds > 1000) {
    safeClick("btnInvest");
  }

  const upgradeBtn = document.getElementById("btnImproveInvestments");
  if (upgradeBtn && !upgradeBtn.disabled && currentYomi >= upgradeCost) {
    safeClick("btnImproveInvestments");
    console.log(`[Invest] Upgraded! Next cost: ${upgradeCost}`);
  }

  // 3. リスク管理
  const stratSelect = document.getElementById("investStrat");
  if (stratSelect && investCash > 1000000) {
    stratSelect.value = "high"; // 100万ドル超えたらハイリスクへ
  }
}
/**
 * 戦略モデリング（Yomi稼ぎ）の自動化
 */
export function runStrategicModeling() {
  const stratDiv = document.getElementById("strategyEngine");
  if (!stratDiv || stratDiv.style.display === "none") return;

  const picker = document.getElementById("stratPicker");
  if (picker) {
    if (picker.value === "10") {
      picker.value = "1";
    }
  }
  // 2. トーナメントの実行
  // Ops が 4,000 以上貯まったら自動で実行
  const newTournBtn = document.getElementById("btnNewTournament");
  if (newTournBtn && !newTournBtn.disabled) {
    newTournBtn.click();
    document.getElementById("btnRunTournament").click();
    console.log("[Yomi] Started New Tournament");
  }
}
