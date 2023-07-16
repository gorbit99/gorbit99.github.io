var N = Object.defineProperty,
  k = Object.defineProperties;
var z = Object.getOwnPropertyDescriptors;
var L = Object.getOwnPropertySymbols;
var R = Object.prototype.hasOwnProperty,
  O = Object.prototype.propertyIsEnumerable;
var D = (e, t, n) =>
  t in e
    ? N(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n),
  x = (e, t) => {
    for (var n in t || (t = {})) R.call(t, n) && D(e, n, t[n]);
    if (L) for (var n of L(t)) O.call(t, n) && D(e, n, t[n]);
    return e;
  },
  A = (e, t) => k(e, z(t));
import "./vendor.0bc0745c.js";
const V = function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) a(o);
  new MutationObserver((o) => {
    for (const u of o)
      if (u.type === "childList")
        for (const l of u.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const u = {};
    return (
      o.integrity && (u.integrity = o.integrity),
      o.referrerpolicy && (u.referrerPolicy = o.referrerpolicy),
      o.crossorigin === "use-credentials"
        ? (u.credentials = "include")
        : o.crossorigin === "anonymous"
          ? (u.credentials = "omit")
          : (u.credentials = "same-origin"),
      u
    );
  }
  function a(o) {
    if (o.ep) return;
    o.ep = !0;
    const u = n(o);
    fetch(o.href, u);
  }
};
V();
function B() {
  const e = document.querySelector(".upload__drop-zone"),
    t = document.querySelector(".upload__file-input"),
    n = document.querySelector(".upload__button"),
    a = document.querySelector(".upload__drop-zone-text");
  (t.files = null),
    (n.disabled = !0),
    e.addEventListener("click", () => {
      t.click();
    }),
    t.addEventListener("change", () => {
      const o = t.files;
      o != null &&
        (n.classList.add("upload__button--excited"),
          n.classList.remove("upload__button--inactive"),
          (n.disabled = !1),
          (a.textContent = `${o.length} files selected`));
    }),
    n.addEventListener("click", () => {
      n.classList.remove("upload__button--excited");
    });
}
function J(e) {
  document.querySelector(".upload__button").addEventListener("click", () => {
    var o;
    const n = document.querySelector(".upload__file-input"),
      a = Array.from((o = n.files) != null ? o : []);
    e(a);
  });
}
const _ = {
  adjective: "\u5F62\u5BB9\u8A5E",
  adverb: "\u526F\u8A5E",
  adnominal: "\u9023\u4F53\u8A5E",
  filler: "\u30D5\u30A3\u30E9\u30FC",
  conjunction: "\u63A5\u7D9A\u8A5E",
  noun: "\u540D\u8A5E",
  auxiliaryVerb: "\u52A9\u52D5\u8A5E",
  interjection: "\u611F\u52D5\u8A5E",
  other: "\u305D\u306E\u4ED6",
  prefix: "\u63A5\u982D\u8A5E",
  particle: "\u52A9\u8A5E",
  symbol: "\u8A18\u53F7",
  verb: "\u52D5\u8A5E",
};
function H() {
  var e;
  (e = document.querySelector(".loading")) == null ||
    e.classList.remove("loading--hidden");
}
function W() {
  var e;
  (e = document.querySelector(".loading")) == null ||
    e.classList.add("loading--hidden");
}
function C(e) {
  const t = document.querySelector(".loading__text");
  t.textContent = e;
}
let P;
async function G(e) {
  H(), U(e);
  const t = await K(e),
    n = Y(t);
  P === void 0 && (P = await Z());
  const a = Q(n);
  return W(), { lines: n, words: a };
}
function U(e) {
  const t = (n) => parseInt(n.name.split(".")[0]);
  return e.sort((n, a) => t(n) - t(a));
}
async function K(e) {
  const t = [];
  for (const n of e) {
    C(`Loading files... ${t.length + 1}/${e.length}`);
    const a = await X(n);
    t.push(a);
  }
  return t;
}
async function X(e) {
  const t = new FileReader();
  return (
    t.readAsText(e),
    new Promise((n, a) => {
      (t.onload = () => {
        const o = JSON.parse(t.result);
        n(o);
      }),
        (t.onerror = () => {
          a(t.error);
        });
    })
  );
}
function Y(e) {
  return e.map((t) => t.blocks.map((n) => n.lines.join(" ")));
}
function Z() {
  return (
    C("Loading kuromoji..."),
    new Promise((e, t) => {
      kuromoji
        .builder({
          dicPath: "https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict",
        })
        .build((n, a) => {
          n && t(n), e(a);
        });
    })
  );
}
function Q(e) {
  return C("Extracting words..."), e.map((t) => t.flatMap((n) => ee(n)));
}
function ee(e) {
  const t = [_.noun, _.verb, _.adverb, _.adjective, _.adnominal];
  return P.tokenize(e)
    .filter((a) => t.includes(a.pos) && a.basic_form !== "*")
    .map((a) => a.basic_form);
}
let F;
function te() {
  return F;
}
function M() {
  var e;
  (e = document.querySelector(".results")) == null ||
    e.classList.add("results--hidden");
}
async function T(e) {
  var s;
  (s = document.querySelector(".results")) == null ||
    s.classList.remove("results--hidden");
  const t = "title" in e ? e : oe(e),
    n = await ne();
  F = t;
  const a = document.querySelector(
    ".results__info-group[data-result-name='pages']"
  ),
    o = (t.pages.count - n.pages.average) / n.pages.averageDeviation;
  b(a, t.pages.count, n.pages.average, o);
  const u = document.querySelector(
    ".results__info-group[data-result-name='meaningfulPages']"
  ),
    l = (t.pages.meaningful - n.pages.meaningful) / n.pages.meaningfulDeviation;
  b(u, t.pages.meaningful, n.pages.meaningful, l),
    q(t.bubbles, "bubbles", n.bubbles),
    q(t.words, "words", n.words),
    q(t.characters, "characters", n.characters),
    document.querySelectorAll(".results__diagram-column").forEach((d) => {
      const m = d.style.height;
      d.animate([{ height: "0" }, { height: m }], 500);
    });
}
async function ne() {
  const e = await j(),
    t = e.length,
    n = e.map((r) => r.pages.count).reduce((r, i) => r + i, 0) / t,
    a = e.map((r) => r.pages.meaningful).reduce((r, i) => r + i, 0) / t,
    o = Math.sqrt(
      e.map((r) => Math.pow(r.pages.count - n, 2)).reduce((r, i) => r + i, 0) /
      t
    ),
    u = Math.sqrt(
      e
        .map((r) => Math.pow(r.pages.meaningful - a, 2))
        .reduce((r, i) => r + i, 0) / t
    ),
    l = (r) => {
      const i = r.map((c) => c.count).reduce((c, f) => c + f, 0) / t,
        p = Math.sqrt(
          r.map((c) => Math.pow(c.count - i, 2)).reduce((c, f) => c + f, 0) / t
        ),
        v = r.map((c) => c.perPage).reduce((c, f) => c + f, 0) / t,
        g = Math.sqrt(
          r.map((c) => Math.pow(c.perPage - v, 2)).reduce((c, f) => c + f, 0) /
          t
        );
      return {
        average: i,
        deviation: p,
        perPageAverage: v,
        perPageDeviation: g,
      };
    },
    s = l(e.map((r) => r.bubbles)),
    d = l(e.map((r) => r.words)),
    m = l(e.map((r) => r.characters));
  return {
    pages: {
      average: n,
      averageDeviation: o,
      meaningful: a,
      meaningfulDeviation: u,
    },
    bubbles: s,
    words: d,
    characters: m,
  };
}
let S;
async function j() {
  if (S) return S;
  const e = await (await fetch("/manga-analyzer/selected_results.json")).json();
  return (S = e), e;
}
function oe(e) {
  const t = ae(e),
    n = e.lines.flat().length,
    a = n / t,
    o = e.lines.map((g) => g.length),
    u = w(o),
    l = e.words.flat().length,
    s = l / t,
    d = e.words.map((g) => g.length),
    m = w(d),
    r = e.words.map((g) => $(g.join(""))),
    i = r.flat().reduce((g, c) => g + c, 0),
    p = i / t,
    v = w(r.flat());
  return {
    title: void 0,
    pages: { count: e.lines.length, meaningful: t },
    bubbles: { count: n, perPage: a, diagram: u },
    words: { count: l, perPage: s, diagram: m },
    characters: { count: i, perPage: p, diagram: v },
  };
}
function w(e) {
  const t = [];
  return (
    e.forEach((n) => {
      const a = t.find((o) => o.value === n);
      if (a) {
        a.count++;
        return;
      }
      t.push({ value: n, count: 1 });
    }),
    t
  );
}
function ae(e) {
  return e.lines.filter((t) => $(t.join("")) > 10).length;
}
function $(e) {
  var t, n;
  return (n =
    (t = e.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g)) == null
      ? void 0
      : t.length) != null
    ? n
    : 0;
}
function q(e, t, n) {
  var m;
  const a = re(e.diagram, e.perPage, n.perPageAverage),
    o = document.querySelector(`.results__${t}`),
    u = o.querySelector(`.results__info-group[data-result-name='${t}']`),
    l = (e.count - n.average) / n.deviation;
  b(u, e.count, n.average, l);
  const s = o.querySelector(
    `.results__info-group[data-result-name='${t}PerPage']`
  ),
    d = (e.perPage - n.perPageAverage) / n.perPageDeviation;
  b(s, e.perPage, n.perPageAverage, d),
    (m = o.querySelector(".results__diagram")) == null || m.remove(),
    o.appendChild(a);
}
function b(e, t, n, a) {
  const o = e.querySelector(".results__info-value"),
    u = e.querySelector(".results__info-average"),
    l = e.querySelector(".results__info-deviation");
  (o.textContent = y(t)), (u.textContent = y(n));
  const s = a > 0 ? "+" : "";
  l.textContent = s + y(a);
}
function y(e) {
  return (Math.round(e * 100) / 100).toString();
}
function re(e, t, n) {
  const a = document.querySelector("#diagramTemplate"),
    o = a.content.querySelector(".results__diagram").cloneNode(!0),
    u = a.content.querySelector("#diagramColumnTemplate"),
    l = a.content.querySelector("#diagramColumnWithHorizontalTemplate"),
    s = a.content.querySelector("#diagramHorizontalLineTemplate"),
    d = a.content.querySelector("#diagramAverageLineTemplate"),
    m = a.content.querySelector("#diagramValueLineTemplate"),
    r = o.querySelector(".results__diagram-data"),
    i = Math.min(...e.map((h) => h.value), n),
    p = Math.max(...e.map((h) => h.value), n),
    v = Math.max(...e.map((h) => h.count)),
    g = v * 1.25,
    c = Math.max(Math.floor(i - 3), 0),
    f = Math.ceil(p + 3);
  return ue(c, f, g, e, r, u, l), se(g, v, s, r), ce(t, n, f, r, d, m), o;
}
function ue(e, t, n, a, o, u, l) {
  var m, r;
  const s = 100 / (t - e + 1),
    d = Math.ceil(20 / s);
  for (let i = 0; i <= t - e; i++) {
    const p = e + i,
      v =
        (r = (m = a.find((c) => c.value === p)) == null ? void 0 : m.count) !=
          null
          ? r
          : 0,
      g = (v / n) * 100;
    if (i % d === 0 && i !== 0) {
      const c = l.content.firstElementChild.cloneNode(!0),
        f = c.querySelector(".results__diagram-column-value"),
        h = c.querySelector(".results__diagram-horizontal-value");
      (f.textContent = `${p}: ${v}`),
        (h.textContent = y(p)),
        (c.style.height = `${g}%`),
        (c.style.width = `${s}%`),
        o.appendChild(c);
    } else {
      const c = u.content.firstElementChild.cloneNode(!0),
        f = c.querySelector(".results__diagram-column-value");
      (f.textContent = `${p}: ${v}`),
        (c.style.height = `${g}%`),
        (c.style.width = `${s}%`),
        o.appendChild(c);
    }
  }
}
function se(e, t, n, a) {
  const o = Math.floor(t / 5),
    u = (o / e) * 100;
  for (let l = 0; l < 5; l++) {
    const s = n.content.firstElementChild.cloneNode(!0);
    s.style.height = `${u * (l + 1)}%`;
    const d = s.querySelector(".results__diagram-horizontal-line-text");
    (d.textContent = (o * (l + 1)).toString()), a.appendChild(s);
  }
}
function ce(e, t, n, a, o, u) {
  const l = (t / n) * 100,
    s = (e / n) * 100,
    d = o.content.firstElementChild.cloneNode(!0);
  d.style.width = `${l}%`;
  const m = d.querySelector(".results__diagram-average-text");
  m.textContent = y(t);
  const r = u.content.firstElementChild.cloneNode(!0);
  r.style.width = `${s}%`;
  const i = r.querySelector(".results__diagram-value-text");
  i.textContent = y(e);
  const p = [d, r];
  t > e && p.reverse(), a.append(...p);
}
function E() {
  var e;
  (e = document.querySelector(".save__container")) == null ||
    e.classList.add("save__container--hidden");
}
function le() {
  var e;
  (e = document.querySelector(".save__container")) == null ||
    e.classList.remove("save__container--hidden");
}
async function I(e) {
  var l;
  if (window.localStorage.getItem("saves") === null) {
    const s = await j();
    window.localStorage.setItem("saves", JSON.stringify(s));
  }
  const t = JSON.parse(
    (l = window.localStorage.getItem("saves")) != null ? l : "[]"
  ),
    n = document.querySelector("#savedValueTemplate"),
    a = document.querySelector(".saved-values__container");
  a.querySelectorAll(".saved-value__container").forEach((s) => s.remove()),
    t.forEach((s) => {
      var i;
      s.title === void 0 && (s.title = "Untitled");
      const d =
        (i = n.content.firstElementChild) == null ? void 0 : i.cloneNode(!0),
        m = d.querySelector(".saved-value__name");
      (m.textContent = s.title),
        (m.title = s.title),
        d
          .querySelector(".saved-value__load-button")
          .addEventListener("click", () => {
            e == null || e(s);
          }),
        a.appendChild(d);
    });
  const o = document.querySelector(".save__button"),
    u = document.querySelector(".save__title");
  u.addEventListener("input", () => {
    o.disabled = u.value.trim() === "";
  }),
    (u.value = ""),
    o.addEventListener("click", () => {
      var r;
      const s = u.value.trim();
      (u.value = ""), (o.disabled = !0);
      const d = te();
      if (!d) return;
      const m = JSON.parse(
        (r = window.localStorage.getItem("saves")) != null ? r : "[]"
      );
      m.unshift(A(x({}, d), { title: s })),
        window.localStorage.setItem("saves", JSON.stringify(m)),
        I(e),
        E();
    });
}
async function ie() {
  B(),
    I(async (e) => {
      E(), M(), await T(e);
    }),
    J(async (e) => {
      E(), M();
      const t = await G(e);
      await T(t), le();
    });
}
document.addEventListener("DOMContentLoaded", ie);
