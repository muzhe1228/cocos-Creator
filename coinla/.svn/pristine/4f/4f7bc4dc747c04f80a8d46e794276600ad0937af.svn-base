$(document).ready(function(){
	if(Cookies.get('token')){
        getCoinlaSingle({url:'/currency/findCurrencyInfoExchangeList',data:{ccyId: $('#ccyId').val(),pageSize: 10,page: $('#currentPage').val()},token:Cookies.get('token')},function (res) {
        	console.log(res.data.items)
            res.data.items.forEach(function(item){
            	if(item.attention){
            		$("#market_"+item.cerId)('<i class="icon-ken_star color-star"></i>添加关注')
            	}
            })
        })
    }
})