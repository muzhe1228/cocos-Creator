$(document).ready(function(){
	for (var i = 0; i < $('.newPage').find('a').length; i++) {
		var pageA = $('.newPage').find('a')[i]
		if ($(pageA).text() == $('.newPage').attr('data')) {
			$(pageA).addClass('active')
		}
	}
})