function getCurrentTimeInfo() {
  const myDate = new Date();
  const year = myDate.getFullYear();
  const month = myDate.getMonth() + 1;
  const date = myDate.getDate();
  const hours = myDate.getHours();
  const minutes = myDate.getMinutes();
  return {
    year,
    month,
    date,
    hours,
    minutes,
  };
}

function getYIYan() {
  return fetch("https://v1.hitokoto.cn/")
    .then((response) => response.json())
    .then((res) => res.hitokoto);
}

function drawLand(ctx) {
  ctx.save();
  // ctx.translate(0, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height * 0.85);
  // ctx.bezierCurveTo(540, 400, 660, 800, 1200, 600); // 以800 1200 画不标准得倒的
  ctx.bezierCurveTo(
    canvas.width * 0.3,
    canvas.height * 0.85 * 0.85,
    canvas.width * 0.6,
    canvas.height * 0.85 * 1.3,
    canvas.width,
    canvas.height * 0.85
  );
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  var landStyle = ctx.createLinearGradient(0, 800, 0, 0);
  landStyle.addColorStop(0.0, "#030");
  landStyle.addColorStop(1.0, "#580");
  ctx.fillStyle = landStyle;
  ctx.fill();
}

function drawYiYan(ctx, text) {
  ctx.save();
  ctx.shadowColor = "yellow";
  // ctx.shadowOffsetX = 3;
  // ctx.shadowOffsetY = 3;
  // ctx.shadowBlur = 3;
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(text, 40, canvas.height * 0.96);
  ctx.restore();
}

// ctx r 小圆半径  大圆半径 偏移量 旋转角度
function drawStar(ctx, r, R, x, y, rot = 0) {
  ctx.beginPath();
  ctx.strokeStyle = "yellow";
  ctx.fillStyle = "rgba(255,200,0,0.6)";
  for (var i = 0; i < 5; i++) {
    ctx.lineTo(
      Math.cos(((18 + i * 72 - rot) / 180) * Math.PI) * R + x,
      -Math.sin(((18 + i * 72 - rot) / 180) * Math.PI) * R + y
    );
    ctx.lineTo(
      Math.cos(((54 + i * 72 - rot) / 180) * Math.PI) * r + x,
      -Math.sin(((54 + i * 72 - rot) / 180) * Math.PI) * r + y
    );
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

// 调用月亮
function fillMoon(ctx, d, x, y, R, rot, /*optional*/ fillColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.scale(R, R);
  pathMoon(ctx, d);
  ctx.fillStyle = fillColor || "#fb5";
  ctx.shadowColor = "yellow";
  ctx.shadowBlur = 35;
  // ctx.shadowOffsetX = 10;
  // ctx.shadowOffsetY = 10;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fill();
  ctx.restore();
}

function pathMoon(ctx, d) {
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
  ctx.moveTo(0, -1);
  ctx.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
  ctx.closePath();
}

function dis(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}


export { getCurrentTimeInfo, getYIYan, drawLand, drawYiYan, drawStar, fillMoon };
