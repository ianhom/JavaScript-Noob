var GRAY   = 0x76D4D0C8
var NORMAL = 0x00D4D0C8 
var flg    = 0;
var pw     = "";
var result = "";

var page = {
    onbutton : function(e)
    {
        console.log("button event")
        if(1 == flg){
            switch(e.target.id){
                case "button0":
                case "button1":
                case "button2":
                case "button3":
                case "button4":
                case "button5":
                case "button6":
                case "button7":
                case "button8":
                case "button9":
                    var num = e.target.id.substring(6, 7);
                    pw += num;
                    console.log(pw);
                    switch(pw.length){
                        case 1:
                           this.setData({label1 : {value : '*',refresh :true}})
                           break
                        case 2:
                           this.setData({label2 : {value : '*',refresh :true}})
                           break
                        case 3:
                           this.setData({label3 : {value : '*',refresh :true}})
                           break
                        case 4:
                           this.setData({label4 : {value : '*',refresh :true}})
                           if (pw == '6666'){
                               result = 'welcome';
                           }else{
                               result = 'Try again'
                           }
                           console.log(result)
                           this.setData({label1 : {value : '',refresh :true}})
                           this.setData({label2 : {value : '',refresh :true}})
                           this.setData({label3 : {value : '',refresh :true}})
                           this.setData({label4 : {value : '',refresh :true}})
                           pw = '';
                           
                           break
                        
                    }
                            
                    
                    break;
                case "buttoncancel":
                    flg = 0;
                    pw  = '';
                    this.setData({imagebox1 : {background : NORMAL}})
                    this.setData({label0 : {background : NORMAL}})
                    this.setData({slider1 : {background : NORMAL}})
                    this.setData({label1 : {value : '',hide : true}})
                    this.setData({label2 : {value : '',hide : true}})
                    this.setData({label3 : {value : '',hide : true}})
                    this.setData({label4 : {value : '',hide : true}})
                    this.setData({button1 : {background : NORMAL,hide : true}})
                    this.setData({button2 : {background : NORMAL,hide : true}})
                    this.setData({button3 : {background : NORMAL,hide : true}})
                    this.setData({button4 : {background : NORMAL,hide : true}})
                    this.setData({button5 : {background : NORMAL,hide : true}})
                    this.setData({button6 : {background : NORMAL,hide : true}})
                    this.setData({button7 : {background : NORMAL,hide : true}})
                    this.setData({button8 : {background : NORMAL,hide : true}})
                    this.setData({button9 : {background : NORMAL,hide : true}})
                    this.setData({button0 : {background : NORMAL,hide : true}})
                    this.setData({buttoncancel : {background : NORMAL,hide : true}})
                    this.setData({slider1 : {value : 0}})
                    this.setData({slider1 : {position : {x:0,y:80}}})   
                    
                    this.setData({page1 : {refresh :true}})
            }
            
        }
    },

    onchange : function(e)
    {
        console.log("change");
        if(e.detail.value > 50){
            console.log(e.detail.value);
            flg = 1;
            this.setData({imagebox1 : {background : GRAY}})
            this.setData({label0 : {background : GRAY}})
            this.setData({slider1 : {background : GRAY}})
            this.setData({slider1 : {value : 100}})   
            this.setData({slider1 : {position : {x:0,y:400}}})   
            this.setData({page1 : {refresh :true,refresh :true}});
            this.setData({label1 : {hide : false,refresh :true}})
            this.setData({label2 : {hide : false,refresh :true}})
            this.setData({label3 : {hide : false,refresh :true}})
            this.setData({label4 : {hide : false,refresh :true}})
            
            
            this.setData({button1 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button2 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button3 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button4 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button5 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button6 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button7 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button8 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button9 : {background : GRAY,hide : false,refresh :true}})
            this.setData({button0 : {background : GRAY,hide : false,refresh :true}})
            this.setData({buttoncancel : {background : GRAY,hide : false,refresh :true}})
            
            
        }else{
            if(0 == flg){
                this.setData({slider1 : {value : 0,refresh :true}})
            }
        }
        
        
    }
    
};

Page(page);
