
var k        = 0;  // 转速值
var speed    = 0;  // 速度值
var sft      = 0;  // 档位
var flg      = 3;  // 加速标志
var startflg = 0;  // 启动启动，0-未启动，1-已启动，2-启动中

var page = {
    data : {timer1 : 0},
    
    // 启动按钮功能
    onstart : function(e)
    {
        if(startflg == 0){
            k = 0;
            speed = 0;
            startflg = 2;
        }else{
            k = 0;
            speed = 0;
            startflg = 0;
            sft = 0;
            flg = 3;
            this.setData({imagebox1 : {hide : false}})
            this.setData({imagebox2 : {hide : false}})
            this.setData({imagebox3 : {hide : false}})
            this.setData({imagebox4 : {hide : false}})
            this.setData({page1 : {refresh : true}})
        }
        
    },   
    
    // Speed up
    onup : function(e)
    {
        flg = 3;
        if (startflg == 0){
            return;
        }
        if((sft < 5) && (k >45)){
            k = 26;
            sft += 1;
        }
       
        if(k <= 100){
            k += 4*((100-k)/100);
        }
        if((speed <= 100)&&(speed >= 0)){
            speed += 5*((100-speed)/100);
        }
    }, 
    
    // Break function
    onbreak : function(e)
    {
        if (startflg == 0){
            return;
        }
        if(k >= 26){
            k -= 3;
        }else{
            k = 25;
        }
        
        if(speed >= 5){
            speed -= 5
        }else{
            speed = 0;
        }
    },
     
    // Init function
    onLoad : function()
    {
        var thiz = this;
        // Register a timer callback function
        this.data.timer1 = setInterval(function()
        {
           if(flg > 0){
               flg -= 1;
           }
           
           if((flg == 0)&&(startflg == 1)){
               if(k >= 26){
                   k -= 1
               }else{
                   k = 25
               }
               if(speed >= 1){
                   speed -= 1
               }else{
                   speed = 0;
               }
               
               if(sft > 0){
                   if(speed < 1){
                       sft = 0;
                   }else if(speed < 5){
                       sft = 1;
                   }
                   else if(speed < 15){
                       sft = 2;
                   }
                   else if(speed < 25){
                       sft = 3;
                   }
                   else if(speed < 40){
                       sft = 4;
                   }
               }
           }
           if(startflg == 0)
           {
               k = 0;
               speed = 0;
               sft = 0;
               flg = 3;
           }else if(startflg == 2){
               k+=3;
               if(k > 25){
                   startflg = 1;
                   thiz.setData({imagebox1 : {hide : true}})
                   thiz.setData({imagebox2 : {hide : true}})
                   thiz.setData({imagebox3 : {hide : true}})
                   thiz.setData({imagebox4 : {hide : true}})
                   thiz.setData({page1 : {refresh : true}})
               }
           }
           
           thiz.display();
        }, 100);
        this.display()
    },
    
    // Display function
    display : function()
    {        
         var context = pm.createCanvasContext('Canvas1', this)   //获取画布对象        

        //绘制渐变背景
        var grd = context.createLinearGradient(0, -9900 + 100*speed,0,360)
        grd.addColorStop(0, 'red')
        grd.addColorStop(1, 'black')
        context.setFillStyle(grd)
        context.fillRect(0, 0, 800, 480)
        
        //绘制小屏
        var grd = context.createLinearGradient(345, 10, 455, 10)
        grd.addColorStop(0, 'BlueViolet')
        grd.addColorStop(1, 'blue')
        context.setFillStyle(grd)
        context.fillRect(345, 5, 110, 60)
        var grd = context.createLinearGradient(350, 10, 430, 10)
        grd.addColorStop(0, 'blue')
        grd.addColorStop(1, 'BlueViolet')
        context.setFillStyle(grd)
        context.fillRect(350, 10, 100, 50)
        context.setFillStyle('white')
        context.fillText('.', 436,5)
        context.fillText(sft.toString(), 355,12)
        context.fillText('25 C', 420,12)
        context.fillText('------------------', 355,22)
        context.fillText('RT-Thread', 370,35)
        context.fillText('Persimmon GUI', 351,45)
        
        //绘制转速表
        if (context)
        {
            var point = { x: 200, y: 200 };     //圆心坐标，相对于画布
            var radius = 165;                   //半径
            var start = -1.25 * Math.PI;        //起始弧度

            context.setLineWidth(25)
            context.setStrokeStyle('white')
            context.setFillStyle('white');
            
            for( var i = 0; i <= 9; i++ )
            {
                var stop = start + 0.1875 * Math.PI ;     //结束弧度
                var x = Math.floor(140 * Math.cos(start)) + 200;
                var y = Math.floor(140 * Math.sin(start)) + 200;
                var v = 1 * i;
                var s = v.toString()
                context.setFontSize(40)
                
                if (i == 9)
                    break;
                
                context.fillText(s, x, y);

                context.beginPath();    //开始新的路径

                context.arc( point.x, point.y, radius, start, stop - 0.175 * Math.PI, false);     //画一段圆弧

                context.stroke();       //填充路径

                context.closePath();    //关闭路径
                start = stop;

                if (i == 5)
                {
                    context.setStrokeStyle('#C23531')
                    context.setFillStyle('#C23531');
                }
            }  // End of cycle
            
            radius = 170;
            start = -1.25 * Math.PI; 
            context.setLineWidth(15)
            context.setStrokeStyle('white')
            context.setFillStyle('white')
            context.fillText('rpm', 65,237)
            context.fillText('x 1000', 70,247)
            for( var i = 0; i < 40; i++ )
            {
                var stop = start + 0.0375 * Math.PI ;

                context.beginPath();

                context.arc( point.x, point.y, radius, start, stop - 0.0325 * Math.PI, false);

                context.stroke();

                context.closePath();
                start = stop;

                if (i == 29)
                {
                    context.setStrokeStyle('#C23531')
                }
            }// End of scale


            {   //绘制指针
                var value = k
                var v1 = Math.floor(value * 800)
                var radius = 130;
                var x = Math.floor(radius * Math.cos((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
                var y = Math.floor(radius * Math.sin((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;

                context.beginPath();
        
                context.setFillStyle('red');
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
                context.fillText(v1.toString(), 200, 250)
                
                context.closePath();
            }
///////////////////////////////////////////////////////////////////////////////////////////
            
            // 绘制时速表
            var point = { x: 600, y: 200 };     //圆心坐标，相对于画布
            var radius = 165;                   //半径
            var start = -1.25 * Math.PI;        //起始弧度

            context.setLineWidth(25)
            context.setStrokeStyle('white')
            context.setFillStyle('white');
            context.setFillStyle('white')
            context.fillText('km/h', 480,255)
            
            for( var i = 0; i <= 11; i++ )
            {
                var stop = start + 0.15 * Math.PI ;     //结束弧度
                var x = Math.floor(140 * Math.cos(start)) + 600;
                var y = Math.floor(140 * Math.sin(start)) + 200;
                var v = 20 * i;
                var s = v.toString()
                context.setFont('DROIDSA')
                context.setFontSize(40)
                
                if (i == 11)
                    break;
                
                context.fillText(s, x, y);

                context.beginPath();    //开始新的路径

                context.arc( point.x, point.y, radius, start, stop - 0.14 * Math.PI, false);     //画一段圆弧

                context.stroke();                         //填充路径

                context.closePath();                    //关闭路径
                start = stop;

                if (i == 7)
                {
                    context.setStrokeStyle('#C23531')
                    context.setFillStyle('#C23531');
                }
            }  // End of cycle
            
            radius = 170;
            start = -1.25 * Math.PI; 
            context.setLineWidth(15)
            context.setStrokeStyle('white')

            for( var i = 0; i < 50; i++ )
            {
                var stop = start + 0.03 * Math.PI ;

                context.beginPath();

                context.arc( point.x, point.y, radius, start, stop - 0.025 * Math.PI, false);

                context.stroke();

                context.closePath();
                start = stop;

                if (i == 39)
                {
                    context.setStrokeStyle('#C23531')
                }
            }// End of scale
            
            {   //绘制指针
                var value = speed
                var v1 = Math.floor(value * 2)
                var radius = 130;
                var x = Math.floor(radius * Math.cos((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.x;
                var y = Math.floor(radius * Math.sin((-1.25 * Math.PI + value * 1.5 * Math.PI / 100))) + point.y;

                context.beginPath();
        
                context.setFillStyle('red');
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
                context.fillText(v1.toString(), 600, 250)

                context.closePath();
            }

            context.draw();
        }
    }
};

Page(page);
