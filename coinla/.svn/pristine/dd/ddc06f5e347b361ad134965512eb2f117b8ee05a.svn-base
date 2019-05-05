$(document).ready(function () {
    var timer = null;
    timer = setTimeout(function () {
    	bookIsLogin()
        if (Cookies.get('token')) {
            setBookL(Cookies.getJSON('userMsg'))
            getBook(function (res) {
                setBookIndex(res.data.bookList[0].bookCurrencylist)
                $('#bookId').val(res.data.bookList[0].bookId)
                $('.addCcySubmit').click(function () {
                    console.log($(this).attr('ccyid'), Cookies.get('token'))
                    getCoinlaSingle({
                        url: '/book/addCurrencyToBook',
                        data: {bookId: $('#bookId').val(), ccyId: $(this).attr('ccyid')},
                        token: Cookies.get('token')
                    }, function (res1) {
                        console.log(res1)
                        if (res1.code == 0) {
                            setBookIndex()
                            $('.bookAddCcyMode').fadeOut()
                        } else {
                            alert(res1.message)
                        }
                    })
                })
            })
        } else {
            return
        }

    }, 30)
    $('.addCcy').click(function () {
        console.log($('.demo-input').val())
        $('.bookAddCcyMode').fadeIn()
        return false
    })

})