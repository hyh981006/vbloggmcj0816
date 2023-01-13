function insertAtCursor(myField, myValue) {

    //IE 浏览器
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        sel.select();
    }

    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        // 保存滚动条
        var restoreTop = myField.scrollTop;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        if (restoreTop > 0) {
            myField.scrollTop = restoreTop;
        }

        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top', x + 'px').css('left', y + 'px');

    if (isTrue) {
        $rightMenu.show();
    } else {
        $rightMenu.hide();
    }
}
rmf.switchDarkMode = function () {
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
rmf.copyWordsLink = function () {
    let url = window.location.href
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa)
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    Swal.fire("复制成功！");
}
rmf.switchReadMode = function () {
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn() {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
    document.execCommand('Copy', false, null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function () {
    btf.scrollToDest(0, 500);
}
rmf.translate = function () {
    document.getElementById("translateLink").click();
}

// 右键菜单事件
document.onkeydown = function (event) {
    event = (event || window.event);
    if (event.keyCode == 17) {
        console.log("你知道的太多了");
        return;
    }
}

function popupMenu() {
    //window.oncontextmenu=function(){return false;}
    window.oncontextmenu = function (event) {
        if(event.ctrlKey)return true;
        console.log(event.keyCode)
        $('.rightMenu-group.hide').hide();
        //如果有文字选中，则显示 文字选中相关的菜单项
        if (document.getSelection().toString()) {
            $('#menu-text').show();
        }
        if (document.getElementById('post')) {
            $('#menu-post').show();
        } else {
            if (document.getElementById('page')) {
                $('#menu-post').show();
            }
        }
        var el = window.document.body;
        el = event.target;
        var a=/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
        if (a.test(window.getSelection().toString())){
            $('#menu-too').show()
        }
        if (el.tagName == 'A') {
            $('#menu-to').show()
            rmf.open = function () {
                location.href = el.href
            }
            rmf.openWithNewTab = function () {
                window.open(el.href);
            }
            rmf.copyLink = function () {
                let url = el.href
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        }
        if (el.tagName == 'IMG') {
            $('#menu-img').show()
            rmf.openWithNewTab = function () {
                window.open(el.src);
            }
            rmf.click = function () {
                el.click()
            }
            rmf.copyLink = function () {
                let url = el.src
                let txa = document.createElement("textarea");
                txa.value = url;
                document.body.appendChild(txa)
                txa.select();
                document.execCommand("Copy");
                document.body.removeChild(txa);
            }
        } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
            $('#menu-paste').show();
            rmf.paste = function () {
                navigator.permissions
                    .query({
                        name: 'clipboard-read'
                    })
                    .then(result => {
                        if (result.state == 'granted' || result.state == 'prompt') {
                            //读取剪贴板
                            navigator.clipboard.readText().then(text => {
                                console.log(text)
                                insertAtCursor(el, text)
                            })
                        } else {
                            alert('请允许读取剪贴板！')
                        }
                    })
            }
        }
        let pageX = event.clientX + 10;
        let pageY = event.clientY;
        let rmWidth = $('#rightMenu').width();
        let rmHeight = $('#rightMenu').height();
        if (pageX + rmWidth > window.innerWidth) {
            pageX -= rmWidth + 10;
        }
        if (pageY + rmHeight > window.innerHeight) {
            pageY -= pageY + rmHeight - window.innerHeight;
        }



        rmf.showRightMenu(true, pageY, pageX);
        return false;
    };

    window.addEventListener('click', function () {
        rmf.showRightMenu(false);
    });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
    let timer = 0 // 初始化timer

    target.ontouchstart = () => {
        timer = 0 // 重置timer
        timer = setTimeout(() => {
            callback();
            timer = 0
        }, 380) // 超时器能成功执行，说明是长按
    }

    target.ontouchmove = () => {
        clearTimeout(timer) // 如果来到这里，说明是滑动
        timer = 0
    }

    target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
        if (timer) {
            clearTimeout(timer)
        }
    }
}

addLongtabListener(box, popupMenu)
var rm = {};
rm.stopdragimg = $("img"), rm.stopdragimg.on("dragstart", (function() {
	return !1
})), rm.showRightMenu = function(e, n = 0, t = 0) {
	let o = $("#rightMenu");
	o.css("top", n + "px")
		.css("left", t + "px"), e ? (o.show(), stopMaskScroll()) : o.hide()
}, rm.hideRightMenu = function() {
	rm.showRightMenu(!1), $("#rightmenu-mask")
		.attr("style", "display: none")
};
var rmWidth = $("#rightMenu")
	.width(),
	rmHeight = $("#rightMenu")
	.height();
rm.reloadrmSize = function() {
	rmWidth = $("#rightMenu")
		.width(), rmHeight = $("#rightMenu")
		.height()
};
var domhref = "",
	domImgSrc = "",
	globalEvent = null;

function imageToBlob(e) {
	const n = new Image,
		t = document.createElement("canvas"),
		o = t.getContext("2d");
	return n.crossOrigin = "", n.src = e, new Promise((e => {
		n.onload = function() {
			t.width = this.naturalWidth, t.height = this.naturalHeight, o.drawImage(this, 0, 0), t.toBlob((n => {
				e(n)
			}), "image/png", .75)
		}
	}))
}
async function copyImage(e) {
	const n = await imageToBlob(e),
		t = new ClipboardItem({
			"image/png": n
		});
	navigator.clipboard.write([t])
}

function stopMaskScroll() {
	if (document.getElementById("rightmenu-mask")) {
		document.getElementById("rightmenu-mask")
			.addEventListener("mousewheel", (function(e) {
				rm.hideRightMenu()
			}), !1)
	}
	if (document.getElementById("rightMenu")) {
		document.getElementById("rightMenu")
			.addEventListener("mousewheel", (function(e) {
				rm.hideRightMenu()
			}), !1)
	}
}
window.oncontextmenu = function(e) {
	if (document.body.clientWidth > 768) {
		let n = e.clientX + 10,
			t = e.clientY,
			o = $(".rightMenuOther"),
			i = $(".rightMenuPlugin"),
			c = $("#menu-copytext"),
			r = $("#menu-pastetext"),
			m = $("#menu-commenttext"),
			a = $("#menu-newwindow"),
			u = $("#menu-copylink"),
			l = $("#menu-copyimg"),
			d = $("#menu-downloadimg"),
			h = $("#menu-search"),
			s = $("#menu-searchBaidu"),
			g = $("#menu-music-toggle"),
			w = $("#menu-music-back"),
			p = $("#menu-music-forward"),
			f = $("#menu-music-playlist"),
			y = $("#menu-music-copyMusicName"),
			k = e.target.href,
			M = e.target.currentSrc,
			x = !1;
		return o.show(), globalEvent = e, selectTextNow && window.getSelection() ? (x = !0, c.show(), m.show(), h.show(), s.show()) : (c.hide(), m.hide(), s.hide(), h.hide()), k ? (x = !0, a.show(), u.show(), domhref = k) : (a.hide(), u.hide()), M ? (x = !0, l.show(), d.show(), domImgSrc = M) : (l.hide(), d.hide()), "input" === e.target.tagName.toLowerCase() || "textarea" === e.target.tagName.toLowerCase() ? (console.log("这是一个输入框"), x = !0, r.show()) : r.hide(), "METING-JS" === e.target.nodeName ? (console.log("这是一个音乐"), x = !0, g.show(), w.show(), p.show(), f.show(), y.show()) : (g.hide(), w.hide(), p.hide(), f.hide(), y.hide()), x ? (o.hide(), i.show()) : i.hide(), rm.reloadrmSize(), n + rmWidth > window.innerWidth && (n -= rmWidth + 10), t + rmHeight > window.innerHeight && (t -= t + rmHeight - window.innerHeight), rm.showRightMenu(!0, t, n), $("#rightmenu-mask")
			.attr("style", "display: flex"), !1
	}
}, rm.downloadimging = !1, rm.writeClipImg = function(e) {
	console.log("按下复制"), rm.hideRightMenu(), btf.snackbarShow("正在下载中，请稍后", !1, 1e4), !1 === rm.downloadimging && (rm.downloadimging = !0, setTimeout((function() {
		copyImage(e), btf.snackbarShow("复制成功！图片已添加盲水印，请遵守版权协议"), rm.downloadimging = !1
	}), "10000"))
}, rm.switchDarkMode = function() {
	navFn.switchDarkMode(), rm.hideRightMenu(), Jay.darkModeStatus()
}, rm.copyUrl = function(e) {
	$("body")
		.after("<input id='copyVal'></input>");
	let n = e,
		t = document.getElementById("copyVal");
	t.value = n, t.select(), t.setSelectionRange(0, t.value.length), document.execCommand("copy"), $("#copyVal")
		.remove()
}, rm.rightmenuCopyText = function(e) {
	navigator.clipboard && navigator.clipboard.writeText(e), rm.hideRightMenu()
}, rm.copyPageUrl = function() {
	let e = window.location.href;
	rm.copyUrl(e), btf.snackbarShow("复制本页链接地址成功", !1, 2e3), rm.hideRightMenu()
}, rm.sharePage = function() {
	window.location.href;
	rm.copyUrl(url), btf.snackbarShow("复制本页链接地址成功", !1, 2e3), rm.hideRightMenu()
};
var selectTextNow = "";

function selceText() {
	let e;
	e = document.selection ? document.selection.createRange()
		.text : window.getSelection() + "", selectTextNow = e || ""
}

function replaceAll(e, n, t) {
	return e.split(n)
		.join(t)
}


document.onmouseup = document.ondbclick = selceText, rm.readClipboard = function() {
	navigator.clipboard && navigator.clipboard.readText()
		.then((e => rm.insertAtCaret(globalEvent.target, e)))
}, rm.insertAtCaret = function(e, n) {
	const t = e.selectionStart,
		o = e.selectionEnd;
	if (document.selection) {
		e.focus(), document.selection.createRange()
			.text = n, e.focus()
	} else if (t || "0" === t) {
		let i = e.scrollTop;
		e.value = e.value.substring(0, t) + n + e.value.substring(o, e.value.length), e.focus(), e.selectionStart = t + n.length, e.selectionEnd = t + n.length, e.scrollTop = i
	} else e.value += n, e.focus()
}, rm.pasteText = function() {
	rm.readClipboard();
	rm.hideRightMenu()
}, rm.rightMenuCommentText = function(e) {
	rm.hideRightMenu();
	let n = document.getElementsByClassName("el-textarea__inner")[0],
		t = document.createEvent("HTMLEvents");
	t.initEvent("input", !0, !0);
	let o = replaceAll(e, "\n", "\n> ");
	n.value = "> " + o + "\n\n", n.dispatchEvent(t);
	let i = document.querySelector("#post-comment")
		.offsetTop;
	window.scrollTo(0, i - 80), n.focus(), n.setSelectionRange(-1, -1), document.getElementById("comment-tips") && document.getElementById("comment-tips")
		.classList.add("show")
}, rm.searchBaidu = function() {
	btf.snackbarShow("即将跳转到百度搜索", !1, 2e3), setTimeout((function() {
		window.open("https://www.baidu.com/s?wd=" + selectTextNow)
	}), "2000"), rm.hideRightMenu()
}, rm.copyLink = function() {
	rm.rightmenuCopyText(domhref), btf.snackbarShow("已复制链接地址")
};