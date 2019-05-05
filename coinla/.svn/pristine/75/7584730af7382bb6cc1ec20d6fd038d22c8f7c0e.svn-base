$(document).ready(function () {
    var timer = null;
    $('.searchInp').click(function (event) {
        event.stopPropagation();
    })
    $('.searchThis').on('input propertychange', function () {
        var _this = $(this)
        clearTimeout(timer)
        timer = setTimeout(function () {
            if (_this.val().trim()) {
                getSearch(_this.val())
            } else {
                $('.currencyList')('<li class="title">币种</li><li class="notData">暂无数据</li>')
                $('.exchangeList')('<li class="title">交易所</li><li class="notData">暂无数据</li>')
            }
        }, 300)
    }).focus(function () {
        if ($(this).val().trim()) {
            getSearch($(this).val().trim())
        } else {
            $('.currencyList')('<li class="title">币种</li><li class="notData">暂无数据</li>')
            $('.exchangeList')('<li class="title">交易所</li><li class="notData">暂无数据</li>')
        }
        $(this).parents('.searchInp').find('.searchList').slideDown()
    }).keypress(function (e) {
        if (e.which == 13) {
        	if($(this).val().trim()){
        		location.href = '/search?keyword='+$(this).val()
        	}else{
        		alert('关键词不能为空!!!')
        	}
        }
    });
    $('.searchIcon').click(function(){
    	if($('.searchThis').val().trim()){
        		location.href = '/search?keyword='+$('.searchThis').val()
        	}else{
        		alert('关键词不能为空!!!')
        	}
    })
    $(document).click(function () {
        $('.searchThis').blur()
        $('.searchList').slideUp()
    })

    function getSearch(keyWord) {
        getCoinlaSingle({
            url: '/search/pcExchangeOrCurrencySearch',
            data: {searchName: keyWord}
        }, function (res) {
            console.log(res)
            if (res.code == 0) {
                if (JSON.stringify(res.data) == '{}') {
                    console.log('空对象')
                    $('.currencyList')('<li class="title">币种</li><li class="notData">暂无数据</li>')
                    $('.exchangeList')('<li class="title">交易所</li><li class="notData">暂无数据</li>')
                } else {
                    if (!res.data.currencyList) {
                        $('.currencyList')('<li class="title">币种</li><li class="notData">暂无数据</li>')
                    } else {
                        var str = '<li class="title">币种</li>'
                        res.data.currencyList.forEach(function (item) {
                            str += '<li class=""><a href="/coin/' + toLowerCase(item.english) + '"><img src="' + item.pic + '"><p>' + item.currencyName + '(' + item.shortName + ')</p></a></li>'
                        })
                        $('.currencyList').html(str)
                    }
                    if (!res.data.exchangeList) {
                        $('.exchangeList')('<li class="title">交易所</li><li class="notData">暂无数据</li>')
                    } else {
                        var str = '<li class="title">交易所</li>'
                        res.data.exchangeList.forEach(function (item) {
                            str += '<li class=""><a href="/exchange/details/' + toLowerCase(item.exchangeNameEn) + '"><img src="' + item.pic + '"><p>' + item.exchangeName + '</p></a></li>'
                        })
                        $('.exchangeList').html(str)
                    }
                }

            }
        })
    }
})
