$(document).ready(function () {
    $.post('http://pcapi.coinla.com/index/findCN', {cerIds: '1,6,21,15'}, function (res) {
        let indexTopList = res.data
        for (let i = 0; i < indexTopList.length; i++) {
            $('.top-svg').append(`<section>
        <p class="name">${indexTopList[i].currencyName} / OTC</p>
        <p class="location" :class="item.openRiseFall | IsColor">
            <span class="price">￥</span>${indexTopList[i].openNationalLowPrice}<i
                class="item.openRiseFall>0?'icon-ken_up':(item.openRiseFall===0?'':'icon-ken_down')"></i>
        </p>
        <div class="chart"></div>
    </section>`)
        }
        $.post('http://pcapi.coinla.com/svg/findList', {cerIds: '1,6,21,15'}, function (res) {
            console.log(resetSvgTop(res.data))
            let arr = [1, 6, 21, 15]
            for (let i = 0; i < 4; i++) {
                $('section').eq(i).children('.chart').append(`<svg>
            <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="0" y2="100%">
                <stop offset="0%" stop-color="#dedede"/>
                <stop offset="100%" stop-color="#ffffff"/>
              </linearGradient>
            </defs>
            <polyline fill="url(#linear)" points="0 22 ${resetSvgTop(res.data)[arr[i]]} 92 22">
            </polyline>
            <polyline points="${resetSvgTop(res.data)[arr[i]]}"
                      stroke="#666" stroke-width="1" stroke-linecap="round"
                      class="g-rect-fill"></polyline>
          </svg>`)
            }
        })
    })

})