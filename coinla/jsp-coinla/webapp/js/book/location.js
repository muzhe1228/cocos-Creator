$(document).ready(function () {
    console.log(Cookies.get('token'))
    console.log(Cookies.getJSON('userMsg'))
    var timer = null,
        colors = ["#8378ea", "#e7bcf3", "#e062ae", "#fb7293", "#ff9f7f", "#96bfff", "#ffda5c", "#9fe6b8", "#32c5e9", "#37a2da"];
    timer = setTimeout(function () {
        setBookL(Cookies.getJSON('userMsg'))
        getBook(function (res) {
            var ccyData = res.data,
                pie = ccyData.currencyStorageList.slice(0, 10).concat(),
                pieLength = ccyData.currencyStorageList.length,
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
                thisPie(PieData,1)
            } else {
                PieData = pieRestData(pie)
                console.log(PieData)
                thisPie(PieData,1)
            }
            pie.forEach(function (item, index) {
                $('.child-stat-top-r').append('<li><p class="legend" style="background-color:' + colors[index] + '"></p><p class="name">' + item.name + '</p><p class="ratio">' + numRest(item.storageProportion, '%', 'no') + '</p></li>')
            })

            ccyData.currencyStorageList.forEach(function (item, index) {
                var str = ''
                item.list.forEach(function (subItem) {
                    str += '<li><p class="name"><img src="'+subItem.pic+'" alt="">' + subItem.name + ' : </p><p>' + subItem.currencyNumber + ' 个</p></li>'
                })
                $('#location').append('<div class="info-single"><ul class="show-ul"><li>' + ((index + 1) > 9 ? (index + 1) : '0' + (index + 1)) + '</li>' +
                    '<li data="' + item.name + '" class="pic_name">' + item.name + '</li><li class="btn">' +
                    '<p>' + numRest(item.currencyProperty) + '<span></span></p></li><li>' + numRest(item.storageProportion, '%', 'no') + '</li>' +
                    '</ul><ul class="none-ul">' + str + '</ul></div>')

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