$(document).ready(function(){
	var cerIds = []
	for(var i = 0;i<$('.index-table').length;i++){
		cerIds.push($($('.index-table')[i]).attr('cerid'))
		var text =$($('.index-table')[i]).find('.pric').text()
		console.log(text.substring(1))
		var reg = /[$|¥|￥]/g //匹配字符串进行修改
		$($('.index-table')[i]).find('.pric').text(text.replace(reg,'¥'))
	}
	console.log(cerIds)
    getCoinlaSingle({url: '/svg/findList', data: {cerIds: cerIds.join(',')}},function(res){
		var svgList = resetSvg(res.data)
		svgList.forEach(function(item){
			$("#svg_"+item.relationId).find('.svgInfo').attr('points',item.list)
		})
	})
	for (var i = 0; i < $('.newPage').find('a').length; i++) {
		var pageA = $('.newPage').find('a')[i]
		if ($(pageA).text() == $('.newPage').attr('data')) {
			$(pageA).addClass('active')
		}
	}
})