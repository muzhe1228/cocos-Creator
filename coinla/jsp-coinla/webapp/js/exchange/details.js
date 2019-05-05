$(document).ready(function(){
//	$('.exchangeImg').error(function(){
//		console.log(111111)
//	    $(this).attr('src', '/static/images/errorBourse.png');
//	});
	for (var i = 0; i < $('.newPage').find('a').length; i++) {
		var pageA = $('.newPage').find('a')[i]
		if ($(pageA).text() == $('.newPage').attr('data')) {
			$(pageA).addClass('active')
		}
	}
})