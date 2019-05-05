function setLeft() {
    return getCoinlaSingle({url: '/user/mine/my', data: {}, token: Cookies.get('token')}, function (res) {
    	var userMsg = res.data
        $('#avatar').attr('src', userMsg.headImg)
        $('#userName').text(userMsg.nickName)
        $('#userIntra').text(userMsg.intra)
    })
}