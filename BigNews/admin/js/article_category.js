$(function () {

    /* 
        1、初始信息展示
        1.1、准备模板数据
        1.2、合并：模板数据与相应数据
        1.3、追加：合并结果追加到tbody页面中
    */
    function rander() {
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
    };
    rander();


    /*  2、添加分类  */
    $('#myModal #sureBtn').on('click', function () {
        var id = $('#myForm input[name=id]').val();
        $.ajax({
            url: id?BigNew.category_edit:BigNew.category_add,
            type: 'post',
            dataType: 'json',
            data: $('#myForm').serialize(),
            success: function (backData) {
                if (backData.code == 201) {
                    alert(backData.msg);
                    window.location.reload();
                } else {
                    alert(backData.msg);
                    window.location.reload();
                };
            }
        });
    });


    /*  3、删除分类  */
    // 通过删除按钮弹出来模态框的时候，要获取当前删除按钮所在的id
    $('#myDelete').on('shown.bs.modal', function (e) {
        window.categoryId = $(e.relatedTarget).data('id') // data()专门用来获取当前标签中的data-属性的值
        // var id = $(e.relatedTarget).attr('data-id')
    })
    $('#myDelete #sureBtn').on('click', function () {
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: window.categoryId
            },
            success: function (backData) {
                if (backData.code === 204) {
                    // 隐藏模态框
                    $('#myDelete').modal('hide')
                    // 刷新局部页面
                    rander();
                }
            }
        })
    });


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
            // console.log(target);

            if (target == $('#xinzengfenlei')[0]) {
                // 设置增加按钮文本
                myModalLabel.text('新增管理分类');
                sureBtn.text('新增');
                // 将表单重置
                $('#myForm')[0].reset();

                // 手动清空id
                $('#myForm input[name=id]').val('')
                console.log(target);

            } else {
                // 设置编辑按钮文本
                myModalLabel.text('编辑管理分类');
                sureBtn.text('编辑');
                // 4.3 数据回显  就是向服务器发送请求
                $.ajax({
                    type: 'get',
                    url: BigNew.category_search,
                    data: {
                        id: $(e.relatedTarget).data('id')
                    },
                    success: function (res) {
                        // console.log(res);
                        // 4.4 将响应回来的数据 渲染到表单上
                        $('#myForm input[name=id]').val(res.data[0].id)
                        $('#myForm input[name=name]').val(res.data[0].name)
                        $('#myForm input[name=slug]').val(res.data[0].slug)
                    }
                })
            }
        })
        // // 模态框确认按钮点击时刷新页面
        // myModalLabel.on('click', function (e, a) {
        //     if ($(this).text() == '新增') {
        //         window.location.reload();
        //     } else {
        //         window.loaction.reload();
        //     }
        // })
    })();

});