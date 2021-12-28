export default class TimeTip {
  constructor({ w, h, bg }) {
    this.clientHeight = document.body.clientHeight;
    this.clientWidth = document.body.clientWidth;
    this.frame = this.init(w, h, bg);
    this.starting = false
    this.startId = null;
    this.flashId = null;
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
    return cd;
  }
  start(frequency = 40) {
    // min
    this.starting = true
    let frequencySecond = frequency * 60 * 1000;
    this.startId = window.setTimeout(() => {
      this.startFlash();
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
    if(this.frame)document.body.removeChild(this.frame);
    if (this.startId) {
      window.clearInterval(this.startId);
      this.startId = null;
    }
    if (this.flashId) {
      window.clearInterval(this.flashId);
      this.flashId = null;
    }
    this.starting = false
  }
}
