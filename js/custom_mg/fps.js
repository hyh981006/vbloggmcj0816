function whenDOMReady() {
    // pjax加载完成（切换页面）后需要执行的函数和代码
    newYear();
  }
  
  whenDOMReady() // 打开网站先执行一次
  document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次
  
  // whenDOMReady函数外放一些打开网站之后只需要执行一次的函数和代码，比如一些监听代码。
  // 监听代码只需要执行一次即可，不需要每次加载pjax都执行，会出现一些Bug。至于为什么，我也不知道，可以自己试一下。
let newYearTimer = null;
var newYear = () => {
    clearTimeout(newYearTimer);
    if (!document.querySelector('#newYear')) return;
    // 新年时间戳 and 星期对象
    let newYear = new Date('2023-01-22 00:00:00').getTime() / 1000,
        week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }

    time();

    // 补零函数
    function nol(h) { return h > 9 ? h : '0' + h; };

    function time() {
        // 现在 时间对象
        let now = new Date();

        // 右下角 今天
        document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]

        // 现在与新年相差秒数
        let second = newYear - Math.round(now.getTime() / 1000);

        // 小于0则表示已经过年
        if (second < 0) {
            document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
            document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
        } else {
            // 大于0则还未过年
            document.querySelector('#newYear .title').innerHTML = '距离2023年春节：'

            // 大于一天则直接渲染天数
            if (second > 86400) {
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
            } else {
                // 小于一天则使用时分秒计时。
                let h = nol(parseInt(second / 3600));
                second %= 3600;
                let m = nol(parseInt(second / 60));
                second %= 60;
                let s = nol(second);
                document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
                // 计时
                newYearTimer = setTimeout(time, 1000);
            }
        }
    }

    // 元宝飘落
    jQuery(document).ready(function($) {
        $('#newYear').wpSuperSnow({
            flakes: ['https://cdnimage.gmcj0816.top/yb3.webp', 'https://cdnimage.gmcj0816.top/yb2.webp', 'https://cdnimage.gmcj0816.top/yb3.webp'],
            totalFlakes: '100',
            zIndex: '999999',
            maxSize: '30',
            maxDuration: '20',
            useFlakeTrans: false
        });
    });
}

