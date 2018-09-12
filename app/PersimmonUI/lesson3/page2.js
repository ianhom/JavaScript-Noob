var p = -470;
var q = 0;
var page = { 
    data : {timer1 : 0, timer2 : 0},
    onbutton: function(e)
    {
        var thiz = this;
              
        switch(e.target.id){
            case "button1":
                pm.navigateBack();
                break;
            case "button2":
                pm.navigateTo({url: "page4/page4"});
                break;
            case "button3":
                pm.navigateTo({url: "page5/page5"});
                break;
            case "button4":
                pm.navigateTo({url: "page3/page3"});
                break;
            case "button5":
                pm.navigateTo({url: "page6/page6"});
                break;  
            case "button6":
            case "button7":
            case "button8":
            case "button9":
            case "button10":
            case "button11":
                pm.navigateTo({url: "page7/page7"});
                break;  
            case "button12":
                this.data.timer1 = setTimeout(function()
                {
                    console.log('timer1 timeout');
                    clearInterval(thiz.data.timer2);
                    clearTimeout(thiz.data.timer1);
                    p = -470
                }, 300 * 1);

                this.data.timer2 = setInterval(function()
                {
                    thiz.setData({listctrl2 : {position : {x:19,y:p}}})
                    thiz.setData({listctrl2 : {refresh:true}})

                    p += 16;
                }, 10);
           

                break;
            case "button13":
                this.data.timer1 = setTimeout(function()
                {
                    console.log('timer1 timeout');
                    clearInterval(thiz.data.timer2);
                    clearTimeout(thiz.data.timer1);
                    q = 0
                    thiz.setData({page2: {refresh:true}})

                }, 300 * 1);

                this.data.timer2 = setInterval(function()
                {
                    thiz.setData({listctrl2 : {position : {x:19,y:q}}})
                    thiz.setData({listctrl2 : {refresh:true}})
                    q -= 16;
                }, 10);
           

                break;
        }      
    }
};

Page(page);
