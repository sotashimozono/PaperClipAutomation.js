// ==UserScript==
// @name         PaperClip Solver ESM Loader
// @match        https://www.decisionproblem.com/paperclips/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // jsDelivr 経由で main.js をモジュールとして動的にインポート
  const scriptUrl =
    "https://cdn.jsdelivr.net/gh/sotashimozono/PaperClipAutomation.js@main/src/main.js";

  import(scriptUrl)
    .then((module) => {
      // export された init 関数を実行
      module.init();
    })
    .catch((err) => {
      console.error("Failed to load automation module:", err);
    });
})();
