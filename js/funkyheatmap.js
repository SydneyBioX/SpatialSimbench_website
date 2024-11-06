

var t = {};
t = d3;
var e = {};

function o(...t) {
    return t.map((t => (t && !Array.isArray(t) && (t = function(t) {
        const e = Object.getOwnPropertyNames(t),
            o = t[e[0]].length,
            r = [];
        for (let i = 0; i < o; i++) {
            let o = {};
            for (let r of e) o[r] = t[r][i];
            r.push(o)
        }
        return r
    }(t)), t)))
}
e = _;
class r {
    constructor(t, e) {
        ({
            id: this.id,
            name: this.name,
            geom: this.geom,
            group: this.group,
            palette: this.palette,
            width: this.width,
            label: this.label,
            overlay: this.overlay,
            options: this.options
        } = t);
        let o = typeof e;
        var r;
        if (("number" == typeof(r = e) || "string" == typeof r && !Number.isNaN(r) && !Number.isNaN(parseFloat(r))) && (o = "number", this.numeric = !0), void 0 === this.name && (this.name = this.id), void 0 === this.geom && (this.geom = "number" === o ? "funkyrect" : "text"), void 0 === this.palette && ("pie" === this.geom && (this.palette = "categorical"), this.numeric && (this.palette = "numerical")), void 0 === this.width && "bar" === this.geom && (this.width = 4), "image" === this.geom && void 0 === this.width) throw "Please, specify width for column with geom=image";
        void 0 === this.options && (this.options = {}), this.sortState = null
    }
    maybeCalculateStats(e, o, r) {
        let i = [0, 1];
        o && (i = t.extent(e, (t => +t[this.id]))), [this.min, this.max] = i, this.range = this.max - this.min, this.scale = t.scaleLinear().domain(i), r && (this.colorScale = t.scaleLinear().domain([0, e.length - 1]))
    }
    sort() {
        return "desc" === this.sortState ? (this.sortState = "asc", t.ascending) : (this.sortState = "desc", t.descending)
    }
}

function i(t, e, o, i, a) {
    const s = t[0];
    return e.map(((e, n) => {
        const l = o ? o[n] : {};
        return l.id = e, (e = new r(l, s[e])).maybeCalculateStats(t, i, a), e
    }))
}
const a = {
    numerical: {
        //Blues: ["#011636", "#08306B", "#08519C", "#2171B5", "#4292C6", "#6BAED6", "#9ECAE1", "#C6DBEF", "#DEEBF7", "#F7FBFF"],
        Blues: ["#6ABAC4", "#71BDC7", "#79C1CA", "#81C4CD", "#89C8D0", "#91CCD3", "#99CFD6", "#A0D3D9", "#A8D7DC", "#B0DADF", "#B8DEE3", "#C0E1E6", 
            "#C8E5E9", "#CFE9EC", "#D7ECEF", "#DFF0F2", "#E7F4F5", "#EFF7F8", "#F7FBFB"],
        Greens: ["#00250f", "#00441B", "#006D2C", "#238B45", "#41AB5D", "#74C476", "#A1D99B", "#C7E9C0", "#E5F5E0"],
        Greys: ["#000000", "#252525", "#525252", "#737373", "#969696", "#BDBDBD", "#D9D9D9", "#F0F0F0"],
        //Reds: ["#CB181D", "#EF3B2C", "#FB6A4A", "#FC9272", "#FCBBA1", "#FEE0D2", "#FFF5F0"],
        Reds: ["#FA8072", "#FA8679", "#FA8D80", "#FA9488", "#FB9A8F", "#FBA197", "#FBA89E", "#FBAEA5", "#FCB5AD", "#FCBCB4", "#FCC2BC", "#FCC9C3",
            "#FDD0CB", "#FDD6D2", "#FDDDD9", "#FDE4E1", "#FEEAE8", "#FEF1F0", "#FEF8F7"],
        Yellows: ["#FFE5B4", "#FFE6B7", "#FFE7BB", "#FFE9BF", "#FFEAC3", "#FFEBC7", "#FFEDCB", "#FFEECF", "#FFEFD3", "#FFF1D7", 
            "#FFF2DB", "#FFF4DF", "#FFF5E3", "#FFF6E7", "#FFF8EB", "#FFF9EF", "#FFFAF3", "#FFFCF7", "#FFFDFB"],
        YlOrBr: ["#EC7014", "#FE9929", "#FEC44F", "#FEE391", "#FFF7BC", "#FFFFE5"]
    },
    categorical: {
        Set1: ["#E41A1C", "#377EB8", "#4DAF4A", "#984EA3", "#FF7F00", "#FFFF33", "#A65628", "#F781BF", "#999999"],
        Set2: ["#66C2A5", "#FC8D62", "#8DA0CB", "#E78AC3", "#A6D854", "#FFD92F", "#E5C494", "#B3B3B3"],
        Set3: ["#8DD3C7", "#FFFFB3", "#BEBADA", "#FB8072", "#80B1D3", "#FDB462", "#B3DE69", "#FCCDE5", "#D9D9D9", "#BC80BD", "#CCEBC5", "#FFED6F"],
        Dark2: ["#1B9E77", "#D95F02", "#7570B3", "#E7298A", "#66A61E", "#E6AB02", "#A6761D", "#666666"]
    }
};

