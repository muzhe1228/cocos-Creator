$(document).ready(
    function () {
        getCoinlaSingle({
            url: '/exchange/findNewCurrencyList',
            data: {},
            token: ''
        }, function (res) {
            var List = res.data.slice(0,10)
            for (var i = 0; i < List.length; i++) {
                $("#newCurreny").append(
                    '<ul class="con-cont goToUrl"><li>'
                    + resetTime(List[i].initiateCreateDate)
                    + '</li><li title="' + List[i].currencyName
                    + '"><a class="aClick" href="/coin/' + toLowerCase(List[i].currencyEnglisgName) + '">'
                    + List[i].currencyShortName
                    + '</a></li><li class="'
                    + IsColor(List[i].openRiseFall) + '">'
                    + numRest(List[i].openRiseFall, '%')
                    + '</li><li>' + numRest(List[i].openPrice)
                    + '</li></ul>')
            }
        })

    })