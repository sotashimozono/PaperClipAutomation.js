// ==UserScript==
// @name         PaperClip Automation [PROD]
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://www.decisionproblem.com/paperclips/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const prodUrl = 'https://cdn.jsdelivr.net/gh/sotashimozono/PaperClipAutomation.js@main/src/main.js';

    import(prodUrl).then(module => {
        if (window.PaperClipAutomation && window.PaperClipAutomation.init) {
            window.PaperClipAutomation.init();
        }
    }).catch(err => {
        console.error("GitHubからのモジュール読み込みに失敗しました:", err);
    });
})();