function s(e, o) {
    o = {
        numerical: "Blues",
        categorical: "Set1",
        ...o
    }, e.forEach((e => {
        if (e.palette) {
            let r, i, s = o[e.palette];
            if (void 0 === s && (s = e.palette), a.numerical[s]) r = a.numerical[s];
            else if (a.categorical[s]) r = a.categorical[s];
            else if (Array.isArray(s)) {
                const t = s[0];
                if (!("string" == typeof t || t instanceof String)) throw `Palette definition ${s} is not recognized. Expected are: array of colors, array of color-name pairs.`;
                r = s
            } else {
                if (!Array.isArray(s.colors) || !Array.isArray(s.names)) {
                    throw `Palette ${s} not defined. Use one of ${[...Object.getOwnPropertyNames(a.numerical),...Object.getOwnPropertyNames(a.categorical)].join(", ")}.`
                }
                r = s.colors, i = s.names
            }
            if (e.numeric) {
                let o = e.scale;
                e.colorScale && (o = e.colorScale);
                const [i, a] = o.domain(), s = (a - i) / (r.length - 1), n = [...t.range(i, a, s), a];
                e.palette = t.scaleLinear().domain(n).range(r)
            }
            if ("pie" === e.geom) {
                const o = t.range(r.length);
                e.palette = t.scaleOrdinal().domain(o).range(r), e.palette.colors = r, e.palette.colorNames = i
            }
        }
    }))
}
const n = {
        text: (e, o, r, i) => {
            const a = t.create("svg:text").attr("dominant-baseline", "middle").attr("y", i.rowHeight / 2).style("fill", i.theme.textColor).text(e);
            return i.fontSize && a.attr("font-size", i.fontSize), a
        },
        bar: (e, o, r, i) => {
            const a = r.palette(o);
            let s = (e = r.scale(e)) * r.width * i.geomSize;
            return 0 === s && (s = i.minGeomSize), t.create("svg:rect").classed("fh-geom", !0).attr("x", i.geomPadding).attr("y", i.geomPadding).attr("width", s.toFixed(2)).attr("height", i.geomSize).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", a)
        },
        circle: (e, o, r, i) => {
            const a = r.palette(o);
            let s = (e = r.scale(e)) * i.geomSize / 2;
            return 0 === s && (s = i.minGeomSize), t.create("svg:circle").classed("fh-geom", !0).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", a).attr("cx", i.rowHeight / 2).attr("cy", i.rowHeight / 2).attr("r", s.toFixed(2))
        },
        rect: (e, o, r, i) => {
            const a = r.palette(o);
            return e = r.scale(e), t.create("svg:rect").classed("fh-geom", !0).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", a).attr("x", i.geomPadding).attr("y", i.geomPadding).attr("width", i.geomSize).attr("height", i.geomSize)
        },
        funkyrect: (e, o, r, i) => {
            let a = r.scale(e);
            const s = r.palette(o);
            if (a < i.midpoint) {
                let o = (.9 * (e = r.scale.copy().range([0, .5]).domain([r.min, r.min + r.range * i.midpoint])(e)) + .1) * i.geomSize - i.geomPadding;
                return o <= 0 && (o = i.minGeomSize), t.create("svg:circle").classed("fh-geom", !0).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", s).attr("cx", i.rowHeight / 2).attr("cy", i.rowHeight / 2).attr("r", o.toFixed(2))
            }
            const n = (.9 - .8 * (e = r.scale.copy().range([.5, 1]).domain([r.min + r.range * i.midpoint, r.max])(e))) * i.geomSize;
            return t.create("svg:rect").classed("fh-geom", !0).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", s).attr("x", i.geomPadding).attr("y", i.geomPadding).attr("width", i.geomSize).attr("height", i.geomSize).attr("rx", n.toFixed(2)).attr("ry", n.toFixed(2))
        },
        pie: (e, o, r, i) => {
            let a = 0,
                s = 0;
            if (e.forEach(((t, e) => {
                    t > 0 && (a += 1, s = e)
                })), 1 === a) {
                const e = r.palette(s);
                return t.create("svg:circle").classed("fh-geom", !0).style("stroke", i.theme.strokeColor).style("stroke-width", 1).style("fill", e).attr("cx", i.rowHeight / 2).attr("cy", i.rowHeight / 2).attr("r", i.geomSize / 2)
            }
            const n = t.pie().sortValues(null)(e),
                l = t.create("svg:g");
            return l.classed("fh-geom", !0), l.selectAll("arcs").data(n).enter().append("path").attr("d", t.arc().innerRadius(0).outerRadius(i.geomSize / 2)).attr("fill", ((t, e) => r.palette(e))).style("stroke", i.theme.strokeColor).style("stroke-width", 1).attr("transform", `translate(${i.rowHeight/2}, ${i.rowHeight/2})`), l
        },
        image: function(e, o, r, i) {
            return t.create("svg:image").attr("y", i.geomPadding).attr("href", e).attr("height", i.geomSize).attr("width", r.width).attr("preserveAspectRatio", "xMidYMid")
        }
    },
    l = {
        rowHeight: 27,
        padding: 5,
        geomPadding: 1.5,
        columnRotate: 30,
        midpoint: .8,
        legendFontSize: 7,
        legendTicks: [0, .2, .4, .6, .8, 1],
        labelGroupsAbc: !1,
        colorByRank: !1,
        minGeomSize: .25,
        theme: {
            oddRowBackground: "white",
            evenRowBackground: "#eee",
            textColor: "black",
            strokeColor: "#555",
            headerColor: "#555",
            hoverColor: "#1385cb"
        }
    };
