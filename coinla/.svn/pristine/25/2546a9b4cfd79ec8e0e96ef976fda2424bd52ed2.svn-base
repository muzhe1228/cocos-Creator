<template>
  <div id="demo" v-show="panel">
    <!-- 遮罩层 -->
    <div class="cropper_cont" v-show="panel">
      <div class="cropper_title">
        <p>更换头像</p>
        <div class="vicp-close" @click="close">
          <i class="vicp-icon4"></i>
        </div>
      </div>
      <div class="cropper_wrap"
           @dragleave="preventDefault"
           @dragover="preventDefault"
           @dragenter="preventDefault"
           @drop="change">
        <div class="cropper_l">
          <div class="upload1" v-show="isShow">
            <div>
              <input type="file" id="change" ref="files" v-show="false" accept="image/*"
                     @change="change">
              <label for="change" class="uploadBtn"><img src="~static/images/upload/icon_img.png"
                                                         alt=""><span>选择图片</span></label>
              <p class="uploadHint">支持JPG、GIF、PNG格式图片，不超过5M。拖拽或缩放图中的虚线方格可调整头像，注意右侧小头像预览效果。</p>
            </div>
          </div>
          <div class="cropperSize" v-show="!isShow">
            <img id="image" ref="cropperimg" v-lazy="url" alt="Picture">
          </div>
        </div>
        <div class="cropper_r">
          <p>头像预览</p>
          <div class="shadowSmall" @click="zoomImg(0.1)">
            <div class="small" v-show="!isShow"></div>
          </div>
          <div class="shadowBig" @click="zoomImg(-0.1)">
            <div class="small big" v-show="!isShow"></div>
          </div>
        </div>
      </div>
      <div class="cropper_handle">
        <label for="change" class="againUpload" v-show="!isShow"><span>重新上传</span></label>
      </div>
      <div class="cropper_btn">
        <button @click="crop" v-show="!isShow">确定</button>
        <button @click="close">取消</button>
      </div>

    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import {mapState, mapMutations} from 'vuex'
  import axios from '~/plugins/axios'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import Cookies from 'js-cookie'

  const mimes = {
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'psd': 'image/photoshop'
  };
  const imgFormat = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/svg+xml': 'svg',
    'image/photoshop': 'psd'
  };
  export default {
    data() {
      return {
        value4: 0,
        headerImage: null,
        picValue: null,
        cropper: null,
        croppable: false,
        url: null,
        isShow: true,
        file: null,
        mime: mimes['jpg']
      }
    },
    computed: {
      ...mapState(['userMsg', 'Token', 'panel'])
    },
    mounted() {
      //初始化这个裁剪框
      let self = this
      this.cropper = new Cropper(this.$refs.cropperimg, {
        aspectRatio: 1,
        viewMode: 0,
        dragMode: 'move',
        background: false,
        preview: '.small',
        autoCropArea: 0.8,
        ready: function () {
          self.croppable = true;
        }
      })
    },
    methods: {
      preventDefault(e) {
        e.preventDefault();
        return false;
      },
      close() {
        this.setPanel(false)
        this.isShow = true
        return this.cropper.reset()
      },
      zoomImg(ratio) {
        return this.cropper.zoom(ratio)
      },
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      //监听input file 的数据变化
      change(e) {
        e.preventDefault();
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.checkFile(files[0])
        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if (this.cropper) {
          this.cropper.replace(this.url);
        }
        this.setPanel(true)
        this.isShow = false
      },
      //剪切完成确定操作
      crop() {
        this.setPanel(false)
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.headerImage = roundedCanvas.toDataURL();
        let blob = this.dataURLtoBlob(roundedCanvas.toDataURL(this.picValue.type))
        this.postImg(blob, this.Token)

      },
      //canvas 转换blob
      dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      },
      getRoundedCanvas(sourceCanvas) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
      },
      //上传功能
      postImg(blob, Token) {
        if (Token) {
          let Data = new FormData()
          Data.append('file', blob, this.picValue.name)
          axios({
            method: 'post',
            url: '/upload/uploadImages',
            data: Data
          }).then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.editAvatar(Token, res.data.data)
              // let token = {token: this.Token}
              // this.$store.dispatch('SET_userMsg', token)
              this.isShow = true
            }
          }).catch((err) => {
            console.log(err.message)
          })
        }
      },
      editAvatar(Token, url) {
        // this.Loading()
        let params = {head: url}
        if (Token) {
          getCoinlaSingle('/user/mine/personalDate/save', params, Token).then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.getUser(Token)
            }
          })
        } else {
          this.$route.push('/')
        }
      },
      //获取用户资料存到cookie
      getUser(Token) {
        if (Token) {
          axios({
            method: 'post',
            url: '/user/mine/my',
            headers: {token: Token,loginType: 'web'}
          }).then((res) => {
            let code = res.data.code
            if (code === 0) {
              Cookies.set("userMsg", res.data.data, {expires: 7})
              this.setUserMsg(res.data.data)
            }
          })
        } else {
          console.log('error ')
        }
      },
      // 检测选择的文件是否合适
      checkFile(file) {
        let that = this
        // 仅限图片
        if (!file) return;
        if (file.type.indexOf('image') === -1) {
          alert('格式不正确')
          return false;
        }
        this.mime = file.type;
        // 超出大小
        if (file.size / 1024 > 5120) {
          alert('不能超过5M')
          return false;
        }
        return true;
      },
      ...mapMutations(['setPanel', 'setUserMsg'])
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  #demo {
    z-index: 9999;
    position: fixed;
    padding-top: 60px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
  }

  #demo .cropper_cont {
    z-index: 99;
    position: relative;
    left: 50%;
    top: 50%;
    width: 688px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-box-shadow: 0 0 15px rgba(255, 255, 255, .8);
    -moz-box-shadow: 0 0 15px rgba(255, 255, 255, .8);
    box-shadow: 0 0 15px rgba(255, 255, 255, .8);
  }

  #demo .cropper_wrap {
    display: flex;
    justify-content: space-between;
  }

  #demo .cropper_l {
    width: 400px;
    height: 360px;
    border-radius: 4px 4px 0 0;
    padding: 10px;
    border: 1px solid #dedede;
    border-bottom: none;
    position: relative;
  }

  #demo .cropper_l .upload1 {
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 0;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);

  }

  #demo .cropper_l .uploadHint {
    font-size: 12px;
    color: #666;
    line-height: 24px;
  }

  #demo .cropper_l .cropperSize {
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }

  #demo .cropper_handle {
    height: 40px;
    border: 1px solid #dedede;
    width: 400px;
    border-top: none;
    margin-top: -40px;
    border-radius: 0 0 4px 4px;
    padding: 0 10px;
  }

  #demo .cropper_handle .againUpload {
    width: 114px;
    height: 34px;
    border: 2px solid #debd63;
    line-height: 30px;
    text-align: center;
    display: block;
    cursor: pointer;
    color: #debd63;
    border-radius: 4px;
    margin: auto;
  }

  #demo .cropper_r {
    width: 220px;
    height: 400px;
    border-radius: 4px;
    padding: 10px;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #demo .cropper_r p {
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: #454545;
    height: 40px;
    padding: 10px;
  }

  #demo .cropper_r .shadowSmall,
  #demo .cropper_r .shadowBig {
    padding: 8px;
    border-radius: 50%;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
  }

  #demo .cropper_r .shadowSmall {
    width: 96px;
    height: 96px;
    background: url("~static/images/upload/head_m.png") no-repeat center/ 80px 80px;
  }

  #demo .cropper_r .shadowBig {
    margin-top: 50px;
    width: 156px;
    height: 156px;
    background: url("~static/images/upload/head_m.png") no-repeat center/ 140px 140px;
  }

  #demo .cropper_r .small,
  #demo .cropper_r .small.big {
    border: 1px solid #dedede;
    border-radius: 4px;
    overflow: hidden;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, .2);
    box-shadow: 0 0 20px rgba(0, 0, 0, .2);
  }

  #demo .cropper_r .small {
    width: 80px;
    height: 80px;
  }

  #demo .cropper_r .small.big {
    width: 140px;
    height: 140px;
  }

  #demo #image {
    max-width: 100%;
  }

  #demo .cropper_btn {
    text-align: center;
  }

  #demo .uploadBtn {
    width: 132px;
    height: 42px;
    background-color: #debd63;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    vertical-align: middle;
    cursor: pointer;
    margin: auto;
    margin-bottom: 20px;
  }

  #demo .uploadBtn img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  #demo .uploadBtn span {
    font-size: 14px;
    color: #fff;
  }

  #demo .cropper_btn button {
    width: 132px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    border: none;
    background-color: #b5b5b5;
    cursor: pointer;
    margin: 20px 20px 0 20px;
    -webkit-transition: all .4s;
    -moz-transition: all .4s;
    -ms-transition: all .4s;
    -o-transition: all .4s;
    transition: all .4s;
  }


  #demo .cropper_btn button:nth-child(1) {
    background-color: #debd63;
  }

  #demo .cropper_title {
    height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  #demo .cropper_title p {
    font-size: 14px;
    color: #454545;
  }

  #demo .vicp-close {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  #demo .vicp-close .vicp-icon4 {
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    -webkit-transition: -webkit-transform 0.18s;
    transition: -webkit-transform 0.18s;
    transition: transform 0.18s;
    -webkit-transform: rotate(0);
    -ms-transform: rotate(0);
    transform: rotate(0);
  }

  #demo .vicp-close .vicp-icon4::after, #demo .vicp-close .vicp-icon4::before {
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
    content: '';
    position: absolute;
    top: 12px;
    left: 4px;
    width: 20px;
    height: 2px;
    background-color: #666;
  }

  #demo .vicp-close .vicp-icon4::before {
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #demo .vicp-close .vicp-icon4::after {
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #demo .vicp-close .vicp-icon4:hover {
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .cropper-view-box, .cropper-face {
    border-radius: 50%;
  }

  .cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: ltr;
    -ms-touch-action: none;
    touch-action: none
  }

  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .cropper-wrap-box {
    overflow: hidden;
  }

  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }

  .cropper-modal {
    opacity: .5;
    background-color: #000;
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }

  .cropper-dashed {
    position: absolute;
    display: block;
    opacity: .5;
    border: 0 dashed #eee
  }

  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px
  }

  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px
  }

  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    opacity: .75
  }

  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee
  }

  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px
  }

  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .1;
  }

  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
  }

  .cropper-line {
    background-color: #39f
  }

  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize
  }

  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize
  }

  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize
  }

  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize
  }

  .cropper-point {
    width: 5px;
    height: 5px;

    opacity: .75;
    background-color: #39f
  }

  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize
  }

  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize
  }

  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize
  }

  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize
  }

  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize
  }

  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize
  }

  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize
  }

  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1
  }

  @media (min-width: 768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px
    }
  }

  @media (min-width: 992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px
    }
  }

  @media (min-width: 1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75
    }
  }

  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
</style>
