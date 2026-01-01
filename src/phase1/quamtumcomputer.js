import { safeClick } from "./utils.js";
import { CONFIG } from "../core/config.js";

/**
 * 量子計算の自動クリック
 */
export function runQuantumComputing() {
    const qComp = document.getElementById("qComputing");
    if (!qComp || qComp.style.display === "none") return;

    const photons = qComp.getElementsByClassName("qChip");
    let totalOpacity = 0;

    for (let p of photons) {
        totalOpacity += parseFloat(window.getComputedStyle(p).opacity);
    }

    if (totalOpacity > 0) {
        safeClick("btnQcompute");
    }
}

export function startQuantumLoop() {
  // すでに動いている場合は停止
  if (window.quantumLoopId) clearInterval(window.quantumLoopId);

  // 100ms(0.1秒)間隔で量子計算をチェック
  window.quantumLoopId = setInterval(() => {
    runQuantumComputing();
  }, CONFIG.CLICK_TICK);
}