class d {
    constructor(o, r, i, a, s, n, d, h, g) {
        this.rowGroupKey = "__group", this.data = o, this.columnInfo = r, this.columnGroups = t.index(i, (t => t.group)), this.rowInfo = a, this.rowGroups = t.index(s, (t => t.group)), this.palettes = n, this.removedEntries = d, this.options = e.merge(l, h), this.calculateOptions(), this.svg = g
    }
    calculateOptions() {
        this.options.geomSize = this.options.rowHeight - 2 * this.options.geomPadding, this.renderGroups = !1, this.rowGroupOrder = [], 0 !== this.rowInfo.length && void 0 !== this.rowInfo[0].group || (this.rowInfo = this.data.map((t => ({
            group: ""
        })))), this.data.forEach(((t, e) => {
            const o = this.rowInfo[e].group;
            t[this.rowGroupKey] = o, -1 === this.rowGroupOrder.indexOf(o) && this.rowGroupOrder.push(o)
        }));
        const t = this.rowInfo[0].group,
            e = this.rowGroups.get(t);
        void 0 !== e && void 0 !== e.Group && (this.renderGroups = !0)
    }
    renderStripedRows() {
        const t = this.options;
        let e, o = 0,
            r = 0;
        this.data.forEach(((i, a) => {
            this.renderGroups && i[this.rowGroupKey] !== e && (o += 1, r = 0), e = i[this.rowGroupKey], this.body.append("rect").classed("row", !0).attr("height", t.rowHeight).attr("x", 0).attr("y", (a + o) * t.rowHeight).attr("fill", r % 2 == 0 ? t.theme.evenRowBackground : t.theme.oddRowBackground), r += 1
        }))
    }
    renderData() {
        const e = this.options;
        let o, r = 0;
        e.bodyHeight = this.data.length * e.rowHeight, this.renderGroups && (e.bodyHeight += this.rowGroups.size * e.rowHeight), this.columnInfo.forEach(((i, a) => {
            let s, l = 0,
                d = 0,
                h = 0 === a;
            "text" !== i.geom && "bar" !== i.geom || (d = e.padding), r += d, o && i.group && o !== i.group && (r += 2 * e.padding), e.colorByRank && i.numeric && (s = t.rank(this.data, (t => +t[i.id])));
            let g, c = 0;
            this.data.forEach(((o, a) => {
                let p = 0;
                if (this.renderGroups && o[this.rowGroupKey] !== g && (c += 1), this.renderGroups && h && o[this.rowGroupKey] !== g) {
                    let t = n.text(this.rowGroups.get(o[this.rowGroupKey]).Group, null, i, e);
                    t.attr("transform", `translate(${r-d}, ${(a+c-1)*e.rowHeight})`).attr("font-weight", "bold").attr("dominant-baseline", "hanging"), this.body.append((() => t.node())), p = t.node().getBBox().width
                }
                g = o[this.rowGroupKey];
                let m, f = o[i.id],
                    u = f;
                if (i.numeric && (f = +f), e.colorByRank && i.numeric && (u = s[a]), i.label && (m = o[i.label]), void 0 === n[i.geom]) throw `Geom ${i.geom} not implemented. Use one of ${Object.keys(n).join(", ")}.`;
                let y, w = n[i.geom](f, u, i, e);
                if (m) {
                    const o = t.hsl(i.palette(u)).l > .5 ? "black" : "white",
                        r = t.create("svg:g").classed("fh-geom", !0);
                    r.append((() => w.classed("fh-geom", !1).classed("fh-orig-geom", !0).node())), r.append("text").attr("x", e.rowHeight / 2).attr("y", e.rowHeight / 2).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", o).text(m), w = r
                }
                if (w.attr("transform", `translate(${r}, ${(a+c)*e.rowHeight})`), i.numeric && !m) {
                    let t = (+f).toFixed(4);
                    t = t.replace(/\.?0+$/, ""), w.datum({
                        tooltip: t
                    })
                }
                if ("pie" === i.geom) {
                    const t = "padding: 2px 4px; border-bottom: 1px solid #aaa; border-right: 1px solid #aaa";
                    let e = `<table style="${"margin: 5px; border-top: 1px solid #aaa; border-left: 1px solid #aaa; font-size: 80%"}">${i.palette.colorNames.map(((e,o)=>`<tr><td style="${t}">${e}:</td><td style="${t}">${f[o]}</td></tr>`)).join("")}</table>`;
                    w.datum({
                        tooltip: e
                    })
                }
                if (this.body.append((() => w.node())), y = m ? w.select(".fh-orig-geom").node().getBBox().width : w.node().getBBox().width, "image" === i.geom && (y = i.width), y > p && (p = y), p > l && (l = p), m) {
                    m = w.select("text");
                    let t = 100;
                    for (let o = 0; o < 8; o++) {
                        const {
                            width: o
                        } = m.node().getBBox();
                        if (!(o > e.geomSize - 2 * e.geomPadding)) break;
                        t -= 5, m.attr("font-size", `${t}%`)
                    }
                }
            })), "bar" === i.geom && (l = e.geomSize * i.width + e.geomPadding, this.body.append("line").attr("x1", r + l).attr("x2", r + l).attr("y1", this.renderGroups ? e.rowHeight : 0).attr("y2", e.bodyHeight).attr("stroke", e.theme.strokeColor).attr("stroke-dasharray", "5 5").attr("opacity", .5)), i.widthPx = Math.max(l, e.rowHeight), i.widthPx = Math.round(i.widthPx), i.offset = r, r += i.widthPx + d, o = i.group
        })), e.bodyWidth = r + e.padding
    }
    renderHeader() {
        const e = this.options;
        let o = 0,
            i = 0,
            a = !1;
        const n = this.header.append("g"),
            l = this.header.append("g").attr("transform", `translate(0, ${e.rowHeight+e.padding})`),
            d = t.group(this.columnInfo, (t => t.group));
        let h = 0;
        d.forEach(((t, o) => {
            if (!o) return;
            const i = this.columnGroups.get(o);
            if (!i.level1 || !i.palette) return;
            const a = new r({
                id: "_group",
                palette: i.palette
            }, 1);
            a.maybeCalculateStats(null, !1), s([a], this.palettes);
            const l = t[t.length - 1],
                d = t[0].offset,
                g = l.offset + l.widthPx + e.geomPadding,
                c = a.palette(.5);
            n.append("rect").attr("x", d).attr("y", 0).attr("width", g - d).attr("height", e.rowHeight).attr("fill", c).attr("opacity", 0.6);
            const p = n.append("text").attr("x", d + (g - d) / 2).attr("y", e.rowHeight / 2).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", e.theme.headerColor).text(i.level1);
            if (e.fontSize && p.attr("font-size", e.fontSize), e.labelGroupsAbc) {
                const t = String.fromCharCode("a".charCodeAt(0) + h),
                    o = n.append("text").attr("x", d + e.padding).attr("y", e.rowHeight / 2).attr("dominant-baseline", "central").attr("fill", e.theme.headerColor).text(`${t})`);
                e.fontSize && o.attr("font-size", e.fontSize)
            }
            h += 1
        })), this.columnInfo.forEach(((t, r) => {
            const s = l.append("g").attr("transform", `rotate(${-e.columnRotate})`).classed(`column-${r}`, !0);
            s.append("text").attr("x", 0).attr("y", 0).attr("font-size", e.fontSize).style("fill", e.theme.textColor).style("cursor", "pointer").datum(t).on("click", this.onColumnClick.bind(this)).on("mouseenter", (() => {
                s.style("text-decoration", "underline dashed").style("fill", e.theme.hoverColor)
            })).on("mouseleave", (() => {
                s.style("text-decoration", "").style("fill", e.theme.textColor)
            })).text(t.name);
            const n = s.node().getBBox().width;
            !a && n < t.widthPx - 2 * e.padding ? t.rotate = !1 : (t.rotate = !0, a = !0);
            const {
                width: d,
                height: h
            } = s.node().getBoundingClientRect();
            h > o && (o = h), t.offset + t.widthPx / 2 + d > i && (i = t.offset + t.widthPx / 2 + d + e.padding)
        })), this.columnInfo.forEach(((t, r) => {
            let i = t.offset + t.widthPx / 2,
                a = t.rotate ? -e.columnRotate : 0;
            this.header.select(`.column-${r}`).attr("transform", `translate(${i}, ${o-2*e.padding}) rotate(${a})`), t.rotate ? l.append("line").attr("x1", i).attr("x2", i).attr("y1", o - 2).attr("y2", o - 2 - e.padding).attr("stroke", e.theme.strokeColor) : l.select(`.column-${r} text`).attr("text-anchor", "middle")
        })), this.options.width = i, this.options.headerHeight = o + e.rowHeight + e.padding
    }
    renderLegend() {
        const e = this.options;
        let o = 0;
        const i = this.footer.append("g");
        let a = 0,
            l = 0,
            d = !1;
        if (t.some(this.columnInfo, (t => "funkyrect" === t.geom))) {
            d = !0;
            for (let t of this.columnInfo)
                if ("funkyrect" === t.geom) {
                    a = t.offset;
                    break
                } i.append("text").attr("x", l + e.geomSize / 2).attr("y", e.rowHeight + e.padding).attr("font-size", e.legendFontSize).style("fill", e.theme.textColor).text("Score:");
            const o = new r({
                id: "_legend",
                palette: "Greys"
            }, 1);
            o.maybeCalculateStats(null, !1), s([o]);
            const h = [...t.range(0, 1, .1), 1];
            for (let t of h) {
                let r = n.funkyrect(t, t, o, e);
                i.append((() => r.node()));
                const {
                    width: a,
                    height: s
                } = r.node().getBBox();
                r.attr("transform", `translate(${l}, ${1.5*e.rowHeight-s/2})`), e.colorByRank && r.style("fill", e.theme.oddRowBackground);
                let d = parseFloat(t.toFixed(3));
                e.legendTicks.indexOf(d) > -1 && (d = d.toFixed(1), "0.0" === d && (d = "0"), "1.0" === d && (d = "1"), i.append("text").attr("x", l + e.geomSize / 2 + e.geomPadding).attr("y", 2.5 * e.rowHeight + e.padding).attr("font-size", e.legendFontSize).attr("text-anchor", "middle").attr("dominant-baseline", "text-top").style("fill", e.theme.textColor).text(d)), l += a + 4 * e.geomPadding
            }
        }
        if (t.some(this.columnInfo, (t => "pie" === t.geom))) {
            const o = [];
            this.columnInfo.forEach((r => {
                if ("pie" != r.geom || void 0 === r.palette.colorNames) return;
                const s = JSON.stringify({
                    colors: r.palette.colors,
                    colorNames: r.palette.colorNames
                });
                if (o.indexOf(s) > -1) return;
                o.push(s), a + l < r.offset && (l += r.offset - a);
                const n = t.pie().endAngle(Math.PI)(Array(r.palette.colorNames.length).fill(1)),
                    d = i.append("g");
                d.attr("transform", `translate(${l}, ${1.5*e.rowHeight+e.geomPadding})`), d.selectAll("arcs").data(n).enter().append("path").attr("d", t.arc().innerRadius(0).outerRadius(e.geomSize / 2)).attr("fill", ((t, e) => r.palette(e))).style("stroke", e.theme.strokeColor).style("stroke-width", 1).attr("transform", `translate(${e.geomSize/2+e.geomPadding-.5}, 0)`), d.selectAll("text").data(n).enter().append("text").text(((t, e) => r.palette.colorNames[e])).attr("font-size", e.legendFontSize).attr("dominant-baseline", "central").style("fill", e.theme.textColor).attr("transform", (o => {
                    const r = t.arc().innerRadius(e.geomSize / 2).outerRadius(e.geomSize).centroid(o);
                    return r[0] += e.geomSize / 2 + 4 * e.geomPadding, `translate(${r})`
                })), d.selectAll("lines").data(n).enter().append("path").attr("d", (o => {
                    const r = t.arc().innerRadius(e.geomSize / 2).outerRadius(e.geomSize / 2 + 5).centroid(o),
                        i = t.arc().innerRadius(e.geomSize / 2).outerRadius(e.geomSize - 5).centroid(o);
                    return r[0] += e.geomSize / 2 + e.geomPadding, i[0] += e.geomSize / 2 + 3 * e.geomPadding, t.line()([r, i])
                })).style("stroke", e.theme.strokeColor).style("stroke-width", .5), l += e.geomSize / 2 + d.node().getBoundingClientRect().width + e.padding
            }))
        }
        if (this.removedEntries.length > 0) {
            const o = 2,
                r = Math.ceil(this.removedEntries.length / o),
                a = i.append("g").attr("transform", `translate(${l+e.padding}, ${e.rowHeight+e.padding})`);
            a.append("text").attr("font-size", e.legendFontSize).style("fill", e.theme.textColor).text("Not shown, insufficient data points:");
            let s = 0;
            t.range(o).forEach((t => {
                const o = this.removedEntries.slice(t * r, (t + 1) * r),
                    i = a.append("text").attr("y", e.padding).attr("font-size", e.legendFontSize).style("fill", e.theme.textColor);
                i.selectAll("texts").data(o).enter().append("tspan").text((t => t)).attr("x", s).attr("dy", "1.3em"), s += i.node().getBBox().width + e.padding
            })), l += a.node().getBBox().width + 2 * e.padding
        }
        const {
            height: h
        } = i.node().getBBox();
        h > o && (o = h);
        let g = l - e.padding;
        d && (g += e.geomSize), a + g > e.width && (g <= e.width ? a = e.width - g : (a = 0, e.width = l)), this.options.footerOffset = a, this.options.footerHeight = o + e.rowHeight
    }
    hideTooltip() {
        this.tooltip && this.tooltip.style("display", "none")
    }
    showTooltip(e, o) {
        void 0 === this.tooltip && (this.tooltip = t.select("body").append("div").style("z-index", 2e3).style("position", "absolute").style("background-color", "#333").style("color", "white").style("border", "solid").style("border-width", "1px").style("border-radius", "5px").style("padding", "3px 5px").style("display", "none"));
        this.tooltip.html(o).style("top", e[1] + 20 + "px").style("left", e[0] + 10 + "px").style("display", "block")
    }
    onMouseMove(e) {
        if (e.target) {
            let o = t.select(e.target);
            for (; !1 === o.classed("fh-geom") && o.node() != this.svg.node();) o = t.select(o.node().parentNode);
            const r = o.datum();
            if (r && r.tooltip) {
                const o = t.pointer(e, document.body);
                return void this.showTooltip(o, r.tooltip)
            }
        }
        this.hideTooltip()
    }
    onColumnClick(e) {
        const o = t.select(e.target),
            r = o.node().getBBox(),
            i = o.datum(),
            a = i.sort();
        let s = t.group(this.data, (t => t[this.rowGroupKey]));
        s = [].concat(...this.rowGroupOrder.map((e => t.sort(s.get(e), ((t, e) => ([t, e] = [t[i.id], e[i.id]], i.numeric && ([t, e] = [+t, +e]), a(t, e))))))), this.data = s, this.svg.selectChildren().remove(), this.render(), this.indicateSort(i, r)
    }
    indicateSort(t, e) {
        const o = this.options;
        this.sortIndicator = this.header.append("text").attr("font-size", 12).attr("fill", o.theme.hoverColor), "asc" === t.sortState ? this.sortIndicator.text("↑") : this.sortIndicator.text("↓"), this.sortIndicator.attr("text-anchor", "right").attr("dominant-baseline", "text-bottom");
        let r = t.offset + t.widthPx / 2 - 2 * o.padding,
            i = o.headerHeight - o.padding;
        t.rotate || (r -= e.width / 2, i -= e.height / 2, this.sortIndicator.attr("dominant-baseline", "central")), this.sortIndicator.attr("x", r).attr("y", i)
    }
    render() {
        this.header = this.svg.append("g"), this.body = this.svg.append("g"), this.footer = this.svg.append("g"), this.renderStripedRows(), this.renderData(), this.renderHeader(), this.renderLegend();
        const t = this.options;
        this.svg.attr("width", t.width), this.svg.attr("height", t.bodyHeight + t.headerHeight + t.footerHeight), this.renderGroups && this.header.attr("transform", `translate(0, ${t.rowHeight})`), this.body.selectAll(".row").attr("width", t.bodyWidth), this.body.attr("transform", `translate(0, ${t.headerHeight})`), this.footer.attr("transform", `translate(${t.footerOffset}, ${t.headerHeight+t.bodyHeight})`), this.svg.attr("style", ""), this.options.rootStyle && this.svg.attr("style", this.options.rootStyle)
    }
    listen() {
        this.svg.on("mousemove", this.onMouseMove.bind(this))
    }
}
var h = function(e, r, a = [], n = [], l = [], h, g = {}, c = !0, p = []) {
    [e, r, n, a, l] = o(e, r, n, a, l);
    const m = r.map((t => t.id));
    s(r = i(e, m, r, c, g.colorByRank), h);
    const f = t.select("body").append("svg").classed("funkyheatmap", !0).style("visibility", "hidden").style("position", "absolute").style("left", "-1000px"),
        u = new d(e, r, n, a, l, h, p, g, f);
    return u.render(), u.listen(), u.svg.remove(), u.svg.node()
};
export {
    h as
    default
};
//# sourceMappingURL=main.js.map