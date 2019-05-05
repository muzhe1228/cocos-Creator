$(document).ready(function () {
    $('#searchWorld').val(getUrlKey('keyword'))
    $('#toCurrency').attr("href", '/search?keyword=' + getUrlKey('keyword'))
    getSearchExchangeLis(1)

    $('#searchWorld').keypress(function (e) {
        if (e.which == 13) {
            if ($(this).val().trim()) {
                location.href = '/search/exchange?keyword=' + $(this).val()
            } else {
                alert('关键词不能为空!!!')
            }
        }
    });
    $('#searchWorldBtn').click(function () {
        if ($('#searchWorld').val().trim()) {
            location.href = '/search/exchange?keyword=' + $('#searchWorld').val()
        } else {
            alert('关键词不能为空!!!')
        }
    })

    function getSearchExchangeLis(page) {
        getCoinlaSingle({
            url: '/search/pcButtonExchangeSearch',
            data: {searchName: getUrlKey('keyword'), page: page, rows: 30}
        }, function (res) {
            console.log(res.data)
            if (res.code == 0) {
                setSearchExchangeList(res.data.items, res.data.currentPage, res.data.pageSize)
                setPageDom(res.data.totalPage, res.data.currentPage, function (page) {
                    getSearchExchangeLis(page)
                    ScrollTop()
                })
            }
        })
    }

    function setSearchExchangeList(List, page, pageSize) {
        var searchExchangeStr = ''
        List.forEach(function (item, index) {
            searchExchangeStr += '<ul class="table_cont"><li>'
                + (((page - 1) * pageSize) + index + 1) + '</li> <li><a href="/exchange/details/' + toLowerCase(item.exchangeNameEn) + '" class="aClick"><img alt="' + item.exchangeName + '-'
                + item.exchangeNameEn + '"src="' + item.pic + '" >' + item.exchangeName + '</a></li><li>' + numRest(item.turnover) + '</li><li>' + item.transactionPair + '</li><li>'
                + item.country + '</li> <li> <div class="adver">' +
                '<p><img src="../static/images/newIndex/qihuo.png"alt=""><span>期货</span></p> ' +
                '<p><img src="../static/images/newIndex/xianhuo.png"><span>现货</span></p> ' +
                '<p><img src="../static/images/newIndex/fabi.png" alt=""><span>法币</span></p>' +
                '</div></li><li><p class="rateWrap clear-f" level="' + item.level + '">' +
                '<i class="icon-ken_star' + (item.level >= 1 ? ' active' : '') + '"></i>' +
                '<i class="icon-ken_star' + (item.level >= 2 ? ' active' : '') + '"></i>' +
                '<i class="icon-ken_star' + (item.level >= 3 ? ' active' : '') + '"></i>' +
                '<i class="icon-ken_star' + (item.level >= 4 ? ' active' : '') + '"></i>' +
                '<i class="icon-ken_star' + (item.level >= 5 ? ' active' : '') + '"></i></p></li></ul>'
        })
        $('#searchExchange').html(searchExchangeStr)
    }
})