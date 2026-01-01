import { runPhase1Logic } from "./phase1/main_phase1.js";
// import { runPhase2Logic } from './phase2/main_phase2.js';

function mainEngine() {
  const busDiv = document.getElementById("businessDiv");
  const factoryDiv = document.getElementById("factoryDiv");

  if (busDiv && busDiv.style.display !== "none") {
    runPhase1Logic();
  } else if (factoryDiv && factoryDiv.style.display !== "none") {
    // runPhase2Logic();
  }
}
export function init() {
  if (window.mainLoopId) clearInterval(window.mainLoopId);
  if (window.clickLoopId) clearInterval(window.clickLoopId);

  window.clickLoopId = setInterval(() => {
    const btn = document.getElementById("btnMakePaperclip");
    if (btn && !btn.disabled) btn.click();
  }, 10);

  window.mainLoopId = setInterval(mainEngine, 5000);

  console.log("PaperClip Automation: Dispatcher Engine Started.");
}

window.PaperClipAutomation = { init };

/**
 * ゲームの時間を加速させるハック
 * @param {number} multiplier 倍率（3.0なら3倍速）
 */
function activateTimeWarp(multiplier) {
  if (window.isTimeWarpActive) return;
  window.isTimeWarpActive = true;

  const originalST = window.setTimeout;
  const originalSI = window.setInterval;

  // ブラウザのタイマー関数を上書きして待ち時間を短縮する
  window.setTimeout = function (fn, delay, ...args) {
    return originalST(fn, delay / multiplier, ...args);
  };
  window.setInterval = function (fn, delay, ...args) {
    return originalSI(fn, delay / multiplier, ...args);
  };
  
  console.log(`%c[Time Warp] Speed set to ${multiplier}x`, "color: #ff00ff; font-weight: bold;");
}
