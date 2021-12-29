export default class TimeTip {
  constructor({ w, h, bg }) {
    this.clientHeight = document.body.clientHeight;
    this.clientWidth = document.body.clientWidth;
    this.callRingStart = null;
    this.callRingEnd = null;
    this.starting = false;
    this.startId = null;
    this.flashId = null;
    this.frame = this.init(w, h, bg);
  }
  init(w = 3, h = 3, bg = "red") {
    // 生成四个dom
    let toHtml = `
    <div style="position:fixed;  height: ${this.clientHeight}px; width: ${w}px; left: 0;top: 0; background-color:${bg}"></div>
    <div style="position:fixed; height: ${h}px; width: ${this.clientWidth}px; left: 0;top: 0; background-color:${bg}"></div>
    <div style="position:fixed; height: ${this.clientHeight}px; width: ${w}px; right: 0;top: 0; background-color:${bg}"></div>
    <div style="position:fixed; height: ${h}px; width: ${this.clientWidth}px; left: 0;bottom: 0; background-color:${bg}"></div>
    `;
    const cd = document.createElement("div");
    cd.innerHTML = toHtml;
    // 生成audio
    this.renderAudio();
    return cd;
  }
  start(frequency = 40, fn = () => {}) {
    // min
    this.starting = true;
    let frequencySecond = frequency * 60 * 1000;
    this.startId = window.setTimeout(() => {
      this.startFlash();
      fn();
      console.log(this, "this...");
      this.callRingStart.play();
    }, frequencySecond);
  }
  startFlash(timeout = 500) {
    document.body.appendChild(this.frame);
    let flag = true;
    this.flashId = setInterval(() => {
      if (flag) {
        this.frame.setAttribute("style", "opacity:1");
      } else {
        this.frame.setAttribute("style", "opacity:0");
      }
      flag = !flag;
    }, timeout);
  }
  close() {
    if (this.frame && this.flashId) document.body.removeChild(this.frame);
    if (this.startId) {
      window.clearInterval(this.startId);
      this.startId = null;
    }
    if (this.flashId) {
      window.clearInterval(this.flashId);
      this.flashId = null;
    }
    this.starting = false;
    this.stopAudio();
  }
  renderAudio() {
    const callRingStart = document.createElement("audio");
    callRingStart.src =
      "https://teamind-static-oss.oss-accelerate.aliyuncs.com/bells/meeting.mp3";
    callRingStart.style.display = "none";
    callRingStart.loop = true;
    callRingStart.muted = false;
    callRingStart.preload = true;
    const callRingEnd = document.createElement("audio");
    callRingEnd.style.display = "none";
    callRingEnd.muted = false;
    callRingEnd.preload = true;
    callRingEnd.src =
      "https://teamind-static-oss.oss-accelerate.aliyuncs.com/bells/hangup.mp3";
    console.log(this, "this...");
    this.callRingStart = callRingStart;
    this.callRingEnd = callRingEnd;
  }
  stopAudio() {
    if (!this.callRingStart || !this.callRingEnd) return;
    this.callRingStart.pause();
    this.callRingEnd.play();
  }
}
