/* ==================slide 初始化=============== */
const isIphonex = () => /iphone/gi.test(navigator.userAgent) && window.screen && (window.screen.height === 812 && window.screen.width === 375);

scaleW = window.innerWidth / 375;
scaleH = window.innerHeight / 667;
var scaleH2 = scaleH;
var bili = scaleH / scaleW;
console.log("=======pre: ", scaleH / scaleW);
if (isIphonex() || bili > 1.06) {
  bili = 1.06
  scaleH = 1.06 * scaleW;
}

var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
  resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
  resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
  resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
  if (bili == 1.06) {
    if (!isIphonex())
      resizes[j].style.top = parseInt(resizes[j].style.top + 20) * scaleH2 + 'px';
    resizes[j].style.top = parseInt(resizes[j].style.top + 60) * scaleH + 'px';
  }
  resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
}



/* ================解决键盘压缩页面的问题 =============*/
var hrt = document.documentElement.clientHeight; //获取当前可视区域的高度存到hrt变量
window.onload = function () { //在页面整体加载完毕时
  document.getElementById('app').style.height = hrt + 'px'//把获取到的高度赋值给根div
}

let num = document.getElementById('num')
let newNum = Math.round(Math.random() * 1000 + Math.random() * 100 + Math.random() * 10) + (num.innerHTML - '0')
num.innerHTML = newNum

var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: '.swiper-pagination',
  //virtualTranslate : true,
  mousewheelControl: true,
  onInit: function (swiper) {
    swiperAnimateCache(swiper);
    swiperAnimate(swiper);
  },
  onSlideChangeEnd: function (swiper) {
    swiperAnimate(swiper);
  },
  onTransitionEnd: function (swiper) {
    swiperAnimate(swiper);
  },


  watchSlidesProgress: true,

  onProgress: function (swiper) {
    for (var i = 0; i < swiper.slides.length; i++) {
      var slide = swiper.slides[i];
      var progress = slide.progress;

      var translate = progress * swiper.height / 4;
      scale = 1 - Math.min(Math.abs(progress * 0.5), 1);

      var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
      slide.style.opacity = opacity;
      es = slide.style;
      es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';

    }
  },

  onSetTransition: function (swiper, speed) {
    for (var i = 0; i < swiper.slides.length; i++) {
      es = swiper.slides[i].style;
      es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';

    }
  },
})

/* ================表单检验的函数================== */
const btn = document.getElementById('btn')
const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const address = document.getElementById('address');

form.addEventListener('submit', e => {
  e.preventDefault();

  checkInputs();
});

function checkInputs () {
  // trim to remove the whitespaces
  const emailValue = email.value.trim();
  const addressValue = address.value.trim();
  const usernameValue = username.value.trim();

  if (usernameValue === '') {
    setErrorFor(username, '姓名不能为空');
    return;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === '') {
    setErrorFor(email, '联系方式不能为空');
    return;
  } else {
    setSuccessFor(email);
  }

  if (addressValue === '') {
    setErrorFor(address, '接力地址不能为空');
    return;
  } else {
    setSuccessFor(address);
  }

  setSuccess();
}

