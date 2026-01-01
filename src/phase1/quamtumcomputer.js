import { safeClick } from "../core/utils.js";

/**
 * 量子計算の自動クリック
 */
export function runQuantumComputing() {
  const qComp = document.getElementById("qComputing");
  if (!qComp || qComp.style.display === "none") return;

  const photons = qComp.getElementsByClassName("qChip");
  const nChips = photons.length;
  let totalOpacity = 0;

  for (let p of photons) {
    totalOpacity += parseFloat(window.getComputedStyle(p).opacity);
  }

  const thresholdRatio = 0.65;
  const dynamicThreshold = nChips * thresholdRatio;

  if (totalOpacity > 0.8) {
    safeClick("btnQcompute");
  }
}
