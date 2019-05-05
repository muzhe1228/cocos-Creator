$(document).ready(function () {
    var linkList;
    $.post('http://pcapi.coinla.com/findLinksList', function (res) {
        linkList = res.data
        for (var i = 0; i < linkList.length; i++) {
            $('.links-info-all').append(`<a href="${linkList[i].link}" target="_blank" title="${linkList[i].name}">${linkList[i].name}</a>`)
        }
    })

})