function setErrorFor (input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor (input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function setSuccess () {
  btn.innerHTML = '接力成功！';
  btn.disabled = "disabled";
  setTimeout(() => {
    btn.innerHTML = '接力';
    btn.disabled = "";
    mySwiper.slideNext();
  }, 500);
}


/* ================自定义点击事件============== */
var man = document.getElementById('man');
var woman = document.getElementById('woman');
var winner = document.getElementById('winner');
man.onclick = () => {
  winner.src = './images/man.gif';
  mySwiper.slideNext();
}
woman.onclick = () => {
  winner.src = './images/woman.gif';
  mySwiper.slideNext();
}

// 跑步页面最后的跳转
var zhengshu = document.getElementById('zhengshu')
zhengshu.onclick = () => {
  event.preventDefault();
  mySwiper.slideNext();
}

/* ================ 证书绘制 ================*/
// 拼出来的图片的宽度
const width = 360;
var height = 602;
if (bili == 1.06)
  height = 1.5 * width;
if (isIphonex())
  height = 602 - 64;

// 拼出来的图片的质量，0-1之间，越大质量越好
const encoderOptions = 1

// 头像图片的实例化对象
var avatarWidth = 60;
var avatarHeight = 77;
var avatarImg = undefined;
const avatarInput = document.getElementById('avatar-input');
const avatarDiv = document.getElementById('avatar-container');

// 运动轨迹图片实例化对象
var runWidth = 90;
var runHeight = 130;
var runImg = undefined;
const runInput = document.getElementById('run-input');
const runDiv = document.getElementById('run-container');

avatarInput.addEventListener('change', event => {
  const files = Array.from(event.target.files);
  fileToInstance(files[0], 'avatar');
})

runInput.addEventListener('change', event => {
  const files = Array.from(event.target.files);
  fileToInstance(files[0], 'run');
})

const fileToInstance = (file, t) => {
  const reader = new FileReader()
  // 把文件读为 dataUrl
  reader.readAsDataURL(file)
  reader.onload = e => {
    const image = new Image()
    image.src = e.target.result
    image.onload = () => {
      // 图片实例化成功后存起来
      if (t == 'avatar') {
        avatarImg = image;
        drawAvatar(finalImageUrl => {
          let avatar = document.getElementById('avatar');
          let avatar1 = document.getElementById('avatar1');
          avatar.src = finalImageUrl;
          avatar1.src = finalImageUrl;
        })
      } else {
        runImg = image;
        drawRun(finalImageUrl => {
          let map = document.getElementById('map');
          let map1 = document.getElementById('map1');
          map.src = finalImageUrl;
          map1.src = finalImageUrl;
        })
      }
      let imageDiv = document.getElementById('image-container');
      imageDiv.innerHTML =
        `<img src='./images/certificate.png'>`
    }
  }
}

const drawAvatar = (callback) => {
  avatarWidth = avatarHeight / avatarImg.height * avatarImg.width;
  var canvas = document.createElement('canvas');
  canvas.width = avatarWidth;
  canvas.height = avatarHeight;

  const context = canvas.getContext('2d');
  context.drawImage(avatarImg, 0, 0, avatarWidth, avatarHeight);

  callback(canvas.toDataURL('image/png', encoderOptions));
}

const drawRun = (callback) => {
  runWidth = runHeight / runImg.height * runImg.width;
  var canvas = document.createElement('canvas');
  canvas.width = runWidth;
  canvas.height = runHeight;

  const context = canvas.getContext('2d');
  context.drawImage(runImg, 0, 0, runWidth, runHeight);

  callback(canvas.toDataURL('image/png', encoderOptions));
}

const circleImg = (ctx, img, x, y, r) => {
  ctx.save();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(img, x, y, d, d);

}

var createHoster = document.getElementById('createHoster');
createHoster.onclick = () => {
  // if (avatarImg != undefined)
  //   avatarWidth = avatarHeight / avatarImg.height * avatarImg.width;
  // if (runImg != undefined)
  //   runWidth = runHeight / runImg.height * runImg.width;

  // // 绘制网络图片
  // var myImage = new Image();
  // myImage.crossOrigin = 'Anonymous';
  // // myImage.src = 'https://upload-images.jianshu.io/upload_images/6359034-33eb49815f4e1cf3.png?imageMogr2/auto-orient/strip|imageView2/2/w/472/format/webp'; //你自己本地的图片或者在线图片
  // myImage.src = '../images/certificate.png'; //你自己本地的图片或者在线图片

  // myImage.onload = () => {
  //   // 建立canvas
  //   var canvas = document.createElement('canvas');
  //   canvas.width = width * scaleW;
  //   canvas.height = height * scaleH;
  //   const context = canvas.getContext('2d');

  //   // 绘制证书背景
  //   context.drawImage(myImage, 0, 0, width * scaleW, height * scaleH);
  //   // 绘制头像
  //   if (avatarImg != undefined) { // 或圆形头像，xy对应圆心坐标
  //     if (isIphonex() || bili == 1.06) {
  //       circleImg(context, avatarImg, 130 * scaleW, 39 * scaleH, avatarWidth * scaleW - 2, avatarHeight * scaleH - 2);
  //     }
  //     else
  //       circleImg(context, avatarImg, 127 * scaleW, 40 * scaleH, avatarWidth * scaleW, avatarHeight * scaleH);
  //   }
  //   // 绘制运动轨迹
  //   context.restore();
  //   if (runImg != undefined) {
  //     context.save();
  //     if (isIphonex() || bili == 1.06)
  //       context.drawImage(runImg, 80 * scaleW, 350 * scaleH, runWidth * scaleW, runHeight * scaleH);
  //     else
  //       context.drawImage(runImg, 80 * scaleW, 397 * scaleH, runWidth * scaleW, runHeight * scaleH);
  //   }

  //   // 63接近边界
  //   context.restore();
  //   context.font = 'italic 16px bold';
  //   // 写姓名
  //   if (isIphonex()) {
  //     context.fillText(username.value.trim(), 55 * scaleW, 190 * scaleH);
  //     context.fillText(newNum, 62 * scaleW, 218 * scaleH);
  //   } else {
  //     context.fillText(username.value.trim(), 62 * scaleW, 214 * scaleH);
  //     context.fillText(newNum, 62 * scaleW, 245 * scaleH);
  //   }

  //   // 第一行底部 148
  //   // 第四列开始 82
  //   // 写文字
  //   let comment = document.getElementById('comment').value.trim();
  //   context.font = 'italic 18px';

  //   const lineH = 19;
  //   const lineNum = 120 * scaleW / 18;
  //   const lines = comment.length / lineNum;
  //   for (let i = 0; i < lines; ++i) {
  //     let str = comment.substr(i * lineNum, lineNum);
  //     if (isIphonex() || bili == 1.06)
  //       context.fillText(str, 199 * scaleW, (370 + i * lineH) * scaleH);
  //     else
  //       context.fillText(str, 199 * scaleW, (405 + i * lineH) * scaleH);
  //   }

  //   var base64 = canvas.toDataURL("image/png", encoderOptions); //"image/png" 这里注意一下
  //   const imageDiv = document.getElementById('image-container');
  //   var posX = 100 * scaleW;
  //   var posY = 580 * scaleH;
  //   imageDiv.innerHTML =
  //     `<div id="bg"><br><img src=${base64}><a class="ani submitBtn" download href=${base64} style="left: ${posX}px; top: ${posY}px; list-style: none;text-decoration: none;color:#000">点击下载证书</a></div>`
  // }
  if (avatarImg == undefined || runImg == undefined) {

  }
  mySwiper.slideNext();
}

function showToast () {
  isShow = true;
  setTimeout(() => {
    isShow = false;
  }, 2000);
}