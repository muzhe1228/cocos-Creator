$(document).ready(function () {
    setLeft().then(function (res) {
        var userMsg = res.data
        console.log(userMsg)
    })
    getMsg()

    function getMsg() {
        getCoinlaSingle({url: '/message/findList', data: {pageSize: 10}, token: Cookies.get('token')}, function (res) {
            console.log(res.data.list)
            var msgList = res.data.list, str = ''
            msgList.forEach(function (item, index) {
                str += '<ul class="' + (item.isRead ? '' : 'active') + '"><li class="msg-cont_l"><p>' + item.title + '</p><p>' + item.content + '</p>' +
                    '</li><li class="msg-cont_r"><p>' + resetTime(item.createDate, 1) + '</p><p mcrId="' + item.mcrId + '">删除</p><p class="more">消息详情</p></li></ul>'
            })
            $('#msg-list').html(str)
            $('#allRead').click(function () {
                updateMsg(0)
            })
            $('#emptyMsg').click(function () {
            	emptyMsg()
            })
        })
    }

    //更改消息状态
    function updateMsg(mcrId) {
        getCoinlaSingle({
            url: '/message/updateUserMessage',
            data: {mcrIds: mcrId},
            token: Cookies.get('token')
        }, function (res) {
            if (res.code === 0) {
                getMsg()
            }
        })
    }

    //清空消息
    function emptyMsg() {
        getCoinlaSingle({
            url: '/message/deleteUserMessage',
            data: {},
            token: Cookies.get('token')
        }, function (res) {
            if (res.code === 0) {
                getMsg()
            }
        })
    }
})