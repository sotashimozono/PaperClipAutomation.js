import { safeClick } from "../core/utils.js";

/**
 * 量子計算の自動クリック（活性化自由度追従型）
 */
export function runQuantumComputing() {
  const qComp = document.getElementById("qComputing");
  if (!qComp || qComp.style.display === "none") return;

  const allPhotons = qComp.getElementsByClassName("qChip");
  let activePhotons = [];
  let currentTotalOpacity = 0;

  // 1. 表示されている（計算に寄与している）チップだけを抽出
  for (let p of allPhotons) {
    if (window.getComputedStyle(p).display !== "none") {
      activePhotons.push(p);
      currentTotalOpacity += parseFloat(window.getComputedStyle(p).opacity);
    }
  }

  const n = activePhotons.length; // 実際に動いているチップ数
  if (n === 0) return;

  // 2. 物理モデルに基づいた動的しきい値
  // 全ての cos が 1 に近い「強め合いの干渉」の瞬間を狙う
  // 借金返済中は 0.9 (90%) 程度に設定し、確実にプラスを狙うのが Robust
  const thresholdRatio = 0.9; 
  const dynamicThreshold = n * thresholdRatio;

  if (currentTotalOpacity > dynamicThreshold) {
    const btn = document.getElementById("btnQcompute");
    if (btn && !btn.disabled) {
      btn.click();
      // デバッグ用：干渉の強さを表示
      // console.log(`[Quantum] Coherence: ${(currentTotalOpacity/n*100).toFixed(1)}% (N=${n})`);
    }
  }
}