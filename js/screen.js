import { isMobile } from "./utils.js";
const mobile = isMobile();
$(function () {
  //全屏
  $("#fullScreen").on("click", function () {
    fullScreen();
  });
  //退出全屏
  $("#exitFullScreen").on("click", function () {
    exitFullscreen();
  });
  if (mobile){
    $("#fullScreen").css("display", "none");
  } 
  $("#exitFullScreen").css("display", "none");
});

//fullScreen()和exitScreen()有多种实现方式，此处只使用了其中一种
//全屏
function fullScreen() {
  var element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

//退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

//监听window是否全屏，并进行相应的操作,支持esc键退出
window.onresize = function () {
  var isFull = !!(
    document.webkitIsFullScreen ||
    document.mozFullScreen ||
    document.msFullscreenElement ||
    document.fullscreenElement
  ); //!document.webkitIsFullScreen都为true。因此用!!
  if (isFull == false) {
    $("#exitFullScreen").css("display", "none");
    $("#fullScreen").css("display", "");
  } else {
    $("#exitFullScreen").css("display", "");
    $("#fullScreen").css("display", "none");
  }
};
