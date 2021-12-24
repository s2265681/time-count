/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-07 20:01:44
 * 变换背景
 * 这里处理 YIYAN
 */
import {
  drawText,
  drawLand,
  drawStar,
  fillMoon,
  isMobile,
  drawNightBg,
  drawDayBg,
  drawSun,
  getCurrentTimeInfo,
  getYIYan,
} from "./utils.js";

const mobile = isMobile();
const { dayType } = getCurrentTimeInfo();

const weatherMap = {
  小雨: "rain",
  晴天: "sun",
};
var YIYAN = "举头望明月，对影成三人";

// 通过createPattern作为背景使用 注意缓存起来 防止每次刷新
export default async function createBackgroundCanvas() {
  var canvas = document.createElement("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var context = canvas.getContext("2d");
  let res = await weatherCallback;
  try {
    YIYAN = await getYIYan();
  } catch (error) {
    console.log(error);
  }
  const currentWeatherType = res[dayType] || "sun";
  const currentWeather = weatherMap[currentWeatherType];
  switch (dayType) {
    case "night":
      drawNight(canvas, context, YIYAN, currentWeather);
      break;
    case "day":
      drawDay(canvas, context, YIYAN, currentWeather);
      break;
    default:
      break;
  }
  return canvas;
}

// 黑夜
function drawNight(canvas, context, YIYAN, currentWeather) {
  // 画黑夜的背景
  drawNightBg(context);
  // 画月亮 调用月亮的函数
  const desMoonX = mobile ? 70 : 150;
  const desMoonY = mobile ? 70 : 130;
  fillMoon(context, 2, canvas.width - desMoonX, desMoonY, 60, -30);
  // 画草地
  drawLand(context, "#030", "#580");
  // 画文字
  drawText(context, YIYAN);
  // 画星星 还是雨
  const startNum = mobile ? 50 : 150;
  const _r = mobile ? 2 : 5;
  for (let i = 0; i < startNum; i++) {
    let r = Math.random() * 10 + _r;
    let R = r * 0.5;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height * 0.8;
    // if (currentWeather === "sun") {
    drawStar(context, r, R, x, y, r);
    // }else if(currentWeather === 'rain'){
    //   drawRain()
    // }
  }
}

// 白天
function drawDay(canvas, context, YIYAN, currentWeather) {
  // 画白天的背景
  drawDayBg(context);
  // 画草地
  drawLand(context, "#A0E76E", "#D0F8B3");
  // 画文字
  drawText(context, YIYAN);
}

function drawRain() {
  console.log("画雨");
}
