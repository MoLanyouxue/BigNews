$(function () {
    // 1、注册点击submit事件
    // 2、获取表单数据，用表单序列化
    // 3、Ajax获取数据库登录账户密码
    // 4、判断账户密码是否正确，正确跳转到主页面
    let $form = $('.login_form');
    let $btn = $('.input_sub');
    let $modal = $('.modal');
    let $p = $('.modal .modal-body p');

    // 注册submit点击事件
    $form.on('submit', function (e) {
        let $data = $form.serialize();
        FormSerializeEmpty($data);
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: $data,
            beforeSend: function () {
                e.preventDefault();//==>阻止默认事件
            },
            success: function (login) {
                // 登陆成功之后 单击了确定按钮之后才要跳转到主页面
                console.log(login);

                if (login.code === 200) {
                    $modal.modal('show');
                    $p.html(login.msg);
                    // 给模态框注册一个隐藏触发的事件
                    $modal.on('hidden.bs.modal', function (e) {
                        // do something...
                        // 将服务器响应回来的token存储到本地存储中
                        localStorage.setItem('token',login.token);
                        // 跳转到主页面
                        window.location.href = './index.html'
                    });
                }else {
                    $modal.modal('show');
                    $p.html(login.msg);
                }

            }
        });
    })

    /**
     * 表单序列化判空
     * @method FormSerializeEmpty 
     * @param{object} formSerialize 表单序列化
     * @return {true/false} 用户填写表单时：如果有空值则返回false，如果都填写则是true
     */

    function FormSerializeEmpty(formSerialize) {
        var array = formSerialize.split("&");
        for (var i = 0; i < array.length; i++) {
            var kwarr = array[i].split("=");
            console.log(kwarr);
            for (var j = 0; j < kwarr.length; j++) {
                if (kwarr[j] == null || kwarr[j] == '') {
                    $p.html('账户和密码不能为空！');
                    $modal.modal().show();
                    return false;
                }
            }
        }

    }
})