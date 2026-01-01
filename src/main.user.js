// ==UserScript==
// @name         PaperClip Automation [PROD]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://www.decisionproblem.com/paperclips/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // キャッシュ対策のためタイムスタンプを付与
  const prodUrl = `https://cdn.jsdelivr.net/gh/sotashimozono/PaperClipAutomation.js@main/src/main.js?t=${Date.now()}`;

  import(prodUrl)
    .then((module) => {
      // module.init が存在するか確認して実行
      if (typeof module.init === 'function') {
        module.init();
      } else {
        console.error("module.init が見つかりません。export されているか確認してください。");
      }
    })
    .catch((err) => {
      console.error("GitHubからのモジュール読み込みに失敗しました:", err);
    });
})();