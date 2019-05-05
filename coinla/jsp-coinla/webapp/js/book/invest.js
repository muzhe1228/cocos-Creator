$(document).ready(function () {
    var timer = null, bookCurrencyId = getUrlKey('bookCurrencyId');
    timer = setTimeout(function () {
        setBookL(Cookies.getJSON('userMsg'))
        getBook(function (res) {
            var investData = res.data.bookList[0].bookCurrencylist, ccyDetails = []
            for (var i = 0; i < investData.length; i++) {
                if (investData[i].bookCurrencyId == bookCurrencyId) {
                    ccyDetails = investData[i].currencyInfoResultVo
                    break
                }
            }
            setBookccyDetails(ccyDetails)
        })
    }, 30)
    $('.ccyName1').text(getUrlKey('ccyName') + '总资产')
    $('.ccyName2').text(getUrlKey('ccyName') + '投资明细')
    laydate.render({
        elem: '#test1' //指定元素
        , max: 0
    });
})