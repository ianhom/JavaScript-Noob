var flg = 0;

var page = {
    data: { result: ''},
    op: 'null',
    left: 0,
    
    onbutton: function(e)
    {
        pm.navigateBack();
    },

    onButton: function (e) {
        var result = this.data.result;
        if (flg == 1) {
            result = '';
            flg = 0;
        }
        console.dir(e);

        switch (e.target.id) {
            //根据控件ID设置result控件显示
            case "num0":
            case "num1":
            case "num2":
            case "num3":
            case "num4":
            case "num5":
            case "num6":
            case "num7":
            case "num8":
            case "num9":
                //获取到被点击控件对应数值
                var num = e.target.id.substring(3, 4);
                console.log(num);
                if (flg == 2) {
                    result = '';
                    flg = 0;
                }
                if (result != '0') result += num;
                else result = num;
                break;

            case "numdot":
                if (flg == 2) {
                    result = '';
                    flg = 0;
                }
                if (result.indexOf(".") > 0) break;
                else if (result.length == 0) result = "0.";
                else result += ".";
                break;

            case "btnback"://退格
                if (result.length == 1) result = '';
                else result = result.substring(0, result.length - 1);
                break;

            case "btnDiv"://除
                if (result != '') {
                    this.op = "div";
                    this.left = Number(result);
                    flg = 1;
                }
                break;

            case "btnMul"://乘
                if (result != '') {
                    this.op = "mul";
                    this.left = Number(result);
                    flg = 1;
                } 
                break;

            case "btnSub"://减
                if (result != '') {
                    this.op = "minus";
                    this.left = Number(result);
                    flg = 1;
                } 
                break;

            case "btnAdd"://加
                if (result != '') {
                    this.op = "plus";
                    this.left = Number(result);
                    flg = 1;
                } 
                break;

            case "btnClear"://清除
                result = '';
                break;

            case "btnEqu"://等于
                if (this.op == 'null') break;

                //结果计算
                switch (this.op) {
                    case 'div'://除
                        var num = Number(result);
                        if (num == 0) result = 0;
                        else result = this.left / num;
                        break;

                    case 'mul'://乘
                        result = this.left * Number(result);
                        break;

                    case 'minus'://减
                        result = this.left - Number(result);
                        break;

                    case 'plus'://加
                        result = this.left + Number(result);
                        break;
                }

                this.left = 0;
                result = String(result);
                this.op = 'null';
                flg = 2;
                break;
        }
 
        if (this.data.result != result) {
            this.data.result = result;
            //设值并刷新控件
            this.setData({ result: { value: this.data.result, refresh: true } });
        }
    },
};
Page(page);
