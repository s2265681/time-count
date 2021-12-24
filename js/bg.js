/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-07 20:01:44
 * 变换背景
 * 这里处理 YIYAN
 */
import { getYIYan, drawLand, drawStar,fillMoon } from "./utils.js";
// 通过createPattern作为背景使用 注意缓存起来 防止每次刷新
export default function createBackgroundCanvas() {
  var canvas = document.createElement("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var context = canvas.getContext("2d");
  var gradientSty = context.createLinearGradient(0, 0, 0, canvas.height);
  gradientSty.addColorStop(1, "#035");
  gradientSty.addColorStop(0, "#000");
  // context.fillStyle = "#000";
  context.fillStyle = gradientSty;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.globalCompositeOperation = 'copy'
  // 画月亮 调用月亮的函数
  fillMoon(context, 2, canvas.width - 200, 130, 60, -30);
  // 画草地
  drawLand(context);
  // 画星星
  for (let i = 0; i < 200; i++) {
    let r = Math.random() * 10 + 5;
    let R = r * 0.5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.8;
    drawStar(context, r, R, x, y, r);
  }

  return canvas;
}
