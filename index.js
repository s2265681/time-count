/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import { getCurrentTimeInfo, getYIYan } from "./js/utils.js";
import countDownInit from "./js/countdown.js";

window.onload = async function () {
  var YIYAN = await getYIYan();
  countDownInit(YIYAN);
  weatherCallback.then((res) => {
    console.log("当前天气", res);
  });
  console.log("当前时间信息", getCurrentTimeInfo());
};
