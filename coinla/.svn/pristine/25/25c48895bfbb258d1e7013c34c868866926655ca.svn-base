$(document).ready(function () {
    if (window.location.hash == '#usd') {
        $('.ccy').text('$')
    } else {
        $('.ccy').text('¥')
    }
    SvgIndex()

    function SvgIndex() {
        var cerIds = []
        for (var i = 0; i < $('.index-table').length; i++) {
            cerIds.push($($('.index-table')[i]).attr('cerid'))
        }
        getCoinlaSingle({url: '/svg/findList', data: {cerIds: cerIds.join(',')}}, function (res) {
            var svgList = resetSvg(res.data)
            svgList.forEach(function (item) {
                $("#svg_" + item.relationId).find('.svgInfo').attr('points', item.list)
            })
        })
    }

    setSelect('.selectWrap1', function (attr, val) {
        console.log(attr)
        if (val == 'CNY') {
            setIndexList()
        } else {
            setIndexList(attr)
        }
    })

    function setIndexList(type) {
        getCoinlaSingle({
            url: '/index/findList',
            data: {pageSize: $('#pageSize').val(), page: $('#currentPage').val(), conditionOne: 3, conditionTwo: type}
        }, function (res) {
            var indexList = res.data.items, str = ''
            indexList.forEach(function (entity, index) {
                str += '<ul class="table_cont index-table" cerid="' + entity.cerId + '"><li>' + (((res.data.currentPage - 1) * res.data.pageSize) + index+1) + '</li><li>' +
                    '<a href="/coin/' + toLowerCase(entity.currencyEnglisgName) + '" ' +
                    'title="' + entity.currencyName + '-' + entity.currencyShortName + '" class="aClick">' +
                    '<img alt="' + entity.currencyName + '-' + entity.currencyShortName + '" class="Img" src="' + entity.pic + '">' + entity.currencyName + '</a></li>' +
                    '<li class="price" sort="' + entity.openPrice + '">' + numRest(entity.openPrice, type) + '</li><li class="turnover" sort="' + entity.openTurnoverSort + '">'
                    + numRest(entity.openTurnover, type) + '</li><li class="riseFall ' + IsColor(entity.openRiseFall) + '" sort="' + entity.openRiseFall + '">'
                    + numRest(entity.openRiseFall, "%") + '</li><li class="totalValue" sort="' + entity.openCirculateTotalValueSort + '">'
                    + numRest(entity.openCirculateTotalValue, type) + '</li><li class="total" sort="' + entity.openCirculateTotalSort + '">' + entity.openCirculateTotal + '</li>' +
                    '<li id="svg_' + entity.cerId + '"><svg width="80" height="21" class="peity"> <polyline fill="none" points="" ' +
                    'stroke="' + (entity.openRiseFall > 0 ? "#26b47a" : (entity.openRiseFall == 0 ? "#454545" : "#ff0000"))
                    + '"stroke-width="1" stroke-linecap="square" class="g-rect-fill svgInfo"></polyline></svg></li></ul>'
            })
            $('.sortDom').html(str)
            SvgIndex()
        })
    }


    setSelect('.selectWrap2', function (attr, val) {
        console.log(attr)
        var domlist = $('.sortDom');
        var result = sortDom(domlist, attr, false);
        $('.sortDom').html(result);
        // window.location.href =
        // '/list_2#usd'
        // console.log(attr, val)
        // var url = window.location.href.split('_')
        // console.log(url)
        // console.log(window.location.hash)
        // $('.ccy').text('$')
    })
})