$(document).ready(function () {
	var addCcyTimer = null;
    $('.bookAddCcy-info,.bookAddCcy').click(function (event) {
        return false
    })
    $('.bookAddCcy').click(function () {
        $('.addCcy-wrap').find('.addCcyList').slideUp()
    })
    $('#addCcy').on('input propertychange', function () {
        var _this = $(this)
        console.log(_this.val())
        clearTimeout(addCcyTimer)
        addCcyTimer = setTimeout(function () {
            if (_this.val().trim()) {
                getAddCcy(_this.val())
                $('.addCcy-wrap').find('.addCcyList').css({
                    borderColor: '#eaeaea'
                })
            } else {
                $('.addCcy-wrap').find('.addCcyList').css({
                    borderColor: 'transparent'
                })
            }
        }, 300)
    }).focus(function () {
        if ($(this).val().trim()) {
            getAddCcy($(this).val())
        } else {
            $('.addCcy-wrap').find('.addCcyList').css({
                borderColor: 'transparent'
            })
        }
        $('.addCcy-wrap').find('.addCcyList').slideDown()
    })
    $('.addCcyClose').click(function () {
        $('.bookAddCcyMode').fadeOut()
    })
    $(document).click(function () {
        $('.addCcy-wrap').find('.addCcyList').slideUp()
        $('.bookAddCcyMode').fadeOut()
    })

    function getAddCcy(keyWord) {
        getCoinlaSingle({
            url: '/search/currencySearch',
            data: {searchName: keyWord, rows: 50}
        }, function (res) {
            console.log(res)
            if (res.code == 0) {
                var addCcyStr = ''
                res.data.list.forEach(function (item) {
                    addCcyStr += '<li class="addCcyListSingle" ccyid="' + item.ccyId + '" ccyname="' + item.currencyShortName + '" ccypic="' + item.pic + '"><img class="f-l" src="' + item.pic + '"><p class="addCcyName f-l">' + item.currencyShortName + '<span>' + item.currencyEnglishName + '</span></p></li>'
                })
                $('.addCcyList')(addCcyStr)
                $('.addCcyListSingle').click(function () {
                    $('#addCcy').val($(this).attr('ccyname'))
                    $('#addCcyImg').attr('src', $(this).attr('ccypic'))
                    $('.addCcy-wrap').find('.addCcyList').slideUp()
                    $('.addCcySubmit').attr('disabled', false)
                    $('.addCcySubmit').attr('ccyid', $(this).attr('ccyid'))
                })
            } else {
                $('.addCcyList').html('<li class="notSingle">' + res.message + '</li>')
            }

        })
    }
})