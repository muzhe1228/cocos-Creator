$(document).ready(function(){
	if(Cookies.get('token')){
        getCoinlaSingle({url:'/currency/'+$("#ccyName").val(),token:Cookies.get('token')},function (res) {
            if(res.data.attention){
            	$('.details_l_top .follow')('<i class="icon-ken_star color-starA"></i>已关注')
            }
        })
    }
    $('.follow').click(function (){
    	debugger
        var _this = $(this)
    	if(Cookies.get('token')){
    		if(_this.text().trim() == '已关注'){
    			getCoinlaSingle({url:'/exchange/cancelAttention', data:{cerId:_this.attr('cerid')}, token:Cookies.get('token')},function (res) {
    				if(res.code == 0){
                    	_this('<i class="icon-ken_star color-star"></i>添加关注')
                    }
                })
    		}else if(_this.text().trim() == '添加关注'){
    			getCoinlaSingle({url:'/exchange/addAttention', data:{cerId:_this.attr('cerid')}, token:Cookies.get('token')},function (res) {
                    if(res.code == 0){
                    	_this('<i class="icon-ken_star color-starA"></i>已关注')
                    }
                })
    		}
    	}else{
    		$('.loginShade').fadeIn()
    	}
    })
})