let sevene_cookiesTime = null;
let sevene_musicPlaying = false;
let sevene_keyboard = false;
let sevene_intype = false;
let sevene_showFPS = false;
// 私有函数
var sevene = {
  
  // 检测显示模式
  darkModeStatus: function () {
    let theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (theme == 'light') {
      $(".menu-darkmode-text").text("深色模式");
    }else {
      $(".menu-darkmode-text").text("浅色模式");
    }
  },

  //bb添加时间
  changeTimeInEssay: function() {
    const relativeDate = function (selector) {
      selector.forEach(item => {
        const $this = item
        const timeVal = $this.getAttribute('datetime')
        $this.innerText = btf.diffDate(timeVal, true)
        $this.style.display = 'inline'
      })
    }

    if (document.querySelector('#bber')) {
      relativeDate(document.querySelectorAll('#bber time'))
    }
  },

  // 首页bb
  initIndexEssay: function() {
    if (document.querySelector('#bber-talk')) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', // 垂直切换选项
        loop: true,
        autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true
      },
      });
    }
  },


  // 只在首页显示
  onlyHome: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    if (urlinfo == '/'){
      $('.only-home').attr('style','display: flex');
    }else{
      $('.only-home').attr('style','display: none');
    }
  },

  //是否在首页
  is_Post: function() {
    var url=window.location.href;  //获取url
  if(url.indexOf("/p/") >= 0 ) { //判断url地址中是否包含code字符串
      return true;
    }else {
      return false;
     }
  },


  //监测是否在页面开头
  addNavBackgroundInit: function() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if(document.body){
        bodyScrollTop = document.body.scrollTop;
      }
      if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      // console.log("滚动高度"+ scrollTop)
    
      if (scrollTop != 0) {
        document.getElementById("page-header").classList.add("nav-fixed");
        document.getElementById("page-header").classList.add("nav-visible");
        $('#cookies-window').hide()
        console.log("已添加class")
      }
  },

  // 标签页面
  //分类条
  tagPageActive: function() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    // 验证是否是分类链接
    var pattern = /\/tags\/.*?\//;
    var patbool = pattern.test(urlinfo);
    // console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      // console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#tag-page-tags')){
        $('a').removeClass('select')
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  },

  //分类条
  categoriesBarActive: function() {
    if (document.querySelector('#category-bar')){
      $(".category-bar-item").removeClass("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo);
    // console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/'){
      if (document.querySelector('#category-bar')){
        document.getElementById('category-bar-home').classList.add("select");
      }
    }else {
      // 验证是否是分类链接
      var pattern = /\/categories\/.*?\//;
      var patbool = pattern.test(urlinfo);
      // console.log(patbool);
      // 获取当前的分类
      if (patbool) {
        var valuegroup = urlinfo.split("/");
        // console.log(valuegroup[2]);
        // 获取当前分类
        var nowCategorie = valuegroup[2];
        if (document.querySelector('#category-bar')){
          document.getElementById(nowCategorie).classList.add("select");
        }
      }
    }
  },

  logInfo: ()=>{
    console.log(`Welcome to:\n%c七鳄学习格 :%c https://blog.gmcj0816.top%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2021/10/15 00:00:00").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
  },
  //禁止图片右键单击
  stopImgRightDrag: function() {
    var img=$("img");
    img.on("dragstart",function(){return false;});
  },

  //置顶文章横向滚动
  topPostScroll: function() {
    if (document.getElementById("recent-post-top")){
      let xscroll = document.getElementById("recent-post-top");
      xscroll.addEventListener("mousewheel", function (e) {
      //计算鼠标滚轮滚动的距离
      let v = -e.wheelDelta / 2;
      xscroll.scrollLeft += v;
      //阻止浏览器默认方法
      if(document.body.clientWidth < 1300){
        e.preventDefault();
      }
      }, false);
    }
  },

  topCategoriesBarScroll: function() {
    if (document.getElementById("category-bar-items")){
        let xscroll = document.getElementById("category-bar-items");
        xscroll.addEventListener("mousewheel", function (e) {
        //计算鼠标滚轮滚动的距离
        let v = -e.wheelDelta / 2;
        xscroll.scrollLeft += v;
        //阻止浏览器默认方法
        e.preventDefault();
      }, false);
    }
  },

  //作者卡片问好
  sayhi: function() {
    if (document.querySelector('#author-info__sayhi')){
      document.getElementById("author-info__sayhi").innerHTML = getTimeState() + "！我是";
    }
  },

  // 添加标签
  addTag: function() {
    //添加new标签
    if (document.querySelector('.sevene-tag-new')){
      $(".sevene-tag-new").append(`<sup class="sevene-tag sevene-tag-new-view">N</sup>`)
    }
    //添加hot标签
    if (document.querySelector('.sevene-tag-hot')){
      $(".sevene-tag-hot").append(`<sup class="sevene-tag sevene-tag-hot-view">H</sup>`)
    }
  },

  // 二维码
  qrcodeCreate: function() {
    if (document.getElementById('qrcode')){
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: window.location.href,
        width: 250,
        height: 250,
        colorDark : "#000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });
    }
  },

  // 刷新即刻短文瀑布流
  reflashEssayWaterFall: function() {
    if (document.querySelector('#waterfall')) {
      setTimeout(function(){
          waterfall('#waterfall');
          document.getElementById("waterfall").classList.add('show'); 
      },500);
    }
  },

  // 即刻短文添加灯箱
  addMediumInEssay: function() {
    if (document.querySelector('#waterfall')) {
      mediumZoom(document.querySelectorAll('[data-zoomable]'))
    }
  },

  // 下载图片
  downloadImage: function(imgsrc, name) { //下载图片地址和图片名
    rm.hideRightMenu();
    if (rm.downloadimging == false) {
      rm.downloadimging = true;
      btf.snackbarShow('正在下载中，请稍后',false,10000)
      setTimeout(function(){
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
        btf.snackbarShow('图片已添加盲水印，请遵守版权协议');
        rm.downloadimging = false;
      }, "10000");
    }else{
      btf.snackbarShow('有正在进行中的下载，请稍后再试');
    }
  },
  // 切换热评
  switchCommentBarrage: function  () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    console.log(flag)
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
    rm.hideRightMenu();
    btf.snackbarShow('热评显示切换成功',false,2000);
  },


  //隐藏cookie窗口
  hidecookie: function() {
    sevene_cookiesTime = setTimeout(()=>{
      document.getElementById("cookies-window").classList.add('cw-hide');
      setTimeout(()=>{
        $('#cookies-window').hide()
      },1000)
    },3000)
  },

  //隐藏今日推荐
  hideTodayCard: function() {
    if (document.getElementById("todayCard")) {
      document.getElementById("todayCard").classList.add('hide');
    }
  },

  //更改主题色
  changeThemeColor: function(color) {
    if (document.querySelector('meta[name="theme-color"]') !== null) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', color)
    }
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },

  //自适应主题色
  initThemeColor: function() {
    if (sevene.is_Post()) {
      const currentTop = window.scrollY || document.documentElement.scrollTop
      if (currentTop > 0) {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sevene-card-bg');
        sevene.changeThemeColor(themeColor);
      }else {
        if (currentTop === 0) {
          let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sevene-main');
          sevene.changeThemeColor(themeColor);
        }
      }
    }else {
      let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sevene-card-bg');
      sevene.changeThemeColor(themeColor);
    }
  },

  //跳转到指定位置
  jumpTo: function(dom) {
    $(document).ready(function () {
      $("html,body").animate({
        scrollTop: $(dom).eq(i).offset().top
      }, 500 /*scroll实现定位滚动*/ ); /*让整个页面可以滚动*/
    });
  },

  //显示加载动画
  showLoading: function() {
    document.querySelector("#loading-box").classList.remove("loaded");
    let cardColor = getComputedStyle(document.documentElement).getPropertyValue('--sevene-card-bg');
    sevene.changeThemeColor(cardColor);
  },

  //隐藏加载动画
  hideLoading: function() {
    document.querySelector("#loading-box").classList.add("loaded");
  },

  //切换音乐播放状态
  musicToggle: function() {
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>' // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>' // 同上，但兩處均不建議更改
    if (sevene_musicPlaying) {
      document.querySelector("#nav-music").classList.remove("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      document.querySelector("#consoleMusic").classList.remove("on");
      sevene_musicPlaying = false;
    }else {
      document.querySelector("#nav-music").classList.add("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPause;
      document.querySelector("#consoleMusic").classList.add("on");
      sevene_musicPlaying = true;
    }
    document.querySelector('meting-js').aplayer.toggle();
    rm.hideRightMenu();
  },

  //音乐上一曲
  musicSkipBack: function() {
    document.querySelector('meting-js').aplayer.skipBack();
    rm.hideRightMenu();
  },

  //音乐下一曲
  musicSkipForward: function() {
    document.querySelector('meting-js').aplayer.skipForward();
    rm.hideRightMenu();
  },

  //获取音乐中的名称
  musicGetName: function() {
    var x = $('.aplayer-title')
		// var x = document.getElementsByClassName('txt');
		// for (var i = x.length - 1; i >= 0; i--) {
		// console.log(x[i].innerText)
		// }
		var arr = []
		for (var i = x.length - 1; i >= 0; i--) {
			arr[i] = x[i].innerText
			// console.log(x[i].innerText)
		}
		return arr[0]
  },

  //显示中控台
  showConsole: function() {
    document.querySelector("#console").classList.add("show");
    sevene.initConsoleState();
  },

  //隐藏中控台
  hideConsole: function() {
    document.querySelector("#console").classList.remove("show");
  },

  //快捷键功能开关
  keyboardToggle: function() {
    if (sevene_keyboard) {
      sevene_keyboard = false;
      document.querySelector("#consoleKeyboard").classList.remove("on");
      localStorage.setItem('keyboardToggle', 'false');
    }else {
      sevene_keyboard = true;
      document.querySelector("#consoleKeyboard").classList.add("on");
      localStorage.setItem('keyboardToggle', 'true');
    }
  },

  //滚动到指定id
  scrollTo:function(id){
    var domTop = document.querySelector(id).offsetTop;
    window.scrollTo(0,domTop - 80);
  },

  //隐藏侧边栏
  hideAsideBtn: () => { // Hide aside
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? saveToLocal.set('aside-status', 'show', 2)
      : saveToLocal.set('aside-status', 'hide', 2)
    $htmlDom.toggle('hide-aside')
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //初始化console图标
  initConsoleState: function() {
    //初始化隐藏边栏
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? document.querySelector("#consoleHideAside").classList.add("on")
      : document.querySelector("#consoleHideAside").classList.remove("on")
  },

  //删除多余的class
  removeBodyPaceClass: function() {
    $('body').removeClass()
    $('body').addClass('pace-done')
  },
  //photos相册墙
  // 函数
  photos: function () {
  fetch('https://memos.gmcj0816.top//api/memo?creatorId=1&tag=相册').then(res => res.json()).then(data => { // 记得修改memos地址
      let html='', imgs = [];
      data.data.forEach(item => { imgs = imgs.concat(item.content.match(/\!\[.*?\]\(.*?\)/g)) });
      imgs.forEach(item => {
          let img = item.replace(/!\[.*?\]\((.*?)\)/g, '$1'),
              time, title, tat = item.replace(/!\[(.*?)\]\(.*?\)/g, '$1');
          if (tat.indexOf(' ') != -1) {
              time = tat.split(' ')[0];
              title = tat.split(' ')[1];
          } else title = tat

          html += `<div class="gallery-photo"><a href="${img}" data-fancybox="gallery" class="fancybox" data-thumb="${img}"><img class="photo-img" loading='lazy' decoding="async" src="${img}"></a>`;
          title ? html += `<span class="photo-title">${title}</span>` : '';
          time ? html += `<span class="photo-time">${time}</span>` : '';
          html += `</div>`;
      });

      document.querySelector('.gallery-photos.page').innerHTML = html
      imgStatus.watch('.photo-img', () => { waterfall('.gallery-photos'); });
      window.Lately && Lately.init({ target: '.photo-time' });
  }).catch()
},
  //显示帧率
  FPSToggle: function() {
    if (sevene_showFPS) {
      sevene_showFPS = false;
      document.querySelector("#fps-group").classList.remove("show");
      document.querySelector("#consoleFPS").classList.remove("on");
      localStorage.setItem('showFPS', 'false');
    }else {
      sevene_showFPS = true;
      document.querySelector("#fps-group").classList.add("show");
      document.querySelector("#consoleFPS").classList.add("on");
      localStorage.setItem('showFPS', 'true');
    }
    
  },
  changeSayHelloText: function() {
    // 定义数组存储可选内容
    const contentArray = ['🤖️ 数码科技爱好者', '🔍 分享与热心帮助', '🏠 智能家居小能手', '🔨 设计开发一条龙', '🤝 专修交互与设计','🏃 脚踏实地行动派',"🧱 团队小组发动机","💢 壮汉人狠话不多"];
    // 获取要更改内容的元素
    const contentElement = document.getElementById('author-info__sayhi');
    // 从数组中随机选择一个新内容
    let newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
    // 如果新内容与上一个重复，重新选择
    while (newContent === lastSayHello) {
      newContent = contentArray[Math.floor(Math.random() * contentArray.length)];
    }
    // 将新内容赋值给元素的文本内容
    contentElement.textContent = newContent;

    // 更新上一个内容的变量
    lastSayHello = newContent;
  }
}