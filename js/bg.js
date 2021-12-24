/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-07 20:01:44
 * 变换背景
 * 这里处理 YIYAN
 */
import { drawText, drawLand, drawStar, fillMoon, isMobile } from "./utils.js";
const mobile = isMobile()
// 通过createPattern作为背景使用 注意缓存起来 防止每次刷新
export default function createBackgroundCanvas(YIYAN) {
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
  const desMoonX = mobile ? 70: 200
  const desMoonY = mobile ? 70: 130
  fillMoon(context, 2, canvas.width - desMoonX, desMoonY, 60, -30);
  // 画草地
  drawLand(context);
  // 画文字
  drawText(context, YIYAN);
  // 画星星
  const startNum = mobile ? 50 : 150 
  const _r = mobile ? 2 : 5
  for (let i = 0; i < startNum; i++) {
    let r = Math.random() * 10 + _r;
    let R = r * 0.5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.8;
    drawStar(context, r, R, x, y, r);
  }

  return canvas;
}
