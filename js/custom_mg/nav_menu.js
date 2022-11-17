function addFriendLink() {
  var input = document.getElementsByClassName('el-textarea__inner')[0];
  let evt = document.createEvent('HTMLEvents');
  evt.initEvent('input', true, true);
  input.value = '昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n';
  input.dispatchEvent(evt);
  heo.scrollTo("#post-comment");
  input.focus();
  input.setSelectionRange(-1, -1);
}
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
    fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
        let ls = data.querySelectorAll('url loc');
        while (true) {
            let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
            if (location.href == url) continue;
            location.href = url;
            return;
        }
    })
}
// 阅读文章时看了一遍写的代码，发现加个数组和一个遍历完全没必要，改成下面这个即可。
// function randomPost() {
//     fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
//         let ls = data.querySelectorAll('url loc');
//         location.href = ls[Math.floor(Math.random() * ls.length)].innerHTML
//     })
// }
// 旧代码
// function randomPost() {
    // fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    //     let ls = data.querySelectorAll('url loc');
    //     let list = [];
    //     ls.forEach(i => list.push(i.innerHTML))
    //     location.href = list[Math.floor(Math.random() * ls.length)]
    // })
// }
if (window.console) {
    Function.prototype.makeMulti = function () {
      let l = new String(this);
      l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"));
      return l;
    };
    let string = function () {
      /*
    _________                                  _________ __            .___.__        
 /   _____/ _______  __ ____   ____   ____  /   _____//  |_ __ __  __| _/|__| ____  
 \_____  \_/ __ \  \/ // __ \ /    \_/ __ \ \_____  \\   __\  |  \/ __ | |  |/  _ \ 
 /        \  ___/\   /\  ___/|   |  \  ___/ /        \|  | |  |  / /_/ | |  (  <_> )
/_______  /\___  >\_/  \___  >___|  /\___  >_______  /|__| |____/\____ | |__|\____/ 
        \/     \/          \/     \/     \/        \/                 \/            
      */
    };
    console.log(string.makeMulti());
    console.log("欢迎访问%cSevene's Blog", "color:#1fc7b6;font-weight:bold");
    console.log("%c如果你喜欢上了本站某个样式的话，尽管借鉴即可。", "color:#1fc7b6;font-weight:bold");
    console.log("%c让我们一起学习进步，如果有什么不解可以给我留言。", "color:#1fc7b6;font-weight:bold");
    console.log("%c但是请不要恶意攻击本站哦~在此先行谢过了，请你吃糖🍭🍭🍭", "color:#1fc7b6;font-weight:bold");
  }