//document.onkeydown = function (e) {
//    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return btf.snackbarShow("别想了，我已经猜到了，已经禁用F12了🍕🍔"), event.keyCode = 0, event.returnValue = !1, !1
//};
// 切换热评
function switchCommentBarrage () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
  }
  if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            if (fps <= 5) {
                var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`
            } else if (fps <= 15) {
                var kd = `<span style="color:red">电竞级帧率😖</span>`
            } else if (fps <= 25) {
                var kd = `<span style="color:orange">有点难受😨</span>`
            } else if (fps < 35) {
                var kd = `<span style="color:#9338e6">不太流畅🙄</span>`
            } else if (fps <= 45) {
                var kd = `<span style="color:#08b7e4">还不错哦😁</span>`
            } else {
                var kd = `<span style="color:#39c5bb">十分流畅🤣</span>`
            }
            document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
} else {
    document.getElementById("fps").style = "display:none!important"
}



let heo_cookiesTime = null;
let heo_musicPlaying = false;
let heo_keyboard = false;
let heo_intype = false;
// 私有函数
var heo = {
  //隐藏今日推荐
  hideTodayCard: function() {
    if (document.getElementById("todayCard")) {
      document.getElementById("todayCard").classList.add('hide');
    }
  }
}


var fdata = {
	apiurl: "https://moments.jayhrn.com/",
	defaultFish: 100,
	hungryFish: 100
};
if ("undefined" != typeof fdataUser)
	for (let o in fdataUser) fdataUser[o] && (fdata[o] = fdataUser[o]);
var randomPostTimes = 0,
	randomPostWorking = !1,
	randomPostTips = ["钓到了绝世好文！", "在河边打了个喷嚏，吓跑了", "你和小伙伴抢夺着", "你击败了巨龙，在巢穴中发现了", "挖掘秦始皇坟时找到了", "在路边闲逛的时候随手买了一个", "从学校班主任那拿来了孩子上课偷偷看的", "你的同桌无情的从你的语文书中撕下了那篇你最喜欢的", "考古学家近日发现了", "外星人降临地球学习地球文化，落地时被你塞了", "从图书馆顶层的隐秘角落里发现了闪着金光的", "徒弟修炼走火入魔，为师立刻掏出了", "在大山中唱山歌，隔壁的阿妹跑来了，带着", "隔壁家的孩子数学考了满分，都是因为看了", "隔壁家的孩子英语考了满分，都是因为看了", "小米研发了全新一代MIX手机，据说灵感", "修炼渡劫成功，还好提前看了", "库克坐上了苹果CEO的宝座，因为他面试的时候看了", "阿里巴巴大喊芝麻开门，映入眼帘的就是", "师傅说练武要先炼心，然后让我好生研读", "科考队在南极大陆发现了被冰封的", "飞机窗户似乎被一张纸糊上了，仔细一看是", "历史上满写的仁义道德四个字，透过字缝里却全是", "十几年前的录音机似乎还能够使用，插上电发现正在播的是", "新版语文书拟增加一篇熟读并背诵的", "经调查，99%的受访者都没有背诵过", "今年的高考满分作文是", "唐僧揭开了佛祖压在五指山上的", "科学家发现能够解决衰老的秘密，就是每日研读", "英特尔发布了全新的至强处理器，其芯片的制造原理都是", "新的iPhone产能很足，新的进货渠道是", "今年亩产突破了八千万斤，多亏了", "陆隐一统天上宗，在无数祖境高手的目光下宣读了", "黑钻风跟白钻风说道，吃了唐僧肉能长生不老，他知道是因为看了", "上卫生间没带纸，直接提裤跑路也不愿意玷污手中", "种下一篇文章就会产生很多很多文章，我种下了", "三十年河东，三十年河西，莫欺我没有看过", "踏破铁血无觅处，得来全靠", "今日双色球中了两千万，预测全靠", "因为卷子上没写名字，老师罚抄", "为了抗议世间的不公，割破手指写下了", "在艺术大街上被贴满了相同的纸，走近一看是", "这区区迷阵岂能难得住我？其实能走出来多亏了", "今日被一篇文章顶上了微博热搜，它是", "你送给乞丐一个暴富秘籍，它是", "UZI一个走A拿下五杀，在事后采访时说他当时回想起了", "科学家解刨了第一个感染丧尸病毒的人，发现丧尸抗体存在于", "如果你有梦想的话，就要努力去看", "决定我们成为什么样人的，不是我们的能力，而是是否看过", "有信心不一定会成功，没信心就去看", "你真正是谁并不重要，重要的是你看没看过", "玄天境重要的是锻体，为师赠你此书，好好修炼去吧，这是", "上百祖境高手在天威湖大战三天三夜为了抢夺", "这化仙池水乃上古真仙对后人的考校，要求熟读并背诵", "庆氏三千年根基差点竟被你小子毁于一旦，能够被我拯救全是因为我看了", "我就是神奇宝贝大师！我这只皮卡丘可是", "我就是神奇宝贝大师！我这只小火龙可是", "我就是神奇宝贝大师！我这只可达鸭可是", "我就是神奇宝贝大师！我这只杰尼龟可是", "上古遗迹中写道，只要习得此书，便得成功。你定睛一看，原来是", "奶奶的，玩阴的是吧，我就是双料特工代号穿山甲，", "你的背景太假了，我的就逼真多了，学到这个技术全是因为看了", "我是云南的，云南怒江的，怒江芦水市，芦水市六库，六库傈僳族，傈僳族是", "我真的栓Q了，我真的会谢如果你看", "你已经习得退退退神功，接下来的心法已经被记录在", "人生无常大肠包小肠，小肠包住了", "你抽到了普通文章，它是", "你收到了稀有文章，它是", "你抽到了金色普通文章，它是", "你抽到了金色稀有文章，它是", "你抽到了传说文章！它是", "哇！金色传说！你抽到了金色传说文章，它是", "报告！侦察兵说在前往300米有一个男子在偷偷看一本书，上面赫然写着", "芷莲姑娘大摆擂台，谁若是能读完此书，便可娶了她。然后从背后掏出了", "请问你的梦想是什么？我的梦想是能读到", "读什么才能增智慧？当然是读", "纳兰嫣然掏出了退婚书，可是发现出门带错了，结果拿出了一本", "你要尽全力保护你的梦想。那些嘲笑你的人，他们必定会失败，他们想把你变成和他们一样的人。如果你有梦想的话，就要努力去读", "走人生的路就像爬山一样，看起来走了许多冤枉的路，崎岖的路，但终究需要读完", "游戏的规则就是这么的简单，你听懂了吗？管你听没听懂，快去看"],
	randomPostClick = 0;

function fetchRandomPost() {
	if (!1 === randomPostWorking) {
		randomPostWorking = !0;
		let o = randomPostTips[Math.floor(Math.random() * randomPostTips.length)],
			t = "";
		t = randomPostTimes > 1e4 ? "愿者上钩" : randomPostTimes > 1e3 ? "俯览天下" : randomPostTimes > 1e3 ? "超越神了" : randomPostTimes > 100 ? "绝世渔夫" : randomPostTimes > 75 ? "钓鱼王者" : randomPostTimes > 50 ? "钓鱼宗师" : randomPostTimes > 20 ? "钓鱼专家" : randomPostTimes > 5 ? "钓鱼高手" : "钓鱼新手", document.getElementById("random-post")
			.innerHTML = randomPostTimes >= 5 ? "钓鱼中... （Lv." + randomPostTimes + " 当前称号：" + t + "）" : "钓鱼中...";
		let n = randomNum(1e3, 3e3);
		if (0 === randomPostTimes && (n = 0), $(".random-post-start")
			.css("opacity", "0.2"), randomPostClick * fdata.hungryFish + fdata.defaultFish < randomPostTimes && 0 === Math.round(Math.random())) document.getElementById("random-post")
			.innerHTML = "因为只钓鱼不吃鱼，过分饥饿导致本次钓鱼失败...(点击任意一篇钓鱼获得的文章即可恢复）", randomPostWorking = !1;
		else {
			let t = fdata.apiurl + "randompost";
			fetch(t)
				.then((o => o.json()))
				.then((t => {
					let a = t.title,
						s = t.link,
						r = t.author;
					document.querySelector("#random-post") && window.setTimeout((function() {
						document.getElementById("random-post")
							.innerHTML = o + "来自友链 <b>" + r + '</b> 的文章：<a class="random-friends-post" onclick="randomClickLink()" target="_blank" href="' + s + '" rel="external nofollow">' + a + "</a>", randomPostTimes += 1, localStorage.setItem("randomPostTimes", randomPostTimes), $(".random-post-start")
							.css("opacity", "1")
					}), n)
				})), randomPostWorking = !1
		}
	}
}

function initRandomPost() {
	localStorage.randomPostTimes && (randomPostTimes = parseInt(localStorage.randomPostTimes), randomPostClick = parseInt(localStorage.randomPostClick), $(".random-post-start")
		.css("transition-duration", "0.3s"), $(".random-post-start")
		.css("transform", "rotate(" + 360 * randomPostTimes + "deg)")), fetchRandomPost()
}

function randomClickLink() {
	randomPostClick += 1, localStorage.setItem("randomPostClick", randomPostClick)
}

function randomNum(o, t) {
	return 1 === arguments.length ? parseInt(Math.random() * o + 1, 10) : 2 === arguments.length ? parseInt(Math.random() * (t - o + 1) + o, 10) : 0
}
initRandomPost();


