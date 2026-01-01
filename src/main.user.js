// ==UserScript==
// @name         PaperClip Solver Automation
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate Universal Paperclips
// @author       Your Name
// @match        https://www.decisionproblem.com/paperclips/
// @grant        none
// @require      https://raw.githubusercontent.com/sotashimozono/PaperClipAutomation.js/main/src/solver.js
// ==/UserScript==

(function() {
    'use strict';
    console.log("Automation Loader Started");

    window.PAPERS_CONFIG = {
        MAIN_TICK: 5000,      // メインエンジンの周期 (ms)
        CLICK_TICK: 10,        // クリッカーの周期 (ms)
        WIRE_RESERVE: 500,     // 針金の在庫下限
        SAFE_PRICE_FLOOR: 0.05 // 最安値制限
    };
    // util functions
    const safeClick = (id) => {
        const el = document.getElementById(id);
        if (el && !el.disabled && el.style.display !== 'none') {
            el.click();
            return true;
        }
        return false;
    };
    const getValSafe = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        return parseInt(el.innerText.replace(/[^0-9.]/g, '')) || 0;
    };
    const getFundsSafe = () => {
        const el = document.getElementById('funds');
        if (!el) return 0;
        return parseFloat(el.innerText.replace('$', ''));
    };
    const sleep = ms => new Promise(res => setTimeout(res, ms));
    // meta datas
    window.historyStats = {
        lastUnsold: 0,
        lastTime: Date.now(),
        salesVelocity: 0,
        update: function(currentUnsold, clipRate) {
            const now = Date.now();
            const dt = (now - this.lastTime) / window.PAPERS_CONFIG.MAIN_TICK;
            if (dt > 0) {
                const dInventory = currentUnsold - this.lastUnsold;
                this.salesVelocity = Math.max(0, (clipRate || 0) - (dInventory / dt));
            }
            this.lastUnsold = currentUnsold;
            this.lastTime = now;
        }
    };

    // optimization of prices
    function optimize_price(unsold, demand, clipRate, funds, wireCost) {
        const priceEl = document.getElementById('margin');
        if (!priceEl) return;
        const currentPrice = parseFloat(priceEl.innerText.replace('$ ', ''));

        // --- 戦略A: 緊急現金化 (Flash Liquidation) ---
        // 針金を買う金がない、または在庫が生産の100秒分（1万個）を超えたら「投げ売り」
        if ((funds < wireCost * 2 && unsold > 0) || unsold > 10000) {
            // 在庫が捌けるまで、1チック内で最大5回まで一気に値下げ
            for(let i=0; i<5; i++) {
                if (parseFloat(document.getElementById('margin').innerText.replace('$ ', '')) > 0.01) {
                    safeClick('btnLowerPrice');
                }
            }
            console.warn("CRITICAL: Liquidating inventory for cash flow.");
            return;
        }

        // --- 戦略B: 目標販売速度（Flux）の維持 ---
        window.historyStats.update(unsold, clipRate);
        const salesRate = window.historyStats.salesVelocity;

        // 販売速度が生産速度を下回っている（J_out < J_in）なら、差の大きさに応じて調整
        if (salesRate < clipRate * 0.95) {
            safeClick('btnLowerPrice');
            // 在庫が極端に多い場合は、さらに追い打ちで下げる
            if (unsold > clipRate * 20) safeClick('btnLowerPrice'); 
        } 
        // 在庫がほぼゼロで、需要が勝っているなら上げる
        else if (unsold < clipRate * 0.5 && salesRate >= clipRate * 0.98) {
            safeClick('btnRaisePrice');
        }

        // 最低価格保証
        if (currentPrice <= window.PAPERS_CONFIG.SAFE_PRICE_FLOOR) safeClick('btnRaisePrice');
    }

    async function runTrustLogic() {
        const btnMem = document.getElementById('btnAddMem');
        const btnProc = document.getElementById('btnAddProc');
        const opsEl = document.getElementById('maxOps') || document.getElementById('maxOperations');
        if (!opsEl) return;

        let currentMaxOps = parseInt(opsEl.innerText.split('/')[1]?.replace(/,/g, '') || opsEl.innerText.replace(/,/g, ''));
        const minRequired = getMinRequiredOps();

        let iterations = 0;
        while (iterations < 20) {
            const canMem = btnMem && !btnMem.disabled && btnMem.style.display !== 'none';
            const canProc = btnProc && !btnProc.disabled && btnProc.style.display !== 'none';
            
            if (!canMem && !canProc) break;

            if (canMem && currentMaxOps < minRequired) {
                btnMem.click();
                console.log(`[Trust] Memory added. (Target: ${minRequired})`);
                currentMaxOps += 1000; 
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

    function getMinRequiredOps() {
        const projects = document.getElementsByClassName('projectButton');
        let minOps = Infinity; 
        let found = false;
        for (let btn of projects) {
            if (btn.style.display !== 'none') {
                const text = btn.innerText;
                // あなたの気づき：New Sloganなどの複合コストに対応
                const match = text.match(/([\d,]+)\s+ops/);
                if (match) {
                    const ops = parseInt(match[1].replace(/,/g, ''));
                    if (ops < minOps) { minOps = ops; found = true; }
                }
            }
        }
        return found ? minOps : 1000;
    }

    function optimize_investment(funds, unsold, clipRate) {
        const wireCost = getValSafe('wireCost');
        const adCost = getValSafe('adCost');
        const megaCost = getValSafe('megaClippersCost');
        const clipperCost = getValSafe('clipperCost');
        let budget = funds - (wireCost * 5);
        if (budget <= 0) return;

        // あなたの気づき：在庫がある時はMarketing以外買わせない「門番」
        const isSupplyOverwhelming = unsold > (clipRate * 5);
        if (isSupplyOverwhelming) {
            if (adCost && budget >= adCost) {
                safeClick('btnExpandMarketing');
            }
            return; // 生産への投資をロック
        }

        // 順調な時は効率優先で投資
        if (megaCost && budget >= megaCost) {
            safeClick('btnBuyMegaClipper');
        } else if (clipperCost && budget >= clipperCost) {
            safeClick('btnMakeClipper');
        }
        if (adCost && budget >= adCost) safeClick('btnExpandMarketing');
    }
    // --- 4. メインエンジン・Phaseロジック ---
    function runPhase1Logic() {
        const unsold = getValSafe('unsoldClips');
        const demand = getValSafe('demand');
        const clipRate = getValSafe('clipRate');
        const funds = getFundsSafe();
        const wire = getValSafe('wire');
        const wireCost = getValSafe('wireCost');

        // 針金購入
        if (wire !== null && wire < window.PAPERS_CONFIG.WIRE_RESERVE && funds >= wireCost) {
            safeClick('btnBuyWire');
        }

        optimize_price(unsold, demand, clipRate, funds, wireCost);
        runTrustLogic();
        optimize_investment(funds, unsold, clipRate);
        // プロジェクト実行
        const projects = document.getElementsByClassName('projectButton');
        for (let btn of projects) {
            if (!btn.disabled && btn.style.display !== 'none') btn.click();
        }
    }

    // --- 5. 実行制御 ---
    function mainEngine() {
        const busDiv = document.getElementById('businessDiv');
        if (busDiv && busDiv.style.display !== 'none') {
            runPhase1Logic();
        }
    }

    // 既存ループのクリーニング
    if (window.mainLoopId) clearInterval(window.mainLoopId);
    if (window.clickLoopId) clearInterval(window.clickLoopId);

    // 起動
    window.clickLoopId = setInterval(() => {
        const btn = document.getElementById('btnMakePaperclip');
        if (btn && !btn.disabled) btn.click();
    }, window.PAPERS_CONFIG.CLICK_TICK);

    window.mainLoopId = setInterval(mainEngine, window.PAPERS_CONFIG.MAIN_TICK);

    console.log(`Engine Started. Main Tick: ${window.PAPERS_CONFIG.MAIN_TICK}ms`);

})();