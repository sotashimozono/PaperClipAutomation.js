import { getValSafe, safeClick, getFundsSafe } from "../core/utils.js";
import { CONFIG } from "../core/config.js";

import { optimize_price } from "./price.js";
import { optimizeInvestment } from "./investment.js";
import { runTrustLogic } from "./trust.js";
import { ProjectManager } from "./projects.js";
import { runInvestEngine } from "./invest_engine.js";

export function runPhase1Logic() {
  const unsold = getValSafe("unsoldClips");
  const demand = getValSafe("demand");
  const clipRate = getValSafe("clipmakerRate");
  const funds = getFundsSafe();
  const wire = getValSafe("wire");
  const wireCost = getValSafe("wireCost");

  ProjectManager.executeAll();
  runTrustLogic();
  optimizeInvestment(funds, unsold, clipRate);

  if (wire !== null && wire < CONFIG.WIRE_RESERVE && funds >= wireCost) {
    safeClick("btnBuyWire");
  }
  optimize_price(unsold, demand, clipRate, funds, wireCost);
  runInvestEngine();
}