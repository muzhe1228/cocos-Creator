$(document).ready(function () {
    $('#searchWorld').val(getUrlKey('keyword'))
    $('#toExchange').attr("href", '/search/exchange?keyword=' + getUrlKey('keyword'))

    getSearchLis(1)
    $('#searchWorld').keypress(function (e) {
        if (e.which == 13) {
            if ($(this).val().trim()) {
                location.href = '/search?keyword=' + $(this).val()
            } else {
                alert('关键词不能为空!!!')
            }
        }
    });
    ('#searchWorldBtn').click(function () {
        if ($('#searchWorld').val().trim()) {
            location.href = '/search?keyword=' + $('#searchWorld').val()
        } else {
            alert('关键词不能为空!!!')
        }
    })

    function getSearchLis(page) {
        getCoinlaSingle({
            url: '/search/pcButtonCurrencySearch',
            data: {searchName: getUrlKey('keyword'), page: page, rows: 30}
        }, function (res) {
            console.log(res.data)
            if (res.code == 0) {
                setSearchList(res.data.items, res.data.currentPage, res.data.pageSize)
                setPageDom(res.data.totalPage, res.data.currentPage, function (page) {
                    getSearchLis(page)
                    ScrollTop()
                })
            }
        })
    }

    function setSearchList(List, page, pageSize) {
        var searchStr = ''
        List.forEach(function (item, index) {
            searchStr += '<ul class="table_cont"><li>'
                + (((page - 1) * pageSize) + index + 1) + '</li><li class="goToUrl"><a href="/coin/' + toLowerCase(item.currencyEnglisgName) + '" class="aClick" title="'
                + item.currencyName + '"><img src="' + item.pic + '" alt="' + item.currencyName + '-' + item.currencyShortName + '">'
                + item.currencyName + '</a></li><li>' + numRest(item.openPrice) + '</li> <li>' + numRest(item.openTurnover) + '</li> <li class="'
                + IsColor(item.openRiseFall) + '">' + numRest(item.openRiseFall, "%") + '</li> <li>' + numRest(item.openCirculateTotalValue) +
                '</li> <li>' + numRest(item.openCirculateTotal) + '</li> <li><p class="follow"><i class="icon-ken_star'
                + (item.attention ? " color-starA" : " color-star") + '"></i>' + (item.attention ? "取消自选" : "添加自选") + '</p></li></ul>'
        })
        $('#searchIndex').html(searchStr)
    }
})