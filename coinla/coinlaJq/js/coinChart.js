$(document).ready(function () {
    var Dat = {
        lastPriceUsd: [],
        TotalValueUsd: [],
        turnoverUsd: []
    };
    // $.getJSON('https://data.jianshukeji.com/stock/history/000001', function (data) {
    //     if (data.code !== 1) {
    //         alert('读取股票数据失败！');
    //         return false;
    //     }
    //     data = data.data;
    //     // 去掉多余的数据
    //     Highcharts.each(data, function (d) {
    //         d.length = 2;
    //     });
    //     Highcharts.stockChart('coinChart', {
    //         rangeSelector: {
    //             selected: 2
    //         },
    //         title: {
    //             text: '平安银行历史股价'
    //         },
    //         plotOptions: {
    //             series: {
    //                 showInLegend: true
    //             }
    //         },
    //         tooltip: {
    //             split: false,
    //             shared: true
    //         },
    //         series: [{
    //             // type: 'line',
    //             id: '000001',
    //             name: '平安银行',
    //             data: data
    //         }]
    //     });
    // });
    $.post('http://pcapi.coinla.com/marketValueTendency/findList', {
        timeGenre: 3,
        startTime: '2010-05-30 08:00:00',
        endTime: resetTime(new Date(), 1),
        ccyId: 1
    }, function (res) {
        Dat.lastPriceUsd = allChartDataV(res.data, 'lastPriceUsd')
        Dat.TotalValueUsd = allChartDataV(res.data, 'circulateTotalValueUsd')
        Dat.turnoverUsd = allChartDataV(res.data, 'turnoverUsd')
        console.log(Dat)
        createChart('coinChart', Dat)
    });

    function createChart(id, data) {
        Highcharts.stockChart(id, {
            chart: {zoomType: 'x', type: 'line', ignoreHiddenSeries: true},
            legend: {
                enabled: true,
                align: 'center',
                backgroundColor: '#FFFFFF',
                borderColor: 'black',
                borderWidth: 0,
                layout: 'horizontal',
                verticalAlign: 'bottom',
                y: 0,
                shadow: false,
                floating: false
            },
            navigator: {
                adaptToUpdatedData: false,
                series: {
                    data: data.lastPriceUsd
                }
            },
            // scrollbar: {liveRedraw: false},
            credits: {enabled: false},
            rangeSelector: {
                allButtonsEnabled: true,
                inputEnabled: true, // it supports only days
                enabled: true,
                selected: 6
            },
            xAxis: [{
                // events: {
                //     afterSetExtremes: _this.afterSetExtremes
                // },
                minRange: 24 * 3600 * 1000,
            }],
            yAxis: [
                {// 第一条Y轴
                    format: '{value}$',
                    title: {
                        text: '当前价 ($)',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        formatter: function () {
                            return `${priceRest(this.value)} $`
                        },
                        x: 5,
                        align: 'left',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    showEmpty: false,
                    height: '80%',
                    offset: 8,
                    opposite: false,
                    lineWidth: 0,
                },
                {// 第二条Y轴
                    title: {
                        text: '流通市值 ($)',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    labels: {
                        formatter: function () {
                            return `${priceRest(this.value)} $`
                        },
                        align: 'right',
                        x: -5,
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    showEmpty: false,
                    height: '80%',
                    offset: 8,
                    lineWidth: 0,
                    opposite: true
                },
                { // 第三条Y轴
                    title: {
                        text: '24h成交额 ($)',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    labels: {
                        formatter: function () {
                            return `${priceRest(this.value)}`
                        },
                        align: 'left',
                        x: 5,
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    showEmpty: false,
                    top: '80%',
                    height: '20%',
                    offset: 8,
                    lineWidth: 0,
                    opposite: false
                }
            ],
            title: {
                text: '',
                style: {
                    color: '#454545',
                    fontWeight: 'bold',
                    fontSize: '18px'
                }
            },
            tooltip: {
                formatter: function () {
                    let X = resetTime(this.x, 1)
                    let s = `<span style="color:#777777;font-size: 12px">\u25CF </span> <span style="font-size: 12px"> 时间 : <span style="font-size: 12px">${X}</span>`
                    this.points.forEach(function (item) {
                        let val = priceRest(item.y)
                        s += `<br/><span style="color:${item.color};font-size: 12px">\u25CF </span> <span style="font-size: 12px">${item.series.name} : </span><b style="font-size: 12px">${val}</b>`;
                    });
                    return s;
                },
                shared: true
            },
            series: [
                {
                    name: '当前价 ($)',
                    data: data.lastPriceUsd,
                    dataGrouping: {
                        enabled: false
                    },
                },
                {
                    name: '流通市值 ($)',
                    data: data.TotalValueUsd,
                    yAxis: 1,
                    dataGrouping: {
                        enabled: false
                    },
                    // visible: false
                },
                {
                    name: '24h成交额 ($)',
                    data: data.turnoverUsd,
                    yAxis: 2,
                    type: 'column',
                    dataGrouping: {
                        approximation: "average",
                        enabled: false
                    }
                }
            ],
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function (e) {
                            console.log(e.target.name)
                            // if(e.target.name === '当前价 ($)'){
                            //     return false
                            // }
                            // return false 即可禁止图例点击响应
                            // return false;
                        }
                    }
                }
            },
        });
        // });
    }
})