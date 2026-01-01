import { safeClick } from "../core/utils.js";

/**
 * 量子計算の自動クリック：実測振幅適応版
 */
export function runQuantumComputing() {
  const container = document.getElementById("qComputing");
  if (!container || container.style.display === "none") return;

  const chips = container.getElementsByClassName("qChip");
  let totalAmplitude = 0;
  let activeCount = 0;

  for (let chip of chips) {
    // 1. アクティブなチップのみ計算対象とする
    if (window.getComputedStyle(chip).display !== "none") {
      // 2. DOMのstyle属性から直接数値を抽出（負の値もそのまま取得）
      const opacity = parseFloat(chip.style.opacity);
      if (!isNaN(opacity)) {
        totalAmplitude += opacity;
        activeCount++;
      }
    }
  }

  if (activeCount === 0) return;

  // 3. 物理モデルに基づいた判定
  // qOps ∝ sum(cos(wt))。全チップの振幅の和が「山（正のピーク）」の時だけ叩く
  // 借金返済中なので、閾値は厳しめに設定（アクティブ数の 60〜80% 以上）
  const threshold = activeCount * 0.7;

  if (totalAmplitude > threshold) {
    const btn = document.getElementById("btnQcompute");
    if (btn && !btn.disabled) {
      btn.click();
      // コンソールで干渉の状態を確認
      // console.log(`[Quantum] Interference Peak: ${totalAmplitude.toFixed(2)} / ${activeCount}`);
    }
  }
}