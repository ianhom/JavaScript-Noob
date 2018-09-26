var context = pm.createCanvasContext('Canvas1', this)   //获取画布对象
if (context)
{
    var point = { x: 200, y: 200 };     //圆心坐标，相对于画布
    var radius = 150;                   //半径
    var start = -1.25 * Math.PI;        //起始弧度

    context.setLineWidth(30)
    context.setStrokeStyle('#91C7AE')
    context.setFillStyle('#91C7AE');

    for( var i = 0; i <= 10; i++ )
    {
        var stop = start + 0.15 * Math.PI ;     //结束弧度
        var x = Math.floor(130 * Math.cos(start)) + 200;
        var y = Math.floor(130 * Math.sin(start)) + 200;
        var v = 10 * i;

        if (i >= 5)
            context.fillText(v.toString(), x - 20, y);
        else
            context.fillText(v.toString(), x, y);

        if (i == 10)
            break;

        context.beginPath();    //开始新的路径

        context.arc( point.x, point.y, radius, start, stop - 0.003 * Math.PI, false);     //画一段圆弧

        context.stroke();                         //填充路径

        context.closePath();                    //关闭路径
        start = stop;

        if (i == 1)
        {
            context.setStrokeStyle('#63869E')
            context.setFillStyle('#63869E');
        }
        else if (i == 7)
        {
            context.setStrokeStyle('#C23531')
            context.setFillStyle('#C23531');
        }
    }

    radius = 170;
    start = -1.25 * Math.PI; 
    context.setLineWidth(22)
    context.setStrokeStyle('#91C7AE')

    for( var i = 0; i < 50; i++ )
    {
        var stop = start + 0.03 * Math.PI ;

        context.beginPath();

        context.arc( point.x, point.y, radius, start, stop - 0.003 * Math.PI, false);

        context.stroke();

        context.closePath();
        start = stop;

        if (i == 9)
        {
            context.setStrokeStyle('#63869E')
        }
        else if (i == 39)
        {
            context.setStrokeStyle('#C23531')
        }
    }

    {   //画指针
        var value = 60;     //表盘当前值
        var radius = 130;
        var x = Math.floor(radius * Math.cos((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
        var y = Math.floor(radius * Math.sin((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;

        context.beginPath();

        context.setFillStyle('#91C7AE');
        context.moveTo(x, y)

        radius = 10;
        x = Math.floor(radius * Math.cos((-0.75 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
        y = Math.floor(radius * Math.sin((-0.75 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;
        context.lineTo(x, y);

        radius = 20;
        x = Math.floor(radius * Math.cos((-0.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
        y = Math.floor(radius * Math.sin((-0.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;
        context.lineTo(x, y);

        radius = 10;
        x = Math.floor(radius * Math.cos((0.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
        y = Math.floor(radius * Math.sin((0.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;
        context.lineTo(x, y);

        context.fill();

        context.setTextAlign('center')
        context.fillText(value.toString(), 200, 250)

        context.closePath();
    }

    context.draw();
}
