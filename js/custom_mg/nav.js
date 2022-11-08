"" === GLOBAL_CONFIG_SITE.title.replace("SEVENE", "") ? document.getElementById("page-name-text")
	.style.display = "none" : document.querySelector("#page-name-text>span")
	.innerHTML = document.title.split(" | SEVENE")[0];