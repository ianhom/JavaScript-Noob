var t = 5;
var p = 10;
var page = {
    data : {timer1 : 0, timer2 : 0},
    
    onYes : function(e)
    {
        var thiz = this;
        
        this.setData({label2 : {position : {x:268,y:79},refresh:true}})
        this.setData({page3: {refresh:true}})

        this.data.timer1 = setTimeout(function()
        {
            console.log('timer1 timeout');
            clearInterval(thiz.data.timer2);
            clearTimeout(thiz.data.timer1);
            pm.navigateBack();
        }, 1000 * 6);

        this.data.timer2 = setInterval(function()
        {
            console.log(t)
            thiz.setData({label2 : {position : {x:268,y:79+p}}})
            thiz.setData({label2 : {value : t,refresh:true}})
            thiz.setData({page3: {refresh:true}})
            t -= 1;
            p += 10;
        }, 1000);
    },
    onNo : function(e)
    {
        var xx = Math.floor(Math.random()*600+10)
        var yy = Math.floor(Math.random()*360+100)
        console.log(xx,yy)
        this.setData({button2 : {position : {x:xx,y:yy},refresh:true}})
        this.setData({page3: {refresh:true}})
    }
};

Page(page);
