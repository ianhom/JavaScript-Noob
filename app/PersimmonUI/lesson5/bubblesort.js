var data = [ 45, 30, 40, 50, 32, 56, 12, 34, 21, 23, 13, 46 ];  //柱形图数据
var i = 0;
var j = 0;
var page = {
    dataa : {timer1 : 0},
    onLoad : function()
    {
        var thiz = this;
        var i = 0;
        // Register a timer callback function
        this.dataa.timer1 = setInterval(function()
        {        
           
           thiz.bubblesort();
           
           thiz.display();
        }, 100);
        this.display()
    },

    bubblesort : function()
    {
        var temp = 0;
        if(i >= 11)
        {
            return;
        }
        else
        {
            if(j >= (11-i))
            {
                j = 0;
                i+=1;
            }
            else
            {
                console.log(i,j)
                
                if(data[j] > data[j+1]){
                    temp = data[j]
                    data[j] = data[j+1]
                    data[j+1] = temp;
                    
                }
                j+=1;
            }
        }
    },

    display : function()
    {
        console.log(data[0]);
        var index = 0
        var context = pm.createCanvasContext('Canvas1', this)           //获取画布对象
        if (context)
        {
            var max = 0;

            for( index = 0; index < data.length; index++ )
            {
                max = data[index] > max ? data[index] : max;
            }

            max = Math.floor(max / 6);

            /* 画浅灰色横线 */
            context.beginPath();                //开启新路径
            context.setStrokeStyle('#C0C0C0')   //设置边框颜色

            for( index = 0; index < 7; index++ )
            {
                var y = 30 + index * 50;
                context.moveTo(60, y)                   //线条起点
                context.lineTo(60 + 12 * 28 + 14, y)    //线条终点
            }

            context.stroke()        //画线
            context.closePath();    //关闭当前路径

            /* 画横纵坐标刻度 */
            context.beginPath();            //开启新路径
            context.setStrokeStyle('black') //设置边框颜色

            //context.fillText('用电量（度）', 5, 5)    //绘制文字，坐标（5，5）

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
            context.lineTo(60 + 12 * 28 + 14, 30 + index * 50)

            context.setTextAlign('center')  //设置文本绘制横坐标对齐方式

            for( index = 1; index <= 12; index++ )
            {
                var x = 60 - 14 + index * 28;
                /*横坐标刻度*/
                context.moveTo(x, 380)
                context.lineTo(x, 385)
                context.fillText(index.toString(), x, 395)
            }

            context.setTextAlign('left')    //设置文本绘制横坐标对齐方式
            //context.fillText('时间（月）', 60 + 12 * 28 + 14, 390)
            context.stroke()
            context.closePath();

            /* 画柱形 */
            context.beginPath();
            context.setStrokeStyle('#0094FF')
            context.setLineWidth(18)        //设置线条宽度

            for( index = 0; index < data.length; index++ )
            {
                var x = 60 - 14 + 28 + index * 28;
                var y = data[index] * 350 / (max * 7)
                context.moveTo(x, 380)
                context.lineTo(x, 380 - y)
            }

            context.stroke()
            context.closePath();

            context.draw();
        }
    }
};

Page(page);
