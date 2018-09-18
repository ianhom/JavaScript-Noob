var page = {
    str : '',
    onUpdate: function (data)   //数据更新回调
    {
    console.log(data.value.toString('utf8'));
        if (data.type == 'uart')
        {
            this.str += data.value.toString('utf8');
            console.log(this.str);
            this.setData({MultiTextBox1 : {value : this.str, refresh : true}})  //设置MultiTextBox控件显示内容
        }
    },

    onBtn : function()  //Button 点击回调函数
    {
        this.str = '';
        this.setData({MultiTextBox1 : {clear : true, refresh : true}})      //清空MultiTextBox控件显示内容
    }
};

Page(page);
