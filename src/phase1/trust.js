import { sleep } from "../core/utils.js";

function getMinRequiredOps() {
  const projects = document.getElementsByClassName("projectButton");
  let minOps = Infinity;
  let found = false;
  for (let btn of projects) {
    if (btn.style.display !== "none") {
      const text = btn.innerText;
      const match = text.match(/([\d,]+)\s+ops/);
      if (match) {
        const ops = parseInt(match[1].replace(/,/g, ""));
        if (ops < minOps) {
          minOps = ops;
          found = true;
        }
      }
    }
  }
  return found ? minOps : 1000;
}

export async function runTrustLogic() {
  const btnMem = document.getElementById("btnAddMem");
  const btnProc = document.getElementById("btnAddProc");
  const opsEl =
    document.getElementById("maxOps") ||
    document.getElementById("maxOperations");
  if (!opsEl) return;

  let currentMaxOps = parseInt(
    opsEl.innerText.split("/")[1]?.replace(/,/g, "") ||
      opsEl.innerText.replace(/,/g, ""),
  );
  const minRequired = getMinRequiredOps();

  let iterations = 0;
  while (iterations < 20) {
    const canMem =
      btnMem && !btnMem.disabled && btnMem.style.display !== "none";
    const canProc =
      btnProc && !btnProc.disabled && btnProc.style.display !== "none";

    if (!canMem && !canProc) break;

    if (canMem && currentMaxOps < minRequired) {
      btnMem.click();
      currentMaxOps += 1000;
      console.log(`[Trust] Memory -> Target: ${minRequired}`);
    } else if (canProc) {
      btnProc.click();
      console.log("[Trust] Processor added.");
    } else {
      break;
    }

    await sleep(10);
    iterations++;
  }
}
