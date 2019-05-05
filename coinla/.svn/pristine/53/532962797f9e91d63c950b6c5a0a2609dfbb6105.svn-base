function canvasRounds (_options) {
    var options = _options || {};    //获取或定义options对象;
    options.angle = options.angle;    //定义默认角度1为360度(角度范围 0-1);
    options.text = options.text || parseFloat((options.angle * 100).toFixed(2)) + '%';
    options.color = options.color || ['#fff'];    //定义默认颜色（包括字体和边框颜色）;
    options.lineWidth = options.lineWidth || 8;    //定义默认圆描边的宽度;
    options.lineCap = options.lineCap || 'square';    //定义描边的样式，//"butt|round|square"默认|圆角|方角

    var oBoxOne = document.getElementById(options.id);
    var sCenter = oBoxOne.width / 2;    //获取canvas元素的中心点;
    var ctx = oBoxOne.getContext('2d');
    var nBegin = Math.PI / 2;    //定义起始角度;
    var nEnd = Math.PI * 2;    //定义结束角度;
    var X = oBoxOne.width
    if (options.angle > 0.5) {
        X = oBoxOne.width * options.angle
    } else {
        X = oBoxOne.width - oBoxOne.width * options.angle / 2
    }
    // console.log('canvas', options.angle)
    var grd = ctx.createLinearGradient(0, 0, 0, oBoxOne.width);    //grd定义为描边渐变样式;
    if (options.color.length > 1) {
        grd.addColorStop(0, options.color[0]);
        grd.addColorStop(1, options.color[1]);
    } else {
        grd.addColorStop(0, options.color[0]);
        grd.addColorStop(1, options.color[0]);
    }

    ctx.textAlign = 'center';    //定义字体居中;
    ctx.font = 'normal normal 16px Arial';    //定义字体加粗大小字体样式;
    ctx.fillStyle = options.color[2];    //判断文字填充样式为颜色，还是渐变色;
    ctx.fillText(options.text, sCenter, sCenter + 8);    //设置填充文字;
    /*ctx.strokeStyle = grd;    //设置描边样式为渐变色;
    ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter);    //设置描边文字(即镂空文字);*/
    ctx.lineCap = options.lineCap;
    ctx.strokeStyle = grd;
    ctx.lineWidth = options.lineWidth;

    ctx.beginPath();    //设置起始路径，这段绘制360度背景;
    ctx.strokeStyle = '#e6ebf4';
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();

    var imd = ctx.getImageData(0, 0, 240, 240);

    function draw(current) {    //该函数实现角度绘制;
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = grd;
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
        ctx.stroke();
    }

    var t = 0;
    var timer = null;

    function loadCanvas(angle) {    //该函数循环绘制指定角度，实现加载动画;
        timer = setInterval(function () {
            if (t > angle) {
                draw(options.angle);
                clearInterval(timer);
            } else {
                draw(t);
                t += 0.02;
            }
        }, 20);
    }

    loadCanvas(options.angle);    //载入百度比角度  0-1 范围;
    timer = null;

}