$(document).ready(function () {
    $.post('http://pcapi.coinla.com/exchange/findcurrencyCoreData', {ccyId: 1}, function (res) {
        let coreData = res.data
        vFor(coreData)
        setPieT(coreData)
    })
    console.log($('.sizeVar'))
    var nameNum = ['market_qty', 'market_total', 'circulate_ratio', 'turnover_ratio_24h', 'total_value', 'total_value_ratio', 'circulate_total_value_rank']

    function vFor(coreData) {
        for (let i = 0; i < nameNum.length; i++) {
            console.log(coreData.market_qty)
            if (i + 1 === nameNum.length) {
                $('.sizeVar').eq(i).html('NO' + coreData[nameNum[i]])
            } else {
                $('.sizeVar').eq(i).html(coreData[nameNum[i]])
            }
        }
        Rita()//添加百分符号
    }

    function setPieT(coreData) {
        if (coreData) {
            let market = {
                id: 'market',
                color: ['#53a4d5', '#409bb4', '#51a3d2'],
                lineCap: 'round',
                text: ''
            }
            let circulate = {
                id: 'circulate',
                color: ['#6c2fd7', '#2978d8', '#623ad7'],
                lineCap: 'round',
                text: ''
            }
            let turnover = {
                id: 'turnover',
                color: ['#e04590', '#ce1dbb', '#d9379f'],
                lineCap: 'round',
                text: ''
            }
            let total = {
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
})