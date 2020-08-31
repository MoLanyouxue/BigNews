$(function () {
    /*  1、查询个人信息  1.1页面一加载就发送Ajax请求  1.2响应数据之后渲染到页面  */
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        success: function (info) {
            // console.log(info.data);
            if(info.code === 200){
                // 左侧昵称
                $('.user_info>span').text('欢迎 '+info.data.nickname);
                // 左侧头像
                $('.user_info>img').attr('src',info.data.userPic);
                // 右侧头像
                $('.user_center_link>img').attr('src',info.data.userPic);
            }
        }

    });


    /*  2、退出登录   2.1删除token  2.2跳转到登录页  */
    $('.logout').on('click',function(){
        localStorage.removeItem('token');
        window.location = './login.html';
    });


    /*  3、实现左侧导航栏高亮效果与文字管理下拉效果  */
    $('.level01').click(function(){
            // 3.1 排他思想
            $(this).addClass('active').siblings().removeClass('active');
            // 3.2 如果点击的是文章管理：则应该显示二级列表ul    
            if($(this).next().hasClass('level02')){
                // 3.3 滑入滑出切换显示
                $(this).next().stop().slideToggle();
                // 3.4 旋转90度< 
                $(this).find('b').toggleClass('rotate0');
            }else{
                // 如果点击的不是文章管理一级菜单列表，则移除二级列表的选中样式
                $('level02>li').removeClass('active');
            }
    });

    
    /*   4、给li标签注册时间进行高亮的显示   */
    $('.level02>li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 5、模态框
    function modal(text){
        $('.modal-body>p').text(text);
        $('.modal').show();
    }
});
