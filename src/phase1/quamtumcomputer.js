import { safeClick } from "../core/utils.js";

/**
 * 量子計算の自動クリック：不透明度ベース活性化判定版
 */
export function runQuantumComputing() {
  const container = document.getElementById("qComputing");
  if (!container || container.style.display === "none") return;

  const chips = container.getElementsByClassName("qChip");
  let totalAmplitude = 0;
  let activeCount = 0;

  for (let chip of chips) {
    const opacity = parseFloat(chip.style.opacity);
    if (!isNaN(opacity) && Math.abs(opacity) > 0.0001) {
      totalAmplitude += opacity;
      activeCount++;
    }
  }

  if (activeCount === 0) return;

  // 判定ロジック：全アクティブチップの振幅の和が最大値の 60% を超えた瞬間
  const threshold = activeCount * 0.6;

  if (totalAmplitude > threshold) {
    const btn = document.getElementById("btnQcompute");
    if (btn && !btn.disabled) {
      btn.click();
    }
  }
}