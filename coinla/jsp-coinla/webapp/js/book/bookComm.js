function bookIsLogin() {
    if (Cookies.get('token')) {
        $('.bookIndex_cont').fadeIn()
    } else {
        $('.not-login').show()
    }
}

//获得账本数据
function getBook(callback) {
    getCoinlaSingle({
        url: '/book/queryFindUserBook',
        data: {},
        token: Cookies.get('token')
    }, function (res) {
        console.log(res.data)
        var bookIndex = res.data.bookList[0]
        $('.bookL0').append(
            '<span>≈￥</span>' + bookIndex.presentTotalProperty)
        $('.bookL1').append(
            "<span>￥</span>&nbsp;" + bookIndex.presentProfit)
            .addClass(IsColor(bookIndex.presentProfit))
        $('.bookL2').append(
            "<span>￥</span>&nbsp;" + bookIndex.historyRate)
            .addClass(IsColor(bookIndex.historyRate))
        $('.bookL3').text(numRest(bookIndex.presentProfitRate, '%'))
            .addClass(IsColor(bookIndex.presentProfitRate))
        $('.bookL4').text(numRest(bookIndex.todayProfitRate, '%'))
            .addClass(IsColor(bookIndex.todayProfitRate))
        if (callback) {
            callback(res)
        }
    })
}

//左侧的账本和用户
function setBookL(userMsg) {
    $('.bookInfo-top')('<li class="avatar"><img alt="" src="' + userMsg.headImg + '"></li>' +
        '<li class="user-name">' + userMsg.nickName + '</li><li class="user-intro">' + userMsg.intra + '</li>' +
        '<li class="filterImg" style="background-image: url(' + userMsg.headImg + ');"></li>')
}

//首页的列表内容
function setBookIndex(List) {
    var indexStr = ''
    if (List) {
        List.forEach(function (item, index) {
            indexStr += '<ul class="table_cont"><li><img '
                + 'src="'
                + item.pic
                + '"><a href="/book/invest?bookCurrencyId=' + item.bookCurrencyId + '&ccyName=' + item.currencyShortName + '">'
                + item.currencyShortName
                + '</a></li>'
                + '<li><a href="/book/invest?bookCurrencyId=' + item.bookCurrencyId + '&ccyName=' + item.currencyShortName + '">'
                + item.currencyShortName
                + '</a></li><li class="">'
                + item.currencyNumber
                + '<span>个</span></li><li>'
                + numRest(item.currencyProperty)
                + '</li><li class="'
                + IsColor(item.currencyPresentProfitRate)
                + '">'
                + numRest(item.currencyPresentProfitRate,
                    "%") + '</li>'
                + '<li><p class="delete" bookcurrencyid="' + item.bookCurrencyId + '">删除</p></li></ul>'
        })
        $("#bookIndex")(indexStr)
        $('.delete').click(function () {
            deleteIndex($(this))
            return false
        })
    } else {
        getCoinlaSingle({
            url: '/book/queryFindUserBook',
            data: {},
            token: Cookies.get('token')
        }, function (res) {
            res.data.bookList[0].bookCurrencylist.forEach(function (item, index) {
                indexStr += '<ul class="table_cont"><li><img '
                    + 'src="'
                    + item.pic
                    + '"><a href="/book/invest?bookCurrencyId=' + item.bookCurrencyId + '&ccyName=' + item.currencyShortName + '">'
                    + item.currencyShortName
                    + '</a></li>'
                    + '<li><a href="/book/invest?bookCurrencyId=' + item.bookCurrencyId + '&ccyName=' + item.currencyShortName + '">'
                    + item.currencyShortName
                    + '</a></li><li class="">'
                    + item.currencyNumber
                    + '<span>个</span></li><li>'
                    + numRest(item.currencyProperty)
                    + '</li><li class="'
                    + IsColor(item.currencyPresentProfitRate)
                    + '">'
                    + numRest(item.currencyPresentProfitRate,
                        "%") + '</li>'
                    + '<li><p class="delete" bookcurrencyid="' + item.bookCurrencyId + '">删除</p></li></ul>'
            })
            $("#bookIndex")(indexStr)
            $('.delete').click(function () {
                deleteIndex($(this))
                return false
            })
        })
    }

}

//账本单个币的详情

