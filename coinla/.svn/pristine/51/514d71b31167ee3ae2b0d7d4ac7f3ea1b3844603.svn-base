$(document).ready(function () {
    getCoinlaSingle({url: '/rank/findCurrencyDealPage', data: {page: 1, pageSize: 10, condition: 0}}, function (res) {
        var List = res.data.items, rankCcyStr = ''
        List.forEach(function (item, index) {
            rankCcyStr += '<ul class="con-cont goToUrl"><li class="' + (index <= 2 ? "color-red" : "") + '">' +
                '<p>' + (index + 1) + '</p></li><li><a class="aClick" title="' + item.currencyShortName + '" href="/coin/'
                + toLowerCase(item.currencyEnglisgName) + '"><img alt="" src="' + item.pic + '">' + item.currencyName + '</a>' +
                '</li><li>' + numRest(item.openTurnover) + '</li></ul>'
        })
        $("#rankCurreny").html(rankCcyStr)
    })
})