var arrOri    = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var arrTempI  = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var arrTempS  = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var arrRedo   = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var arrRTT    = [[0,2,4,8],[16,32,64,128],[256,512,1024,1024],[1024,1024,1024,1024]];
var Score     = 0;
var ScoreRedo = 0;
var Res       = 0; //1=win,2=lose;
var BASECLR   = 0xFFFFF48F;
var OFFSET    = 100;

function printArr(arr)
{
    for(var i=0;i<4;i++){
        console.log(arr[i][0],arr[i][1],arr[i][2],arr[i][3]);
    }  
}

function arrCp(arrSrc,arrDes)
{
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            arrDes[i][j] = arrSrc[i][j];
        }
    }    
}

function arrCmp(arrSrc,arrDes)
{
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(arrDes[i][j] != arrSrc[i][j]){
                return 0;
            }
        }
    }
    return 1;    
}

function arrSpan(arrSrc,arrDes)
{
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            arrDes[j][i] = arrSrc[i][j];
        }
    }    
}

function arrInvt(arrSrc,arrDes)
{
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            arrDes[i][j] = arrSrc[i][3-j];
        }
    }    
}

function addNum()
{   
    var blankCnt = 0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(0 == arrOri[i][j]){
                blankCnt += 1;
            }
        }
    }

    var luckyNum = Math.floor(Math.random()*2+1)*2;
    var luckyBox = Math.floor(Math.random()*blankCnt+1);

    blankCnt = 0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(0 == arrOri[i][j]){
                blankCnt += 1;
                if(blankCnt == luckyBox)
                {
                    arrOri[i][j] = luckyNum;
                }
            }
        }
    }
}

function getColor(val)
{
    var temp = (BASECLR + (OFFSET *( Math.log(val)/Math.log(2))));
    return temp;
}

function gameCheck()
{
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(arrOri[i][j] == arrOri[i][j+1]){
                return;
            }
        }
    }
    for(var j=0;j<4;j++){
        for(var i=0;i<3;i++){
            if(arrOri[i][j] == arrOri[i+1][j]){
                return;
            }
        }
    }
    for(var j=0;j<4;j++){
        for(var i=0;i<4;i++){
            if(0 == arrOri[i][j]){
                return;
            }
        }
    }
    
    Res = 2;
}

function getData(arr) 
{
    //遍历数组从数组的的当前位置的下一个开始遍历，找不是0的位置()
        // 如果没找到什么也不做
        // 如果找到
           //如果当前位置是0，那么像当前位置与下一个进行互换（当前位置获得下一个位置的数据，并且将下一个位置数据置为0，将下标减一）
           //如果当前位置和下一个位置相等，将当前位置数据*2，下个位置数据置0
    var i,nextI,len,m;
    len = arr.length;
    for (i = 0; i < len; i += 1) {
        //先找nextI
        nextI = -1;
        for (m = i+1; m < len; m++){
            if(arr[m] !== 0) {
                nextI = m;
                break;
            }
        }

        if (nextI !== -1) {
            //存在下个不为0的位置
            if (arr[i] === 0) {
                arr[i] = arr[nextI];
                arr[nextI] = 0;
                i -= 1;
            } else if (arr[i] === arr[nextI]) {
                arr[i] = arr[i]*2;
                Score += arr[i];
                arr[nextI] = 0;
                if(2048 == arr[i]){
                    Res = 1;
                }
            }
        }
    }   
}

