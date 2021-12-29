/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import countDownInit from "./js/countdown.js";
import TimeTip from "./js/timetip.js";
import { getCurrentTimeInfo } from "./js/utils.js";

const timeTip = new TimeTip({ w: 5, h: 5, bg: "red" });

window.onload = async function () {
  countDownInit();
  setTimeout(()=>{
    alert("按住shift+空格开启/关闭计时提醒功能！");
  },500)
};

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 32 && (e.metaKey || e.shiftKey)) {
    doTimeCount();
  }
});

function doTimeCount() {
  const { hours, minutes } = getCurrentTimeInfo();
  if (timeTip.starting) {
    timeTip.close();
    console.log("time count close");
    alert('计时提醒功能已关闭！')
  } else {
    // 设置多少分支提醒
    let userMinus = +prompt("设置多少分钟后提醒⏰！");
    if (userMinus && typeof userMinus === "number") {
      // console.log(`现在是${hours}:${minutes}, ${userMinus} 分钟后开始提醒`);
      alert(
        `现在是${hours}:${minutes}, ${userMinus} 分钟后开始提醒， 请注意调整当前音量！`
      );
      timeTip.start(userMinus, () => {
        console.log("执行开始回调");
      });
    }
  }
}
