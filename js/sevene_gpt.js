let heoGPTIsRunning = !1
  , heo_aiPostExplanation = ""
  , heoGPTModel = "HrnGPT"
  , aiTalkMode = !1;
var heoGPT = {
    aiExplanation: async function() {
        const e = document.querySelector(".ai-explanation");
        if (!e)
            return;
        localStorage.setItem("heo_aiPostExplanation", e.innerText),
        "" === heo_aiPostExplanation && (heo_aiPostExplanation = e.innerText);
        const n = heoGPT.synonymReplace(heo_aiPostExplanation);
        heoGPT.aiShowAnimation(Promise.resolve(n))
    },
    loadHeogpt: async function() {
        if (null === heogpt) {
            const e = await fetch("/json/hrngpt.json");
            heogpt = await e.json()
        }
    },
    getTitleAndContent: function() {
        const e = document.title
          , n = document.getElementById("article-container")
          , t = n.getElementsByTagName("p")
          , o = n.querySelectorAll("h1, h2, h3, h4, h5");
        let i = "";
        for (let e of o)
            i += e.innerText + " ";
        for (let e of t)
            i += e.innerText.replace(/https?:\/\/[^\s]+/g, "");
        const a = (e + " " + i).slice(0, 1e3);
        return console.log("hrn的:" + a),
        a
    },
    fetchTianliGPT: async function(e, n) {
        const t = `https://summary.tianli0.top/?content=${encodeURIComponent(e)}&key=${encodeURIComponent(n)}`;
        try {
            const e = new AbortController
              , n = (setTimeout((()=>e.abort()), 2e4),
            await fetch(t, {
                signal: e.signal
            }));
            if (n.ok)
                return (await n.json()).summary;
            throw Error("请求失败")
        } catch (e) {
            return "AbortError" === e.name ? console.error("请求超时") : console.error("请求失败：", e),
            "获取文章摘要超时。当你出现这个问题时，可能是因为文章过长导致的AI运算量过大， 您可以稍等一下然后重新切换到TianliGPT模式，或者尝试使用HrnGPT模式。"
        }
    },
    tianliGPTGenerate: async function() {
        const e = heoGPT.fetchTianliGPT(heoGPT.getTitleAndContent(), "nqj8h3lkLIHSwUG4IWbR");
        heoGPT.aiShowAnimation(e)
    },
    toggleGPTModel: function() {
        if (heoGPTIsRunning)
            return;
        const e = document.getElementById("ai-tag");
        "TianliGPT" === heoGPTModel ? (heoGPTModel = "HrnGPT",
        heoGPT.aiShowAnimation(Promise.resolve(heo_aiPostExplanation)),
        e.innerText = "HrnGPT") : (heoGPTModel = "TianliGPT",
        heoGPT.tianliGPTGenerate(),
        e.innerText = "TianliGPT")
    },
    aiShowAnimation: function(e) {
        const n = document.querySelector(".ai-explanation");
        if (!n)
            return;
        if (heoGPTIsRunning)
            return;
        heoGPT.cleanSuggestions(),
        heoGPTIsRunning = !0,
        n.style.display = "block",
        n.innerHTML = '生成中...<span class="blinking-cursor"></span>';
        let t = !1
          , o = 0
          , i = !0;
        e.then((e=>{
            let a = performance.now();
            function r() {
                if (o < e.length && t) {
                    const t = performance.now()
                      , i = t - a
                      , l = e.slice(o, o + 1);
                    i >= (/[，。！、？,.!?]/.test(l) ? 150 : 25) && (n.innerText = e.slice(0, o + 1),
                    a = t,
                    o++,
                    o < e.length ? n.innerHTML = e.slice(0, o) + '<span class="blinking-cursor"></span>' : (n.innerHTML = e,
                    n.style.display = "block",
                    heoGPT.createSuggestions(),
                    heoGPTIsRunning = !1)),
                    requestAnimationFrame(r)
                }
            }
            function l() {
                !function(e) {
                    const n = e.getBoundingClientRect();
                    return n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || document.documentElement.clientHeight) && n.right <= (window.innerWidth || document.documentElement.clientWidth)
                }(n) ? t = !1 : t || (t = !0,
                i ? setTimeout((()=>{
                    r(),
                    i = !1
                }
                ), 2e3) : r())
            }
            window.addEventListener("scroll", l),
            window.addEventListener("resize", l);
            const s = setInterval(l, 500);
            heoGPTIsRunning || clearInterval(s),
            l()
        }
        )).catch((e=>{
            console.error("获取信息失败:", e),
            n.innerHTML = "获取信息失败",
            n.style.display = "block",
            heoGPTIsRunning = !1
        }
        ))
    },
    synonymReplace: async function(e) {
        await heoGPT.loadHeogpt();
        const n = Object.keys(heogpt);
        for (let t = 0; t < n.length; t++) {
            const o = n[t]
              , i = heogpt[o]
              , a = RegExp(o, "gi");
            e = e.replace(a, (()=>{
                const e = Math.floor(Math.random() * i.length);
                return i[e]
            }
            ))
        }
        return e
    },
    recommendList: function() {
        const e = document.querySelector(".ai-explanation");
        let n = " 推荐文章：<br />"
          , t = document.querySelectorAll(".card-recommend-post .aside-list .aside-list-item .thumbnail");
        t && 0 !== t.length || (t = document.querySelectorAll(".card-recent-post .aside-list .aside-list-item .thumbnail")),
        n += '<div class="ai-recommend">',
        t.forEach(((e,t)=>{
            n += `<div class="ai-recommend-item"></span><a id="ai-recent-a" href="javascript:;" onclick="pjax.loadUrl('${e.href}')" title="${e.title}" data-pjax-state="">${e.title}</a></div>`
        }
        )),
        n += "</div>",
        e.innerHTML = n
    },
    createSuggestionItemWithAction: function(e, n) {
        const t = document.querySelector(".ai-suggestions");
        if (!t)
            return void console.error("无法找到具有class为ai-suggestions的元素");
        const o = document.createElement("div");
        o.classList.add("ai-suggestions-item"),
        o.textContent = e,
        o.addEventListener("click", (()=>{
            n()
        }
        )),
        t.appendChild(o)
    },
    cleanSuggestions: function() {
        const e = document.querySelector(".ai-suggestions");
        e ? e.innerHTML = "" : console.error("无法找到具有class为ai-suggestions的元素")
    },
    createSuggestions: function() {
        function e() {
            window.open("https://blog.zhheo.com/p/ec57d8b2.html", "_blank")
        }
        aiTalkMode && (heoGPT.cleanSuggestions(),
        "HrnGPT" === heoGPTModel ? (heoGPT.createSuggestionItemWithAction("谁是满心Hrn？", (()=>{
            heoGPT.aiShowAnimation(Promise.resolve("满心Hrn 是一位软件项目经理，他的主要职业是需求分析、架构设计，重难点攻克，把控整体进度。他的GitHub主页上有一些他的开源项目。此外，他还开发了一个名为“akilar”的hexo主题，该主题仿akilar太空舱主题，目前也是正在迭代开发中。如果您想了解更多关于满心Hrn的信息，可以访问他的个人网站或博客。"))
        }
        )),
        heoGPT.createSuggestionItemWithAction("推荐一些相关的文章", (()=>heoGPT.recommendList())),
        heoGPT.createSuggestionItemWithAction("显示文章摘要", (()=>{
            heoGPT.aiShowAnimation(Promise.resolve(localStorage.getItem("heo_aiPostExplanation")))
        }
        )),
        heoGPT.createSuggestionItemWithAction("我也想给我的博客安装一个AI摘要", (()=>e()))) : "TianliGPT" === heoGPTModel && (heoGPT.createSuggestionItemWithAction("我也想给我的博客安装一个AI摘要", (()=>e())),
        heoGPT.createSuggestionItemWithAction("前往Tianli博客", (()=>{
            window.open("https://tianli-blog.club/", "_blank")
        }
        ))))
    }
};
function AIEngine() {
    const e = document.querySelector(".ai-tag");
    e && e.addEventListener("click", (()=>{
        heoGPTIsRunning || (aiTalkMode = !0,
        "HrnGPT" === heoGPTModel ? heoGPTTalkMode() : tianliGPTTalkMode())
    }
    ))
}
function addAIToggleListener() {
    const e = document.querySelector("#ai-Toggle");
    e && e.addEventListener("click", (()=>{
        heoGPT.toggleGPTModel()
    }
    ))
}
function heoGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && heoGPT.aiShowAnimation(Promise.resolve("我是满心Hrn的摘要生成助理HrnGPT，是一个基于GPT-4与HrnCorrection的混合语言模型。我在这里只负责摘要的预生成和显示，你无法与我直接沟通，但我可以回答一些预设的问题。"))
}
function tianliGPTTalkMode() {
    document.querySelectorAll(".ai-suggestions") && heoGPT.aiShowAnimation(Promise.resolve("你好，我是Tianli开发的摘要生成助理TianliGPT，是一个基于GPT-3.5的生成式AI。我在这里只负责摘要的实时生成和显示，你无法与我直接沟通，如果你也需要一个这样的AI摘要接口，可以在下方查看部署教程。"))
}
