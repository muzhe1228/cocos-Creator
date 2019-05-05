$(document).ready(function () {
	verifyToken()
    for (var i = 0; i < $('.newPage').find('a').length; i++) {
        var pageA = $('.newPage').find('a')[i]
        if ($(pageA).text() == $('.newPage').attr('data')) {
            $(pageA).addClass('active')
        }
    }
    $('input').bind('blur', function () {
        //进行相关操作
        var name = $(this).attr('name'), val = $(this).val(), error = $(this).parents('.form-row').find('.error')
        if (name == 'loginPhone' || name == 'regPhone') {
            account(val, error)
        } else if (name == 'loginPwd' || name == 'regPwd') {
            passWd(val, error)
        } else if (name == 'regAction') {
            nick(val, error)
        } else if (name == 'regCaptcha') {
            captcha(val, error)
        }
    });
    setTimeout(function () {
    	if (Cookies.get('token')) {
            $('.login').hide()
            $('.isLogo').show()

        } else {
            $('.isLogo').hide()
            $('.login').show()
        }
        initScroll()
    }, 30)

    $('.loginWrap-form').find("input").focus(function () {
        $(this).css({
            backgroundColor: '#fff',
            borderColor: "#debd63"
        });
        $(this).parents('.form-row').find('span i').css('color', '#debd63')
    }).blur(function () {
        if (!$(this).val()) {
            $(this).css({
                backgroundColor: '#f0f0f0',
                borderColor: "#eaeaea"
            });
            $(this).parents('.form-row').find('span i').css('color', '#454545')
        }
    });
    //打开弹窗
    $('.showLogin').click(function () {
        $('.loginShade').fadeIn()
    })
    $('.showRegister').click(function () {
        $('.registerShade').fadeIn()
    })
    //关闭弹窗
    $('.shadeCom,.loginRegClose').click(function () {
        closeLoginReg()
    })
    //取消冒泡
    $('.loginWrap,.registerWrap').click(function () {
        return false
    })
    //注册操作
    $('#registerBtn').click(function () {
        var IsError = $(this).parents('.loginWrap-form').find('.error').text()
        if (IsError.trim()) {
            alert('请检输入的内容')
        } else {
            getCoinlaSingle({
                url: '/user/login/register',
                data: {
                    nick: $('#regAction').val(),
                    passwd: $('#regPwd').val(),
                    account: $('#regPhone').val(),
                    captcha: $('#regCaptcha').val(),
                    client: 0,
                    userId: 0,
                    type: "web"
                },
                token: ''
            }, function (res) {
                console.log(res)
                if (res.code == 0) {
                    alert('恭喜你注册成功!')
                    closeLoginReg()
                } else {
                    alert(res.message)
                }
            })
        }
    })
    //登录操作
    $('#loginBtn').click(function () {
        var IsError = $(this).parents('.loginWrap-form').find('.error').text()
        if (IsError.trim()) {
            alert('请检输入的内容')
        } else {
            getCoinlaSingle({
                url: '/user/login/password',
                data: {
                    account: $('#loginPhone').val(),
                    passwd: $('#loginPwd').val()
                },
                token: ''
            }, function (res) {
                console.log(res)
                if (res.code == 0) {
                    Cookies.set('token', res.data.token)
                    Cookies.set('userMsg', res.data)
                    closeLoginReg()
                    location.reload()
                } else {
                    alert(res.message)
                }
            })
        }
    })
    // 发送验证码
    $('.captcha').click(function () {
        sendCode({
            account: $('#regPhone').val(),
            type: 3
        }, $(this))
    })
    $('.logOut').click(function () {
        logOut()
    })

    //退出登录
    function logOut() {
        getCoinlaSingle({url: '/user/logout', token: Cookies.get('token')}, function (res) {
            location.reload()
            Cookies.remove('token')
            Cookies.remove('userMsg')
        })
    }

    //关闭弹窗函数
    function closeLoginReg() {
        $('.shadeCom').fadeOut()
    }

    //头部header 滚动的状态转换
    function initScroll() {
        var h = $('header').height()
        document.addEventListener('scroll', function () {
            if (document.documentElement.scrollTop > h || document.body.scrollTop > h) {
                $('#subHead').addClass('hover-hand-fixed')
            } else {
                $('#subHead').removeClass('hover-hand-fixed')
            }
        })
    }
})