$(document).ready(function () {
    console.log(Cookies.get('token'))
    console.log(Cookies.getJSON('userMsg'))
    var timer = null,
        colors = ["#d3758f", "#f3d999", "#a5d8c3", "#564e50", "#c6b38f", "#001751", "#f4e8c8", "#305791", "#8fb2a2", "#e02053"];
    timer = setTimeout(function () {
        setBookL(Cookies.getJSON('userMsg'))
        getBook(function (res) {
            var ccyData = res.data,
                pie = ccyData.currencyCountList.slice(0, 10).concat(),
                pieLength = ccyData.currencyCountList.length,
                PieData = [], elesRatio = 0, num = pie[0].list.length,
                H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px'
            $('.info-single').eq(0).css({//设置第一个下拉的高度展开
                height: H
            })
            if (pieLength > 10) {
                for (var i = 0; i < 9; i++) {
                    elesRatio += parseFloat(pie[i].storageProportion)
                }
                pie[9].name = '其他'
                pie[9].storageProportion = parseFloat((100 - elesRatio).toFixed(2))
                PieData = pieRestData(pie)
                thisPie(PieData)
            } else {
                PieData = pieRestData(pie)
                console.log(PieData)
                thisPie(PieData)
            }
            pie.forEach(function (item, index) {
                $('.child-stat-top-r').append('<li><p class="legend" style="background-color:' + colors[index] + '"></p><p class="name">' + item.name + '</p><p class="ratio">' + numRest(item.storageProportion, '%', 'no') + '</p></li>')
            })

            ccyData.currencyCountList.forEach(function (item, index) {
                var str = ''
                item.list.forEach(function (subItem) {
                    str += '<li><p class="name">' + subItem.name + ' : </p><p>' + subItem.currencyNumber + ' 个</p></li>'
                })
                $('#property').append('<div class="info-single"><ul class="show-ul"><li>' + ((index + 1) > 9 ? (index + 1) : '0' + (index + 1)) + '</li>' +
                    '<li data="' + item.name + '" class="pic_name"><img alt="" src="' + item.pic + '"><b>' + item.name + '</b></li><li class="btn">' +
                    '<p>' + numRest(item.currencyProperty) + '<span></span></p></li><li>' + numRest(item.storageProportion, '%', 'no') + '</li>' +
                    '<li>' + item.currencyNumber + '个</li></ul><ul class="none-ul">' + str + '</ul></div>')

            })
            $('.btn').click(function () {
                var dom = $(this).parents('.info-single')
                var num = dom.children('.none-ul').children().length
                if (dom.height() > 60) {
                    console.log(dom.height())
                    dom.css({
                        height: '60px'
                    })
                } else {
                    let H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px'
                    dom.css({
                        height: H
                    }).siblings('.info-single').css({
                        height: "60px"
                    })
                }
            })
        })
    }, 30)

})