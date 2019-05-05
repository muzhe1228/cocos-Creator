//保存是否隐藏曲线
function save_preferences(chartName, index, chart) {
    var seriesVisible = [];
    for (i = 0; i < chart.series.length; i++) {
        if (i == index) {
            seriesVisible[i] = !chart.series[i].visible
        } else {
            seriesVisible[i] = chart.series[i].visible
        }
    }
    Cookies.set("highcharts_" + chartName, seriesVisible, {expires: 180})
}

//存到cookie
function series_is_visible(chartName, index, defaultState) {
    var preferences = Cookies.getJSON("highcharts_" + chartName);
    if (preferences === undefined) {
        return defaultState
    }
    return preferences[index]
}

//Y轴线的tooltip
function tooltip_format_market_cap() {
    val = format_market_cap(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + " USD</b><br/>"
}

function tooltip_format_crypto() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}

function tooltip_format_fiat() {
    val = format_crypto(this.y);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "</b><br/>"
}

//Y轴格式化函数
function tooltip_format_percentage() {
    val = this.y.toFixed(2);
    return '<span style="color:' + this.color + '">\u25CF</span> ' + this.series.name + ": <b>" + val + "%</b><br/>"
}

function label_format_market_cap() {
    val = format_market_cap(this.value);
    return "$" + val
}

function label_format_crypto() {
    val = format_crypto(this.value);
    return val + " BTC"
}

function label_format_fiat() {
    val = format_crypto(this.value);
    return "$" + val
}

//是否为BTC
function is_altcoin(slug) {
    if (slug == "bitcoin") {
        return false
    }
    return true
}

function is_mobile() {
    var mobile = $("#metadata").data("mobile");
    return mobile == "True"
}

//创建构造函数对象
function HighChartsGraph(graphId, loadingId, noDataId) {
    this.graphId = graphId;
    this.loadingId = loadingId;
    this.noDataId = noDataId
}

//初始化对象
HighChartsGraph.prototype.init = function (start, end) {
    var that = this;
    that.fetchAndLoad(that.initCharts, start, end)
};
HighChartsGraph.prototype.chartsLoaded = function () {
    var chart = $("#" + this.graphId).highcharts();
    return chart !== undefined
};
HighChartsGraph.prototype.hideLoading = function () {
    $("#" + this.loadingId).hide()
};
HighChartsGraph.prototype.showNoData = function () {
    $("#" + this.noDataId).removeClass("hidden")
};
//更新数据
HighChartsGraph.prototype.afterSetExtremes = function (e) {
    if (e.dataMin != e.min || e.dataMax != e.max) {
        that = this;
        var min = Math.round(e.min);
        var max = Math.round(e.max);
        that.updateCharts(min, max)
    }
};
HighChartsGraph.prototype.updateCharts = function (min, max) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.showLoading("");
    that.fetchAndLoad(that.finishUpdateCharts, min, max)
};
HighChartsGraph.prototype.finishUpdateCharts = function (seriesData) {
};
HighChartsGraph.prototype.fetchAndLoad = function (callback, start, end) {
};
HighChartsGraph.prototype.initCharts = function (seriesData) {
};

//集成上面的对象HighChartsGraph
function CurrencyDetailGraph(graphId, loadingId, noDataId) {
    HighChartsGraph.call(this, graphId, loadingId, noDataId);
    this.slug = $("#coincode").val();
    this.chartName = is_altcoin(this.slug) ? "altcoin" : "bitcoin"
}

