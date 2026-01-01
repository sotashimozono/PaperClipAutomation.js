import { safeClick } from "../core/utils.js";

/**
 * 量子計算の自動クリック：不透明度ベース活性化判定版
 */
export function runQuantumComputing() {
  const container = document.getElementById("qComputing");
  if (!container || container.style.display === "none") return;

  const chips = container.getElementsByClassName("qChip");
  let totalAmplitude = 0;
  let activeCount = 0;

  for (let chip of chips) {
    // インラインスタイルの opacity を直接取得
    const opacity = parseFloat(chip.style.opacity);

    // 修正：opacity が 0 以外のものを「計算に参加しているチップ」と判定
    // 浮動小数点の誤差を考慮し、微小値より大きいかどうかで判定します
    if (!isNaN(opacity) && Math.abs(opacity) > 0.0001) {
      totalAmplitude += opacity;
      activeCount++;
    }
  }

  if (activeCount === 0) return;

  // 判定ロジック：全アクティブチップの振幅の和が最大値の 80% を超えた瞬間
  // 現在の負の Ops (-3,180) を解消するため、確実なプラスを狙います
  const threshold = activeCount * 0.8;

  if (totalAmplitude > threshold) {
    const btn = document.getElementById("btnQcompute");
    if (btn && !btn.disabled) {
      btn.click();
      console.log(
        `%c[Quantum] Peak hit: ${totalAmplitude.toFixed(2)} / N=${activeCount}`,
        "color: #00ff00; font-weight: bold;",
      );
    }
  }
}
