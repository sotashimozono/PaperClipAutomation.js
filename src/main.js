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