$(document).ready(function () {
    pie()
    $('.btn').click(function () {
        let dom = $(this).parents('.info-single')
        let num = dom.children('.none-ul').children().length
        if (dom.height() > 60) {
            console.log(dom.height())
            dom.css({
                height: '60px'
            })
        }else {
            let H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px'
            dom.css({
                height: H
            }).siblings('.info-single').css({
                height: "60px"
            })
        }
    })
})