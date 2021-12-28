/*
 * @Version: 2.0
 * @Autor: rockshang
 * @Date: 2021-12-24 11:59:44
 */
import countDownInit from "./js/countdown.js";
import TimeTip from "./js/timetip.js";
import { getCurrentTimeInfo } from './js/utils.js'

const timeTip = new TimeTip({ w: 3, h: 3, bg: "red" });


window.onload = async function () {
  countDownInit();
};

window.addEventListener("keydown", (e) => {
  const { hours, minutes } = getCurrentTimeInfo()
  console.log(hours, minutes,'hours, minutes')
  if (e.keyCode === 32 && (e.metaKey || e.shiftKey)) {
    if(timeTip.starting){
      timeTip.close();
      console.log('time count close')
    }else{
      console.log(`time count start 1min 现在是${hours}:${minutes}`)
      timeTip.start(1); // min
    }
  }
});
