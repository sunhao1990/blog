/*
 * JQuery zTree core v3.5.35
 * http://treejs.cn/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2018-03-30
 */
(function (q) {
    var H, I, J, K, L, M, u, s = {}, v = {}, w = {}, N = {
        treeId: "",
        treeObj: null,
        view: {
            addDiyDom: null,
            autoCancelSelected: !0,
            dblClickExpand: !0,
            expandSpeed: "fast",
            fontCss: {},
            nameIsHTML: !1,
            selectedMulti: !0,
            showIcon: !0,
            showLine: !0,
            showTitle: !0,
            txtSelectedEnable: !1
        },
        data: {
            key: {isParent: "isParent", children: "children", name: "name", title: "", url: "url", icon: "icon"},
            simpleData: {enable: !1, idKey: "id", pIdKey: "pId", rootPId: null},
            keep: {parent: !1, leaf: !1}
        },
        async: {
            enable: !1, contentType: "application/x-www-form-urlencoded", type: "post",
            dataType: "text", url: "", autoParam: [], otherParam: [], dataFilter: null
        },
        callback: {
            beforeAsync: null,
            beforeClick: null,
            beforeDblClick: null,
            beforeRightClick: null,
            beforeMouseDown: null,
            beforeMouseUp: null,
            beforeExpand: null,
            beforeCollapse: null,
            beforeRemove: null,
            onAsyncError: null,
            onAsyncSuccess: null,
            onNodeCreated: null,
            onClick: null,
            onDblClick: null,
            onRightClick: null,
            onMouseDown: null,
            onMouseUp: null,
            onExpand: null,
            onCollapse: null,
            onRemove: null
        }
    }, x = [function (a) {
        var b = a.treeObj, c = f.event;
        b.bind(c.NODECREATED, function (b,
                                        c, h) {
            j.apply(a.callback.onNodeCreated, [b, c, h])
        });
        b.bind(c.CLICK, function (b, c, h, e, m) {
            j.apply(a.callback.onClick, [c, h, e, m])
        });
        b.bind(c.EXPAND, function (b, c, h) {
            j.apply(a.callback.onExpand, [b, c, h])
        });
        b.bind(c.COLLAPSE, function (b, c, h) {
            j.apply(a.callback.onCollapse, [b, c, h])
        });
        b.bind(c.ASYNC_SUCCESS, function (b, c, h, e) {
            j.apply(a.callback.onAsyncSuccess, [b, c, h, e])
        });
        b.bind(c.ASYNC_ERROR, function (b, c, h, e, m, f) {
            j.apply(a.callback.onAsyncError, [b, c, h, e, m, f])
        });
        b.bind(c.REMOVE, function (b, c, h) {
            j.apply(a.callback.onRemove,
                [b, c, h])
        });
        b.bind(c.SELECTED, function (b, c, h) {
            j.apply(a.callback.onSelected, [c, h])
        });
        b.bind(c.UNSELECTED, function (b, c, h) {
            j.apply(a.callback.onUnSelected, [c, h])
        })
    }], y = [function (a) {
        var b = f.event;
        a.treeObj.unbind(b.NODECREATED).unbind(b.CLICK).unbind(b.EXPAND).unbind(b.COLLAPSE).unbind(b.ASYNC_SUCCESS).unbind(b.ASYNC_ERROR).unbind(b.REMOVE).unbind(b.SELECTED).unbind(b.UNSELECTED)
    }], z = [function (a) {
        var b = e.getCache(a);
        b || (b = {}, e.setCache(a, b));
        b.nodes = [];
        b.doms = []
    }], A = [function (a, b, c, d, g, h) {
        if (c) {
            var k =
                e.getRoot(a), m = e.nodeChildren(a, c);
            c.level = b;
            c.tId = a.treeId + "_" + ++k.zId;
            c.parentTId = d ? d.tId : null;
            c.open = typeof c.open == "string" ? j.eqs(c.open, "true") : !!c.open;
            b = e.nodeIsParent(a, c);
            j.isArray(m) && !(b === !1 || typeof b == "string" && j.eqs(b, "false")) ? (e.nodeIsParent(a, c, !0), c.zAsync = !0) : (b = e.nodeIsParent(a, c, b), c.open = b && !a.async.enable ? c.open : !1, c.zAsync = !b);
            c.isFirstNode = g;
            c.isLastNode = h;
            c.getParentNode = function () {
                return e.getNodeCache(a, c.parentTId)
            };
            c.getPreNode = function () {
                return e.getPreNode(a, c)
            };
            c.getNextNode =
                function () {
                    return e.getNextNode(a, c)
                };
            c.getIndex = function () {
                return e.getNodeIndex(a, c)
            };
            c.getPath = function () {
                return e.getNodePath(a, c)
            };
            c.isAjaxing = !1;
            e.fixPIdKeyValue(a, c)
        }
    }], t = [function (a) {
        var b = a.target, c = e.getSetting(a.data.treeId), d = "", g = null, h = "", k = "", m = null, i = null,
            o = null;
        if (j.eqs(a.type, "mousedown")) k = "mousedown"; else if (j.eqs(a.type, "mouseup")) k = "mouseup"; else if (j.eqs(a.type, "contextmenu")) k = "contextmenu"; else if (j.eqs(a.type, "click")) if (j.eqs(b.tagName, "span") && b.getAttribute("treeNode" +
            f.id.SWITCH) !== null) d = j.getNodeMainDom(b).id, h = "switchNode"; else {
            if (o = j.getMDom(c, b, [{
                tagName: "a",
                attrName: "treeNode" + f.id.A
            }])) d = j.getNodeMainDom(o).id, h = "clickNode"
        } else if (j.eqs(a.type, "dblclick") && (k = "dblclick", o = j.getMDom(c, b, [{
            tagName: "a",
            attrName: "treeNode" + f.id.A
        }]))) d = j.getNodeMainDom(o).id, h = "switchNode";
        if (k.length > 0 && d.length == 0 && (o = j.getMDom(c, b, [{
            tagName: "a",
            attrName: "treeNode" + f.id.A
        }]))) d = j.getNodeMainDom(o).id;
        if (d.length > 0) switch (g = e.getNodeCache(c, d), h) {
            case "switchNode":
                e.nodeIsParent(c,
                    g) ? j.eqs(a.type, "click") || j.eqs(a.type, "dblclick") && j.apply(c.view.dblClickExpand, [c.treeId, g], c.view.dblClickExpand) ? m = H : h = "" : h = "";
                break;
            case "clickNode":
                m = I
        }
        switch (k) {
            case "mousedown":
                i = J;
                break;
            case "mouseup":
                i = K;
                break;
            case "dblclick":
                i = L;
                break;
            case "contextmenu":
                i = M
        }
        return {stop: !1, node: g, nodeEventType: h, nodeEventCallback: m, treeEventType: k, treeEventCallback: i}
    }], B = [function (a) {
        var b = e.getRoot(a);
        b || (b = {}, e.setRoot(a, b));
        e.nodeChildren(a, b, []);
        b.expandTriggerFlag = !1;
        b.curSelectedList = [];
        b.noSelection =
            !0;
        b.createdNodes = [];
        b.zId = 0;
        b._ver = (new Date).getTime()
    }], C = [], D = [], E = [], F = [], G = [], e = {
        addNodeCache: function (a, b) {
            e.getCache(a).nodes[e.getNodeCacheId(b.tId)] = b
        }, getNodeCacheId: function (a) {
            return a.substring(a.lastIndexOf("_") + 1)
        }, addAfterA: function (a) {
            D.push(a)
        }, addBeforeA: function (a) {
            C.push(a)
        }, addInnerAfterA: function (a) {
            F.push(a)
        }, addInnerBeforeA: function (a) {
            E.push(a)
        }, addInitBind: function (a) {
            x.push(a)
        }, addInitUnBind: function (a) {
            y.push(a)
        }, addInitCache: function (a) {
            z.push(a)
        }, addInitNode: function (a) {
            A.push(a)
        },
        addInitProxy: function (a, b) {
            b ? t.splice(0, 0, a) : t.push(a)
        }, addInitRoot: function (a) {
            B.push(a)
        }, addNodesData: function (a, b, c, d) {
            var g = e.nodeChildren(a, b);
            g ? c >= g.length && (c = -1) : (g = e.nodeChildren(a, b, []), c = -1);
            if (g.length > 0 && c === 0) g[0].isFirstNode = !1, i.setNodeLineIcos(a, g[0]); else if (g.length > 0 && c < 0) g[g.length - 1].isLastNode = !1, i.setNodeLineIcos(a, g[g.length - 1]);
            e.nodeIsParent(a, b, !0);
            c < 0 ? e.nodeChildren(a, b, g.concat(d)) : (a = [c, 0].concat(d), g.splice.apply(g, a))
        }, addSelectedNode: function (a, b) {
            var c = e.getRoot(a);
            e.isSelectedNode(a, b) || c.curSelectedList.push(b)
        }, addCreatedNode: function (a, b) {
            (a.callback.onNodeCreated || a.view.addDiyDom) && e.getRoot(a).createdNodes.push(b)
        }, addZTreeTools: function (a) {
            G.push(a)
        }, exSetting: function (a) {
            q.extend(!0, N, a)
        }, fixPIdKeyValue: function (a, b) {
            a.data.simpleData.enable && (b[a.data.simpleData.pIdKey] = b.parentTId ? b.getParentNode()[a.data.simpleData.idKey] : a.data.simpleData.rootPId)
        }, getAfterA: function (a, b, c) {
            for (var d = 0, e = D.length; d < e; d++) D[d].apply(this, arguments)
        }, getBeforeA: function (a,
                                 b, c) {
            for (var d = 0, e = C.length; d < e; d++) C[d].apply(this, arguments)
        }, getInnerAfterA: function (a, b, c) {
            for (var d = 0, e = F.length; d < e; d++) F[d].apply(this, arguments)
        }, getInnerBeforeA: function (a, b, c) {
            for (var d = 0, e = E.length; d < e; d++) E[d].apply(this, arguments)
        }, getCache: function (a) {
            return w[a.treeId]
        }, getNodeIndex: function (a, b) {
            if (!b) return null;
            for (var c = b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, g = c.length - 1; d <= g; d++) if (c[d] === b) return d;
            return -1
        }, getNextNode: function (a, b) {
            if (!b) return null;
            for (var c = b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, g = c.length - 1; d <= g; d++) if (c[d] === b) return d == g ? null : c[d + 1];
            return null
        }, getNodeByParam: function (a, b, c, d) {
            if (!b || !c) return null;
            for (var g = 0, h = b.length; g < h; g++) {
                var k = b[g];
                if (k[c] == d) return b[g];
                k = e.nodeChildren(a, k);
                if (k = e.getNodeByParam(a, k, c, d)) return k
            }
            return null
        }, getNodeCache: function (a, b) {
            if (!b) return null;
            var c = w[a.treeId].nodes[e.getNodeCacheId(b)];
            return c ? c : null
        }, getNodePath: function (a, b) {
            if (!b) return null;
            var c;
            (c = b.parentTId ? b.getParentNode().getPath() : []) && c.push(b);
            return c
        }, getNodes: function (a) {
            return e.nodeChildren(a, e.getRoot(a))
        }, getNodesByParam: function (a, b, c, d) {
            if (!b || !c) return [];
            for (var g = [], h = 0, k = b.length; h < k; h++) {
                var m = b[h];
                m[c] == d && g.push(m);
                m = e.nodeChildren(a, m);
                g = g.concat(e.getNodesByParam(a, m, c, d))
            }
            return g
        }, getNodesByParamFuzzy: function (a, b, c, d) {
            if (!b || !c) return [];
            for (var g = [], d = d.toLowerCase(), h = 0, k = b.length; h < k; h++) {
                var m = b[h];
                typeof m[c] == "string" && b[h][c].toLowerCase().indexOf(d) > -1 &&
                g.push(m);
                m = e.nodeChildren(a, m);
                g = g.concat(e.getNodesByParamFuzzy(a, m, c, d))
            }
            return g
        }, getNodesByFilter: function (a, b, c, d, g) {
            if (!b) return d ? null : [];
            for (var h = d ? null : [], k = 0, m = b.length; k < m; k++) {
                var f = b[k];
                if (j.apply(c, [f, g], !1)) {
                    if (d) return f;
                    h.push(f)
                }
                f = e.nodeChildren(a, f);
                f = e.getNodesByFilter(a, f, c, d, g);
                if (d && f) return f;
                h = d ? f : h.concat(f)
            }
            return h
        }, getPreNode: function (a, b) {
            if (!b) return null;
            for (var c = b.parentTId ? b.getParentNode() : e.getRoot(a), c = e.nodeChildren(a, c), d = 0, g = c.length; d < g; d++) if (c[d] === b) return d ==
            0 ? null : c[d - 1];
            return null
        }, getRoot: function (a) {
            return a ? v[a.treeId] : null
        }, getRoots: function () {
            return v
        }, getSetting: function (a) {
            return s[a]
        }, getSettings: function () {
            return s
        }, getZTreeTools: function (a) {
            return (a = this.getRoot(this.getSetting(a))) ? a.treeTools : null
        }, initCache: function (a) {
            for (var b = 0, c = z.length; b < c; b++) z[b].apply(this, arguments)
        }, initNode: function (a, b, c, d, e, h) {
            for (var k = 0, f = A.length; k < f; k++) A[k].apply(this, arguments)
        }, initRoot: function (a) {
            for (var b = 0, c = B.length; b < c; b++) B[b].apply(this, arguments)
        },
        isSelectedNode: function (a, b) {
            for (var c = e.getRoot(a), d = 0, g = c.curSelectedList.length; d < g; d++) if (b === c.curSelectedList[d]) return !0;
            return !1
        }, nodeChildren: function (a, b, c) {
            if (!b) return null;
            a = a.data.key.children;
            typeof c !== "undefined" && (b[a] = c);
            return b[a]
        }, nodeIsParent: function (a, b, c) {
            if (!b) return !1;
            a = a.data.key.isParent;
            typeof c !== "undefined" && (typeof c === "string" && (c = j.eqs(c, "true")), b[a] = !!c);
            return b[a]
        }, nodeName: function (a, b, c) {
            a = a.data.key.name;
            typeof c !== "undefined" && (b[a] = c);
            return "" + b[a]
        }, nodeTitle: function (a,
                                b) {
            return "" + b[a.data.key.title === "" ? a.data.key.name : a.data.key.title]
        }, removeNodeCache: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c) for (var d = 0, g = c.length; d < g; d++) e.removeNodeCache(a, c[d]);
            e.getCache(a).nodes[e.getNodeCacheId(b.tId)] = null
        }, removeSelectedNode: function (a, b) {
            for (var c = e.getRoot(a), d = 0, g = c.curSelectedList.length; d < g; d++) if (b === c.curSelectedList[d] || !e.getNodeCache(a, c.curSelectedList[d].tId)) c.curSelectedList.splice(d, 1), a.treeObj.trigger(f.event.UNSELECTED, [a.treeId, b]), d--, g--
        }, setCache: function (a,
                               b) {
            w[a.treeId] = b
        }, setRoot: function (a, b) {
            v[a.treeId] = b
        }, setZTreeTools: function (a, b) {
            for (var c = 0, d = G.length; c < d; c++) G[c].apply(this, arguments)
        }, transformToArrayFormat: function (a, b) {
            function c(b) {
                d.push(b);
                (b = e.nodeChildren(a, b)) && (d = d.concat(e.transformToArrayFormat(a, b)))
            }

            if (!b) return [];
            var d = [];
            if (j.isArray(b)) for (var g = 0, h = b.length; g < h; g++) c(b[g]); else c(b);
            return d
        }, transformTozTreeFormat: function (a, b) {
            var c, d, g = a.data.simpleData.idKey, h = a.data.simpleData.pIdKey;
            if (!g || g == "" || !b) return [];
            if (j.isArray(b)) {
                var k =
                    [], f = {};
                for (c = 0, d = b.length; c < d; c++) f[b[c][g]] = b[c];
                for (c = 0, d = b.length; c < d; c++) {
                    var i = f[b[c][h]];
                    if (i && b[c][g] != b[c][h]) {
                        var o = e.nodeChildren(a, i);
                        o || (o = e.nodeChildren(a, i, []));
                        o.push(b[c])
                    } else k.push(b[c])
                }
                return k
            } else return [b]
        }
    }, n = {
        bindEvent: function (a) {
            for (var b = 0, c = x.length; b < c; b++) x[b].apply(this, arguments)
        }, unbindEvent: function (a) {
            for (var b = 0, c = y.length; b < c; b++) y[b].apply(this, arguments)
        }, bindTree: function (a) {
            var b = {treeId: a.treeId}, c = a.treeObj;
            a.view.txtSelectedEnable || c.bind("selectstart",
                u).css({"-moz-user-select": "-moz-none"});
            c.bind("click", b, n.proxy);
            c.bind("dblclick", b, n.proxy);
            c.bind("mouseover", b, n.proxy);
            c.bind("mouseout", b, n.proxy);
            c.bind("mousedown", b, n.proxy);
            c.bind("mouseup", b, n.proxy);
            c.bind("contextmenu", b, n.proxy)
        }, unbindTree: function (a) {
            a.treeObj.unbind("selectstart", u).unbind("click", n.proxy).unbind("dblclick", n.proxy).unbind("mouseover", n.proxy).unbind("mouseout", n.proxy).unbind("mousedown", n.proxy).unbind("mouseup", n.proxy).unbind("contextmenu", n.proxy)
        }, doProxy: function (a) {
            for (var b =
                [], c = 0, d = t.length; c < d; c++) {
                var e = t[c].apply(this, arguments);
                b.push(e);
                if (e.stop) break
            }
            return b
        }, proxy: function (a) {
            var b = e.getSetting(a.data.treeId);
            if (!j.uCanDo(b, a)) return !0;
            for (var b = n.doProxy(a), c = !0, d = 0, g = b.length; d < g; d++) {
                var h = b[d];
                h.nodeEventCallback && (c = h.nodeEventCallback.apply(h, [a, h.node]) && c);
                h.treeEventCallback && (c = h.treeEventCallback.apply(h, [a, h.node]) && c)
            }
            return c
        }
    };
    H = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        if (b.open) {
            if (j.apply(c.callback.beforeCollapse, [c.treeId, b], !0) ==
                !1) return !0
        } else if (j.apply(c.callback.beforeExpand, [c.treeId, b], !0) == !1) return !0;
        e.getRoot(c).expandTriggerFlag = !0;
        i.switchNode(c, b);
        return !0
    };
    I = function (a, b) {
        var c = e.getSetting(a.data.treeId),
            d = c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && e.isSelectedNode(c, b) ? 0 : c.view.autoCancelSelected && (a.ctrlKey || a.metaKey) && c.view.selectedMulti ? 2 : 1;
        if (j.apply(c.callback.beforeClick, [c.treeId, b, d], !0) == !1) return !0;
        d === 0 ? i.cancelPreSelectedNode(c, b) : i.selectNode(c, b, d === 2);
        c.treeObj.trigger(f.event.CLICK,
            [a, c.treeId, b, d]);
        return !0
    };
    J = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        j.apply(c.callback.beforeMouseDown, [c.treeId, b], !0) && j.apply(c.callback.onMouseDown, [a, c.treeId, b]);
        return !0
    };
    K = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        j.apply(c.callback.beforeMouseUp, [c.treeId, b], !0) && j.apply(c.callback.onMouseUp, [a, c.treeId, b]);
        return !0
    };
    L = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        j.apply(c.callback.beforeDblClick, [c.treeId, b], !0) && j.apply(c.callback.onDblClick, [a, c.treeId, b]);
        return !0
    };
    M = function (a, b) {
        var c = e.getSetting(a.data.treeId);
        j.apply(c.callback.beforeRightClick, [c.treeId, b], !0) && j.apply(c.callback.onRightClick, [a, c.treeId, b]);
        return typeof c.callback.onRightClick != "function"
    };
    u = function (a) {
        a = a.originalEvent.srcElement.nodeName.toLowerCase();
        return a === "input" || a === "textarea"
    };
    var j = {
        apply: function (a, b, c) {
            return typeof a == "function" ? a.apply(O, b ? b : []) : c
        }, canAsync: function (a, b) {
            var c = e.nodeChildren(a, b), d = e.nodeIsParent(a, b);
            return a.async.enable && b && d && !(b.zAsync || c && c.length >
                0)
        }, clone: function (a) {
            if (a === null) return null;
            var b = j.isArray(a) ? [] : {}, c;
            for (c in a) b[c] = a[c] instanceof Date ? new Date(a[c].getTime()) : typeof a[c] === "object" ? j.clone(a[c]) : a[c];
            return b
        }, eqs: function (a, b) {
            return a.toLowerCase() === b.toLowerCase()
        }, isArray: function (a) {
            return Object.prototype.toString.apply(a) === "[object Array]"
        }, isElement: function (a) {
            return typeof HTMLElement === "object" ? a instanceof HTMLElement : a && typeof a === "object" && a !== null && a.nodeType === 1 && typeof a.nodeName === "string"
        }, $: function (a,
                        b, c) {
            b && typeof b != "string" && (c = b, b = "");
            return typeof a == "string" ? q(a, c ? c.treeObj.get(0).ownerDocument : null) : q("#" + a.tId + b, c ? c.treeObj : null)
        }, getMDom: function (a, b, c) {
            if (!b) return null;
            for (; b && b.id !== a.treeId;) {
                for (var d = 0, e = c.length; b.tagName && d < e; d++) if (j.eqs(b.tagName, c[d].tagName) && b.getAttribute(c[d].attrName) !== null) return b;
                b = b.parentNode
            }
            return null
        }, getNodeMainDom: function (a) {
            return q(a).parent("li").get(0) || q(a).parentsUntil("li").parent().get(0)
        }, isChildOrSelf: function (a, b) {
            return q(a).closest("#" +
                b).length > 0
        }, uCanDo: function () {
            return !0
        }
    }, i = {
        addNodes: function (a, b, c, d, g) {
            var h = e.nodeIsParent(a, b);
            if (!a.data.keep.leaf || !b || h) if (j.isArray(d) || (d = [d]), a.data.simpleData.enable && (d = e.transformTozTreeFormat(a, d)), b) {
                var h = l(b, f.id.SWITCH, a), k = l(b, f.id.ICON, a), m = l(b, f.id.UL, a);
                if (!b.open) i.replaceSwitchClass(b, h, f.folder.CLOSE), i.replaceIcoClass(b, k, f.folder.CLOSE), b.open = !1, m.css({display: "none"});
                e.addNodesData(a, b, c, d);
                i.createNodes(a, b.level + 1, d, b, c);
                g || i.expandCollapseParentNode(a, b, !0)
            } else e.addNodesData(a,
                e.getRoot(a), c, d), i.createNodes(a, 0, d, null, c)
        }, appendNodes: function (a, b, c, d, g, h, k) {
            if (!c) return [];
            var f = [], j = d ? d : e.getRoot(a), j = e.nodeChildren(a, j), o, l;
            if (!j || g >= j.length - c.length) g = -1;
            for (var n = 0, Q = c.length; n < Q; n++) {
                var p = c[n];
                h && (o = (g === 0 || j.length == c.length) && n == 0, l = g < 0 && n == c.length - 1, e.initNode(a, b, p, d, o, l, k), e.addNodeCache(a, p));
                o = e.nodeIsParent(a, p);
                l = [];
                var q = e.nodeChildren(a, p);
                q && q.length > 0 && (l = i.appendNodes(a, b + 1, q, p, -1, h, k && p.open));
                k && (i.makeDOMNodeMainBefore(f, a, p), i.makeDOMNodeLine(f,
                    a, p), e.getBeforeA(a, p, f), i.makeDOMNodeNameBefore(f, a, p), e.getInnerBeforeA(a, p, f), i.makeDOMNodeIcon(f, a, p), e.getInnerAfterA(a, p, f), i.makeDOMNodeNameAfter(f, a, p), e.getAfterA(a, p, f), o && p.open && i.makeUlHtml(a, p, f, l.join("")), i.makeDOMNodeMainAfter(f, a, p), e.addCreatedNode(a, p))
            }
            return f
        }, appendParentULDom: function (a, b) {
            var c = [], d = l(b, a);
            !d.get(0) && b.parentTId && (i.appendParentULDom(a, b.getParentNode()), d = l(b, a));
            var g = l(b, f.id.UL, a);
            g.get(0) && g.remove();
            g = e.nodeChildren(a, b);
            g = i.appendNodes(a, b.level + 1,
                g, b, -1, !1, !0);
            i.makeUlHtml(a, b, c, g.join(""));
            d.append(c.join(""))
        }, asyncNode: function (a, b, c, d) {
            var g, h;
            g = e.nodeIsParent(a, b);
            if (b && !g) return j.apply(d), !1; else if (b && b.isAjaxing) return !1; else if (j.apply(a.callback.beforeAsync, [a.treeId, b], !0) == !1) return j.apply(d), !1;
            if (b) b.isAjaxing = !0, l(b, f.id.ICON, a).attr({
                style: "",
                "class": f.className.BUTTON + " " + f.className.ICO_LOADING
            });
            var k = {}, m = j.apply(a.async.autoParam, [a.treeId, b], a.async.autoParam);
            for (g = 0, h = m.length; b && g < h; g++) {
                var r = m[g].split("="), o =
                    r;
                r.length > 1 && (o = r[1], r = r[0]);
                k[o] = b[r]
            }
            m = j.apply(a.async.otherParam, [a.treeId, b], a.async.otherParam);
            if (j.isArray(m)) for (g = 0, h = m.length; g < h; g += 2) k[m[g]] = m[g + 1]; else for (var n in m) k[n] = m[n];
            var P = e.getRoot(a)._ver;
            q.ajax({
                contentType: a.async.contentType,
                cache: !1,
                type: a.async.type,
                url: j.apply(a.async.url, [a.treeId, b], a.async.url),
                data: a.async.contentType.indexOf("application/json") > -1 ? JSON.stringify(k) : k,
                dataType: a.async.dataType,
                success: function (h) {
                    if (P == e.getRoot(a)._ver) {
                        var k = [];
                        try {
                            k = !h || h.length ==
                            0 ? [] : typeof h == "string" ? eval("(" + h + ")") : h
                        } catch (g) {
                            k = h
                        }
                        if (b) b.isAjaxing = null, b.zAsync = !0;
                        i.setNodeLineIcos(a, b);
                        k && k !== "" ? (k = j.apply(a.async.dataFilter, [a.treeId, b, k], k), i.addNodes(a, b, -1, k ? j.clone(k) : [], !!c)) : i.addNodes(a, b, -1, [], !!c);
                        a.treeObj.trigger(f.event.ASYNC_SUCCESS, [a.treeId, b, h]);
                        j.apply(d)
                    }
                },
                error: function (c, d, h) {
                    if (P == e.getRoot(a)._ver) {
                        if (b) b.isAjaxing = null;
                        i.setNodeLineIcos(a, b);
                        a.treeObj.trigger(f.event.ASYNC_ERROR, [a.treeId, b, c, d, h])
                    }
                }
            });
            return !0
        }, cancelPreSelectedNode: function (a,
                                            b, c) {
            var d = e.getRoot(a).curSelectedList, g, h;
            for (g = d.length - 1; g >= 0; g--) if (h = d[g], b === h || !b && (!c || c !== h)) if (l(h, f.id.A, a).removeClass(f.node.CURSELECTED), b) {
                e.removeSelectedNode(a, b);
                break
            } else d.splice(g, 1), a.treeObj.trigger(f.event.UNSELECTED, [a.treeId, h])
        }, createNodeCallback: function (a) {
            if (a.callback.onNodeCreated || a.view.addDiyDom) for (var b = e.getRoot(a); b.createdNodes.length > 0;) {
                var c = b.createdNodes.shift();
                j.apply(a.view.addDiyDom, [a.treeId, c]);
                a.callback.onNodeCreated && a.treeObj.trigger(f.event.NODECREATED,
                    [a.treeId, c])
            }
        }, createNodes: function (a, b, c, d, g) {
            if (c && c.length != 0) {
                var h = e.getRoot(a), k = !d || d.open || !!l(e.nodeChildren(a, d)[0], a).get(0);
                h.createdNodes = [];
                var b = i.appendNodes(a, b, c, d, g, !0, k), m, j;
                d ? (d = l(d, f.id.UL, a), d.get(0) && (m = d)) : m = a.treeObj;
                m && (g >= 0 && (j = m.children()[g]), g >= 0 && j ? q(j).before(b.join("")) : m.append(b.join("")));
                i.createNodeCallback(a)
            }
        }, destroy: function (a) {
            a && (e.initCache(a), e.initRoot(a), n.unbindTree(a), n.unbindEvent(a), a.treeObj.empty(), delete s[a.treeId])
        }, expandCollapseNode: function (a,
                                         b, c, d, g) {
            var h = e.getRoot(a), k;
            if (b) {
                var m = e.nodeChildren(a, b), r = e.nodeIsParent(a, b);
                if (h.expandTriggerFlag) k = g, g = function () {
                    k && k();
                    b.open ? a.treeObj.trigger(f.event.EXPAND, [a.treeId, b]) : a.treeObj.trigger(f.event.COLLAPSE, [a.treeId, b])
                }, h.expandTriggerFlag = !1;
                if (!b.open && r && (!l(b, f.id.UL, a).get(0) || m && m.length > 0 && !l(m[0], a).get(0))) i.appendParentULDom(a, b), i.createNodeCallback(a);
                if (b.open == c) j.apply(g, []); else {
                    var c = l(b, f.id.UL, a), h = l(b, f.id.SWITCH, a), o = l(b, f.id.ICON, a);
                    r ? (b.open = !b.open, b.iconOpen &&
                    b.iconClose && o.attr("style", i.makeNodeIcoStyle(a, b)), b.open ? (i.replaceSwitchClass(b, h, f.folder.OPEN), i.replaceIcoClass(b, o, f.folder.OPEN), d == !1 || a.view.expandSpeed == "" ? (c.show(), j.apply(g, [])) : m && m.length > 0 ? c.slideDown(a.view.expandSpeed, g) : (c.show(), j.apply(g, []))) : (i.replaceSwitchClass(b, h, f.folder.CLOSE), i.replaceIcoClass(b, o, f.folder.CLOSE), d == !1 || a.view.expandSpeed == "" || !(m && m.length > 0) ? (c.hide(), j.apply(g, [])) : c.slideUp(a.view.expandSpeed, g))) : j.apply(g, [])
                }
            } else j.apply(g, [])
        }, expandCollapseParentNode: function (a,
                                               b, c, d, e) {
            b && (b.parentTId ? (i.expandCollapseNode(a, b, c, d), b.parentTId && i.expandCollapseParentNode(a, b.getParentNode(), c, d, e)) : i.expandCollapseNode(a, b, c, d, e))
        }, expandCollapseSonNode: function (a, b, c, d, g) {
            var h = e.getRoot(a), h = b ? e.nodeChildren(a, b) : e.nodeChildren(a, h), k = b ? !1 : d,
                f = e.getRoot(a).expandTriggerFlag;
            e.getRoot(a).expandTriggerFlag = !1;
            if (h) for (var j = 0, l = h.length; j < l; j++) h[j] && i.expandCollapseSonNode(a, h[j], c, k);
            e.getRoot(a).expandTriggerFlag = f;
            i.expandCollapseNode(a, b, c, d, g)
        }, isSelectedNode: function (a,
                                     b) {
            if (!b) return !1;
            var c = e.getRoot(a).curSelectedList, d;
            for (d = c.length - 1; d >= 0; d--) if (b === c[d]) return !0;
            return !1
        }, makeDOMNodeIcon: function (a, b, c) {
            var d = e.nodeName(b, c),
                d = b.view.nameIsHTML ? d : d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            a.push("<span id='", c.tId, f.id.ICON, "' title='' treeNode", f.id.ICON, " class='", i.makeNodeIcoClass(b, c), "' style='", i.makeNodeIcoStyle(b, c), "'></span><span id='", c.tId, f.id.SPAN, "' class='", f.className.NAME, "'>", d, "</span>")
        }, makeDOMNodeLine: function (a,
                                      b, c) {
            a.push("<span id='", c.tId, f.id.SWITCH, "' title='' class='", i.makeNodeLineClass(b, c), "' treeNode", f.id.SWITCH, "></span>")
        }, makeDOMNodeMainAfter: function (a) {
            a.push("</li>")
        }, makeDOMNodeMainBefore: function (a, b, c) {
            a.push("<li id='", c.tId, "' class='", f.className.LEVEL, c.level, "' tabindex='0' hidefocus='true' treenode>")
        }, makeDOMNodeNameAfter: function (a) {
            a.push("</a>")
        }, makeDOMNodeNameBefore: function (a, b, c) {
            var d = e.nodeTitle(b, c), g = i.makeNodeUrl(b, c), h = i.makeNodeFontCss(b, c), k = [], m;
            for (m in h) k.push(m,
                ":", h[m], ";");
            a.push("<a id='", c.tId, f.id.A, "' class='", f.className.LEVEL, c.level, "' treeNode", f.id.A, ' onclick="', c.click || "", '" ', g != null && g.length > 0 ? "href='" + g + "'" : "", " target='", i.makeNodeTarget(c), "' style='", k.join(""), "'");
            j.apply(b.view.showTitle, [b.treeId, c], b.view.showTitle) && d && a.push("title='", d.replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "'");
            a.push(">")
        }, makeNodeFontCss: function (a, b) {
            var c = j.apply(a.view.fontCss, [a.treeId, b], a.view.fontCss);
            return c && typeof c != "function" ?
                c : {}
        }, makeNodeIcoClass: function (a, b) {
            var c = ["ico"];
            if (!b.isAjaxing) {
                var d = e.nodeIsParent(a, b);
                c[0] = (b.iconSkin ? b.iconSkin + "_" : "") + c[0];
                d ? c.push(b.open ? f.folder.OPEN : f.folder.CLOSE) : c.push(f.folder.DOCU)
            }
            return f.className.BUTTON + " " + c.join("_")
        }, makeNodeIcoStyle: function (a, b) {
            var c = [];
            if (!b.isAjaxing) {
                var d = e.nodeIsParent(a, b) && b.iconOpen && b.iconClose ? b.open ? b.iconOpen : b.iconClose : b[a.data.key.icon];
                d && c.push("background:url(", d, ") 0 0 no-repeat;");
                (a.view.showIcon == !1 || !j.apply(a.view.showIcon, [a.treeId,
                    b], !0)) && c.push("width:0px;height:0px;")
            }
            return c.join("")
        }, makeNodeLineClass: function (a, b) {
            var c = [];
            a.view.showLine ? b.level == 0 && b.isFirstNode && b.isLastNode ? c.push(f.line.ROOT) : b.level == 0 && b.isFirstNode ? c.push(f.line.ROOTS) : b.isLastNode ? c.push(f.line.BOTTOM) : c.push(f.line.CENTER) : c.push(f.line.NOLINE);
            e.nodeIsParent(a, b) ? c.push(b.open ? f.folder.OPEN : f.folder.CLOSE) : c.push(f.folder.DOCU);
            return i.makeNodeLineClassEx(b) + c.join("_")
        }, makeNodeLineClassEx: function (a) {
            return f.className.BUTTON + " " + f.className.LEVEL +
                a.level + " " + f.className.SWITCH + " "
        }, makeNodeTarget: function (a) {
            return a.target || "_blank"
        }, makeNodeUrl: function (a, b) {
            var c = a.data.key.url;
            return b[c] ? b[c] : null
        }, makeUlHtml: function (a, b, c, d) {
            c.push("<ul id='", b.tId, f.id.UL, "' class='", f.className.LEVEL, b.level, " ", i.makeUlLineClass(a, b), "' style='display:", b.open ? "block" : "none", "'>");
            c.push(d);
            c.push("</ul>")
        }, makeUlLineClass: function (a, b) {
            return a.view.showLine && !b.isLastNode ? f.line.LINE : ""
        }, removeChildNodes: function (a, b) {
            if (b) {
                var c = e.nodeChildren(a,
                    b);
                if (c) {
                    for (var d = 0, g = c.length; d < g; d++) e.removeNodeCache(a, c[d]);
                    e.removeSelectedNode(a);
                    delete b[a.data.key.children];
                    a.data.keep.parent ? l(b, f.id.UL, a).empty() : (e.nodeIsParent(a, b, !1), b.open = !1, c = l(b, f.id.SWITCH, a), d = l(b, f.id.ICON, a), i.replaceSwitchClass(b, c, f.folder.DOCU), i.replaceIcoClass(b, d, f.folder.DOCU), l(b, f.id.UL, a).remove())
                }
            }
        }, scrollIntoView: function (a, b) {
            if (b) if (typeof Element === "undefined") {
                var c = a.treeObj.get(0).getBoundingClientRect(), d = b.getBoundingClientRect();
                (d.top < c.top || d.bottom >
                    c.bottom || d.right > c.right || d.left < c.left) && b.scrollIntoView()
            } else {
                if (!Element.prototype.scrollIntoViewIfNeeded) Element.prototype.scrollIntoViewIfNeeded = function (a) {
                    function b(a, c, d, f) {
                        return {
                            left: a,
                            top: c,
                            width: d,
                            height: f,
                            right: a + d,
                            bottom: c + f,
                            translate: function (e, g) {
                                return b(e + a, g + c, d, f)
                            },
                            relativeFromTo: function (g, k) {
                                var i = a, j = c, g = g.offsetParent, k = k.offsetParent;
                                if (g === k) return e;
                                for (; g; g = g.offsetParent) i += g.offsetLeft + g.clientLeft, j += g.offsetTop + g.clientTop;
                                for (; k; k = k.offsetParent) i -= k.offsetLeft +
                                    k.clientLeft, j -= k.offsetTop + k.clientTop;
                                return b(i, j, d, f)
                            }
                        }
                    }

                    for (var c, d = this, e = b(this.offsetLeft, this.offsetTop, this.offsetWidth, this.offsetHeight); j.isElement(c = d.parentNode);) {
                        var f = c.offsetLeft + c.clientLeft, i = c.offsetTop + c.clientTop,
                            e = e.relativeFromTo(d, c).translate(-f, -i);
                        c.scrollLeft = !1 === a || e.left <= c.scrollLeft + c.clientWidth && c.scrollLeft <= e.right - c.clientWidth + c.clientWidth ? Math.min(e.left, Math.max(e.right - c.clientWidth, c.scrollLeft)) : (e.right - c.clientWidth + e.left) / 2;
                        c.scrollTop = !1 === a || e.top <=
                        c.scrollTop + c.clientHeight && c.scrollTop <= e.bottom - c.clientHeight + c.clientHeight ? Math.min(e.top, Math.max(e.bottom - c.clientHeight, c.scrollTop)) : (e.bottom - c.clientHeight + e.top) / 2;
                        e = e.translate(f - c.scrollLeft, i - c.scrollTop);
                        d = c
                    }
                };
                b.scrollIntoViewIfNeeded()
            }
        }, setFirstNode: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c.length > 0) c[0].isFirstNode = !0
        }, setLastNode: function (a, b) {
            var c = e.nodeChildren(a, b);
            if (c.length > 0) c[c.length - 1].isLastNode = !0
        }, removeNode: function (a, b) {
            var c = e.getRoot(a), d = b.parentTId ? b.getParentNode() :
                c;
            b.isFirstNode = !1;
            b.isLastNode = !1;
            b.getPreNode = function () {
                return null
            };
            b.getNextNode = function () {
                return null
            };
            if (e.getNodeCache(a, b.tId)) {
                l(b, a).remove();
                e.removeNodeCache(a, b);
                e.removeSelectedNode(a, b);
                for (var g = e.nodeChildren(a, d), h = 0, k = g.length; h < k; h++) if (g[h].tId == b.tId) {
                    g.splice(h, 1);
                    break
                }
                i.setFirstNode(a, d);
                i.setLastNode(a, d);
                var j, h = g.length;
                if (!a.data.keep.parent && h == 0) e.nodeIsParent(a, d, !1), d.open = !1, delete d[a.data.key.children], h = l(d, f.id.UL, a), k = l(d, f.id.SWITCH, a), j = l(d, f.id.ICON, a),
                    i.replaceSwitchClass(d, k, f.folder.DOCU), i.replaceIcoClass(d, j, f.folder.DOCU), h.css("display", "none"); else if (a.view.showLine && h > 0) {
                    var r = g[h - 1], h = l(r, f.id.UL, a), k = l(r, f.id.SWITCH, a);
                    j = l(r, f.id.ICON, a);
                    d == c ? g.length == 1 ? i.replaceSwitchClass(r, k, f.line.ROOT) : (c = l(g[0], f.id.SWITCH, a), i.replaceSwitchClass(g[0], c, f.line.ROOTS), i.replaceSwitchClass(r, k, f.line.BOTTOM)) : i.replaceSwitchClass(r, k, f.line.BOTTOM);
                    h.removeClass(f.line.LINE)
                }
            }
        }, replaceIcoClass: function (a, b, c) {
            if (b && !a.isAjaxing && (a = b.attr("class"),
            a != void 0)) {
                a = a.split("_");
                switch (c) {
                    case f.folder.OPEN:
                    case f.folder.CLOSE:
                    case f.folder.DOCU:
                        a[a.length - 1] = c
                }
                b.attr("class", a.join("_"))
            }
        }, replaceSwitchClass: function (a, b, c) {
            if (b) {
                var d = b.attr("class");
                if (d != void 0) {
                    d = d.split("_");
                    switch (c) {
                        case f.line.ROOT:
                        case f.line.ROOTS:
                        case f.line.CENTER:
                        case f.line.BOTTOM:
                        case f.line.NOLINE:
                            d[0] = i.makeNodeLineClassEx(a) + c;
                            break;
                        case f.folder.OPEN:
                        case f.folder.CLOSE:
                        case f.folder.DOCU:
                            d[1] = c
                    }
                    b.attr("class", d.join("_"));
                    c !== f.folder.DOCU ? b.removeAttr("disabled") :
                        b.attr("disabled", "disabled")
                }
            }
        }, selectNode: function (a, b, c) {
            c || i.cancelPreSelectedNode(a, null, b);
            l(b, f.id.A, a).addClass(f.node.CURSELECTED);
            e.addSelectedNode(a, b);
            a.treeObj.trigger(f.event.SELECTED, [a.treeId, b])
        }, setNodeFontCss: function (a, b) {
            var c = l(b, f.id.A, a), d = i.makeNodeFontCss(a, b);
            d && c.css(d)
        }, setNodeLineIcos: function (a, b) {
            if (b) {
                var c = l(b, f.id.SWITCH, a), d = l(b, f.id.UL, a), g = l(b, f.id.ICON, a), h = i.makeUlLineClass(a, b);
                h.length == 0 ? d.removeClass(f.line.LINE) : d.addClass(h);
                c.attr("class", i.makeNodeLineClass(a,
                    b));
                e.nodeIsParent(a, b) ? c.removeAttr("disabled") : c.attr("disabled", "disabled");
                g.removeAttr("style");
                g.attr("style", i.makeNodeIcoStyle(a, b));
                g.attr("class", i.makeNodeIcoClass(a, b))
            }
        }, setNodeName: function (a, b) {
            var c = e.nodeTitle(a, b), d = l(b, f.id.SPAN, a);
            d.empty();
            a.view.nameIsHTML ? d.html(e.nodeName(a, b)) : d.text(e.nodeName(a, b));
            j.apply(a.view.showTitle, [a.treeId, b], a.view.showTitle) && l(b, f.id.A, a).attr("title", !c ? "" : c)
        }, setNodeTarget: function (a, b) {
            l(b, f.id.A, a).attr("target", i.makeNodeTarget(b))
        }, setNodeUrl: function (a,
                                 b) {
            var c = l(b, f.id.A, a), d = i.makeNodeUrl(a, b);
            d == null || d.length == 0 ? c.removeAttr("href") : c.attr("href", d)
        }, switchNode: function (a, b) {
            b.open || !j.canAsync(a, b) ? i.expandCollapseNode(a, b, !b.open) : a.async.enable ? i.asyncNode(a, b) || i.expandCollapseNode(a, b, !b.open) : b && i.expandCollapseNode(a, b, !b.open)
        }
    };
    q.fn.zTree = {
        consts: {
            className: {
                BUTTON: "button",
                LEVEL: "level",
                ICO_LOADING: "ico_loading",
                SWITCH: "switch",
                NAME: "node_name"
            },
            event: {
                NODECREATED: "ztree_nodeCreated",
                CLICK: "ztree_click",
                EXPAND: "ztree_expand",
                COLLAPSE: "ztree_collapse",
                ASYNC_SUCCESS: "ztree_async_success",
                ASYNC_ERROR: "ztree_async_error",
                REMOVE: "ztree_remove",
                SELECTED: "ztree_selected",
                UNSELECTED: "ztree_unselected"
            },
            id: {A: "_a", ICON: "_ico", SPAN: "_span", SWITCH: "_switch", UL: "_ul"},
            line: {ROOT: "root", ROOTS: "roots", CENTER: "center", BOTTOM: "bottom", NOLINE: "noline", LINE: "line"},
            folder: {OPEN: "open", CLOSE: "close", DOCU: "docu"},
            node: {CURSELECTED: "curSelectedNode"}
        }, _z: {tools: j, view: i, event: n, data: e}, getZTreeObj: function (a) {
            return (a = e.getZTreeTools(a)) ? a : null
        }, destroy: function (a) {
            if (a &&
                a.length > 0) i.destroy(e.getSetting(a)); else for (var b in s) i.destroy(s[b])
        }, init: function (a, b, c) {
            var d = j.clone(N);
            q.extend(!0, d, b);
            d.treeId = a.attr("id");
            d.treeObj = a;
            d.treeObj.empty();
            s[d.treeId] = d;
            if (typeof document.body.style.maxHeight === "undefined") d.view.expandSpeed = "";
            e.initRoot(d);
            a = e.getRoot(d);
            c = c ? j.clone(j.isArray(c) ? c : [c]) : [];
            d.data.simpleData.enable ? e.nodeChildren(d, a, e.transformTozTreeFormat(d, c)) : e.nodeChildren(d, a, c);
            e.initCache(d);
            n.unbindTree(d);
            n.bindTree(d);
            n.unbindEvent(d);
            n.bindEvent(d);
            var g = {
                setting: d, addNodes: function (a, b, c, g) {
                    function f() {
                        i.addNodes(d, a, b, n, g == !0)
                    }

                    a || (a = null);
                    var l = e.nodeIsParent(d, a);
                    if (a && !l && d.data.keep.leaf) return null;
                    l = parseInt(b, 10);
                    isNaN(l) ? (g = !!c, c = b, b = -1) : b = l;
                    if (!c) return null;
                    var n = j.clone(j.isArray(c) ? c : [c]);
                    j.canAsync(d, a) ? i.asyncNode(d, a, g, f) : f();
                    return n
                }, cancelSelectedNode: function (a) {
                    i.cancelPreSelectedNode(d, a)
                }, destroy: function () {
                    i.destroy(d)
                }, expandAll: function (a) {
                    a = !!a;
                    i.expandCollapseSonNode(d, null, a, !0);
                    return a
                }, expandNode: function (a,
                                         b, c, g, f) {
                    function n() {
                        var b = l(a, d).get(0);
                        b && g !== !1 && i.scrollIntoView(d, b)
                    }

                    if (!a || !e.nodeIsParent(d, a)) return null;
                    b !== !0 && b !== !1 && (b = !a.open);
                    if ((f = !!f) && b && j.apply(d.callback.beforeExpand, [d.treeId, a], !0) == !1) return null; else if (f && !b && j.apply(d.callback.beforeCollapse, [d.treeId, a], !0) == !1) return null;
                    b && a.parentTId && i.expandCollapseParentNode(d, a.getParentNode(), b, !1);
                    if (b === a.open && !c) return null;
                    e.getRoot(d).expandTriggerFlag = f;
                    !j.canAsync(d, a) && c ? i.expandCollapseSonNode(d, a, b, !0, n) : (a.open =
                        !b, i.switchNode(this.setting, a), n());
                    return b
                }, getNodes: function () {
                    return e.getNodes(d)
                }, getNodeByParam: function (a, b, c) {
                    return !a ? null : e.getNodeByParam(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodeByTId: function (a) {
                    return e.getNodeCache(d, a)
                }, getNodesByParam: function (a, b, c) {
                    return !a ? null : e.getNodesByParam(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodesByParamFuzzy: function (a, b, c) {
                    return !a ? null : e.getNodesByParamFuzzy(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b)
                }, getNodesByFilter: function (a,
                                               b, c, f) {
                    b = !!b;
                    return !a || typeof a != "function" ? b ? null : [] : e.getNodesByFilter(d, c ? e.nodeChildren(d, c) : e.getNodes(d), a, b, f)
                }, getNodeIndex: function (a) {
                    if (!a) return null;
                    for (var b = a.parentTId ? a.getParentNode() : e.getRoot(d), b = e.nodeChildren(d, b), c = 0, f = b.length; c < f; c++) if (b[c] == a) return c;
                    return -1
                }, getSelectedNodes: function () {
                    for (var a = [], b = e.getRoot(d).curSelectedList, c = 0, f = b.length; c < f; c++) a.push(b[c]);
                    return a
                }, isSelectedNode: function (a) {
                    return e.isSelectedNode(d, a)
                }, reAsyncChildNodesPromise: function (a,
                                                       b, c) {
                    return new Promise(function (d, e) {
                        try {
                            g.reAsyncChildNodes(a, b, c, function () {
                                d(a)
                            })
                        } catch (f) {
                            e(f)
                        }
                    })
                }, reAsyncChildNodes: function (a, b, c, g) {
                    if (this.setting.async.enable) {
                        var j = !a;
                        j && (a = e.getRoot(d));
                        if (b == "refresh") {
                            for (var b = e.nodeChildren(d, a), n = 0, q = b ? b.length : 0; n < q; n++) e.removeNodeCache(d, b[n]);
                            e.removeSelectedNode(d);
                            e.nodeChildren(d, a, []);
                            j ? this.setting.treeObj.empty() : l(a, f.id.UL, d).empty()
                        }
                        i.asyncNode(this.setting, j ? null : a, !!c, g)
                    }
                }, refresh: function () {
                    this.setting.treeObj.empty();
                    var a = e.getRoot(d),
                        b = e.nodeChildren(d, a);
                    e.initRoot(d);
                    e.nodeChildren(d, a, b);
                    e.initCache(d);
                    i.createNodes(d, 0, e.nodeChildren(d, a), null, -1)
                }, removeChildNodes: function (a) {
                    if (!a) return null;
                    var b = e.nodeChildren(d, a);
                    i.removeChildNodes(d, a);
                    return b ? b : null
                }, removeNode: function (a, b) {
                    a && (b = !!b, b && j.apply(d.callback.beforeRemove, [d.treeId, a], !0) == !1 || (i.removeNode(d, a), b && this.setting.treeObj.trigger(f.event.REMOVE, [d.treeId, a])))
                }, selectNode: function (a, b, c) {
                    function e() {
                        if (!c) {
                            var b = l(a, d).get(0);
                            i.scrollIntoView(d, b)
                        }
                    }

                    if (a &&
                        j.uCanDo(d)) {
                        b = d.view.selectedMulti && b;
                        if (a.parentTId) i.expandCollapseParentNode(d, a.getParentNode(), !0, !1, e); else if (!c) try {
                            l(a, d).focus().blur()
                        } catch (f) {
                        }
                        i.selectNode(d, a, b)
                    }
                }, transformTozTreeNodes: function (a) {
                    return e.transformTozTreeFormat(d, a)
                }, transformToArray: function (a) {
                    return e.transformToArrayFormat(d, a)
                }, updateNode: function (a) {
                    a && l(a, d).get(0) && j.uCanDo(d) && (i.setNodeName(d, a), i.setNodeTarget(d, a), i.setNodeUrl(d, a), i.setNodeLineIcos(d, a), i.setNodeFontCss(d, a))
                }
            };
            a.treeTools = g;
            e.setZTreeTools(d,
                g);
            (c = e.nodeChildren(d, a)) && c.length > 0 ? i.createNodes(d, 0, c, null, -1) : d.async.enable && d.async.url && d.async.url !== "" && i.asyncNode(d);
            return g
        }
    };
    var O = q.fn.zTree, l = j.$, f = O.consts
})(jQuery);

/*
 * JQuery zTree excheck v3.5.35
 * http://treejs.cn/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2018-03-30
 */
(function (n) {
    var q, r, s, p = {
        event: {CHECK: "ztree_check"},
        id: {CHECK: "_check"},
        checkbox: {
            STYLE: "checkbox",
            DEFAULT: "chk",
            DISABLED: "disable",
            FALSE: "false",
            TRUE: "true",
            FULL: "full",
            PART: "part",
            FOCUS: "focus"
        },
        radio: {STYLE: "radio", TYPE_ALL: "all", TYPE_LEVEL: "level"}
    }, w = {
        check: {
            enable: !1,
            autoCheckTrigger: !1,
            chkStyle: p.checkbox.STYLE,
            nocheckInherit: !1,
            chkDisabledInherit: !1,
            radioType: p.radio.TYPE_LEVEL,
            chkboxType: {Y: "ps", N: "ps"}
        }, data: {key: {checked: "checked"}}, callback: {beforeCheck: null, onCheck: null}
    };
    q = function (c,
                  a) {
        if (a.chkDisabled === !0) return !1;
        var b = e.getSetting(c.data.treeId);
        if (i.apply(b.callback.beforeCheck, [b.treeId, a], !0) == !1) return !0;
        var d = e.nodeChecked(b, a);
        e.nodeChecked(b, a, !d);
        f.checkNodeRelation(b, a);
        d = m(a, h.id.CHECK, b);
        f.setChkClass(b, d, a);
        f.repairParentChkClassWithSelf(b, a);
        b.treeObj.trigger(h.event.CHECK, [c, b.treeId, a]);
        return !0
    };
    r = function (c, a) {
        if (a.chkDisabled === !0) return !1;
        var b = e.getSetting(c.data.treeId), d = m(a, h.id.CHECK, b);
        a.check_Focus = !0;
        f.setChkClass(b, d, a);
        return !0
    };
    s = function (c,
                  a) {
        if (a.chkDisabled === !0) return !1;
        var b = e.getSetting(c.data.treeId), d = m(a, h.id.CHECK, b);
        a.check_Focus = !1;
        f.setChkClass(b, d, a);
        return !0
    };
    n.extend(!0, n.fn.zTree.consts, p);
    n.extend(!0, n.fn.zTree._z, {
        tools: {}, view: {
            checkNodeRelation: function (c, a) {
                var b, d, j;
                d = h.radio;
                b = e.nodeChecked(c, a);
                if (c.check.chkStyle == d.STYLE) {
                    var g = e.getRadioCheckedList(c);
                    if (b) if (c.check.radioType == d.TYPE_ALL) {
                        for (d = g.length - 1; d >= 0; d--) {
                            b = g[d];
                            var k = e.nodeChecked(c, b);
                            k && b != a && (e.nodeChecked(c, b, !1), g.splice(d, 1), f.setChkClass(c,
                                m(b, h.id.CHECK, c), b), b.parentTId != a.parentTId && f.repairParentChkClassWithSelf(c, b))
                        }
                        g.push(a)
                    } else {
                        g = a.parentTId ? a.getParentNode() : e.getRoot(c);
                        g = e.nodeChildren(c, g);
                        for (d = 0, j = g.length; d < j; d++) if (b = g[d], (k = e.nodeChecked(c, b)) && b != a) e.nodeChecked(c, b, !1), f.setChkClass(c, m(b, h.id.CHECK, c), b)
                    } else if (c.check.radioType == d.TYPE_ALL) for (d = 0, j = g.length; d < j; d++) if (a == g[d]) {
                        g.splice(d, 1);
                        break
                    }
                } else g = e.nodeChildren(c, a), b && (!g || g.length == 0 || c.check.chkboxType.Y.indexOf("s") > -1) && f.setSonNodeCheckBox(c, a,
                    !0), !b && (!g || g.length == 0 || c.check.chkboxType.N.indexOf("s") > -1) && f.setSonNodeCheckBox(c, a, !1), b && c.check.chkboxType.Y.indexOf("p") > -1 && f.setParentNodeCheckBox(c, a, !0), !b && c.check.chkboxType.N.indexOf("p") > -1 && f.setParentNodeCheckBox(c, a, !1)
            }, makeChkClass: function (c, a) {
                var b = h.checkbox, d = h.radio, j = "", g = e.nodeChecked(c, a),
                    j = a.chkDisabled === !0 ? b.DISABLED : a.halfCheck ? b.PART : c.check.chkStyle == d.STYLE ? a.check_Child_State < 1 ? b.FULL : b.PART : g ? a.check_Child_State === 2 || a.check_Child_State === -1 ? b.FULL : b.PART :
                        a.check_Child_State < 1 ? b.FULL : b.PART,
                    d = c.check.chkStyle + "_" + (g ? b.TRUE : b.FALSE) + "_" + j,
                    d = a.check_Focus && a.chkDisabled !== !0 ? d + "_" + b.FOCUS : d;
                return h.className.BUTTON + " " + b.DEFAULT + " " + d
            }, repairAllChk: function (c, a) {
                if (c.check.enable && c.check.chkStyle === h.checkbox.STYLE) for (var b = e.getRoot(c), b = e.nodeChildren(c, b), d = 0, j = b.length; d < j; d++) {
                    var g = b[d];
                    g.nocheck !== !0 && g.chkDisabled !== !0 && e.nodeChecked(c, g, a);
                    f.setSonNodeCheckBox(c, g, a)
                }
            }, repairChkClass: function (c, a) {
                if (a && (e.makeChkFlag(c, a), a.nocheck !== !0)) {
                    var b =
                        m(a, h.id.CHECK, c);
                    f.setChkClass(c, b, a)
                }
            }, repairParentChkClass: function (c, a) {
                if (a && a.parentTId) {
                    var b = a.getParentNode();
                    f.repairChkClass(c, b);
                    f.repairParentChkClass(c, b)
                }
            }, repairParentChkClassWithSelf: function (c, a) {
                if (a) {
                    var b = e.nodeChildren(c, a);
                    b && b.length > 0 ? f.repairParentChkClass(c, b[0]) : f.repairParentChkClass(c, a)
                }
            }, repairSonChkDisabled: function (c, a, b, d) {
                if (a) {
                    if (a.chkDisabled != b) a.chkDisabled = b;
                    f.repairChkClass(c, a);
                    if ((a = e.nodeChildren(c, a)) && d) for (var j = 0, g = a.length; j < g; j++) f.repairSonChkDisabled(c,
                        a[j], b, d)
                }
            }, repairParentChkDisabled: function (c, a, b, d) {
                if (a) {
                    if (a.chkDisabled != b && d) a.chkDisabled = b;
                    f.repairChkClass(c, a);
                    f.repairParentChkDisabled(c, a.getParentNode(), b, d)
                }
            }, setChkClass: function (c, a, b) {
                a && (b.nocheck === !0 ? a.hide() : a.show(), a.attr("class", f.makeChkClass(c, b)))
            }, setParentNodeCheckBox: function (c, a, b, d) {
                var j = m(a, h.id.CHECK, c);
                d || (d = a);
                e.makeChkFlag(c, a);
                a.nocheck !== !0 && a.chkDisabled !== !0 && (e.nodeChecked(c, a, b), f.setChkClass(c, j, a), c.check.autoCheckTrigger && a != d && c.treeObj.trigger(h.event.CHECK,
                    [null, c.treeId, a]));
                if (a.parentTId) {
                    j = !0;
                    if (!b) for (var g = e.nodeChildren(c, a.getParentNode()), k = 0, o = g.length; k < o; k++) {
                        var l = g[k], i = e.nodeChecked(c, l);
                        if (l.nocheck !== !0 && l.chkDisabled !== !0 && i || (l.nocheck === !0 || l.chkDisabled === !0) && l.check_Child_State > 0) {
                            j = !1;
                            break
                        }
                    }
                    j && f.setParentNodeCheckBox(c, a.getParentNode(), b, d)
                }
            }, setSonNodeCheckBox: function (c, a, b, d) {
                if (a) {
                    var j = m(a, h.id.CHECK, c);
                    d || (d = a);
                    var g = !1, k = e.nodeChildren(c, a);
                    if (k) for (var o = 0, l = k.length; o < l; o++) {
                        var i = k[o];
                        f.setSonNodeCheckBox(c, i, b, d);
                        i.chkDisabled === !0 && (g = !0)
                    }
                    if (a != e.getRoot(c) && a.chkDisabled !== !0) {
                        g && a.nocheck !== !0 && e.makeChkFlag(c, a);
                        if (a.nocheck !== !0 && a.chkDisabled !== !0) {
                            if (e.nodeChecked(c, a, b), !g) a.check_Child_State = k && k.length > 0 ? b ? 2 : 0 : -1
                        } else a.check_Child_State = -1;
                        f.setChkClass(c, j, a);
                        c.check.autoCheckTrigger && a != d && a.nocheck !== !0 && a.chkDisabled !== !0 && c.treeObj.trigger(h.event.CHECK, [null, c.treeId, a])
                    }
                }
            }
        }, event: {}, data: {
            getRadioCheckedList: function (c) {
                for (var a = e.getRoot(c).radioCheckedList, b = 0, d = a.length; b < d; b++) e.getNodeCache(c,
                    a[b].tId) || (a.splice(b, 1), b--, d--);
                return a
            }, getCheckStatus: function (c, a) {
                if (!c.check.enable || a.nocheck || a.chkDisabled) return null;
                var b = e.nodeChecked(c, a);
                return {
                    checked: b,
                    half: a.halfCheck ? a.halfCheck : c.check.chkStyle == h.radio.STYLE ? a.check_Child_State === 2 : b ? a.check_Child_State > -1 && a.check_Child_State < 2 : a.check_Child_State > 0
                }
            }, getTreeCheckedNodes: function (c, a, b, d) {
                if (!a) return [];
                for (var j = b && c.check.chkStyle == h.radio.STYLE && c.check.radioType == h.radio.TYPE_ALL, d = !d ? [] : d, g = 0, f = a.length; g < f; g++) {
                    var i =
                        a[g], l = e.nodeChildren(c, i), m = e.nodeChecked(c, i);
                    if (i.nocheck !== !0 && i.chkDisabled !== !0 && m == b && (d.push(i), j)) break;
                    e.getTreeCheckedNodes(c, l, b, d);
                    if (j && d.length > 0) break
                }
                return d
            }, getTreeChangeCheckedNodes: function (c, a, b) {
                if (!a) return [];
                for (var b = !b ? [] : b, d = 0, j = a.length; d < j; d++) {
                    var g = a[d], f = e.nodeChildren(c, g), h = e.nodeChecked(c, g);
                    g.nocheck !== !0 && g.chkDisabled !== !0 && h != g.checkedOld && b.push(g);
                    e.getTreeChangeCheckedNodes(c, f, b)
                }
                return b
            }, makeChkFlag: function (c, a) {
                if (a) {
                    var b = -1, d = e.nodeChildren(c, a);
                    if (d) for (var j = 0, g = d.length; j < g; j++) {
                        var f = d[j], i = e.nodeChecked(c, f), l = -1;
                        if (c.check.chkStyle == h.radio.STYLE) if (l = f.nocheck === !0 || f.chkDisabled === !0 ? f.check_Child_State : f.halfCheck === !0 ? 2 : i ? 2 : f.check_Child_State > 0 ? 2 : 0, l == 2) {
                            b = 2;
                            break
                        } else l == 0 && (b = 0); else if (c.check.chkStyle == h.checkbox.STYLE) if (l = f.nocheck === !0 || f.chkDisabled === !0 ? f.check_Child_State : f.halfCheck === !0 ? 1 : i ? f.check_Child_State === -1 || f.check_Child_State === 2 ? 2 : 1 : f.check_Child_State > 0 ? 1 : 0, l === 1) {
                            b = 1;
                            break
                        } else if (l === 2 && b > -1 && j > 0 && l !==
                            b) {
                            b = 1;
                            break
                        } else if (b === 2 && l > -1 && l < 2) {
                            b = 1;
                            break
                        } else l > -1 && (b = l)
                    }
                    a.check_Child_State = b
                }
            }
        }
    });
    var n = n.fn.zTree, i = n._z.tools, h = n.consts, f = n._z.view, e = n._z.data, m = i.$;
    e.nodeChecked = function (c, a, b) {
        if (!a) return !1;
        c = c.data.key.checked;
        typeof b !== "undefined" && (typeof b === "string" && (b = i.eqs(b, "true")), a[c] = !!b);
        return a[c]
    };
    e.exSetting(w);
    e.addInitBind(function (c) {
        c.treeObj.bind(h.event.CHECK, function (a, b, d, e) {
            a.srcEvent = b;
            i.apply(c.callback.onCheck, [a, d, e])
        })
    });
    e.addInitUnBind(function (c) {
        c.treeObj.unbind(h.event.CHECK)
    });
    e.addInitCache(function () {
    });
    e.addInitNode(function (c, a, b, d) {
        if (b) {
            a = e.nodeChecked(c, b);
            a = e.nodeChecked(c, b, a);
            b.checkedOld = a;
            if (typeof b.nocheck == "string") b.nocheck = i.eqs(b.nocheck, "true");
            b.nocheck = !!b.nocheck || c.check.nocheckInherit && d && !!d.nocheck;
            if (typeof b.chkDisabled == "string") b.chkDisabled = i.eqs(b.chkDisabled, "true");
            b.chkDisabled = !!b.chkDisabled || c.check.chkDisabledInherit && d && !!d.chkDisabled;
            if (typeof b.halfCheck == "string") b.halfCheck = i.eqs(b.halfCheck, "true");
            b.halfCheck = !!b.halfCheck;
            b.check_Child_State = -1;
            b.check_Focus = !1;
            b.getCheckStatus = function () {
                return e.getCheckStatus(c, b)
            };
            c.check.chkStyle == h.radio.STYLE && c.check.radioType == h.radio.TYPE_ALL && a && e.getRoot(c).radioCheckedList.push(b)
        }
    });
    e.addInitProxy(function (c) {
            var a = c.target, b = e.getSetting(c.data.treeId), d = "", f = null, g = "", k = null;
            if (i.eqs(c.type, "mouseover")) {
                if (b.check.enable && i.eqs(a.tagName, "span") && a.getAttribute("treeNode" + h.id.CHECK) !== null) d = i.getNodeMainDom(a).id, g = "mouseoverCheck"
            } else if (i.eqs(c.type, "mouseout")) {
                if (b.check.enable &&
                    i.eqs(a.tagName, "span") && a.getAttribute("treeNode" + h.id.CHECK) !== null) d = i.getNodeMainDom(a).id, g = "mouseoutCheck"
            } else if (i.eqs(c.type, "click") && b.check.enable && i.eqs(a.tagName, "span") && a.getAttribute("treeNode" + h.id.CHECK) !== null) d = i.getNodeMainDom(a).id, g = "checkNode";
            if (d.length > 0) switch (f = e.getNodeCache(b, d), g) {
                case "checkNode":
                    k = q;
                    break;
                case "mouseoverCheck":
                    k = r;
                    break;
                case "mouseoutCheck":
                    k = s
            }
            return {
                stop: g === "checkNode",
                node: f,
                nodeEventType: g,
                nodeEventCallback: k,
                treeEventType: "",
                treeEventCallback: null
            }
        },
        !0);
    e.addInitRoot(function (c) {
        e.getRoot(c).radioCheckedList = []
    });
    e.addBeforeA(function (c, a, b) {
        c.check.enable && (e.makeChkFlag(c, a), b.push("<span ID='", a.tId, h.id.CHECK, "' class='", f.makeChkClass(c, a), "' treeNode", h.id.CHECK, a.nocheck === !0 ? " style='display:none;'" : "", "></span>"))
    });
    e.addZTreeTools(function (c, a) {
        a.checkNode = function (a, b, g, k) {
            var o = e.nodeChecked(c, a);
            if (a.chkDisabled !== !0 && (b !== !0 && b !== !1 && (b = !o), k = !!k, (o !== b || g) && !(k && i.apply(this.setting.callback.beforeCheck, [this.setting.treeId, a],
                !0) == !1) && i.uCanDo(this.setting) && this.setting.check.enable && a.nocheck !== !0)) e.nodeChecked(c, a, b), b = m(a, h.id.CHECK, this.setting), (g || this.setting.check.chkStyle === h.radio.STYLE) && f.checkNodeRelation(this.setting, a), f.setChkClass(this.setting, b, a), f.repairParentChkClassWithSelf(this.setting, a), k && this.setting.treeObj.trigger(h.event.CHECK, [null, this.setting.treeId, a])
        };
        a.checkAllNodes = function (a) {
            f.repairAllChk(this.setting, !!a)
        };
        a.getCheckedNodes = function (a) {
            var a = a !== !1, b = e.nodeChildren(c, e.getRoot(this.setting));
            return e.getTreeCheckedNodes(this.setting, b, a)
        };
        a.getChangeCheckedNodes = function () {
            var a = e.nodeChildren(c, e.getRoot(this.setting));
            return e.getTreeChangeCheckedNodes(this.setting, a)
        };
        a.setChkDisabled = function (a, b, c, e) {
            b = !!b;
            c = !!c;
            f.repairSonChkDisabled(this.setting, a, b, !!e);
            f.repairParentChkDisabled(this.setting, a.getParentNode(), b, c)
        };
        var b = a.updateNode;
        a.updateNode = function (c, e) {
            b && b.apply(a, arguments);
            if (c && this.setting.check.enable && m(c, this.setting).get(0) && i.uCanDo(this.setting)) {
                var g = m(c,
                    h.id.CHECK, this.setting);
                (e == !0 || this.setting.check.chkStyle === h.radio.STYLE) && f.checkNodeRelation(this.setting, c);
                f.setChkClass(this.setting, g, c);
                f.repairParentChkClassWithSelf(this.setting, c)
            }
        }
    });
    var t = f.createNodes;
    f.createNodes = function (c, a, b, d, e) {
        t && t.apply(f, arguments);
        b && f.repairParentChkClassWithSelf(c, d)
    };
    var u = f.removeNode;
    f.removeNode = function (c, a) {
        var b = a.getParentNode();
        u && u.apply(f, arguments);
        a && b && (f.repairChkClass(c, b), f.repairParentChkClass(c, b))
    };
    var v = f.appendNodes;
    f.appendNodes =
        function (c, a, b, d, h, g, i) {
            var m = "";
            v && (m = v.apply(f, arguments));
            d && e.makeChkFlag(c, d);
            return m
        }
})(jQuery);

/*
 * JQuery zTree exedit v3.5.35
 * http://treejs.cn/
 *
 * Copyright (c) 2010 Hunter.z
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: hunter.z@263.net
 * Date: 2018-03-30
 */
(function (B) {
    var I = {
        event: {DRAG: "ztree_drag", DROP: "ztree_drop", RENAME: "ztree_rename", DRAGMOVE: "ztree_dragmove"},
        id: {EDIT: "_edit", INPUT: "_input", REMOVE: "_remove"},
        move: {TYPE_INNER: "inner", TYPE_PREV: "prev", TYPE_NEXT: "next"},
        node: {
            CURSELECTED_EDIT: "curSelectedNode_Edit",
            TMPTARGET_TREE: "tmpTargetzTree",
            TMPTARGET_NODE: "tmpTargetNode"
        }
    }, v = {
        onHoverOverNode: function (a, b) {
            var c = i.getSetting(a.data.treeId), d = i.getRoot(c);
            if (d.curHoverNode != b) v.onHoverOutNode(a);
            d.curHoverNode = b;
            e.addHoverDom(c, b)
        }, onHoverOutNode: function (a) {
            var a =
                i.getSetting(a.data.treeId), b = i.getRoot(a);
            if (b.curHoverNode && !i.isSelectedNode(a, b.curHoverNode)) e.removeTreeDom(a, b.curHoverNode), b.curHoverNode = null
        }, onMousedownNode: function (a, b) {
            function c(a) {
                if (m.dragFlag == 0 && Math.abs(N - a.clientX) < f.edit.drag.minMoveSize && Math.abs(O - a.clientY) < f.edit.drag.minMoveSize) return !0;
                var b, c, g, j;
                L.css("cursor", "pointer");
                if (m.dragFlag == 0) {
                    if (k.apply(f.callback.beforeDrag, [f.treeId, n], !0) == !1) return l(a), !0;
                    for (b = 0, c = n.length; b < c; b++) {
                        if (b == 0) m.dragNodeShowBefore = [];
                        g = n[b];
                        i.nodeIsParent(f, g) && g.open ? (e.expandCollapseNode(f, g, !g.open), m.dragNodeShowBefore[g.tId] = !0) : m.dragNodeShowBefore[g.tId] = !1
                    }
                    m.dragFlag = 1;
                    y.showHoverDom = !1;
                    k.showIfameMask(f, !0);
                    j = !0;
                    var p = -1;
                    if (n.length > 1) {
                        var o = n[0].parentTId ? i.nodeChildren(f, n[0].getParentNode()) : i.getNodes(f);
                        g = [];
                        for (b = 0, c = o.length; b < c; b++) if (m.dragNodeShowBefore[o[b].tId] !== void 0 && (j && p > -1 && p + 1 !== b && (j = !1), g.push(o[b]), p = b), n.length === g.length) {
                            n = g;
                            break
                        }
                    }
                    j && (H = n[0].getPreNode(), Q = n[n.length - 1].getNextNode());
                    C = q("<ul class='zTreeDragUL'></ul>",
                        f);
                    for (b = 0, c = n.length; b < c; b++) g = n[b], g.editNameFlag = !1, e.selectNode(f, g, b > 0), e.removeTreeDom(f, g), b > f.edit.drag.maxShowNodeNum - 1 || (j = q("<li id='" + g.tId + "_tmp'></li>", f), j.append(q(g, d.id.A, f).clone()), j.css("padding", "0"), j.children("#" + g.tId + d.id.A).removeClass(d.node.CURSELECTED), C.append(j), b == f.edit.drag.maxShowNodeNum - 1 && (j = q("<li id='" + g.tId + "_moretmp'><a>  ...  </a></li>", f), C.append(j)));
                    C.attr("id", n[0].tId + d.id.UL + "_tmp");
                    C.addClass(f.treeObj.attr("class"));
                    C.appendTo(L);
                    u = q("<span class='tmpzTreeMove_arrow'></span>",
                        f);
                    u.attr("id", "zTreeMove_arrow_tmp");
                    u.appendTo(L);
                    f.treeObj.trigger(d.event.DRAG, [a, f.treeId, n])
                }
                if (m.dragFlag == 1) {
                    t && u.attr("id") == a.target.id && w && a.clientX + G.scrollLeft() + 2 > B("#" + w + d.id.A, t).offset().left ? (g = B("#" + w + d.id.A, t), a.target = g.length > 0 ? g.get(0) : a.target) : t && (t.removeClass(d.node.TMPTARGET_TREE), w && B("#" + w + d.id.A, t).removeClass(d.node.TMPTARGET_NODE + "_" + d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_INNER));
                    w = t = null;
                    J = !1;
                    h = f;
                    g = i.getSettings();
                    for (var z in g) if (g[z].treeId && g[z].edit.enable && g[z].treeId != f.treeId && (a.target.id == g[z].treeId || B(a.target).parents("#" + g[z].treeId).length > 0)) J = !0, h = g[z];
                    z = G.scrollTop();
                    j = G.scrollLeft();
                    p = h.treeObj.offset();
                    b = h.treeObj.get(0).scrollHeight;
                    g = h.treeObj.get(0).scrollWidth;
                    c = a.clientY + z - p.top;
                    var E = h.treeObj.height() + p.top - a.clientY - z, r = a.clientX + j - p.left,
                        s = h.treeObj.width() + p.left - a.clientX - j,
                        p = c < f.edit.drag.borderMax && c > f.edit.drag.borderMin, o = E < f.edit.drag.borderMax &&
                        E > f.edit.drag.borderMin, F = r < f.edit.drag.borderMax && r > f.edit.drag.borderMin,
                        v = s < f.edit.drag.borderMax && s > f.edit.drag.borderMin,
                        E = c > f.edit.drag.borderMin && E > f.edit.drag.borderMin && r > f.edit.drag.borderMin && s > f.edit.drag.borderMin,
                        r = p && h.treeObj.scrollTop() <= 0,
                        s = o && h.treeObj.scrollTop() + h.treeObj.height() + 10 >= b,
                        M = F && h.treeObj.scrollLeft() <= 0,
                        P = v && h.treeObj.scrollLeft() + h.treeObj.width() + 10 >= g;
                    if (a.target && k.isChildOrSelf(a.target, h.treeId)) {
                        for (var D = a.target; D && D.tagName && !k.eqs(D.tagName, "li") && D.id !=
                        h.treeId;) D = D.parentNode;
                        var R = !0;
                        for (b = 0, c = n.length; b < c; b++) if (g = n[b], D.id === g.tId) {
                            R = !1;
                            break
                        } else if (q(g, f).find("#" + D.id).length > 0) {
                            R = !1;
                            break
                        }
                        if (R && a.target && k.isChildOrSelf(a.target, D.id + d.id.A)) t = B(D), w = D.id
                    }
                    g = n[0];
                    if (E && k.isChildOrSelf(a.target, h.treeId)) {
                        if (!t && (a.target.id == h.treeId || r || s || M || P) && (J || !J && g.parentTId)) t = h.treeObj;
                        p ? h.treeObj.scrollTop(h.treeObj.scrollTop() - 10) : o && h.treeObj.scrollTop(h.treeObj.scrollTop() + 10);
                        F ? h.treeObj.scrollLeft(h.treeObj.scrollLeft() - 10) : v && h.treeObj.scrollLeft(h.treeObj.scrollLeft() +
                            10);
                        t && t != h.treeObj && t.offset().left < h.treeObj.offset().left && h.treeObj.scrollLeft(h.treeObj.scrollLeft() + t.offset().left - h.treeObj.offset().left)
                    }
                    C.css({top: a.clientY + z + 3 + "px", left: a.clientX + j + 3 + "px"});
                    b = j = 0;
                    if (t && t.attr("id") != h.treeId) {
                        var A = w == null ? null : i.getNodeCache(h, w),
                            p = (a.ctrlKey || a.metaKey) && f.edit.drag.isMove && f.edit.drag.isCopy || !f.edit.drag.isMove && f.edit.drag.isCopy;
                        c = !!(H && w === H.tId);
                        F = !!(Q && w === Q.tId);
                        o = g.parentTId && g.parentTId == w;
                        g = (p || !F) && k.apply(h.edit.drag.prev, [h.treeId, n, A],
                            !!h.edit.drag.prev);
                        c = (p || !c) && k.apply(h.edit.drag.next, [h.treeId, n, A], !!h.edit.drag.next);
                        p = (p || !o) && !(h.data.keep.leaf && !i.nodeIsParent(f, A)) && k.apply(h.edit.drag.inner, [h.treeId, n, A], !!h.edit.drag.inner);
                        o = function () {
                            t = null;
                            w = "";
                            x = d.move.TYPE_INNER;
                            u.css({display: "none"});
                            if (window.zTreeMoveTimer) clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null
                        };
                        if (!g && !c && !p) o(); else if (F = B("#" + w + d.id.A, t), v = A.isLastNode ? null : B("#" + A.getNextNode().tId + d.id.A, t.next()), E = F.offset().top, r =
                            F.offset().left, s = g ? p ? 0.25 : c ? 0.5 : 1 : -1, M = c ? p ? 0.75 : g ? 0.5 : 0 : -1, z = (a.clientY + z - E) / F.height(), (s == 1 || z <= s && z >= -0.2) && g ? (j = 1 - u.width(), b = E - u.height() / 2, x = d.move.TYPE_PREV) : (M == 0 || z >= M && z <= 1.2) && c ? (j = 1 - u.width(), b = v == null || i.nodeIsParent(f, A) && A.open ? E + F.height() - u.height() / 2 : v.offset().top - u.height() / 2, x = d.move.TYPE_NEXT) : p ? (j = 5 - u.width(), b = E, x = d.move.TYPE_INNER) : o(), t) {
                            u.css({display: "block", top: b + "px", left: r + j + "px"});
                            F.addClass(d.node.TMPTARGET_NODE + "_" + x);
                            if (S != w || T != x) K = (new Date).getTime();
                            if (A && i.nodeIsParent(f,
                                A) && x == d.move.TYPE_INNER && (z = !0, window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId !== A.tId ? (clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null) : window.zTreeMoveTimer && window.zTreeMoveTargetNodeTId === A.tId && (z = !1), z)) window.zTreeMoveTimer = setTimeout(function () {
                                x == d.move.TYPE_INNER && A && i.nodeIsParent(f, A) && !A.open && (new Date).getTime() - K > h.edit.drag.autoOpenTime && k.apply(h.callback.beforeDragOpen, [h.treeId, A], !0) && (e.switchNode(h, A), h.edit.drag.autoExpandTrigger && h.treeObj.trigger(d.event.EXPAND,
                                    [h.treeId, A]))
                            }, h.edit.drag.autoOpenTime + 50), window.zTreeMoveTargetNodeTId = A.tId
                        }
                    } else if (x = d.move.TYPE_INNER, t && k.apply(h.edit.drag.inner, [h.treeId, n, null], !!h.edit.drag.inner) ? t.addClass(d.node.TMPTARGET_TREE) : t = null, u.css({display: "none"}), window.zTreeMoveTimer) clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId = null;
                    S = w;
                    T = x;
                    f.treeObj.trigger(d.event.DRAGMOVE, [a, f.treeId, n])
                }
                return !1
            }

            function l(a) {
                if (window.zTreeMoveTimer) clearTimeout(window.zTreeMoveTimer), window.zTreeMoveTargetNodeTId =
                    null;
                T = S = null;
                G.unbind("mousemove", c);
                G.unbind("mouseup", l);
                G.unbind("selectstart", g);
                L.css("cursor", "");
                t && (t.removeClass(d.node.TMPTARGET_TREE), w && B("#" + w + d.id.A, t).removeClass(d.node.TMPTARGET_NODE + "_" + d.move.TYPE_PREV).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_NEXT).removeClass(d.node.TMPTARGET_NODE + "_" + I.move.TYPE_INNER));
                k.showIfameMask(f, !1);
                y.showHoverDom = !0;
                if (m.dragFlag != 0) {
                    m.dragFlag = 0;
                    var b, j, o;
                    for (b = 0, j = n.length; b < j; b++) o = n[b], i.nodeIsParent(f, o) && m.dragNodeShowBefore[o.tId] &&
                    !o.open && (e.expandCollapseNode(f, o, !o.open), delete m.dragNodeShowBefore[o.tId]);
                    C && C.remove();
                    u && u.remove();
                    var r = (a.ctrlKey || a.metaKey) && f.edit.drag.isMove && f.edit.drag.isCopy || !f.edit.drag.isMove && f.edit.drag.isCopy;
                    !r && t && w && n[0].parentTId && w == n[0].parentTId && x == d.move.TYPE_INNER && (t = null);
                    if (t) {
                        var p = w == null ? null : i.getNodeCache(h, w);
                        if (k.apply(f.callback.beforeDrop, [h.treeId, n, p, x, r], !0) == !1) e.selectNodes(v, n); else {
                            var s = r ? k.clone(n) : n;
                            b = function () {
                                if (J) {
                                    if (!r) for (var b = 0, c = n.length; b < c; b++) e.removeNode(f,
                                        n[b]);
                                    x == d.move.TYPE_INNER ? e.addNodes(h, p, -1, s) : e.addNodes(h, p.getParentNode(), x == d.move.TYPE_PREV ? p.getIndex() : p.getIndex() + 1, s)
                                } else if (r && x == d.move.TYPE_INNER) e.addNodes(h, p, -1, s); else if (r) e.addNodes(h, p.getParentNode(), x == d.move.TYPE_PREV ? p.getIndex() : p.getIndex() + 1, s); else if (x != d.move.TYPE_NEXT) for (b = 0, c = s.length; b < c; b++) e.moveNode(h, p, s[b], x, !1); else for (b = -1, c = s.length - 1; b < c; c--) e.moveNode(h, p, s[c], x, !1);
                                e.selectNodes(h, s);
                                b = q(s[0], f).get(0);
                                e.scrollIntoView(f, b);
                                f.treeObj.trigger(d.event.DROP,
                                    [a, h.treeId, s, p, x, r])
                            };
                            x == d.move.TYPE_INNER && k.canAsync(h, p) ? e.asyncNode(h, p, !1, b) : b()
                        }
                    } else e.selectNodes(v, n), f.treeObj.trigger(d.event.DROP, [a, f.treeId, n, null, null, null])
                }
            }

            function g() {
                return !1
            }

            var o, j, f = i.getSetting(a.data.treeId), m = i.getRoot(f), y = i.getRoots();
            if (a.button == 2 || !f.edit.enable || !f.edit.drag.isCopy && !f.edit.drag.isMove) return !0;
            var r = a.target, s = i.getRoot(f).curSelectedList, n = [];
            if (i.isSelectedNode(f, b)) for (o = 0, j = s.length; o < j; o++) {
                if (s[o].editNameFlag && k.eqs(r.tagName, "input") && r.getAttribute("treeNode" +
                    d.id.INPUT) !== null) return !0;
                n.push(s[o]);
                if (n[0].parentTId !== s[o].parentTId) {
                    n = [b];
                    break
                }
            } else n = [b];
            e.editNodeBlur = !0;
            e.cancelCurEditNode(f);
            var G = B(f.treeObj.get(0).ownerDocument), L = B(f.treeObj.get(0).ownerDocument.body), C, u, t, J = !1,
                h = f, v = f, H, Q, S = null, T = null, w = null, x = d.move.TYPE_INNER, N = a.clientX, O = a.clientY,
                K = (new Date).getTime();
            k.uCanDo(f) && G.bind("mousemove", c);
            G.bind("mouseup", l);
            G.bind("selectstart", g);
            return !0
        }
    };
    B.extend(!0, B.fn.zTree.consts, I);
    B.extend(!0, B.fn.zTree._z, {
        tools: {
            getAbs: function (a) {
                a =
                    a.getBoundingClientRect();
                return [a.left + (document.body.scrollLeft + document.documentElement.scrollLeft), a.top + (document.body.scrollTop + document.documentElement.scrollTop)]
            }, inputFocus: function (a) {
                a.get(0) && (a.focus(), k.setCursorPosition(a.get(0), a.val().length))
            }, inputSelect: function (a) {
                a.get(0) && (a.focus(), a.select())
            }, setCursorPosition: function (a, b) {
                if (a.setSelectionRange) a.focus(), a.setSelectionRange(b, b); else if (a.createTextRange) {
                    var c = a.createTextRange();
                    c.collapse(!0);
                    c.moveEnd("character",
                        b);
                    c.moveStart("character", b);
                    c.select()
                }
            }, showIfameMask: function (a, b) {
                for (var c = i.getRoot(a); c.dragMaskList.length > 0;) c.dragMaskList[0].remove(), c.dragMaskList.shift();
                if (b) for (var d = q("iframe", a), g = 0, e = d.length; g < e; g++) {
                    var j = d.get(g), f = k.getAbs(j),
                        j = q("<div id='zTreeMask_" + g + "' class='zTreeMask' style='top:" + f[1] + "px; left:" + f[0] + "px; width:" + j.offsetWidth + "px; height:" + j.offsetHeight + "px;'></div>", a);
                    j.appendTo(q("body", a));
                    c.dragMaskList.push(j)
                }
            }
        }, view: {
            addEditBtn: function (a, b) {
                if (!(b.editNameFlag ||
                    q(b, d.id.EDIT, a).length > 0) && k.apply(a.edit.showRenameBtn, [a.treeId, b], a.edit.showRenameBtn)) {
                    var c = q(b, d.id.A, a),
                        l = "<span class='" + d.className.BUTTON + " edit' id='" + b.tId + d.id.EDIT + "' title='" + k.apply(a.edit.renameTitle, [a.treeId, b], a.edit.renameTitle) + "' treeNode" + d.id.EDIT + " style='display:none;'></span>";
                    c.append(l);
                    q(b, d.id.EDIT, a).bind("click", function () {
                        if (!k.uCanDo(a) || k.apply(a.callback.beforeEditName, [a.treeId, b], !0) == !1) return !1;
                        e.editNode(a, b);
                        return !1
                    }).show()
                }
            }, addRemoveBtn: function (a,
                                       b) {
                if (!(b.editNameFlag || q(b, d.id.REMOVE, a).length > 0) && k.apply(a.edit.showRemoveBtn, [a.treeId, b], a.edit.showRemoveBtn)) {
                    var c = q(b, d.id.A, a),
                        l = "<span class='" + d.className.BUTTON + " remove' id='" + b.tId + d.id.REMOVE + "' title='" + k.apply(a.edit.removeTitle, [a.treeId, b], a.edit.removeTitle) + "' treeNode" + d.id.REMOVE + " style='display:none;'></span>";
                    c.append(l);
                    q(b, d.id.REMOVE, a).bind("click", function () {
                        if (!k.uCanDo(a) || k.apply(a.callback.beforeRemove, [a.treeId, b], !0) == !1) return !1;
                        e.removeNode(a, b);
                        a.treeObj.trigger(d.event.REMOVE,
                            [a.treeId, b]);
                        return !1
                    }).bind("mousedown", function () {
                        return !0
                    }).show()
                }
            }, addHoverDom: function (a, b) {
                if (i.getRoots().showHoverDom) b.isHover = !0, a.edit.enable && (e.addEditBtn(a, b), e.addRemoveBtn(a, b)), k.apply(a.view.addHoverDom, [a.treeId, b])
            }, cancelCurEditNode: function (a, b, c) {
                var l = i.getRoot(a), g = l.curEditNode;
                if (g) {
                    var o = l.curEditInput, b = b ? b : c ? i.nodeName(a, g) : o.val();
                    if (k.apply(a.callback.beforeRename, [a.treeId, g, b, c], !0) === !1) return !1;
                    i.nodeName(a, g, b);
                    q(g, d.id.A, a).removeClass(d.node.CURSELECTED_EDIT);
                    o.unbind();
                    e.setNodeName(a, g);
                    g.editNameFlag = !1;
                    l.curEditNode = null;
                    l.curEditInput = null;
                    e.selectNode(a, g, !1);
                    a.treeObj.trigger(d.event.RENAME, [a.treeId, g, c])
                }
                return l.noSelection = !0
            }, editNode: function (a, b) {
                var c = i.getRoot(a);
                e.editNodeBlur = !1;
                if (i.isSelectedNode(a, b) && c.curEditNode == b && b.editNameFlag) setTimeout(function () {
                    k.inputFocus(c.curEditInput)
                }, 0); else {
                    b.editNameFlag = !0;
                    e.removeTreeDom(a, b);
                    e.cancelCurEditNode(a);
                    e.selectNode(a, b, !1);
                    q(b, d.id.SPAN, a).html("<input type=text class='rename' id='" +
                        b.tId + d.id.INPUT + "' treeNode" + d.id.INPUT + " >");
                    var l = q(b, d.id.INPUT, a);
                    l.attr("value", i.nodeName(a, b));
                    a.edit.editNameSelectAll ? k.inputSelect(l) : k.inputFocus(l);
                    l.bind("blur", function () {
                        e.editNodeBlur || e.cancelCurEditNode(a)
                    }).bind("keydown", function (b) {
                        b.keyCode == "13" ? (e.editNodeBlur = !0, e.cancelCurEditNode(a)) : b.keyCode == "27" && e.cancelCurEditNode(a, null, !0)
                    }).bind("click", function () {
                        return !1
                    }).bind("dblclick", function () {
                        return !1
                    });
                    q(b, d.id.A, a).addClass(d.node.CURSELECTED_EDIT);
                    c.curEditInput = l;
                    c.noSelection = !1;
                    c.curEditNode = b
                }
            }, moveNode: function (a, b, c, l, g, k) {
                var j = i.getRoot(a);
                if (b != c && (!a.data.keep.leaf || !b || i.nodeIsParent(a, b) || l != d.move.TYPE_INNER)) {
                    var f = c.parentTId ? c.getParentNode() : j, m = b === null || b == j;
                    m && b === null && (b = j);
                    if (m) l = d.move.TYPE_INNER;
                    j = b.parentTId ? b.getParentNode() : j;
                    if (l != d.move.TYPE_PREV && l != d.move.TYPE_NEXT) l = d.move.TYPE_INNER;
                    if (l == d.move.TYPE_INNER) if (m) c.parentTId = null; else {
                        if (!i.nodeIsParent(a, b)) i.nodeIsParent(a, b, !0), b.open = !!b.open, e.setNodeLineIcos(a, b);
                        c.parentTId =
                            b.tId
                    }
                    var y;
                    m ? y = m = a.treeObj : (!k && l == d.move.TYPE_INNER ? e.expandCollapseNode(a, b, !0, !1) : k || e.expandCollapseNode(a, b.getParentNode(), !0, !1), m = q(b, a), y = q(b, d.id.UL, a), m.get(0) && !y.get(0) && (y = [], e.makeUlHtml(a, b, y, ""), m.append(y.join(""))), y = q(b, d.id.UL, a));
                    var r = q(c, a);
                    r.get(0) ? m.get(0) || r.remove() : r = e.appendNodes(a, c.level, [c], null, -1, !1, !0).join("");
                    y.get(0) && l == d.move.TYPE_INNER ? y.append(r) : m.get(0) && l == d.move.TYPE_PREV ? m.before(r) : m.get(0) && l == d.move.TYPE_NEXT && m.after(r);
                    var s;
                    y = -1;
                    var r = 0, n = null,
                        m = null, B = c.level, v = i.nodeChildren(a, f), C = i.nodeChildren(a, j),
                        u = i.nodeChildren(a, b);
                    if (c.isFirstNode) {
                        if (y = 0, v.length > 1) n = v[1], n.isFirstNode = !0
                    } else if (c.isLastNode) y = v.length - 1, n = v[y - 1], n.isLastNode = !0; else for (j = 0, s = v.length; j < s; j++) if (v[j].tId == c.tId) {
                        y = j;
                        break
                    }
                    y >= 0 && v.splice(y, 1);
                    if (l != d.move.TYPE_INNER) for (j = 0, s = C.length; j < s; j++) C[j].tId == b.tId && (r = j);
                    if (l == d.move.TYPE_INNER) {
                        u || (u = i.nodeChildren(a, b, []));
                        if (u.length > 0) m = u[u.length - 1], m.isLastNode = !1;
                        u.splice(u.length, 0, c);
                        c.isLastNode = !0;
                        c.isFirstNode =
                            u.length == 1
                    } else b.isFirstNode && l == d.move.TYPE_PREV ? (C.splice(r, 0, c), m = b, m.isFirstNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !0, c.isLastNode = !1) : b.isLastNode && l == d.move.TYPE_NEXT ? (C.splice(r + 1, 0, c), m = b, m.isLastNode = !1, c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !0) : (l == d.move.TYPE_PREV ? C.splice(r, 0, c) : C.splice(r + 1, 0, c), c.parentTId = b.parentTId, c.isFirstNode = !1, c.isLastNode = !1);
                    i.fixPIdKeyValue(a, c);
                    i.setSonNodeLevel(a, c.getParentNode(), c);
                    e.setNodeLineIcos(a, c);
                    e.repairNodeLevelClass(a,
                        c, B);
                    !a.data.keep.parent && v.length < 1 ? (i.nodeIsParent(a, f, !1), f.open = !1, b = q(f, d.id.UL, a), l = q(f, d.id.SWITCH, a), j = q(f, d.id.ICON, a), e.replaceSwitchClass(f, l, d.folder.DOCU), e.replaceIcoClass(f, j, d.folder.DOCU), b.css("display", "none")) : n && e.setNodeLineIcos(a, n);
                    m && e.setNodeLineIcos(a, m);
                    a.check && a.check.enable && e.repairChkClass && (e.repairChkClass(a, f), e.repairParentChkClassWithSelf(a, f), f != c.parent && e.repairParentChkClassWithSelf(a, c));
                    k || e.expandCollapseParentNode(a, c.getParentNode(), !0, g)
                }
            }, removeEditBtn: function (a,
                                        b) {
                q(b, d.id.EDIT, a).unbind().remove()
            }, removeRemoveBtn: function (a, b) {
                q(b, d.id.REMOVE, a).unbind().remove()
            }, removeTreeDom: function (a, b) {
                b.isHover = !1;
                e.removeEditBtn(a, b);
                e.removeRemoveBtn(a, b);
                k.apply(a.view.removeHoverDom, [a.treeId, b])
            }, repairNodeLevelClass: function (a, b, c) {
                if (c !== b.level) {
                    var e = q(b, a), g = q(b, d.id.A, a), a = q(b, d.id.UL, a), c = d.className.LEVEL + c,
                        b = d.className.LEVEL + b.level;
                    e.removeClass(c);
                    e.addClass(b);
                    g.removeClass(c);
                    g.addClass(b);
                    a.removeClass(c);
                    a.addClass(b)
                }
            }, selectNodes: function (a,
                                      b) {
                for (var c = 0, d = b.length; c < d; c++) e.selectNode(a, b[c], c > 0)
            }
        }, event: {}, data: {
            setSonNodeLevel: function (a, b, c) {
                if (c) {
                    var d = i.nodeChildren(a, c);
                    c.level = b ? b.level + 1 : 0;
                    if (d) for (var b = 0, g = d.length; b < g; b++) d[b] && i.setSonNodeLevel(a, c, d[b])
                }
            }
        }
    });
    var H = B.fn.zTree, k = H._z.tools, d = H.consts, e = H._z.view, i = H._z.data, q = k.$;
    i.exSetting({
        edit: {
            enable: !1,
            editNameSelectAll: !1,
            showRemoveBtn: !0,
            showRenameBtn: !0,
            removeTitle: "remove",
            renameTitle: "rename",
            drag: {
                autoExpandTrigger: !1, isCopy: !0, isMove: !0, prev: !0, next: !0, inner: !0,
                minMoveSize: 5, borderMax: 10, borderMin: -5, maxShowNodeNum: 5, autoOpenTime: 500
            }
        },
        view: {addHoverDom: null, removeHoverDom: null},
        callback: {
            beforeDrag: null,
            beforeDragOpen: null,
            beforeDrop: null,
            beforeEditName: null,
            beforeRename: null,
            onDrag: null,
            onDragMove: null,
            onDrop: null,
            onRename: null
        }
    });
    i.addInitBind(function (a) {
        var b = a.treeObj, c = d.event;
        b.bind(c.RENAME, function (b, c, d, e) {
            k.apply(a.callback.onRename, [b, c, d, e])
        });
        b.bind(c.DRAG, function (b, c, d, e) {
            k.apply(a.callback.onDrag, [c, d, e])
        });
        b.bind(c.DRAGMOVE, function (b,
                                     c, d, e) {
            k.apply(a.callback.onDragMove, [c, d, e])
        });
        b.bind(c.DROP, function (b, c, d, e, f, i, q) {
            k.apply(a.callback.onDrop, [c, d, e, f, i, q])
        })
    });
    i.addInitUnBind(function (a) {
        var a = a.treeObj, b = d.event;
        a.unbind(b.RENAME);
        a.unbind(b.DRAG);
        a.unbind(b.DRAGMOVE);
        a.unbind(b.DROP)
    });
    i.addInitCache(function () {
    });
    i.addInitNode(function (a, b, c) {
        if (c) c.isHover = !1, c.editNameFlag = !1
    });
    i.addInitProxy(function (a) {
        var b = a.target, c = i.getSetting(a.data.treeId), e = a.relatedTarget, g = "", o = null, j = "", f = null,
            m = null;
        if (k.eqs(a.type, "mouseover")) {
            if (m =
                k.getMDom(c, b, [{
                    tagName: "a",
                    attrName: "treeNode" + d.id.A
                }])) g = k.getNodeMainDom(m).id, j = "hoverOverNode"
        } else if (k.eqs(a.type, "mouseout")) m = k.getMDom(c, e, [{
            tagName: "a",
            attrName: "treeNode" + d.id.A
        }]), m || (g = "remove", j = "hoverOutNode"); else if (k.eqs(a.type, "mousedown") && (m = k.getMDom(c, b, [{
            tagName: "a",
            attrName: "treeNode" + d.id.A
        }]))) g = k.getNodeMainDom(m).id, j = "mousedownNode";
        if (g.length > 0) switch (o = i.getNodeCache(c, g), j) {
            case "mousedownNode":
                f = v.onMousedownNode;
                break;
            case "hoverOverNode":
                f = v.onHoverOverNode;
                break;
            case "hoverOutNode":
                f = v.onHoverOutNode
        }
        return {stop: !1, node: o, nodeEventType: j, nodeEventCallback: f, treeEventType: "", treeEventCallback: null}
    });
    i.addInitRoot(function (a) {
        var a = i.getRoot(a), b = i.getRoots();
        a.curEditNode = null;
        a.curEditInput = null;
        a.curHoverNode = null;
        a.dragFlag = 0;
        a.dragNodeShowBefore = [];
        a.dragMaskList = [];
        b.showHoverDom = !0
    });
    i.addZTreeTools(function (a, b) {
        b.cancelEditName = function (a) {
            i.getRoot(this.setting).curEditNode && e.cancelCurEditNode(this.setting, a ? a : null, !0)
        };
        b.copyNode = function (b,
                               l, g, o) {
            if (!l) return null;
            var j = i.nodeIsParent(a, b);
            if (b && !j && this.setting.data.keep.leaf && g === d.move.TYPE_INNER) return null;
            var f = this, m = k.clone(l);
            if (!b) b = null, g = d.move.TYPE_INNER;
            g == d.move.TYPE_INNER ? (l = function () {
                e.addNodes(f.setting, b, -1, [m], o)
            }, k.canAsync(this.setting, b) ? e.asyncNode(this.setting, b, o, l) : l()) : (e.addNodes(this.setting, b.parentNode, -1, [m], o), e.moveNode(this.setting, b, m, g, !1, o));
            return m
        };
        b.editName = function (a) {
            a && a.tId && a === i.getNodeCache(this.setting, a.tId) && (a.parentTId && e.expandCollapseParentNode(this.setting,
                a.getParentNode(), !0), e.editNode(this.setting, a))
        };
        b.moveNode = function (b, l, g, o) {
            function j() {
                e.moveNode(m.setting, b, l, g, !1, o)
            }

            if (!l) return l;
            var f = i.nodeIsParent(a, b);
            if (b && !f && this.setting.data.keep.leaf && g === d.move.TYPE_INNER) return null; else if (b && (l.parentTId == b.tId && g == d.move.TYPE_INNER || q(l, this.setting).find("#" + b.tId).length > 0)) return null; else b || (b = null);
            var m = this;
            k.canAsync(this.setting, b) && g === d.move.TYPE_INNER ? e.asyncNode(this.setting, b, o, j) : j();
            return l
        };
        b.setEditable = function (a) {
            this.setting.edit.enable =
                a;
            return this.refresh()
        }
    });
    var N = e.cancelPreSelectedNode;
    e.cancelPreSelectedNode = function (a, b) {
        for (var c = i.getRoot(a).curSelectedList, d = 0, g = c.length; d < g; d++) if (!b || b === c[d]) if (e.removeTreeDom(a, c[d]), b) break;
        N && N.apply(e, arguments)
    };
    var O = e.createNodes;
    e.createNodes = function (a, b, c, d, g) {
        O && O.apply(e, arguments);
        c && e.repairParentChkClassWithSelf && e.repairParentChkClassWithSelf(a, d)
    };
    var V = e.makeNodeUrl;
    e.makeNodeUrl = function (a, b) {
        return a.edit.enable ? null : V.apply(e, arguments)
    };
    var K = e.removeNode;
    e.removeNode =
        function (a, b) {
            var c = i.getRoot(a);
            if (c.curEditNode === b) c.curEditNode = null;
            K && K.apply(e, arguments)
        };
    var P = e.selectNode;
    e.selectNode = function (a, b, c) {
        var d = i.getRoot(a);
        if (i.isSelectedNode(a, b) && d.curEditNode == b && b.editNameFlag) return !1;
        P && P.apply(e, arguments);
        e.addHoverDom(a, b);
        return !0
    };
    var U = k.uCanDo;
    k.uCanDo = function (a, b) {
        var c = i.getRoot(a);
        if (b && (k.eqs(b.type, "mouseover") || k.eqs(b.type, "mouseout") || k.eqs(b.type, "mousedown") || k.eqs(b.type, "mouseup"))) return !0;
        if (c.curEditNode) e.editNodeBlur = !1, c.curEditInput.focus();
        return !c.curEditNode && (U ? U.apply(e, arguments) : !0)
    }
})(jQuery);

