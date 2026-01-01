# PaperClipAutomation.js

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Universal Paperclip](https://www.decisionproblem.com/paperclips/index2.html) を自動でプレイするスクリプト  
全宇宙をクリップに帰るまで止まらないAIとなって clip を作り続けるゲーム  
「とにかく効率よくクリップを作る」のがプレイヤーの目的

## 3つの game フェーズ

概ね以下の手順でゲームが進行していくらしい。  
この内の、1, 2までを作るところで現在力尽きている。思いの外進行に時間がかかる。

1. 手動で針金を曲げてクリップを売る
2. 徐々に自動化をし、自分の計算資源を増やす
3. 地球資源をクリップに変換するために計算資源を奪い合う
4. 地球を使い果たすと宇宙に資源を求めに行く

## 補助スクリプト

以下をconsoleから実行すると最新版のコードを走らせることができる

```javascript
async function loadLatestAutomation() {
  const user = "sotashimozono";
  const repo = "PaperClipAutomation.js";
  const branch = "main";

  try {
    const apiResponse = await fetch(
      `https://api.github.com/repos/${user}/${repo}/commits/${branch}?t=${Date.now()}`,
      { cache: "no-store" },
    );

    const commitData = await apiResponse.json();
    const sha = commitData.sha;

    console.log(`最新SHAを取得: ${sha.substring(0, 7)}`);

    const scriptUrl = `https://cdn.jsdelivr.net/gh/${user}/${repo}@${sha}/src/main.js?t=${Date.now()}`;

    const module = await import(scriptUrl);

    if (module && typeof module.init === "function") {
      module.init();
      console.log("最新版の起動に成功！");
    }
  } catch (err) {
    console.error("ロード失敗:", err);
  }
}
// 実行
loadLatestAutomation();

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

  console.log(
    `%c[Time Warp] Speed set to ${multiplier}x`,
    "color: #ff00ff; font-weight: bold;",
  );
}
activateTimeWarp(30000);
```
