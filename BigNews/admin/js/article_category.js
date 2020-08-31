$(function () {

    /* 
        1、初始信息展示
        1.1、准备模板数据
        1.2、合并：模板数据与相应数据
        1.3、追加：合并结果追加到tbody页面中
    */
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (category) {
            console.log(category);

            if (category.code === 200) {
                console.log('11');
                // 这个方法有两个参数 第1个参数是模板的id  第二个参数必须是对象
                var htmlStr = template('template', category);
                $('#tbody').html(htmlStr);
            }
        }
    });





    /* 
        2、添加分类
        2.1、
    */



    /* 
        3、删除分类
        3.1、
    */
    $('#tbody').on('click','.delete',function(){
        $.ajax({
            type:'post',
            url:BigNew.cstegort_delete,
            data:{ 
                id:$(this).attr('data-id')
            },
            success:function(backData){

            }
        })
    });


    /*
        4、修改分类 
        4.1、
     */




    /**
     * @method model
     * @param 
     * @return  模态框标题，确认按钮，刷新
     */

    (function model() {
        // 模态框出现之前做判断：是新增还是修改
        var mymodal = $('#myModal');//==>模态框
        var myModalLabel = $('#myModalLabel');//==>模态框标题
        var sureBtn = $('#sureBtn');//==>确认按钮
        mymodal.on('shown.bs.modal', function (e) {
            // 获取模态框事件触发源
            var target = e.relatedTarget;
            if (target == $('#xinzengfenlei')[0]) {
                // 设置增加按钮文本
                myModalLabel.text('新增管理分类');
                sureBtn.text('确认添加');
            } else {
                // 设置编辑按钮文本
                myModalLabel.text('编辑管理分类');
                sureBtn.text('确认编辑');
            }
        })
        // 模态框确认按钮点击时刷新页面
        myModalLabel.on('click', function (e, a) {
            if ($(this).text() == '确认添加') {
                window.location.reload();
            } else {
                window.loaction.reload();
            }
        })
    })();







});