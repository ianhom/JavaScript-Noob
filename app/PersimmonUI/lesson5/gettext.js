var page = {
	onButton: function(e) {
	
		var thiz = this;
		console.dir(e);
		if(e.target.id == "connect")    //当Button : connect 按下时，请求 http request
		{
			var rq1 = pm.request({
			  url: 'http://www.rt-thread.com/service/rt-thread.txt', 	//开发者服务器接口地址
			  method : 'POST',						//请求方式
			  header:{								//设置请求的header
			      "Content-Type":"application/json"
			  },
			  data: {								//请求的参数
				  x: '',
				  y: ''
			  },
			  success: function(res) {              //与开发者服务器连接成功后，执行的回调函数
				 console.log('request success'),
			     console.log(res.data.toString('utf8')),	//从开发者服务器收到的数据,data的类型是Buffer，可以通过指定API转换成我们需要的编码格式
				 console.log(res.statusCode),       //从开发者服务器收到的状态码
				 console.dir(res.header),           //从开发者服务器收到的header
				 thiz.setData({MultiTextBox1: { value : res.data , refresh : true}})   //把返回的数据显示在MultiTextBox1中
			  },
			  complete: function(){                 //当http request操作完成后，执行的回调函数，无论连接成功还是失败都会执行
				console.log('request complete')  
			  },
			  fail: function(){                     //与开发者服务器连接失败后，执行的回调函数
				console.log('request failed'),
				thiz.setData({MultiTextBox1: { value : "connect failed" , refresh : true}}) 
			  }
			});
		}else if(e.target.id == "clean")
		{
			console.log("ready to clean"),
			thiz.setData({MultiTextBox1: { clear : true , refresh : true}})    //清除MultiTextBox1的内容
		}

	}
};

Page(page);
