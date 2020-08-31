$(function(){

    /*  1、获取用户详细信息  */
    $.ajax({
        type:'get',
        url:BigNew.user_detail,
        // url: BigNew.user_detail,
        success:function(detail){
            console.log(detail);
            if(detail.code === 200){
                // 渲染页面
                // $('input.usernama').val(detail.data.username);
                // $('input.nickname').val(detail.data.nickname);
                // $('input.email').val(detail.data.email);
                // $('#form.userPic').val(detail.data.userPic);
                // $('input.password').val(detail.data.password);

                // 渲染页面的表单元素（类名）与服务器返回的对象（属性名一致）就可以写for-in循环优化代码
                for (const key in detail.data) {
                    if (detail.data.hasOwnProperty(key)) {
                        $('input.'+key).val(detail.data[key])
                    }
                }
                // 单独设置头像
                $('#form .user_pic').attr('src',detail.data.userPic);
                // $('#myForm .user_pic').attr('src', res.data.userPic)

            }
        }
    });

    /*  2、文件预览 2.1给file表单元素onchange事件  */
    $('#exampleInputFile').change(function(){
        // 2.2 获取用户选择的图片
        var file = this.files[0];
        // 2.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        // 2.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src',url);
    });


    // /*  3、更新用户信息 2.1 使用formData提交  */
    $('#form').on('submit',function(e){
        
        // 禁用表单默认提交事件
        e.preventDefault();     
        // 3.3 准备formData数据
        var data = new FormData($(this)[0]);
        $.ajax({    
            type:'post',
            url:BigNew.user_edit,
            data:data,
            processData:false, // 不要将数据转换成字符串了，因为图片是二进制格式
            contentType:false,// $.ajax()函数内部不要再将数据进行格式转化
            success:function(edit){
                if(edit.code === 200){
                    // 3.4 局部刷新 重新发送请求，获取最新的昵称和头像
                    $.ajax({
                        url: BigNew.user_info,
                        type: 'get',
                        success: function (info) {
                            if(info.code === 200){
                                // console.log(info.data);
                                // 左侧昵称
                                parent.$('.user_info>span').text('欢迎 '+info.data.nickname);
                                // 左侧头像
                                parent.$('.user_info>img').attr('src',info.data.userPic);
                                // 右侧头像
                                parent.$('.user_center_link>img').attr('src',info.data.userPic);

                            }
                        }
                
                    });
                }
                
            }
        }); 
    });

});