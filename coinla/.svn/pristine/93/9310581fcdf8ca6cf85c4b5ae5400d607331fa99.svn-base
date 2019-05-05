$(document).ready(function () {
    getCoinlaSingle({url:'/exchange/findcurrencyCoreData',data:{ccyId: $("#ccyId").val()}},function (res) {
        var coreData = res.data
        vFor(coreData)
        setPieT(coreData)
        setPieB(coreData)
    })
    var nameNum = ['market_qty', 'market_total', 'circulate_ratio', 'turnover_ratio_24h', 'total_value', 'total_value_ratio', 'circulate_total_value_rank'],
        colors = ['#f5a623', '#f8e71c', '#7ed321', '#0cb230', '#02c8c0', '#34a4e2', '#4d66cc', '#8f32dc', '#cf48e3', '#fb6830'];

    function vFor(coreData) {
        for (var i = 0; i < nameNum.length; i++) {
            if (i + 1 == nameNum.length) {
                $('.sizeVar').eq(i).text('NO' + coreData[nameNum[i]])
            }
            if (i == 4) {
                $('.sizeVar').eq(i)('<span style="font-size:12px">¥ </span>'+coreData[nameNum[i]])
            } else {
                $('.sizeVar').eq(i).text(coreData[nameNum[i]])
            }
        }
        Rita()//添加百分符号
    }

    function setPieT(coreData) {
        if (coreData) {
            var market = {
                id: 'market',
                color: ['#53a4d5', '#409bb4', '#51a3d2'],
                lineCap: 'round',
                text: ''
            }
            var circulate = {
                id: 'circulate',
                color: ['#6c2fd7', '#2978d8', '#623ad7'],
                lineCap: 'round',
                text: ''
            }
            var turnover = {
                id: 'turnover',
                color: ['#e04590', '#ce1dbb', '#d9379f'],
                lineCap: 'round',
                text: ''
            }
            var total = {
                id: 'total',
                color: ['#21cde1', '#1d75f9', '#20cae2'],
                lineCap: 'round',
                text: ''
            }
            market.angle = parseFloat(((coreData.market_qty / coreData.market_total)).toFixed(4))
            market.text = coreData.market_qty
            circulate.angle = parseFloat((parseFloat(coreData.circulate_ratio) / 100).toFixed(4))
            turnover.angle = parseFloat((parseFloat(coreData.turnover_ratio_24h) / 100).toFixed(4))
            total.angle = parseFloat((parseFloat(coreData.total_value_ratio) / 100).toFixed(4))
            canvasRounds(market)
            canvasRounds(circulate)
            canvasRounds(turnover)
            canvasRounds(total)
        }

    }

    function setPieB(data) {
        var pieDat = data.pair_ratio
        var PieData = []
        for (var i = 0; i < pieDat.length; i++) {
            $('.info-r').append('<li class="f-l"><p class="fang" style="background-color:"' +
                +colors[i]
                + '"></p> <p class="size">'
                + pieDat[i].base + '<span>' + pieDat[i].ratio
                + '%</span> </p> </li>')
            var arr = []
            arr[0] = pieDat[i].base
            arr[1] = parseFloat(pieDat[i].ratio)
            PieData.push(arr)
        }
        debugger
        Highcharts.chart('container1', {
            colors: colors,
            credits: {
                enabled: false
            },
            chart: {
                margin: [0, 0, 0, 0]
            },
            title: {
                text: ''
            },
            tooltip: {
                headerFormat: '{series.name}<br>',
                pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '交易对占比(24h)',
                borderWidth: 0,
                data: PieData
            }]
        });
    }
})