$(document).ready(function () {
	//rankCurrency
	if($("#rankCurreny").length){
		getCoinlaSingle({url: '/rank/findCurrencyDealPage', data: {page: 1, pageSize: 10, condition: 0}}, function (res) {
	        var List = res.data.items, rankCcyStr = '<ul class="con-title"><li>排名</li><li>名称</li><li>成交额</li></ul>'
	        List.forEach(function (item, index) {
	            rankCcyStr += '<ul class="con-cont goToUrl"><li class="' + (index <= 2 ? "color-red" : "") + '">' +
	                '<p>' + (index + 1) + '</p></li><li><a class="aClick" title="' + item.currencyShortName + '" href="/coin/'
	                + toLowerCase(item.currencyEnglisgName) + '"><img alt="" src="' + item.pic + '">' + item.currencyName + '</a>' +
	                '</li><li>' + numRest(item.openTurnover) + '</li></ul>'
	        })
	        $("#rankCurreny")(rankCcyStr)
	    })
	}
    
    //newCurrency
    if($("#newCurreny").length){
    	getCoinlaSingle({
            url: '/exchange/findNewCurrencyList',
            data: {},
            token: ''
        }, function (res) {
            var List = res.data.slice(0,10)
            for (var i = 0; i < List.length; i++) {
                $("#newCurreny").append(
                    '<ul class="con-cont goToUrl"><li>'
                    + resetTime(List[i].initiateCreateDate)
                    + '</li><li title="' + List[i].currencyName
                    + '"><a class="aClick" href="/coin/' + toLowerCase(List[i].currencyEnglisgName) + '">'
                    + List[i].currencyShortName
                    + '</a></li><li class="'
                    + IsColor(List[i].openRiseFall) + '">'
                    + numRest(List[i].openRiseFall, '%')
                    + '</li><li>' + numRest(List[i].openPrice)
                    + '</li></ul>')
            }
        })
    }
    if($("#rankFall").length){
    	//rankFall
        getRise('/rank/findRisePage',1)
        $('#rankFallBtn').click(function () {
            getRise('/rank/findFallPage', 1)
            $('#rankRiseBtn').removeClass('active')
            $(this).addClass('active')
            $('.list_btn').attr('isrise', 'fall')
             $('.list_btn p').eq(1).addClass('active').siblings().removeClass('active')
        })
        $('#rankRiseBtn').click(function () {
            getRise('/rank/findRisePage', 1)
            $('#rankFallBtn').removeClass('active')
            $(this).addClass('active')
            $('.list_btn').attr('isrise', 'rise')
            $('.list_btn p').eq(1).addClass('active').siblings().removeClass('active')
        })
        $('.list_btn p').click(function () {
            var types = $(this).parents('.list_btn').attr('isrise')
            console.log(types)
            if (types == 'rise') {
                getRise('/rank/findRisePage', $(this).attr('type'))
            } else if (types == 'fall') {
                getRise('/rank/findFallPage', $(this).attr('type'))
            }
            $(this).addClass('active').siblings().removeClass('active')
        })

        function getRise(url, type) {
            getCoinlaSingle({url: url, data: {page: 1, pageSize: 10, type: type}}, function (res) {
                var List = res.data.items, str = '<ul class="con-title"><li>排名</li><li>名称</li><li>价格</li><li>涨跌幅</li></ul>'
                List.forEach(function (item, index) {
                    str += '<ul class="con-cont goToUrl"><li class="'
                        + (index <= 2 ? 'color-red' : '')
                        + '"><p>'
                        + (index + 1)
                        + '</p></li><li><a class="aClick" title="' + item.currencyEnglisgName + '" href="/coin/' + toLowerCase(item.currencyEnglisgName) + '"><img alt=""src="'
                        + item.pic
                        + '">'
                        + item.currencyShortName
                        + '</a></li><li>'
                        + numRest(item.openPrice, 0, ',')
                        + '</li><li class="' + IsColor(item.openRiseFall) + '">'
                        + numRest(item.openRiseFall, '%') + '</li></ul>'
                })
                $("#rankFall")(str)
            })
        }
    }
    
    //addCurrency
    if($('#bookAddCcyMode').length){
    	var addCcyTimer = null;
        $('.bookAddCcy-info,.bookAddCcy').click(function (event) {
            return false
        })
        $('.bookAddCcy').click(function () {
            $('.addCcy-wrap').find('.addCcyList').slideUp()
        })
        $('#addCcy').on('input propertychange', function () {
            var _this = $(this)
            console.log(_this.val())
            clearTimeout(addCcyTimer)
            addCcyTimer = setTimeout(function () {
                if (_this.val().trim()) {
                    getAddCcy(_this.val())
                    $('.addCcy-wrap').find('.addCcyList').css({
                        borderColor: '#eaeaea'
                    })
                } else {
                    $('.addCcy-wrap').find('.addCcyList').css({
                        borderColor: 'transparent'
                    })
                }
            }, 300)
        }).focus(function () {
            if ($(this).val().trim()) {
                getAddCcy($(this).val())
            } else {
                $('.addCcy-wrap').find('.addCcyList').css({
                    borderColor: 'transparent'
                })
            }
            $('.addCcy-wrap').find('.addCcyList').slideDown()
        })
        $('.addCcyClose').click(function () {
            $('.bookAddCcyMode').fadeOut()
        })
        $(document).click(function () {
            $('.addCcy-wrap').find('.addCcyList').slideUp()
            $('.bookAddCcyMode').fadeOut()
        })

        function getAddCcy(keyWord) {
            getCoinlaSingle({
                url: '/search/currencySearch',
                data: {searchName: keyWord, rows: 50}
            }, function (res) {
                console.log(res)
                if (res.code == 0) {
                    var addCcyStr = ''
                    res.data.list.forEach(function (item) {
                        addCcyStr += '<li class="addCcyListSingle" ccyid="' + item.ccyId + '" ccyname="' + item.currencyShortName + '" ccypic="' + item.pic + '"><img class="f-l" src="' + item.pic + '"><p class="addCcyName f-l">' + item.currencyShortName + '<span>' + item.currencyEnglishName + '</span></p></li>'
                    })
                    $('.addCcyList')(addCcyStr)
                    $('.addCcyListSingle').click(function () {
                        $('#addCcy').val($(this).attr('ccyname'))
                        $('#addCcyImg').attr('src', $(this).attr('ccypic'))
                        $('.addCcy-wrap').find('.addCcyList').slideUp()
                        $('.addCcySubmit').attr('disabled', false)
                        $('.addCcySubmit').attr('ccyid', $(this).attr('ccyid'))
                    })
                } else {
                    $('.addCcyList')('<li class="notSingle">' + res.message + '</li>')
                }

            })
        }
    }
    
})