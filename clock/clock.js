/**
 * Created by Lenovo on 2016/11/29.
 */
var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');

var width = ctx.canvas.width;

var height = ctx.canvas.height;

var r = width/2;

var rem = width/200;


function drawBackground() {
    ctx.translate(r, r);
    //绘制圆

    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
    ctx.arc(0, 0, r - ctx.lineWidth, 0, 2*Math.PI, false);
    ctx.stroke();
    //绘制时钟12个数字
    var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    num.forEach(function (number,index) {
        var rad =  2*Math.PI / 12*index;
        var x = Math.cos(rad) * (r - 30*rem);
        var y = Math.sin(rad) * (r - 30*rem);
        ctx.fillText(number, x, y);
    })
    //绘制时钟的60个点
    for (var i = 0;i <60;i ++){
        var rad = 2*Math.PI/60*i;
        var x = Math.cos(rad) * (r - 18*rem);
        var y = Math.sin(rad) * (r - 18*rem);
        ctx.beginPath();
        if(i % 5 == 0){
            ctx.fillStyle = '#000';
            ctx.arc(x, y, 2*rem, 0, 2*Math.PI);
        }else {
            ctx.fillStyle = '#ccc';
            ctx.arc(x, y, 2*rem, 0, 2*Math.PI);
        }
        ctx.fill();
    }
}

function drawHour(hour, minute) {
    ctx.save();

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 6*rem;
    var mrad = 2*Math.PI/12/60*minute;
    var rad = 2*Math.PI/12*hour;
    ctx.rotate(rad + mrad);
    ctx.moveTo(0, 10*rem);//移动画线的原点
    ctx.lineTo(0, -r/2);
    ctx.stroke();

    ctx.restore();
}

function drawMinute(minute) {
    ctx.save();

    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;

    var rad = 2*Math.PI/60*minute;
    ctx.rotate(rad);//画布旋转
    ctx.moveTo(0, 10*rem);//移动画线的原点
    ctx.lineTo(0, -r/1.5);
    ctx.stroke();

    ctx.restore();
}

function drawSecond(second) {
    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    ctx.lineWidth = 4*rem;
    var rad = 2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.moveTo(-2*rem, 20*rem);//移动画线的原点
    ctx.lineTo(2*rem, 20*rem);
    ctx.lineTo(1, -r + 18*rem);
    ctx.lineTo(-1, -r + 18*rem);
    ctx.fill();

    ctx.restore();
}

function drawDot() {
    ctx.beginPath();
    ctx.arc(0, 0, 3*rem, 0, 2*Math.PI);
    ctx.fill();
}


function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    drawBackground();

    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();

    ctx.restore();
}

draw();
setInterval(draw,1000);