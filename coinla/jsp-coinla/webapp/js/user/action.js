$(document).ready(function () {
    setLeft().then(function (res) {
		$('#actionPhone').text(res.data.mobile)       
    })
})