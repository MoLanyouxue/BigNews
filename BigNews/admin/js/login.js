$(function(){
    // 1、注册点击submit事件
    // 2、获取表单数据，用表单序列化
    // 3、Ajax获取数据库登录账户密码
    // 4、判断账户密码是否正确，正确跳转到主页面
    var $form = $('.login_form');
    var $btn = $('.input_sub');
    // 阻止submit默认跳转
    $form.on('submit',function(e){
        e.preventDefault();
        console.log('123');
    })
})