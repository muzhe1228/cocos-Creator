$(document).ready(function(){
  initPage();
});
function initPage() {
  //alert(window.location.href);/***用于获得当前连接url用**/
  /***用户点击分享到微信圈后加载接口接口*******/
  $.post("http://www.bizhijia.com/bzj-portal/wechatParam.html",{"url":window.location.href},function(data,status){
    //alert(data);
    data=eval("("+data+")");
    //console.log(data.appid+" "+data.timestamp+" "+data.nonceStr+" "+data.signature);
    wx.config({
      //debug: true,
      appId: data.appid,
      timestamp:data.timestamp,
      nonceStr:data.nonceStr,
      signature:data.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
      ]
    });
    var shareTitle = "${academyArticle.title}";
    var shareImg = "${academyArticle.pic}";
    var shareContent='${academyArticle.content}';
    var dd=shareContent.replace(/<[^>]+>/g,"");
    var content=dd.replace(/&nbsp;/ig, "");
    wx.ready(function(){
      wx.onMenuShareTimeline({
        title : shareTitle, // 分享标题
        link : '', // 分享链接
        imgUrl : shareImg, // 分享图标
        success : function() {
          // 用户确认分享后执行的回调函数
        },
        cancel : function() {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: content, // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    });
  });
}

$(function () {
  getShare=function (linkUrl,title,imgUrl,desc) {
    $.ajax({
      url: "../wechat/sign",
      type: "get",
      data:{'linkUrl':linkUrl},
      cache: false,
      dataType: "json",
      success: function(data){
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timesTamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.sign, // 必填，签名，见附录1
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]
          //jsApiList 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
          //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
              h5.common.laymsg('分享成功');
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
              h5.common.laymsg('分享失败');
            }
          });

          //获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
              h5.common.laymsg('分享成功');
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
              h5.common.laymsg('分享失败');
            }
          });

          //获取“分享到QQ”按钮点击状态及自定义分享内容接口
          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
          wx.onMenuShareWeibo({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
          wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: linkUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });

          wx.error(function(res) {
            h5.common.laymsg("签名报错");
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          });

        });
      },
      error: function() {
        console.log('ajax request failed!!!!');
        return;
      }
    });
  };
})
