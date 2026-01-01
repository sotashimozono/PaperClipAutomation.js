/**
 * プロジェクト管理オブジェクト
 */
export const ProjectManager = {
  // 自動で実行したくないプロジェクトのリスト
  excludeList: [
    "Quantum Temporal Reversion", // 【最優先】ゲームを最初からリセットする（確認が出る原因）
    "Hostile Takeover", // 資金を全額没収されるリスクがある
    "Release the HypnoDrones", // Phase 2へ強制移行する（準備ができるまで待ちたい場合）
  ],

  /**
   * 実行可能なプロジェクトをすべて処理する
   */
  executeAll: function () {
    const projects = document.getElementsByClassName("projectButton");

    for (let btn of projects) {
      // 1. 基本チェック（表示されており、かつクリック可能か）
      if (!btn.disabled && btn.style.display !== "none") {
        const projectName = btn.innerText;

        // 2. 除外リストとの照合
        // includes を使うことで、(10,000 ops) などの数値が含まれていても判定可能
        const isExcluded = this.excludeList.some((ex) =>
          projectName.includes(ex),
        );

        if (isExcluded) {
          // 危険なプロジェクトはスキップ
          continue;
        }

        // 3. 実行
        btn.click();
        console.log(`%c[Project] Executed: ${projectName}`, "color: #00bfff;");
      }
    }
  },
};
