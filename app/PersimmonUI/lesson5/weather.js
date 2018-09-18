var json_obj =0;	//定义一个全局对象，用来保存http request返回的JSON对象
var page = {

	data : {timer : 0},		//定时器
	
	onSetDate : function(e)		//更新日期，根据json_obj中日期的数据，来更新指定ImageBox的图片
	{
		var k=10000000;
		var data ={};
		for(var i=8,j=e; i>0 ;i--)
		{
			data['number'+i] = {value: parseInt(j/k)+".png",refresh:true};
			this.setData(data);
			j=j%k;
			k=k/10;
		}
	},
	
	onUpdate : function(){		//根据json_obj中的数据，来设定对应Label的值
		this.onSetDate(json_obj.sk_info.date);
		this.setData({temp : {value : json_obj.sk_info.temp , refresh : true}});
		this.setData({wind : {value : json_obj.sk_info.wd , refresh : true}});
		this.setData({windlevel : {value : json_obj.sk_info.ws , refresh : true}});
		this.setData({humidity : {value : json_obj.sk_info.sd , refresh : true}});
	},
	
	getSkyInfo: function(e) {
		var thiz = this;
		var str =0;
		
		var rq1 = pm.request({
			url: 'http://mobile.weather.com.cn/data/sk/101190101.html?_=1381891661455', // 获取天气预报的API，返回伪数据
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
	},
	
	onLoad : function(e) {
		var thiz = this;
		this.data.timer = setInterval(function()	//设置定时器，每十秒更新天气预报数据
		{
			console.log("update sky info");
			thiz.getSkyInfo();
		}, 1000 * 10);
	}	
};

Page(page);