var page = {

    onButton: function(e)
    {
        if((e.target.id != "buttonRedo")&&(2 != Res)){
            arrCp(arrOri,arrRedo);
            ScoreRedo = Score;
        }
        
        switch (e.target.id) {
            case "buttonStart":
                arrOri = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                Score  = 0; 
                Res    = 0;
                this.setData({buttonStart : {value :'Restart!!', refresh : true}})
                this.setData({label19: {value : "", refresh : true}});
                this.setData({imagebox2 : {value :'', refresh : true}})
                addNum();
                break;
            case "buttonLeft":
                for(var i = 0; i < 4; i++){
                    getData(arrOri[i]);
                }
                break;
            case "buttonRight":
                arrInvt(arrOri,arrTempI);
                for(var i = 0; i < 4; i++){
                    getData(arrTempI[i]);
                }
                arrInvt(arrTempI,arrOri);
                break;
            case "buttonUp":
                arrSpan(arrOri,arrTempS);
                for(var i = 0; i < 4; i++){
                    getData(arrTempS[i]);
                }
                arrSpan(arrTempS,arrOri);
                break;
            case "buttonDown":
                arrSpan(arrOri,arrTempS);
                arrInvt(arrTempS,arrTempI);
                for(var i = 0; i < 4; i++){
                    getData(arrTempI[i]);
                }
                arrInvt(arrTempI,arrTempS);
                arrSpan(arrTempS,arrOri);
                break;
            case "buttonRedo":
                arrCp(arrRedo,arrOri);
                Score = ScoreRedo;
                Res = 0;
                break;
            case "buttonRTT":
                arrCp(arrRTT,arrOri);
                Score = 999999999;
                Res = 0;
                break;
        }
        if((e.target.id != "buttonRedo")&&(0 == arrCmp(arrOri,arrRedo))){
            addNum()
        }
       
        
        if(arrOri[0][0] == 0){
            this.setData({label1 : {value : ""}});
        }else{
            this.setData({label1 : {value : arrOri[0][0]}});
        }
        this.setData({label1 : {background: getColor(arrOri[0][0]), refresh : true}});
        
        if(arrOri[0][1] == 0){
            this.setData({label2 : {value : ""}});
        }else{
            this.setData({label2 : {value : arrOri[0][1]}});
        }
        this.setData({label2 : {background: getColor(arrOri[0][1]), refresh : true}});
        
        if(arrOri[0][2] == 0){
            this.setData({label3 : {value : ""}});
        }else{
            this.setData({label3 : {value : arrOri[0][2]}});
        }
        this.setData({label3 : {background: getColor(arrOri[0][2]), refresh : true}});
        
        if(arrOri[0][3] == 0){
            this.setData({label4 : {value : ""}});
        }else{
            this.setData({label4 : {value : arrOri[0][3]}});
        }       
        this.setData({label4 : {background: getColor(arrOri[0][3]), refresh : true}});
        
        if(arrOri[1][0] == 0){
            this.setData({label5 : {value : ""}});
        }else{
            this.setData({label5 : {value : arrOri[1][0]}});
        }
        this.setData({label5 : {background: getColor(arrOri[1][0]), refresh : true}});
        
        if(arrOri[1][1] == 0){
            this.setData({label6 : {value : ""}});
        }else{
            this.setData({label6 : {value : arrOri[1][1]}});
        }
        this.setData({label6 : {background: getColor(arrOri[1][1]), refresh : true}});
        
        if(arrOri[1][2] == 0){
            this.setData({label7 : {value : ""}});
        }else{
            this.setData({label7 : {value : arrOri[1][2]}});
        }
        this.setData({label7 : {background: getColor(arrOri[1][2]), refresh : true}});
        
        if(arrOri[1][3] == 0){
            this.setData({label8 : {value : ""}});
        }else{
            this.setData({label8 : {value : arrOri[1][3]}});
        }
        this.setData({label8 : {background: getColor(arrOri[1][3]), refresh : true}});
        
        if(arrOri[2][0] == 0){
            this.setData({label9 : {value : ""}});
        }else{
            this.setData({label9 : {value : arrOri[2][0]}});
        }
        this.setData({label9 : {background: getColor(arrOri[2][0]), refresh : true}});
        
        if(arrOri[2][1] == 0){
            this.setData({label10: {value : ""}});
        }else{
            this.setData({label10 : {value : arrOri[2][1]}});
        }
        this.setData({label10: {background: getColor(arrOri[2][1]), refresh : true}});
        
        if(arrOri[2][2] == 0){
            this.setData({label11: {value : ""}});
        }else{
            this.setData({label11 : {value : arrOri[2][2]}});
        }
        this.setData({label11: {background: getColor(arrOri[2][2]), refresh : true}});
        
        if(arrOri[2][3] == 0){
            this.setData({label12: {value : ""}});
        }else{
            this.setData({label12 : {value : arrOri[2][3]}});
        }
        this.setData({label12: {background: getColor(arrOri[2][3]), refresh : true}});
        
        if(arrOri[3][0] == 0){
            this.setData({label13: {value : ""}});
        }else{
            this.setData({label13 : {value : arrOri[3][0]}});
        }
        this.setData({label13: {background: getColor(arrOri[3][0]), refresh : true}});
        
        if(arrOri[3][1] == 0){
            this.setData({label14: {value : ""}});
        }else{
            this.setData({label14 : {value : arrOri[3][1]}});
        }
        this.setData({label14: {background: getColor(arrOri[3][1]), refresh : true}});
        
        if(arrOri[3][2] == 0){
            this.setData({label15: {value : ""}});
        }else{
            this.setData({label15 : {value : arrOri[3][2]}});
        }
        this.setData({label15: {background: getColor(arrOri[3][2]), refresh : true}});
        
        if(arrOri[3][3] == 0){
            this.setData({label16: {value : ""}});
        }else{
            this.setData({label16 : {value : arrOri[3][3]}});
        }
        this.setData({label16: {background: getColor(arrOri[3][3]), refresh : true}});      
        
        gameCheck();
        
        if(1 == Res){
            this.setData({label19: {value : "Win!!", refresh : true}});
        }else if(2 == Res){
            this.setData({label19: {value : "lose!!", refresh : true}});
        }
        else{
            this.setData({label19: {value : "", refresh : true}});
        }
        
        this.setData({label17: {value : Score, refresh : true}});
    }
};

Page(page);
