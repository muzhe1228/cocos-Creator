$(document).ready(function(){
	setLeft().then(function(res){
		var userMsg = res.data
		$('.user-right').html('<div class="user-index"><div class="bg-avatar"><div class="left">' +
			'<img class="avatar"src="'+userMsg.headImg+'"></div><ul class="right"><li class="name">'+userMsg.nickName+'</li>' +
			'<li class="List"><p class="sex '+(userMsg.sex>0?(userMsg.sex===1?'color-red':'color-gray'):'color-green')+'">'+(userMsg.sex>0?(userMsg.sex===1?'女':'未知'):'男')+'</p><p>'+userMsg.country+'</p></li><li>'+userMsg.intra+'</li></ul></div></div>')
	})
})