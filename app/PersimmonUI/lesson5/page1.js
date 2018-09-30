var data = [ 45, 30, 40, 50, 32, 56, 12, 34, 21, 23, 13, 46 ];  //柱形图数据
var date = ['2018-09-29','2018-09-30','2018-10-01']
var code = ['Sunny','Cloudy','Snowy']
var high = [0, 0, 0]
var low  = [0, 0, 0]
var high1 = [25, 26, 24]
var low1  = [15, 10, 17]
var DISTANCE = 110
var jsons = '{"results":[{"location":{"id":"WX4FBXXFKE4F","name":"Beijing","country":"CN","path":"Beijing,Beijing,China","timezone":"Asia/Shanghai","timezone_offset":"+08:00"},"daily":[{"date":"2018-09-30","text_day":"Cloudy","code_day":"4","text_night":"Cloudy","code_night":"4","high":"19","low":"13","precip":"","wind_direction":"NW","wind_direction_degree":"315","wind_speed":"20","wind_scale":"4"},{"date":"2018-10-01","text_day":"Sunny","code_day":"0","text_night":"Sunny","code_night":"1","high":"24","low":"12","precip":"","wind_direction":"N","wind_direction_degree":"0","wind_speed":"20","wind_scale":"4"},{"date":"2018-10-02","text_day":"Sunny","code_day":"0","text_night":"Sunny","code_night":"1","high":"24","low":"11","precip":"","wind_direction":"N","wind_direction_degree":"0","wind_speed":"10","wind_scale":"2"}],"last_update":"2018-09-30T11:00:00+08:00"}]}'

var s1 = 'https://api.seniverse.com/v3/weather/daily.json?key=hfvxxp7oq0w4dmso&location='
var city = 'beijing'
var s2 = '&language=en&unit=c&start='
var day = '0'
var s3 = '&days=3'
var url_w = s1+city+s2+day+s3

var xx = 1;
var xx1 = 1;
var i = 0;
var j = 0;
var page = {
    dataa : {timer1 : 0},
    onBtn : function()
    {
        this.onUpdate()
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
                    high[k] += Math.round(high1[k]/10)
                }
                if(low[k] < low1[k]){
                    low[k]  += Math.round(low1[k]/10)
                }
            }
            
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
        var context = pm.createCanvasContext('Canvas1', this)           //获取画布对象

         if (context)
        {
            var max = 35;

            for(var j = 0; j < 3; j++)
            {
                grd = context.createLinearGradient(0, 0, 0, 480)
                grd.addColorStop(0, 'black')
                if(code[j] == 'Sunny')
                {
                    grd.addColorStop(1, '#FF9090FF')
                }else if(code[j] == 'Cloudy')
                {
                    grd.addColorStop(1, 'GRAY')
                }else
                {
                    grd.addColorStop(1, '#FFB9FFB9')
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
            context.setStrokeStyle('#FFFF6969')
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
            context.setStrokeStyle('#FF6969FF')
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
            
            // Value
            context.setTextAlign('center')
            context.setFillStyle('white')
            for( index = 0; index < 3; index++ )
            {
                var x = 60 + DISTANCE/2 + index * DISTANCE;
                var y = high[index] * 350 / (max * 7)
                context.fillText(high[index].toString(), x, 365-y)
                
                var x = 60 + DISTANCE/2 + index * DISTANCE;
                var y = low[index] * 350 / (max * 7)
                context.fillText(low[index].toString(), x, 395-y)
                
                var x = 60 + DISTANCE/2 + index * DISTANCE;
                context.fillText(code[index], x, 50)
            }
            
            context.draw();
                       
        }
    },
    onUpdate : function(){		//根据json_obj中的数据，来设定对应Label的值
        //str = '{"sk_info":{"date":"20131012","cityName":"123","areaID":"101010100","temp":"21","tempF":"69.8","wd":"3","ws":"33","sd":"39%","time":"15:10","sm":"3"}}'
		//json_obj = JSON.parse(str)
		console.log(json_obj.results[0].daily[0].date)
		//console.log(json_obj.results[0].daily[1].date)
		//console.log(json_obj.results[0].daily[2].date)
		//this.onSetDate(json_obj.sk_info.date);
//		this.setData({temp : {value : json_obj.sk_info.temp , refresh : true}});
//		this.setData({wind : {value : json_obj.sk_info.wd , refresh : true}});

	},
    
    getSkyInfo: function(e) {
	var thiz = this;
	var str =0;
	
	var rq1 = pm.request({
	    url: url_w, // 获取天气预报的API，返回伪数据
		method : 'GET',
		header:{
			"Content-Type":"application/json"
		},
		success: function(res) {		//与开发者服务器连接成功后，执行的回调函数
			str = res.data.toString('utf8');	// 把data从Buffer转成string
			json_obj=JSON.parse(str);			//把JSON格式的string转成JSON对象，以便获取数据
			thiz.onUpdate();	//更新各个控件的值
		},
		fail: function(){
			console.log('request failed')
		}
		});
	}
};

Page(page);