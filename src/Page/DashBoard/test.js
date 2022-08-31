var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, b, d) {
    a instanceof String && (a = String(a));
    for (var c = a.length, e = 0; e < c; e++) {
        var g = a[e];
        if (b.call(d, g, e, a)) return {
            i: e,
            v: g
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
    a != Array.prototype && a != Object.prototype && (a[b] = d.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, d, c) {
    if (b) {
        d = $jscomp.global;
        a = a.split(".");
        for (c = 0; c < a.length - 1; c++) {
            var e = a[c];
            e in d || (d[e] = {});
            d = d[e]
        }
        a = a[a.length - 1];
        c = d[a];
        b = b(c);
        b != c && null != b && $jscomp.defineProperty(d, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, d) {
        return $jscomp.findInternal(this, a, d).v
    }
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(a) {
    var b = 0;
    return function() {
        return b < a.length ? {
            done: !1,
            value: a[b++]
        } : {
            done: !0
        }
    }
};
$jscomp.arrayIterator = function(a) {
    return {
        next: $jscomp.arrayIteratorImpl(a)
    }
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.SymbolClass = function(a, b) {
    this.$jscomp$symbol$id_ = a;
    $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: b
    })
};
$jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
};
$jscomp.Symbol = function() {
    function a(d) {
        if (this instanceof a) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (d || "") + "_" + b++, d)
    }
    var b = 0;
    return a
}();
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.iterator;
    a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var a = $jscomp.global.Symbol.asyncIterator;
    a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
    $jscomp.initSymbolAsyncIterator = function() {}
};
$jscomp.iteratorPrototype = function(a) {
    $jscomp.initSymbolIterator();
    a = {
        next: a
    };
    a[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return a
};
$jscomp.iteratorFromArray = function(a, b) {
    $jscomp.initSymbolIterator();
    a instanceof String && (a += "");
    var d = 0,
        c = {
            next: function() {
                if (d < a.length) {
                    var e = d++;
                    return {
                        value: b(e, a[e]),
                        done: !1
                    }
                }
                c.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return c.next()
            }
        };
    c[Symbol.iterator] = function() {
        return c
    };
    return c
};
$jscomp.polyfill("Array.prototype.keys", function(a) {
    return a ? a : function() {
        return $jscomp.iteratorFromArray(this, function(a) {
            return a
        })
    }
}, "es6", "es3");
var loading = '<div class="loading"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
$("span.icon-undo").click(function() {
    $(this).parents(".tap-content").append(loading)
});

function tozero(a) {
    10 > parseInt(a.text()) && a.text(0 + a.text());
    return a.text()
}
var betPatternList = {
    1E5: "100K",
    25E4: "250K",
    5E5: "500K",
    1E6: "1000K",
    2E6: "2000K",
    3E6: "3000K",
    5E6: "5000K",
    1E7: "10M",
    2E7: "20M",
    3E7: "30M",
    5E7: "50M",
    1E8: "100M",
    2E8: "200M",
    3E8: "300M",
    5E8: "500M",
    1E9: "1000M"
};
$(document).ready(function() {
    $(".list-item").click(function() {
        $(".list-item").removeClass("active");
        $(this).addClass("active")
    });
    $(".nav-tab>li").click(function() {
        $(this).parent().children().removeClass("active");
        $(this).addClass("active");
        var a = $(this).data("tabs");
        $(this).parent().siblings($(".block")).find($(".tab-pane")).removeClass("active");
        $(a).addClass("active")
    });
    $("#Game_form input[type=radio]").bind("click", function() {
        $thisObj = $(this);
        1 == $thisObj.val() ? ($thisObj.prop("checked", !1), $thisObj.val(0)) :
            ($("#Game_form input[type=radio][name=" + $thisObj.attr("name") + "]").val(0), $thisObj.val(1))
    });
    var a = $.urlParam("game");
    $('.list-item[game="' + a + '"]').addClass("active");
    a = $('.list-item[game="' + a + '"]').children(".list-item-name").text();
    exchangeChart = new ExchangeChart(a);
    a = {
        autoclose: !0,
        format: "yyyy-mm-dd",
        startDate: "-90d",
        endDate: "0d"
    };
    $("#history_form [name=start]").datepicker(a).datepicker("setDate", "today").on("changeDate", function(a) {
        a.date && (a = a.date, (new Date($("#history_form [name=end]").val())).getTime() <
            a.getTime() && $("#history_form [name=end]").datepicker("setDate", a))
    });
    $("#history_form [name=end]").datepicker(a).datepicker("setDate", "today").on("changeDate", function(a) {
        if (a.date) {
            a = a.date;
            var b = new Date($("#history_form [name=start]").val());
            a.getTime() < b.getTime() && $("#history_form [name=start]").datepicker("setDate", a)
        }
    });
    "undefined" !== typeof betPatternList && (a = new $($("#Game_form select option")[0]), $("#Game_form select option").remove(), $("#Game_form select").append(a), Object.keys(betPatternList).forEach(function(a) {
        $("#Game_form select").append("<option value='" +
            a + "'>" + betPatternList[a] + "</option>")
    }))
});
var exchangeChart;

function font_s(a, b) {
    a = $(a).parent().parent().parent().parent().find("table");
    var d = parseInt(a.css("font-size"));
    "add" == b ? d++ : d--;
    a.css("font-size", d + "px")
}

function myrefresh() {
    window.location.reload()
}
$("#table-arrow").click(function() {
    var a = $(this).parent().parent().parent().parent().find("table");
    a.hasClass("mode1") ? a.removeClass("mode1") : a.addClass("mode1")
});
var temp = "";
$(".fullScreen input").click(function() {
    var a = $(this).parents(".section");
    1 == $(this).prop("checked") ? (temp = a.parent().prop("class"), $(".section").addClass("hide"), a.removeClass("hide"), a.parent().prop("class", "col-md-12 full")) : (a.parent().removeClass("full"), $(".section").removeClass("hide"), a.parent().removeClass("col-md-12").addClass(temp))
});

function lightBox(a) {
    $(".lightBox").addClass("active");
    $(".lightBox-panel").removeClass("active");
    $(a).addClass("active")
}

function lightBoxClose() {
    $(".lightBox , .lightBox-panel").removeClass("active")
}
$(".lightBox-close , .lightbox-black").click(function() {
    0 < $(".lightBox-panel.not_auto_close.active").length || lightBoxClose()
});
var ExchangeChart = function(a) {
    function b(a) {
        var b = f.options.annotation.annotations.length,
            d = {
                type: "line",
                drawTime: "afterDraw",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: a.startTime,
                borderColor: "rgba(116, 116, 116, 1)",
                borderWidth: 2,
                label: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    content: MessageType.getText("end_of_purchase"),
                    fontStyle: "normal",
                    fonnColor: "#8ba4c2",
                    fontSize: 11,
                    xAdjust: 29,
                    cornerRadius: 0,
                    position: "top",
                    enabled: !0
                }
            },
            h = {
                type: "line",
                drawTime: "afterDraw",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: a.stopTime,
                borderColor: "rgba(136, 136, 136, 1)",
                borderWidth: 2,
                label: {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    content: MessageType.getText("countdown"),
                    fontStyle: "normal",
                    fonnColor: "#8ba4c2",
                    fontSize: 11,
                    xAdjust: -44,
                    cornerRadius: 0,
                    position: "top",
                    enabled: !0
                }
            },
            c = {
                type: "line",
                drawTime: "afterDraw",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: a.gameTime,
                borderColor: "rgba(116, 116, 116, 1)",
                borderWidth: 2,
                label: {
                    backgroundColor: "rgba(40, 145, 189, 0.5)",
                    content: a.gameLabelText,
                    fontStyle: "normal",
                    fonnColor: "#8ba4c2",
                    fontSize: 11,
                    cornerRadius: 0,
                    position: "bottom",
                    enabled: !0
                }
            };
        f.options.annotation.annotations.splice(0, 1, {
            type: "box",
            drawTime: "afterDraw",
            xScaleID: "x-axis-0",
            xMin: a.startTime + 50,
            xMax: a.stopTime - 50,
            backgroundColor: "rgba(33, 95, 158, 0.1)",
            borderWidth: 0
        });
        f.options.annotation.annotations.splice(1, 1, h);
        f.options.annotation.annotations.splice(2, 1, d);
        f.options.annotation.annotations.splice(3, 1, c);
        4 < b && setTimeout(function() {
            f.options.annotation.annotations.splice(4, b - 4)
        }, 1E4)
    }
    $("#game-name").html(a);
    var d = [];
    this.tmp = {};
    this.gameTime = this.stopTime = this.startTime = 0;
    var c = -9E4,
        e = 0;
    c = -11E4;
    var g = null,
        l = null;
    this.gameLabelText = "";
    var k = this,
        f = {
            type: "line",
            data: {
                datasets: [{
                    label: "chart",
                    backgroundColor: "",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 1)",
                    pointRadius: 0,
                    lineTension: .1,
                    fill: !0,
                    cubicInterpolationMode: "monotone",
                    data: d
                }]
            },
            options: {
                title: {
                    display: !1
                },
                maintainAspectRatio: !1,
                legend: {
                    display: !1
                },
                tooltips: {
                    enabled: !1
                },
                hover: {
                    intersect: !1,
                    enabled: !0,
                    mode: "index",
                    animationDuration: 0
                },
                scales: {
                    xAxes: [{
                        type: "realtime",
                        fontColor: "#ffffff",
                        realtime: {
                            duration: 18E4,
                            refresh: 100,
                            delay: c,
                            ttl: 36E6,
                            onRefresh: function(a) {
                                e = 1E3 * Math.floor(Date.now() / 1E3);
                                var c = a.scales["x-axis-0"].max - a.scales["x-axis-0"].min;
                                d = [];
                                step = 1E3 * (Math.floor(c / 1E3 / 200) || 1);
                                c = Math.floor(a.scales["x-axis-0"].min / step) * step;
                                for (var h = 0; 200 >= h; h++) {
                                    var g = 1E3 * Math.floor(c / 1E3) + h * step;
                                    k.tmp[g] && d.push({
                                        x: g,
                                        y: k.tmp[g]
                                    })
                                }
                                f.data.datasets[0].data = d;
                                a.update({
                                    duration: 0
                                });
                                0 < d.length ? (c = a.getDatasetMeta(0), c = c.data[c.data.length - 1]._model, $(".now-data").css("top",
                                    c.y + 10), c = d[d.length - 1].y, $(".now-data b").text(c.slice(0, -2)), $(".now-data i").text(c.slice(-2))) : $(".now-data").css("top", "-100%");
                                a = a.config.options.annotation.annotations[2].value;
                                c = (k.startTime - e) / 1E3;
                                c = 60 === c ? 0 : c;
                                e >= a && b(k);
                                $("#time").text(c);
                                f.options.annotation.annotations[1].label.content = MessageType.getText("countdown") + k.lastSeconds + " " + MessageType.getText("sec")
                            }
                        },
                        time: {
                            minUnit: "millisecond",
                            displayFormats: {
                                millisecond: "HH:mm:ss.SSS",
                                second: "HH:mm:ss",
                                minute: "HH:mm:ss",
                                hour: "hA",
                                day: "MMM D",
                                week: "ll",
                                month: "MMM YYYY",
                                quarter: "[Q]Q - YYYY",
                                year: "YYYY"
                            }
                        },
                        gridLines: {
                            color: "rgba(102, 175, 218, 0.3)",
                            zeroLineColor: "rgba(47, 48, 53, 1)",
                            drawBorder: !0,
                            lineWidth: 1
                        },
                        ticks: {
                            fontColor: "rgba(199, 199, 199, 1)"
                        }
                    }],
                    yAxes: [{
                        type: "linear",
                        display: !0,
                        position: "right",
                        gridLines: {
                            color: "rgba(102, 175, 218, 0.3)",
                            zeroLineColor: "rgba(47, 48, 53, 1)",
                            drawBorder: !0,
                            lineWidth: 1,
                            offsetGridLines: !0
                        },
                        scaleLabel: {
                            display: !1
                        },
                        ticks: {
                            fontColor: "rgba(199, 199, 199, 1)"
                        }
                    }]
                },
                pan: {
                    enabled: !0,
                    mode: "x",
                    rangeMax: {
                        x: 36E5
                    },
                    rangeMin: {
                        x: c
                    },
                    onPan: function(a) {
                        0 < d.length && (g.options.pan.rangeMax.x = d.slice(-1)[0].x - d[0].x + c)
                    }
                },
                zoom: {
                    enabled: !1
                },
                annotation: {
                    events: ["click"],
                    dblClickSpeed: 350,
                    annotations: []
                }
            }
        };
    this.setStartTime = function(a) {
        this.startTime = a;
        b(this)
    };
    this.setStopTime = function(a) {
        this.stopTime = a;
        b(this)
    };
    this.setGameTime = function(a) {
        this.gameTime = a;
        b(this)
    };
    this.setGameLabel = function(a) {
        this.gameLabelText = a;
        f.options.annotation.annotations[3].label.content = a
    };
    l = $("#chart-view").get(0).getContext("2d");
    g = new Chart(l,
        f);
    b(this);
    $(window).on("resize", function() {
        var a = $("#chart-view").height();
        a = l.createLinearGradient(0, 0, 0, a - 50);
        a.addColorStop(0, "rgba(39, 144, 210, 0.5)");
        a.addColorStop(.8, "rgba(39, 144, 210, 0.1)");
        a.addColorStop(.95, "rgba(39, 144, 210, 0.025)");
        a.addColorStop(1, "rgba(39, 144, 210, 0)");
        f.data.datasets[0].backgroundColor = a
    }).resize()
};
ExchangeChart.prototype.init = function(a) {
    for (var b = 0; b < a.length; b++) this.addNewData(a[b])
};
ExchangeChart.prototype.resize = function() {};
ExchangeChart.prototype.chart_scale = function(a) {};
ExchangeChart.prototype.addBuyValue = function(a) {
    this.markline_data.push({
        yAxis: a,
        label: {
            show: !0,
            position: "end",
            rotate: 180,
            color: "red",
            fontSize: 14,
            padding: 5
        },
        lineStyle: {
            type: "dashed",
            color: "red"
        }
    })
};
ExchangeChart.prototype.addNewData = function(a, b) {
    b = void 0 === b ? !1 : b;
    timestamp = 1E3 * moment(a.time).format("X");
    if (b || !this.tmp[timestamp]) this.tmp[timestamp] = a.value
};
ExchangeChart.prototype.setLastSeconds = function(a) {
    this.lastSeconds = a
};