$(function () {
    // 默认情况下，mui不响应click单击事件，这是它的默认行为
    // 解决方式就是重新为所有a绑定tap
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });
 //点击返回顶部
 $('.scroTop').on('tap', function () {
     console.log(111);

     $(window).scrollTop(0)
 })
    // 发送ajax请求时进行路径拼接
    const baseURL = 'http://193.112.55.79:9090/api/'
    // 添加zepto拦截器，在每次发送ajax请求前都经过这个函数进行业务处理
    $.ajaxSettings.beforeSend = function (xhr, obj) {
        // console.log(obj)
        obj.url = baseURL + obj.url
        // console.log(obj)

        // 在访问 私有路径 的时候，手动的将token值传递给服务器，不是的话不进入
        // 值如何传递：通过请求头的方式将token值传递给服务器
        // if(obj.url.indexOf('/my/') != -1){
        //     xhr.setRequestHeader('Authorization',sessionStorage.getItem('pyg_token'))
        // }
    }
     // 动态扩展zepto中的成员
     $.extend($, {
         getParameter: function (url) {
             var obj = {}
             // location.search:url中?及?后面的内容
             url = url.substring(1) //cid=5&name=jack
             // 先按&拆分
             var arr = url.split('&') //['cid=5','name=jack']
             // 遍历进行第二次拆分
             for (var i = 0; i < arr.length; i++) {
                 var temp = arr[i].split('=') //['cid',5]
                 obj[temp[0]] = temp[1] // obj['cid'] = 5
             }
             return obj // {cid:5,name:'jack'}
         }
     });
})