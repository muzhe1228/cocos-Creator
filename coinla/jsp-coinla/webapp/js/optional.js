$(document).ready(function () {
    var timer = null;
    timer = setTimeout(function () {
        setOption(1)
    }, 30)
    setSelect('.selectWrap1', function (attr, val) {
        console.log(1)
        console.log($('.delete'))
        setOption(attr)
    })
    setSelect('.selectWrap2', function (attr, val) {
        if (val == 'CNY') {
            setOption()
        } else {
            setOption(0, attr)
        }
    })

    function setOption(page,value1, value2) {
        if (Cookies.get('token')) {
            $('.yes-login').fadeIn()
            getCoinlaSingle({
                url: '/exchange/userPcOptionalList',
                data: {pageSize: 40,page:page, conditionOne: value1 || 0, conditionTwo: value2 || 0},
                token: Cookies.get('token')
            }, function (res) {
                if (res.code == 0) {
                    if (res.data.totalPage) {
                    	setPageDom(res.data.totalPage, res.data.currentPage, function (page) {
                    		setOption(page)
                        })
                    }
                    var str = ''
                    res.data.items.forEach(function (item, index) {
                        str += '<ul class="table_cont"><li><a href="/coin/'
                            + toLowerCase(item.currencyEnglisgName) + '" class="aClick"><img src="'
                            + item.pic + '" alt="' + item.currencyName + '-' + item.currencyShortName + '">' + item.currencyName + '</a></li>' +
                            '<li><a href="/coin/' + toLowerCase(item.currencyEnglisgName) + '" ' +
                            'class="aClick"> ' + item.currencyShortName + '/' + item.currencyRightShortName + '</a></li>' +
                            '<li>' + item.exchangeName + '</li><li>' + numRest(item.openPrice, value2) +
                            '</li><li>' + numRest(item.openTurnover, value2) + '</li><li class="' + IsColor(item.openRiseFall) + '">' + numRest(item.openRiseFall, "%") + '</li>' +
                            '<li>' + numRest(item.openCirculateTotalValue, value2) + '</li> <li><p class="delete" cerId="' + item.cerId + '">删除</p></li> </ul>'
                    })
                    $('#optionalList')(str)
                    $('.delete').click(function () {
                        var CerId = $(this).attr('cerId'), _this = this
                        coinlaMode('确定要删除该币种吗')
                        $('#config-yes').click(function () {
                            getCoinlaSingle({
                                url: '/exchange/cancelAttention',
                                data: {cerId: CerId},
                                token: Cookies.get('token')
                            }, function (res) {
                                if (res.code == 0) {
                                    $('.modeWrap').fadeOut(function () {
                                        $(this).remove()
                                    })
                                    $(_this).parents('.table_cont').fadeOut(function () {
                                        $(this).remove()
                                    })
                                }
                            })

                        })
                        return false
                    })
                }
            })
        } else {
            $('.not-login').fadeIn()
        }
    }
})