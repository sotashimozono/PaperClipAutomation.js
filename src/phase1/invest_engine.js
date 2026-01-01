import { getValSafe, safeClick, getFundsSafe } from "../core/utils.js";

/**
 * 投資エンジンの自動制御
 */
export function runInvestEngine() {
  const funds = getFundsSafe();
  const investCash = getValSafe("investmentBankroll"); // 投資に回っている現金
  const yomi = getValSafe("InvestUpgradeCost");
  // 手元の資金が $1,000 以上あるなら、その 50% を投資に回す
  if (funds > 1000) {
    safeClick("btnInvestDeposit");
  }

  // 2. エンジンのアップグレード（Yomiを使用）
  // 3枚目の画像にある "Upgrade Investment Engine" ボタン
  const upgradeCostMatch = document
    .getElementById("btnImproveInvestments")
    ?.innerText.match(/([\d,]+)/);
  if (upgradeCostMatch) {
    const cost = parseInt(upgradeCostMatch[1].replace(/,/g, ""));
    if (yomi >= cost) {
      safeClick("btnImproveInvestments");
    }
  }

  // 3. 投資戦略の切り替え
  // 資金が増えてきたら "High Risk" に切り替えて複利を加速させる
  const stratSelect = document.getElementById("investStrat");
  if (stratSelect) {
    if (investCash > 100000 && stratSelect.value !== "high") {
      stratSelect.value = "high"; // 高リスク・高リターン設定
    } else if (investCash < 100 && stratSelect.value !== "low") {
      stratSelect.value = "low"; // 安全運転
    }
  }
}
