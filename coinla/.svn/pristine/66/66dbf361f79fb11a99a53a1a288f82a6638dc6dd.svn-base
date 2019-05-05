$(document).ready(function () {
    $('.more').click(function () {
        console.log($(this).text())
        var text = $(this).text()
        var handDom = $(this).parents('section').find('.cont')
        var allSingle = $(this).parents('section').find('.cont_cont').length + 1
        if (text === '查看更多') {
            $(this).text('收起')
            handDom.css({
                height: allSingle * 60 + 'px'
            })
        } else {
            $(this).text('查看更多')
            handDom.css({
                height: '360px'
            })
        }
    })
})