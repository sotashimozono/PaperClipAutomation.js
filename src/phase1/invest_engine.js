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
/**
 * 戦略モデリング（Yomi稼ぎ）の自動化
 */
export function runStrategicModeling() {
  const stratDiv = document.getElementById("strategicModelingContainer");
  if (!stratDiv || stratDiv.style.display === "none") return;

  // 1. 戦略を 'TIT FOR TAT'（しっぺ返し戦略）に固定
  // これが最も安定して Yomi を稼げます
  const picker = document.getElementById("stratPicker");
  if (picker) {
    // まだ TIT FOR TAT がない場合は GREEDY (強欲) を選択
    // 解放されたら "1" (TIT FOR TAT) に切り替えるのが効率的です
    if (picker.value === "10") { // 10 はデフォルトの "Pick a Strat"
      picker.value = "GREEDY";
    }
  }
  // 2. トーナメントの実行
  // Ops が 4,000 以上貯まったら自動で実行
  const newTournBtn = document.getElementById("btnNewTournament");
  if (newTournBtn && !newTournBtn.disabled) {
    newTournBtn.click();
    console.log("[Yomi] Started New Tournament");
  }
}