CurrencyDetailGraph.prototype = new HighChartsGraph;
CurrencyDetailGraph.constructor = CurrencyDetailGraph;
CurrencyDetailGraph.prototype.finishUpdateCharts = function (seriesData) {
    var that = this;
    var chart = $("#" + that.graphId).highcharts();
    chart.series[0].setData(seriesData["market_cap_by_available_supply"]);
    chart.series[1].setData(seriesData["price_usd"]);
    chart.series[2].setData(seriesData["price_btc"]);
    chart.series[3].setData(seriesData["vol_usd"]);
    chart.hideLoading()
};
//请求数据
CurrencyDetailGraph.prototype.fetchAndLoad = function (callback, start, end) {
    var that = this;
    callback.call(that, chartDataEth)
    // var slug = $("#coincode").val();
    // var apiDomain = "//api.feixiaohao.com";
    // timeParams = "";
    // if (start !== undefined && end !== undefined) {
    //     timeParams = start + "/" + end + "/"
    // }
    // $.ajax({
    //     url: apiDomain + "/coinhisdata/" + slug + "/" + timeParams,
    //     type: "GET",
    //     dataType: "json",
    //     error: function () {
    //         that.hideLoading();
    //         that.showNoData()
    //     },
    //     success: function (data) {
    //         if (undefined != data && null != data) {
    //             if (data.price_usd.length >= 1) {
    //                 $("#cointrend").css("display", "block")
    //             }
    //         }
    //         callback.call(that, data)
    //     }
    // })
};
CurrencyDetailGraph.prototype.initCharts = function (seriesData) {
    var that = this;
    Highcharts.setOptions({
        global: {useUTC: false},
        lang: {
            downloadJPEG: "下载jpg",
            downloadPDF: "下载pdf",
            downloadPNG: "下载png",
            downloadSVG: "下载svg",
            loading: "",
            months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            printChart: "打印图表",
            shortMonths: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            rangeSelectorFrom: "从",
            rangeSelectorTo: "到",
            rangeSelectorZoom: "缩放",
            resetZoom: "恢复初始缩放等级",
            resetZoomTitle: " 1:1缩放等级",
            shortWeekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            numericSymbols: ["千", "百万", "十亿"],
            thousandsSep: ","
        }
    });
    var titleName = $("#coinname").val();
    $("#" + that.graphId).highcharts("StockChart", {
        chart: {
            type: "line",
            zoomType: is_mobile() ? "null" : "x",
            height: 520,
            ignoreHiddenSeries: true
        },
        tooltip: {shared: true, hideDelay: 50, xDateFormat: "%A, %b %d %Y, %H:%M:%S"},
        legend: {
            enabled: true,
            align: "center",
            backgroundColor: "#FFFFFF",
            borderColor: "black",
            borderWidth: 0,
            layout: "horizontal",
            verticalAlign: "bottom",
            y: 0,
            shadow: false,
            floating: false
        },
        navigator: {adaptToUpdatedData: false},
        scrollbar: {liveRedraw: false},
        subtitle: {text: ""},
        rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{type: "day", count: 1, text: "天"}, {type: "week", count: 1, text: "周"}, {
                type: "month",
                count: 1,
                text: "1月"
            }, {type: "month", count: 3, text: "3月"}, {type: "year", count: 1, text: "1年"}, {
                type: "ytd",
                count: 1,
                text: "今年"
            }, {type: "all", text: "所有"}],
            selected: 6,
            inputEnabled: true,
            enabled: true
        },
        xAxis: [{
            events: {
                afterSetExtremes: function (e) {
                    that.afterSetExtremes(e)
                }
            }, minRange: 24 * 3600 * 1000
        }],
        yAxis: [
            {
                labels: {
                    formatter: function () {
                        return "$" + this.axis.defaultLabelFormatter.call(this)
                    }, align: "right", style: {color: "#7cb5ec"}
                },
                title: {text: "市值", style: {color: "#7cb5ec", "font-weight": "bold"}},
                showEmpty: false,
                height: "80%",
                opposite: false,
                floor: 0
            }, {
                labels: {style: {color: "#009933",}, align: "left", x: 15},
                title: {text: "价格 (美元)", style: {color: "#009933", "font-weight": "bold"}},
                showEmpty: false,
                height: "80%",
                opposite: true,
                floor: 0
            }, {
                labels: {formatter: label_format_crypto, style: {color: "#f7931a",}, align: "left", x: 15},
                title: {text: "价格 (BTC)", style: {color: "#f7931a", "font-weight": "bold"}},
                showEmpty: false,
                height: "80%",
                opposite: true,
                floor: 0
            }, {
                labels: {align: "right", style: {color: "#777",}},
                title: {text: "24h 成交量", style: {color: "#777", "font-weight": "bold"}},
                showEmpty: false,
                top: "80%",
                height: "20%",
                offset: 2,
                lineWidth: 1,
                opposite: false
            }],
        series: [{
            name: "市值",
            color: "#7cb5ec",
            tooltip: {pointFormatter: tooltip_format_market_cap},
            data: seriesData["market_cap_by_available_supply"],
            // visible: series_is_visible(this.chartName, 0, true),
            dataGrouping: {enabled: false}
        }, {
            name: "价格 (美元)",
            yAxis: 1,
            color: "#009933",
            tooltip: {pointFormatter: tooltip_format_fiat},
            data: seriesData["price_usd"],
            visible: series_is_visible(this.chartName, 1, (!is_altcoin(this.slug) || !is_mobile())),
            dataGrouping: {enabled: false}
        }, {
            name: "价格 (BTC)",
            color: "#f7931a",
            yAxis: 2,
            tooltip: {pointFormatter: tooltip_format_crypto},
            data: seriesData["price_btc"],
            visible: series_is_visible(this.chartName, 2, is_altcoin(this.slug)),
            dataGrouping: {enabled: false}
        }, {
            type: "column",
            name: "24h 成交量",
            color: "#777",
            yAxis: 3,
            tooltip: {pointFormatter: tooltip_format_market_cap},
            data: seriesData["vol_usd"],
            visible: series_is_visible(this.chartName, 3, true),
            dataGrouping: {approximation: "average", enabled: false}
        }],
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function (event) {
                        var index = event.target.index;
                        save_preferences(that.chartName, index, this.chart)
                    }
                }
            }
        },
    });
    that.hideLoading()
};
$(document).ready(function () {
    $(function () {
        var currencyDetailGraph = new CurrencyDetailGraph("highcharts-graph", "highcharts-loading", "highcharts-nodata");
        currencyDetailGraph.init();
    })
});