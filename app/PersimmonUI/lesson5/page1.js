var data = [ 45, 30, 40, 50, 32, 56, 12, 34, 21, 23, 13, 46 ];  //柱形图数据
var date = ['2018-09-29','2018-09-30','2018-10-01']
var high = [0, 0, 0]
var low  = [0, 0, 0]
var high1 = [25, 26, 24]
var low1  = [15, 10, 17]
var DISTANCE = 110

var xx = 1;
var xx1 = 1;
var i = 0;
var j = 0;
var page = {
    dataa : {timer1 : 0},
    onBtn : function()
    {
        this.getTemp()
        for(var k = 0; k < high.length; k++)
        {
            high[k] = 0;
            low[k]  = 0;
        }
    },
    onLoad : function()
    {
        var thiz = this;
        var i = 0;
        // Register a timer callback function
        this.dataa.timer1 = setInterval(function()
        {  
            for(var k = 0; k < high.length; k++)
            {
                if(high[k] <  high1[k]){
                    high[k] += high1[k]/10
                    console.log(high[k])}
                if(low[k] < low1[k]){
                    low[k]  += low1[k]/10
                }
            }
            //thiz.getTemp();
            thiz.display();
        }, 50);
        this.display()
    },
    
    getTemp : function()
    {
        for(var k = 0; k < high.length; k++)
        {
            high1[k] = Math.floor(Math.random()*5+20)
            low1[k]  = Math.floor(Math.random()*5+10)
        }
    },

  

    display : function()
    {
        var index = 0
        
        
        
        var context = pm.createCanvasContext('Canvas1', this)           //获取画布对象

        
        if (context)
        {
            var max = 35;

            for(var j = 0; j < 3; j++)
            {
                grd = context.createLinearGradient(0, 0, 0, 480)
                grd.addColorStop(0, 'black')
                if(j == 0)
                {
                    grd.addColorStop(1, 'BLUE')
                }else if(j == 1)
                {
                    grd.addColorStop(1, 'GRAY')
                }else
                {
                    grd.addColorStop(1, 'GREEN')
                }
                // Fill with gradient
                context.setFillStyle(grd)
                context.fillRect(60 + j * DISTANCE, 30, DISTANCE , 350)
            }

            max = Math.floor(max / 6);

            /* 画浅灰色竖线竖线 */
            context.beginPath();                //开启新路径
            context.setStrokeStyle('#C0C0C0')   //设置边框颜色

            for( index = 1; index <= 3; index++ )
            {
                var y = 380;
                context.moveTo(60 + index * DISTANCE, y)                   //线条起点
                context.lineTo(60 + index * DISTANCE, 30)    //线条终点
            }

            context.stroke()        //画线
            context.closePath();    //关闭当前路径

            /* 画横纵坐标刻度 */
            context.beginPath();            //开启新路径
            context.setStrokeStyle('black') //设置边框颜色

            context.fillText('Temperature', 5, 5)    //绘制文字，坐标（5，5）

            context.setTextBaseline('middle')         //设置文本绘制纵坐标对齐方式
            for( index = 0; index < 7; index++ )
            {
                var y = 30 + index * 50;
                var value = max * (7 - index);
                /*纵坐标刻度*/
                context.moveTo(55, y)
                context.lineTo(60, y)
                context.fillText(value.toString(), 20, y)
            }

            context.moveTo(55, 30 + index * 50)
            context.lineTo(60, 30 + index * 50)
            context.fillText('0', 20, 30 + index * 50)

            context.moveTo(60, 30)
            context.lineTo(60, 30 + index * 50)

            context.moveTo(60, 30 + index * 50)
            context.lineTo(60 + 3 * DISTANCE, 30 + index * 50)

            context.setTextAlign('center')  //设置文本绘制横坐标对齐方式

            for( index = 1; index <= 3; index++ )
            {
                var x = 60 + (index-0.5) * DISTANCE;
                /*横坐标刻度*/
                context.moveTo(x, 380)
                context.lineTo(x, 385)
                context.fillText(date[index-1], x, 395)
            }

            context.setTextAlign('left')    //设置文本绘制横坐标对齐方式
            context.fillText('Date', 60 + (low.length) * DISTANCE + 10 , 395)
            context.stroke()
            context.closePath();
            
            

            /* High temp */
            var x = 60 + DISTANCE/2;
            context.moveTo(x, 380)
            context.beginPath();
            context.setLineCap('round')
            context.setStrokeStyle('RED')
            context.setLineWidth(4)        //设置线条宽度          
            for( index = 0; index < high.length; index++ )
            {
                var x = 60 + DISTANCE/2 + index * DISTANCE;
                var y = high[index] * 350 / (max * 7)
                context.lineTo(x, 380 - y)
                context.arc(x, 380 - y, 3, 0, 2 * Math.PI)
            }
            context.stroke()
            context.closePath();
            
            
            
            /* Low temp */
            var x = 60 + DISTANCE;
            context.moveTo(x, 380)
            context.beginPath();
            context.setStrokeStyle('BLUE')
            //context.setLineWidth(2)        //设置线条宽度 
            for( index = 0; index < low.length; index++ )
            {
                var x = 60 + DISTANCE/2 + index * DISTANCE;
                var y = low[index] * 350 / (max * 7)
                context.lineTo(x, 380 - y)
                context.arc(x, 380 - y, 3, 0, 2 * Math.PI)
            }
            context.stroke()
            context.closePath();
            
            
            
            
            
            context.draw();
                       
        }
    }
};

Page(page);
