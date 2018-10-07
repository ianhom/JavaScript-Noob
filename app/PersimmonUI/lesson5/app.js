var strcon_flg = 0;
var str1
var str2
var app = {
    page : "page1/page1",

    onLaunch: function (event)  //app加载回调函数
    {
        console.log('app onLaunch');
    
        uart = pm.openSerialPort({device: "uart5"});    //打开串口设备uart5
        if (uart)
        {
            console.log('pm.openSerialPort OK');
            uart.write(Buffer("Please input the date: e.g '2018-10-01 3' which means 3 days data from 2018-10-01 ", 'ascii'));     //串口发送数据，一个ascii字符串数据BUFF
            uart.onData(this.onUart, this);     //设置串口接收函数为 onUart
        }
    },

    onUart : function (data)    //串口接收数据回调函数，data 为串口数据
    {
        if(strcon_flg == 0)
        {
            strcon_flg = 1;
            str1 = data.toString('ascii')
            return;
        }
        else
        {
            str2 = data.toString('ascii');
            strcon_flg = 0;
        }
        var str3 = str1.concat(str2)
        console.log(str3)
        str3 = str3.substring(str3.indexOf("2"))
        console.log(str3)
        var udate = str3.split(" ")
        console.log(udate)
        var x = udate[1]
        for(var i = 0; i < 3; i++)
        {
            console.log(udate[0],' vs ',date[i])
            console.log(x)
            if(udate[0] == date[i])
                break
        }
        if((i >= 3)||(parseInt(x) > 3))
        {
            var str_err = "Invalid date(recent 3 days) or format(2018-10-01 3) "
            console.log(str_err)
            uart.write(Buffer(str_err, 'ascii'));
        }
        else 
        {
            var n = parseInt(x);
            if(i+n > 3)
            {
               n = 3;
            }
            else
            {
               n = i+n
            }
            for(var j = i; j < n; j++)
            {
                var strj = date[j]+ '  High Temperature: '+ high1[j] + '   Low Temperature:' + low1[j] + '    \r\n';
                console.log(strj)
                uart.write(Buffer(strj, 'ascii'));
            }
        }
    }
};

App(app);
