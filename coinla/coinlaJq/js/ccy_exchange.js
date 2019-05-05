$(document).ready(function () {
    $('.more').click(function () {
        console.log($(this).text())
        let text = $(this).text()
        let handDom = $(this).parents('section').find('.cont')
        let allSingle = $(this).parents('section').find('.cont_cont').length + 1
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