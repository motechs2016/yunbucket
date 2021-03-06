(function (e, t, n) {
    (function (e) {
        if (typeof define === "function" && define.amd) {
            define(["jquery"], e)
        } else if (jQuery && !jQuery.fn.sparkline) {
            e(jQuery)
        }
    })(function (r) {
        "use strict";
        var i = {}, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j = 0;
        s = function () {
            return{common: {type: "line", lineColor: "#00f", fillColor: "#cdf", defaultPixelsPerValue: 3, width: "auto", height: "auto", composite: false, tagValuesAttribute: "values", tagOptionsPrefix: "spark", enableTagOptions: false, enableHighlight: true, highlightLighten: 1.4, tooltipSkipNull: true, tooltipPrefix: "", tooltipSuffix: "", disableHiddenCheck: false, numberFormatter: false, numberDigitGroupCount: 3, numberDigitGroupSep: ",", numberDecimalMark: ".", disableTooltips: false, disableInteraction: false}, line: {spotColor: "#f80", highlightSpotColor: "#5f5", highlightLineColor: "#f22", spotRadius: 1.5, minSpotColor: "#f80", maxSpotColor: "#f80", lineWidth: 1, normalRangeMin: n, normalRangeMax: n, normalRangeColor: "#ccc", drawNormalOnTop: false, chartRangeMin: n, chartRangeMax: n, chartRangeMinX: n, chartRangeMaxX: n, tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')}, bar: {barColor: "#3366cc", negBarColor: "#f44", stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"], zeroColor: n, nullColor: n, zeroAxis: true, barWidth: 4, barSpacing: 1, chartRangeMax: n, chartRangeMin: n, chartRangeClip: false, colorMap: n, tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')}, tristate: {barWidth: 4, barSpacing: 1, posBarColor: "#6f6", negBarColor: "#f44", zeroBarColor: "#999", colorMap: {}, tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{value:map}}'), tooltipValueLookups: {map: {"-1": "Loss", 0: "Draw", 1: "Win"}}}, discrete: {lineHeight: "auto", thresholdColor: n, thresholdValue: 0, chartRangeMax: n, chartRangeMin: n, chartRangeClip: false, tooltipFormat: new u("{{prefix}}{{value}}{{suffix}}")}, bullet: {targetColor: "#f33", targetWidth: 3, performanceColor: "#33f", rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"], base: n, tooltipFormat: new u("{{fieldkey:fields}} - {{value}}"), tooltipValueLookups: {fields: {r: "Range", p: "Performance", t: "Target"}}}, pie: {offset: 0, sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"], borderWidth: 0, borderColor: "#000", tooltipFormat: new u('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')}, box: {raw: false, boxLineColor: "#000", boxFillColor: "#cdf", whiskerColor: "#000", outlierLineColor: "#333", outlierFillColor: "#fff", medianColor: "#f00", showOutliers: true, outlierIQR: 1.5, spotRadius: 1.5, target: n, targetColor: "#4a2", chartRangeMax: n, chartRangeMin: n, tooltipFormat: new u("{{field:fields}}: {{value}}"), tooltipFormatFieldlistKey: "field", tooltipValueLookups: {fields: {lq: "Lower Quartile", med: "Median", uq: "Upper Quartile", lo: "Left Outlier", ro: "Right Outlier", lw: "Left Whisker", rw: "Right Whisker"}}}}
        };
        O = ".jqstooltip { " + "position: absolute;" + "left: 0px;" + "top: 0px;" + "visibility: hidden;" + "background: rgb(0, 0, 0) transparent;" + "background-color: rgba(0,0,0,0.6);" + "filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);" + '-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";' + "color: white;" + "font: 10px arial, san serif;" + "text-align: left;" + "white-space: nowrap;" + "padding: 5px;" + "border: 1px solid white;" + "z-index: 10000;" + "}" + ".jqsfield { " + "color: white;" + "font: 10px arial, san serif;" + "text-align: left;" + "}";
        o = function () {
            var e, t;
            e = function () {
                this.init.apply(this, arguments)
            };
            if (arguments.length > 1) {
                if (arguments[0]) {
                    e.prototype = r.extend(new arguments[0], arguments[arguments.length - 1]);
                    e._super = arguments[0].prototype
                } else {
                    e.prototype = arguments[arguments.length - 1]
                }
                if (arguments.length > 2) {
                    t = Array.prototype.slice.call(arguments, 1, -1);
                    t.unshift(e.prototype);
                    r.extend.apply(r, t)
                }
            } else {
                e.prototype = arguments[0]
            }
            e.prototype.cls = e;
            return e
        };
        r.SPFormatClass = u = o({fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g, precre: /(\w+)\.(\d+)/, init: function (e, t) {
            this.format = e;
            this.fclass = t
        }, render: function (e, t, r) {
            var i = this, s = e, o, u, a, f, l;
            return this.format.replace(this.fre, function () {
                var e;
                u = arguments[1];
                a = arguments[3];
                o = i.precre.exec(u);
                if (o) {
                    l = o[2];
                    u = o[1]
                } else {
                    l = false
                }
                f = s[u];
                if (f === n) {
                    return""
                }
                if (a && t && t[a]) {
                    e = t[a];
                    if (e.get) {
                        return t[a].get(f) || f
                    } else {
                        return t[a][f] || f
                    }
                }
                if (p(f)) {
                    if (r.get("numberFormatter")) {
                        f = r.get("numberFormatter")(f)
                    } else {
                        f = y(f, l, r.get("numberDigitGroupCount"), r.get("numberDigitGroupSep"), r.get("numberDecimalMark"))
                    }
                }
                return f
            })
        }});
        r.spformat = function (e, t) {
            return new u(e, t)
        };
        a = function (e, t, n) {
            if (e < t) {
                return t
            }
            if (e > n) {
                return n
            }
            return e
        };
        f = function (e, n) {
            var r;
            if (n === 2) {
                r = t.floor(e.length / 2);
                return e.length % 2 ? e[r] : (e[r - 1] + e[r]) / 2
            } else {
                if (e.length % 2) {
                    r = (e.length * n + n) / 4;
                    return r % 1 ? (e[t.floor(r)] + e[t.floor(r) - 1]) / 2 : e[r - 1]
                } else {
                    r = (e.length * n + 2) / 4;
                    return r % 1 ? (e[t.floor(r)] + e[t.floor(r) - 1]) / 2 : e[r - 1]
                }
            }
        };
        l = function (e) {
            var t;
            switch (e) {
                case"undefined":
                    e = n;
                    break;
                case"null":
                    e = null;
                    break;
                case"true":
                    e = true;
                    break;
                case"false":
                    e = false;
                    break;
                default:
                    t = parseFloat(e);
                    if (e == t) {
                        e = t
                    }
            }
            return e
        };
        c = function (e) {
            var t, n = [];
            for (t = e.length; t--;) {
                n[t] = l(e[t])
            }
            return n
        };
        h = function (e, t) {
            var n, r, i = [];
            for (n = 0, r = e.length; n < r; n++) {
                if (e[n] !== t) {
                    i.push(e[n])
                }
            }
            return i
        };
        p = function (e) {
            return!isNaN(parseFloat(e)) && isFinite(e)
        };
        y = function (e, t, n, i, s) {
            var o, u;
            e = (t === false ? parseFloat(e).toString() : e.toFixed(t)).split("");
            o = (o = r.inArray(".", e)) < 0 ? e.length : o;
            if (o < e.length) {
                e[o] = s
            }
            for (u = o - n; u > 0; u -= n) {
                e.splice(u, 0, i)
            }
            return e.join("")
        };
        d = function (e, t, n) {
            var r;
            for (r = t.length; r--;) {
                if (n && t[r] === null)continue;
                if (t[r] !== e) {
                    return false
                }
            }
            return true
        };
        v = function (e) {
            var t = 0, n;
            for (n = e.length; n--;) {
                t += typeof e[n] === "number" ? e[n] : 0
            }
            return t
        };
        g = function (e) {
            return r.isArray(e) ? e : [e]
        };
        m = function (t) {
            var n;
            if (e.createStyleSheet) {
                e.createStyleSheet().cssText = t
            } else {
                n = e.createElement("style");
                n.type = "text/css";
                e.getElementsByTagName("head")[0].appendChild(n);
                n[typeof e.body.style.WebkitAppearance == "string" ? "innerText" : "innerHTML"] = t
            }
        };
        r.fn.simpledraw = function (t, i, s, o) {
            var u, a;
            if (s && (u = this.data("_jqs_vcanvas"))) {
                return u
            }
            if (r.fn.sparkline.canvas === false) {
                return false
            } else if (r.fn.sparkline.canvas === n) {
                var f = e.createElement("canvas");
                if (!!(f.getContext && f.getContext("2d"))) {
                    r.fn.sparkline.canvas = function (e, t, n, r) {
                        return new P(e, t, n, r)
                    }
                } else if (e.namespaces && !e.namespaces.v) {
                    e.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML");
                    r.fn.sparkline.canvas = function (e, t, n, r) {
                        return new H(e, t, n)
                    }
                } else {
                    r.fn.sparkline.canvas = false;
                    return false
                }
            }
            if (t === n) {
                t = r(this).innerWidth()
            }
            if (i === n) {
                i = r(this).innerHeight()
            }
            u = r.fn.sparkline.canvas(t, i, this, o);
            a = r(this).data("_jqs_mhandler");
            if (a) {
                a.registerCanvas(u)
            }
            return u
        };
        r.fn.cleardraw = function () {
            var e = this.data("_jqs_vcanvas");
            if (e) {
                e.reset()
            }
        };
        r.RangeMapClass = b = o({init: function (e) {
            var t, n, r = [];
            for (t in e) {
                if (e.hasOwnProperty(t) && typeof t === "string" && t.indexOf(":") > -1) {
                    n = t.split(":");
                    n[0] = n[0].length === 0 ? -Infinity : parseFloat(n[0]);
                    n[1] = n[1].length === 0 ? Infinity : parseFloat(n[1]);
                    n[2] = e[t];
                    r.push(n)
                }
            }
            this.map = e;
            this.rangelist = r || false
        }, get: function (e) {
            var t = this.rangelist, r, i, s;
            if ((s = this.map[e]) !== n) {
                return s
            }
            if (t) {
                for (r = t.length; r--;) {
                    i = t[r];
                    if (i[0] <= e && i[1] >= e) {
                        return i[2]
                    }
                }
            }
            return n
        }});
        r.range_map = function (e) {
            return new b(e)
        };
        w = o({init: function (e, t) {
            var n = r(e);
            this.$el = n;
            this.options = t;
            this.currentPageX = 0;
            this.currentPageY = 0;
            this.el = e;
            this.splist = [];
            this.tooltip = null;
            this.over = false;
            this.displayTooltips = !t.get("disableTooltips");
            this.highlightEnabled = !t.get("disableHighlight")
        }, registerSparkline: function (e) {
            this.splist.push(e);
            if (this.over) {
                this.updateDisplay()
            }
        }, registerCanvas: function (e) {
            var t = r(e.canvas);
            this.canvas = e;
            this.$canvas = t;
            t.mouseenter(r.proxy(this.mouseenter, this));
            t.mouseleave(r.proxy(this.mouseleave, this));
            t.click(r.proxy(this.mouseclick, this))
        }, reset: function (e) {
            this.splist = [];
            if (this.tooltip && e) {
                this.tooltip.remove();
                this.tooltip = n
            }
        }, mouseclick: function (e) {
            var t = r.Event("sparklineClick");
            t.originalEvent = e;
            t.sparklines = this.splist;
            this.$el.trigger(t)
        }, mouseenter: function (t) {
            r(e.body).unbind("mousemove.jqs");
            r(e.body).bind("mousemove.jqs", r.proxy(this.mousemove, this));
            this.over = true;
            this.currentPageX = t.pageX;
            this.currentPageY = t.pageY;
            this.currentEl = t.target;
            if (!this.tooltip && this.displayTooltips) {
                this.tooltip = new E(this.options);
                this.tooltip.updatePosition(t.pageX, t.pageY)
            }
            this.updateDisplay()
        }, mouseleave: function () {
            r(e.body).unbind("mousemove.jqs");
            var t = this.splist, n = t.length, i = false, s, o;
            this.over = false;
            this.currentEl = null;
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null
            }
            for (o = 0; o < n; o++) {
                s = t[o];
                if (s.clearRegionHighlight()) {
                    i = true
                }
            }
            if (i) {
                this.canvas.render()
            }
        }, mousemove: function (e) {
            this.currentPageX = e.pageX;
            this.currentPageY = e.pageY;
            this.currentEl = e.target;
            if (this.tooltip) {
                this.tooltip.updatePosition(e.pageX, e.pageY)
            }
            this.updateDisplay()
        }, updateDisplay: function () {
            var e = this.splist, t = e.length, n = false, i = this.$canvas.offset(), s = this.currentPageX - i.left, o = this.currentPageY - i.top, u, a, f, l, c;
            if (!this.over) {
                return
            }
            for (f = 0; f < t; f++) {
                a = e[f];
                l = a.setRegionHighlight(this.currentEl, s, o);
                if (l) {
                    n = true
                }
            }
            if (n) {
                c = r.Event("sparklineRegionChange");
                c.sparklines = this.splist;
                this.$el.trigger(c);
                if (this.tooltip) {
                    u = "";
                    for (f = 0; f < t; f++) {
                        a = e[f];
                        u += a.getCurrentRegionTooltip()
                    }
                    this.tooltip.setContent(u)
                }
                if (!this.disableHighlight) {
                    this.canvas.render()
                }
            }
            if (l === null) {
                this.mouseleave()
            }
        }});
        E = o({sizeStyle: "position: static !important;" + "display: block !important;" + "visibility: hidden !important;" + "float: left !important;", init: function (t) {
            var n = t.get("tooltipClassname", "jqstooltip"), i = this.sizeStyle, s;
            this.container = t.get("tooltipContainer") || e.body;
            this.tooltipOffsetX = t.get("tooltipOffsetX", 10);
            this.tooltipOffsetY = t.get("tooltipOffsetY", 12);
            r("#jqssizetip").remove();
            r("#jqstooltip").remove();
            this.sizetip = r("<div/>", {id: "jqssizetip", style: i, "class": n});
            this.tooltip = r("<div/>", {id: "jqstooltip", "class": n}).appendTo(this.container);
            s = this.tooltip.offset();
            this.offsetLeft = s.left;
            this.offsetTop = s.top;
            this.hidden = true;
            r(window).unbind("resize.jqs scroll.jqs");
            r(window).bind("resize.jqs scroll.jqs", r.proxy(this.updateWindowDims, this));
            this.updateWindowDims()
        }, updateWindowDims: function () {
            this.scrollTop = r(window).scrollTop();
            this.scrollLeft = r(window).scrollLeft();
            this.scrollRight = this.scrollLeft + r(window).width();
            this.updatePosition()
        }, getSize: function (e) {
            this.sizetip.html(e).appendTo(this.container);
            this.width = this.sizetip.width() + 1;
            this.height = this.sizetip.height();
            this.sizetip.remove()
        }, setContent: function (e) {
            if (!e) {
                this.tooltip.css("visibility", "hidden");
                this.hidden = true;
                return
            }
            this.getSize(e);
            this.tooltip.html(e).css({width: this.width, height: this.height, visibility: "visible"});
            if (this.hidden) {
                this.hidden = false;
                this.updatePosition()
            }
        }, updatePosition: function (e, t) {
            if (e === n) {
                if (this.mousex === n) {
                    return
                }
                e = this.mousex - this.offsetLeft;
                t = this.mousey - this.offsetTop
            } else {
                this.mousex = e = e - this.offsetLeft;
                this.mousey = t = t - this.offsetTop
            }
            if (!this.height || !this.width || this.hidden) {
                return
            }
            t -= this.height + this.tooltipOffsetY;
            e += this.tooltipOffsetX;
            if (t < this.scrollTop) {
                t = this.scrollTop
            }
            if (e < this.scrollLeft) {
                e = this.scrollLeft
            } else if (e + this.width > this.scrollRight) {
                e = this.scrollRight - this.width
            }
            this.tooltip.css({left: e, top: t})
        }, remove: function () {
            this.tooltip.remove();
            this.sizetip.remove();
            this.sizetip = this.tooltip = n;
            r(window).unbind("resize.jqs scroll.jqs")
        }});
        M = function () {
            m(O)
        };
        r(M);
        B = [];
        r.fn.sparkline = function (t, i) {
            return this.each(function () {
                var s = new r.fn.sparkline.options(this, i), o = r(this), u, a;
                u = function () {
                    var i, u, a, f, l, c, h;
                    if (t === "html" || t === n) {
                        h = this.getAttribute(s.get("tagValuesAttribute"));
                        if (h === n || h === null) {
                            h = o.html()
                        }
                        i = h.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")
                    } else {
                        i = t
                    }
                    u = s.get("width") === "auto" ? i.length * s.get("defaultPixelsPerValue") : s.get("width");
                    if (s.get("height") === "auto") {
                        if (!s.get("composite") || !r.data(this, "_jqs_vcanvas")) {
                            f = e.createElement("span");
                            f.innerHTML = "a";
                            o.html(f);
                            a = r(f).innerHeight() || r(f).height();
                            r(f).remove();
                            f = null
                        }
                    } else {
                        a = s.get("height")
                    }
                    if (!s.get("disableInteraction")) {
                        l = r.data(this, "_jqs_mhandler");
                        if (!l) {
                            l = new w(this, s);
                            r.data(this, "_jqs_mhandler", l)
                        } else if (!s.get("composite")) {
                            l.reset()
                        }
                    } else {
                        l = false
                    }
                    if (s.get("composite") && !r.data(this, "_jqs_vcanvas")) {
                        if (!r.data(this, "_jqs_errnotify")) {
                            alert("Attempted to attach a composite sparkline to an element with no existing sparkline");
                            r.data(this, "_jqs_errnotify", true)
                        }
                        return
                    }
                    c = new (r.fn.sparkline[s.get("type")])(this, i, s, u, a);
                    c.render();
                    if (l) {
                        l.registerSparkline(c)
                    }
                };
                if (r(this).html() && !s.get("disableHiddenCheck") && r(this).is(":hidden") || !r(this).parents("body").length) {
                    if (!s.get("composite") && r.data(this, "_jqs_pending")) {
                        for (a = B.length; a; a--) {
                            if (B[a - 1][0] == this) {
                                B.splice(a - 1, 1)
                            }
                        }
                    }
                    B.push([this, u]);
                    r.data(this, "_jqs_pending", true)
                } else {
                    u.call(this)
                }
            })
        };
        r.fn.sparkline.defaults = s();
        r.sparkline_display_visible = function () {
            var e, t, n;
            var i = [];
            for (t = 0, n = B.length; t < n; t++) {
                e = B[t][0];
                if (r(e).is(":visible") && !r(e).parents().is(":hidden")) {
                    B[t][1].call(e);
                    r.data(B[t][0], "_jqs_pending", false);
                    i.push(t)
                } else if (!r(e).closest("html").length && !r.data(e, "_jqs_pending")) {
                    r.data(B[t][0], "_jqs_pending", false);
                    i.push(t)
                }
            }
            for (t = i.length; t; t--) {
                B.splice(i[t - 1], 1)
            }
        };
        r.fn.sparkline.options = o({init: function (e, t) {
            var n, s, o, u;
            this.userOptions = t = t || {};
            this.tag = e;
            this.tagValCache = {};
            s = r.fn.sparkline.defaults;
            o = s.common;
            this.tagOptionsPrefix = t.enableTagOptions && (t.tagOptionsPrefix || o.tagOptionsPrefix);
            u = this.getTagSetting("type");
            if (u === i) {
                n = s[t.type || o.type]
            } else {
                n = s[u]
            }
            this.mergedOptions = r.extend({}, o, n, t)
        }, getTagSetting: function (e) {
            var t = this.tagOptionsPrefix, r, s, o, u;
            if (t === false || t === n) {
                return i
            }
            if (this.tagValCache.hasOwnProperty(e)) {
                r = this.tagValCache.key
            } else {
                r = this.tag.getAttribute(t + e);
                if (r === n || r === null) {
                    r = i
                } else if (r.substr(0, 1) === "[") {
                    r = r.substr(1, r.length - 2).split(",");
                    for (s = r.length; s--;) {
                        r[s] = l(r[s].replace(/(^\s*)|(\s*$)/g, ""))
                    }
                } else if (r.substr(0, 1) === "{") {
                    o = r.substr(1, r.length - 2).split(",");
                    r = {};
                    for (s = o.length; s--;) {
                        u = o[s].split(":", 2);
                        r[u[0].replace(/(^\s*)|(\s*$)/g, "")] = l(u[1].replace(/(^\s*)|(\s*$)/g, ""))
                    }
                } else {
                    r = l(r)
                }
                this.tagValCache.key = r
            }
            return r
        }, get: function (e, t) {
            var r = this.getTagSetting(e), s;
            if (r !== i) {
                return r
            }
            return(s = this.mergedOptions[e]) === n ? t : s
        }});
        r.fn.sparkline._base = o({disabled: false, init: function (e, t, i, s, o) {
            this.el = e;
            this.$el = r(e);
            this.values = t;
            this.options = i;
            this.width = s;
            this.height = o;
            this.currentRegion = n
        }, initTarget: function () {
            var e = !this.options.get("disableInteraction");
            if (!(this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), e))) {
                this.disabled = true
            } else {
                this.canvasWidth = this.target.pixelWidth;
                this.canvasHeight = this.target.pixelHeight
            }
        }, render: function () {
            if (this.disabled) {
                this.el.innerHTML = "";
                return false
            }
            return true
        }, getRegion: function (e, t) {
        }, setRegionHighlight: function (e, t, r) {
            var i = this.currentRegion, s = !this.options.get("disableHighlight"), o;
            if (t > this.canvasWidth || r > this.canvasHeight || t < 0 || r < 0) {
                return null
            }
            o = this.getRegion(e, t, r);
            if (i !== o) {
                if (i !== n && s) {
                    this.removeHighlight()
                }
                this.currentRegion = o;
                if (o !== n && s) {
                    this.renderHighlight()
                }
                return true
            }
            return false
        }, clearRegionHighlight: function () {
            if (this.currentRegion !== n) {
                this.removeHighlight();
                this.currentRegion = n;
                return true
            }
            return false
        }, renderHighlight: function () {
            this.changeHighlight(true)
        }, removeHighlight: function () {
            this.changeHighlight(false)
        }, changeHighlight: function (e) {
        }, getCurrentRegionTooltip: function () {
            var e = this.options, t = "", i = [], s, o, a, f, l, c, h, p, d, v, m, g, y, b;
            if (this.currentRegion === n) {
                return""
            }
            s = this.getCurrentRegionFields();
            m = e.get("tooltipFormatter");
            if (m) {
                return m(this, e, s)
            }
            if (e.get("tooltipChartTitle")) {
                t += '<div class="jqs jqstitle">' + e.get("tooltipChartTitle") + "</div>\n"
            }
            o = this.options.get("tooltipFormat");
            if (!o) {
                return""
            }
            if (!r.isArray(o)) {
                o = [o]
            }
            if (!r.isArray(s)) {
                s = [s]
            }
            h = this.options.get("tooltipFormatFieldlist");
            p = this.options.get("tooltipFormatFieldlistKey");
            if (h && p) {
                d = [];
                for (c = s.length; c--;) {
                    v = s[c][p];
                    if ((b = r.inArray(v, h)) != -1) {
                        d[b] = s[c]
                    }
                }
                s = d
            }
            a = o.length;
            y = s.length;
            for (c = 0; c < a; c++) {
                g = o[c];
                if (typeof g === "string") {
                    g = new u(g)
                }
                f = g.fclass || "jqsfield";
                for (b = 0; b < y; b++) {
                    if (!s[b].isNull || !e.get("tooltipSkipNull")) {
                        r.extend(s[b], {prefix: e.get("tooltipPrefix"), suffix: e.get("tooltipSuffix")});
                        l = g.render(s[b], e.get("tooltipValueLookups"), e);
                        i.push('<div class="' + f + '">' + l + "</div>")
                    }
                }
            }
            if (i.length) {
                return t + i.join("\n")
            }
            return""
        }, getCurrentRegionFields: function () {
        }, calcHighlightColor: function (e, n) {
            var r = n.get("highlightColor"), i = n.get("highlightLighten"), s, o, u, f;
            if (r) {
                return r
            }
            if (i) {
                s = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(e) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(e);
                if (s) {
                    u = [];
                    o = e.length === 4 ? 16 : 1;
                    for (f = 0; f < 3; f++) {
                        u[f] = a(t.round(parseInt(s[f + 1], 16) * o * i), 0, 255)
                    }
                    return"rgb(" + u.join(",") + ")"
                }
            }
            return e
        }});
        S = {changeHighlight: function (e) {
            var t = this.currentRegion, n = this.target, i = this.regionShapes[t], s;
            if (i) {
                s = this.renderRegion(t, e);
                if (r.isArray(s) || r.isArray(i)) {
                    n.replaceWithShapes(i, s);
                    this.regionShapes[t] = r.map(s, function (e) {
                        return e.id
                    })
                } else {
                    n.replaceWithShape(i, s);
                    this.regionShapes[t] = s.id
                }
            }
        }, render: function () {
            var e = this.values, t = this.target, n = this.regionShapes, i, s, o, u;
            if (!this.cls._super.render.call(this)) {
                return
            }
            for (o = e.length; o--;) {
                i = this.renderRegion(o);
                if (i) {
                    if (r.isArray(i)) {
                        s = [];
                        for (u = i.length; u--;) {
                            i[u].append();
                            s.push(i[u].id)
                        }
                        n[o] = s
                    } else {
                        i.append();
                        n[o] = i.id
                    }
                } else {
                    n[o] = null
                }
            }
            t.render()
        }};
        r.fn.sparkline.line = x = o(r.fn.sparkline._base, {type: "line", init: function (e, t, n, r, i) {
            x._super.init.call(this, e, t, n, r, i);
            this.vertices = [];
            this.regionMap = [];
            this.xvalues = [];
            this.yvalues = [];
            this.yminmax = [];
            this.hightlightSpotId = null;
            this.lastShapeId = null;
            this.initTarget()
        }, getRegion: function (e, t, r) {
            var i, s = this.regionMap;
            for (i = s.length; i--;) {
                if (s[i] !== null && t >= s[i][0] && t <= s[i][1]) {
                    return s[i][2]
                }
            }
            return n
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion;
            return{isNull: this.yvalues[e] === null, x: this.xvalues[e], y: this.yvalues[e], color: this.options.get("lineColor"), fillColor: this.options.get("fillColor"), offset: e}
        }, renderHighlight: function () {
            var e = this.currentRegion, t = this.target, r = this.vertices[e], i = this.options, s = i.get("spotRadius"), o = i.get("highlightSpotColor"), u = i.get("highlightLineColor"), a, f;
            if (!r) {
                return
            }
            if (s && o) {
                a = t.drawCircle(r[0], r[1], s, n, o);
                this.highlightSpotId = a.id;
                t.insertAfterShape(this.lastShapeId, a)
            }
            if (u) {
                f = t.drawLine(r[0], this.canvasTop, r[0], this.canvasTop + this.canvasHeight, u);
                this.highlightLineId = f.id;
                t.insertAfterShape(this.lastShapeId, f)
            }
        }, removeHighlight: function () {
            var e = this.target;
            if (this.highlightSpotId) {
                e.removeShapeId(this.highlightSpotId);
                this.highlightSpotId = null
            }
            if (this.highlightLineId) {
                e.removeShapeId(this.highlightLineId);
                this.highlightLineId = null
            }
        }, scanValues: function () {
            var e = this.values, n = e.length, r = this.xvalues, i = this.yvalues, s = this.yminmax, o, u, a, f, l;
            for (o = 0; o < n; o++) {
                u = e[o];
                a = typeof e[o] === "string";
                f = typeof e[o] === "object" && e[o]instanceof Array;
                l = a && e[o].split(":");
                if (a && l.length === 2) {
                    r.push(Number(l[0]));
                    i.push(Number(l[1]));
                    s.push(Number(l[1]))
                } else if (f) {
                    r.push(u[0]);
                    i.push(u[1]);
                    s.push(u[1])
                } else {
                    r.push(o);
                    if (e[o] === null || e[o] === "null") {
                        i.push(null)
                    } else {
                        i.push(Number(u));
                        s.push(Number(u))
                    }
                }
            }
            if (this.options.get("xvalues")) {
                r = this.options.get("xvalues")
            }
            this.maxy = this.maxyorg = t.max.apply(t, s);
            this.miny = this.minyorg = t.min.apply(t, s);
            this.maxx = t.max.apply(t, r);
            this.minx = t.min.apply(t, r);
            this.xvalues = r;
            this.yvalues = i;
            this.yminmax = s
        }, processRangeOptions: function () {
            var e = this.options, t = e.get("normalRangeMin"), r = e.get("normalRangeMax");
            if (t !== n) {
                if (t < this.miny) {
                    this.miny = t
                }
                if (r > this.maxy) {
                    this.maxy = r
                }
            }
            if (e.get("chartRangeMin") !== n && (e.get("chartRangeClip") || e.get("chartRangeMin") < this.miny)) {
                this.miny = e.get("chartRangeMin")
            }
            if (e.get("chartRangeMax") !== n && (e.get("chartRangeClip") || e.get("chartRangeMax") > this.maxy)) {
                this.maxy = e.get("chartRangeMax")
            }
            if (e.get("chartRangeMinX") !== n && (e.get("chartRangeClipX") || e.get("chartRangeMinX") < this.minx)) {
                this.minx = e.get("chartRangeMinX")
            }
            if (e.get("chartRangeMaxX") !== n && (e.get("chartRangeClipX") || e.get("chartRangeMaxX") > this.maxx)) {
                this.maxx = e.get("chartRangeMaxX")
            }
        }, drawNormalRange: function (e, r, i, s, o) {
            var u = this.options.get("normalRangeMin"), a = this.options.get("normalRangeMax"), f = r + t.round(i - i * ((a - this.miny) / o)), l = t.round(i * (a - u) / o);
            this.target.drawRect(e, f, s, l, n, this.options.get("normalRangeColor")).append()
        }, render: function () {
            var e = this.options, i = this.target, s = this.canvasWidth, o = this.canvasHeight, u = this.vertices, a = e.get("spotRadius"), f = this.regionMap, l, c, h, p, d, v, m, g, y, w, E, S, T, N, C, k, L, A, O, M, _, D, P, H, B;
            if (!x._super.render.call(this)) {
                return
            }
            this.scanValues();
            this.processRangeOptions();
            P = this.xvalues;
            H = this.yvalues;
            if (!this.yminmax.length || this.yvalues.length < 2) {
                return
            }
            p = d = 0;
            l = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx;
            c = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny;
            h = this.yvalues.length - 1;
            if (a && (s < a * 4 || o < a * 4)) {
                a = 0
            }
            if (a) {
                _ = e.get("highlightSpotColor") && !e.get("disableInteraction");
                if (_ || e.get("minSpotColor") || e.get("spotColor") && H[h] === this.miny) {
                    o -= t.ceil(a)
                }
                if (_ || e.get("maxSpotColor") || e.get("spotColor") && H[h] === this.maxy) {
                    o -= t.ceil(a);
                    p += t.ceil(a)
                }
                if (_ || (e.get("minSpotColor") || e.get("maxSpotColor")) && (H[0] === this.miny || H[0] === this.maxy)) {
                    d += t.ceil(a);
                    s -= t.ceil(a)
                }
                if (_ || e.get("spotColor") || e.get("minSpotColor") || e.get("maxSpotColor") && (H[h] === this.miny || H[h] === this.maxy)) {
                    s -= t.ceil(a)
                }
            }
            o--;
            if (e.get("normalRangeMin") !== n && !e.get("drawNormalOnTop")) {
                this.drawNormalRange(d, p, o, s, c)
            }
            m = [];
            g = [m];
            N = C = null;
            k = H.length;
            for (B = 0; B < k; B++) {
                y = P[B];
                E = P[B + 1];
                w = H[B];
                S = d + t.round((y - this.minx) * (s / l));
                T = B < k - 1 ? d + t.round((E - this.minx) * (s / l)) : s;
                C = S + (T - S) / 2;
                f[B] = [N || 0, C, B];
                N = C;
                if (w === null) {
                    if (B) {
                        if (H[B - 1] !== null) {
                            m = [];
                            g.push(m)
                        }
                        u.push(null)
                    }
                } else {
                    if (w < this.miny) {
                        w = this.miny
                    }
                    if (w > this.maxy) {
                        w = this.maxy
                    }
                    if (!m.length) {
                        m.push([S, p + o])
                    }
                    v = [S, p + t.round(o - o * ((w - this.miny) / c))];
                    m.push(v);
                    u.push(v)
                }
            }
            L = [];
            A = [];
            O = g.length;
            for (B = 0; B < O; B++) {
                m = g[B];
                if (m.length) {
                    if (e.get("fillColor")) {
                        m.push([m[m.length - 1][0], p + o]);
                        A.push(m.slice(0));
                        m.pop()
                    }
                    if (m.length > 2) {
                        m[0] = [m[0][0], m[1][1]]
                    }
                    L.push(m)
                }
            }
            O = A.length;
            for (B = 0; B < O; B++) {
                i.drawShape(A[B], e.get("fillColor"), e.get("fillColor")).append()
            }
            if (e.get("normalRangeMin") !== n && e.get("drawNormalOnTop")) {
                this.drawNormalRange(d, p, o, s, c)
            }
            O = L.length;
            for (B = 0; B < O; B++) {
                i.drawShape(L[B], e.get("lineColor"), n, e.get("lineWidth")).append()
            }
            if (a && e.get("valueSpots")) {
                M = e.get("valueSpots");
                if (M.get === n) {
                    M = new b(M)
                }
                for (B = 0; B < k; B++) {
                    D = M.get(H[B]);
                    if (D) {
                        i.drawCircle(d + t.round((P[B] - this.minx) * (s / l)), p + t.round(o - o * ((H[B] - this.miny) / c)), a, n, D).append()
                    }
                }
            }
            if (a && e.get("spotColor") && H[h] !== null) {
                i.drawCircle(d + t.round((P[P.length - 1] - this.minx) * (s / l)), p + t.round(o - o * ((H[h] - this.miny) / c)), a, n, e.get("spotColor")).append()
            }
            if (this.maxy !== this.minyorg) {
                if (a && e.get("minSpotColor")) {
                    y = P[r.inArray(this.minyorg, H)];
                    i.drawCircle(d + t.round((y - this.minx) * (s / l)), p + t.round(o - o * ((this.minyorg - this.miny) / c)), a, n, e.get("minSpotColor")).append()
                }
                if (a && e.get("maxSpotColor")) {
                    y = P[r.inArray(this.maxyorg, H)];
                    i.drawCircle(d + t.round((y - this.minx) * (s / l)), p + t.round(o - o * ((this.maxyorg - this.miny) / c)), a, n, e.get("maxSpotColor")).append()
                }
            }
            this.lastShapeId = i.getLastShapeId();
            this.canvasTop = p;
            i.render()
        }});
        r.fn.sparkline.bar = T = o(r.fn.sparkline._base, S, {type: "bar", init: function (e, i, s, o, u) {
            var f = parseInt(s.get("barWidth"), 10), p = parseInt(s.get("barSpacing"), 10), d = s.get("chartRangeMin"), v = s.get("chartRangeMax"), m = s.get("chartRangeClip"), g = Infinity, y = -Infinity, w, E, S, x, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z;
            T._super.init.call(this, e, i, s, o, u);
            for (C = 0, k = i.length; C < k; C++) {
                q = i[C];
                w = typeof q === "string" && q.indexOf(":") > -1;
                if (w || r.isArray(q)) {
                    H = true;
                    if (w) {
                        q = i[C] = c(q.split(":"))
                    }
                    q = h(q, null);
                    E = t.min.apply(t, q);
                    S = t.max.apply(t, q);
                    if (E < g) {
                        g = E
                    }
                    if (S > y) {
                        y = S
                    }
                }
            }
            this.stacked = H;
            this.regionShapes = {};
            this.barWidth = f;
            this.barSpacing = p;
            this.totalBarWidth = f + p;
            this.width = o = i.length * f + (i.length - 1) * p;
            this.initTarget();
            if (m) {
                D = d === n ? -Infinity : d;
                P = v === n ? Infinity : v
            }
            N = [];
            x = H ? [] : N;
            var W = [];
            var X = [];
            for (C = 0, k = i.length; C < k; C++) {
                if (H) {
                    B = i[C];
                    i[C] = I = [];
                    W[C] = 0;
                    x[C] = X[C] = 0;
                    for (j = 0, F = B.length; j < F; j++) {
                        q = I[j] = m ? a(B[j], D, P) : B[j];
                        if (q !== null) {
                            if (q > 0) {
                                W[C] += q
                            }
                            if (g < 0 && y > 0) {
                                if (q < 0) {
                                    X[C] += t.abs(q)
                                } else {
                                    x[C] += q
                                }
                            } else {
                                x[C] += t.abs(q - (q < 0 ? y : g))
                            }
                            N.push(q)
                        }
                    }
                } else {
                    q = m ? a(i[C], D, P) : i[C];
                    q = i[C] = l(q);
                    if (q !== null) {
                        N.push(q)
                    }
                }
            }
            this.max = _ = t.max.apply(t, N);
            this.min = M = t.min.apply(t, N);
            this.stackMax = y = H ? t.max.apply(t, W) : _;
            this.stackMin = g = H ? t.min.apply(t, N) : M;
            if (s.get("chartRangeMin") !== n && (s.get("chartRangeClip") || s.get("chartRangeMin") < M)) {
                M = s.get("chartRangeMin")
            }
            if (s.get("chartRangeMax") !== n && (s.get("chartRangeClip") || s.get("chartRangeMax") > _)) {
                _ = s.get("chartRangeMax")
            }
            this.zeroAxis = A = s.get("zeroAxis", true);
            if (M <= 0 && _ >= 0 && A) {
                O = 0
            } else if (A == false) {
                O = M
            } else if (M > 0) {
                O = M
            } else {
                O = _
            }
            this.xaxisOffset = O;
            L = H ? t.max.apply(t, x) + t.max.apply(t, X) : _ - M;
            this.canvasHeightEf = A && M < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1;
            if (M < O) {
                U = H && _ >= 0 ? y : _;
                R = (U - O) / L * this.canvasHeight;
                if (R !== t.ceil(R)) {
                    this.canvasHeightEf -= 2;
                    R = t.ceil(R)
                }
            } else {
                R = this.canvasHeight
            }
            this.yoffset = R;
            if (r.isArray(s.get("colorMap"))) {
                this.colorMapByIndex = s.get("colorMap");
                this.colorMapByValue = null
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = s.get("colorMap");
                if (this.colorMapByValue && this.colorMapByValue.get === n) {
                    this.colorMapByValue = new b(this.colorMapByValue)
                }
            }
            this.range = L
        }, getRegion: function (e, r, i) {
            var s = t.floor(r / this.totalBarWidth);
            return s < 0 || s >= this.values.length ? n : s
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion, t = g(this.values[e]), n = [], r, i;
            for (i = t.length; i--;) {
                r = t[i];
                n.push({isNull: r === null, value: r, color: this.calcColor(i, r, e), offset: e})
            }
            return n
        }, calcColor: function (e, t, i) {
            var s = this.colorMapByIndex, o = this.colorMapByValue, u = this.options, a, f;
            if (this.stacked) {
                a = u.get("stackedBarColor")
            } else {
                a = t < 0 ? u.get("negBarColor") : u.get("barColor")
            }
            if (t === 0 && u.get("zeroColor") !== n) {
                a = u.get("zeroColor")
            }
            if (o && (f = o.get(t))) {
                a = f
            } else if (s && s.length > i) {
                a = s[i]
            }
            return r.isArray(a) ? a[e % a.length] : a
        }, renderRegion: function (e, i) {
            var s = this.values[e], o = this.options, u = this.xaxisOffset, a = [], f = this.range, l = this.stacked, c = this.target, h = e * this.totalBarWidth, p = this.canvasHeightEf, v = this.yoffset, m, g, y, b, w, E, S, x, T, N;
            s = r.isArray(s) ? s : [s];
            S = s.length;
            x = s[0];
            b = d(null, s);
            N = d(u, s, true);
            if (b) {
                if (o.get("nullColor")) {
                    y = i ? o.get("nullColor") : this.calcHighlightColor(o.get("nullColor"), o);
                    m = v > 0 ? v - 1 : v;
                    return c.drawRect(h, m, this.barWidth - 1, 0, y, y)
                } else {
                    return n
                }
            }
            w = v;
            for (E = 0; E < S; E++) {
                x = s[E];
                if (l && x === u) {
                    if (!N || T) {
                        continue
                    }
                    T = true
                }
                if (f > 0) {
                    g = t.floor(p * (t.abs(x - u) / f)) + 1
                } else {
                    g = 1
                }
                if (x < u || x === u && v === 0) {
                    m = w;
                    w += g
                } else {
                    m = v - g;
                    v -= g
                }
                y = this.calcColor(E, x, e);
                if (i) {
                    y = this.calcHighlightColor(y, o)
                }
                a.push(c.drawRect(h, m, this.barWidth - 1, g - 1, y, y))
            }
            if (a.length === 1) {
                return a[0]
            }
            return a
        }});
        r.fn.sparkline.tristate = N = o(r.fn.sparkline._base, S, {type: "tristate", init: function (e, t, i, s, o) {
            var u = parseInt(i.get("barWidth"), 10), a = parseInt(i.get("barSpacing"), 10);
            N._super.init.call(this, e, t, i, s, o);
            this.regionShapes = {};
            this.barWidth = u;
            this.barSpacing = a;
            this.totalBarWidth = u + a;
            this.values = r.map(t, Number);
            this.width = s = t.length * u + (t.length - 1) * a;
            if (r.isArray(i.get("colorMap"))) {
                this.colorMapByIndex = i.get("colorMap");
                this.colorMapByValue = null
            } else {
                this.colorMapByIndex = null;
                this.colorMapByValue = i.get("colorMap");
                if (this.colorMapByValue && this.colorMapByValue.get === n) {
                    this.colorMapByValue = new b(this.colorMapByValue)
                }
            }
            this.initTarget()
        }, getRegion: function (e, n, r) {
            return t.floor(n / this.totalBarWidth)
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion;
            return{isNull: this.values[e] === n, value: this.values[e], color: this.calcColor(this.values[e], e), offset: e}
        }, calcColor: function (e, t) {
            var n = this.values, r = this.options, i = this.colorMapByIndex, s = this.colorMapByValue, o, u;
            if (s && (u = s.get(e))) {
                o = u
            } else if (i && i.length > t) {
                o = i[t]
            } else if (n[t] < 0) {
                o = r.get("negBarColor")
            } else if (n[t] > 0) {
                o = r.get("posBarColor")
            } else {
                o = r.get("zeroBarColor")
            }
            return o
        }, renderRegion: function (e, n) {
            var r = this.values, i = this.options, s = this.target, o, u, a, f, l, c;
            o = s.pixelHeight;
            a = t.round(o / 2);
            f = e * this.totalBarWidth;
            if (r[e] < 0) {
                l = a;
                u = a - 1
            } else if (r[e] > 0) {
                l = 0;
                u = a - 1
            } else {
                l = a - 1;
                u = 2
            }
            c = this.calcColor(r[e], e);
            if (c === null) {
                return
            }
            if (n) {
                c = this.calcHighlightColor(c, i)
            }
            return s.drawRect(f, l, this.barWidth - 1, u - 1, c, c)
        }});
        r.fn.sparkline.discrete = C = o(r.fn.sparkline._base, S, {type: "discrete", init: function (e, i, s, o, u) {
            C._super.init.call(this, e, i, s, o, u);
            this.regionShapes = {};
            this.values = i = r.map(i, Number);
            this.min = t.min.apply(t, i);
            this.max = t.max.apply(t, i);
            this.range = this.max - this.min;
            this.width = o = s.get("width") === "auto" ? i.length * 2 : this.width;
            this.interval = t.floor(o / i.length);
            this.itemWidth = o / i.length;
            if (s.get("chartRangeMin") !== n && (s.get("chartRangeClip") || s.get("chartRangeMin") < this.min)) {
                this.min = s.get("chartRangeMin")
            }
            if (s.get("chartRangeMax") !== n && (s.get("chartRangeClip") || s.get("chartRangeMax") > this.max)) {
                this.max = s.get("chartRangeMax")
            }
            this.initTarget();
            if (this.target) {
                this.lineHeight = s.get("lineHeight") === "auto" ? t.round(this.canvasHeight * .3) : s.get("lineHeight")
            }
        }, getRegion: function (e, n, r) {
            return t.floor(n / this.itemWidth)
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion;
            return{isNull: this.values[e] === n, value: this.values[e], offset: e}
        }, renderRegion: function (e, n) {
            var r = this.values, i = this.options, s = this.min, o = this.max, u = this.range, f = this.interval, l = this.target, c = this.canvasHeight, h = this.lineHeight, p = c - h, d, v, m, g;
            v = a(r[e], s, o);
            g = e * f;
            d = t.round(p - p * ((v - s) / u));
            m = i.get("thresholdColor") && v < i.get("thresholdValue") ? i.get("thresholdColor") : i.get("lineColor");
            if (n) {
                m = this.calcHighlightColor(m, i)
            }
            return l.drawLine(g, d, g, d + h, m)
        }});
        r.fn.sparkline.bullet = k = o(r.fn.sparkline._base, {type: "bullet", init: function (e, r, i, s, o) {
            var u, a, f;
            k._super.init.call(this, e, r, i, s, o);
            this.values = r = c(r);
            f = r.slice();
            f[0] = f[0] === null ? f[2] : f[0];
            f[1] = r[1] === null ? f[2] : f[1];
            u = t.min.apply(t, r);
            a = t.max.apply(t, r);
            if (i.get("base") === n) {
                u = u < 0 ? u : 0
            } else {
                u = i.get("base")
            }
            this.min = u;
            this.max = a;
            this.range = a - u;
            this.shapes = {};
            this.valueShapes = {};
            this.regiondata = {};
            this.width = s = i.get("width") === "auto" ? "4.0em" : s;
            this.target = this.$el.simpledraw(s, o, i.get("composite"));
            if (!r.length) {
                this.disabled = true
            }
            this.initTarget()
        }, getRegion: function (e, t, r) {
            var i = this.target.getShapeAt(e, t, r);
            return i !== n && this.shapes[i] !== n ? this.shapes[i] : n
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion;
            return{fieldkey: e.substr(0, 1), value: this.values[e.substr(1)], region: e}
        }, changeHighlight: function (e) {
            var t = this.currentRegion, n = this.valueShapes[t], r;
            delete this.shapes[n];
            switch (t.substr(0, 1)) {
                case"r":
                    r = this.renderRange(t.substr(1), e);
                    break;
                case"p":
                    r = this.renderPerformance(e);
                    break;
                case"t":
                    r = this.renderTarget(e);
                    break
            }
            this.valueShapes[t] = r.id;
            this.shapes[r.id] = t;
            this.target.replaceWithShape(n, r)
        }, renderRange: function (e, n) {
            var r = this.values[e], i = t.round(this.canvasWidth * ((r - this.min) / this.range)), s = this.options.get("rangeColors")[e - 2];
            if (n) {
                s = this.calcHighlightColor(s, this.options)
            }
            return this.target.drawRect(0, 0, i - 1, this.canvasHeight - 1, s, s)
        }, renderPerformance: function (e) {
            var n = this.values[1], r = t.round(this.canvasWidth * ((n - this.min) / this.range)), i = this.options.get("performanceColor");
            if (e) {
                i = this.calcHighlightColor(i, this.options)
            }
            return this.target.drawRect(0, t.round(this.canvasHeight * .3), r - 1, t.round(this.canvasHeight * .4) - 1, i, i)
        }, renderTarget: function (e) {
            var n = this.values[0], r = t.round(this.canvasWidth * ((n - this.min) / this.range) - this.options.get("targetWidth") / 2), i = t.round(this.canvasHeight * .1), s = this.canvasHeight - i * 2, o = this.options.get("targetColor");
            if (e) {
                o = this.calcHighlightColor(o, this.options)
            }
            return this.target.drawRect(r, i, this.options.get("targetWidth") - 1, s - 1, o, o)
        }, render: function () {
            var e = this.values.length, t = this.target, n, r;
            if (!k._super.render.call(this)) {
                return
            }
            for (n = 2; n < e; n++) {
                r = this.renderRange(n).append();
                this.shapes[r.id] = "r" + n;
                this.valueShapes["r" + n] = r.id
            }
            if (this.values[1] !== null) {
                r = this.renderPerformance().append();
                this.shapes[r.id] = "p1";
                this.valueShapes.p1 = r.id
            }
            if (this.values[0] !== null) {
                r = this.renderTarget().append();
                this.shapes[r.id] = "t0";
                this.valueShapes.t0 = r.id
            }
            t.render()
        }});
        r.fn.sparkline.pie = L = o(r.fn.sparkline._base, {type: "pie", init: function (e, n, i, s, o) {
            var u = 0, a;
            L._super.init.call(this, e, n, i, s, o);
            this.shapes = {};
            this.valueShapes = {};
            this.values = n = r.map(n, Number);
            if (i.get("width") === "auto") {
                this.width = this.height
            }
            if (n.length > 0) {
                for (a = n.length; a--;) {
                    u += n[a]
                }
            }
            this.total = u;
            this.initTarget();
            this.radius = t.floor(t.min(this.canvasWidth, this.canvasHeight) / 2)
        }, getRegion: function (e, t, r) {
            var i = this.target.getShapeAt(e, t, r);
            return i !== n && this.shapes[i] !== n ? this.shapes[i] : n
        }, getCurrentRegionFields: function () {
            var e = this.currentRegion;
            return{isNull: this.values[e] === n, value: this.values[e], percent: this.values[e] / this.total * 100, color: this.options.get("sliceColors")[e % this.options.get("sliceColors").length], offset: e}
        }, changeHighlight: function (e) {
            var t = this.currentRegion, n = this.renderSlice(t, e), r = this.valueShapes[t];
            delete this.shapes[r];
            this.target.replaceWithShape(r, n);
            this.valueShapes[t] = n.id;
            this.shapes[n.id] = t
        }, renderSlice: function (e, r) {
            var i = this.target, s = this.options, o = this.radius, u = s.get("borderWidth"), a = s.get("offset"), f = 2 * t.PI, l = this.values, c = this.total, h = a ? 2 * t.PI * (a / 360) : 0, p, d, v, m, g;
            m = l.length;
            for (v = 0; v < m; v++) {
                p = h;
                d = h;
                if (c > 0) {
                    d = h + f * (l[v] / c)
                }
                if (e === v) {
                    g = s.get("sliceColors")[v % s.get("sliceColors").length];
                    if (r) {
                        g = this.calcHighlightColor(g, s)
                    }
                    return i.drawPieSlice(o, o, o - u, p, d, n, g)
                }
                h = d
            }
        }, render: function () {
            var e = this.target, r = this.values, i = this.options, s = this.radius, o = i.get("borderWidth"), u, a;
            if (!L._super.render.call(this)) {
                return
            }
            if (o) {
                e.drawCircle(s, s, t.floor(s - o / 2), i.get("borderColor"), n, o).append()
            }
            for (a = r.length; a--;) {
                if (r[a]) {
                    u = this.renderSlice(a).append();
                    this.valueShapes[a] = u.id;
                    this.shapes[u.id] = a
                }
            }
            e.render()
        }});
        r.fn.sparkline.box = A = o(r.fn.sparkline._base, {type: "box", init: function (e, t, n, i, s) {
            A._super.init.call(this, e, t, n, i, s);
            this.values = r.map(t, Number);
            this.width = n.get("width") === "auto" ? "4.0em" : i;
            this.initTarget();
            if (!this.values.length) {
                this.disabled = 1
            }
        }, getRegion: function () {
            return 1
        }, getCurrentRegionFields: function () {
            var e = [
                {field: "lq", value: this.quartiles[0]},
                {field: "med", value: this.quartiles[1]},
                {field: "uq", value: this.quartiles[2]}
            ];
            if (this.loutlier !== n) {
                e.push({field: "lo", value: this.loutlier})
            }
            if (this.routlier !== n) {
                e.push({field: "ro", value: this.routlier})
            }
            if (this.lwhisker !== n) {
                e.push({field: "lw", value: this.lwhisker})
            }
            if (this.rwhisker !== n) {
                e.push({field: "rw", value: this.rwhisker})
            }
            return e
        }, render: function () {
            var e = this.target, r = this.values, i = r.length, s = this.options, o = this.canvasWidth, u = this.canvasHeight, a = s.get("chartRangeMin") === n ? t.min.apply(t, r) : s.get("chartRangeMin"), l = s.get("chartRangeMax") === n ? t.max.apply(t, r) : s.get("chartRangeMax"), c = 0, h, p, d, v, m, g, y, b, w, E, S;
            if (!A._super.render.call(this)) {
                return
            }
            if (s.get("raw")) {
                if (s.get("showOutliers") && r.length > 5) {
                    p = r[0];
                    h = r[1];
                    v = r[2];
                    m = r[3];
                    g = r[4];
                    y = r[5];
                    b = r[6]
                } else {
                    h = r[0];
                    v = r[1];
                    m = r[2];
                    g = r[3];
                    y = r[4]
                }
            } else {
                r.sort(function (e, t) {
                    return e - t
                });
                v = f(r, 1);
                m = f(r, 2);
                g = f(r, 3);
                d = g - v;
                if (s.get("showOutliers")) {
                    h = y = n;
                    for (w = 0; w < i; w++) {
                        if (h === n && r[w] > v - d * s.get("outlierIQR")) {
                            h = r[w]
                        }
                        if (r[w] < g + d * s.get("outlierIQR")) {
                            y = r[w]
                        }
                    }
                    p = r[0];
                    b = r[i - 1]
                } else {
                    h = r[0];
                    y = r[i - 1]
                }
            }
            this.quartiles = [v, m, g];
            this.lwhisker = h;
            this.rwhisker = y;
            this.loutlier = p;
            this.routlier = b;
            S = o / (l - a + 1);
            if (s.get("showOutliers")) {
                c = t.ceil(s.get("spotRadius"));
                o -= 2 * t.ceil(s.get("spotRadius"));
                S = o / (l - a + 1);
                if (p < h) {
                    e.drawCircle((p - a) * S + c, u / 2, s.get("spotRadius"), s.get("outlierLineColor"), s.get("outlierFillColor")).append()
                }
                if (b > y) {
                    e.drawCircle((b - a) * S + c, u / 2, s.get("spotRadius"), s.get("outlierLineColor"), s.get("outlierFillColor")).append()
                }
            }
            e.drawRect(t.round((v - a) * S + c), t.round(u * .1), t.round((g - v) * S), t.round(u * .8), s.get("boxLineColor"), s.get("boxFillColor")).append();
            e.drawLine(t.round((h - a) * S + c), t.round(u / 2), t.round((v - a) * S + c), t.round(u / 2), s.get("lineColor")).append();
            e.drawLine(t.round((h - a) * S + c), t.round(u / 4), t.round((h - a) * S + c), t.round(u - u / 4), s.get("whiskerColor")).append();
            e.drawLine(t.round((y - a) * S + c), t.round(u / 2), t.round((g - a) * S + c), t.round(u / 2), s.get("lineColor")).append();
            e.drawLine(t.round((y - a) * S + c), t.round(u / 4), t.round((y - a) * S + c), t.round(u - u / 4), s.get("whiskerColor")).append();
            e.drawLine(t.round((m - a) * S + c), t.round(u * .1), t.round((m - a) * S + c), t.round(u * .9), s.get("medianColor")).append();
            if (s.get("target")) {
                E = t.ceil(s.get("spotRadius"));
                e.drawLine(t.round((s.get("target") - a) * S + c), t.round(u / 2 - E), t.round((s.get("target") - a) * S + c), t.round(u / 2 + E), s.get("targetColor")).append();
                e.drawLine(t.round((s.get("target") - a) * S + c - E), t.round(u / 2), t.round((s.get("target") - a) * S + c + E), t.round(u / 2), s.get("targetColor")).append()
            }
            e.render()
        }});
        _ = o({init: function (e, t, n, r) {
            this.target = e;
            this.id = t;
            this.type = n;
            this.args = r
        }, append: function () {
            this.target.appendShape(this);
            return this
        }});
        D = o({_pxregex: /(\d+)(px)?\s*$/i, init: function (e, t, n) {
            if (!e) {
                return
            }
            this.width = e;
            this.height = t;
            this.target = n;
            this.lastShapeId = null;
            if (n[0]) {
                n = n[0]
            }
            r.data(n, "_jqs_vcanvas", this)
        }, drawLine: function (e, t, n, r, i, s) {
            return this.drawShape([
                [e, t],
                [n, r]
            ], i, s)
        }, drawShape: function (e, t, n, r) {
            return this._genShape("Shape", [e, t, n, r])
        }, drawCircle: function (e, t, n, r, i, s) {
            return this._genShape("Circle", [e, t, n, r, i, s])
        }, drawPieSlice: function (e, t, n, r, i, s, o) {
            return this._genShape("PieSlice", [e, t, n, r, i, s, o])
        }, drawRect: function (e, t, n, r, i, s) {
            return this._genShape("Rect", [e, t, n, r, i, s])
        }, getElement: function () {
            return this.canvas
        }, getLastShapeId: function () {
            return this.lastShapeId
        }, reset: function () {
            alert("reset not implemented")
        }, _insert: function (e, t) {
            r(t).html(e)
        }, _calculatePixelDims: function (e, t, n) {
            var i;
            i = this._pxregex.exec(t);
            if (i) {
                this.pixelHeight = i[1]
            } else {
                this.pixelHeight = r(n).height()
            }
            i = this._pxregex.exec(e);
            if (i) {
                this.pixelWidth = i[1]
            } else {
                this.pixelWidth = r(n).width()
            }
        }, _genShape: function (e, t) {
            var n = j++;
            t.unshift(n);
            return new _(this, n, e, t)
        }, appendShape: function (e) {
            alert("appendShape not implemented")
        }, replaceWithShape: function (e, t) {
            alert("replaceWithShape not implemented")
        }, insertAfterShape: function (e, t) {
            alert("insertAfterShape not implemented")
        }, removeShapeId: function (e) {
            alert("removeShapeId not implemented")
        }, getShapeAt: function (e, t, n) {
            alert("getShapeAt not implemented")
        }, render: function () {
            alert("render not implemented")
        }});
        P = o(D, {init: function (t, i, s, o) {
            P._super.init.call(this, t, i, s);
            this.canvas = e.createElement("canvas");
            if (s[0]) {
                s = s[0]
            }
            r.data(s, "_jqs_vcanvas", this);
            r(this.canvas).css({display: "inline-block", width: t, height: i, verticalAlign: "top"});
            this._insert(this.canvas, s);
            this._calculatePixelDims(t, i, this.canvas);
            this.canvas.width = this.pixelWidth;
            this.canvas.height = this.pixelHeight;
            this.interact = o;
            this.shapes = {};
            this.shapeseq = [];
            this.currentTargetShapeId = n;
            r(this.canvas).css({width: this.pixelWidth, height: this.pixelHeight})
        }, _getContext: function (e, t, r) {
            var i = this.canvas.getContext("2d");
            if (e !== n) {
                i.strokeStyle = e
            }
            i.lineWidth = r === n ? 1 : r;
            if (t !== n) {
                i.fillStyle = t
            }
            return i
        }, reset: function () {
            var e = this._getContext();
            e.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
            this.shapes = {};
            this.shapeseq = [];
            this.currentTargetShapeId = n
        }, _drawShape: function (e, t, r, i, s) {
            var o = this._getContext(r, i, s), u, a;
            o.beginPath();
            o.moveTo(t[0][0] + .5, t[0][1] + .5);
            for (u = 1, a = t.length; u < a; u++) {
                o.lineTo(t[u][0] + .5, t[u][1] + .5)
            }
            if (r !== n) {
                o.stroke()
            }
            if (i !== n) {
                o.fill()
            }
            if (this.targetX !== n && this.targetY !== n && o.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = e
            }
        }, _drawCircle: function (e, r, i, s, o, u, a) {
            var f = this._getContext(o, u, a);
            f.beginPath();
            f.arc(r, i, s, 0, 2 * t.PI, false);
            if (this.targetX !== n && this.targetY !== n && f.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = e
            }
            if (o !== n) {
                f.stroke()
            }
            if (u !== n) {
                f.fill()
            }
        }, _drawPieSlice: function (e, t, r, i, s, o, u, a) {
            var f = this._getContext(u, a);
            f.beginPath();
            f.moveTo(t, r);
            f.arc(t, r, i, s, o, false);
            f.lineTo(t, r);
            f.closePath();
            if (u !== n) {
                f.stroke()
            }
            if (a) {
                f.fill()
            }
            if (this.targetX !== n && this.targetY !== n && f.isPointInPath(this.targetX, this.targetY)) {
                this.currentTargetShapeId = e
            }
        }, _drawRect: function (e, t, n, r, i, s, o) {
            return this._drawShape(e, [
                [t, n],
                [t + r, n],
                [t + r, n + i],
                [t, n + i],
                [t, n]
            ], s, o)
        }, appendShape: function (e) {
            this.shapes[e.id] = e;
            this.shapeseq.push(e.id);
            this.lastShapeId = e.id;
            return e.id
        }, replaceWithShape: function (e, t) {
            var n = this.shapeseq, r;
            this.shapes[t.id] = t;
            for (r = n.length; r--;) {
                if (n[r] == e) {
                    n[r] = t.id
                }
            }
            delete this.shapes[e]
        }, replaceWithShapes: function (e, t) {
            var n = this.shapeseq, r = {}, i, s, o;
            for (s = e.length; s--;) {
                r[e[s]] = true
            }
            for (s = n.length; s--;) {
                i = n[s];
                if (r[i]) {
                    n.splice(s, 1);
                    delete this.shapes[i];
                    o = s
                }
            }
            for (s = t.length; s--;) {
                n.splice(o, 0, t[s].id);
                this.shapes[t[s].id] = t[s]
            }
        }, insertAfterShape: function (e, t) {
            var n = this.shapeseq, r;
            for (r = n.length; r--;) {
                if (n[r] === e) {
                    n.splice(r + 1, 0, t.id);
                    this.shapes[t.id] = t;
                    return
                }
            }
        }, removeShapeId: function (e) {
            var t = this.shapeseq, n;
            for (n = t.length; n--;) {
                if (t[n] === e) {
                    t.splice(n, 1);
                    break
                }
            }
            delete this.shapes[e]
        }, getShapeAt: function (e, t, n) {
            this.targetX = t;
            this.targetY = n;
            this.render();
            return this.currentTargetShapeId
        }, render: function () {
            var e = this.shapeseq, t = this.shapes, n = e.length, r = this._getContext(), i, s, o;
            r.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
            for (o = 0; o < n; o++) {
                i = e[o];
                s = t[i];
                this["_draw" + s.type].apply(this, s.args)
            }
            if (!this.interact) {
                this.shapes = {};
                this.shapeseq = []
            }
        }});
        H = o(D, {init: function (t, n, i) {
            var s;
            H._super.init.call(this, t, n, i);
            if (i[0]) {
                i = i[0]
            }
            r.data(i, "_jqs_vcanvas", this);
            this.canvas = e.createElement("span");
            r(this.canvas).css({display: "inline-block", position: "relative", overflow: "hidden", width: t, height: n, margin: "0px", padding: "0px", verticalAlign: "top"});
            this._insert(this.canvas, i);
            this._calculatePixelDims(t, n, this.canvas);
            this.canvas.width = this.pixelWidth;
            this.canvas.height = this.pixelHeight;
            s = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>';
            this.canvas.insertAdjacentHTML("beforeEnd", s);
            this.group = r(this.canvas).children()[0];
            this.rendered = false;
            this.prerender = ""
        }, _drawShape: function (e, t, r, i, s) {
            var o = [], u, a, f, l, c, h, p;
            for (p = 0, h = t.length; p < h; p++) {
                o[p] = "" + t[p][0] + "," + t[p][1]
            }
            u = o.splice(0, 1);
            s = s === n ? 1 : s;
            a = r === n ? ' stroked="false" ' : ' strokeWeight="' + s + 'px" strokeColor="' + r + '" ';
            f = i === n ? ' filled="false"' : ' fillColor="' + i + '" filled="true" ';
            l = o[0] === o[o.length - 1] ? "x " : "";
            c = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + e + '" ' + a + f + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + u + " l " + o.join(", ") + " " + l + 'e">' + " </v:shape>";
            return c
        }, _drawCircle: function (e, t, r, i, s, o, u) {
            var a, f, l;
            t -= i;
            r -= i;
            a = s === n ? ' stroked="false" ' : ' strokeWeight="' + u + 'px" strokeColor="' + s + '" ';
            f = o === n ? ' filled="false"' : ' fillColor="' + o + '" filled="true" ';
            l = "<v:oval " + ' id="jqsshape' + e + '" ' + a + f + ' style="position:absolute;top:' + r + "px; left:" + t + "px; width:" + i * 2 + "px; height:" + i * 2 + 'px"></v:oval>';
            return l
        }, _drawPieSlice: function (e, r, i, s, o, u, a, f) {
            var l, c, h, p, d, v, m, g;
            if (o === u) {
                return""
            }
            if (u - o === 2 * t.PI) {
                o = 0;
                u = 2 * t.PI
            }
            c = r + t.round(t.cos(o) * s);
            h = i + t.round(t.sin(o) * s);
            p = r + t.round(t.cos(u) * s);
            d = i + t.round(t.sin(u) * s);
            if (c === p && h === d) {
                if (u - o < t.PI) {
                    return""
                }
                c = p = r + s;
                h = d = i
            }
            if (c === p && h === d && u - o < t.PI) {
                return""
            }
            l = [r - s, i - s, r + s, i + s, c, h, p, d];
            v = a === n ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + a + '" ';
            m = f === n ? ' filled="false"' : ' fillColor="' + f + '" filled="true" ';
            g = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + e + '" ' + v + m + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + r + "," + i + " wa " + l.join(", ") + ' x e">' + " </v:shape>";
            return g
        }, _drawRect: function (e, t, n, r, i, s, o) {
            return this._drawShape(e, [
                [t, n],
                [t, n + i],
                [t + r, n + i],
                [t + r, n],
                [t, n]
            ], s, o)
        }, reset: function () {
            this.group.innerHTML = ""
        }, appendShape: function (e) {
            var t = this["_draw" + e.type].apply(this, e.args);
            if (this.rendered) {
                this.group.insertAdjacentHTML("beforeEnd", t)
            } else {
                this.prerender += t
            }
            this.lastShapeId = e.id;
            return e.id
        }, replaceWithShape: function (e, t) {
            var n = r("#jqsshape" + e), i = this["_draw" + t.type].apply(this, t.args);
            n[0].outerHTML = i
        }, replaceWithShapes: function (e, t) {
            var n = r("#jqsshape" + e[0]), i = "", s = t.length, o;
            for (o = 0; o < s; o++) {
                i += this["_draw" + t[o].type].apply(this, t[o].args)
            }
            n[0].outerHTML = i;
            for (o = 1; o < e.length; o++) {
                r("#jqsshape" + e[o]).remove()
            }
        }, insertAfterShape: function (e, t) {
            var n = r("#jqsshape" + e), i = this["_draw" + t.type].apply(this, t.args);
            n[0].insertAdjacentHTML("afterEnd", i)
        }, removeShapeId: function (e) {
            var t = r("#jqsshape" + e);
            this.group.removeChild(t[0])
        }, getShapeAt: function (e, t, n) {
            var r = e.id.substr(8);
            return r
        }, render: function () {
            if (!this.rendered) {
                this.group.innerHTML = this.prerender;
                this.rendered = true
            }
        }})
    })
})(document, Math)