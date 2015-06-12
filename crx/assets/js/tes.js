! function(t) {
	if (t) {
		var e = t.AMUI.iScroll;
		if (e) {
			var i = "localStorage" in window && window.localStorage && window.localStorage,
				o = ["accordion", "divider", "duoshuo", "figure", "footer", "gallery", "gotop", "header", "intro", "list_news", "map", "mechat", "menu", "navbar", "pagination", "paragraph", "slider", "tabs", "titlebar", "wechatpay"],
				n = function() {
					var n = t("body"),
						s = t(".widget-hd"),
						a = t("#demo-scroller"),
						c = t("#widget-list");
					this.compile = Handlebars.compile(t("#tpl-demo-list").html()), this.cache = {}, this.demoScroll = null, this.render = function(t, e) {
						return this.cache[t] || (this.cache[t] = this.compile(e)), this.cache[t]
					}, this.createList = function(e) {
						e = e || this.getHash();
						var n = this,
							a = "__amui_widget_" + e + "_demos";
						return e && s.find("h1").text(c.find("[data-rel=" + e + "]").text() + "Demos"), i && i.getItem(a) ? this.setActive(e, JSON.parse(i.getItem(a))) : !e || o.indexOf(e) < 0 ? this.resetActive() : void t.ajax({
							type: "GET",
							url: "/widgets/" + e + "?json=1",
							dataType: "json",
							success: function(t) {
								i.setItem(a, JSON.stringify(t)), n.setActive(e, t)
							},
							error: function(t, e) {
								alert("Ajax error")
							}
						})
					}, this.setActive = function(i, o) {
						a.empty().html(this.render(i, o)), n.addClass("demo-list-active"), this.demoScroll || (this.demoScroll = new e("#demo-list", {
							click: !0
						})), setTimeout(t.proxy(function() {
							this.demoScroll.refresh()
						}, this), 100)
					}, this.resetActive = function() {
						n.removeClass("demo-list-active")
					}, this.getHash = function() {
						return window.location.hash.replace("#", "")
					}, this.init = function() {
						c.on("click", "a", function(e) {
							e.preventDefault(), window.location.hash = t(this).attr("data-rel")
						}), t(window).on("hashchange", t.proxy(function() {
							this.createList()
						}, this)), t("#btn-back").on("click", function(t) {
							t.preventDefault(), window.location.hash = ""
						}), c.on("touchmove", function(t) {
							t.preventDefault()
						}), this.createList()
					}, this.init(), this.mainScroll = new e(c[0])
				};
			t(function() {
				new n
			})
		}
	}
}(window.jQuery || window.Zepto);