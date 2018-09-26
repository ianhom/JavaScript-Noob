var data = [ 20, 30, 40, 50, 60, 70 ];  //饼图数据
var colors = [ "#ff0000", "#ffff00", "#ff00ff", "#00ff00", "#00ffff", "#0000ff"];   //饼图颜色
var context = pm.createCanvasContext('Canvas1', this)   //获取画布对象
if (context)
{
    var total = 0;  //饼图数据总和

    for( var index = 0; index < data.length; index++ )
    {
        total += data[ index ];
    }

    var point = { x: 200, y: 200 };     //圆心坐标，相对于画布
    var radius = 150;                   //半径
    var start = -0.5 * Math.PI;         //起始弧度

    for( var i = 0; i < data.length; i++ )
    {
        var stop = start + data[ i ] / total * 2 * Math.PI;     //结束弧度

        context.beginPath();    //开始新的路径

        context.arc( point.x, point.y, radius, start, stop, false);     //画一段圆弧

        context.lineTo( point.x, point.y );     //连接圆弧终点和圆心
        context.setFillStyle( colors[ i ] );    //设置填充颜色
        context.fill();                         //填充路径

        context.closePath();                    //关闭路径
        start = stop;                           //起始弧度更新
    }

    context.draw();     //更新画布
}