function setBookccyDetails(List) {
    $('.bookInvest0')('<span>≈￥</span>' + List.presentTotalProperty + '<span class="ccyNum">币数量&nbsp;：&nbsp;' + List.currencyTotalNumber + '</span>')
    $('.bookInvest1')('<span>￥</span>&nbsp;' + List.currencyAvgPrice)
    $('.bookInvest2')('<span>￥</span>&nbsp;' + List.presentProfit).addClass(IsColor(List.presentProfit))
    $('.bookInvest3')('<span>￥</span>&nbsp;' + List.historyRate)
    $('.bookInvest4').text(numRest(List.presentProfitRate, '%')).addClass(IsColor(List.presentProfitRate))
    $('.bookInvest5').text(numRest(List.todayProfitRate, '%')).addClass(IsColor(List.todayProfitRate))
    var subList = List.list[0].list
    console.log(subList)
    subList.forEach(function (item, index) {
        $('#investList').append('<ul class="table_cont"><li data="[object Object]">' + item.storageTime + '</li>' +
            '<li class="color-green">' + item.storageNumber + '个</li><li>' + numRest(item.onePrice) + '</li>' +
            '<li>' + (item.storagePlacesType ? '钱包' : '交易所') + '</li><li>' + item.storagePlaces + '</li><li><p class="delete">删除</p></li> </ul>')
    })
}

//饼状图高低

function thisPie(pieData, type) {
    Highcharts.chart('statPie', {
        credits: {
            enabled: false
        },
        colors: type ? ["#8378ea", "#e7bcf3", "#e062ae", "#fb7293", "#ff9f7f", "#96bfff", "#ffda5c", "#9fe6b8", "#32c5e9", "#37a2da"] : ["#d3758f", "#f3d999", "#a5d8c3", "#564e50", "#c6b38f", "#001751", "#f4e8c8", "#305791", "#8fb2a2", "#e02053"],
        chart: {
            type: 'variablepie',
            margin: [0, 0, 0, 0],
            width: 206,
            height: 206
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            variablepie: {
                allowPointSelect: false,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                states: {
                    hover: {
                        halo: {
                            size: 0
                        }
                    }
                }
            }
        },
        tooltip: {
            headerFormat: '',
            pointFormat: type ? '<span style="color:#00b785">\u25CF</span>场所: <b> {point.name}</b><br/>' +
                '<span style="color:{point.color}">\u25CF</span>占比: <b>{point.ratio}%</b><br/>' : '<span style="color:#00b785">\u25CF</span>币种: <b> {point.name}</b><br/><span style="color:{point.color}">\u25CF</span>占比: <b>{point.ratio}%</b><br/>'
        },
        series: [{
            minPointSize: '1%',
            innerSize: '20%',
            zMin: 0,
            data: pieData,
            borderWidth: 1,
            borderColor: null,
            dataLabels: {
                enabled: false
            }
        }]
    });
}

//资产分布
function restPie(ccyData, callback, type) {
    var pie = ccyData.currencyCountList.slice(0, 10).concat(),
        pieLength = ccyData.currencyCountList.length,
        PieData = [], elesRatio = 0, num = pie[0].list.length,
        H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px'
    $('.info-single').eq(0).css({//设置第一个下拉的高度展开
        height: H
    })
    if (pieLength > 10) {
        for (var i = 0; i < 9; i++) {
            elesRatio += parseFloat(pie[i].storageProportion)
        }
        pie[9].name = '其他'
        pie[9].storageProportion = parseFloat((100 - elesRatio).toFixed(2))
        PieData = pieRestData(pie)
        thisPie(PieData, type)
    } else {
        PieData = pieRestData(pie)
        console.log(PieData)
        thisPie(PieData, type)
    }
    callback(PieData)
}

function deleteIndex(dom) {
    coinlaMode('确定要删除该币种吗')
    $('#config-yes').click(function () {
        getCoinlaSingle({
            url: '/book/deleteCurrencyToBook', data: {
                bookId: $('#bookId').val(),
                ccyId: dom.attr('bookcurrencyid')
            }, token: Cookies.get('token')
        }, function (res) {
            console.log(res)
            if (res.code == 0) {
                $('.modeWrap').fadeOut(function () {
                    $(this).remove()
                })
                dom.parents('.table_cont').fadeOut(function () {
                    $(this).remove()
                })
            }
        })

    })
    return false
}

