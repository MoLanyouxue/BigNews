$(function () {
    // 1、注册点击submit事件
    // 2、获取表单数据，用表单序列化
    // 3、Ajax获取数据库登录账户密码
    // 4、判断账户密码是否正确，正确跳转到主页面
    var $form = $('.login_form');
    var $btn = $('.input_sub');
    var $modal = $('.modal');
    var $p = $('.modal .modal-body p');

    // 注册submit点击事件
    $form.on('submit', function (e) {
        var $data = $form.serialize();
        console.log("每一次点击登录按钮（submit）的时候都会触发，在此时，表单内的属性已经被填写")
        FormSerializeEmpty($data);

        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/user/login',
            data: $data,
            beforeSend: function () {
                e.preventDefault();//==>阻止默认事件
            },
            success: function (login) {
                // 登陆成功之后 单击了确定按钮之后才要跳转到主页面
                console.log(login);

                if (login.code == 200) {
                    $modal.modal('show');
                    $p.html(login.msg);
                    // 给模态框注册一个隐藏触发的事件
                    $modal.on('hidden.bs.modal', function (e) {
                        // do something...
                        // 跳转到主页面
                        window.location.href = './index.html'
                    });
                }

            }
        });
    })



    /**
     * @method FormSerializeEmpty
     * @param{object}
     *      formSerialize 表单序列化
     * @return {返回值类型} 返回值说明
     */
    // function FormSerializeEmpty(formSerialize) {
    //     console.log(formSerialize)
    //     // console.log(test)
        
    //     var array = formSerialize.split("&");
    //     console.log('arr:' + array);
    //     for (var i = 0; i < array.length; i++) {
    //         var kwarr = array[i].split("=");
    //         console.log(kwarr);
    //         for (var j = 0; j < kwarr.length; j++) {
    //             console.log(kwarr[j]);

    //             if (kwarr[j] == null || kwarr[j] == '') {
    //                 $p.html('账号和密码不能为空');
    //                 $modal.modal('show');
    //                 return;
    //             } 
    //             // else if (kwarr[j] != 'admin' || kwarr[j] != '123456') {
    //             //     $p.html('用户名或密码不正确！');
    //             //     $modal.modal('show');
    //             //     return;
    //             // }
    //         }
    //     }

    // };

    function FormSerializeEmpty(formSerialize) {
        console.log(formSerialize);//=>username=&password=
        // console.log(test)
        
        var array = formSerialize.split("&");
        console.log('arr:' + array); //=>arr:username=,password=
        var obj={};
        for (var i = 0; i < array.length; i++) {

            var kwarr = array[i].split("=");
            obj[kwarr[i].split('=')[0]] = kwarr[i].split('=')[1];
            // console.log(kwarr);//=>(2) ["username", ""] ["password", ""]
            // console.log(kwarr.toString());
            
        }
        console.log(obj);
        

    };
})