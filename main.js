var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 550;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
//终止时间
var endTime = new Date(2015, 9, 23, 12, 30, 30);
//剩余时间
var resTime = 0;

var balls = [];
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    resTime = getResTime();
    setInterval(function(){
        show( context );
        upDate();
    },50);
    // show( context );
}

function getResTime(){
    var now = new Date();
    var res = endTime.getTime() - now.getTime();
    res = Math.round( res / 1000);

    return res >= 0 ? res : 0;
}

function upDate(){
    var nextTime = getResTime();
    var nextHours = parseInt(nextTime / 3600);
    var nextMinutes = parseInt(nextTime / 60) - nextHours * 60;
    var nextSeconds = nextTime - nextMinutes * 60 - nextHours * 3600;

    var resHours = parseInt(resTime / 3600);
    var resMinutes = parseInt(resTime / 60) - resHours * 60;
    var resSeconds = resTime - resMinutes * 60 - resHours * 3600;
    if(nextTime != resTime){
        if( parseInt(nextHours / 10) != parseInt(resHours / 10)){
            addBalls( MARGIN_LEFT, MARGIN_TOP, parseInt(resHours / 10));
        }
        if( parseInt(nextHours % 10) != parseInt(resHours % 10)){
            addBalls( MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(resHours % 10));
        }
        if( parseInt(nextMinutes / 10) != parseInt(resMinutes / 10)){
            addBalls( MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(resMinutes / 10));
        }
        if( parseInt(nextMinutes % 10) != parseInt(resMinutes % 10)){
            addBalls( MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(resMinutes % 10));
        }
        if( parseInt(nextSeconds / 10) != parseInt(resSeconds / 10)){
            addBalls( MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(resSeconds / 10));
        }
        if( parseInt(nextSeconds % 10) != parseInt(resSeconds % 10)){
            addBalls( MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(resSeconds % 10));
        }
        resTime = nextTime;
    }
    ballUpdata();
}

function show( txt ){
    txt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(resTime/3600);
    var minutes = parseInt(resTime/60) - hours * 60;
    var seconds = resTime - minutes * 60 - hours * 3600;

    showDigit( MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), txt);
    showDigit( MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours%10), txt);
    showDigit( MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, txt);
    showDigit( MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes/10), txt);
    showDigit( MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes%10), txt);
    showDigit( MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, txt);
    showDigit( MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds/10), txt);
    showDigit( MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds%10), txt);

    for( var i = 0; i < balls.length; i++){
        var ballColor = balls[i].bcolor;
        txt.fillStyle = ballColor;
        txt.beginPath();
        txt.arc( balls[i].bx, balls[i].by, balls[i].br, 0, 2*Math.PI);
        txt.closePath();
        txt.fill();
    }
}

function showDigit( x, y, num, txt){

    txt.fillStyle = "rgb(0, 102, 153)";

    for( var i = 0; i < digit[num].length; i++){
        for( var j = 0; j < digit[num][i].length; j++){
            if( digit[num][i][j] == 1){
                txt.beginPath();
                txt.arc( x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0,2 * Math.PI);
                txt.closePath();
                txt.fill();
            }
        }
    }
}

function addBalls( x, y, num){
    for( var i = 0; i < digit[num].length; i++){
        for( var j = 0; j < digit[num][i].length; j++){
            if( digit[num][i][j] == 1){
                var ball = {
                    bx : x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    by : y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    br : RADIUS,
                    bvx : Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    bvy : -5,
                    bg : Math.ceil(Math.random() * 5),
                    bcolor : colors[Math.ceil(Math.random() * 10)]
                }
                balls.push(ball);
            }
        }
    }
}

function ballUpdata(){
    for( var i = 0; i < balls.length; i++){
        balls[i].bx += balls[i].bvx;
        balls[i].by += balls[i].bvy;
        balls[i].bvy += balls[i].bg;
        if( balls[i].by >= WINDOW_HEIGHT - balls[i].br){
            balls[i].by = WINDOW_HEIGHT - balls[i].br;
            balls[i].bvy = - balls[i].bvy * 0.5;
        }
        if( balls[i].bx >= WINDOW_WIDTH - balls[i].br){
            balls[i].bx = WINDOW_WIDTH - balls[i].br;
            balls[i].bvx = - balls[i].bvx * 0.8;
        }
    }
}