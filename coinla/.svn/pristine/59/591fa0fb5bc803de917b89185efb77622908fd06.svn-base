$(document).ready(function () {
    getRise('/rank/findRisePage')
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
})