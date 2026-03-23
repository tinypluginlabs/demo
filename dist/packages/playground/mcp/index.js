#!/usr/bin/env node
import Tr from "node:process";
import { WebSocketServer as io } from "ws";
import { createServer as oo } from "node:http";
import { randomUUID as ao } from "node:crypto";
import Ss from "ajv";
import { ZodOptional as co } from "zod";
import { createRequire as uo } from "module";
import { t as lo } from "./tool-executors-pMxJ1GXT.js";
function _(t, e, n) {
  function r(a, c) {
    if (a._zod || Object.defineProperty(a, "_zod", {
      value: {
        def: c,
        constr: o,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), a._zod.traits.has(t))
      return;
    a._zod.traits.add(t), e(a, c);
    const u = o.prototype, l = Object.keys(u);
    for (let d = 0; d < l.length; d++) {
      const m = l[d];
      m in a || (a[m] = u[m].bind(a));
    }
  }
  const s = (n == null ? void 0 : n.Parent) ?? Object;
  class i extends s {
  }
  Object.defineProperty(i, "name", { value: t });
  function o(a) {
    var c;
    const u = n != null && n.Parent ? new i() : this;
    r(u, a), (c = u._zod).deferred ?? (c.deferred = []);
    for (const l of u._zod.deferred)
      l();
    return u;
  }
  return Object.defineProperty(o, "init", { value: r }), Object.defineProperty(o, Symbol.hasInstance, {
    value: (a) => {
      var c, u;
      return n != null && n.Parent && a instanceof n.Parent ? !0 : (u = (c = a == null ? void 0 : a._zod) == null ? void 0 : c.traits) == null ? void 0 : u.has(t);
    }
  }), Object.defineProperty(o, "name", { value: t }), o;
}
class st extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ts extends Error {
  constructor(e) {
    super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
  }
}
const Ps = {};
function Ue(t) {
  return Ps;
}
function Rs(t) {
  const e = Object.values(t).filter((r) => typeof r == "number");
  return Object.entries(t).filter(([r, s]) => e.indexOf(+r) === -1).map(([r, s]) => s);
}
function Tn(t, e) {
  return typeof e == "bigint" ? e.toString() : e;
}
function on(t) {
  return {
    get value() {
      {
        const e = t();
        return Object.defineProperty(this, "value", { value: e }), e;
      }
    }
  };
}
function Wn(t) {
  return t == null;
}
function Bn(t) {
  const e = t.startsWith("^") ? 1 : 0, n = t.endsWith("$") ? t.length - 1 : t.length;
  return t.slice(e, n);
}
function fo(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = e.toString();
  let s = (r.split(".")[1] || "").length;
  if (s === 0 && /\d?e-\d?/.test(r)) {
    const c = r.match(/\d?e-(\d?)/);
    c != null && c[1] && (s = Number.parseInt(c[1]));
  }
  const i = n > s ? n : s, o = Number.parseInt(t.toFixed(i).replace(".", "")), a = Number.parseInt(e.toFixed(i).replace(".", ""));
  return o % a / 10 ** i;
}
const Pr = Symbol("evaluating");
function W(t, e, n) {
  let r;
  Object.defineProperty(t, e, {
    get() {
      if (r !== Pr)
        return r === void 0 && (r = Pr, r = n()), r;
    },
    set(s) {
      Object.defineProperty(t, e, {
        value: s
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Xe(t, e, n) {
  Object.defineProperty(t, e, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Ve(...t) {
  const e = {};
  for (const n of t) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(e, r);
  }
  return Object.defineProperties({}, e);
}
function Rr(t) {
  return JSON.stringify(t);
}
function ho(t) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const $s = "captureStackTrace" in Error ? Error.captureStackTrace : (...t) => {
};
function wt(t) {
  return typeof t == "object" && t !== null && !Array.isArray(t);
}
const po = on(() => {
  var t;
  if (typeof navigator < "u" && ((t = navigator == null ? void 0 : navigator.userAgent) != null && t.includes("Cloudflare")))
    return !1;
  try {
    const e = Function;
    return new e(""), !0;
  } catch {
    return !1;
  }
});
function it(t) {
  if (wt(t) === !1)
    return !1;
  const e = t.constructor;
  if (e === void 0 || typeof e != "function")
    return !0;
  const n = e.prototype;
  return !(wt(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function zs(t) {
  return it(t) ? { ...t } : Array.isArray(t) ? [...t] : t;
}
const mo = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function ot(t) {
  return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Me(t, e, n) {
  const r = new t._zod.constr(e ?? t._zod.def);
  return (!e || n != null && n.parent) && (r._zod.parent = t), r;
}
function E(t) {
  const e = t;
  if (!e)
    return {};
  if (typeof e == "string")
    return { error: () => e };
  if ((e == null ? void 0 : e.message) !== void 0) {
    if ((e == null ? void 0 : e.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    e.error = e.message;
  }
  return delete e.message, typeof e.error == "string" ? { ...e, error: () => e.error } : e;
}
function go(t) {
  return Object.keys(t).filter((e) => t[e]._zod.optin === "optional" && t[e]._zod.optout === "optional");
}
const _o = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function yo(t, e) {
  const n = t._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const i = Ve(t._zod.def, {
    get shape() {
      const o = {};
      for (const a in e) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        e[a] && (o[a] = n.shape[a]);
      }
      return Xe(this, "shape", o), o;
    },
    checks: []
  });
  return Me(t, i);
}
function vo(t, e) {
  const n = t._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const i = Ve(t._zod.def, {
    get shape() {
      const o = { ...t._zod.def.shape };
      for (const a in e) {
        if (!(a in n.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        e[a] && delete o[a];
      }
      return Xe(this, "shape", o), o;
    },
    checks: []
  });
  return Me(t, i);
}
function bo(t, e) {
  if (!it(e))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = t._zod.def.checks;
  if (n && n.length > 0) {
    const i = t._zod.def.shape;
    for (const o in e)
      if (Object.getOwnPropertyDescriptor(i, o) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const s = Ve(t._zod.def, {
    get shape() {
      const i = { ...t._zod.def.shape, ...e };
      return Xe(this, "shape", i), i;
    }
  });
  return Me(t, s);
}
function wo(t, e) {
  if (!it(e))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = Ve(t._zod.def, {
    get shape() {
      const r = { ...t._zod.def.shape, ...e };
      return Xe(this, "shape", r), r;
    }
  });
  return Me(t, n);
}
function ko(t, e) {
  const n = Ve(t._zod.def, {
    get shape() {
      const r = { ...t._zod.def.shape, ...e._zod.def.shape };
      return Xe(this, "shape", r), r;
    },
    get catchall() {
      return e._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Me(t, n);
}
function So(t, e, n) {
  const s = e._zod.def.checks;
  if (s && s.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const o = Ve(e._zod.def, {
    get shape() {
      const a = e._zod.def.shape, c = { ...a };
      if (n)
        for (const u in n) {
          if (!(u in a))
            throw new Error(`Unrecognized key: "${u}"`);
          n[u] && (c[u] = t ? new t({
            type: "optional",
            innerType: a[u]
          }) : a[u]);
        }
      else
        for (const u in a)
          c[u] = t ? new t({
            type: "optional",
            innerType: a[u]
          }) : a[u];
      return Xe(this, "shape", c), c;
    },
    checks: []
  });
  return Me(e, o);
}
function To(t, e, n) {
  const r = Ve(e._zod.def, {
    get shape() {
      const s = e._zod.def.shape, i = { ...s };
      if (n)
        for (const o in n) {
          if (!(o in i))
            throw new Error(`Unrecognized key: "${o}"`);
          n[o] && (i[o] = new t({
            type: "nonoptional",
            innerType: s[o]
          }));
        }
      else
        for (const o in s)
          i[o] = new t({
            type: "nonoptional",
            innerType: s[o]
          });
      return Xe(this, "shape", i), i;
    }
  });
  return Me(e, r);
}
function tt(t, e = 0) {
  var n;
  if (t.aborted === !0)
    return !0;
  for (let r = e; r < t.issues.length; r++)
    if (((n = t.issues[r]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function nt(t, e) {
  return e.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(t), n;
  });
}
function At(t) {
  return typeof t == "string" ? t : t == null ? void 0 : t.message;
}
function He(t, e, n) {
  var s, i, o, a, c, u;
  const r = { ...t, path: t.path ?? [] };
  if (!t.message) {
    const l = At((o = (i = (s = t.inst) == null ? void 0 : s._zod.def) == null ? void 0 : i.error) == null ? void 0 : o.call(i, t)) ?? At((a = e == null ? void 0 : e.error) == null ? void 0 : a.call(e, t)) ?? At((c = n.customError) == null ? void 0 : c.call(n, t)) ?? At((u = n.localeError) == null ? void 0 : u.call(n, t)) ?? "Invalid input";
    r.message = l;
  }
  return delete r.inst, delete r.continue, e != null && e.reportInput || delete r.input, r;
}
function Gn(t) {
  return Array.isArray(t) ? "array" : typeof t == "string" ? "string" : "unknown";
}
function kt(...t) {
  const [e, n, r] = t;
  return typeof e == "string" ? {
    message: e,
    code: "custom",
    input: n,
    inst: r
  } : { ...e };
}
const Es = (t, e) => {
  t.name = "$ZodError", Object.defineProperty(t, "_zod", {
    value: t._zod,
    enumerable: !1
  }), Object.defineProperty(t, "issues", {
    value: e,
    enumerable: !1
  }), t.message = JSON.stringify(e, Tn, 2), Object.defineProperty(t, "toString", {
    value: () => t.message,
    enumerable: !1
  });
}, Ns = _("$ZodError", Es), an = _("$ZodError", Es, { Parent: Error });
function Po(t, e = (n) => n.message) {
  const n = {}, r = [];
  for (const s of t.issues)
    s.path.length > 0 ? (n[s.path[0]] = n[s.path[0]] || [], n[s.path[0]].push(e(s))) : r.push(e(s));
  return { formErrors: r, fieldErrors: n };
}
function Ro(t, e = (n) => n.message) {
  const n = { _errors: [] }, r = (s) => {
    for (const i of s.issues)
      if (i.code === "invalid_union" && i.errors.length)
        i.errors.map((o) => r({ issues: o }));
      else if (i.code === "invalid_key")
        r({ issues: i.issues });
      else if (i.code === "invalid_element")
        r({ issues: i.issues });
      else if (i.path.length === 0)
        n._errors.push(e(i));
      else {
        let o = n, a = 0;
        for (; a < i.path.length; ) {
          const c = i.path[a];
          a === i.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(e(i))) : o[c] = o[c] || { _errors: [] }, o = o[c], a++;
        }
      }
  };
  return r(t), n;
}
const cn = (t) => (e, n, r, s) => {
  const i = r ? Object.assign(r, { async: !1 }) : { async: !1 }, o = e._zod.run({ value: n, issues: [] }, i);
  if (o instanceof Promise)
    throw new st();
  if (o.issues.length) {
    const a = new ((s == null ? void 0 : s.Err) ?? t)(o.issues.map((c) => He(c, i, Ue())));
    throw $s(a, s == null ? void 0 : s.callee), a;
  }
  return o.value;
}, $o = /* @__PURE__ */ cn(an), un = (t) => async (e, n, r, s) => {
  const i = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let o = e._zod.run({ value: n, issues: [] }, i);
  if (o instanceof Promise && (o = await o), o.issues.length) {
    const a = new ((s == null ? void 0 : s.Err) ?? t)(o.issues.map((c) => He(c, i, Ue())));
    throw $s(a, s == null ? void 0 : s.callee), a;
  }
  return o.value;
}, zo = /* @__PURE__ */ un(an), ln = (t) => (e, n, r) => {
  const s = r ? { ...r, async: !1 } : { async: !1 }, i = e._zod.run({ value: n, issues: [] }, s);
  if (i instanceof Promise)
    throw new st();
  return i.issues.length ? {
    success: !1,
    error: new (t ?? Ns)(i.issues.map((o) => He(o, s, Ue())))
  } : { success: !0, data: i.value };
}, Kn = /* @__PURE__ */ ln(an), dn = (t) => async (e, n, r) => {
  const s = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = e._zod.run({ value: n, issues: [] }, s);
  return i instanceof Promise && (i = await i), i.issues.length ? {
    success: !1,
    error: new t(i.issues.map((o) => He(o, s, Ue())))
  } : { success: !0, data: i.value };
}, Yn = /* @__PURE__ */ dn(an), Eo = (t) => (e, n, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return cn(t)(e, n, s);
}, No = (t) => (e, n, r) => cn(t)(e, n, r), Oo = (t) => async (e, n, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return un(t)(e, n, s);
}, Co = (t) => async (e, n, r) => un(t)(e, n, r), xo = (t) => (e, n, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return ln(t)(e, n, s);
}, Io = (t) => (e, n, r) => ln(t)(e, n, r), Ao = (t) => async (e, n, r) => {
  const s = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return dn(t)(e, n, s);
}, Zo = (t) => async (e, n, r) => dn(t)(e, n, r), jo = /^[cC][^\s-]{8,}$/, Mo = /^[0-9a-z]+$/, Lo = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, qo = /^[0-9a-vA-V]{20}$/, Do = /^[A-Za-z0-9]{27}$/, Uo = /^[a-zA-Z0-9_-]{21}$/, Ho = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Fo = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, $r = (t) => t ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${t}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Vo = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Jo = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function Wo() {
  return new RegExp(Jo, "u");
}
const Bo = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Go = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Ko = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Yo = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qo = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, Os = /^[A-Za-z0-9_-]*$/, Xo = /^\+[1-9]\d{6,14}$/, Cs = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ea = /* @__PURE__ */ new RegExp(`^${Cs}$`);
function xs(t) {
  const e = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof t.precision == "number" ? t.precision === -1 ? `${e}` : t.precision === 0 ? `${e}:[0-5]\\d` : `${e}:[0-5]\\d\\.\\d{${t.precision}}` : `${e}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ta(t) {
  return new RegExp(`^${xs(t)}$`);
}
function na(t) {
  const e = xs({ precision: t.precision }), n = ["Z"];
  t.local && n.push(""), t.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${e}(?:${n.join("|")})`;
  return new RegExp(`^${Cs}T(?:${r})$`);
}
const ra = (t) => {
  const e = t ? `[\\s\\S]{${(t == null ? void 0 : t.minimum) ?? 0},${(t == null ? void 0 : t.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${e}$`);
}, sa = /^-?\d+$/, Is = /^-?\d+(?:\.\d+)?$/, ia = /^(?:true|false)$/i, oa = /^null$/i, aa = /^[^A-Z]*$/, ca = /^[^a-z]*$/, Se = /* @__PURE__ */ _("$ZodCheck", (t, e) => {
  var n;
  t._zod ?? (t._zod = {}), t._zod.def = e, (n = t._zod).onattach ?? (n.onattach = []);
}), As = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Zs = /* @__PURE__ */ _("$ZodCheckLessThan", (t, e) => {
  Se.init(t, e);
  const n = As[typeof e.value];
  t._zod.onattach.push((r) => {
    const s = r._zod.bag, i = (e.inclusive ? s.maximum : s.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    e.value < i && (e.inclusive ? s.maximum = e.value : s.exclusiveMaximum = e.value);
  }), t._zod.check = (r) => {
    (e.inclusive ? r.value <= e.value : r.value < e.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: r.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), js = /* @__PURE__ */ _("$ZodCheckGreaterThan", (t, e) => {
  Se.init(t, e);
  const n = As[typeof e.value];
  t._zod.onattach.push((r) => {
    const s = r._zod.bag, i = (e.inclusive ? s.minimum : s.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    e.value > i && (e.inclusive ? s.minimum = e.value : s.exclusiveMinimum = e.value);
  }), t._zod.check = (r) => {
    (e.inclusive ? r.value >= e.value : r.value > e.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: typeof e.value == "object" ? e.value.getTime() : e.value,
      input: r.value,
      inclusive: e.inclusive,
      inst: t,
      continue: !e.abort
    });
  };
}), ua = /* @__PURE__ */ _("$ZodCheckMultipleOf", (t, e) => {
  Se.init(t, e), t._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = e.value);
  }), t._zod.check = (n) => {
    if (typeof n.value != typeof e.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % e.value === BigInt(0) : fo(n.value, e.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: e.value,
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), la = /* @__PURE__ */ _("$ZodCheckNumberFormat", (t, e) => {
  var o;
  Se.init(t, e), e.format = e.format || "float64";
  const n = (o = e.format) == null ? void 0 : o.includes("int"), r = n ? "int" : "number", [s, i] = _o[e.format];
  t._zod.onattach.push((a) => {
    const c = a._zod.bag;
    c.format = e.format, c.minimum = s, c.maximum = i, n && (c.pattern = sa);
  }), t._zod.check = (a) => {
    const c = a.value;
    if (n) {
      if (!Number.isInteger(c)) {
        a.issues.push({
          expected: r,
          format: e.format,
          code: "invalid_type",
          continue: !1,
          input: c,
          inst: t
        });
        return;
      }
      if (!Number.isSafeInteger(c)) {
        c > 0 ? a.issues.push({
          input: c,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: r,
          inclusive: !0,
          continue: !e.abort
        }) : a.issues.push({
          input: c,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: t,
          origin: r,
          inclusive: !0,
          continue: !e.abort
        });
        return;
      }
    }
    c < s && a.issues.push({
      origin: "number",
      input: c,
      code: "too_small",
      minimum: s,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    }), c > i && a.issues.push({
      origin: "number",
      input: c,
      code: "too_big",
      maximum: i,
      inclusive: !0,
      inst: t,
      continue: !e.abort
    });
  };
}), da = /* @__PURE__ */ _("$ZodCheckMaxLength", (t, e) => {
  var n;
  Se.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const s = r.value;
    return !Wn(s) && s.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const s = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    e.maximum < s && (r._zod.bag.maximum = e.maximum);
  }), t._zod.check = (r) => {
    const s = r.value;
    if (s.length <= e.maximum)
      return;
    const o = Gn(s);
    r.issues.push({
      origin: o,
      code: "too_big",
      maximum: e.maximum,
      inclusive: !0,
      input: s,
      inst: t,
      continue: !e.abort
    });
  };
}), fa = /* @__PURE__ */ _("$ZodCheckMinLength", (t, e) => {
  var n;
  Se.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const s = r.value;
    return !Wn(s) && s.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const s = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    e.minimum > s && (r._zod.bag.minimum = e.minimum);
  }), t._zod.check = (r) => {
    const s = r.value;
    if (s.length >= e.minimum)
      return;
    const o = Gn(s);
    r.issues.push({
      origin: o,
      code: "too_small",
      minimum: e.minimum,
      inclusive: !0,
      input: s,
      inst: t,
      continue: !e.abort
    });
  };
}), ha = /* @__PURE__ */ _("$ZodCheckLengthEquals", (t, e) => {
  var n;
  Se.init(t, e), (n = t._zod.def).when ?? (n.when = (r) => {
    const s = r.value;
    return !Wn(s) && s.length !== void 0;
  }), t._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.minimum = e.length, s.maximum = e.length, s.length = e.length;
  }), t._zod.check = (r) => {
    const s = r.value, i = s.length;
    if (i === e.length)
      return;
    const o = Gn(s), a = i > e.length;
    r.issues.push({
      origin: o,
      ...a ? { code: "too_big", maximum: e.length } : { code: "too_small", minimum: e.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), fn = /* @__PURE__ */ _("$ZodCheckStringFormat", (t, e) => {
  var n, r;
  Se.init(t, e), t._zod.onattach.push((s) => {
    const i = s._zod.bag;
    i.format = e.format, e.pattern && (i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(e.pattern));
  }), e.pattern ? (n = t._zod).check ?? (n.check = (s) => {
    e.pattern.lastIndex = 0, !e.pattern.test(s.value) && s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: e.format,
      input: s.value,
      ...e.pattern ? { pattern: e.pattern.toString() } : {},
      inst: t,
      continue: !e.abort
    });
  }) : (r = t._zod).check ?? (r.check = () => {
  });
}), pa = /* @__PURE__ */ _("$ZodCheckRegex", (t, e) => {
  fn.init(t, e), t._zod.check = (n) => {
    e.pattern.lastIndex = 0, !e.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: e.pattern.toString(),
      inst: t,
      continue: !e.abort
    });
  };
}), ma = /* @__PURE__ */ _("$ZodCheckLowerCase", (t, e) => {
  e.pattern ?? (e.pattern = aa), fn.init(t, e);
}), ga = /* @__PURE__ */ _("$ZodCheckUpperCase", (t, e) => {
  e.pattern ?? (e.pattern = ca), fn.init(t, e);
}), _a = /* @__PURE__ */ _("$ZodCheckIncludes", (t, e) => {
  Se.init(t, e);
  const n = ot(e.includes), r = new RegExp(typeof e.position == "number" ? `^.{${e.position}}${n}` : n);
  e.pattern = r, t._zod.onattach.push((s) => {
    const i = s._zod.bag;
    i.patterns ?? (i.patterns = /* @__PURE__ */ new Set()), i.patterns.add(r);
  }), t._zod.check = (s) => {
    s.value.includes(e.includes, e.position) || s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: e.includes,
      input: s.value,
      inst: t,
      continue: !e.abort
    });
  };
}), ya = /* @__PURE__ */ _("$ZodCheckStartsWith", (t, e) => {
  Se.init(t, e);
  const n = new RegExp(`^${ot(e.prefix)}.*`);
  e.pattern ?? (e.pattern = n), t._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(n);
  }), t._zod.check = (r) => {
    r.value.startsWith(e.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: e.prefix,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), va = /* @__PURE__ */ _("$ZodCheckEndsWith", (t, e) => {
  Se.init(t, e);
  const n = new RegExp(`.*${ot(e.suffix)}$`);
  e.pattern ?? (e.pattern = n), t._zod.onattach.push((r) => {
    const s = r._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(n);
  }), t._zod.check = (r) => {
    r.value.endsWith(e.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: e.suffix,
      input: r.value,
      inst: t,
      continue: !e.abort
    });
  };
}), ba = /* @__PURE__ */ _("$ZodCheckOverwrite", (t, e) => {
  Se.init(t, e), t._zod.check = (n) => {
    n.value = e.tx(n.value);
  };
});
class wa {
  constructor(e = []) {
    this.content = [], this.indent = 0, this && (this.args = e);
  }
  indented(e) {
    this.indent += 1, e(this), this.indent -= 1;
  }
  write(e) {
    if (typeof e == "function") {
      e(this, { execution: "sync" }), e(this, { execution: "async" });
      return;
    }
    const r = e.split(`
`).filter((o) => o), s = Math.min(...r.map((o) => o.length - o.trimStart().length)), i = r.map((o) => o.slice(s)).map((o) => " ".repeat(this.indent * 2) + o);
    for (const o of i)
      this.content.push(o);
  }
  compile() {
    const e = Function, n = this == null ? void 0 : this.args, s = [...((this == null ? void 0 : this.content) ?? [""]).map((i) => `  ${i}`)];
    return new e(...n, s.join(`
`));
  }
}
const ka = {
  major: 4,
  minor: 3,
  patch: 6
}, X = /* @__PURE__ */ _("$ZodType", (t, e) => {
  var s;
  var n;
  t ?? (t = {}), t._zod.def = e, t._zod.bag = t._zod.bag || {}, t._zod.version = ka;
  const r = [...t._zod.def.checks ?? []];
  t._zod.traits.has("$ZodCheck") && r.unshift(t);
  for (const i of r)
    for (const o of i._zod.onattach)
      o(t);
  if (r.length === 0)
    (n = t._zod).deferred ?? (n.deferred = []), (s = t._zod.deferred) == null || s.push(() => {
      t._zod.run = t._zod.parse;
    });
  else {
    const i = (a, c, u) => {
      let l = tt(a), d;
      for (const m of c) {
        if (m._zod.def.when) {
          if (!m._zod.def.when(a))
            continue;
        } else if (l)
          continue;
        const p = a.issues.length, S = m._zod.check(a);
        if (S instanceof Promise && (u == null ? void 0 : u.async) === !1)
          throw new st();
        if (d || S instanceof Promise)
          d = (d ?? Promise.resolve()).then(async () => {
            await S, a.issues.length !== p && (l || (l = tt(a, p)));
          });
        else {
          if (a.issues.length === p)
            continue;
          l || (l = tt(a, p));
        }
      }
      return d ? d.then(() => a) : a;
    }, o = (a, c, u) => {
      if (tt(a))
        return a.aborted = !0, a;
      const l = i(c, r, u);
      if (l instanceof Promise) {
        if (u.async === !1)
          throw new st();
        return l.then((d) => t._zod.parse(d, u));
      }
      return t._zod.parse(l, u);
    };
    t._zod.run = (a, c) => {
      if (c.skipChecks)
        return t._zod.parse(a, c);
      if (c.direction === "backward") {
        const l = t._zod.parse({ value: a.value, issues: [] }, { ...c, skipChecks: !0 });
        return l instanceof Promise ? l.then((d) => o(d, a, c)) : o(l, a, c);
      }
      const u = t._zod.parse(a, c);
      if (u instanceof Promise) {
        if (c.async === !1)
          throw new st();
        return u.then((l) => i(l, r, c));
      }
      return i(u, r, c);
    };
  }
  W(t, "~standard", () => ({
    validate: (i) => {
      var o;
      try {
        const a = Kn(t, i);
        return a.success ? { value: a.data } : { issues: (o = a.error) == null ? void 0 : o.issues };
      } catch {
        return Yn(t, i).then((c) => {
          var u;
          return c.success ? { value: c.data } : { issues: (u = c.error) == null ? void 0 : u.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Qn = /* @__PURE__ */ _("$ZodString", (t, e) => {
  var n;
  X.init(t, e), t._zod.pattern = [...((n = t == null ? void 0 : t._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? ra(t._zod.bag), t._zod.parse = (r, s) => {
    if (e.coerce)
      try {
        r.value = String(r.value);
      } catch {
      }
    return typeof r.value == "string" || r.issues.push({
      expected: "string",
      code: "invalid_type",
      input: r.value,
      inst: t
    }), r;
  };
}), ne = /* @__PURE__ */ _("$ZodStringFormat", (t, e) => {
  fn.init(t, e), Qn.init(t, e);
}), Sa = /* @__PURE__ */ _("$ZodGUID", (t, e) => {
  e.pattern ?? (e.pattern = Fo), ne.init(t, e);
}), Ta = /* @__PURE__ */ _("$ZodUUID", (t, e) => {
  if (e.version) {
    const r = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[e.version];
    if (r === void 0)
      throw new Error(`Invalid UUID version: "${e.version}"`);
    e.pattern ?? (e.pattern = $r(r));
  } else
    e.pattern ?? (e.pattern = $r());
  ne.init(t, e);
}), Pa = /* @__PURE__ */ _("$ZodEmail", (t, e) => {
  e.pattern ?? (e.pattern = Vo), ne.init(t, e);
}), Ra = /* @__PURE__ */ _("$ZodURL", (t, e) => {
  ne.init(t, e), t._zod.check = (n) => {
    try {
      const r = n.value.trim(), s = new URL(r);
      e.hostname && (e.hostname.lastIndex = 0, e.hostname.test(s.hostname) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: e.hostname.source,
        input: n.value,
        inst: t,
        continue: !e.abort
      })), e.protocol && (e.protocol.lastIndex = 0, e.protocol.test(s.protocol.endsWith(":") ? s.protocol.slice(0, -1) : s.protocol) || n.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: e.protocol.source,
        input: n.value,
        inst: t,
        continue: !e.abort
      })), e.normalize ? n.value = s.href : n.value = r;
      return;
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "url",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), $a = /* @__PURE__ */ _("$ZodEmoji", (t, e) => {
  e.pattern ?? (e.pattern = Wo()), ne.init(t, e);
}), za = /* @__PURE__ */ _("$ZodNanoID", (t, e) => {
  e.pattern ?? (e.pattern = Uo), ne.init(t, e);
}), Ea = /* @__PURE__ */ _("$ZodCUID", (t, e) => {
  e.pattern ?? (e.pattern = jo), ne.init(t, e);
}), Na = /* @__PURE__ */ _("$ZodCUID2", (t, e) => {
  e.pattern ?? (e.pattern = Mo), ne.init(t, e);
}), Oa = /* @__PURE__ */ _("$ZodULID", (t, e) => {
  e.pattern ?? (e.pattern = Lo), ne.init(t, e);
}), Ca = /* @__PURE__ */ _("$ZodXID", (t, e) => {
  e.pattern ?? (e.pattern = qo), ne.init(t, e);
}), xa = /* @__PURE__ */ _("$ZodKSUID", (t, e) => {
  e.pattern ?? (e.pattern = Do), ne.init(t, e);
}), Ia = /* @__PURE__ */ _("$ZodISODateTime", (t, e) => {
  e.pattern ?? (e.pattern = na(e)), ne.init(t, e);
}), Aa = /* @__PURE__ */ _("$ZodISODate", (t, e) => {
  e.pattern ?? (e.pattern = ea), ne.init(t, e);
}), Za = /* @__PURE__ */ _("$ZodISOTime", (t, e) => {
  e.pattern ?? (e.pattern = ta(e)), ne.init(t, e);
}), ja = /* @__PURE__ */ _("$ZodISODuration", (t, e) => {
  e.pattern ?? (e.pattern = Ho), ne.init(t, e);
}), Ma = /* @__PURE__ */ _("$ZodIPv4", (t, e) => {
  e.pattern ?? (e.pattern = Bo), ne.init(t, e), t._zod.bag.format = "ipv4";
}), La = /* @__PURE__ */ _("$ZodIPv6", (t, e) => {
  e.pattern ?? (e.pattern = Go), ne.init(t, e), t._zod.bag.format = "ipv6", t._zod.check = (n) => {
    try {
      new URL(`http://[${n.value}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
}), qa = /* @__PURE__ */ _("$ZodCIDRv4", (t, e) => {
  e.pattern ?? (e.pattern = Ko), ne.init(t, e);
}), Da = /* @__PURE__ */ _("$ZodCIDRv6", (t, e) => {
  e.pattern ?? (e.pattern = Yo), ne.init(t, e), t._zod.check = (n) => {
    const r = n.value.split("/");
    try {
      if (r.length !== 2)
        throw new Error();
      const [s, i] = r;
      if (!i)
        throw new Error();
      const o = Number(i);
      if (`${o}` !== i)
        throw new Error();
      if (o < 0 || o > 128)
        throw new Error();
      new URL(`http://[${s}]`);
    } catch {
      n.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: n.value,
        inst: t,
        continue: !e.abort
      });
    }
  };
});
function Ms(t) {
  if (t === "")
    return !0;
  if (t.length % 4 !== 0)
    return !1;
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}
const Ua = /* @__PURE__ */ _("$ZodBase64", (t, e) => {
  e.pattern ?? (e.pattern = Qo), ne.init(t, e), t._zod.bag.contentEncoding = "base64", t._zod.check = (n) => {
    Ms(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
});
function Ha(t) {
  if (!Os.test(t))
    return !1;
  const e = t.replace(/[-_]/g, (r) => r === "-" ? "+" : "/"), n = e.padEnd(Math.ceil(e.length / 4) * 4, "=");
  return Ms(n);
}
const Fa = /* @__PURE__ */ _("$ZodBase64URL", (t, e) => {
  e.pattern ?? (e.pattern = Os), ne.init(t, e), t._zod.bag.contentEncoding = "base64url", t._zod.check = (n) => {
    Ha(n.value) || n.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Va = /* @__PURE__ */ _("$ZodE164", (t, e) => {
  e.pattern ?? (e.pattern = Xo), ne.init(t, e);
});
function Ja(t, e = null) {
  try {
    const n = t.split(".");
    if (n.length !== 3)
      return !1;
    const [r] = n;
    if (!r)
      return !1;
    const s = JSON.parse(atob(r));
    return !("typ" in s && (s == null ? void 0 : s.typ) !== "JWT" || !s.alg || e && (!("alg" in s) || s.alg !== e));
  } catch {
    return !1;
  }
}
const Wa = /* @__PURE__ */ _("$ZodJWT", (t, e) => {
  ne.init(t, e), t._zod.check = (n) => {
    Ja(n.value, e.alg) || n.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: n.value,
      inst: t,
      continue: !e.abort
    });
  };
}), Ls = /* @__PURE__ */ _("$ZodNumber", (t, e) => {
  X.init(t, e), t._zod.pattern = t._zod.bag.pattern ?? Is, t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const s = n.value;
    if (typeof s == "number" && !Number.isNaN(s) && Number.isFinite(s))
      return n;
    const i = typeof s == "number" ? Number.isNaN(s) ? "NaN" : Number.isFinite(s) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: s,
      inst: t,
      ...i ? { received: i } : {}
    }), n;
  };
}), Ba = /* @__PURE__ */ _("$ZodNumberFormat", (t, e) => {
  la.init(t, e), Ls.init(t, e);
}), Ga = /* @__PURE__ */ _("$ZodBoolean", (t, e) => {
  X.init(t, e), t._zod.pattern = ia, t._zod.parse = (n, r) => {
    if (e.coerce)
      try {
        n.value = !!n.value;
      } catch {
      }
    const s = n.value;
    return typeof s == "boolean" || n.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: s,
      inst: t
    }), n;
  };
}), Ka = /* @__PURE__ */ _("$ZodNull", (t, e) => {
  X.init(t, e), t._zod.pattern = oa, t._zod.values = /* @__PURE__ */ new Set([null]), t._zod.parse = (n, r) => {
    const s = n.value;
    return s === null || n.issues.push({
      expected: "null",
      code: "invalid_type",
      input: s,
      inst: t
    }), n;
  };
}), Ya = /* @__PURE__ */ _("$ZodUnknown", (t, e) => {
  X.init(t, e), t._zod.parse = (n) => n;
}), Qa = /* @__PURE__ */ _("$ZodNever", (t, e) => {
  X.init(t, e), t._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: t
  }), n);
});
function zr(t, e, n) {
  t.issues.length && e.issues.push(...nt(n, t.issues)), e.value[n] = t.value;
}
const Xa = /* @__PURE__ */ _("$ZodArray", (t, e) => {
  X.init(t, e), t._zod.parse = (n, r) => {
    const s = n.value;
    if (!Array.isArray(s))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: s,
        inst: t
      }), n;
    n.value = Array(s.length);
    const i = [];
    for (let o = 0; o < s.length; o++) {
      const a = s[o], c = e.element._zod.run({
        value: a,
        issues: []
      }, r);
      c instanceof Promise ? i.push(c.then((u) => zr(u, n, o))) : zr(c, n, o);
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
});
function qt(t, e, n, r, s) {
  if (t.issues.length) {
    if (s && !(n in r))
      return;
    e.issues.push(...nt(n, t.issues));
  }
  t.value === void 0 ? n in r && (e.value[n] = void 0) : e.value[n] = t.value;
}
function qs(t) {
  var r, s, i, o;
  const e = Object.keys(t.shape);
  for (const a of e)
    if (!((o = (i = (s = (r = t.shape) == null ? void 0 : r[a]) == null ? void 0 : s._zod) == null ? void 0 : i.traits) != null && o.has("$ZodType")))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const n = go(t.shape);
  return {
    ...t,
    keys: e,
    keySet: new Set(e),
    numKeys: e.length,
    optionalKeys: new Set(n)
  };
}
function Ds(t, e, n, r, s, i) {
  const o = [], a = s.keySet, c = s.catchall._zod, u = c.def.type, l = c.optout === "optional";
  for (const d in e) {
    if (a.has(d))
      continue;
    if (u === "never") {
      o.push(d);
      continue;
    }
    const m = c.run({ value: e[d], issues: [] }, r);
    m instanceof Promise ? t.push(m.then((p) => qt(p, n, d, e, l))) : qt(m, n, d, e, l);
  }
  return o.length && n.issues.push({
    code: "unrecognized_keys",
    keys: o,
    input: e,
    inst: i
  }), t.length ? Promise.all(t).then(() => n) : n;
}
const Us = /* @__PURE__ */ _("$ZodObject", (t, e) => {
  X.init(t, e);
  const n = Object.getOwnPropertyDescriptor(e, "shape");
  if (!(n != null && n.get)) {
    const a = e.shape;
    Object.defineProperty(e, "shape", {
      get: () => {
        const c = { ...a };
        return Object.defineProperty(e, "shape", {
          value: c
        }), c;
      }
    });
  }
  const r = on(() => qs(e));
  W(t._zod, "propValues", () => {
    const a = e.shape, c = {};
    for (const u in a) {
      const l = a[u]._zod;
      if (l.values) {
        c[u] ?? (c[u] = /* @__PURE__ */ new Set());
        for (const d of l.values)
          c[u].add(d);
      }
    }
    return c;
  });
  const s = wt, i = e.catchall;
  let o;
  t._zod.parse = (a, c) => {
    o ?? (o = r.value);
    const u = a.value;
    if (!s(u))
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: u,
        inst: t
      }), a;
    a.value = {};
    const l = [], d = o.shape;
    for (const m of o.keys) {
      const p = d[m], S = p._zod.optout === "optional", T = p._zod.run({ value: u[m], issues: [] }, c);
      T instanceof Promise ? l.push(T.then((j) => qt(j, a, m, u, S))) : qt(T, a, m, u, S);
    }
    return i ? Ds(l, u, a, c, r.value, t) : l.length ? Promise.all(l).then(() => a) : a;
  };
}), ec = /* @__PURE__ */ _("$ZodObjectJIT", (t, e) => {
  Us.init(t, e);
  const n = t._zod.parse, r = on(() => qs(e)), s = (m) => {
    var A;
    const p = new wa(["shape", "payload", "ctx"]), S = r.value, T = (z) => {
      const te = Rr(z);
      return `shape[${te}]._zod.run({ value: input[${te}], issues: [] }, ctx)`;
    };
    p.write("const input = payload.value;");
    const j = /* @__PURE__ */ Object.create(null);
    let y = 0;
    for (const z of S.keys)
      j[z] = `key_${y++}`;
    p.write("const newResult = {};");
    for (const z of S.keys) {
      const te = j[z], ue = Rr(z), G = m[z], _e = ((A = G == null ? void 0 : G._zod) == null ? void 0 : A.optout) === "optional";
      p.write(`const ${te} = ${T(z)};`), _e ? p.write(`
        if (${te}.issues.length) {
          if (${ue} in input) {
            payload.issues = payload.issues.concat(${te}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${ue}, ...iss.path] : [${ue}]
            })));
          }
        }
        
        if (${te}.value === undefined) {
          if (${ue} in input) {
            newResult[${ue}] = undefined;
          }
        } else {
          newResult[${ue}] = ${te}.value;
        }
        
      `) : p.write(`
        if (${te}.issues.length) {
          payload.issues = payload.issues.concat(${te}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${ue}, ...iss.path] : [${ue}]
          })));
        }
        
        if (${te}.value === undefined) {
          if (${ue} in input) {
            newResult[${ue}] = undefined;
          }
        } else {
          newResult[${ue}] = ${te}.value;
        }
        
      `);
    }
    p.write("payload.value = newResult;"), p.write("return payload;");
    const v = p.compile();
    return (z, te) => v(m, z, te);
  };
  let i;
  const o = wt, a = !Ps.jitless, u = a && po.value, l = e.catchall;
  let d;
  t._zod.parse = (m, p) => {
    d ?? (d = r.value);
    const S = m.value;
    return o(S) ? a && u && (p == null ? void 0 : p.async) === !1 && p.jitless !== !0 ? (i || (i = s(e.shape)), m = i(m, p), l ? Ds([], S, m, p, d, t) : m) : n(m, p) : (m.issues.push({
      expected: "object",
      code: "invalid_type",
      input: S,
      inst: t
    }), m);
  };
});
function Er(t, e, n, r) {
  for (const i of t)
    if (i.issues.length === 0)
      return e.value = i.value, e;
  const s = t.filter((i) => !tt(i));
  return s.length === 1 ? (e.value = s[0].value, s[0]) : (e.issues.push({
    code: "invalid_union",
    input: e.value,
    inst: n,
    errors: t.map((i) => i.issues.map((o) => He(o, r, Ue())))
  }), e);
}
const Hs = /* @__PURE__ */ _("$ZodUnion", (t, e) => {
  X.init(t, e), W(t._zod, "optin", () => e.options.some((s) => s._zod.optin === "optional") ? "optional" : void 0), W(t._zod, "optout", () => e.options.some((s) => s._zod.optout === "optional") ? "optional" : void 0), W(t._zod, "values", () => {
    if (e.options.every((s) => s._zod.values))
      return new Set(e.options.flatMap((s) => Array.from(s._zod.values)));
  }), W(t._zod, "pattern", () => {
    if (e.options.every((s) => s._zod.pattern)) {
      const s = e.options.map((i) => i._zod.pattern);
      return new RegExp(`^(${s.map((i) => Bn(i.source)).join("|")})$`);
    }
  });
  const n = e.options.length === 1, r = e.options[0]._zod.run;
  t._zod.parse = (s, i) => {
    if (n)
      return r(s, i);
    let o = !1;
    const a = [];
    for (const c of e.options) {
      const u = c._zod.run({
        value: s.value,
        issues: []
      }, i);
      if (u instanceof Promise)
        a.push(u), o = !0;
      else {
        if (u.issues.length === 0)
          return u;
        a.push(u);
      }
    }
    return o ? Promise.all(a).then((c) => Er(c, s, t, i)) : Er(a, s, t, i);
  };
}), tc = /* @__PURE__ */ _("$ZodDiscriminatedUnion", (t, e) => {
  e.inclusive = !1, Hs.init(t, e);
  const n = t._zod.parse;
  W(t._zod, "propValues", () => {
    const s = {};
    for (const i of e.options) {
      const o = i._zod.propValues;
      if (!o || Object.keys(o).length === 0)
        throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(i)}"`);
      for (const [a, c] of Object.entries(o)) {
        s[a] || (s[a] = /* @__PURE__ */ new Set());
        for (const u of c)
          s[a].add(u);
      }
    }
    return s;
  });
  const r = on(() => {
    var o;
    const s = e.options, i = /* @__PURE__ */ new Map();
    for (const a of s) {
      const c = (o = a._zod.propValues) == null ? void 0 : o[e.discriminator];
      if (!c || c.size === 0)
        throw new Error(`Invalid discriminated union option at index "${e.options.indexOf(a)}"`);
      for (const u of c) {
        if (i.has(u))
          throw new Error(`Duplicate discriminator value "${String(u)}"`);
        i.set(u, a);
      }
    }
    return i;
  });
  t._zod.parse = (s, i) => {
    const o = s.value;
    if (!wt(o))
      return s.issues.push({
        code: "invalid_type",
        expected: "object",
        input: o,
        inst: t
      }), s;
    const a = r.value.get(o == null ? void 0 : o[e.discriminator]);
    return a ? a._zod.run(s, i) : e.unionFallback ? n(s, i) : (s.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: e.discriminator,
      input: o,
      path: [e.discriminator],
      inst: t
    }), s);
  };
}), nc = /* @__PURE__ */ _("$ZodIntersection", (t, e) => {
  X.init(t, e), t._zod.parse = (n, r) => {
    const s = n.value, i = e.left._zod.run({ value: s, issues: [] }, r), o = e.right._zod.run({ value: s, issues: [] }, r);
    return i instanceof Promise || o instanceof Promise ? Promise.all([i, o]).then(([c, u]) => Nr(n, c, u)) : Nr(n, i, o);
  };
});
function Pn(t, e) {
  if (t === e)
    return { valid: !0, data: t };
  if (t instanceof Date && e instanceof Date && +t == +e)
    return { valid: !0, data: t };
  if (it(t) && it(e)) {
    const n = Object.keys(e), r = Object.keys(t).filter((i) => n.indexOf(i) !== -1), s = { ...t, ...e };
    for (const i of r) {
      const o = Pn(t[i], e[i]);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [i, ...o.mergeErrorPath]
        };
      s[i] = o.data;
    }
    return { valid: !0, data: s };
  }
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < t.length; r++) {
      const s = t[r], i = e[r], o = Pn(s, i);
      if (!o.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...o.mergeErrorPath]
        };
      n.push(o.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Nr(t, e, n) {
  const r = /* @__PURE__ */ new Map();
  let s;
  for (const a of e.issues)
    if (a.code === "unrecognized_keys") {
      s ?? (s = a);
      for (const c of a.keys)
        r.has(c) || r.set(c, {}), r.get(c).l = !0;
    } else
      t.issues.push(a);
  for (const a of n.issues)
    if (a.code === "unrecognized_keys")
      for (const c of a.keys)
        r.has(c) || r.set(c, {}), r.get(c).r = !0;
    else
      t.issues.push(a);
  const i = [...r].filter(([, a]) => a.l && a.r).map(([a]) => a);
  if (i.length && s && t.issues.push({ ...s, keys: i }), tt(t))
    return t;
  const o = Pn(e.value, n.value);
  if (!o.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
  return t.value = o.data, t;
}
const rc = /* @__PURE__ */ _("$ZodRecord", (t, e) => {
  X.init(t, e), t._zod.parse = (n, r) => {
    const s = n.value;
    if (!it(s))
      return n.issues.push({
        expected: "record",
        code: "invalid_type",
        input: s,
        inst: t
      }), n;
    const i = [], o = e.keyType._zod.values;
    if (o) {
      n.value = {};
      const a = /* @__PURE__ */ new Set();
      for (const u of o)
        if (typeof u == "string" || typeof u == "number" || typeof u == "symbol") {
          a.add(typeof u == "number" ? u.toString() : u);
          const l = e.valueType._zod.run({ value: s[u], issues: [] }, r);
          l instanceof Promise ? i.push(l.then((d) => {
            d.issues.length && n.issues.push(...nt(u, d.issues)), n.value[u] = d.value;
          })) : (l.issues.length && n.issues.push(...nt(u, l.issues)), n.value[u] = l.value);
        }
      let c;
      for (const u in s)
        a.has(u) || (c = c ?? [], c.push(u));
      c && c.length > 0 && n.issues.push({
        code: "unrecognized_keys",
        input: s,
        inst: t,
        keys: c
      });
    } else {
      n.value = {};
      for (const a of Reflect.ownKeys(s)) {
        if (a === "__proto__")
          continue;
        let c = e.keyType._zod.run({ value: a, issues: [] }, r);
        if (c instanceof Promise)
          throw new Error("Async schemas not supported in object keys currently");
        if (typeof a == "string" && Is.test(a) && c.issues.length) {
          const d = e.keyType._zod.run({ value: Number(a), issues: [] }, r);
          if (d instanceof Promise)
            throw new Error("Async schemas not supported in object keys currently");
          d.issues.length === 0 && (c = d);
        }
        if (c.issues.length) {
          e.mode === "loose" ? n.value[a] = s[a] : n.issues.push({
            code: "invalid_key",
            origin: "record",
            issues: c.issues.map((d) => He(d, r, Ue())),
            input: a,
            path: [a],
            inst: t
          });
          continue;
        }
        const l = e.valueType._zod.run({ value: s[a], issues: [] }, r);
        l instanceof Promise ? i.push(l.then((d) => {
          d.issues.length && n.issues.push(...nt(a, d.issues)), n.value[c.value] = d.value;
        })) : (l.issues.length && n.issues.push(...nt(a, l.issues)), n.value[c.value] = l.value);
      }
    }
    return i.length ? Promise.all(i).then(() => n) : n;
  };
}), sc = /* @__PURE__ */ _("$ZodEnum", (t, e) => {
  X.init(t, e);
  const n = Rs(e.entries), r = new Set(n);
  t._zod.values = r, t._zod.pattern = new RegExp(`^(${n.filter((s) => mo.has(typeof s)).map((s) => typeof s == "string" ? ot(s) : s.toString()).join("|")})$`), t._zod.parse = (s, i) => {
    const o = s.value;
    return r.has(o) || s.issues.push({
      code: "invalid_value",
      values: n,
      input: o,
      inst: t
    }), s;
  };
}), ic = /* @__PURE__ */ _("$ZodLiteral", (t, e) => {
  if (X.init(t, e), e.values.length === 0)
    throw new Error("Cannot create literal schema with no valid values");
  const n = new Set(e.values);
  t._zod.values = n, t._zod.pattern = new RegExp(`^(${e.values.map((r) => typeof r == "string" ? ot(r) : r ? ot(r.toString()) : String(r)).join("|")})$`), t._zod.parse = (r, s) => {
    const i = r.value;
    return n.has(i) || r.issues.push({
      code: "invalid_value",
      values: e.values,
      input: i,
      inst: t
    }), r;
  };
}), oc = /* @__PURE__ */ _("$ZodTransform", (t, e) => {
  X.init(t, e), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Ts(t.constructor.name);
    const s = e.transform(n.value, n);
    if (r.async)
      return (s instanceof Promise ? s : Promise.resolve(s)).then((o) => (n.value = o, n));
    if (s instanceof Promise)
      throw new st();
    return n.value = s, n;
  };
});
function Or(t, e) {
  return t.issues.length && e === void 0 ? { issues: [], value: void 0 } : t;
}
const Fs = /* @__PURE__ */ _("$ZodOptional", (t, e) => {
  X.init(t, e), t._zod.optin = "optional", t._zod.optout = "optional", W(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, void 0]) : void 0), W(t._zod, "pattern", () => {
    const n = e.innerType._zod.pattern;
    return n ? new RegExp(`^(${Bn(n.source)})?$`) : void 0;
  }), t._zod.parse = (n, r) => {
    if (e.innerType._zod.optin === "optional") {
      const s = e.innerType._zod.run(n, r);
      return s instanceof Promise ? s.then((i) => Or(i, n.value)) : Or(s, n.value);
    }
    return n.value === void 0 ? n : e.innerType._zod.run(n, r);
  };
}), ac = /* @__PURE__ */ _("$ZodExactOptional", (t, e) => {
  Fs.init(t, e), W(t._zod, "values", () => e.innerType._zod.values), W(t._zod, "pattern", () => e.innerType._zod.pattern), t._zod.parse = (n, r) => e.innerType._zod.run(n, r);
}), cc = /* @__PURE__ */ _("$ZodNullable", (t, e) => {
  X.init(t, e), W(t._zod, "optin", () => e.innerType._zod.optin), W(t._zod, "optout", () => e.innerType._zod.optout), W(t._zod, "pattern", () => {
    const n = e.innerType._zod.pattern;
    return n ? new RegExp(`^(${Bn(n.source)}|null)$`) : void 0;
  }), W(t._zod, "values", () => e.innerType._zod.values ? /* @__PURE__ */ new Set([...e.innerType._zod.values, null]) : void 0), t._zod.parse = (n, r) => n.value === null ? n : e.innerType._zod.run(n, r);
}), uc = /* @__PURE__ */ _("$ZodDefault", (t, e) => {
  X.init(t, e), t._zod.optin = "optional", W(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = e.defaultValue, n;
    const s = e.innerType._zod.run(n, r);
    return s instanceof Promise ? s.then((i) => Cr(i, e)) : Cr(s, e);
  };
});
function Cr(t, e) {
  return t.value === void 0 && (t.value = e.defaultValue), t;
}
const lc = /* @__PURE__ */ _("$ZodPrefault", (t, e) => {
  X.init(t, e), t._zod.optin = "optional", W(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = e.defaultValue), e.innerType._zod.run(n, r));
}), dc = /* @__PURE__ */ _("$ZodNonOptional", (t, e) => {
  X.init(t, e), W(t._zod, "values", () => {
    const n = e.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), t._zod.parse = (n, r) => {
    const s = e.innerType._zod.run(n, r);
    return s instanceof Promise ? s.then((i) => xr(i, t)) : xr(s, t);
  };
});
function xr(t, e) {
  return !t.issues.length && t.value === void 0 && t.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: t.value,
    inst: e
  }), t;
}
const fc = /* @__PURE__ */ _("$ZodCatch", (t, e) => {
  X.init(t, e), W(t._zod, "optin", () => e.innerType._zod.optin), W(t._zod, "optout", () => e.innerType._zod.optout), W(t._zod, "values", () => e.innerType._zod.values), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    const s = e.innerType._zod.run(n, r);
    return s instanceof Promise ? s.then((i) => (n.value = i.value, i.issues.length && (n.value = e.catchValue({
      ...n,
      error: {
        issues: i.issues.map((o) => He(o, r, Ue()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = s.value, s.issues.length && (n.value = e.catchValue({
      ...n,
      error: {
        issues: s.issues.map((i) => He(i, r, Ue()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), hc = /* @__PURE__ */ _("$ZodPipe", (t, e) => {
  X.init(t, e), W(t._zod, "values", () => e.in._zod.values), W(t._zod, "optin", () => e.in._zod.optin), W(t._zod, "optout", () => e.out._zod.optout), W(t._zod, "propValues", () => e.in._zod.propValues), t._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const i = e.out._zod.run(n, r);
      return i instanceof Promise ? i.then((o) => Zt(o, e.in, r)) : Zt(i, e.in, r);
    }
    const s = e.in._zod.run(n, r);
    return s instanceof Promise ? s.then((i) => Zt(i, e.out, r)) : Zt(s, e.out, r);
  };
});
function Zt(t, e, n) {
  return t.issues.length ? (t.aborted = !0, t) : e._zod.run({ value: t.value, issues: t.issues }, n);
}
const pc = /* @__PURE__ */ _("$ZodReadonly", (t, e) => {
  X.init(t, e), W(t._zod, "propValues", () => e.innerType._zod.propValues), W(t._zod, "values", () => e.innerType._zod.values), W(t._zod, "optin", () => {
    var n, r;
    return (r = (n = e.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optin;
  }), W(t._zod, "optout", () => {
    var n, r;
    return (r = (n = e.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optout;
  }), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return e.innerType._zod.run(n, r);
    const s = e.innerType._zod.run(n, r);
    return s instanceof Promise ? s.then(Ir) : Ir(s);
  };
});
function Ir(t) {
  return t.value = Object.freeze(t.value), t;
}
const mc = /* @__PURE__ */ _("$ZodCustom", (t, e) => {
  Se.init(t, e), X.init(t, e), t._zod.parse = (n, r) => n, t._zod.check = (n) => {
    const r = n.value, s = e.fn(r);
    if (s instanceof Promise)
      return s.then((i) => Ar(i, n, r, t));
    Ar(s, n, r, t);
  };
});
function Ar(t, e, n, r) {
  if (!t) {
    const s = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (s.params = r._zod.def.params), e.issues.push(kt(s));
  }
}
var Zr;
class gc {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(e, ...n) {
    const r = n[0];
    return this._map.set(e, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, e), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(e) {
    const n = this._map.get(e);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(e), this;
  }
  get(e) {
    const n = e._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const s = { ...r, ...this._map.get(e) };
      return Object.keys(s).length ? s : void 0;
    }
    return this._map.get(e);
  }
  has(e) {
    return this._map.has(e);
  }
}
function _c() {
  return new gc();
}
(Zr = globalThis).__zod_globalRegistry ?? (Zr.__zod_globalRegistry = _c());
const yt = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function yc(t, e) {
  return new t({
    type: "string",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function vc(t, e) {
  return new t({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function jr(t, e) {
  return new t({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function bc(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function wc(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function kc(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Sc(t, e) {
  return new t({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Tc(t, e) {
  return new t({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Pc(t, e) {
  return new t({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Rc(t, e) {
  return new t({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function $c(t, e) {
  return new t({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function zc(t, e) {
  return new t({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ec(t, e) {
  return new t({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Nc(t, e) {
  return new t({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Oc(t, e) {
  return new t({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Cc(t, e) {
  return new t({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function xc(t, e) {
  return new t({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ic(t, e) {
  return new t({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ac(t, e) {
  return new t({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Zc(t, e) {
  return new t({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function jc(t, e) {
  return new t({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Mc(t, e) {
  return new t({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Lc(t, e) {
  return new t({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function qc(t, e) {
  return new t({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Dc(t, e) {
  return new t({
    type: "string",
    format: "date",
    check: "string_format",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Uc(t, e) {
  return new t({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Hc(t, e) {
  return new t({
    type: "string",
    format: "duration",
    check: "string_format",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Fc(t, e) {
  return new t({
    type: "number",
    checks: [],
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Vc(t, e) {
  return new t({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Jc(t, e) {
  return new t({
    type: "boolean",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Wc(t, e) {
  return new t({
    type: "null",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Bc(t) {
  return new t({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function Gc(t, e) {
  return new t({
    type: "never",
    ...E(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Mr(t, e) {
  return new Zs({
    check: "less_than",
    ...E(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function _n(t, e) {
  return new Zs({
    check: "less_than",
    ...E(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Lr(t, e) {
  return new js({
    check: "greater_than",
    ...E(e),
    value: t,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function yn(t, e) {
  return new js({
    check: "greater_than",
    ...E(e),
    value: t,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function qr(t, e) {
  return new ua({
    check: "multiple_of",
    ...E(e),
    value: t
  });
}
// @__NO_SIDE_EFFECTS__
function Vs(t, e) {
  return new da({
    check: "max_length",
    ...E(e),
    maximum: t
  });
}
// @__NO_SIDE_EFFECTS__
function Dt(t, e) {
  return new fa({
    check: "min_length",
    ...E(e),
    minimum: t
  });
}
// @__NO_SIDE_EFFECTS__
function Js(t, e) {
  return new ha({
    check: "length_equals",
    ...E(e),
    length: t
  });
}
// @__NO_SIDE_EFFECTS__
function Kc(t, e) {
  return new pa({
    check: "string_format",
    format: "regex",
    ...E(e),
    pattern: t
  });
}
// @__NO_SIDE_EFFECTS__
function Yc(t) {
  return new ma({
    check: "string_format",
    format: "lowercase",
    ...E(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Qc(t) {
  return new ga({
    check: "string_format",
    format: "uppercase",
    ...E(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xc(t, e) {
  return new _a({
    check: "string_format",
    format: "includes",
    ...E(e),
    includes: t
  });
}
// @__NO_SIDE_EFFECTS__
function eu(t, e) {
  return new ya({
    check: "string_format",
    format: "starts_with",
    ...E(e),
    prefix: t
  });
}
// @__NO_SIDE_EFFECTS__
function tu(t, e) {
  return new va({
    check: "string_format",
    format: "ends_with",
    ...E(e),
    suffix: t
  });
}
// @__NO_SIDE_EFFECTS__
function ft(t) {
  return new ba({
    check: "overwrite",
    tx: t
  });
}
// @__NO_SIDE_EFFECTS__
function nu(t) {
  return /* @__PURE__ */ ft((e) => e.normalize(t));
}
// @__NO_SIDE_EFFECTS__
function ru() {
  return /* @__PURE__ */ ft((t) => t.trim());
}
// @__NO_SIDE_EFFECTS__
function su() {
  return /* @__PURE__ */ ft((t) => t.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function iu() {
  return /* @__PURE__ */ ft((t) => t.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ou() {
  return /* @__PURE__ */ ft((t) => ho(t));
}
// @__NO_SIDE_EFFECTS__
function au(t, e, n) {
  return new t({
    type: "array",
    element: e,
    // get element() {
    //   return element;
    // },
    ...E(n)
  });
}
// @__NO_SIDE_EFFECTS__
function cu(t, e, n) {
  const r = E(n);
  return r.abort ?? (r.abort = !0), new t({
    type: "custom",
    check: "custom",
    fn: e,
    ...r
  });
}
// @__NO_SIDE_EFFECTS__
function uu(t, e, n) {
  return new t({
    type: "custom",
    check: "custom",
    fn: e,
    ...E(n)
  });
}
// @__NO_SIDE_EFFECTS__
function lu(t) {
  const e = /* @__PURE__ */ du((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(kt(r, n.value, e._zod.def));
    else {
      const s = r;
      s.fatal && (s.continue = !1), s.code ?? (s.code = "custom"), s.input ?? (s.input = n.value), s.inst ?? (s.inst = e), s.continue ?? (s.continue = !e._zod.def.abort), n.issues.push(kt(s));
    }
  }, t(n.value, n)));
  return e;
}
// @__NO_SIDE_EFFECTS__
function du(t, e) {
  const n = new Se({
    check: "custom",
    ...E(e)
  });
  return n._zod.check = t, n;
}
function Ut(t) {
  let e = (t == null ? void 0 : t.target) ?? "draft-2020-12";
  return e === "draft-4" && (e = "draft-04"), e === "draft-7" && (e = "draft-07"), {
    processors: t.processors ?? {},
    metadataRegistry: (t == null ? void 0 : t.metadata) ?? yt,
    target: e,
    unrepresentable: (t == null ? void 0 : t.unrepresentable) ?? "throw",
    override: (t == null ? void 0 : t.override) ?? (() => {
    }),
    io: (t == null ? void 0 : t.io) ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: (t == null ? void 0 : t.cycles) ?? "ref",
    reused: (t == null ? void 0 : t.reused) ?? "inline",
    external: (t == null ? void 0 : t.external) ?? void 0
  };
}
function Q(t, e, n = { path: [], schemaPath: [] }) {
  var l, d;
  var r;
  const s = t._zod.def, i = e.seen.get(t);
  if (i)
    return i.count++, n.schemaPath.includes(t) && (i.cycle = n.path), i.schema;
  const o = { schema: {}, count: 1, cycle: void 0, path: n.path };
  e.seen.set(t, o);
  const a = (d = (l = t._zod).toJSONSchema) == null ? void 0 : d.call(l);
  if (a)
    o.schema = a;
  else {
    const m = {
      ...n,
      schemaPath: [...n.schemaPath, t],
      path: n.path
    };
    if (t._zod.processJSONSchema)
      t._zod.processJSONSchema(e, o.schema, m);
    else {
      const S = o.schema, T = e.processors[s.type];
      if (!T)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${s.type}`);
      T(t, e, S, m);
    }
    const p = t._zod.parent;
    p && (o.ref || (o.ref = p), Q(p, e, m), e.seen.get(p).isParent = !0);
  }
  const c = e.metadataRegistry.get(t);
  return c && Object.assign(o.schema, c), e.io === "input" && ve(t) && (delete o.schema.examples, delete o.schema.default), e.io === "input" && o.schema._prefault && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, e.seen.get(t).schema;
}
function Ht(t, e) {
  var o, a, c, u;
  const n = t.seen.get(e);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = /* @__PURE__ */ new Map();
  for (const l of t.seen.entries()) {
    const d = (o = t.metadataRegistry.get(l[0])) == null ? void 0 : o.id;
    if (d) {
      const m = r.get(d);
      if (m && m !== l[0])
        throw new Error(`Duplicate schema id "${d}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(d, l[0]);
    }
  }
  const s = (l) => {
    var T;
    const d = t.target === "draft-2020-12" ? "$defs" : "definitions";
    if (t.external) {
      const j = (T = t.external.registry.get(l[0])) == null ? void 0 : T.id, y = t.external.uri ?? ((A) => A);
      if (j)
        return { ref: y(j) };
      const v = l[1].defId ?? l[1].schema.id ?? `schema${t.counter++}`;
      return l[1].defId = v, { defId: v, ref: `${y("__shared")}#/${d}/${v}` };
    }
    if (l[1] === n)
      return { ref: "#" };
    const p = `#/${d}/`, S = l[1].schema.id ?? `__schema${t.counter++}`;
    return { defId: S, ref: p + S };
  }, i = (l) => {
    if (l[1].schema.$ref)
      return;
    const d = l[1], { ref: m, defId: p } = s(l);
    d.def = { ...d.schema }, p && (d.defId = p);
    const S = d.schema;
    for (const T in S)
      delete S[T];
    S.$ref = m;
  };
  if (t.cycles === "throw")
    for (const l of t.seen.entries()) {
      const d = l[1];
      if (d.cycle)
        throw new Error(`Cycle detected: #/${(a = d.cycle) == null ? void 0 : a.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const l of t.seen.entries()) {
    const d = l[1];
    if (e === l[0]) {
      i(l);
      continue;
    }
    if (t.external) {
      const p = (c = t.external.registry.get(l[0])) == null ? void 0 : c.id;
      if (e !== l[0] && p) {
        i(l);
        continue;
      }
    }
    if ((u = t.metadataRegistry.get(l[0])) == null ? void 0 : u.id) {
      i(l);
      continue;
    }
    if (d.cycle) {
      i(l);
      continue;
    }
    if (d.count > 1 && t.reused === "ref") {
      i(l);
      continue;
    }
  }
}
function Ft(t, e) {
  var o, a, c;
  const n = t.seen.get(e);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (u) => {
    const l = t.seen.get(u);
    if (l.ref === null)
      return;
    const d = l.def ?? l.schema, m = { ...d }, p = l.ref;
    if (l.ref = null, p) {
      r(p);
      const T = t.seen.get(p), j = T.schema;
      if (j.$ref && (t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0") ? (d.allOf = d.allOf ?? [], d.allOf.push(j)) : Object.assign(d, j), Object.assign(d, m), u._zod.parent === p)
        for (const v in d)
          v === "$ref" || v === "allOf" || v in m || delete d[v];
      if (j.$ref && T.def)
        for (const v in d)
          v === "$ref" || v === "allOf" || v in T.def && JSON.stringify(d[v]) === JSON.stringify(T.def[v]) && delete d[v];
    }
    const S = u._zod.parent;
    if (S && S !== p) {
      r(S);
      const T = t.seen.get(S);
      if (T != null && T.schema.$ref && (d.$ref = T.schema.$ref, T.def))
        for (const j in d)
          j === "$ref" || j === "allOf" || j in T.def && JSON.stringify(d[j]) === JSON.stringify(T.def[j]) && delete d[j];
    }
    t.override({
      zodSchema: u,
      jsonSchema: d,
      path: l.path ?? []
    });
  };
  for (const u of [...t.seen.entries()].reverse())
    r(u[0]);
  const s = {};
  if (t.target === "draft-2020-12" ? s.$schema = "https://json-schema.org/draft/2020-12/schema" : t.target === "draft-07" ? s.$schema = "http://json-schema.org/draft-07/schema#" : t.target === "draft-04" ? s.$schema = "http://json-schema.org/draft-04/schema#" : t.target, (o = t.external) != null && o.uri) {
    const u = (a = t.external.registry.get(e)) == null ? void 0 : a.id;
    if (!u)
      throw new Error("Schema is missing an `id` property");
    s.$id = t.external.uri(u);
  }
  Object.assign(s, n.def ?? n.schema);
  const i = ((c = t.external) == null ? void 0 : c.defs) ?? {};
  for (const u of t.seen.entries()) {
    const l = u[1];
    l.def && l.defId && (i[l.defId] = l.def);
  }
  t.external || Object.keys(i).length > 0 && (t.target === "draft-2020-12" ? s.$defs = i : s.definitions = i);
  try {
    const u = JSON.parse(JSON.stringify(s));
    return Object.defineProperty(u, "~standard", {
      value: {
        ...e["~standard"],
        jsonSchema: {
          input: Vt(e, "input", t.processors),
          output: Vt(e, "output", t.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), u;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function ve(t, e) {
  const n = e ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(t))
    return !1;
  n.seen.add(t);
  const r = t._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return ve(r.element, n);
  if (r.type === "set")
    return ve(r.valueType, n);
  if (r.type === "lazy")
    return ve(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return ve(r.innerType, n);
  if (r.type === "intersection")
    return ve(r.left, n) || ve(r.right, n);
  if (r.type === "record" || r.type === "map")
    return ve(r.keyType, n) || ve(r.valueType, n);
  if (r.type === "pipe")
    return ve(r.in, n) || ve(r.out, n);
  if (r.type === "object") {
    for (const s in r.shape)
      if (ve(r.shape[s], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const s of r.options)
      if (ve(s, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const s of r.items)
      if (ve(s, n))
        return !0;
    return !!(r.rest && ve(r.rest, n));
  }
  return !1;
}
const fu = (t, e = {}) => (n) => {
  const r = Ut({ ...n, processors: e });
  return Q(t, r), Ht(r, t), Ft(r, t);
}, Vt = (t, e, n = {}) => (r) => {
  const { libraryOptions: s, target: i } = r ?? {}, o = Ut({ ...s ?? {}, target: i, io: e, processors: n });
  return Q(t, o), Ht(o, t), Ft(o, t);
}, hu = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Ws = (t, e, n, r) => {
  const s = n;
  s.type = "string";
  const { minimum: i, maximum: o, format: a, patterns: c, contentEncoding: u } = t._zod.bag;
  if (typeof i == "number" && (s.minLength = i), typeof o == "number" && (s.maxLength = o), a && (s.format = hu[a] ?? a, s.format === "" && delete s.format, a === "time" && delete s.format), u && (s.contentEncoding = u), c && c.size > 0) {
    const l = [...c];
    l.length === 1 ? s.pattern = l[0].source : l.length > 1 && (s.allOf = [
      ...l.map((d) => ({
        ...e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: d.source
      }))
    ]);
  }
}, Bs = (t, e, n, r) => {
  const s = n, { minimum: i, maximum: o, format: a, multipleOf: c, exclusiveMaximum: u, exclusiveMinimum: l } = t._zod.bag;
  typeof a == "string" && a.includes("int") ? s.type = "integer" : s.type = "number", typeof l == "number" && (e.target === "draft-04" || e.target === "openapi-3.0" ? (s.minimum = l, s.exclusiveMinimum = !0) : s.exclusiveMinimum = l), typeof i == "number" && (s.minimum = i, typeof l == "number" && e.target !== "draft-04" && (l >= i ? delete s.minimum : delete s.exclusiveMinimum)), typeof u == "number" && (e.target === "draft-04" || e.target === "openapi-3.0" ? (s.maximum = u, s.exclusiveMaximum = !0) : s.exclusiveMaximum = u), typeof o == "number" && (s.maximum = o, typeof u == "number" && e.target !== "draft-04" && (u <= o ? delete s.maximum : delete s.exclusiveMaximum)), typeof c == "number" && (s.multipleOf = c);
}, Gs = (t, e, n, r) => {
  n.type = "boolean";
}, pu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("BigInt cannot be represented in JSON Schema");
}, mu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Symbols cannot be represented in JSON Schema");
}, Ks = (t, e, n, r) => {
  e.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
}, gu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Undefined cannot be represented in JSON Schema");
}, _u = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Void cannot be represented in JSON Schema");
}, Ys = (t, e, n, r) => {
  n.not = {};
}, yu = (t, e, n, r) => {
}, Qs = (t, e, n, r) => {
}, vu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Date cannot be represented in JSON Schema");
}, Xs = (t, e, n, r) => {
  const s = t._zod.def, i = Rs(s.entries);
  i.every((o) => typeof o == "number") && (n.type = "number"), i.every((o) => typeof o == "string") && (n.type = "string"), n.enum = i;
}, ei = (t, e, n, r) => {
  const s = t._zod.def, i = [];
  for (const o of s.values)
    if (o === void 0) {
      if (e.unrepresentable === "throw")
        throw new Error("Literal `undefined` cannot be represented in JSON Schema");
    } else if (typeof o == "bigint") {
      if (e.unrepresentable === "throw")
        throw new Error("BigInt literals cannot be represented in JSON Schema");
      i.push(Number(o));
    } else
      i.push(o);
  if (i.length !== 0) if (i.length === 1) {
    const o = i[0];
    n.type = o === null ? "null" : typeof o, e.target === "draft-04" || e.target === "openapi-3.0" ? n.enum = [o] : n.const = o;
  } else
    i.every((o) => typeof o == "number") && (n.type = "number"), i.every((o) => typeof o == "string") && (n.type = "string"), i.every((o) => typeof o == "boolean") && (n.type = "boolean"), i.every((o) => o === null) && (n.type = "null"), n.enum = i;
}, bu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("NaN cannot be represented in JSON Schema");
}, wu = (t, e, n, r) => {
  const s = n, i = t._zod.pattern;
  if (!i)
    throw new Error("Pattern not found in template literal");
  s.type = "string", s.pattern = i.source;
}, ku = (t, e, n, r) => {
  const s = n, i = {
    type: "string",
    format: "binary",
    contentEncoding: "binary"
  }, { minimum: o, maximum: a, mime: c } = t._zod.bag;
  o !== void 0 && (i.minLength = o), a !== void 0 && (i.maxLength = a), c ? c.length === 1 ? (i.contentMediaType = c[0], Object.assign(s, i)) : (Object.assign(s, i), s.anyOf = c.map((u) => ({ contentMediaType: u }))) : Object.assign(s, i);
}, Su = (t, e, n, r) => {
  n.type = "boolean";
}, ti = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Tu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Function types cannot be represented in JSON Schema");
}, ni = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, Pu = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Map cannot be represented in JSON Schema");
}, Ru = (t, e, n, r) => {
  if (e.unrepresentable === "throw")
    throw new Error("Set cannot be represented in JSON Schema");
}, ri = (t, e, n, r) => {
  const s = n, i = t._zod.def, { minimum: o, maximum: a } = t._zod.bag;
  typeof o == "number" && (s.minItems = o), typeof a == "number" && (s.maxItems = a), s.type = "array", s.items = Q(i.element, e, { ...r, path: [...r.path, "items"] });
}, si = (t, e, n, r) => {
  var u;
  const s = n, i = t._zod.def;
  s.type = "object", s.properties = {};
  const o = i.shape;
  for (const l in o)
    s.properties[l] = Q(o[l], e, {
      ...r,
      path: [...r.path, "properties", l]
    });
  const a = new Set(Object.keys(o)), c = new Set([...a].filter((l) => {
    const d = i.shape[l]._zod;
    return e.io === "input" ? d.optin === void 0 : d.optout === void 0;
  }));
  c.size > 0 && (s.required = Array.from(c)), ((u = i.catchall) == null ? void 0 : u._zod.def.type) === "never" ? s.additionalProperties = !1 : i.catchall ? i.catchall && (s.additionalProperties = Q(i.catchall, e, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : e.io === "output" && (s.additionalProperties = !1);
}, ii = (t, e, n, r) => {
  const s = t._zod.def, i = s.inclusive === !1, o = s.options.map((a, c) => Q(a, e, {
    ...r,
    path: [...r.path, i ? "oneOf" : "anyOf", c]
  }));
  i ? n.oneOf = o : n.anyOf = o;
}, oi = (t, e, n, r) => {
  const s = t._zod.def, i = Q(s.left, e, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), o = Q(s.right, e, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), a = (u) => "allOf" in u && Object.keys(u).length === 1, c = [
    ...a(i) ? i.allOf : [i],
    ...a(o) ? o.allOf : [o]
  ];
  n.allOf = c;
}, $u = (t, e, n, r) => {
  const s = n, i = t._zod.def;
  s.type = "array";
  const o = e.target === "draft-2020-12" ? "prefixItems" : "items", a = e.target === "draft-2020-12" || e.target === "openapi-3.0" ? "items" : "additionalItems", c = i.items.map((m, p) => Q(m, e, {
    ...r,
    path: [...r.path, o, p]
  })), u = i.rest ? Q(i.rest, e, {
    ...r,
    path: [...r.path, a, ...e.target === "openapi-3.0" ? [i.items.length] : []]
  }) : null;
  e.target === "draft-2020-12" ? (s.prefixItems = c, u && (s.items = u)) : e.target === "openapi-3.0" ? (s.items = {
    anyOf: c
  }, u && s.items.anyOf.push(u), s.minItems = c.length, u || (s.maxItems = c.length)) : (s.items = c, u && (s.additionalItems = u));
  const { minimum: l, maximum: d } = t._zod.bag;
  typeof l == "number" && (s.minItems = l), typeof d == "number" && (s.maxItems = d);
}, ai = (t, e, n, r) => {
  const s = n, i = t._zod.def;
  s.type = "object";
  const o = i.keyType, a = o._zod.bag, c = a == null ? void 0 : a.patterns;
  if (i.mode === "loose" && c && c.size > 0) {
    const l = Q(i.valueType, e, {
      ...r,
      path: [...r.path, "patternProperties", "*"]
    });
    s.patternProperties = {};
    for (const d of c)
      s.patternProperties[d.source] = l;
  } else
    (e.target === "draft-07" || e.target === "draft-2020-12") && (s.propertyNames = Q(i.keyType, e, {
      ...r,
      path: [...r.path, "propertyNames"]
    })), s.additionalProperties = Q(i.valueType, e, {
      ...r,
      path: [...r.path, "additionalProperties"]
    });
  const u = o._zod.values;
  if (u) {
    const l = [...u].filter((d) => typeof d == "string" || typeof d == "number");
    l.length > 0 && (s.required = l);
  }
}, ci = (t, e, n, r) => {
  const s = t._zod.def, i = Q(s.innerType, e, r), o = e.seen.get(t);
  e.target === "openapi-3.0" ? (o.ref = s.innerType, n.nullable = !0) : n.anyOf = [i, { type: "null" }];
}, ui = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType;
}, li = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType, n.default = JSON.parse(JSON.stringify(s.defaultValue));
}, di = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType, e.io === "input" && (n._prefault = JSON.parse(JSON.stringify(s.defaultValue)));
}, fi = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType;
  let o;
  try {
    o = s.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = o;
}, hi = (t, e, n, r) => {
  const s = t._zod.def, i = e.io === "input" ? s.in._zod.def.type === "transform" ? s.out : s.in : s.out;
  Q(i, e, r);
  const o = e.seen.get(t);
  o.ref = i;
}, pi = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType, n.readOnly = !0;
}, zu = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType;
}, Xn = (t, e, n, r) => {
  const s = t._zod.def;
  Q(s.innerType, e, r);
  const i = e.seen.get(t);
  i.ref = s.innerType;
}, Eu = (t, e, n, r) => {
  const s = t._zod.innerType;
  Q(s, e, r);
  const i = e.seen.get(t);
  i.ref = s;
}, Dr = {
  string: Ws,
  number: Bs,
  boolean: Gs,
  bigint: pu,
  symbol: mu,
  null: Ks,
  undefined: gu,
  void: _u,
  never: Ys,
  any: yu,
  unknown: Qs,
  date: vu,
  enum: Xs,
  literal: ei,
  nan: bu,
  template_literal: wu,
  file: ku,
  success: Su,
  custom: ti,
  function: Tu,
  transform: ni,
  map: Pu,
  set: Ru,
  array: ri,
  object: si,
  union: ii,
  intersection: oi,
  tuple: $u,
  record: ai,
  nullable: ci,
  nonoptional: ui,
  default: li,
  prefault: di,
  catch: fi,
  pipe: hi,
  readonly: pi,
  promise: zu,
  optional: Xn,
  lazy: Eu
};
function Nu(t, e) {
  if ("_idmap" in t) {
    const r = t, s = Ut({ ...e, processors: Dr }), i = {};
    for (const c of r._idmap.entries()) {
      const [u, l] = c;
      Q(l, s);
    }
    const o = {}, a = {
      registry: r,
      uri: e == null ? void 0 : e.uri,
      defs: i
    };
    s.external = a;
    for (const c of r._idmap.entries()) {
      const [u, l] = c;
      Ht(s, l), o[u] = Ft(s, l);
    }
    if (Object.keys(i).length > 0) {
      const c = s.target === "draft-2020-12" ? "$defs" : "definitions";
      o.__shared = {
        [c]: i
      };
    }
    return { schemas: o };
  }
  const n = Ut({ ...e, processors: Dr });
  return Q(t, n), Ht(n, t), Ft(n, t);
}
const Ou = /* @__PURE__ */ _("ZodISODateTime", (t, e) => {
  Ia.init(t, e), oe.init(t, e);
});
function mi(t) {
  return /* @__PURE__ */ qc(Ou, t);
}
const Cu = /* @__PURE__ */ _("ZodISODate", (t, e) => {
  Aa.init(t, e), oe.init(t, e);
});
function xu(t) {
  return /* @__PURE__ */ Dc(Cu, t);
}
const Iu = /* @__PURE__ */ _("ZodISOTime", (t, e) => {
  Za.init(t, e), oe.init(t, e);
});
function Au(t) {
  return /* @__PURE__ */ Uc(Iu, t);
}
const Zu = /* @__PURE__ */ _("ZodISODuration", (t, e) => {
  ja.init(t, e), oe.init(t, e);
});
function ju(t) {
  return /* @__PURE__ */ Hc(Zu, t);
}
const Mu = (t, e) => {
  Ns.init(t, e), t.name = "ZodError", Object.defineProperties(t, {
    format: {
      value: (n) => Ro(t, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Po(t, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        t.issues.push(n), t.message = JSON.stringify(t.issues, Tn, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        t.issues.push(...n), t.message = JSON.stringify(t.issues, Tn, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return t.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, $e = _("ZodError", Mu, {
  Parent: Error
}), Lu = /* @__PURE__ */ cn($e), qu = /* @__PURE__ */ un($e), Du = /* @__PURE__ */ ln($e), Uu = /* @__PURE__ */ dn($e), Hu = /* @__PURE__ */ Eo($e), Fu = /* @__PURE__ */ No($e), Vu = /* @__PURE__ */ Oo($e), Ju = /* @__PURE__ */ Co($e), Wu = /* @__PURE__ */ xo($e), Bu = /* @__PURE__ */ Io($e), Gu = /* @__PURE__ */ Ao($e), Ku = /* @__PURE__ */ Zo($e), re = /* @__PURE__ */ _("ZodType", (t, e) => (X.init(t, e), Object.assign(t["~standard"], {
  jsonSchema: {
    input: Vt(t, "input"),
    output: Vt(t, "output")
  }
}), t.toJSONSchema = fu(t, {}), t.def = e, t.type = e.type, Object.defineProperty(t, "_def", { value: e }), t.check = (...n) => t.clone(Ve(e, {
  checks: [
    ...e.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
}), {
  parent: !0
}), t.with = t.check, t.clone = (n, r) => Me(t, n, r), t.brand = () => t, t.register = (n, r) => (n.add(t, r), t), t.parse = (n, r) => Lu(t, n, r, { callee: t.parse }), t.safeParse = (n, r) => Du(t, n, r), t.parseAsync = async (n, r) => qu(t, n, r, { callee: t.parseAsync }), t.safeParseAsync = async (n, r) => Uu(t, n, r), t.spa = t.safeParseAsync, t.encode = (n, r) => Hu(t, n, r), t.decode = (n, r) => Fu(t, n, r), t.encodeAsync = async (n, r) => Vu(t, n, r), t.decodeAsync = async (n, r) => Ju(t, n, r), t.safeEncode = (n, r) => Wu(t, n, r), t.safeDecode = (n, r) => Bu(t, n, r), t.safeEncodeAsync = async (n, r) => Gu(t, n, r), t.safeDecodeAsync = async (n, r) => Ku(t, n, r), t.refine = (n, r) => t.check(Dl(n, r)), t.superRefine = (n) => t.check(Ul(n)), t.overwrite = (n) => t.check(/* @__PURE__ */ ft(n)), t.optional = () => ce(t), t.exactOptional = () => zl(t), t.nullable = () => Fr(t), t.nullish = () => ce(Fr(t)), t.nonoptional = (n) => Il(t, n), t.array = () => F(t), t.or = (n) => ee([t, n]), t.and = (n) => er(t, n), t.transform = (n) => $n(t, ki(n)), t.default = (n) => Ol(t, n), t.prefault = (n) => xl(t, n), t.catch = (n) => Zl(t, n), t.pipe = (n) => $n(t, n), t.readonly = () => Ll(t), t.describe = (n) => {
  const r = t.clone();
  return yt.add(r, { description: n }), r;
}, Object.defineProperty(t, "description", {
  get() {
    var n;
    return (n = yt.get(t)) == null ? void 0 : n.description;
  },
  configurable: !0
}), t.meta = (...n) => {
  if (n.length === 0)
    return yt.get(t);
  const r = t.clone();
  return yt.add(r, n[0]), r;
}, t.isOptional = () => t.safeParse(void 0).success, t.isNullable = () => t.safeParse(null).success, t.apply = (n) => n(t), t)), gi = /* @__PURE__ */ _("_ZodString", (t, e) => {
  Qn.init(t, e), re.init(t, e), t._zod.processJSONSchema = (r, s, i) => Ws(t, r, s);
  const n = t._zod.bag;
  t.format = n.format ?? null, t.minLength = n.minimum ?? null, t.maxLength = n.maximum ?? null, t.regex = (...r) => t.check(/* @__PURE__ */ Kc(...r)), t.includes = (...r) => t.check(/* @__PURE__ */ Xc(...r)), t.startsWith = (...r) => t.check(/* @__PURE__ */ eu(...r)), t.endsWith = (...r) => t.check(/* @__PURE__ */ tu(...r)), t.min = (...r) => t.check(/* @__PURE__ */ Dt(...r)), t.max = (...r) => t.check(/* @__PURE__ */ Vs(...r)), t.length = (...r) => t.check(/* @__PURE__ */ Js(...r)), t.nonempty = (...r) => t.check(/* @__PURE__ */ Dt(1, ...r)), t.lowercase = (r) => t.check(/* @__PURE__ */ Yc(r)), t.uppercase = (r) => t.check(/* @__PURE__ */ Qc(r)), t.trim = () => t.check(/* @__PURE__ */ ru()), t.normalize = (...r) => t.check(/* @__PURE__ */ nu(...r)), t.toLowerCase = () => t.check(/* @__PURE__ */ su()), t.toUpperCase = () => t.check(/* @__PURE__ */ iu()), t.slugify = () => t.check(/* @__PURE__ */ ou());
}), Yu = /* @__PURE__ */ _("ZodString", (t, e) => {
  Qn.init(t, e), gi.init(t, e), t.email = (n) => t.check(/* @__PURE__ */ vc(Qu, n)), t.url = (n) => t.check(/* @__PURE__ */ Tc(Xu, n)), t.jwt = (n) => t.check(/* @__PURE__ */ Lc(pl, n)), t.emoji = (n) => t.check(/* @__PURE__ */ Pc(el, n)), t.guid = (n) => t.check(/* @__PURE__ */ jr(Ur, n)), t.uuid = (n) => t.check(/* @__PURE__ */ bc(jt, n)), t.uuidv4 = (n) => t.check(/* @__PURE__ */ wc(jt, n)), t.uuidv6 = (n) => t.check(/* @__PURE__ */ kc(jt, n)), t.uuidv7 = (n) => t.check(/* @__PURE__ */ Sc(jt, n)), t.nanoid = (n) => t.check(/* @__PURE__ */ Rc(tl, n)), t.guid = (n) => t.check(/* @__PURE__ */ jr(Ur, n)), t.cuid = (n) => t.check(/* @__PURE__ */ $c(nl, n)), t.cuid2 = (n) => t.check(/* @__PURE__ */ zc(rl, n)), t.ulid = (n) => t.check(/* @__PURE__ */ Ec(sl, n)), t.base64 = (n) => t.check(/* @__PURE__ */ Zc(dl, n)), t.base64url = (n) => t.check(/* @__PURE__ */ jc(fl, n)), t.xid = (n) => t.check(/* @__PURE__ */ Nc(il, n)), t.ksuid = (n) => t.check(/* @__PURE__ */ Oc(ol, n)), t.ipv4 = (n) => t.check(/* @__PURE__ */ Cc(al, n)), t.ipv6 = (n) => t.check(/* @__PURE__ */ xc(cl, n)), t.cidrv4 = (n) => t.check(/* @__PURE__ */ Ic(ul, n)), t.cidrv6 = (n) => t.check(/* @__PURE__ */ Ac(ll, n)), t.e164 = (n) => t.check(/* @__PURE__ */ Mc(hl, n)), t.datetime = (n) => t.check(mi(n)), t.date = (n) => t.check(xu(n)), t.time = (n) => t.check(Au(n)), t.duration = (n) => t.check(ju(n));
});
function g(t) {
  return /* @__PURE__ */ yc(Yu, t);
}
const oe = /* @__PURE__ */ _("ZodStringFormat", (t, e) => {
  ne.init(t, e), gi.init(t, e);
}), Qu = /* @__PURE__ */ _("ZodEmail", (t, e) => {
  Pa.init(t, e), oe.init(t, e);
}), Ur = /* @__PURE__ */ _("ZodGUID", (t, e) => {
  Sa.init(t, e), oe.init(t, e);
}), jt = /* @__PURE__ */ _("ZodUUID", (t, e) => {
  Ta.init(t, e), oe.init(t, e);
}), Xu = /* @__PURE__ */ _("ZodURL", (t, e) => {
  Ra.init(t, e), oe.init(t, e);
}), el = /* @__PURE__ */ _("ZodEmoji", (t, e) => {
  $a.init(t, e), oe.init(t, e);
}), tl = /* @__PURE__ */ _("ZodNanoID", (t, e) => {
  za.init(t, e), oe.init(t, e);
}), nl = /* @__PURE__ */ _("ZodCUID", (t, e) => {
  Ea.init(t, e), oe.init(t, e);
}), rl = /* @__PURE__ */ _("ZodCUID2", (t, e) => {
  Na.init(t, e), oe.init(t, e);
}), sl = /* @__PURE__ */ _("ZodULID", (t, e) => {
  Oa.init(t, e), oe.init(t, e);
}), il = /* @__PURE__ */ _("ZodXID", (t, e) => {
  Ca.init(t, e), oe.init(t, e);
}), ol = /* @__PURE__ */ _("ZodKSUID", (t, e) => {
  xa.init(t, e), oe.init(t, e);
}), al = /* @__PURE__ */ _("ZodIPv4", (t, e) => {
  Ma.init(t, e), oe.init(t, e);
}), cl = /* @__PURE__ */ _("ZodIPv6", (t, e) => {
  La.init(t, e), oe.init(t, e);
}), ul = /* @__PURE__ */ _("ZodCIDRv4", (t, e) => {
  qa.init(t, e), oe.init(t, e);
}), ll = /* @__PURE__ */ _("ZodCIDRv6", (t, e) => {
  Da.init(t, e), oe.init(t, e);
}), dl = /* @__PURE__ */ _("ZodBase64", (t, e) => {
  Ua.init(t, e), oe.init(t, e);
}), fl = /* @__PURE__ */ _("ZodBase64URL", (t, e) => {
  Fa.init(t, e), oe.init(t, e);
}), hl = /* @__PURE__ */ _("ZodE164", (t, e) => {
  Va.init(t, e), oe.init(t, e);
}), pl = /* @__PURE__ */ _("ZodJWT", (t, e) => {
  Wa.init(t, e), oe.init(t, e);
}), _i = /* @__PURE__ */ _("ZodNumber", (t, e) => {
  Ls.init(t, e), re.init(t, e), t._zod.processJSONSchema = (r, s, i) => Bs(t, r, s), t.gt = (r, s) => t.check(/* @__PURE__ */ Lr(r, s)), t.gte = (r, s) => t.check(/* @__PURE__ */ yn(r, s)), t.min = (r, s) => t.check(/* @__PURE__ */ yn(r, s)), t.lt = (r, s) => t.check(/* @__PURE__ */ Mr(r, s)), t.lte = (r, s) => t.check(/* @__PURE__ */ _n(r, s)), t.max = (r, s) => t.check(/* @__PURE__ */ _n(r, s)), t.int = (r) => t.check(Hr(r)), t.safe = (r) => t.check(Hr(r)), t.positive = (r) => t.check(/* @__PURE__ */ Lr(0, r)), t.nonnegative = (r) => t.check(/* @__PURE__ */ yn(0, r)), t.negative = (r) => t.check(/* @__PURE__ */ Mr(0, r)), t.nonpositive = (r) => t.check(/* @__PURE__ */ _n(0, r)), t.multipleOf = (r, s) => t.check(/* @__PURE__ */ qr(r, s)), t.step = (r, s) => t.check(/* @__PURE__ */ qr(r, s)), t.finite = () => t;
  const n = t._zod.bag;
  t.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, t.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, t.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), t.isFinite = !0, t.format = n.format ?? null;
});
function Y(t) {
  return /* @__PURE__ */ Fc(_i, t);
}
const ml = /* @__PURE__ */ _("ZodNumberFormat", (t, e) => {
  Ba.init(t, e), _i.init(t, e);
});
function Hr(t) {
  return /* @__PURE__ */ Vc(ml, t);
}
const gl = /* @__PURE__ */ _("ZodBoolean", (t, e) => {
  Ga.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Gs(t, n, r);
});
function he(t) {
  return /* @__PURE__ */ Jc(gl, t);
}
const _l = /* @__PURE__ */ _("ZodNull", (t, e) => {
  Ka.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Ks(t, n, r);
});
function yi(t) {
  return /* @__PURE__ */ Wc(_l, t);
}
const yl = /* @__PURE__ */ _("ZodUnknown", (t, e) => {
  Ya.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Qs();
});
function se() {
  return /* @__PURE__ */ Bc(yl);
}
const vl = /* @__PURE__ */ _("ZodNever", (t, e) => {
  Qa.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Ys(t, n, r);
});
function bl(t) {
  return /* @__PURE__ */ Gc(vl, t);
}
const wl = /* @__PURE__ */ _("ZodArray", (t, e) => {
  Xa.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ri(t, n, r, s), t.element = e.element, t.min = (n, r) => t.check(/* @__PURE__ */ Dt(n, r)), t.nonempty = (n) => t.check(/* @__PURE__ */ Dt(1, n)), t.max = (n, r) => t.check(/* @__PURE__ */ Vs(n, r)), t.length = (n, r) => t.check(/* @__PURE__ */ Js(n, r)), t.unwrap = () => t.element;
});
function F(t, e) {
  return /* @__PURE__ */ au(wl, t, e);
}
const vi = /* @__PURE__ */ _("ZodObject", (t, e) => {
  ec.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => si(t, n, r, s), W(t, "shape", () => e.shape), t.keyof = () => Pe(Object.keys(t._zod.def.shape)), t.catchall = (n) => t.clone({ ...t._zod.def, catchall: n }), t.passthrough = () => t.clone({ ...t._zod.def, catchall: se() }), t.loose = () => t.clone({ ...t._zod.def, catchall: se() }), t.strict = () => t.clone({ ...t._zod.def, catchall: bl() }), t.strip = () => t.clone({ ...t._zod.def, catchall: void 0 }), t.extend = (n) => bo(t, n), t.safeExtend = (n) => wo(t, n), t.merge = (n) => ko(t, n), t.pick = (n) => yo(t, n), t.omit = (n) => vo(t, n), t.partial = (...n) => So(Si, t, n[0]), t.required = (...n) => To(Ti, t, n[0]);
});
function R(t, e) {
  const n = {
    type: "object",
    shape: t ?? {},
    ...E(e)
  };
  return new vi(n);
}
function we(t, e) {
  return new vi({
    type: "object",
    shape: t,
    catchall: se(),
    ...E(e)
  });
}
const bi = /* @__PURE__ */ _("ZodUnion", (t, e) => {
  Hs.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ii(t, n, r, s), t.options = e.options;
});
function ee(t, e) {
  return new bi({
    type: "union",
    options: t,
    ...E(e)
  });
}
const kl = /* @__PURE__ */ _("ZodDiscriminatedUnion", (t, e) => {
  bi.init(t, e), tc.init(t, e);
});
function wi(t, e, n) {
  return new kl({
    type: "union",
    options: e,
    discriminator: t,
    ...E(n)
  });
}
const Sl = /* @__PURE__ */ _("ZodIntersection", (t, e) => {
  nc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => oi(t, n, r, s);
});
function er(t, e) {
  return new Sl({
    type: "intersection",
    left: t,
    right: e
  });
}
const Tl = /* @__PURE__ */ _("ZodRecord", (t, e) => {
  rc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ai(t, n, r, s), t.keyType = e.keyType, t.valueType = e.valueType;
});
function ie(t, e, n) {
  return new Tl({
    type: "record",
    keyType: t,
    valueType: e,
    ...E(n)
  });
}
const Rn = /* @__PURE__ */ _("ZodEnum", (t, e) => {
  sc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (r, s, i) => Xs(t, r, s), t.enum = e.entries, t.options = Object.values(e.entries);
  const n = new Set(Object.keys(e.entries));
  t.extract = (r, s) => {
    const i = {};
    for (const o of r)
      if (n.has(o))
        i[o] = e.entries[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new Rn({
      ...e,
      checks: [],
      ...E(s),
      entries: i
    });
  }, t.exclude = (r, s) => {
    const i = { ...e.entries };
    for (const o of r)
      if (n.has(o))
        delete i[o];
      else
        throw new Error(`Key ${o} not found in enum`);
    return new Rn({
      ...e,
      checks: [],
      ...E(s),
      entries: i
    });
  };
});
function Pe(t, e) {
  const n = Array.isArray(t) ? Object.fromEntries(t.map((r) => [r, r])) : t;
  return new Rn({
    type: "enum",
    entries: n,
    ...E(e)
  });
}
const Pl = /* @__PURE__ */ _("ZodLiteral", (t, e) => {
  ic.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ei(t, n, r), t.values = new Set(e.values), Object.defineProperty(t, "value", {
    get() {
      if (e.values.length > 1)
        throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
      return e.values[0];
    }
  });
});
function C(t, e) {
  return new Pl({
    type: "literal",
    values: Array.isArray(t) ? t : [t],
    ...E(e)
  });
}
const Rl = /* @__PURE__ */ _("ZodTransform", (t, e) => {
  oc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ni(t, n), t._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Ts(t.constructor.name);
    n.addIssue = (i) => {
      if (typeof i == "string")
        n.issues.push(kt(i, n.value, e));
      else {
        const o = i;
        o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = n.value), o.inst ?? (o.inst = t), n.issues.push(kt(o));
      }
    };
    const s = e.transform(n.value, n);
    return s instanceof Promise ? s.then((i) => (n.value = i, n)) : (n.value = s, n);
  };
});
function ki(t) {
  return new Rl({
    type: "transform",
    transform: t
  });
}
const Si = /* @__PURE__ */ _("ZodOptional", (t, e) => {
  Fs.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Xn(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function ce(t) {
  return new Si({
    type: "optional",
    innerType: t
  });
}
const $l = /* @__PURE__ */ _("ZodExactOptional", (t, e) => {
  ac.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => Xn(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function zl(t) {
  return new $l({
    type: "optional",
    innerType: t
  });
}
const El = /* @__PURE__ */ _("ZodNullable", (t, e) => {
  cc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ci(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function Fr(t) {
  return new El({
    type: "nullable",
    innerType: t
  });
}
const Nl = /* @__PURE__ */ _("ZodDefault", (t, e) => {
  uc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => li(t, n, r, s), t.unwrap = () => t._zod.def.innerType, t.removeDefault = t.unwrap;
});
function Ol(t, e) {
  return new Nl({
    type: "default",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : zs(e);
    }
  });
}
const Cl = /* @__PURE__ */ _("ZodPrefault", (t, e) => {
  lc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => di(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function xl(t, e) {
  return new Cl({
    type: "prefault",
    innerType: t,
    get defaultValue() {
      return typeof e == "function" ? e() : zs(e);
    }
  });
}
const Ti = /* @__PURE__ */ _("ZodNonOptional", (t, e) => {
  dc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ui(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function Il(t, e) {
  return new Ti({
    type: "nonoptional",
    innerType: t,
    ...E(e)
  });
}
const Al = /* @__PURE__ */ _("ZodCatch", (t, e) => {
  fc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => fi(t, n, r, s), t.unwrap = () => t._zod.def.innerType, t.removeCatch = t.unwrap;
});
function Zl(t, e) {
  return new Al({
    type: "catch",
    innerType: t,
    catchValue: typeof e == "function" ? e : () => e
  });
}
const jl = /* @__PURE__ */ _("ZodPipe", (t, e) => {
  hc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => hi(t, n, r, s), t.in = e.in, t.out = e.out;
});
function $n(t, e) {
  return new jl({
    type: "pipe",
    in: t,
    out: e
    // ...util.normalizeParams(params),
  });
}
const Ml = /* @__PURE__ */ _("ZodReadonly", (t, e) => {
  pc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => pi(t, n, r, s), t.unwrap = () => t._zod.def.innerType;
});
function Ll(t) {
  return new Ml({
    type: "readonly",
    innerType: t
  });
}
const Pi = /* @__PURE__ */ _("ZodCustom", (t, e) => {
  mc.init(t, e), re.init(t, e), t._zod.processJSONSchema = (n, r, s) => ti(t, n);
});
function ql(t, e) {
  return /* @__PURE__ */ cu(Pi, t ?? (() => !0), e);
}
function Dl(t, e = {}) {
  return /* @__PURE__ */ uu(Pi, t, e);
}
function Ul(t) {
  return /* @__PURE__ */ lu(t);
}
function Ri(t, e) {
  return $n(ki(t), e);
}
const $i = "2025-11-25", Hl = [$i, "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"], Ye = "io.modelcontextprotocol/related-task", hn = "2.0", pe = ql((t) => t !== null && (typeof t == "object" || typeof t == "function")), zi = ee([g(), Y().int()]), Ei = g();
we({
  /**
   * Time in milliseconds to keep task results available after completion.
   * If null, the task has unlimited lifetime until manually cleaned up.
   */
  ttl: ee([Y(), yi()]).optional(),
  /**
   * Time in milliseconds to wait between task status requests.
   */
  pollInterval: Y().optional()
});
const Fl = R({
  ttl: Y().optional()
}), Vl = R({
  taskId: g()
}), tr = we({
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken: zi.optional(),
  /**
   * If specified, this request is related to the provided task.
   */
  [Ye]: Vl.optional()
}), Re = R({
  /**
   * See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
   */
  _meta: tr.optional()
}), Rt = Re.extend({
  /**
   * If specified, the caller is requesting task-augmented execution for this request.
   * The request will return a CreateTaskResult immediately, and the actual result can be
   * retrieved later via tasks/result.
   *
   * Task augmentation is subject to capability negotiation - receivers MUST declare support
   * for task augmentation of specific request types in their capabilities.
   */
  task: Fl.optional()
}), Jl = (t) => Rt.safeParse(t).success, me = R({
  method: g(),
  params: Re.loose().optional()
}), ze = R({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: tr.optional()
}), Ee = R({
  method: g(),
  params: ze.loose().optional()
}), ge = we({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: tr.optional()
}), pn = ee([g(), Y().int()]), Ni = R({
  jsonrpc: C(hn),
  id: pn,
  ...me.shape
}).strict(), Vr = (t) => Ni.safeParse(t).success, Oi = R({
  jsonrpc: C(hn),
  ...Ee.shape
}).strict(), Wl = (t) => Oi.safeParse(t).success, nr = R({
  jsonrpc: C(hn),
  id: pn,
  result: ge
}).strict(), Mt = (t) => nr.safeParse(t).success;
var I;
(function(t) {
  t[t.ConnectionClosed = -32e3] = "ConnectionClosed", t[t.RequestTimeout = -32001] = "RequestTimeout", t[t.ParseError = -32700] = "ParseError", t[t.InvalidRequest = -32600] = "InvalidRequest", t[t.MethodNotFound = -32601] = "MethodNotFound", t[t.InvalidParams = -32602] = "InvalidParams", t[t.InternalError = -32603] = "InternalError", t[t.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
})(I || (I = {}));
const rr = R({
  jsonrpc: C(hn),
  id: pn.optional(),
  error: R({
    /**
     * The error type that occurred.
     */
    code: Y().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: g(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: se().optional()
  })
}).strict(), Bl = (t) => rr.safeParse(t).success, Gl = ee([
  Ni,
  Oi,
  nr,
  rr
]);
ee([nr, rr]);
const sr = ge.strict(), Kl = ze.extend({
  /**
   * The ID of the request to cancel.
   *
   * This MUST correspond to the ID of a request previously issued in the same direction.
   */
  requestId: pn.optional(),
  /**
   * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
   */
  reason: g().optional()
}), ir = Ee.extend({
  method: C("notifications/cancelled"),
  params: Kl
}), Yl = R({
  /**
   * URL or data URI for the icon.
   */
  src: g(),
  /**
   * Optional MIME type for the icon.
   */
  mimeType: g().optional(),
  /**
   * Optional array of strings that specify sizes at which the icon can be used.
   * Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
   *
   * If not provided, the client should assume that the icon can be used at any size.
   */
  sizes: F(g()).optional(),
  /**
   * Optional specifier for the theme this icon is designed for. `light` indicates
   * the icon is designed to be used with a light background, and `dark` indicates
   * the icon is designed to be used with a dark background.
   *
   * If not provided, the client should assume the icon can be used with any theme.
   */
  theme: Pe(["light", "dark"]).optional()
}), $t = R({
  /**
   * Optional set of sized icons that the client can display in a user interface.
   *
   * Clients that support rendering icons MUST support at least the following MIME types:
   * - `image/png` - PNG images (safe, universal compatibility)
   * - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
   *
   * Clients that support rendering icons SHOULD also support:
   * - `image/svg+xml` - SVG images (scalable but requires security precautions)
   * - `image/webp` - WebP images (modern, efficient format)
   */
  icons: F(Yl).optional()
}), at = R({
  /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
  name: g(),
  /**
   * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
   * even by those unfamiliar with domain-specific terminology.
   *
   * If not provided, the name should be used for display (except for Tool,
   * where `annotations.title` should be given precedence over using `name`,
   * if present).
   */
  title: g().optional()
}), Ci = at.extend({
  ...at.shape,
  ...$t.shape,
  version: g(),
  /**
   * An optional URL of the website for this implementation.
   */
  websiteUrl: g().optional(),
  /**
   * An optional human-readable description of what this implementation does.
   *
   * This can be used by clients or servers to provide context about their purpose
   * and capabilities. For example, a server might describe the types of resources
   * or tools it provides, while a client might describe its intended use case.
   */
  description: g().optional()
}), Ql = er(R({
  applyDefaults: he().optional()
}), ie(g(), se())), Xl = Ri((t) => t && typeof t == "object" && !Array.isArray(t) && Object.keys(t).length === 0 ? { form: {} } : t, er(R({
  form: Ql.optional(),
  url: pe.optional()
}), ie(g(), se()).optional())), ed = we({
  /**
   * Present if the client supports listing tasks.
   */
  list: pe.optional(),
  /**
   * Present if the client supports cancelling tasks.
   */
  cancel: pe.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: we({
    /**
     * Task support for sampling requests.
     */
    sampling: we({
      createMessage: pe.optional()
    }).optional(),
    /**
     * Task support for elicitation requests.
     */
    elicitation: we({
      create: pe.optional()
    }).optional()
  }).optional()
}), td = we({
  /**
   * Present if the server supports listing tasks.
   */
  list: pe.optional(),
  /**
   * Present if the server supports cancelling tasks.
   */
  cancel: pe.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: we({
    /**
     * Task support for tool requests.
     */
    tools: we({
      call: pe.optional()
    }).optional()
  }).optional()
}), nd = R({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: ie(g(), pe).optional(),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: R({
    /**
     * Present if the client supports context inclusion via includeContext parameter.
     * If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
     */
    context: pe.optional(),
    /**
     * Present if the client supports tool use via tools and toolChoice parameters.
     */
    tools: pe.optional()
  }).optional(),
  /**
   * Present if the client supports eliciting user input.
   */
  elicitation: Xl.optional(),
  /**
   * Present if the client supports listing roots.
   */
  roots: R({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: he().optional()
  }).optional(),
  /**
   * Present if the client supports task creation.
   */
  tasks: ed.optional()
}), rd = Re.extend({
  /**
   * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
   */
  protocolVersion: g(),
  capabilities: nd,
  clientInfo: Ci
}), xi = me.extend({
  method: C("initialize"),
  params: rd
}), sd = R({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: ie(g(), pe).optional(),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: pe.optional(),
  /**
   * Present if the server supports sending completions to the client.
   */
  completions: pe.optional(),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: R({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: he().optional()
  }).optional(),
  /**
   * Present if the server offers any resources to read.
   */
  resources: R({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: he().optional(),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: he().optional()
  }).optional(),
  /**
   * Present if the server offers any tools to call.
   */
  tools: R({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: he().optional()
  }).optional(),
  /**
   * Present if the server supports task creation.
   */
  tasks: td.optional()
}), id = ge.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: g(),
  capabilities: sd,
  serverInfo: Ci,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: g().optional()
}), Ii = Ee.extend({
  method: C("notifications/initialized"),
  params: ze.optional()
}), or = me.extend({
  method: C("ping"),
  params: Re.optional()
}), od = R({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: Y(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: ce(Y()),
  /**
   * An optional message describing the current progress.
   */
  message: ce(g())
}), ad = R({
  ...ze.shape,
  ...od.shape,
  /**
   * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
   */
  progressToken: zi
}), ar = Ee.extend({
  method: C("notifications/progress"),
  params: ad
}), cd = Re.extend({
  /**
   * An opaque token representing the current pagination position.
   * If provided, the server should return results starting after this cursor.
   */
  cursor: Ei.optional()
}), zt = me.extend({
  params: cd.optional()
}), Et = ge.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: Ei.optional()
}), ud = Pe(["working", "input_required", "completed", "failed", "cancelled"]), Nt = R({
  taskId: g(),
  status: ud,
  /**
   * Time in milliseconds to keep task results available after completion.
   * If null, the task has unlimited lifetime until manually cleaned up.
   */
  ttl: ee([Y(), yi()]),
  /**
   * ISO 8601 timestamp when the task was created.
   */
  createdAt: g(),
  /**
   * ISO 8601 timestamp when the task was last updated.
   */
  lastUpdatedAt: g(),
  pollInterval: ce(Y()),
  /**
   * Optional diagnostic message for failed tasks or other status information.
   */
  statusMessage: ce(g())
}), mn = ge.extend({
  task: Nt
}), ld = ze.merge(Nt), Jt = Ee.extend({
  method: C("notifications/tasks/status"),
  params: ld
}), cr = me.extend({
  method: C("tasks/get"),
  params: Re.extend({
    taskId: g()
  })
}), ur = ge.merge(Nt), lr = me.extend({
  method: C("tasks/result"),
  params: Re.extend({
    taskId: g()
  })
});
ge.loose();
const dr = zt.extend({
  method: C("tasks/list")
}), fr = Et.extend({
  tasks: F(Nt)
}), hr = me.extend({
  method: C("tasks/cancel"),
  params: Re.extend({
    taskId: g()
  })
}), dd = ge.merge(Nt), Ai = R({
  /**
   * The URI of this resource.
   */
  uri: g(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: ce(g()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), Zi = Ai.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: g()
}), pr = g().refine((t) => {
  try {
    return atob(t), !0;
  } catch {
    return !1;
  }
}, { message: "Invalid Base64 string" }), ji = Ai.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: pr
}), Ot = Pe(["user", "assistant"]), ht = R({
  /**
   * Intended audience(s) for the resource.
   */
  audience: F(Ot).optional(),
  /**
   * Importance hint for the resource, from 0 (least) to 1 (most).
   */
  priority: Y().min(0).max(1).optional(),
  /**
   * ISO 8601 timestamp for the most recent modification.
   */
  lastModified: mi({ offset: !0 }).optional()
}), Mi = R({
  ...at.shape,
  ...$t.shape,
  /**
   * The URI of this resource.
   */
  uri: g(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: ce(g()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: ce(g()),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ce(we({}))
}), fd = R({
  ...at.shape,
  ...$t.shape,
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: g(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: ce(g()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: ce(g()),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ce(we({}))
}), zn = zt.extend({
  method: C("resources/list")
}), hd = Et.extend({
  resources: F(Mi)
}), En = zt.extend({
  method: C("resources/templates/list")
}), pd = Et.extend({
  resourceTemplates: F(fd)
}), mr = Re.extend({
  /**
   * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
   *
   * @format uri
   */
  uri: g()
}), md = mr, Nn = me.extend({
  method: C("resources/read"),
  params: md
}), gd = ge.extend({
  contents: F(ee([Zi, ji]))
}), _d = Ee.extend({
  method: C("notifications/resources/list_changed"),
  params: ze.optional()
}), yd = mr, vd = me.extend({
  method: C("resources/subscribe"),
  params: yd
}), bd = mr, wd = me.extend({
  method: C("resources/unsubscribe"),
  params: bd
}), kd = ze.extend({
  /**
   * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
   */
  uri: g()
}), Sd = Ee.extend({
  method: C("notifications/resources/updated"),
  params: kd
}), Td = R({
  /**
   * The name of the argument.
   */
  name: g(),
  /**
   * A human-readable description of the argument.
   */
  description: ce(g()),
  /**
   * Whether this argument must be provided.
   */
  required: ce(he())
}), Pd = R({
  ...at.shape,
  ...$t.shape,
  /**
   * An optional description of what this prompt provides
   */
  description: ce(g()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: ce(F(Td)),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ce(we({}))
}), On = zt.extend({
  method: C("prompts/list")
}), Rd = Et.extend({
  prompts: F(Pd)
}), $d = Re.extend({
  /**
   * The name of the prompt or prompt template.
   */
  name: g(),
  /**
   * Arguments to use for templating the prompt.
   */
  arguments: ie(g(), g()).optional()
}), Cn = me.extend({
  method: C("prompts/get"),
  params: $d
}), gr = R({
  type: C("text"),
  /**
   * The text content of the message.
   */
  text: g(),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), _r = R({
  type: C("image"),
  /**
   * The base64-encoded image data.
   */
  data: pr,
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: g(),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), yr = R({
  type: C("audio"),
  /**
   * The base64-encoded audio data.
   */
  data: pr,
  /**
   * The MIME type of the audio. Different providers may support different audio types.
   */
  mimeType: g(),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), zd = R({
  type: C("tool_use"),
  /**
   * The name of the tool to invoke.
   * Must match a tool name from the request's tools array.
   */
  name: g(),
  /**
   * Unique identifier for this tool call.
   * Used to correlate with ToolResultContent in subsequent messages.
   */
  id: g(),
  /**
   * Arguments to pass to the tool.
   * Must conform to the tool's inputSchema.
   */
  input: ie(g(), se()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), Ed = R({
  type: C("resource"),
  resource: ee([Zi, ji]),
  /**
   * Optional annotations for the client.
   */
  annotations: ht.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), Nd = Mi.extend({
  type: C("resource_link")
}), vr = ee([
  gr,
  _r,
  yr,
  Nd,
  Ed
]), Od = R({
  role: Ot,
  content: vr
}), Cd = ge.extend({
  /**
   * An optional description for the prompt.
   */
  description: g().optional(),
  messages: F(Od)
}), xd = Ee.extend({
  method: C("notifications/prompts/list_changed"),
  params: ze.optional()
}), Id = R({
  /**
   * A human-readable title for the tool.
   */
  title: g().optional(),
  /**
   * If true, the tool does not modify its environment.
   *
   * Default: false
   */
  readOnlyHint: he().optional(),
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: true
   */
  destructiveHint: he().optional(),
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on the its environment.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: false
   */
  idempotentHint: he().optional(),
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   *
   * Default: true
   */
  openWorldHint: he().optional()
}), Ad = R({
  /**
   * Indicates the tool's preference for task-augmented execution.
   * - "required": Clients MUST invoke the tool as a task
   * - "optional": Clients MAY invoke the tool as a task or normal request
   * - "forbidden": Clients MUST NOT attempt to invoke the tool as a task
   *
   * If not present, defaults to "forbidden".
   */
  taskSupport: Pe(["required", "optional", "forbidden"]).optional()
}), Li = R({
  ...at.shape,
  ...$t.shape,
  /**
   * A human-readable description of the tool.
   */
  description: g().optional(),
  /**
   * A JSON Schema 2020-12 object defining the expected parameters for the tool.
   * Must have type: 'object' at the root level per MCP spec.
   */
  inputSchema: R({
    type: C("object"),
    properties: ie(g(), pe).optional(),
    required: F(g()).optional()
  }).catchall(se()),
  /**
   * An optional JSON Schema 2020-12 object defining the structure of the tool's output
   * returned in the structuredContent field of a CallToolResult.
   * Must have type: 'object' at the root level per MCP spec.
   */
  outputSchema: R({
    type: C("object"),
    properties: ie(g(), pe).optional(),
    required: F(g()).optional()
  }).catchall(se()).optional(),
  /**
   * Optional additional tool information.
   */
  annotations: Id.optional(),
  /**
   * Execution-related properties for this tool.
   */
  execution: Ad.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), xn = zt.extend({
  method: C("tools/list")
}), Zd = Et.extend({
  tools: F(Li)
}), br = ge.extend({
  /**
   * A list of content objects that represent the result of the tool call.
   *
   * If the Tool does not define an outputSchema, this field MUST be present in the result.
   * For backwards compatibility, this field is always present, but it may be empty.
   */
  content: F(vr).default([]),
  /**
   * An object containing structured tool output.
   *
   * If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
   */
  structuredContent: ie(g(), se()).optional(),
  /**
   * Whether the tool call ended in an error.
   *
   * If not set, this is assumed to be false (the call was successful).
   *
   * Any errors that originate from the tool SHOULD be reported inside the result
   * object, with `isError` set to true, _not_ as an MCP protocol-level error
   * response. Otherwise, the LLM would not be able to see that an error occurred
   * and self-correct.
   *
   * However, any errors in _finding_ the tool, an error indicating that the
   * server does not support tool calls, or any other exceptional conditions,
   * should be reported as an MCP error response.
   */
  isError: he().optional()
});
br.or(ge.extend({
  toolResult: se()
}));
const jd = Rt.extend({
  /**
   * The name of the tool to call.
   */
  name: g(),
  /**
   * Arguments to pass to the tool.
   */
  arguments: ie(g(), se()).optional()
}), Wt = me.extend({
  method: C("tools/call"),
  params: jd
}), Md = Ee.extend({
  method: C("notifications/tools/list_changed"),
  params: ze.optional()
});
R({
  /**
   * If true, the list will be refreshed automatically when a list changed notification is received.
   * The callback will be called with the updated list.
   *
   * If false, the callback will be called with null items, allowing manual refresh.
   *
   * @default true
   */
  autoRefresh: he().default(!0),
  /**
   * Debounce time in milliseconds for list changed notification processing.
   *
   * Multiple notifications received within this timeframe will only trigger one refresh.
   * Set to 0 to disable debouncing.
   *
   * @default 300
   */
  debounceMs: Y().int().nonnegative().default(300)
});
const Bt = Pe(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]), Ld = Re.extend({
  /**
   * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
   */
  level: Bt
}), qi = me.extend({
  method: C("logging/setLevel"),
  params: Ld
}), qd = ze.extend({
  /**
   * The severity of this log message.
   */
  level: Bt,
  /**
   * An optional name of the logger issuing this message.
   */
  logger: g().optional(),
  /**
   * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
   */
  data: se()
}), Dd = Ee.extend({
  method: C("notifications/message"),
  params: qd
}), Ud = R({
  /**
   * A hint for a model name.
   */
  name: g().optional()
}), Hd = R({
  /**
   * Optional hints to use for model selection.
   */
  hints: F(Ud).optional(),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: Y().min(0).max(1).optional(),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: Y().min(0).max(1).optional(),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: Y().min(0).max(1).optional()
}), Fd = R({
  /**
   * Controls when tools are used:
   * - "auto": Model decides whether to use tools (default)
   * - "required": Model MUST use at least one tool before completing
   * - "none": Model MUST NOT use any tools
   */
  mode: Pe(["auto", "required", "none"]).optional()
}), Vd = R({
  type: C("tool_result"),
  toolUseId: g().describe("The unique identifier for the corresponding tool call."),
  content: F(vr).default([]),
  structuredContent: R({}).loose().optional(),
  isError: he().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), Jd = wi("type", [gr, _r, yr]), Gt = wi("type", [
  gr,
  _r,
  yr,
  zd,
  Vd
]), Wd = R({
  role: Ot,
  content: ee([Gt, F(Gt)]),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), Bd = Rt.extend({
  messages: F(Wd),
  /**
   * The server's preferences for which model to select. The client MAY modify or omit this request.
   */
  modelPreferences: Hd.optional(),
  /**
   * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
   */
  systemPrompt: g().optional(),
  /**
   * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
   * The client MAY ignore this request.
   *
   * Default is "none". Values "thisServer" and "allServers" are soft-deprecated. Servers SHOULD only use these values if the client
   * declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.
   */
  includeContext: Pe(["none", "thisServer", "allServers"]).optional(),
  temperature: Y().optional(),
  /**
   * The requested maximum number of tokens to sample (to prevent runaway completions).
   *
   * The client MAY choose to sample fewer tokens than the requested maximum.
   */
  maxTokens: Y().int(),
  stopSequences: F(g()).optional(),
  /**
   * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
   */
  metadata: pe.optional(),
  /**
   * Tools that the model may use during generation.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   */
  tools: F(Li).optional(),
  /**
   * Controls how the model uses tools.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   * Default is `{ mode: "auto" }`.
   */
  toolChoice: Fd.optional()
}), Gd = me.extend({
  method: C("sampling/createMessage"),
  params: Bd
}), wr = ge.extend({
  /**
   * The name of the model that generated the message.
   */
  model: g(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: ce(Pe(["endTurn", "stopSequence", "maxTokens"]).or(g())),
  role: Ot,
  /**
   * Response content. Single content block (text, image, or audio).
   */
  content: Jd
}), Di = ge.extend({
  /**
   * The name of the model that generated the message.
   */
  model: g(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   * - "toolUse": The model wants to use one or more tools
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: ce(Pe(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(g())),
  role: Ot,
  /**
   * Response content. May be a single block or array. May include ToolUseContent if stopReason is "toolUse".
   */
  content: ee([Gt, F(Gt)])
}), Kd = R({
  type: C("boolean"),
  title: g().optional(),
  description: g().optional(),
  default: he().optional()
}), Yd = R({
  type: C("string"),
  title: g().optional(),
  description: g().optional(),
  minLength: Y().optional(),
  maxLength: Y().optional(),
  format: Pe(["email", "uri", "date", "date-time"]).optional(),
  default: g().optional()
}), Qd = R({
  type: Pe(["number", "integer"]),
  title: g().optional(),
  description: g().optional(),
  minimum: Y().optional(),
  maximum: Y().optional(),
  default: Y().optional()
}), Xd = R({
  type: C("string"),
  title: g().optional(),
  description: g().optional(),
  enum: F(g()),
  default: g().optional()
}), ef = R({
  type: C("string"),
  title: g().optional(),
  description: g().optional(),
  oneOf: F(R({
    const: g(),
    title: g()
  })),
  default: g().optional()
}), tf = R({
  type: C("string"),
  title: g().optional(),
  description: g().optional(),
  enum: F(g()),
  enumNames: F(g()).optional(),
  default: g().optional()
}), nf = ee([Xd, ef]), rf = R({
  type: C("array"),
  title: g().optional(),
  description: g().optional(),
  minItems: Y().optional(),
  maxItems: Y().optional(),
  items: R({
    type: C("string"),
    enum: F(g())
  }),
  default: F(g()).optional()
}), sf = R({
  type: C("array"),
  title: g().optional(),
  description: g().optional(),
  minItems: Y().optional(),
  maxItems: Y().optional(),
  items: R({
    anyOf: F(R({
      const: g(),
      title: g()
    }))
  }),
  default: F(g()).optional()
}), of = ee([rf, sf]), af = ee([tf, nf, of]), cf = ee([af, Kd, Yd, Qd]), uf = Rt.extend({
  /**
   * The elicitation mode.
   *
   * Optional for backward compatibility. Clients MUST treat missing mode as "form".
   */
  mode: C("form").optional(),
  /**
   * The message to present to the user describing what information is being requested.
   */
  message: g(),
  /**
   * A restricted subset of JSON Schema.
   * Only top-level properties are allowed, without nesting.
   */
  requestedSchema: R({
    type: C("object"),
    properties: ie(g(), cf),
    required: F(g()).optional()
  })
}), lf = Rt.extend({
  /**
   * The elicitation mode.
   */
  mode: C("url"),
  /**
   * The message to present to the user explaining why the interaction is needed.
   */
  message: g(),
  /**
   * The ID of the elicitation, which must be unique within the context of the server.
   * The client MUST treat this ID as an opaque value.
   */
  elicitationId: g(),
  /**
   * The URL that the user should navigate to.
   */
  url: g().url()
}), df = ee([uf, lf]), ff = me.extend({
  method: C("elicitation/create"),
  params: df
}), hf = ze.extend({
  /**
   * The ID of the elicitation that completed.
   */
  elicitationId: g()
}), pf = Ee.extend({
  method: C("notifications/elicitation/complete"),
  params: hf
}), Kt = ge.extend({
  /**
   * The user action in response to the elicitation.
   * - "accept": User submitted the form/confirmed the action
   * - "decline": User explicitly decline the action
   * - "cancel": User dismissed without making an explicit choice
   */
  action: Pe(["accept", "decline", "cancel"]),
  /**
   * The submitted form data, only present when action is "accept".
   * Contains values matching the requested schema.
   * Per MCP spec, content is "typically omitted" for decline/cancel actions.
   * We normalize null to undefined for leniency while maintaining type compatibility.
   */
  content: Ri((t) => t === null ? void 0 : t, ie(g(), ee([g(), Y(), he(), F(g())])).optional())
}), mf = R({
  type: C("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: g()
}), gf = R({
  type: C("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: g()
}), _f = Re.extend({
  ref: ee([gf, mf]),
  /**
   * The argument's information
   */
  argument: R({
    /**
     * The name of the argument
     */
    name: g(),
    /**
     * The value of the argument to use for completion matching.
     */
    value: g()
  }),
  context: R({
    /**
     * Previously-resolved variables in a URI template or prompt.
     */
    arguments: ie(g(), g()).optional()
  }).optional()
}), In = me.extend({
  method: C("completion/complete"),
  params: _f
});
function yf(t) {
  if (t.params.ref.type !== "ref/prompt")
    throw new TypeError(`Expected CompleteRequestPrompt, but got ${t.params.ref.type}`);
}
function vf(t) {
  if (t.params.ref.type !== "ref/resource")
    throw new TypeError(`Expected CompleteRequestResourceTemplate, but got ${t.params.ref.type}`);
}
const bf = ge.extend({
  completion: we({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: F(g()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: ce(Y().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: ce(he())
  })
}), wf = R({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: g().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: g().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: ie(g(), se()).optional()
}), kf = me.extend({
  method: C("roots/list"),
  params: Re.optional()
}), Ui = ge.extend({
  roots: F(wf)
}), Sf = Ee.extend({
  method: C("notifications/roots/list_changed"),
  params: ze.optional()
});
ee([
  or,
  xi,
  In,
  qi,
  Cn,
  On,
  zn,
  En,
  Nn,
  vd,
  wd,
  Wt,
  xn,
  cr,
  lr,
  dr,
  hr
]);
ee([
  ir,
  ar,
  Ii,
  Sf,
  Jt
]);
ee([
  sr,
  wr,
  Di,
  Kt,
  Ui,
  ur,
  fr,
  mn
]);
ee([
  or,
  Gd,
  ff,
  kf,
  cr,
  lr,
  dr,
  hr
]);
ee([
  ir,
  ar,
  Dd,
  Sd,
  _d,
  Md,
  xd,
  Jt,
  pf
]);
ee([
  sr,
  id,
  bf,
  Cd,
  Rd,
  hd,
  pd,
  gd,
  br,
  Zd,
  ur,
  fr,
  mn
]);
class O extends Error {
  constructor(e, n, r) {
    super(`MCP error ${e}: ${n}`), this.code = e, this.data = r, this.name = "McpError";
  }
  /**
   * Factory method to create the appropriate error type based on the error code and data
   */
  static fromError(e, n, r) {
    if (e === I.UrlElicitationRequired && r) {
      const s = r;
      if (s.elicitations)
        return new Tf(s.elicitations, n);
    }
    return new O(e, n, r);
  }
}
class Tf extends O {
  constructor(e, n = `URL elicitation${e.length > 1 ? "s" : ""} required`) {
    super(I.UrlElicitationRequired, n, {
      elicitations: e
    });
  }
  get elicitations() {
    var e;
    return ((e = this.data) == null ? void 0 : e.elicitations) ?? [];
  }
}
class Pf {
  append(e) {
    this._buffer = this._buffer ? Buffer.concat([this._buffer, e]) : e;
  }
  readMessage() {
    if (!this._buffer)
      return null;
    const e = this._buffer.indexOf(`
`);
    if (e === -1)
      return null;
    const n = this._buffer.toString("utf8", 0, e).replace(/\r$/, "");
    return this._buffer = this._buffer.subarray(e + 1), Rf(n);
  }
  clear() {
    this._buffer = void 0;
  }
}
function Rf(t) {
  return Gl.parse(JSON.parse(t));
}
function $f(t) {
  return JSON.stringify(t) + `
`;
}
class zf {
  constructor(e = Tr.stdin, n = Tr.stdout) {
    this._stdin = e, this._stdout = n, this._readBuffer = new Pf(), this._started = !1, this._ondata = (r) => {
      this._readBuffer.append(r), this.processReadBuffer();
    }, this._onerror = (r) => {
      var s;
      (s = this.onerror) == null || s.call(this, r);
    };
  }
  /**
   * Starts listening for messages on stdin.
   */
  async start() {
    if (this._started)
      throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    this._started = !0, this._stdin.on("data", this._ondata), this._stdin.on("error", this._onerror);
  }
  processReadBuffer() {
    var e, n;
    for (; ; )
      try {
        const r = this._readBuffer.readMessage();
        if (r === null)
          break;
        (e = this.onmessage) == null || e.call(this, r);
      } catch (r) {
        (n = this.onerror) == null || n.call(this, r);
      }
  }
  async close() {
    var n;
    this._stdin.off("data", this._ondata), this._stdin.off("error", this._onerror), this._stdin.listenerCount("data") === 0 && this._stdin.pause(), this._readBuffer.clear(), (n = this.onclose) == null || n.call(this);
  }
  send(e) {
    return new Promise((n) => {
      const r = $f(e);
      this._stdout.write(r) ? n() : this._stdout.once("drain", n);
    });
  }
}
const Ef = "https://playground.wordpress.net/";
function Nf(t) {
  return `${Ef}?mcp=yes&mcp-port=${t}`;
}
const Of = {
  playground_execute_php: {
    title: "Execute PHP Code",
    errorPrefix: "Error executing PHP",
    description: `Run arbitrary PHP code in WordPress Playground
			and return the output.

			WordPress is NOT bootstrapped automatically. To use
			WordPress functions, start your code with:
			require("/wordpress/wp-load.php");
			Always include the opening <?php tag.

			The response JSON contains three fields:
			- "text": stdout output
			- "errors": PHP warnings, notices, and fatal error
			  messages from stderr
			- "exitCode": 0 on success, non-zero on fatal error
			Check both "errors" and "exitCode" to determine
			whether the call succeeded.

			WARNING: output is returned in full with no
			truncation — avoid queries that produce unbounded
			output (e.g. SELECT * without LIMIT). Keep output
			under 50 KB to avoid filling the context window.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !0,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "code",
        type: "string",
        description: `PHP code to execute. Example:
					"<?php echo get_bloginfo('name');"`,
        required: !0
      }
    ]
  },
  playground_request: {
    title: "HTTP Request",
    errorPrefix: "Error making request",
    description: `Make an HTTP request to the WordPress site
			running in Playground. Requests are authenticated
			automatically via the browser session's cookie
			store.

			Prefer playground_execute_php for reading WordPress
			data (posts, options, plugin state) — it is faster
			and returns only what you echo. Use this tool only
			when the HTTP layer itself is what you are testing,
			for example: verifying that a URL returns a 301
			redirect, that a form submission sets a cookie, or
			that a REST endpoint returns the correct status
			code.

			Note: full HTML responses can be very large and may
			fill the context window. To change the URL the user
			sees in their tab, use playground_navigate instead.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !1,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "url",
        type: "string",
        description: `Request URL path, e.g.
					"/wp-json/wp/v2/posts" or
					"/wp-admin/plugins.php"`,
        required: !0
      },
      {
        name: "method",
        type: "string",
        description: `HTTP method (GET, POST, PUT,
					DELETE, etc.). Defaults to GET.`,
        required: !1,
        default: "GET"
      },
      {
        name: "headers",
        type: "object",
        description: "Request headers as key-value pairs",
        required: !1,
        additionalProperties: !0
      },
      {
        name: "body",
        type: "string",
        description: "Request body (for POST/PUT requests)",
        required: !1
      }
    ]
  },
  playground_navigate: {
    title: "Navigate to URL",
    errorPrefix: "Error navigating",
    description: `Navigate to a URL path in WordPress
			Playground and return the final URL after any
			redirects. Examples: "/wp-admin/",
			"/wp-login.php", "/".

			On 404 or error pages, navigation still succeeds
			from the tool's perspective — check the returned
			URL or use playground_request to verify the HTTP
			status code if needed.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !1,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: `The URL path to navigate to,
					e.g. "/wp-admin/" or
					"/wp-login.php"`,
        required: !0
      }
    ]
  },
  playground_get_current_url: {
    title: "Get Current URL",
    errorPrefix: "Error getting current URL",
    description: `Get the current URL path of the WordPress
			site displayed in Playground. For additional
			metadata (WordPress version, PHP version, document
			root), use playground_get_site_info instead.`,
    annotations: {
      readOnlyHint: !0,
      destructiveHint: !1,
      openWorldHint: !0
    },
    params: []
  },
  playground_get_site_info: {
    title: "Get Site Info",
    errorPrefix: "Error getting site info",
    description: `Get metadata about the running WordPress
			instance: current URL, document root, site URL,
			WordPress version, and PHP version. Use this when
			you need version information or the document root
			path. For just the current URL, prefer
			playground_get_current_url.`,
    annotations: {
      readOnlyHint: !0,
      destructiveHint: !1,
      openWorldHint: !0
    },
    params: []
  },
  playground_read_file: {
    title: "Read File",
    errorPrefix: "Error reading file",
    description: `Read a file from the WordPress virtual
			filesystem. Returns the file contents as text.`,
    annotations: {
      readOnlyHint: !0,
      destructiveHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: `Absolute path to the file, e.g.
					"/wordpress/wp-config.php"`,
        required: !0
      }
    ]
  },
  playground_write_file: {
    title: "Write File",
    errorPrefix: "Error writing file",
    description: `Write content to a file in the WordPress
			virtual filesystem.

			WARNING: Overwrites the entire file — existing
			content is permanently lost. Read the file first
			with playground_read_file if you need to preserve
			any content.

			Creates the file if it does not exist. Parent
			directories are NOT created automatically — call
			playground_mkdir first if needed, otherwise the
			write will fail with a "no such file or directory"
			error.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !0,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: `Absolute path to write to, e.g.
					"/wordpress/wp-content/test.txt"`,
        required: !0
      },
      {
        name: "contents",
        type: "string",
        description: "File contents to write",
        required: !0
      }
    ]
  },
  playground_list_files: {
    title: "List Files",
    errorPrefix: "Error listing files",
    description: `List files and directories at a given path
			in the WordPress virtual filesystem. Returns a
			flat, non-recursive listing of the immediate
			contents. To explore subdirectories, call this tool
			again with the subdirectory path.`,
    annotations: {
      readOnlyHint: !0,
      destructiveHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: `Absolute path to list, e.g.
					"/wordpress/wp-content/plugins"`,
        required: !0
      }
    ]
  },
  playground_mkdir: {
    title: "Create Directory",
    errorPrefix: "Error creating directory",
    description: `Create a directory (and all required parent
			directories) in the WordPress virtual filesystem.
			Call this before playground_write_file when writing
			to a path whose parent directories do not yet
			exist.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !1,
      idempotentHint: !0,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: `Absolute path of directory to
					create, e.g.
					"/wordpress/wp-content/my-plugin"`,
        required: !0
      }
    ]
  },
  playground_delete_file: {
    title: "Delete File",
    errorPrefix: "Error deleting file",
    description: `Delete a file from the WordPress virtual
			filesystem.

			WARNING: Deletion is permanent and cannot be
			undone. Returns an error if the file does not
			exist — use playground_file_exists first if
			deletion is conditional.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !0,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: "Absolute path of file to delete",
        required: !0
      }
    ]
  },
  playground_delete_directory: {
    title: "Delete Directory",
    errorPrefix: "Error deleting directory",
    description: `Delete a directory from the WordPress
			virtual filesystem.

			WARNING: Deletion is permanent and cannot be
			undone. By default (recursive=false), the directory
			must be empty or the call will fail. Set
			recursive=true to delete a directory and all its
			contents — use with care.`,
    annotations: {
      readOnlyHint: !1,
      destructiveHint: !0,
      idempotentHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: "Absolute path of directory to delete",
        required: !0
      },
      {
        name: "recursive",
        type: "boolean",
        description: `If true, delete directory and
					all contents. If false (default), fails
					on non-empty directories.`,
        required: !1,
        default: !1
      }
    ]
  },
  playground_file_exists: {
    title: "File Exists",
    errorPrefix: "Error checking file existence",
    description: `Check whether a file or directory exists
			in the WordPress virtual filesystem.`,
    annotations: {
      readOnlyHint: !0,
      destructiveHint: !1,
      openWorldHint: !0
    },
    params: [
      {
        name: "path",
        type: "string",
        description: "Absolute path to check",
        required: !0
      }
    ]
  }
};
function Cf() {
  return {
    playground_list_sites: {
      title: "List Available Sites",
      errorPrefix: "Error listing sites",
      description: `List all WordPress Playground sites
			available. Call this before any other playground
			tool — it returns the siteId required by every
			other operation.

			If this returns no sites, the user may need to
			open Playground in their browser. Use
			playground_get_website_url to get the exact URL
			to send to the user.

			Returns site names and storage type. "temporary"
			sites are lost on page reload, "opfs" sites persist
			across reloads. Call playground_save_site to persist
			a temporary site.`,
      annotations: {
        readOnlyHint: !0,
        destructiveHint: !1
      },
      params: []
    },
    playground_open_site: {
      title: "Open Site in Browser",
      errorPrefix: "Error opening site",
      description: `Open a WordPress Playground site in a new
			browser tab. The site must appear in
			playground_list_sites.

			Check playground_get_current_url first — if the
			site is already open in a tab, calling this tool
			will open a second tab rather than switching to
			the existing one.`,
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !1
      },
      params: []
    },
    playground_rename_site: {
      title: "Rename Site",
      errorPrefix: "Error renaming site",
      description: `Rename a WordPress Playground site. Updates
			the display name shown in the browser UI.`,
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !1
      },
      params: [
        {
          name: "newName",
          type: "string",
          description: "The new display name for the site",
          required: !0
        }
      ]
    },
    playground_save_site: {
      title: "Save Site",
      errorPrefix: "Error saving site",
      description: `Save a temporary WordPress Playground site
			to browser storage so it survives page reloads.
			Safe to call even if the site is already saved
			(no-op).

			Sites start as temporary by default and are lost
			when the browser tab is closed or the page is
			reloaded. Call this early in any multi-step
			workflow where losing progress would be costly.`,
      annotations: {
        readOnlyHint: !1,
        destructiveHint: !1
      },
      params: []
    },
    playground_get_website_url: {
      title: "Get Playground Website URL",
      errorPrefix: "Error getting website URL",
      description: `Return the URL the user must open in their
			browser to use WordPress Playground with this MCP
			server. Use this tool whenever you need to send
			the user to Playground or open it autonomously —
			always obtain the URL from this tool rather than
			constructing it manually.`,
      annotations: {
        readOnlyHint: !0,
        destructiveHint: !1,
        idempotentHint: !0,
        openWorldHint: !1
      },
      params: []
    }
  };
}
function xf(t) {
  if (t instanceof Error)
    return t.message;
  if (typeof t == "string")
    return t;
  try {
    return JSON.stringify(t);
  } catch {
    return String(t);
  }
}
function Hi(t) {
  return t === "none" ? "temporary" : t;
}
const If = [
  /^https?:\/\/localhost(:\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https?:\/\/playground\.wordpress\.net$/
];
function Jr(t) {
  return t ? If.some((e) => e.test(t)) : !0;
}
class Af {
  constructor() {
    this.connections = /* @__PURE__ */ new Map(), this.sites = /* @__PURE__ */ new Map(), this.pendingRequests = /* @__PURE__ */ new Map(), this.requestId = 0, this.sessionToken = ao(), this.siteActivatedListeners = [];
  }
  getPort() {
    var n;
    const e = (n = this.httpServer) == null ? void 0 : n.address();
    if (!e)
      throw new Error("WebSocket server is not running");
    return e.port;
  }
  startWebSocketServer(e = 0) {
    return new Promise((n, r) => {
      const s = oo((o, a) => {
        this.handleHttpRequest(o, a);
      });
      this.httpServer = s;
      const i = new io({
        server: s,
        verifyClient: (o, a) => {
          if (!Jr(o.origin)) {
            console.error(
              `[MCP] Rejected WebSocket connection from origin: ${o.origin}`
            ), a(!1, 403, "Forbidden");
            return;
          }
          if (new URL(
            o.req.url ?? "/",
            `http://${o.req.headers.host}`
          ).searchParams.get("token") !== this.sessionToken) {
            console.error(
              "[MCP] Rejected WebSocket connection: invalid token"
            ), a(!1, 401, "Invalid token");
            return;
          }
          a(!0);
        }
      });
      this.wss = i, s.on("error", (o) => {
        o.code === "EADDRINUSE" && console.error(
          `[MCP] Port ${e} is already in use. Kill the other process (lsof -i :${e}).`
        ), r(o);
      }), s.listen(e, "127.0.0.1", () => {
        const o = this.getPort();
        console.error(
          `[MCP] WebSocket server listening on ws://127.0.0.1:${o}`
        ), n(i);
      }), i.on("connection", (o) => {
        this.handleConnection(o);
      });
    });
  }
  handleHttpRequest(e, n) {
    if (e.url === "/bridge-token") {
      const r = e.headers.origin;
      if (!r || !Jr(r)) {
        n.writeHead(403), n.end("Forbidden");
        return;
      }
      if (n.setHeader("Access-Control-Allow-Origin", r), n.setHeader("Access-Control-Allow-Methods", "GET"), e.method === "OPTIONS") {
        n.writeHead(204), n.end();
        return;
      }
      n.writeHead(200, { "Content-Type": "application/json" }), n.end(JSON.stringify({ token: this.sessionToken }));
      return;
    }
    n.writeHead(404), n.end();
  }
  handleConnection(e) {
    let n;
    e.on("message", (r) => {
      let s;
      try {
        s = JSON.parse(r.toString());
      } catch {
        console.error("[MCP] Failed to parse message");
        return;
      }
      try {
        if (s.type === "register") {
          const i = !n;
          n = s.tabId, this.connections.set(n, e), this.updateSitesForTab(n, s.sites), i && console.error(
            `[MCP] Tab registered: ${n} (${s.sites.length} sites)`
          );
          return;
        }
        if (s.type === "response") {
          const i = this.pendingRequests.get(s.id);
          if (i)
            if (this.pendingRequests.delete(s.id), s.error) {
              const o = typeof s.error == "string" ? s.error : JSON.stringify(s.error);
              i.reject(new Error(o));
            } else
              i.resolve(s.value);
        }
      } catch (i) {
        console.error("[MCP] Error handling message:", i);
      }
    }), e.on("close", () => {
      if (n) {
        console.error(`[MCP] Tab disconnected: ${n}`);
        for (const [r, s] of this.pendingRequests)
          s.tabId === n && (s.reject(new Error("Browser tab disconnected")), this.pendingRequests.delete(r));
        this.connections.delete(n);
        for (const [r, s] of this.sites) {
          s.reportedByTabs.delete(n);
          const i = s.activeInTabs.indexOf(n);
          i !== -1 && s.activeInTabs.splice(i, 1), s.reportedByTabs.size === 0 && this.sites.delete(r);
        }
      }
    });
  }
  updateSitesForTab(e, n) {
    const r = new Set(n.map((s) => s.slug));
    for (const [s, i] of this.sites)
      if (!r.has(i.siteSlug)) {
        i.reportedByTabs.delete(e);
        const o = i.activeInTabs.indexOf(e);
        o !== -1 && i.activeInTabs.splice(o, 1), i.reportedByTabs.size === 0 && this.sites.delete(s);
      }
    for (const s of n) {
      const i = s.slug;
      let o = this.sites.get(i);
      if (o || (o = {
        siteSlug: s.slug,
        siteName: s.name,
        storage: s.storage,
        reportedByTabs: /* @__PURE__ */ new Set(),
        activeInTabs: []
      }, this.sites.set(i, o)), o.siteName = s.name, o.storage = s.storage, o.reportedByTabs.add(e), s.isActive) {
        const a = o.activeInTabs.length > 0, c = o.activeInTabs.indexOf(e);
        if (c !== -1 && o.activeInTabs.splice(c, 1), o.activeInTabs.unshift(e), !a)
          for (const u of this.siteActivatedListeners)
            u(i);
      } else {
        const a = o.activeInTabs.indexOf(e);
        a !== -1 && o.activeInTabs.splice(a, 1);
      }
    }
  }
  sendCommand(e, n, r = []) {
    const s = this.sites.get(e);
    if (!s)
      return Promise.reject(new Error(`Unknown site: ${e}`));
    const i = n.startsWith("__");
    let o;
    if (i) {
      if (this.connections.size === 0)
        return Promise.reject(new Error("No browser tabs connected"));
      o = [...s.reportedByTabs].find(
        (l) => this.connections.has(l)
      ) ?? this.connections.keys().next().value;
    } else {
      if (s.activeInTabs.length === 0)
        return Promise.reject(
          new Error(
            `Site "${s.siteName}" (${e}) is not active in any tab. Use open_site to activate it.`
          )
        );
      o = s.activeInTabs[0];
    }
    const a = this.connections.get(o);
    if (!a)
      return Promise.reject(new Error("Target browser tab disconnected"));
    const c = String(++this.requestId);
    return new Promise((u, l) => {
      const m = setTimeout(() => {
        this.pendingRequests.delete(c), l(
          new Error(
            `Command "${n}" timed out after 300 seconds`
          )
        );
      }, 3e5);
      this.pendingRequests.set(c, {
        resolve: (p) => {
          clearTimeout(m), u(p);
        },
        reject: (p) => {
          clearTimeout(m), l(p);
        },
        tabId: o
      }), a.send(
        JSON.stringify({
          id: c,
          type: "command",
          method: n,
          args: r,
          siteSlug: s.siteSlug
        })
      );
    });
  }
  waitForSiteActive(e, n) {
    const r = this.sites.get(e);
    return r && r.activeInTabs.length > 0 ? Promise.resolve(r) : new Promise((s, i) => {
      const o = setTimeout(() => {
        this.removeSiteActivatedListener(a), i(
          new Error(
            `Timed out waiting for site ${e} to become active`
          )
        );
      }, n), a = (c) => {
        c === e && (clearTimeout(o), this.removeSiteActivatedListener(a), s(this.sites.get(e)));
      };
      this.siteActivatedListeners.push(a);
    });
  }
  removeSiteActivatedListener(e) {
    const n = this.siteActivatedListeners.indexOf(e);
    n !== -1 && this.siteActivatedListeners.splice(n, 1);
  }
  listSites() {
    return [...this.sites.entries()].map(([e, n]) => ({
      siteId: e,
      name: n.siteName,
      storage: Hi(n.storage),
      isActive: n.activeInTabs.length > 0
    }));
  }
  getTabCount() {
    return this.connections.size;
  }
  isConnected() {
    return this.connections.size > 0;
  }
  async close() {
    if (this.wss)
      for (const e of this.wss.clients)
        e.close();
    return new Promise((e) => {
      const n = () => {
        this.httpServer ? this.httpServer.close(() => e()) : e();
      };
      this.wss ? this.wss.close(() => n()) : n();
    });
  }
}
var J;
(function(t) {
  t.assertEqual = (s) => {
  };
  function e(s) {
  }
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  t.assertNever = n, t.arrayToEnum = (s) => {
    const i = {};
    for (const o of s)
      i[o] = o;
    return i;
  }, t.getValidEnumValues = (s) => {
    const i = t.objectKeys(s).filter((a) => typeof s[s[a]] != "number"), o = {};
    for (const a of i)
      o[a] = s[a];
    return t.objectValues(o);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(i) {
    return s[i];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const i = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && i.push(o);
    return i;
  }, t.find = (s, i) => {
    for (const o of s)
      if (i(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && Number.isFinite(s) && Math.floor(s) === s;
  function r(s, i = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(i);
  }
  t.joinValues = r, t.jsonStringifyReplacer = (s, i) => typeof i == "bigint" ? i.toString() : i;
})(J || (J = {}));
var Wr;
(function(t) {
  t.mergeShapes = (e, n) => ({
    ...e,
    ...n
    // second overwrites first
  });
})(Wr || (Wr = {}));
const $ = J.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), qe = (t) => {
  switch (typeof t) {
    case "undefined":
      return $.undefined;
    case "string":
      return $.string;
    case "number":
      return Number.isNaN(t) ? $.nan : $.number;
    case "boolean":
      return $.boolean;
    case "function":
      return $.function;
    case "bigint":
      return $.bigint;
    case "symbol":
      return $.symbol;
    case "object":
      return Array.isArray(t) ? $.array : t === null ? $.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? $.promise : typeof Map < "u" && t instanceof Map ? $.map : typeof Set < "u" && t instanceof Set ? $.set : typeof Date < "u" && t instanceof Date ? $.date : $.object;
    default:
      return $.unknown;
  }
}, w = J.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class je extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (r) => {
      this.issues = [...this.issues, r];
    }, this.addIssues = (r = []) => {
      this.issues = [...this.issues, ...r];
    };
    const n = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, n) : this.__proto__ = n, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const n = e || function(i) {
      return i.message;
    }, r = { _errors: [] }, s = (i) => {
      for (const o of i.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          r._errors.push(n(o));
        else {
          let a = r, c = 0;
          for (; c < o.path.length; ) {
            const u = o.path[c];
            c === o.path.length - 1 ? (a[u] = a[u] || { _errors: [] }, a[u]._errors.push(n(o))) : a[u] = a[u] || { _errors: [] }, a = a[u], c++;
          }
        }
    };
    return s(this), r;
  }
  static assert(e) {
    if (!(e instanceof je))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, J.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = /* @__PURE__ */ Object.create(null), r = [];
    for (const s of this.issues)
      if (s.path.length > 0) {
        const i = s.path[0];
        n[i] = n[i] || [], n[i].push(e(s));
      } else
        r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
je.create = (t) => new je(t);
const An = (t, e) => {
  let n;
  switch (t.code) {
    case w.invalid_type:
      t.received === $.undefined ? n = "Required" : n = `Expected ${t.expected}, received ${t.received}`;
      break;
    case w.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, J.jsonStringifyReplacer)}`;
      break;
    case w.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${J.joinValues(t.keys, ", ")}`;
      break;
    case w.invalid_union:
      n = "Invalid input";
      break;
    case w.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${J.joinValues(t.options)}`;
      break;
    case w.invalid_enum_value:
      n = `Invalid enum value. Expected ${J.joinValues(t.options)}, received '${t.received}'`;
      break;
    case w.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case w.invalid_return_type:
      n = "Invalid function return type";
      break;
    case w.invalid_date:
      n = "Invalid date";
      break;
    case w.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (n = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? n = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? n = `Invalid input: must end with "${t.validation.endsWith}"` : J.assertNever(t.validation) : t.validation !== "regex" ? n = `Invalid ${t.validation}` : n = "Invalid";
      break;
    case w.too_small:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "bigint" ? n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : n = "Invalid input";
      break;
    case w.too_big:
      t.type === "array" ? n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : n = "Invalid input";
      break;
    case w.custom:
      n = "Invalid input";
      break;
    case w.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case w.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case w.not_finite:
      n = "Number must be finite";
      break;
    default:
      n = e.defaultError, J.assertNever(t);
  }
  return { message: n };
};
let Zf = An;
function jf() {
  return Zf;
}
const Mf = (t) => {
  const { data: e, path: n, errorMaps: r, issueData: s } = t, i = [...n, ...s.path || []], o = {
    ...s,
    path: i
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: i,
      message: s.message
    };
  let a = "";
  const c = r.filter((u) => !!u).slice().reverse();
  for (const u of c)
    a = u(o, { data: e, defaultError: a }).message;
  return {
    ...s,
    path: i,
    message: a
  };
};
function P(t, e) {
  const n = jf(), r = Mf({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      n,
      // then global override map
      n === An ? void 0 : An
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(r);
}
class be {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted")
        return M;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n) {
      const i = await s.key, o = await s.value;
      r.push({
        key: i,
        value: o
      });
    }
    return be.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: i, value: o } = s;
      if (i.status === "aborted" || o.status === "aborted")
        return M;
      i.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), i.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (r[i.value] = o.value);
    }
    return { status: e.value, value: r };
  }
}
const M = Object.freeze({
  status: "aborted"
}), vt = (t) => ({ status: "dirty", value: t }), Ne = (t) => ({ status: "valid", value: t }), Br = (t) => t.status === "aborted", Gr = (t) => t.status === "dirty", ct = (t) => t.status === "valid", Yt = (t) => typeof Promise < "u" && t instanceof Promise;
var N;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(N || (N = {}));
class Ie {
  constructor(e, n, r, s) {
    this._cachedPath = [], this.parent = e, this.data = n, this._path = r, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (Array.isArray(this._key) ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Kr = (t, e) => {
  if (ct(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const n = new je(t.common.issues);
      return this._error = n, this._error;
    }
  };
};
function L(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: n, required_error: r, description: s } = t;
  if (e && (n || r))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, a) => {
    const { message: c } = t;
    return o.code === "invalid_enum_value" ? { message: c ?? a.defaultError } : typeof a.data > "u" ? { message: c ?? r ?? a.defaultError } : o.code !== "invalid_type" ? { message: a.defaultError } : { message: c ?? n ?? a.defaultError };
  }, description: s };
}
class H {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return qe(e.data);
  }
  _getOrReturnCtx(e, n) {
    return n || {
      common: e.parent.common,
      data: e.data,
      parsedType: qe(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new be(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: qe(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (Yt(n))
      throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    const r = {
      common: {
        issues: [],
        async: (n == null ? void 0 : n.async) ?? !1,
        contextualErrorMap: n == null ? void 0 : n.errorMap
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    }, s = this._parseSync({ data: e, path: r.path, parent: r });
    return Kr(r, s);
  }
  "~validate"(e) {
    var r, s;
    const n = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    };
    if (!this["~standard"].async)
      try {
        const i = this._parseSync({ data: e, path: [], parent: n });
        return ct(i) ? {
          value: i.value
        } : {
          issues: n.common.issues
        };
      } catch (i) {
        (s = (r = i == null ? void 0 : i.message) == null ? void 0 : r.toLowerCase()) != null && s.includes("encountered") && (this["~standard"].async = !0), n.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: n }).then((i) => ct(i) ? {
      value: i.value
    } : {
      issues: n.common.issues
    });
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success)
      return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
      common: {
        issues: [],
        contextualErrorMap: n == null ? void 0 : n.errorMap,
        async: !0
      },
      path: (n == null ? void 0 : n.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: qe(e)
    }, s = this._parse({ data: e, path: r.path, parent: r }), i = await (Yt(s) ? s : Promise.resolve(s));
    return Kr(r, i);
  }
  refine(e, n) {
    const r = (s) => typeof n == "string" || typeof n > "u" ? { message: n } : typeof n == "function" ? n(s) : n;
    return this._refinement((s, i) => {
      const o = e(s), a = () => i.addIssue({
        code: w.custom,
        ...r(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((c) => c ? !0 : (a(), !1)) : o ? !0 : (a(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) => e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1));
  }
  _refinement(e) {
    return new lt({
      schema: this,
      typeName: k.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (n) => this["~validate"](n)
    };
  }
  optional() {
    return De.create(this, this._def);
  }
  nullable() {
    return dt.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return xe.create(this);
  }
  promise() {
    return nn.create(this, this._def);
  }
  or(e) {
    return Xt.create([this, e], this._def);
  }
  and(e) {
    return en.create(this, e, this._def);
  }
  transform(e) {
    return new lt({
      ...L(this._def),
      schema: this,
      typeName: k.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Mn({
      ...L(this._def),
      innerType: this,
      defaultValue: n,
      typeName: k.ZodDefault
    });
  }
  brand() {
    return new ah({
      typeName: k.ZodBranded,
      type: this,
      ...L(this._def)
    });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Ln({
      ...L(this._def),
      innerType: this,
      catchValue: n,
      typeName: k.ZodCatch
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return kr.create(this, e);
  }
  readonly() {
    return qn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Lf = /^c[^\s-]{8,}$/i, qf = /^[0-9a-z]+$/, Df = /^[0-9A-HJKMNP-TV-Z]{26}$/i, Uf = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, Hf = /^[a-z0-9_-]{21}$/i, Ff = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Vf = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, Jf = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Wf = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let vn;
const Bf = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Gf = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Kf = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Yf = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qf = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, Xf = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, Fi = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", eh = new RegExp(`^${Fi}$`);
function Vi(t) {
  let e = "[0-5]\\d";
  t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`);
  const n = t.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${n}`;
}
function th(t) {
  return new RegExp(`^${Vi(t)}$`);
}
function nh(t) {
  let e = `${Fi}T${Vi(t)}`;
  const n = [];
  return n.push(t.local ? "Z?" : "Z"), t.offset && n.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${n.join("|")})`, new RegExp(`^${e}$`);
}
function rh(t, e) {
  return !!((e === "v4" || !e) && Bf.test(t) || (e === "v6" || !e) && Kf.test(t));
}
function sh(t, e) {
  if (!Ff.test(t))
    return !1;
  try {
    const [n] = t.split(".");
    if (!n)
      return !1;
    const r = n.replace(/-/g, "+").replace(/_/g, "/").padEnd(n.length + (4 - n.length % 4) % 4, "="), s = JSON.parse(atob(r));
    return !(typeof s != "object" || s === null || "typ" in s && (s == null ? void 0 : s.typ) !== "JWT" || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function ih(t, e) {
  return !!((e === "v4" || !e) && Gf.test(t) || (e === "v6" || !e) && Yf.test(t));
}
class Ze extends H {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== $.string) {
      const i = this._getOrReturnCtx(e);
      return P(i, {
        code: w.invalid_type,
        expected: $.string,
        received: i.parsedType
      }), M;
    }
    const r = new be();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value && (s = this._getOrReturnCtx(e, s), P(s, {
          code: w.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value && (s = this._getOrReturnCtx(e, s), P(s, {
          code: w.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: i.message
        }), r.dirty());
      else if (i.kind === "length") {
        const o = e.data.length > i.value, a = e.data.length < i.value;
        (o || a) && (s = this._getOrReturnCtx(e, s), o ? P(s, {
          code: w.too_big,
          maximum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }) : a && P(s, {
          code: w.too_small,
          minimum: i.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: i.message
        }), r.dirty());
      } else if (i.kind === "email")
        Jf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "email",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "emoji")
        vn || (vn = new RegExp(Wf, "u")), vn.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "emoji",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "uuid")
        Uf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "uuid",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "nanoid")
        Hf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "nanoid",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid")
        Lf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "cuid",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "cuid2")
        qf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "cuid2",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "ulid")
        Df.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
          validation: "ulid",
          code: w.invalid_string,
          message: i.message
        }), r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), P(s, {
            validation: "url",
            code: w.invalid_string,
            message: i.message
          }), r.dirty();
        }
      else i.kind === "regex" ? (i.regex.lastIndex = 0, i.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "regex",
        code: w.invalid_string,
        message: i.message
      }), r.dirty())) : i.kind === "trim" ? e.data = e.data.trim() : i.kind === "includes" ? e.data.includes(i.value, i.position) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: { includes: i.value, position: i.position },
        message: i.message
      }), r.dirty()) : i.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : i.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : i.kind === "startsWith" ? e.data.startsWith(i.value) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: { startsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "endsWith" ? e.data.endsWith(i.value) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: { endsWith: i.value },
        message: i.message
      }), r.dirty()) : i.kind === "datetime" ? nh(i).test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: "datetime",
        message: i.message
      }), r.dirty()) : i.kind === "date" ? eh.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: "date",
        message: i.message
      }), r.dirty()) : i.kind === "time" ? th(i).test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.invalid_string,
        validation: "time",
        message: i.message
      }), r.dirty()) : i.kind === "duration" ? Vf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "duration",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "ip" ? rh(e.data, i.version) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "ip",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "jwt" ? sh(e.data, i.alg) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "jwt",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "cidr" ? ih(e.data, i.version) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "cidr",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64" ? Qf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "base64",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : i.kind === "base64url" ? Xf.test(e.data) || (s = this._getOrReturnCtx(e, s), P(s, {
        validation: "base64url",
        code: w.invalid_string,
        message: i.message
      }), r.dirty()) : J.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: w.invalid_string,
      ...N.errToObj(r)
    });
  }
  _addCheck(e) {
    return new Ze({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...N.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...N.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...N.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...N.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...N.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...N.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...N.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...N.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...N.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...N.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...N.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...N.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...N.errToObj(e) });
  }
  datetime(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (e == null ? void 0 : e.offset) ?? !1,
      local: (e == null ? void 0 : e.local) ?? !1,
      ...N.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...N.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...N.errToObj(e) });
  }
  regex(e, n) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...N.errToObj(n)
    });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n == null ? void 0 : n.position,
      ...N.errToObj(n == null ? void 0 : n.message)
    });
  }
  startsWith(e, n) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...N.errToObj(n)
    });
  }
  endsWith(e, n) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...N.errToObj(n)
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...N.errToObj(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...N.errToObj(n)
    });
  }
  length(e, n) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...N.errToObj(n)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, N.errToObj(e));
  }
  trim() {
    return new Ze({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new Ze({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new Ze({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Ze.create = (t) => new Ze({
  checks: [],
  typeName: k.ZodString,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...L(t)
});
function oh(t, e) {
  const n = (t.toString().split(".")[1] || "").length, r = (e.toString().split(".")[1] || "").length, s = n > r ? n : r, i = Number.parseInt(t.toFixed(s).replace(".", "")), o = Number.parseInt(e.toFixed(s).replace(".", ""));
  return i % o / 10 ** s;
}
class St extends H {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== $.number) {
      const i = this._getOrReturnCtx(e);
      return P(i, {
        code: w.invalid_type,
        expected: $.number,
        received: i.parsedType
      }), M;
    }
    let r;
    const s = new be();
    for (const i of this._def.checks)
      i.kind === "int" ? J.isInteger(e.data) || (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.invalid_type,
        expected: "integer",
        received: "float",
        message: i.message
      }), s.dirty()) : i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.too_small,
        minimum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.too_big,
        maximum: i.value,
        type: "number",
        inclusive: i.inclusive,
        exact: !1,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? oh(e.data, i.value) !== 0 && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : i.kind === "finite" ? Number.isFinite(e.data) || (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.not_finite,
        message: i.message
      }), s.dirty()) : J.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, N.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, N.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, N.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, N.toString(n));
  }
  setLimit(e, n, r, s) {
    return new St({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: N.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new St({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: N.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: N.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: N.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: N.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: N.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: N.toString(n)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: N.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: N.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: N.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && J.isInteger(e.value));
  }
  get isFinite() {
    let e = null, n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min" ? (n === null || r.value > n) && (n = r.value) : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
St.create = (t) => new St({
  checks: [],
  typeName: k.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...L(t)
});
class Tt extends H {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== $.bigint)
      return this._getInvalidInput(e);
    let r;
    const s = new be();
    for (const i of this._def.checks)
      i.kind === "min" ? (i.inclusive ? e.data < i.value : e.data <= i.value) && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.too_small,
        type: "bigint",
        minimum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "max" ? (i.inclusive ? e.data > i.value : e.data >= i.value) && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.too_big,
        type: "bigint",
        maximum: i.value,
        inclusive: i.inclusive,
        message: i.message
      }), s.dirty()) : i.kind === "multipleOf" ? e.data % i.value !== BigInt(0) && (r = this._getOrReturnCtx(e, r), P(r, {
        code: w.not_multiple_of,
        multipleOf: i.value,
        message: i.message
      }), s.dirty()) : J.assertNever(i);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const n = this._getOrReturnCtx(e);
    return P(n, {
      code: w.invalid_type,
      expected: $.bigint,
      received: n.parsedType
    }), M;
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, N.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, N.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, N.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, N.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Tt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: n,
          inclusive: r,
          message: N.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new Tt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: N.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: N.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: N.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: N.toString(e)
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: N.toString(n)
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Tt.create = (t) => new Tt({
  checks: [],
  typeName: k.ZodBigInt,
  coerce: (t == null ? void 0 : t.coerce) ?? !1,
  ...L(t)
});
class Zn extends H {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== $.boolean) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.boolean,
        received: r.parsedType
      }), M;
    }
    return Ne(e.data);
  }
}
Zn.create = (t) => new Zn({
  typeName: k.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...L(t)
});
class Qt extends H {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== $.date) {
      const i = this._getOrReturnCtx(e);
      return P(i, {
        code: w.invalid_type,
        expected: $.date,
        received: i.parsedType
      }), M;
    }
    if (Number.isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return P(i, {
        code: w.invalid_date
      }), M;
    }
    const r = new be();
    let s;
    for (const i of this._def.checks)
      i.kind === "min" ? e.data.getTime() < i.value && (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.too_small,
        message: i.message,
        inclusive: !0,
        exact: !1,
        minimum: i.value,
        type: "date"
      }), r.dirty()) : i.kind === "max" ? e.data.getTime() > i.value && (s = this._getOrReturnCtx(e, s), P(s, {
        code: w.too_big,
        message: i.message,
        inclusive: !0,
        exact: !1,
        maximum: i.value,
        type: "date"
      }), r.dirty()) : J.assertNever(i);
    return {
      status: r.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new Qt({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: N.toString(n)
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: N.toString(n)
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
Qt.create = (t) => new Qt({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: k.ZodDate,
  ...L(t)
});
class Yr extends H {
  _parse(e) {
    if (this._getType(e) !== $.symbol) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.symbol,
        received: r.parsedType
      }), M;
    }
    return Ne(e.data);
  }
}
Yr.create = (t) => new Yr({
  typeName: k.ZodSymbol,
  ...L(t)
});
class Qr extends H {
  _parse(e) {
    if (this._getType(e) !== $.undefined) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.undefined,
        received: r.parsedType
      }), M;
    }
    return Ne(e.data);
  }
}
Qr.create = (t) => new Qr({
  typeName: k.ZodUndefined,
  ...L(t)
});
class Xr extends H {
  _parse(e) {
    if (this._getType(e) !== $.null) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.null,
        received: r.parsedType
      }), M;
    }
    return Ne(e.data);
  }
}
Xr.create = (t) => new Xr({
  typeName: k.ZodNull,
  ...L(t)
});
class es extends H {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return Ne(e.data);
  }
}
es.create = (t) => new es({
  typeName: k.ZodAny,
  ...L(t)
});
class ts extends H {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return Ne(e.data);
  }
}
ts.create = (t) => new ts({
  typeName: k.ZodUnknown,
  ...L(t)
});
class Fe extends H {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return P(n, {
      code: w.invalid_type,
      expected: $.never,
      received: n.parsedType
    }), M;
  }
}
Fe.create = (t) => new Fe({
  typeName: k.ZodNever,
  ...L(t)
});
class ns extends H {
  _parse(e) {
    if (this._getType(e) !== $.undefined) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.void,
        received: r.parsedType
      }), M;
    }
    return Ne(e.data);
  }
}
ns.create = (t) => new ns({
  typeName: k.ZodVoid,
  ...L(t)
});
class xe extends H {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e), s = this._def;
    if (n.parsedType !== $.array)
      return P(n, {
        code: w.invalid_type,
        expected: $.array,
        received: n.parsedType
      }), M;
    if (s.exactLength !== null) {
      const o = n.data.length > s.exactLength.value, a = n.data.length < s.exactLength.value;
      (o || a) && (P(n, {
        code: o ? w.too_big : w.too_small,
        minimum: a ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), r.dirty());
    }
    if (s.minLength !== null && n.data.length < s.minLength.value && (P(n, {
      code: w.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), r.dirty()), s.maxLength !== null && n.data.length > s.maxLength.value && (P(n, {
      code: w.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), r.dirty()), n.common.async)
      return Promise.all([...n.data].map((o, a) => s.type._parseAsync(new Ie(n, o, n.path, a)))).then((o) => be.mergeArray(r, o));
    const i = [...n.data].map((o, a) => s.type._parseSync(new Ie(n, o, n.path, a)));
    return be.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new xe({
      ...this._def,
      minLength: { value: e, message: N.toString(n) }
    });
  }
  max(e, n) {
    return new xe({
      ...this._def,
      maxLength: { value: e, message: N.toString(n) }
    });
  }
  length(e, n) {
    return new xe({
      ...this._def,
      exactLength: { value: e, message: N.toString(n) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
xe.create = (t, e) => new xe({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: k.ZodArray,
  ...L(e)
});
function et(t) {
  if (t instanceof le) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = De.create(et(r));
    }
    return new le({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof xe ? new xe({
    ...t._def,
    type: et(t.element)
  }) : t instanceof De ? De.create(et(t.unwrap())) : t instanceof dt ? dt.create(et(t.unwrap())) : t instanceof Qe ? Qe.create(t.items.map((e) => et(e))) : t;
}
class le extends H {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), n = J.objectKeys(e);
    return this._cached = { shape: e, keys: n }, this._cached;
  }
  _parse(e) {
    if (this._getType(e) !== $.object) {
      const u = this._getOrReturnCtx(e);
      return P(u, {
        code: w.invalid_type,
        expected: $.object,
        received: u.parsedType
      }), M;
    }
    const { status: r, ctx: s } = this._processInputParams(e), { shape: i, keys: o } = this._getCached(), a = [];
    if (!(this._def.catchall instanceof Fe && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        o.includes(u) || a.push(u);
    const c = [];
    for (const u of o) {
      const l = i[u], d = s.data[u];
      c.push({
        key: { status: "valid", value: u },
        value: l._parse(new Ie(s, d, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof Fe) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const l of a)
          c.push({
            key: { status: "valid", value: l },
            value: { status: "valid", value: s.data[l] }
          });
      else if (u === "strict")
        a.length > 0 && (P(s, {
          code: w.unrecognized_keys,
          keys: a
        }), r.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const l of a) {
        const d = s.data[l];
        c.push({
          key: { status: "valid", value: l },
          value: u._parse(
            new Ie(s, d, s.path, l)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: l in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const l of c) {
        const d = await l.key, m = await l.value;
        u.push({
          key: d,
          value: m,
          alwaysSet: l.alwaysSet
        });
      }
      return u;
    }).then((u) => be.mergeObjectSync(r, u)) : be.mergeObjectSync(r, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return N.errToObj, new le({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (n, r) => {
          var i, o;
          const s = ((o = (i = this._def).errorMap) == null ? void 0 : o.call(i, n, r).message) ?? r.defaultError;
          return n.code === "unrecognized_keys" ? {
            message: N.errToObj(e).message ?? s
          } : {
            message: s
          };
        }
      } : {}
    });
  }
  strip() {
    return new le({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new le({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new le({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new le({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: k.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, n) {
    return this.augment({ [e]: n });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new le({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const n = {};
    for (const r of J.objectKeys(e))
      e[r] && this.shape[r] && (n[r] = this.shape[r]);
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  omit(e) {
    const n = {};
    for (const r of J.objectKeys(this.shape))
      e[r] || (n[r] = this.shape[r]);
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return et(this);
  }
  partial(e) {
    const n = {};
    for (const r of J.objectKeys(this.shape)) {
      const s = this.shape[r];
      e && !e[r] ? n[r] = s : n[r] = s.optional();
    }
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  required(e) {
    const n = {};
    for (const r of J.objectKeys(this.shape))
      if (e && !e[r])
        n[r] = this.shape[r];
      else {
        let i = this.shape[r];
        for (; i instanceof De; )
          i = i._def.innerType;
        n[r] = i;
      }
    return new le({
      ...this._def,
      shape: () => n
    });
  }
  keyof() {
    return Ji(J.objectKeys(this.shape));
  }
}
le.create = (t, e) => new le({
  shape: () => t,
  unknownKeys: "strip",
  catchall: Fe.create(),
  typeName: k.ZodObject,
  ...L(e)
});
le.strictCreate = (t, e) => new le({
  shape: () => t,
  unknownKeys: "strict",
  catchall: Fe.create(),
  typeName: k.ZodObject,
  ...L(e)
});
le.lazycreate = (t, e) => new le({
  shape: t,
  unknownKeys: "strip",
  catchall: Fe.create(),
  typeName: k.ZodObject,
  ...L(e)
});
class Xt extends H {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = this._def.options;
    function s(i) {
      for (const a of i)
        if (a.result.status === "valid")
          return a.result;
      for (const a of i)
        if (a.result.status === "dirty")
          return n.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((a) => new je(a.ctx.common.issues));
      return P(n, {
        code: w.invalid_union,
        unionErrors: o
      }), M;
    }
    if (n.common.async)
      return Promise.all(r.map(async (i) => {
        const o = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await i._parseAsync({
            data: n.data,
            path: n.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let i;
      const o = [];
      for (const c of r) {
        const u = {
          ...n,
          common: {
            ...n.common,
            issues: []
          },
          parent: null
        }, l = c._parseSync({
          data: n.data,
          path: n.path,
          parent: u
        });
        if (l.status === "valid")
          return l;
        l.status === "dirty" && !i && (i = { result: l, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (i)
        return n.common.issues.push(...i.ctx.common.issues), i.result;
      const a = o.map((c) => new je(c));
      return P(n, {
        code: w.invalid_union,
        unionErrors: a
      }), M;
    }
  }
  get options() {
    return this._def.options;
  }
}
Xt.create = (t, e) => new Xt({
  options: t,
  typeName: k.ZodUnion,
  ...L(e)
});
function jn(t, e) {
  const n = qe(t), r = qe(e);
  if (t === e)
    return { valid: !0, data: t };
  if (n === $.object && r === $.object) {
    const s = J.objectKeys(e), i = J.objectKeys(t).filter((a) => s.indexOf(a) !== -1), o = { ...t, ...e };
    for (const a of i) {
      const c = jn(t[a], e[a]);
      if (!c.valid)
        return { valid: !1 };
      o[a] = c.data;
    }
    return { valid: !0, data: o };
  } else if (n === $.array && r === $.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const o = t[i], a = e[i], c = jn(o, a);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return n === $.date && r === $.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class en extends H {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = (i, o) => {
      if (Br(i) || Br(o))
        return M;
      const a = jn(i.value, o.value);
      return a.valid ? ((Gr(i) || Gr(o)) && n.dirty(), { status: n.value, value: a.data }) : (P(r, {
        code: w.invalid_intersection_types
      }), M);
    };
    return r.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      }),
      this._def.right._parseAsync({
        data: r.data,
        path: r.path,
        parent: r
      })
    ]).then(([i, o]) => s(i, o)) : s(this._def.left._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }), this._def.right._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }));
  }
}
en.create = (t, e, n) => new en({
  left: t,
  right: e,
  typeName: k.ZodIntersection,
  ...L(n)
});
class Qe extends H {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== $.array)
      return P(r, {
        code: w.invalid_type,
        expected: $.array,
        received: r.parsedType
      }), M;
    if (r.data.length < this._def.items.length)
      return P(r, {
        code: w.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), M;
    !this._def.rest && r.data.length > this._def.items.length && (P(r, {
      code: w.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), n.dirty());
    const i = [...r.data].map((o, a) => {
      const c = this._def.items[a] || this._def.rest;
      return c ? c._parse(new Ie(r, o, r.path, a)) : null;
    }).filter((o) => !!o);
    return r.common.async ? Promise.all(i).then((o) => be.mergeArray(n, o)) : be.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Qe({
      ...this._def,
      rest: e
    });
  }
}
Qe.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Qe({
    items: t,
    typeName: k.ZodTuple,
    rest: null,
    ...L(e)
  });
};
class tn extends H {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== $.object)
      return P(r, {
        code: w.invalid_type,
        expected: $.object,
        received: r.parsedType
      }), M;
    const s = [], i = this._def.keyType, o = this._def.valueType;
    for (const a in r.data)
      s.push({
        key: i._parse(new Ie(r, a, r.path, a)),
        value: o._parse(new Ie(r, r.data[a], r.path, a)),
        alwaysSet: a in r.data
      });
    return r.common.async ? be.mergeObjectAsync(n, s) : be.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof H ? new tn({
      keyType: e,
      valueType: n,
      typeName: k.ZodRecord,
      ...L(r)
    }) : new tn({
      keyType: Ze.create(),
      valueType: e,
      typeName: k.ZodRecord,
      ...L(n)
    });
  }
}
class rs extends H {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== $.map)
      return P(r, {
        code: w.invalid_type,
        expected: $.map,
        received: r.parsedType
      }), M;
    const s = this._def.keyType, i = this._def.valueType, o = [...r.data.entries()].map(([a, c], u) => ({
      key: s._parse(new Ie(r, a, r.path, [u, "key"])),
      value: i._parse(new Ie(r, c, r.path, [u, "value"]))
    }));
    if (r.common.async) {
      const a = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of o) {
          const u = await c.key, l = await c.value;
          if (u.status === "aborted" || l.status === "aborted")
            return M;
          (u.status === "dirty" || l.status === "dirty") && n.dirty(), a.set(u.value, l.value);
        }
        return { status: n.value, value: a };
      });
    } else {
      const a = /* @__PURE__ */ new Map();
      for (const c of o) {
        const u = c.key, l = c.value;
        if (u.status === "aborted" || l.status === "aborted")
          return M;
        (u.status === "dirty" || l.status === "dirty") && n.dirty(), a.set(u.value, l.value);
      }
      return { status: n.value, value: a };
    }
  }
}
rs.create = (t, e, n) => new rs({
  valueType: e,
  keyType: t,
  typeName: k.ZodMap,
  ...L(n)
});
class Pt extends H {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== $.set)
      return P(r, {
        code: w.invalid_type,
        expected: $.set,
        received: r.parsedType
      }), M;
    const s = this._def;
    s.minSize !== null && r.data.size < s.minSize.value && (P(r, {
      code: w.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), n.dirty()), s.maxSize !== null && r.data.size > s.maxSize.value && (P(r, {
      code: w.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), n.dirty());
    const i = this._def.valueType;
    function o(c) {
      const u = /* @__PURE__ */ new Set();
      for (const l of c) {
        if (l.status === "aborted")
          return M;
        l.status === "dirty" && n.dirty(), u.add(l.value);
      }
      return { status: n.value, value: u };
    }
    const a = [...r.data.values()].map((c, u) => i._parse(new Ie(r, c, r.path, u)));
    return r.common.async ? Promise.all(a).then((c) => o(c)) : o(a);
  }
  min(e, n) {
    return new Pt({
      ...this._def,
      minSize: { value: e, message: N.toString(n) }
    });
  }
  max(e, n) {
    return new Pt({
      ...this._def,
      maxSize: { value: e, message: N.toString(n) }
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Pt.create = (t, e) => new Pt({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: k.ZodSet,
  ...L(e)
});
class ss extends H {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
ss.create = (t, e) => new ss({
  getter: t,
  typeName: k.ZodLazy,
  ...L(e)
});
class is extends H {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return P(n, {
        received: n.data,
        code: w.invalid_literal,
        expected: this._def.value
      }), M;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
is.create = (t, e) => new is({
  value: t,
  typeName: k.ZodLiteral,
  ...L(e)
});
function Ji(t, e) {
  return new ut({
    values: t,
    typeName: k.ZodEnum,
    ...L(e)
  });
}
class ut extends H {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return P(n, {
        expected: J.joinValues(r),
        received: n.parsedType,
        code: w.invalid_type
      }), M;
    }
    if (this._cache || (this._cache = new Set(this._def.values)), !this._cache.has(e.data)) {
      const n = this._getOrReturnCtx(e), r = this._def.values;
      return P(n, {
        received: n.data,
        code: w.invalid_enum_value,
        options: r
      }), M;
    }
    return Ne(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values)
      e[n] = n;
    return e;
  }
  extract(e, n = this._def) {
    return ut.create(e, {
      ...this._def,
      ...n
    });
  }
  exclude(e, n = this._def) {
    return ut.create(this.options.filter((r) => !e.includes(r)), {
      ...this._def,
      ...n
    });
  }
}
ut.create = Ji;
class os extends H {
  _parse(e) {
    const n = J.getValidEnumValues(this._def.values), r = this._getOrReturnCtx(e);
    if (r.parsedType !== $.string && r.parsedType !== $.number) {
      const s = J.objectValues(n);
      return P(r, {
        expected: J.joinValues(s),
        received: r.parsedType,
        code: w.invalid_type
      }), M;
    }
    if (this._cache || (this._cache = new Set(J.getValidEnumValues(this._def.values))), !this._cache.has(e.data)) {
      const s = J.objectValues(n);
      return P(r, {
        received: r.data,
        code: w.invalid_enum_value,
        options: s
      }), M;
    }
    return Ne(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
os.create = (t, e) => new os({
  values: t,
  typeName: k.ZodNativeEnum,
  ...L(e)
});
class nn extends H {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== $.promise && n.common.async === !1)
      return P(n, {
        code: w.invalid_type,
        expected: $.promise,
        received: n.parsedType
      }), M;
    const r = n.parsedType === $.promise ? n.data : Promise.resolve(n.data);
    return Ne(r.then((s) => this._def.type.parseAsync(s, {
      path: n.path,
      errorMap: n.common.contextualErrorMap
    })));
  }
}
nn.create = (t, e) => new nn({
  type: t,
  typeName: k.ZodPromise,
  ...L(e)
});
class lt extends H {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === k.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e), s = this._def.effect || null, i = {
      addIssue: (o) => {
        P(r, o), o.fatal ? n.abort() : n.dirty();
      },
      get path() {
        return r.path;
      }
    };
    if (i.addIssue = i.addIssue.bind(i), s.type === "preprocess") {
      const o = s.transform(r.data, i);
      if (r.common.async)
        return Promise.resolve(o).then(async (a) => {
          if (n.value === "aborted")
            return M;
          const c = await this._def.schema._parseAsync({
            data: a,
            path: r.path,
            parent: r
          });
          return c.status === "aborted" ? M : c.status === "dirty" || n.value === "dirty" ? vt(c.value) : c;
        });
      {
        if (n.value === "aborted")
          return M;
        const a = this._def.schema._parseSync({
          data: o,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? M : a.status === "dirty" || n.value === "dirty" ? vt(a.value) : a;
      }
    }
    if (s.type === "refinement") {
      const o = (a) => {
        const c = s.refinement(a, i);
        if (r.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return a;
      };
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return a.status === "aborted" ? M : (a.status === "dirty" && n.dirty(), o(a.value), { status: n.value, value: a.value });
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((a) => a.status === "aborted" ? M : (a.status === "dirty" && n.dirty(), o(a.value).then(() => ({ status: n.value, value: a.value }))));
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r
        });
        if (!ct(o))
          return M;
        const a = s.transform(o.value, i);
        if (a instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: n.value, value: a };
      } else
        return this._def.schema._parseAsync({ data: r.data, path: r.path, parent: r }).then((o) => ct(o) ? Promise.resolve(s.transform(o.value, i)).then((a) => ({
          status: n.value,
          value: a
        })) : M);
    J.assertNever(s);
  }
}
lt.create = (t, e, n) => new lt({
  schema: t,
  typeName: k.ZodEffects,
  effect: e,
  ...L(n)
});
lt.createWithPreprocess = (t, e, n) => new lt({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: k.ZodEffects,
  ...L(n)
});
class De extends H {
  _parse(e) {
    return this._getType(e) === $.undefined ? Ne(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
De.create = (t, e) => new De({
  innerType: t,
  typeName: k.ZodOptional,
  ...L(e)
});
class dt extends H {
  _parse(e) {
    return this._getType(e) === $.null ? Ne(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
dt.create = (t, e) => new dt({
  innerType: t,
  typeName: k.ZodNullable,
  ...L(e)
});
class Mn extends H {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return n.parsedType === $.undefined && (r = this._def.defaultValue()), this._def.innerType._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
Mn.create = (t, e) => new Mn({
  innerType: t,
  typeName: k.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...L(e)
});
class Ln extends H {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = {
      ...n,
      common: {
        ...n.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: r.data,
      path: r.path,
      parent: {
        ...r
      }
    });
    return Yt(s) ? s.then((i) => ({
      status: "valid",
      value: i.status === "valid" ? i.value : this._def.catchValue({
        get error() {
          return new je(r.common.issues);
        },
        input: r.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new je(r.common.issues);
        },
        input: r.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Ln.create = (t, e) => new Ln({
  innerType: t,
  typeName: k.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...L(e)
});
class as extends H {
  _parse(e) {
    if (this._getType(e) !== $.nan) {
      const r = this._getOrReturnCtx(e);
      return P(r, {
        code: w.invalid_type,
        expected: $.nan,
        received: r.parsedType
      }), M;
    }
    return { status: "valid", value: e.data };
  }
}
as.create = (t) => new as({
  typeName: k.ZodNaN,
  ...L(t)
});
class ah extends H {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e), r = n.data;
    return this._def.type._parse({
      data: r,
      path: n.path,
      parent: n
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class kr extends H {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r
        });
        return i.status === "aborted" ? M : i.status === "dirty" ? (n.dirty(), vt(i.value)) : this._def.out._parseAsync({
          data: i.value,
          path: r.path,
          parent: r
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r
      });
      return s.status === "aborted" ? M : s.status === "dirty" ? (n.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: r.path,
        parent: r
      });
    }
  }
  static create(e, n) {
    return new kr({
      in: e,
      out: n,
      typeName: k.ZodPipeline
    });
  }
}
class qn extends H {
  _parse(e) {
    const n = this._def.innerType._parse(e), r = (s) => (ct(s) && (s.value = Object.freeze(s.value)), s);
    return Yt(n) ? n.then((s) => r(s)) : r(n);
  }
  unwrap() {
    return this._def.innerType;
  }
}
qn.create = (t, e) => new qn({
  innerType: t,
  typeName: k.ZodReadonly,
  ...L(e)
});
var k;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(k || (k = {}));
const Lt = Ze.create, ch = Zn.create;
Fe.create;
xe.create;
const Dn = le.create;
Xt.create;
en.create;
Qe.create;
const uh = tn.create;
ut.create;
nn.create;
De.create;
dt.create;
const lh = /* @__PURE__ */ _("ZodMiniType", (t, e) => {
  if (!t._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  X.init(t, e), t.def = e, t.type = e.type, t.parse = (n, r) => $o(t, n, r, { callee: t.parse }), t.safeParse = (n, r) => Kn(t, n, r), t.parseAsync = async (n, r) => zo(t, n, r, { callee: t.parseAsync }), t.safeParseAsync = async (n, r) => Yn(t, n, r), t.check = (...n) => t.clone({
    ...e,
    checks: [
      ...e.checks ?? [],
      ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
    ]
  }, { parent: !0 }), t.with = t.check, t.clone = (n, r) => Me(t, n, r), t.brand = () => t, t.register = (n, r) => (n.add(t, r), t), t.apply = (n) => n(t);
}), dh = /* @__PURE__ */ _("ZodMiniObject", (t, e) => {
  Us.init(t, e), lh.init(t, e), W(t, "shape", () => e.shape);
});
// @__NO_SIDE_EFFECTS__
function cs(t, e) {
  const n = {
    type: "object",
    shape: t ?? {},
    ...E(e)
  };
  return new dh(n);
}
function Ae(t) {
  return !!t._zod;
}
function rt(t) {
  const e = Object.values(t);
  if (e.length === 0)
    return /* @__PURE__ */ cs({});
  const n = e.every(Ae), r = e.every((s) => !Ae(s));
  if (n)
    return /* @__PURE__ */ cs(t);
  if (r)
    return Dn(t);
  throw new Error("Mixed Zod versions detected in object shape.");
}
function bt(t, e) {
  return Ae(t) ? Kn(t, e) : t.safeParse(e);
}
async function bn(t, e) {
  return Ae(t) ? await Yn(t, e) : await t.safeParseAsync(e);
}
function Ct(t) {
  var n, r;
  if (!t)
    return;
  let e;
  if (Ae(t) ? e = (r = (n = t._zod) == null ? void 0 : n.def) == null ? void 0 : r.shape : e = t.shape, !!e) {
    if (typeof e == "function")
      try {
        return e();
      } catch {
        return;
      }
    return e;
  }
}
function mt(t) {
  var e;
  if (t) {
    if (typeof t == "object") {
      const n = t, r = t;
      if (!n._def && !r._zod) {
        const s = Object.values(t);
        if (s.length > 0 && s.every((i) => typeof i == "object" && i !== null && (i._def !== void 0 || i._zod !== void 0 || typeof i.parse == "function")))
          return rt(t);
      }
    }
    if (Ae(t)) {
      const r = (e = t._zod) == null ? void 0 : e.def;
      if (r && (r.type === "object" || r.shape !== void 0))
        return t;
    } else if (t.shape !== void 0)
      return t;
  }
}
function wn(t) {
  if (t && typeof t == "object") {
    if ("message" in t && typeof t.message == "string")
      return t.message;
    if ("issues" in t && Array.isArray(t.issues) && t.issues.length > 0) {
      const e = t.issues[0];
      if (e && typeof e == "object" && "message" in e)
        return String(e.message);
    }
    try {
      return JSON.stringify(t);
    } catch {
      return String(t);
    }
  }
  return String(t);
}
function fh(t) {
  return t.description;
}
function hh(t) {
  var n, r, s;
  if (Ae(t))
    return ((r = (n = t._zod) == null ? void 0 : n.def) == null ? void 0 : r.type) === "optional";
  const e = t;
  return typeof t.isOptional == "function" ? t.isOptional() : ((s = e._def) == null ? void 0 : s.typeName) === "ZodOptional";
}
function Wi(t) {
  var s;
  if (Ae(t)) {
    const o = (s = t._zod) == null ? void 0 : s.def;
    if (o) {
      if (o.value !== void 0)
        return o.value;
      if (Array.isArray(o.values) && o.values.length > 0)
        return o.values[0];
    }
  }
  const n = t._def;
  if (n) {
    if (n.value !== void 0)
      return n.value;
    if (Array.isArray(n.values) && n.values.length > 0)
      return n.values[0];
  }
  const r = t.value;
  if (r !== void 0)
    return r;
}
function Ke(t) {
  return t === "completed" || t === "failed" || t === "cancelled";
}
const ph = Symbol("Let zodToJsonSchema decide on which parser to use"), us = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: !0,
  rejectedAdditionalProperties: !1,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref",
  openAiAnyTypeName: "OpenAiAnyType"
}, mh = (t) => typeof t == "string" ? {
  ...us,
  name: t
} : {
  ...us,
  ...t
}, gh = (t) => {
  const e = mh(t), n = e.name !== void 0 ? [...e.basePath, e.definitionPath, e.name] : e.basePath;
  return {
    ...e,
    flags: { hasReferencedOpenAiAnyType: !1 },
    currentPath: n,
    propertyPath: void 0,
    seen: new Map(Object.entries(e.definitions).map(([r, s]) => [
      s._def,
      {
        def: s._def,
        path: [...e.basePath, e.definitionPath, r],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function Bi(t, e, n, r) {
  r != null && r.errorMessages && n && (t.errorMessage = {
    ...t.errorMessage,
    [e]: n
  });
}
function K(t, e, n, r, s) {
  t[e] = n, Bi(t, e, r, s);
}
const Gi = (t, e) => {
  let n = 0;
  for (; n < t.length && n < e.length && t[n] === e[n]; n++)
    ;
  return [(t.length - n).toString(), ...e.slice(n)].join("/");
};
function ke(t) {
  if (t.target !== "openAi")
    return {};
  const e = [
    ...t.basePath,
    t.definitionPath,
    t.openAiAnyTypeName
  ];
  return t.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: t.$refStrategy === "relative" ? Gi(e, t.currentPath) : e.join("/")
  };
}
function _h(t, e) {
  var r, s, i;
  const n = {
    type: "array"
  };
  return (r = t.type) != null && r._def && ((i = (s = t.type) == null ? void 0 : s._def) == null ? void 0 : i.typeName) !== k.ZodAny && (n.items = B(t.type._def, {
    ...e,
    currentPath: [...e.currentPath, "items"]
  })), t.minLength && K(n, "minItems", t.minLength.value, t.minLength.message, e), t.maxLength && K(n, "maxItems", t.maxLength.value, t.maxLength.message, e), t.exactLength && (K(n, "minItems", t.exactLength.value, t.exactLength.message, e), K(n, "maxItems", t.exactLength.value, t.exactLength.message, e)), n;
}
function yh(t, e) {
  const n = {
    type: "integer",
    format: "int64"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? K(n, "minimum", r.value, r.message, e) : K(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), K(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? K(n, "maximum", r.value, r.message, e) : K(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), K(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        K(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function vh() {
  return {
    type: "boolean"
  };
}
function Ki(t, e) {
  return B(t.type._def, e);
}
const bh = (t, e) => B(t.innerType._def, e);
function Yi(t, e, n) {
  const r = n ?? e.dateStrategy;
  if (Array.isArray(r))
    return {
      anyOf: r.map((s, i) => Yi(t, e, s))
    };
  switch (r) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return wh(t, e);
  }
}
const wh = (t, e) => {
  const n = {
    type: "integer",
    format: "unix-time"
  };
  if (e.target === "openApi3")
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "min":
        K(
          n,
          "minimum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
      case "max":
        K(
          n,
          "maximum",
          r.value,
          // This is in milliseconds
          r.message,
          e
        );
        break;
    }
  return n;
};
function kh(t, e) {
  return {
    ...B(t.innerType._def, e),
    default: t.defaultValue()
  };
}
function Sh(t, e) {
  return e.effectStrategy === "input" ? B(t.schema._def, e) : ke(e);
}
function Th(t) {
  return {
    type: "string",
    enum: Array.from(t.values)
  };
}
const Ph = (t) => "type" in t && t.type === "string" ? !1 : "allOf" in t;
function Rh(t, e) {
  const n = [
    B(t.left._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "0"]
    }),
    B(t.right._def, {
      ...e,
      currentPath: [...e.currentPath, "allOf", "1"]
    })
  ].filter((i) => !!i);
  let r = e.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const s = [];
  return n.forEach((i) => {
    if (Ph(i))
      s.push(...i.allOf), i.unevaluatedProperties === void 0 && (r = void 0);
    else {
      let o = i;
      if ("additionalProperties" in i && i.additionalProperties === !1) {
        const { additionalProperties: a, ...c } = i;
        o = c;
      } else
        r = void 0;
      s.push(o);
    }
  }), s.length ? {
    allOf: s,
    ...r
  } : void 0;
}
function $h(t, e) {
  const n = typeof t.value;
  return n !== "bigint" && n !== "number" && n !== "boolean" && n !== "string" ? {
    type: Array.isArray(t.value) ? "array" : "object"
  } : e.target === "openApi3" ? {
    type: n === "bigint" ? "integer" : n,
    enum: [t.value]
  } : {
    type: n === "bigint" ? "integer" : n,
    const: t.value
  };
}
let kn;
const Oe = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (kn === void 0 && (kn = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), kn),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function Qi(t, e) {
  const n = {
    type: "string"
  };
  if (t.checks)
    for (const r of t.checks)
      switch (r.kind) {
        case "min":
          K(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e);
          break;
        case "max":
          K(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "email":
          switch (e.emailStrategy) {
            case "format:email":
              Ce(n, "email", r.message, e);
              break;
            case "format:idn-email":
              Ce(n, "idn-email", r.message, e);
              break;
            case "pattern:zod":
              ye(n, Oe.email, r.message, e);
              break;
          }
          break;
        case "url":
          Ce(n, "uri", r.message, e);
          break;
        case "uuid":
          Ce(n, "uuid", r.message, e);
          break;
        case "regex":
          ye(n, r.regex, r.message, e);
          break;
        case "cuid":
          ye(n, Oe.cuid, r.message, e);
          break;
        case "cuid2":
          ye(n, Oe.cuid2, r.message, e);
          break;
        case "startsWith":
          ye(n, RegExp(`^${Sn(r.value, e)}`), r.message, e);
          break;
        case "endsWith":
          ye(n, RegExp(`${Sn(r.value, e)}$`), r.message, e);
          break;
        case "datetime":
          Ce(n, "date-time", r.message, e);
          break;
        case "date":
          Ce(n, "date", r.message, e);
          break;
        case "time":
          Ce(n, "time", r.message, e);
          break;
        case "duration":
          Ce(n, "duration", r.message, e);
          break;
        case "length":
          K(n, "minLength", typeof n.minLength == "number" ? Math.max(n.minLength, r.value) : r.value, r.message, e), K(n, "maxLength", typeof n.maxLength == "number" ? Math.min(n.maxLength, r.value) : r.value, r.message, e);
          break;
        case "includes": {
          ye(n, RegExp(Sn(r.value, e)), r.message, e);
          break;
        }
        case "ip": {
          r.version !== "v6" && Ce(n, "ipv4", r.message, e), r.version !== "v4" && Ce(n, "ipv6", r.message, e);
          break;
        }
        case "base64url":
          ye(n, Oe.base64url, r.message, e);
          break;
        case "jwt":
          ye(n, Oe.jwt, r.message, e);
          break;
        case "cidr": {
          r.version !== "v6" && ye(n, Oe.ipv4Cidr, r.message, e), r.version !== "v4" && ye(n, Oe.ipv6Cidr, r.message, e);
          break;
        }
        case "emoji":
          ye(n, Oe.emoji(), r.message, e);
          break;
        case "ulid": {
          ye(n, Oe.ulid, r.message, e);
          break;
        }
        case "base64": {
          switch (e.base64Strategy) {
            case "format:binary": {
              Ce(n, "binary", r.message, e);
              break;
            }
            case "contentEncoding:base64": {
              K(n, "contentEncoding", "base64", r.message, e);
              break;
            }
            case "pattern:zod": {
              ye(n, Oe.base64, r.message, e);
              break;
            }
          }
          break;
        }
        case "nanoid":
          ye(n, Oe.nanoid, r.message, e);
      }
  return n;
}
function Sn(t, e) {
  return e.patternStrategy === "escape" ? Eh(t) : t;
}
const zh = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function Eh(t) {
  let e = "";
  for (let n = 0; n < t.length; n++)
    zh.has(t[n]) || (e += "\\"), e += t[n];
  return e;
}
function Ce(t, e, n, r) {
  var s;
  t.format || (s = t.anyOf) != null && s.some((i) => i.format) ? (t.anyOf || (t.anyOf = []), t.format && (t.anyOf.push({
    format: t.format,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { format: t.errorMessage.format }
    }
  }), delete t.format, t.errorMessage && (delete t.errorMessage.format, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.anyOf.push({
    format: e,
    ...n && r.errorMessages && { errorMessage: { format: n } }
  })) : K(t, "format", e, n, r);
}
function ye(t, e, n, r) {
  var s;
  t.pattern || (s = t.allOf) != null && s.some((i) => i.pattern) ? (t.allOf || (t.allOf = []), t.pattern && (t.allOf.push({
    pattern: t.pattern,
    ...t.errorMessage && r.errorMessages && {
      errorMessage: { pattern: t.errorMessage.pattern }
    }
  }), delete t.pattern, t.errorMessage && (delete t.errorMessage.pattern, Object.keys(t.errorMessage).length === 0 && delete t.errorMessage)), t.allOf.push({
    pattern: ls(e, r),
    ...n && r.errorMessages && { errorMessage: { pattern: n } }
  })) : K(t, "pattern", ls(e, r), n, r);
}
function ls(t, e) {
  var c;
  if (!e.applyRegexFlags || !t.flags)
    return t.source;
  const n = {
    i: t.flags.includes("i"),
    m: t.flags.includes("m"),
    s: t.flags.includes("s")
    // `.` matches newlines
  }, r = n.i ? t.source.toLowerCase() : t.source;
  let s = "", i = !1, o = !1, a = !1;
  for (let u = 0; u < r.length; u++) {
    if (i) {
      s += r[u], i = !1;
      continue;
    }
    if (n.i) {
      if (o) {
        if (r[u].match(/[a-z]/)) {
          a ? (s += r[u], s += `${r[u - 2]}-${r[u]}`.toUpperCase(), a = !1) : r[u + 1] === "-" && ((c = r[u + 2]) != null && c.match(/[a-z]/)) ? (s += r[u], a = !0) : s += `${r[u]}${r[u].toUpperCase()}`;
          continue;
        }
      } else if (r[u].match(/[a-z]/)) {
        s += `[${r[u]}${r[u].toUpperCase()}]`;
        continue;
      }
    }
    if (n.m) {
      if (r[u] === "^") {
        s += `(^|(?<=[\r
]))`;
        continue;
      } else if (r[u] === "$") {
        s += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (n.s && r[u] === ".") {
      s += o ? `${r[u]}\r
` : `[${r[u]}\r
]`;
      continue;
    }
    s += r[u], r[u] === "\\" ? i = !0 : o && r[u] === "]" ? o = !1 : !o && r[u] === "[" && (o = !0);
  }
  try {
    new RegExp(s);
  } catch {
    return console.warn(`Could not convert regex pattern at ${e.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), t.source;
  }
  return s;
}
function Xi(t, e) {
  var r, s, i, o, a, c;
  if (e.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), e.target === "openApi3" && ((r = t.keyType) == null ? void 0 : r._def.typeName) === k.ZodEnum)
    return {
      type: "object",
      required: t.keyType._def.values,
      properties: t.keyType._def.values.reduce((u, l) => ({
        ...u,
        [l]: B(t.valueType._def, {
          ...e,
          currentPath: [...e.currentPath, "properties", l]
        }) ?? ke(e)
      }), {}),
      additionalProperties: e.rejectedAdditionalProperties
    };
  const n = {
    type: "object",
    additionalProperties: B(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    }) ?? e.allowedAdditionalProperties
  };
  if (e.target === "openApi3")
    return n;
  if (((s = t.keyType) == null ? void 0 : s._def.typeName) === k.ZodString && ((i = t.keyType._def.checks) != null && i.length)) {
    const { type: u, ...l } = Qi(t.keyType._def, e);
    return {
      ...n,
      propertyNames: l
    };
  } else {
    if (((o = t.keyType) == null ? void 0 : o._def.typeName) === k.ZodEnum)
      return {
        ...n,
        propertyNames: {
          enum: t.keyType._def.values
        }
      };
    if (((a = t.keyType) == null ? void 0 : a._def.typeName) === k.ZodBranded && t.keyType._def.type._def.typeName === k.ZodString && ((c = t.keyType._def.type._def.checks) != null && c.length)) {
      const { type: u, ...l } = Ki(t.keyType._def, e);
      return {
        ...n,
        propertyNames: l
      };
    }
  }
  return n;
}
function Nh(t, e) {
  if (e.mapStrategy === "record")
    return Xi(t, e);
  const n = B(t.keyType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "0"]
  }) || ke(e), r = B(t.valueType._def, {
    ...e,
    currentPath: [...e.currentPath, "items", "items", "1"]
  }) || ke(e);
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [n, r],
      minItems: 2,
      maxItems: 2
    }
  };
}
function Oh(t) {
  const e = t.values, r = Object.keys(t.values).filter((i) => typeof e[e[i]] != "number").map((i) => e[i]), s = Array.from(new Set(r.map((i) => typeof i)));
  return {
    type: s.length === 1 ? s[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: r
  };
}
function Ch(t) {
  return t.target === "openAi" ? void 0 : {
    not: ke({
      ...t,
      currentPath: [...t.currentPath, "not"]
    })
  };
}
function xh(t) {
  return t.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const rn = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function Ih(t, e) {
  if (e.target === "openApi3")
    return ds(t, e);
  const n = t.options instanceof Map ? Array.from(t.options.values()) : t.options;
  if (n.every((r) => r._def.typeName in rn && (!r._def.checks || !r._def.checks.length))) {
    const r = n.reduce((s, i) => {
      const o = rn[i._def.typeName];
      return o && !s.includes(o) ? [...s, o] : s;
    }, []);
    return {
      type: r.length > 1 ? r : r[0]
    };
  } else if (n.every((r) => r._def.typeName === "ZodLiteral" && !r.description)) {
    const r = n.reduce((s, i) => {
      const o = typeof i._def.value;
      switch (o) {
        case "string":
        case "number":
        case "boolean":
          return [...s, o];
        case "bigint":
          return [...s, "integer"];
        case "object":
          if (i._def.value === null)
            return [...s, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return s;
      }
    }, []);
    if (r.length === n.length) {
      const s = r.filter((i, o, a) => a.indexOf(i) === o);
      return {
        type: s.length > 1 ? s : s[0],
        enum: n.reduce((i, o) => i.includes(o._def.value) ? i : [...i, o._def.value], [])
      };
    }
  } else if (n.every((r) => r._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: n.reduce((r, s) => [
        ...r,
        ...s._def.values.filter((i) => !r.includes(i))
      ], [])
    };
  return ds(t, e);
}
const ds = (t, e) => {
  const n = (t.options instanceof Map ? Array.from(t.options.values()) : t.options).map((r, s) => B(r._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", `${s}`]
  })).filter((r) => !!r && (!e.strictUnions || typeof r == "object" && Object.keys(r).length > 0));
  return n.length ? { anyOf: n } : void 0;
};
function Ah(t, e) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(t.innerType._def.typeName) && (!t.innerType._def.checks || !t.innerType._def.checks.length))
    return e.target === "openApi3" ? {
      type: rn[t.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        rn[t.innerType._def.typeName],
        "null"
      ]
    };
  if (e.target === "openApi3") {
    const r = B(t.innerType._def, {
      ...e,
      currentPath: [...e.currentPath]
    });
    return r && "$ref" in r ? { allOf: [r], nullable: !0 } : r && { ...r, nullable: !0 };
  }
  const n = B(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "0"]
  });
  return n && { anyOf: [n, { type: "null" }] };
}
function Zh(t, e) {
  const n = {
    type: "number"
  };
  if (!t.checks)
    return n;
  for (const r of t.checks)
    switch (r.kind) {
      case "int":
        n.type = "integer", Bi(n, "type", r.message, e);
        break;
      case "min":
        e.target === "jsonSchema7" ? r.inclusive ? K(n, "minimum", r.value, r.message, e) : K(n, "exclusiveMinimum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMinimum = !0), K(n, "minimum", r.value, r.message, e));
        break;
      case "max":
        e.target === "jsonSchema7" ? r.inclusive ? K(n, "maximum", r.value, r.message, e) : K(n, "exclusiveMaximum", r.value, r.message, e) : (r.inclusive || (n.exclusiveMaximum = !0), K(n, "maximum", r.value, r.message, e));
        break;
      case "multipleOf":
        K(n, "multipleOf", r.value, r.message, e);
        break;
    }
  return n;
}
function jh(t, e) {
  const n = e.target === "openAi", r = {
    type: "object",
    properties: {}
  }, s = [], i = t.shape();
  for (const a in i) {
    let c = i[a];
    if (c === void 0 || c._def === void 0)
      continue;
    let u = Lh(c);
    u && n && (c._def.typeName === "ZodOptional" && (c = c._def.innerType), c.isNullable() || (c = c.nullable()), u = !1);
    const l = B(c._def, {
      ...e,
      currentPath: [...e.currentPath, "properties", a],
      propertyPath: [...e.currentPath, "properties", a]
    });
    l !== void 0 && (r.properties[a] = l, u || s.push(a));
  }
  s.length && (r.required = s);
  const o = Mh(t, e);
  return o !== void 0 && (r.additionalProperties = o), r;
}
function Mh(t, e) {
  if (t.catchall._def.typeName !== "ZodNever")
    return B(t.catchall._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalProperties"]
    });
  switch (t.unknownKeys) {
    case "passthrough":
      return e.allowedAdditionalProperties;
    case "strict":
      return e.rejectedAdditionalProperties;
    case "strip":
      return e.removeAdditionalStrategy === "strict" ? e.allowedAdditionalProperties : e.rejectedAdditionalProperties;
  }
}
function Lh(t) {
  try {
    return t.isOptional();
  } catch {
    return !0;
  }
}
const qh = (t, e) => {
  var r;
  if (e.currentPath.toString() === ((r = e.propertyPath) == null ? void 0 : r.toString()))
    return B(t.innerType._def, e);
  const n = B(t.innerType._def, {
    ...e,
    currentPath: [...e.currentPath, "anyOf", "1"]
  });
  return n ? {
    anyOf: [
      {
        not: ke(e)
      },
      n
    ]
  } : ke(e);
}, Dh = (t, e) => {
  if (e.pipeStrategy === "input")
    return B(t.in._def, e);
  if (e.pipeStrategy === "output")
    return B(t.out._def, e);
  const n = B(t.in._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", "0"]
  }), r = B(t.out._def, {
    ...e,
    currentPath: [...e.currentPath, "allOf", n ? "1" : "0"]
  });
  return {
    allOf: [n, r].filter((s) => s !== void 0)
  };
};
function Uh(t, e) {
  return B(t.type._def, e);
}
function Hh(t, e) {
  const r = {
    type: "array",
    uniqueItems: !0,
    items: B(t.valueType._def, {
      ...e,
      currentPath: [...e.currentPath, "items"]
    })
  };
  return t.minSize && K(r, "minItems", t.minSize.value, t.minSize.message, e), t.maxSize && K(r, "maxItems", t.maxSize.value, t.maxSize.message, e), r;
}
function Fh(t, e) {
  return t.rest ? {
    type: "array",
    minItems: t.items.length,
    items: t.items.map((n, r) => B(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], []),
    additionalItems: B(t.rest._def, {
      ...e,
      currentPath: [...e.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: t.items.length,
    maxItems: t.items.length,
    items: t.items.map((n, r) => B(n._def, {
      ...e,
      currentPath: [...e.currentPath, "items", `${r}`]
    })).reduce((n, r) => r === void 0 ? n : [...n, r], [])
  };
}
function Vh(t) {
  return {
    not: ke(t)
  };
}
function Jh(t) {
  return ke(t);
}
const Wh = (t, e) => B(t.innerType._def, e), Bh = (t, e, n) => {
  switch (e) {
    case k.ZodString:
      return Qi(t, n);
    case k.ZodNumber:
      return Zh(t, n);
    case k.ZodObject:
      return jh(t, n);
    case k.ZodBigInt:
      return yh(t, n);
    case k.ZodBoolean:
      return vh();
    case k.ZodDate:
      return Yi(t, n);
    case k.ZodUndefined:
      return Vh(n);
    case k.ZodNull:
      return xh(n);
    case k.ZodArray:
      return _h(t, n);
    case k.ZodUnion:
    case k.ZodDiscriminatedUnion:
      return Ih(t, n);
    case k.ZodIntersection:
      return Rh(t, n);
    case k.ZodTuple:
      return Fh(t, n);
    case k.ZodRecord:
      return Xi(t, n);
    case k.ZodLiteral:
      return $h(t, n);
    case k.ZodEnum:
      return Th(t);
    case k.ZodNativeEnum:
      return Oh(t);
    case k.ZodNullable:
      return Ah(t, n);
    case k.ZodOptional:
      return qh(t, n);
    case k.ZodMap:
      return Nh(t, n);
    case k.ZodSet:
      return Hh(t, n);
    case k.ZodLazy:
      return () => t.getter()._def;
    case k.ZodPromise:
      return Uh(t, n);
    case k.ZodNaN:
    case k.ZodNever:
      return Ch(n);
    case k.ZodEffects:
      return Sh(t, n);
    case k.ZodAny:
      return ke(n);
    case k.ZodUnknown:
      return Jh(n);
    case k.ZodDefault:
      return kh(t, n);
    case k.ZodBranded:
      return Ki(t, n);
    case k.ZodReadonly:
      return Wh(t, n);
    case k.ZodCatch:
      return bh(t, n);
    case k.ZodPipeline:
      return Dh(t, n);
    case k.ZodFunction:
    case k.ZodVoid:
    case k.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((r) => {
      })();
  }
};
function B(t, e, n = !1) {
  var a;
  const r = e.seen.get(t);
  if (e.override) {
    const c = (a = e.override) == null ? void 0 : a.call(e, t, e, r, n);
    if (c !== ph)
      return c;
  }
  if (r && !n) {
    const c = Gh(r, e);
    if (c !== void 0)
      return c;
  }
  const s = { def: t, path: e.currentPath, jsonSchema: void 0 };
  e.seen.set(t, s);
  const i = Bh(t, t.typeName, e), o = typeof i == "function" ? B(i(), e) : i;
  if (o && Kh(t, e, o), e.postProcess) {
    const c = e.postProcess(o, t, e);
    return s.jsonSchema = o, c;
  }
  return s.jsonSchema = o, o;
}
const Gh = (t, e) => {
  switch (e.$refStrategy) {
    case "root":
      return { $ref: t.path.join("/") };
    case "relative":
      return { $ref: Gi(e.currentPath, t.path) };
    case "none":
    case "seen":
      return t.path.length < e.currentPath.length && t.path.every((n, r) => e.currentPath[r] === n) ? (console.warn(`Recursive reference detected at ${e.currentPath.join("/")}! Defaulting to any`), ke(e)) : e.$refStrategy === "seen" ? ke(e) : void 0;
  }
}, Kh = (t, e, n) => (t.description && (n.description = t.description, e.markdownDescription && (n.markdownDescription = t.description)), n), Yh = (t, e) => {
  const n = gh(e);
  let r = typeof e == "object" && e.definitions ? Object.entries(e.definitions).reduce((c, [u, l]) => ({
    ...c,
    [u]: B(l._def, {
      ...n,
      currentPath: [...n.basePath, n.definitionPath, u]
    }, !0) ?? ke(n)
  }), {}) : void 0;
  const s = typeof e == "string" ? e : (e == null ? void 0 : e.nameStrategy) === "title" || e == null ? void 0 : e.name, i = B(t._def, s === void 0 ? n : {
    ...n,
    currentPath: [...n.basePath, n.definitionPath, s]
  }, !1) ?? ke(n), o = typeof e == "object" && e.name !== void 0 && e.nameStrategy === "title" ? e.name : void 0;
  o !== void 0 && (i.title = o), n.flags.hasReferencedOpenAiAnyType && (r || (r = {}), r[n.openAiAnyTypeName] || (r[n.openAiAnyTypeName] = {
    // Skipping "object" as no properties can be defined and additionalProperties must be "false"
    type: ["string", "number", "integer", "boolean", "array", "null"],
    items: {
      $ref: n.$refStrategy === "relative" ? "1" : [
        ...n.basePath,
        n.definitionPath,
        n.openAiAnyTypeName
      ].join("/")
    }
  }));
  const a = s === void 0 ? r ? {
    ...i,
    [n.definitionPath]: r
  } : i : {
    $ref: [
      ...n.$refStrategy === "relative" ? [] : n.basePath,
      n.definitionPath,
      s
    ].join("/"),
    [n.definitionPath]: {
      ...r,
      [s]: i
    }
  };
  return n.target === "jsonSchema7" ? a.$schema = "http://json-schema.org/draft-07/schema#" : (n.target === "jsonSchema2019-09" || n.target === "openAi") && (a.$schema = "https://json-schema.org/draft/2019-09/schema#"), n.target === "openAi" && ("anyOf" in a || "oneOf" in a || "allOf" in a || "type" in a && Array.isArray(a.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), a;
};
function Qh(t) {
  return !t || t === "jsonSchema7" || t === "draft-7" ? "draft-7" : t === "jsonSchema2019-09" || t === "draft-2020-12" ? "draft-2020-12" : "draft-7";
}
function fs(t, e) {
  return Ae(t) ? Nu(t, {
    target: Qh(e == null ? void 0 : e.target),
    io: (e == null ? void 0 : e.pipeStrategy) ?? "input"
  }) : Yh(t, {
    strictUnions: (e == null ? void 0 : e.strictUnions) ?? !0,
    pipeStrategy: (e == null ? void 0 : e.pipeStrategy) ?? "input"
  });
}
function hs(t) {
  const e = Ct(t), n = e == null ? void 0 : e.method;
  if (!n)
    throw new Error("Schema is missing a method literal");
  const r = Wi(n);
  if (typeof r != "string")
    throw new Error("Schema method literal must be a string");
  return r;
}
function ps(t, e) {
  const n = bt(t, e);
  if (!n.success)
    throw n.error;
  return n.data;
}
const Xh = 6e4;
class ep {
  constructor(e) {
    this._options = e, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this._pendingDebouncedNotifications = /* @__PURE__ */ new Set(), this._taskProgressTokens = /* @__PURE__ */ new Map(), this._requestResolvers = /* @__PURE__ */ new Map(), this.setNotificationHandler(ir, (n) => {
      this._oncancel(n);
    }), this.setNotificationHandler(ar, (n) => {
      this._onprogress(n);
    }), this.setRequestHandler(
      or,
      // Automatic pong by default.
      (n) => ({})
    ), this._taskStore = e == null ? void 0 : e.taskStore, this._taskMessageQueue = e == null ? void 0 : e.taskMessageQueue, this._taskStore && (this.setRequestHandler(cr, async (n, r) => {
      const s = await this._taskStore.getTask(n.params.taskId, r.sessionId);
      if (!s)
        throw new O(I.InvalidParams, "Failed to retrieve task: Task not found");
      return {
        ...s
      };
    }), this.setRequestHandler(lr, async (n, r) => {
      const s = async () => {
        var a;
        const i = n.params.taskId;
        if (this._taskMessageQueue) {
          let c;
          for (; c = await this._taskMessageQueue.dequeue(i, r.sessionId); ) {
            if (c.type === "response" || c.type === "error") {
              const u = c.message, l = u.id, d = this._requestResolvers.get(l);
              if (d)
                if (this._requestResolvers.delete(l), c.type === "response")
                  d(u);
                else {
                  const m = u, p = new O(m.error.code, m.error.message, m.error.data);
                  d(p);
                }
              else {
                const m = c.type === "response" ? "Response" : "Error";
                this._onerror(new Error(`${m} handler missing for request ${l}`));
              }
              continue;
            }
            await ((a = this._transport) == null ? void 0 : a.send(c.message, { relatedRequestId: r.requestId }));
          }
        }
        const o = await this._taskStore.getTask(i, r.sessionId);
        if (!o)
          throw new O(I.InvalidParams, `Task not found: ${i}`);
        if (!Ke(o.status))
          return await this._waitForTaskUpdate(i, r.signal), await s();
        if (Ke(o.status)) {
          const c = await this._taskStore.getTaskResult(i, r.sessionId);
          return this._clearTaskQueue(i), {
            ...c,
            _meta: {
              ...c._meta,
              [Ye]: {
                taskId: i
              }
            }
          };
        }
        return await s();
      };
      return await s();
    }), this.setRequestHandler(dr, async (n, r) => {
      var s;
      try {
        const { tasks: i, nextCursor: o } = await this._taskStore.listTasks((s = n.params) == null ? void 0 : s.cursor, r.sessionId);
        return {
          tasks: i,
          nextCursor: o,
          _meta: {}
        };
      } catch (i) {
        throw new O(I.InvalidParams, `Failed to list tasks: ${i instanceof Error ? i.message : String(i)}`);
      }
    }), this.setRequestHandler(hr, async (n, r) => {
      try {
        const s = await this._taskStore.getTask(n.params.taskId, r.sessionId);
        if (!s)
          throw new O(I.InvalidParams, `Task not found: ${n.params.taskId}`);
        if (Ke(s.status))
          throw new O(I.InvalidParams, `Cannot cancel task in terminal status: ${s.status}`);
        await this._taskStore.updateTaskStatus(n.params.taskId, "cancelled", "Client cancelled task execution.", r.sessionId), this._clearTaskQueue(n.params.taskId);
        const i = await this._taskStore.getTask(n.params.taskId, r.sessionId);
        if (!i)
          throw new O(I.InvalidParams, `Task not found after cancellation: ${n.params.taskId}`);
        return {
          _meta: {},
          ...i
        };
      } catch (s) {
        throw s instanceof O ? s : new O(I.InvalidRequest, `Failed to cancel task: ${s instanceof Error ? s.message : String(s)}`);
      }
    }));
  }
  async _oncancel(e) {
    if (!e.params.requestId)
      return;
    const n = this._requestHandlerAbortControllers.get(e.params.requestId);
    n == null || n.abort(e.params.reason);
  }
  _setupTimeout(e, n, r, s, i = !1) {
    this._timeoutInfo.set(e, {
      timeoutId: setTimeout(s, n),
      startTime: Date.now(),
      timeout: n,
      maxTotalTimeout: r,
      resetTimeoutOnProgress: i,
      onTimeout: s
    });
  }
  _resetTimeout(e) {
    const n = this._timeoutInfo.get(e);
    if (!n)
      return !1;
    const r = Date.now() - n.startTime;
    if (n.maxTotalTimeout && r >= n.maxTotalTimeout)
      throw this._timeoutInfo.delete(e), O.fromError(I.RequestTimeout, "Maximum total timeout exceeded", {
        maxTotalTimeout: n.maxTotalTimeout,
        totalElapsed: r
      });
    return clearTimeout(n.timeoutId), n.timeoutId = setTimeout(n.onTimeout, n.timeout), !0;
  }
  _cleanupTimeout(e) {
    const n = this._timeoutInfo.get(e);
    n && (clearTimeout(n.timeoutId), this._timeoutInfo.delete(e));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    var i, o, a;
    if (this._transport)
      throw new Error("Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.");
    this._transport = e;
    const n = (i = this.transport) == null ? void 0 : i.onclose;
    this._transport.onclose = () => {
      n == null || n(), this._onclose();
    };
    const r = (o = this.transport) == null ? void 0 : o.onerror;
    this._transport.onerror = (c) => {
      r == null || r(c), this._onerror(c);
    };
    const s = (a = this._transport) == null ? void 0 : a.onmessage;
    this._transport.onmessage = (c, u) => {
      s == null || s(c, u), Mt(c) || Bl(c) ? this._onresponse(c) : Vr(c) ? this._onrequest(c, u) : Wl(c) ? this._onnotification(c) : this._onerror(new Error(`Unknown message type: ${JSON.stringify(c)}`));
    }, await this._transport.start();
  }
  _onclose() {
    var r;
    const e = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._taskProgressTokens.clear(), this._pendingDebouncedNotifications.clear();
    for (const s of this._requestHandlerAbortControllers.values())
      s.abort();
    this._requestHandlerAbortControllers.clear();
    const n = O.fromError(I.ConnectionClosed, "Connection closed");
    this._transport = void 0, (r = this.onclose) == null || r.call(this);
    for (const s of e.values())
      s(n);
  }
  _onerror(e) {
    var n;
    (n = this.onerror) == null || n.call(this, e);
  }
  _onnotification(e) {
    const n = this._notificationHandlers.get(e.method) ?? this.fallbackNotificationHandler;
    n !== void 0 && Promise.resolve().then(() => n(e)).catch((r) => this._onerror(new Error(`Uncaught error in notification handler: ${r}`)));
  }
  _onrequest(e, n) {
    var l, d, m, p;
    const r = this._requestHandlers.get(e.method) ?? this.fallbackRequestHandler, s = this._transport, i = (m = (d = (l = e.params) == null ? void 0 : l._meta) == null ? void 0 : d[Ye]) == null ? void 0 : m.taskId;
    if (r === void 0) {
      const S = {
        jsonrpc: "2.0",
        id: e.id,
        error: {
          code: I.MethodNotFound,
          message: "Method not found"
        }
      };
      i && this._taskMessageQueue ? this._enqueueTaskMessage(i, {
        type: "error",
        message: S,
        timestamp: Date.now()
      }, s == null ? void 0 : s.sessionId).catch((T) => this._onerror(new Error(`Failed to enqueue error response: ${T}`))) : s == null || s.send(S).catch((T) => this._onerror(new Error(`Failed to send an error response: ${T}`)));
      return;
    }
    const o = new AbortController();
    this._requestHandlerAbortControllers.set(e.id, o);
    const a = Jl(e.params) ? e.params.task : void 0, c = this._taskStore ? this.requestTaskStore(e, s == null ? void 0 : s.sessionId) : void 0, u = {
      signal: o.signal,
      sessionId: s == null ? void 0 : s.sessionId,
      _meta: (p = e.params) == null ? void 0 : p._meta,
      sendNotification: async (S) => {
        if (o.signal.aborted)
          return;
        const T = { relatedRequestId: e.id };
        i && (T.relatedTask = { taskId: i }), await this.notification(S, T);
      },
      sendRequest: async (S, T, j) => {
        var A;
        if (o.signal.aborted)
          throw new O(I.ConnectionClosed, "Request was cancelled");
        const y = { ...j, relatedRequestId: e.id };
        i && !y.relatedTask && (y.relatedTask = { taskId: i });
        const v = ((A = y.relatedTask) == null ? void 0 : A.taskId) ?? i;
        return v && c && await c.updateTaskStatus(v, "input_required"), await this.request(S, T, y);
      },
      authInfo: n == null ? void 0 : n.authInfo,
      requestId: e.id,
      requestInfo: n == null ? void 0 : n.requestInfo,
      taskId: i,
      taskStore: c,
      taskRequestedTtl: a == null ? void 0 : a.ttl,
      closeSSEStream: n == null ? void 0 : n.closeSSEStream,
      closeStandaloneSSEStream: n == null ? void 0 : n.closeStandaloneSSEStream
    };
    Promise.resolve().then(() => {
      a && this.assertTaskHandlerCapability(e.method);
    }).then(() => r(e, u)).then(async (S) => {
      if (o.signal.aborted)
        return;
      const T = {
        result: S,
        jsonrpc: "2.0",
        id: e.id
      };
      i && this._taskMessageQueue ? await this._enqueueTaskMessage(i, {
        type: "response",
        message: T,
        timestamp: Date.now()
      }, s == null ? void 0 : s.sessionId) : await (s == null ? void 0 : s.send(T));
    }, async (S) => {
      if (o.signal.aborted)
        return;
      const T = {
        jsonrpc: "2.0",
        id: e.id,
        error: {
          code: Number.isSafeInteger(S.code) ? S.code : I.InternalError,
          message: S.message ?? "Internal error",
          ...S.data !== void 0 && { data: S.data }
        }
      };
      i && this._taskMessageQueue ? await this._enqueueTaskMessage(i, {
        type: "error",
        message: T,
        timestamp: Date.now()
      }, s == null ? void 0 : s.sessionId) : await (s == null ? void 0 : s.send(T));
    }).catch((S) => this._onerror(new Error(`Failed to send response: ${S}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(e.id);
    });
  }
  _onprogress(e) {
    const { progressToken: n, ...r } = e.params, s = Number(n), i = this._progressHandlers.get(s);
    if (!i) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(e)}`));
      return;
    }
    const o = this._responseHandlers.get(s), a = this._timeoutInfo.get(s);
    if (a && o && a.resetTimeoutOnProgress)
      try {
        this._resetTimeout(s);
      } catch (c) {
        this._responseHandlers.delete(s), this._progressHandlers.delete(s), this._cleanupTimeout(s), o(c);
        return;
      }
    i(r);
  }
  _onresponse(e) {
    const n = Number(e.id), r = this._requestResolvers.get(n);
    if (r) {
      if (this._requestResolvers.delete(n), Mt(e))
        r(e);
      else {
        const o = new O(e.error.code, e.error.message, e.error.data);
        r(o);
      }
      return;
    }
    const s = this._responseHandlers.get(n);
    if (s === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(e)}`));
      return;
    }
    this._responseHandlers.delete(n), this._cleanupTimeout(n);
    let i = !1;
    if (Mt(e) && e.result && typeof e.result == "object") {
      const o = e.result;
      if (o.task && typeof o.task == "object") {
        const a = o.task;
        typeof a.taskId == "string" && (i = !0, this._taskProgressTokens.set(a.taskId, n));
      }
    }
    if (i || this._progressHandlers.delete(n), Mt(e))
      s(e);
    else {
      const o = O.fromError(e.error.code, e.error.message, e.error.data);
      s(o);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    var e;
    await ((e = this._transport) == null ? void 0 : e.close());
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * @example
   * ```typescript
   * const stream = protocol.requestStream(request, resultSchema, options);
   * for await (const message of stream) {
   *   switch (message.type) {
   *     case 'taskCreated':
   *       console.log('Task created:', message.task.taskId);
   *       break;
   *     case 'taskStatus':
   *       console.log('Task status:', message.task.status);
   *       break;
   *     case 'result':
   *       console.log('Final result:', message.result);
   *       break;
   *     case 'error':
   *       console.error('Error:', message.error);
   *       break;
   *   }
   * }
   * ```
   *
   * @experimental Use `client.experimental.tasks.requestStream()` to access this method.
   */
  async *requestStream(e, n, r) {
    var o, a;
    const { task: s } = r ?? {};
    if (!s) {
      try {
        yield { type: "result", result: await this.request(e, n, r) };
      } catch (c) {
        yield {
          type: "error",
          error: c instanceof O ? c : new O(I.InternalError, String(c))
        };
      }
      return;
    }
    let i;
    try {
      const c = await this.request(e, mn, r);
      if (c.task)
        i = c.task.taskId, yield { type: "taskCreated", task: c.task };
      else
        throw new O(I.InternalError, "Task creation did not return a task");
      for (; ; ) {
        const u = await this.getTask({ taskId: i }, r);
        if (yield { type: "taskStatus", task: u }, Ke(u.status)) {
          u.status === "completed" ? yield { type: "result", result: await this.getTaskResult({ taskId: i }, n, r) } : u.status === "failed" ? yield {
            type: "error",
            error: new O(I.InternalError, `Task ${i} failed`)
          } : u.status === "cancelled" && (yield {
            type: "error",
            error: new O(I.InternalError, `Task ${i} was cancelled`)
          });
          return;
        }
        if (u.status === "input_required") {
          yield { type: "result", result: await this.getTaskResult({ taskId: i }, n, r) };
          return;
        }
        const l = u.pollInterval ?? ((o = this._options) == null ? void 0 : o.defaultTaskPollInterval) ?? 1e3;
        await new Promise((d) => setTimeout(d, l)), (a = r == null ? void 0 : r.signal) == null || a.throwIfAborted();
      }
    } catch (c) {
      yield {
        type: "error",
        error: c instanceof O ? c : new O(I.InternalError, String(c))
      };
    }
  }
  /**
   * Sends a request and waits for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(e, n, r) {
    const { relatedRequestId: s, resumptionToken: i, onresumptiontoken: o, task: a, relatedTask: c } = r ?? {};
    return new Promise((u, l) => {
      var v, A, z, te, ue;
      const d = (G) => {
        l(G);
      };
      if (!this._transport) {
        d(new Error("Not connected"));
        return;
      }
      if (((v = this._options) == null ? void 0 : v.enforceStrictCapabilities) === !0)
        try {
          this.assertCapabilityForMethod(e.method), a && this.assertTaskCapability(e.method);
        } catch (G) {
          d(G);
          return;
        }
      (A = r == null ? void 0 : r.signal) == null || A.throwIfAborted();
      const m = this._requestMessageId++, p = {
        ...e,
        jsonrpc: "2.0",
        id: m
      };
      r != null && r.onprogress && (this._progressHandlers.set(m, r.onprogress), p.params = {
        ...e.params,
        _meta: {
          ...((z = e.params) == null ? void 0 : z._meta) || {},
          progressToken: m
        }
      }), a && (p.params = {
        ...p.params,
        task: a
      }), c && (p.params = {
        ...p.params,
        _meta: {
          ...((te = p.params) == null ? void 0 : te._meta) || {},
          [Ye]: c
        }
      });
      const S = (G) => {
        var fe;
        this._responseHandlers.delete(m), this._progressHandlers.delete(m), this._cleanupTimeout(m), (fe = this._transport) == null || fe.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: m,
            reason: String(G)
          }
        }, { relatedRequestId: s, resumptionToken: i, onresumptiontoken: o }).catch((Je) => this._onerror(new Error(`Failed to send cancellation: ${Je}`)));
        const _e = G instanceof O ? G : new O(I.RequestTimeout, String(G));
        l(_e);
      };
      this._responseHandlers.set(m, (G) => {
        var _e;
        if (!((_e = r == null ? void 0 : r.signal) != null && _e.aborted)) {
          if (G instanceof Error)
            return l(G);
          try {
            const fe = bt(n, G.result);
            fe.success ? u(fe.data) : l(fe.error);
          } catch (fe) {
            l(fe);
          }
        }
      }), (ue = r == null ? void 0 : r.signal) == null || ue.addEventListener("abort", () => {
        var G;
        S((G = r == null ? void 0 : r.signal) == null ? void 0 : G.reason);
      });
      const T = (r == null ? void 0 : r.timeout) ?? Xh, j = () => S(O.fromError(I.RequestTimeout, "Request timed out", { timeout: T }));
      this._setupTimeout(m, T, r == null ? void 0 : r.maxTotalTimeout, j, (r == null ? void 0 : r.resetTimeoutOnProgress) ?? !1);
      const y = c == null ? void 0 : c.taskId;
      if (y) {
        const G = (_e) => {
          const fe = this._responseHandlers.get(m);
          fe ? fe(_e) : this._onerror(new Error(`Response handler missing for side-channeled request ${m}`));
        };
        this._requestResolvers.set(m, G), this._enqueueTaskMessage(y, {
          type: "request",
          message: p,
          timestamp: Date.now()
        }).catch((_e) => {
          this._cleanupTimeout(m), l(_e);
        });
      } else
        this._transport.send(p, { relatedRequestId: s, resumptionToken: i, onresumptiontoken: o }).catch((G) => {
          this._cleanupTimeout(m), l(G);
        });
    });
  }
  /**
   * Gets the current status of a task.
   *
   * @experimental Use `client.experimental.tasks.getTask()` to access this method.
   */
  async getTask(e, n) {
    return this.request({ method: "tasks/get", params: e }, ur, n);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @experimental Use `client.experimental.tasks.getTaskResult()` to access this method.
   */
  async getTaskResult(e, n, r) {
    return this.request({ method: "tasks/result", params: e }, n, r);
  }
  /**
   * Lists tasks, optionally starting from a pagination cursor.
   *
   * @experimental Use `client.experimental.tasks.listTasks()` to access this method.
   */
  async listTasks(e, n) {
    return this.request({ method: "tasks/list", params: e }, fr, n);
  }
  /**
   * Cancels a specific task.
   *
   * @experimental Use `client.experimental.tasks.cancelTask()` to access this method.
   */
  async cancelTask(e, n) {
    return this.request({ method: "tasks/cancel", params: e }, dd, n);
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(e, n) {
    var a, c, u, l;
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(e.method);
    const r = (a = n == null ? void 0 : n.relatedTask) == null ? void 0 : a.taskId;
    if (r) {
      const d = {
        ...e,
        jsonrpc: "2.0",
        params: {
          ...e.params,
          _meta: {
            ...((c = e.params) == null ? void 0 : c._meta) || {},
            [Ye]: n.relatedTask
          }
        }
      };
      await this._enqueueTaskMessage(r, {
        type: "notification",
        message: d,
        timestamp: Date.now()
      });
      return;
    }
    if ((((u = this._options) == null ? void 0 : u.debouncedNotificationMethods) ?? []).includes(e.method) && !e.params && !(n != null && n.relatedRequestId) && !(n != null && n.relatedTask)) {
      if (this._pendingDebouncedNotifications.has(e.method))
        return;
      this._pendingDebouncedNotifications.add(e.method), Promise.resolve().then(() => {
        var m, p;
        if (this._pendingDebouncedNotifications.delete(e.method), !this._transport)
          return;
        let d = {
          ...e,
          jsonrpc: "2.0"
        };
        n != null && n.relatedTask && (d = {
          ...d,
          params: {
            ...d.params,
            _meta: {
              ...((m = d.params) == null ? void 0 : m._meta) || {},
              [Ye]: n.relatedTask
            }
          }
        }), (p = this._transport) == null || p.send(d, n).catch((S) => this._onerror(S));
      });
      return;
    }
    let o = {
      ...e,
      jsonrpc: "2.0"
    };
    n != null && n.relatedTask && (o = {
      ...o,
      params: {
        ...o.params,
        _meta: {
          ...((l = o.params) == null ? void 0 : l._meta) || {},
          [Ye]: n.relatedTask
        }
      }
    }), await this._transport.send(o, n);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(e, n) {
    const r = hs(e);
    this.assertRequestHandlerCapability(r), this._requestHandlers.set(r, (s, i) => {
      const o = ps(e, s);
      return Promise.resolve(n(o, i));
    });
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(e) {
    this._requestHandlers.delete(e);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(e) {
    if (this._requestHandlers.has(e))
      throw new Error(`A request handler for ${e} already exists, which would be overridden`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(e, n) {
    const r = hs(e);
    this._notificationHandlers.set(r, (s) => {
      const i = ps(e, s);
      return Promise.resolve(n(i));
    });
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(e) {
    this._notificationHandlers.delete(e);
  }
  /**
   * Cleans up the progress handler associated with a task.
   * This should be called when a task reaches a terminal status.
   */
  _cleanupTaskProgressHandler(e) {
    const n = this._taskProgressTokens.get(e);
    n !== void 0 && (this._progressHandlers.delete(n), this._taskProgressTokens.delete(e));
  }
  /**
   * Enqueues a task-related message for side-channel delivery via tasks/result.
   * @param taskId The task ID to associate the message with
   * @param message The message to enqueue
   * @param sessionId Optional session ID for binding the operation to a specific session
   * @throws Error if taskStore is not configured or if enqueue fails (e.g., queue overflow)
   *
   * Note: If enqueue fails, it's the TaskMessageQueue implementation's responsibility to handle
   * the error appropriately (e.g., by failing the task, logging, etc.). The Protocol layer
   * simply propagates the error.
   */
  async _enqueueTaskMessage(e, n, r) {
    var i;
    if (!this._taskStore || !this._taskMessageQueue)
      throw new Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
    const s = (i = this._options) == null ? void 0 : i.maxTaskQueueSize;
    await this._taskMessageQueue.enqueue(e, n, r, s);
  }
  /**
   * Clears the message queue for a task and rejects any pending request resolvers.
   * @param taskId The task ID whose queue should be cleared
   * @param sessionId Optional session ID for binding the operation to a specific session
   */
  async _clearTaskQueue(e, n) {
    if (this._taskMessageQueue) {
      const r = await this._taskMessageQueue.dequeueAll(e, n);
      for (const s of r)
        if (s.type === "request" && Vr(s.message)) {
          const i = s.message.id, o = this._requestResolvers.get(i);
          o ? (o(new O(I.InternalError, "Task cancelled or completed")), this._requestResolvers.delete(i)) : this._onerror(new Error(`Resolver missing for request ${i} during task ${e} cleanup`));
        }
    }
  }
  /**
   * Waits for a task update (new messages or status change) with abort signal support.
   * Uses polling to check for updates at the task's configured poll interval.
   * @param taskId The task ID to wait for
   * @param signal Abort signal to cancel the wait
   * @returns Promise that resolves when an update occurs or rejects if aborted
   */
  async _waitForTaskUpdate(e, n) {
    var s, i;
    let r = ((s = this._options) == null ? void 0 : s.defaultTaskPollInterval) ?? 1e3;
    try {
      const o = await ((i = this._taskStore) == null ? void 0 : i.getTask(e));
      o != null && o.pollInterval && (r = o.pollInterval);
    } catch {
    }
    return new Promise((o, a) => {
      if (n.aborted) {
        a(new O(I.InvalidRequest, "Request cancelled"));
        return;
      }
      const c = setTimeout(o, r);
      n.addEventListener("abort", () => {
        clearTimeout(c), a(new O(I.InvalidRequest, "Request cancelled"));
      }, { once: !0 });
    });
  }
  requestTaskStore(e, n) {
    const r = this._taskStore;
    if (!r)
      throw new Error("No task store configured");
    return {
      createTask: async (s) => {
        if (!e)
          throw new Error("No request provided");
        return await r.createTask(s, e.id, {
          method: e.method,
          params: e.params
        }, n);
      },
      getTask: async (s) => {
        const i = await r.getTask(s, n);
        if (!i)
          throw new O(I.InvalidParams, "Failed to retrieve task: Task not found");
        return i;
      },
      storeTaskResult: async (s, i, o) => {
        await r.storeTaskResult(s, i, o, n);
        const a = await r.getTask(s, n);
        if (a) {
          const c = Jt.parse({
            method: "notifications/tasks/status",
            params: a
          });
          await this.notification(c), Ke(a.status) && this._cleanupTaskProgressHandler(s);
        }
      },
      getTaskResult: (s) => r.getTaskResult(s, n),
      updateTaskStatus: async (s, i, o) => {
        const a = await r.getTask(s, n);
        if (!a)
          throw new O(I.InvalidParams, `Task "${s}" not found - it may have been cleaned up`);
        if (Ke(a.status))
          throw new O(I.InvalidParams, `Cannot update task "${s}" from terminal status "${a.status}" to "${i}". Terminal states (completed, failed, cancelled) cannot transition to other states.`);
        await r.updateTaskStatus(s, i, o, n);
        const c = await r.getTask(s, n);
        if (c) {
          const u = Jt.parse({
            method: "notifications/tasks/status",
            params: c
          });
          await this.notification(u), Ke(c.status) && this._cleanupTaskProgressHandler(s);
        }
      },
      listTasks: (s) => r.listTasks(s, n)
    };
  }
}
function ms(t) {
  return t !== null && typeof t == "object" && !Array.isArray(t);
}
function tp(t, e) {
  const n = { ...t };
  for (const r in e) {
    const s = r, i = e[s];
    if (i === void 0)
      continue;
    const o = n[s];
    ms(o) && ms(i) ? n[s] = { ...o, ...i } : n[s] = i;
  }
  return n;
}
function np(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Un = { exports: {} }, eo = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.formatNames = t.fastFormats = t.fullFormats = void 0;
  function e(Z, D) {
    return { validate: Z, compare: D };
  }
  t.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: e(i, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: e(c(!0), u),
    "date-time": e(m(!0), p),
    "iso-time": e(c(), l),
    "iso-date-time": e(m(), S),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: y,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Je,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: A,
    // signed 32 bit integer
    int32: { type: "number", validate: ue },
    // signed 64 bit integer
    int64: { type: "number", validate: G },
    // C-type float
    float: { type: "number", validate: _e },
    // C-type double
    double: { type: "number", validate: _e },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, t.fastFormats = {
    ...t.fullFormats,
    date: e(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, u),
    "date-time": e(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, p),
    "iso-time": e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": e(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, S),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, t.formatNames = Object.keys(t.fullFormats);
  function n(Z) {
    return Z % 4 === 0 && (Z % 100 !== 0 || Z % 400 === 0);
  }
  const r = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function i(Z) {
    const D = r.exec(Z);
    if (!D)
      return !1;
    const ae = +D[1], U = +D[2], Te = +D[3];
    return U >= 1 && U <= 12 && Te >= 1 && Te <= (U === 2 && n(ae) ? 29 : s[U]);
  }
  function o(Z, D) {
    if (Z && D)
      return Z > D ? 1 : Z < D ? -1 : 0;
  }
  const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(Z) {
    return function(ae) {
      const U = a.exec(ae);
      if (!U)
        return !1;
      const Te = +U[1], We = +U[2], Be = +U[3], gn = U[4], xt = U[5] === "-" ? -1 : 1, It = +(U[6] || 0), pt = +(U[7] || 0);
      if (It > 23 || pt > 59 || Z && !gn)
        return !1;
      if (Te <= 23 && We <= 59 && Be < 60)
        return !0;
      const Ge = We - pt * xt, x = Te - It * xt - (Ge < 0 ? 1 : 0);
      return (x === 23 || x === -1) && (Ge === 59 || Ge === -1) && Be < 61;
    };
  }
  function u(Z, D) {
    if (!(Z && D))
      return;
    const ae = (/* @__PURE__ */ new Date("2020-01-01T" + Z)).valueOf(), U = (/* @__PURE__ */ new Date("2020-01-01T" + D)).valueOf();
    if (ae && U)
      return ae - U;
  }
  function l(Z, D) {
    if (!(Z && D))
      return;
    const ae = a.exec(Z), U = a.exec(D);
    if (ae && U)
      return Z = ae[1] + ae[2] + ae[3], D = U[1] + U[2] + U[3], Z > D ? 1 : Z < D ? -1 : 0;
  }
  const d = /t|\s/i;
  function m(Z) {
    const D = c(Z);
    return function(U) {
      const Te = U.split(d);
      return Te.length === 2 && i(Te[0]) && D(Te[1]);
    };
  }
  function p(Z, D) {
    if (!(Z && D))
      return;
    const ae = new Date(Z).valueOf(), U = new Date(D).valueOf();
    if (ae && U)
      return ae - U;
  }
  function S(Z, D) {
    if (!(Z && D))
      return;
    const [ae, U] = Z.split(d), [Te, We] = D.split(d), Be = o(ae, Te);
    if (Be !== void 0)
      return Be || u(U, We);
  }
  const T = /\/|:/, j = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function y(Z) {
    return T.test(Z) && j.test(Z);
  }
  const v = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function A(Z) {
    return v.lastIndex = 0, v.test(Z);
  }
  const z = -2147483648, te = 2 ** 31 - 1;
  function ue(Z) {
    return Number.isInteger(Z) && Z <= te && Z >= z;
  }
  function G(Z) {
    return Number.isInteger(Z);
  }
  function _e() {
    return !0;
  }
  const fe = /[^\\]\\Z/;
  function Je(Z) {
    if (fe.test(Z))
      return !1;
    try {
      return new RegExp(Z), !0;
    } catch {
      return !1;
    }
  }
})(eo);
var to = {}, Sr = {}, sn = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
  class e {
  }
  t._CodeOrName = e, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends e {
    constructor(v) {
      if (super(), !t.IDENTIFIER.test(v))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  t.Name = n;
  class r extends e {
    constructor(v) {
      super(), this._items = typeof v == "string" ? [v] : v;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const v = this._items[0];
      return v === "" || v === '""';
    }
    get str() {
      var v;
      return (v = this._str) !== null && v !== void 0 ? v : this._str = this._items.reduce((A, z) => `${A}${z}`, "");
    }
    get names() {
      var v;
      return (v = this._names) !== null && v !== void 0 ? v : this._names = this._items.reduce((A, z) => (z instanceof n && (A[z.str] = (A[z.str] || 0) + 1), A), {});
    }
  }
  t._Code = r, t.nil = new r("");
  function s(y, ...v) {
    const A = [y[0]];
    let z = 0;
    for (; z < v.length; )
      a(A, v[z]), A.push(y[++z]);
    return new r(A);
  }
  t._ = s;
  const i = new r("+");
  function o(y, ...v) {
    const A = [p(y[0])];
    let z = 0;
    for (; z < v.length; )
      A.push(i), a(A, v[z]), A.push(i, p(y[++z]));
    return c(A), new r(A);
  }
  t.str = o;
  function a(y, v) {
    v instanceof r ? y.push(...v._items) : v instanceof n ? y.push(v) : y.push(d(v));
  }
  t.addCodeArg = a;
  function c(y) {
    let v = 1;
    for (; v < y.length - 1; ) {
      if (y[v] === i) {
        const A = u(y[v - 1], y[v + 1]);
        if (A !== void 0) {
          y.splice(v - 1, 3, A);
          continue;
        }
        y[v++] = "+";
      }
      v++;
    }
  }
  function u(y, v) {
    if (v === '""')
      return y;
    if (y === '""')
      return v;
    if (typeof y == "string")
      return v instanceof n || y[y.length - 1] !== '"' ? void 0 : typeof v != "string" ? `${y.slice(0, -1)}${v}"` : v[0] === '"' ? y.slice(0, -1) + v.slice(1) : void 0;
    if (typeof v == "string" && v[0] === '"' && !(y instanceof n))
      return `"${y}${v.slice(1)}`;
  }
  function l(y, v) {
    return v.emptyStr() ? y : y.emptyStr() ? v : o`${y}${v}`;
  }
  t.strConcat = l;
  function d(y) {
    return typeof y == "number" || typeof y == "boolean" || y === null ? y : p(Array.isArray(y) ? y.join(",") : y);
  }
  function m(y) {
    return new r(p(y));
  }
  t.stringify = m;
  function p(y) {
    return JSON.stringify(y).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  t.safeStringify = p;
  function S(y) {
    return typeof y == "string" && t.IDENTIFIER.test(y) ? new r(`.${y}`) : s`[${y}]`;
  }
  t.getProperty = S;
  function T(y) {
    if (typeof y == "string" && t.IDENTIFIER.test(y))
      return new r(`${y}`);
    throw new Error(`CodeGen: invalid export name: ${y}, use explicit $id name mapping`);
  }
  t.getEsmExportName = T;
  function j(y) {
    return new r(y.toString());
  }
  t.regexpCode = j;
})(sn);
var Hn = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
  const e = sn;
  class n extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var r;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(r = t.UsedValueState || (t.UsedValueState = {})), t.varKinds = {
    const: new e.Name("const"),
    let: new e.Name("let"),
    var: new e.Name("var")
  };
  class s {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof e.Name ? u : this.name(u);
    }
    name(u) {
      return new e.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, d;
      if (!((d = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || d === void 0) && d.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  t.Scope = s;
  class i extends e.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: d }) {
      this.value = u, this.scopePath = (0, e._)`.${new e.Name(l)}[${d}]`;
    }
  }
  t.ValueScopeName = i;
  const o = (0, e._)`\n`;
  class a extends s {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : e.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new i(u, this._newName(u));
    }
    value(u, l) {
      var d;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const m = this.toName(u), { prefix: p } = m, S = (d = l.key) !== null && d !== void 0 ? d : l.ref;
      let T = this._values[p];
      if (T) {
        const v = T.get(S);
        if (v)
          return v;
      } else
        T = this._values[p] = /* @__PURE__ */ new Map();
      T.set(S, m);
      const j = this._scope[p] || (this._scope[p] = []), y = j.length;
      return j[y] = l.ref, m.setValue(l, { property: p, itemIndex: y }), m;
    }
    getValue(u, l) {
      const d = this._values[u];
      if (d)
        return d.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (d) => {
        if (d.scopePath === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return (0, e._)`${u}${d.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, d) {
      return this._reduceValues(u, (m) => {
        if (m.value === void 0)
          throw new Error(`CodeGen: name "${m}" has no value`);
        return m.value.code;
      }, l, d);
    }
    _reduceValues(u, l, d = {}, m) {
      let p = e.nil;
      for (const S in u) {
        const T = u[S];
        if (!T)
          continue;
        const j = d[S] = d[S] || /* @__PURE__ */ new Map();
        T.forEach((y) => {
          if (j.has(y))
            return;
          j.set(y, r.Started);
          let v = l(y);
          if (v) {
            const A = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
            p = (0, e._)`${p}${A} ${y} = ${v};${this.opts._n}`;
          } else if (v = m == null ? void 0 : m(y))
            p = (0, e._)`${p}${v}${this.opts._n}`;
          else
            throw new n(y);
          j.set(y, r.Completed);
        });
      }
      return p;
    }
  }
  t.ValueScope = a;
})(Hn);
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
  const e = sn, n = Hn;
  var r = sn;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(t, "strConcat", { enumerable: !0, get: function() {
    return r.strConcat;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(t, "getProperty", { enumerable: !0, get: function() {
    return r.getProperty;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(t, "regexpCode", { enumerable: !0, get: function() {
    return r.regexpCode;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } });
  var s = Hn;
  Object.defineProperty(t, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(t, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(t, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(t, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), t.operators = {
    GT: new e._Code(">"),
    GTE: new e._Code(">="),
    LT: new e._Code("<"),
    LTE: new e._Code("<="),
    EQ: new e._Code("==="),
    NEQ: new e._Code("!=="),
    NOT: new e._Code("!"),
    OR: new e._Code("||"),
    AND: new e._Code("&&"),
    ADD: new e._Code("+")
  };
  class i {
    optimizeNodes() {
      return this;
    }
    optimizeNames(f, h) {
      return this;
    }
  }
  class o extends i {
    constructor(f, h, b) {
      super(), this.varKind = f, this.name = h, this.rhs = b;
    }
    render({ es5: f, _n: h }) {
      const b = f ? n.varKinds.var : this.varKind, q = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${q};` + h;
    }
    optimizeNames(f, h) {
      if (f[this.name.str])
        return this.rhs && (this.rhs = U(this.rhs, f, h)), this;
    }
    get names() {
      return this.rhs instanceof e._CodeOrName ? this.rhs.names : {};
    }
  }
  class a extends i {
    constructor(f, h, b) {
      super(), this.lhs = f, this.rhs = h, this.sideEffects = b;
    }
    render({ _n: f }) {
      return `${this.lhs} = ${this.rhs};` + f;
    }
    optimizeNames(f, h) {
      if (!(this.lhs instanceof e.Name && !f[this.lhs.str] && !this.sideEffects))
        return this.rhs = U(this.rhs, f, h), this;
    }
    get names() {
      const f = this.lhs instanceof e.Name ? {} : { ...this.lhs.names };
      return ae(f, this.rhs);
    }
  }
  class c extends a {
    constructor(f, h, b, q) {
      super(f, b, q), this.op = h;
    }
    render({ _n: f }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + f;
    }
  }
  class u extends i {
    constructor(f) {
      super(), this.label = f, this.names = {};
    }
    render({ _n: f }) {
      return `${this.label}:` + f;
    }
  }
  class l extends i {
    constructor(f) {
      super(), this.label = f, this.names = {};
    }
    render({ _n: f }) {
      return `break${this.label ? ` ${this.label}` : ""};` + f;
    }
  }
  class d extends i {
    constructor(f) {
      super(), this.error = f;
    }
    render({ _n: f }) {
      return `throw ${this.error};` + f;
    }
    get names() {
      return this.error.names;
    }
  }
  class m extends i {
    constructor(f) {
      super(), this.code = f;
    }
    render({ _n: f }) {
      return `${this.code};` + f;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(f, h) {
      return this.code = U(this.code, f, h), this;
    }
    get names() {
      return this.code instanceof e._CodeOrName ? this.code.names : {};
    }
  }
  class p extends i {
    constructor(f = []) {
      super(), this.nodes = f;
    }
    render(f) {
      return this.nodes.reduce((h, b) => h + b.render(f), "");
    }
    optimizeNodes() {
      const { nodes: f } = this;
      let h = f.length;
      for (; h--; ) {
        const b = f[h].optimizeNodes();
        Array.isArray(b) ? f.splice(h, 1, ...b) : b ? f[h] = b : f.splice(h, 1);
      }
      return f.length > 0 ? this : void 0;
    }
    optimizeNames(f, h) {
      const { nodes: b } = this;
      let q = b.length;
      for (; q--; ) {
        const V = b[q];
        V.optimizeNames(f, h) || (Te(f, V.names), b.splice(q, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((f, h) => D(f, h.names), {});
    }
  }
  class S extends p {
    render(f) {
      return "{" + f._n + super.render(f) + "}" + f._n;
    }
  }
  class T extends p {
  }
  class j extends S {
  }
  j.kind = "else";
  class y extends S {
    constructor(f, h) {
      super(h), this.condition = f;
    }
    render(f) {
      let h = `if(${this.condition})` + super.render(f);
      return this.else && (h += "else " + this.else.render(f)), h;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const f = this.condition;
      if (f === !0)
        return this.nodes;
      let h = this.else;
      if (h) {
        const b = h.optimizeNodes();
        h = this.else = Array.isArray(b) ? new j(b) : b;
      }
      if (h)
        return f === !1 ? h instanceof y ? h : h.nodes : this.nodes.length ? this : new y(We(f), h instanceof y ? [h] : h.nodes);
      if (!(f === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(f, h) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(f, h), !!(super.optimizeNames(f, h) || this.else))
        return this.condition = U(this.condition, f, h), this;
    }
    get names() {
      const f = super.names;
      return ae(f, this.condition), this.else && D(f, this.else.names), f;
    }
  }
  y.kind = "if";
  class v extends S {
  }
  v.kind = "for";
  class A extends v {
    constructor(f) {
      super(), this.iteration = f;
    }
    render(f) {
      return `for(${this.iteration})` + super.render(f);
    }
    optimizeNames(f, h) {
      if (super.optimizeNames(f, h))
        return this.iteration = U(this.iteration, f, h), this;
    }
    get names() {
      return D(super.names, this.iteration.names);
    }
  }
  class z extends v {
    constructor(f, h, b, q) {
      super(), this.varKind = f, this.name = h, this.from = b, this.to = q;
    }
    render(f) {
      const h = f.es5 ? n.varKinds.var : this.varKind, { name: b, from: q, to: V } = this;
      return `for(${h} ${b}=${q}; ${b}<${V}; ${b}++)` + super.render(f);
    }
    get names() {
      const f = ae(super.names, this.from);
      return ae(f, this.to);
    }
  }
  class te extends v {
    constructor(f, h, b, q) {
      super(), this.loop = f, this.varKind = h, this.name = b, this.iterable = q;
    }
    render(f) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(f);
    }
    optimizeNames(f, h) {
      if (super.optimizeNames(f, h))
        return this.iterable = U(this.iterable, f, h), this;
    }
    get names() {
      return D(super.names, this.iterable.names);
    }
  }
  class ue extends S {
    constructor(f, h, b) {
      super(), this.name = f, this.args = h, this.async = b;
    }
    render(f) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(f);
    }
  }
  ue.kind = "func";
  class G extends p {
    render(f) {
      return "return " + super.render(f);
    }
  }
  G.kind = "return";
  class _e extends S {
    render(f) {
      let h = "try" + super.render(f);
      return this.catch && (h += this.catch.render(f)), this.finally && (h += this.finally.render(f)), h;
    }
    optimizeNodes() {
      var f, h;
      return super.optimizeNodes(), (f = this.catch) === null || f === void 0 || f.optimizeNodes(), (h = this.finally) === null || h === void 0 || h.optimizeNodes(), this;
    }
    optimizeNames(f, h) {
      var b, q;
      return super.optimizeNames(f, h), (b = this.catch) === null || b === void 0 || b.optimizeNames(f, h), (q = this.finally) === null || q === void 0 || q.optimizeNames(f, h), this;
    }
    get names() {
      const f = super.names;
      return this.catch && D(f, this.catch.names), this.finally && D(f, this.finally.names), f;
    }
  }
  class fe extends S {
    constructor(f) {
      super(), this.error = f;
    }
    render(f) {
      return `catch(${this.error})` + super.render(f);
    }
  }
  fe.kind = "catch";
  class Je extends S {
    render(f) {
      return "finally" + super.render(f);
    }
  }
  Je.kind = "finally";
  class Z {
    constructor(f, h = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...h, _n: h.lines ? `
` : "" }, this._extScope = f, this._scope = new n.Scope({ parent: f }), this._nodes = [new T()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(f) {
      return this._scope.name(f);
    }
    // reserves unique name in the external scope
    scopeName(f) {
      return this._extScope.name(f);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(f, h) {
      const b = this._extScope.value(f, h);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(f, h) {
      return this._extScope.getValue(f, h);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(f) {
      return this._extScope.scopeRefs(f, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(f, h, b, q) {
      const V = this._scope.toName(h);
      return b !== void 0 && q && (this._constants[V.str] = b), this._leafNode(new o(f, V, b)), V;
    }
    // `const` declaration (`var` in es5 mode)
    const(f, h, b) {
      return this._def(n.varKinds.const, f, h, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(f, h, b) {
      return this._def(n.varKinds.let, f, h, b);
    }
    // `var` declaration with optional assignment
    var(f, h, b) {
      return this._def(n.varKinds.var, f, h, b);
    }
    // assignment code
    assign(f, h, b) {
      return this._leafNode(new a(f, h, b));
    }
    // `+=` code
    add(f, h) {
      return this._leafNode(new c(f, t.operators.ADD, h));
    }
    // appends passed SafeExpr to code or executes Block
    code(f) {
      return typeof f == "function" ? f() : f !== e.nil && this._leafNode(new m(f)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...f) {
      const h = ["{"];
      for (const [b, q] of f)
        h.length > 1 && h.push(","), h.push(b), (b !== q || this.opts.es5) && (h.push(":"), (0, e.addCodeArg)(h, q));
      return h.push("}"), new e._Code(h);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(f, h, b) {
      if (this._blockNode(new y(f)), h && b)
        this.code(h).else().code(b).endIf();
      else if (h)
        this.code(h).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(f) {
      return this._elseNode(new y(f));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new j());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(y, j);
    }
    _for(f, h) {
      return this._blockNode(f), h && this.code(h).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(f, h) {
      return this._for(new A(f), h);
    }
    // `for` statement for a range of values
    forRange(f, h, b, q, V = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const de = this._scope.toName(f);
      return this._for(new z(V, de, h, b), () => q(de));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(f, h, b, q = n.varKinds.const) {
      const V = this._scope.toName(f);
      if (this.opts.es5) {
        const de = h instanceof e.Name ? h : this.var("_arr", h);
        return this.forRange("_i", 0, (0, e._)`${de}.length`, (so) => {
          this.var(V, (0, e._)`${de}[${so}]`), b(V);
        });
      }
      return this._for(new te("of", q, V, h), () => b(V));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(f, h, b, q = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(f, (0, e._)`Object.keys(${h})`, b);
      const V = this._scope.toName(f);
      return this._for(new te("in", q, V, h), () => b(V));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(v);
    }
    // `label` statement
    label(f) {
      return this._leafNode(new u(f));
    }
    // `break` statement
    break(f) {
      return this._leafNode(new l(f));
    }
    // `return` statement
    return(f) {
      const h = new G();
      if (this._blockNode(h), this.code(f), h.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(G);
    }
    // `try` statement
    try(f, h, b) {
      if (!h && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const q = new _e();
      if (this._blockNode(q), this.code(f), h) {
        const V = this.name("e");
        this._currNode = q.catch = new fe(V), h(V);
      }
      return b && (this._currNode = q.finally = new Je(), this.code(b)), this._endBlockNode(fe, Je);
    }
    // `throw` statement
    throw(f) {
      return this._leafNode(new d(f));
    }
    // start self-balancing block
    block(f, h) {
      return this._blockStarts.push(this._nodes.length), f && this.code(f).endBlock(h), this;
    }
    // end the current self-balancing block
    endBlock(f) {
      const h = this._blockStarts.pop();
      if (h === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - h;
      if (b < 0 || f !== void 0 && b !== f)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${f} expected`);
      return this._nodes.length = h, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(f, h = e.nil, b, q) {
      return this._blockNode(new ue(f, h, b)), q && this.code(q).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(ue);
    }
    optimize(f = 1) {
      for (; f-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(f) {
      return this._currNode.nodes.push(f), this;
    }
    _blockNode(f) {
      this._currNode.nodes.push(f), this._nodes.push(f);
    }
    _endBlockNode(f, h) {
      const b = this._currNode;
      if (b instanceof f || h && b instanceof h)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${h ? `${f.kind}/${h.kind}` : f.kind}"`);
    }
    _elseNode(f) {
      const h = this._currNode;
      if (!(h instanceof y))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = h.else = f, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const f = this._nodes;
      return f[f.length - 1];
    }
    set _currNode(f) {
      const h = this._nodes;
      h[h.length - 1] = f;
    }
  }
  t.CodeGen = Z;
  function D(x, f) {
    for (const h in f)
      x[h] = (x[h] || 0) + (f[h] || 0);
    return x;
  }
  function ae(x, f) {
    return f instanceof e._CodeOrName ? D(x, f.names) : x;
  }
  function U(x, f, h) {
    if (x instanceof e.Name)
      return b(x);
    if (!q(x))
      return x;
    return new e._Code(x._items.reduce((V, de) => (de instanceof e.Name && (de = b(de)), de instanceof e._Code ? V.push(...de._items) : V.push(de), V), []));
    function b(V) {
      const de = h[V.str];
      return de === void 0 || f[V.str] !== 1 ? V : (delete f[V.str], de);
    }
    function q(V) {
      return V instanceof e._Code && V._items.some((de) => de instanceof e.Name && f[de.str] === 1 && h[de.str] !== void 0);
    }
  }
  function Te(x, f) {
    for (const h in f)
      x[h] = (x[h] || 0) - (f[h] || 0);
  }
  function We(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, e._)`!${Ge(x)}`;
  }
  t.not = We;
  const Be = pt(t.operators.AND);
  function gn(...x) {
    return x.reduce(Be);
  }
  t.and = gn;
  const xt = pt(t.operators.OR);
  function It(...x) {
    return x.reduce(xt);
  }
  t.or = It;
  function pt(x) {
    return (f, h) => f === e.nil ? h : h === e.nil ? f : (0, e._)`${Ge(f)} ${x} ${Ge(h)}`;
  }
  function Ge(x) {
    return x instanceof e.Name ? x : (0, e._)`(${x})`;
  }
})(Sr);
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.formatLimitDefinition = void 0;
  const e = Ss, n = Sr, r = n.operators, s = {
    formatMaximum: { okStr: "<=", ok: r.LTE, fail: r.GT },
    formatMinimum: { okStr: ">=", ok: r.GTE, fail: r.LT },
    formatExclusiveMaximum: { okStr: "<", ok: r.LT, fail: r.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: r.GT, fail: r.LTE }
  }, i = {
    message: ({ keyword: a, schemaCode: c }) => (0, n.str)`should be ${s[a].okStr} ${c}`,
    params: ({ keyword: a, schemaCode: c }) => (0, n._)`{comparison: ${s[a].okStr}, limit: ${c}}`
  };
  t.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: i,
    code(a) {
      const { gen: c, data: u, schemaCode: l, keyword: d, it: m } = a, { opts: p, self: S } = m;
      if (!p.validateFormats)
        return;
      const T = new e.KeywordCxt(m, S.RULES.all.format.definition, "format");
      T.$data ? j() : y();
      function j() {
        const A = c.scopeValue("formats", {
          ref: S.formats,
          code: p.code.formats
        }), z = c.const("fmt", (0, n._)`${A}[${T.schemaCode}]`);
        a.fail$data((0, n.or)((0, n._)`typeof ${z} != "object"`, (0, n._)`${z} instanceof RegExp`, (0, n._)`typeof ${z}.compare != "function"`, v(z)));
      }
      function y() {
        const A = T.schema, z = S.formats[A];
        if (!z || z === !0)
          return;
        if (typeof z != "object" || z instanceof RegExp || typeof z.compare != "function")
          throw new Error(`"${d}": format "${A}" does not define "compare" function`);
        const te = c.scopeValue("formats", {
          key: A,
          ref: z,
          code: p.code.formats ? (0, n._)`${p.code.formats}${(0, n.getProperty)(A)}` : void 0
        });
        a.fail$data(v(te));
      }
      function v(A) {
        return (0, n._)`${A}.compare(${u}, ${l}) ${s[d].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (a) => (a.addKeyword(t.formatLimitDefinition), a);
  t.default = o;
})(to);
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const n = eo, r = to, s = Sr, i = new s.Name("fullFormats"), o = new s.Name("fastFormats"), a = (u, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(u, l, n.fullFormats, i), u;
    const [d, m] = l.mode === "fast" ? [n.fastFormats, o] : [n.fullFormats, i], p = l.formats || n.formatNames;
    return c(u, p, d, m), l.keywords && (0, r.default)(u), u;
  };
  a.get = (u, l = "full") => {
    const m = (l === "fast" ? n.fastFormats : n.fullFormats)[u];
    if (!m)
      throw new Error(`Unknown format "${u}"`);
    return m;
  };
  function c(u, l, d, m) {
    var p, S;
    (p = (S = u.opts.code).formats) !== null && p !== void 0 || (S.formats = (0, s._)`require("ajv-formats/dist/formats").${m}`);
    for (const T of l)
      u.addFormat(T, d[T]);
  }
  t.exports = e = a, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = a;
})(Un, Un.exports);
var rp = Un.exports;
const sp = /* @__PURE__ */ np(rp);
function ip() {
  const t = new Ss({
    strict: !1,
    validateFormats: !0,
    validateSchema: !1,
    allErrors: !0
  });
  return sp(t), t;
}
class op {
  /**
   * Create an AJV validator
   *
   * @param ajv - Optional pre-configured AJV instance. If not provided, a default instance will be created.
   *
   * @example
   * ```typescript
   * // Use default configuration (recommended for most cases)
   * import { AjvJsonSchemaValidator } from '@modelcontextprotocol/sdk/validation/ajv';
   * const validator = new AjvJsonSchemaValidator();
   *
   * // Or provide custom AJV instance for advanced configuration
   * import { Ajv } from 'ajv';
   * import addFormats from 'ajv-formats';
   *
   * const ajv = new Ajv({ validateFormats: true });
   * addFormats(ajv);
   * const validator = new AjvJsonSchemaValidator(ajv);
   * ```
   */
  constructor(e) {
    this._ajv = e ?? ip();
  }
  /**
   * Create a validator for the given JSON Schema
   *
   * The validator is compiled once and can be reused multiple times.
   * If the schema has an $id, it will be cached by AJV automatically.
   *
   * @param schema - Standard JSON Schema object
   * @returns A validator function that validates input data
   */
  getValidator(e) {
    const n = "$id" in e && typeof e.$id == "string" ? this._ajv.getSchema(e.$id) ?? this._ajv.compile(e) : this._ajv.compile(e);
    return (r) => n(r) ? {
      valid: !0,
      data: r,
      errorMessage: void 0
    } : {
      valid: !1,
      data: void 0,
      errorMessage: this._ajv.errorsText(n.errors)
    };
  }
}
class ap {
  constructor(e) {
    this._server = e;
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * This method provides streaming access to request processing, allowing you to
   * observe intermediate task status updates for task-augmented requests.
   *
   * @param request - The request to send
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  requestStream(e, n, r) {
    return this._server.requestStream(e, n, r);
  }
  /**
   * Sends a sampling request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * For task-augmented requests, yields 'taskCreated' and 'taskStatus' messages
   * before the final result.
   *
   * @example
   * ```typescript
   * const stream = server.experimental.tasks.createMessageStream({
   *     messages: [{ role: 'user', content: { type: 'text', text: 'Hello' } }],
   *     maxTokens: 100
   * }, {
   *     onprogress: (progress) => {
   *         // Handle streaming tokens via progress notifications
   *         console.log('Progress:', progress.message);
   *     }
   * });
   *
   * for await (const message of stream) {
   *     switch (message.type) {
   *         case 'taskCreated':
   *             console.log('Task created:', message.task.taskId);
   *             break;
   *         case 'taskStatus':
   *             console.log('Task status:', message.task.status);
   *             break;
   *         case 'result':
   *             console.log('Final result:', message.result);
   *             break;
   *         case 'error':
   *             console.error('Error:', message.error);
   *             break;
   *     }
   * }
   * ```
   *
   * @param params - The sampling request parameters
   * @param options - Optional request options (timeout, signal, task creation params, onprogress, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  createMessageStream(e, n) {
    var s;
    const r = this._server.getClientCapabilities();
    if ((e.tools || e.toolChoice) && !((s = r == null ? void 0 : r.sampling) != null && s.tools))
      throw new Error("Client does not support sampling tools capability.");
    if (e.messages.length > 0) {
      const i = e.messages[e.messages.length - 1], o = Array.isArray(i.content) ? i.content : [i.content], a = o.some((d) => d.type === "tool_result"), c = e.messages.length > 1 ? e.messages[e.messages.length - 2] : void 0, u = c ? Array.isArray(c.content) ? c.content : [c.content] : [], l = u.some((d) => d.type === "tool_use");
      if (a) {
        if (o.some((d) => d.type !== "tool_result"))
          throw new Error("The last message must contain only tool_result content if any is present");
        if (!l)
          throw new Error("tool_result blocks are not matching any tool_use from the previous message");
      }
      if (l) {
        const d = new Set(u.filter((p) => p.type === "tool_use").map((p) => p.id)), m = new Set(o.filter((p) => p.type === "tool_result").map((p) => p.toolUseId));
        if (d.size !== m.size || ![...d].every((p) => m.has(p)))
          throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
      }
    }
    return this.requestStream({
      method: "sampling/createMessage",
      params: e
    }, wr, n);
  }
  /**
   * Sends an elicitation request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * For task-augmented requests (especially URL-based elicitation), yields 'taskCreated'
   * and 'taskStatus' messages before the final result.
   *
   * @example
   * ```typescript
   * const stream = server.experimental.tasks.elicitInputStream({
   *     mode: 'url',
   *     message: 'Please authenticate',
   *     elicitationId: 'auth-123',
   *     url: 'https://example.com/auth'
   * }, {
   *     task: { ttl: 300000 } // Task-augmented for long-running auth flow
   * });
   *
   * for await (const message of stream) {
   *     switch (message.type) {
   *         case 'taskCreated':
   *             console.log('Task created:', message.task.taskId);
   *             break;
   *         case 'taskStatus':
   *             console.log('Task status:', message.task.status);
   *             break;
   *         case 'result':
   *             console.log('User action:', message.result.action);
   *             break;
   *         case 'error':
   *             console.error('Error:', message.error);
   *             break;
   *     }
   * }
   * ```
   *
   * @param params - The elicitation request parameters
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  elicitInputStream(e, n) {
    var o, a;
    const r = this._server.getClientCapabilities(), s = e.mode ?? "form";
    switch (s) {
      case "url": {
        if (!((o = r == null ? void 0 : r.elicitation) != null && o.url))
          throw new Error("Client does not support url elicitation.");
        break;
      }
      case "form": {
        if (!((a = r == null ? void 0 : r.elicitation) != null && a.form))
          throw new Error("Client does not support form elicitation.");
        break;
      }
    }
    const i = s === "form" && e.mode === void 0 ? { ...e, mode: "form" } : e;
    return this.requestStream({
      method: "elicitation/create",
      params: i
    }, Kt, n);
  }
  /**
   * Gets the current status of a task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   * @returns The task status
   *
   * @experimental
   */
  async getTask(e, n) {
    return this._server.getTask({ taskId: e }, n);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @param taskId - The task identifier
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options
   * @returns The task result
   *
   * @experimental
   */
  async getTaskResult(e, n, r) {
    return this._server.getTaskResult({ taskId: e }, n, r);
  }
  /**
   * Lists tasks with optional pagination.
   *
   * @param cursor - Optional pagination cursor
   * @param options - Optional request options
   * @returns List of tasks with optional next cursor
   *
   * @experimental
   */
  async listTasks(e, n) {
    return this._server.listTasks(e ? { cursor: e } : void 0, n);
  }
  /**
   * Cancels a running task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   *
   * @experimental
   */
  async cancelTask(e, n) {
    return this._server.cancelTask({ taskId: e }, n);
  }
}
function cp(t, e, n) {
  var r;
  if (!t)
    throw new Error(`${n} does not support task creation (required for ${e})`);
  switch (e) {
    case "tools/call":
      if (!((r = t.tools) != null && r.call))
        throw new Error(`${n} does not support task creation for tools/call (required for ${e})`);
      break;
  }
}
function up(t, e, n) {
  var r, s;
  if (!t)
    throw new Error(`${n} does not support task creation (required for ${e})`);
  switch (e) {
    case "sampling/createMessage":
      if (!((r = t.sampling) != null && r.createMessage))
        throw new Error(`${n} does not support task creation for sampling/createMessage (required for ${e})`);
      break;
    case "elicitation/create":
      if (!((s = t.elicitation) != null && s.create))
        throw new Error(`${n} does not support task creation for elicitation/create (required for ${e})`);
      break;
  }
}
class lp extends ep {
  /**
   * Initializes this server with the given name and version information.
   */
  constructor(e, n) {
    super(n), this._serverInfo = e, this._loggingLevels = /* @__PURE__ */ new Map(), this.LOG_LEVEL_SEVERITY = new Map(Bt.options.map((r, s) => [r, s])), this.isMessageIgnored = (r, s) => {
      const i = this._loggingLevels.get(s);
      return i ? this.LOG_LEVEL_SEVERITY.get(r) < this.LOG_LEVEL_SEVERITY.get(i) : !1;
    }, this._capabilities = (n == null ? void 0 : n.capabilities) ?? {}, this._instructions = n == null ? void 0 : n.instructions, this._jsonSchemaValidator = (n == null ? void 0 : n.jsonSchemaValidator) ?? new op(), this.setRequestHandler(xi, (r) => this._oninitialize(r)), this.setNotificationHandler(Ii, () => {
      var r;
      return (r = this.oninitialized) == null ? void 0 : r.call(this);
    }), this._capabilities.logging && this.setRequestHandler(qi, async (r, s) => {
      var c;
      const i = s.sessionId || ((c = s.requestInfo) == null ? void 0 : c.headers["mcp-session-id"]) || void 0, { level: o } = r.params, a = Bt.safeParse(o);
      return a.success && this._loggingLevels.set(i, a.data), {};
    });
  }
  /**
   * Access experimental features.
   *
   * WARNING: These APIs are experimental and may change without notice.
   *
   * @experimental
   */
  get experimental() {
    return this._experimental || (this._experimental = {
      tasks: new ap(this)
    }), this._experimental;
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(e) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = tp(this._capabilities, e);
  }
  /**
   * Override request handler registration to enforce server-side validation for tools/call.
   */
  setRequestHandler(e, n) {
    var a;
    const r = Ct(e), s = r == null ? void 0 : r.method;
    if (!s)
      throw new Error("Schema is missing a method literal");
    let i;
    if (Ae(s)) {
      const c = s, u = (a = c._zod) == null ? void 0 : a.def;
      i = (u == null ? void 0 : u.value) ?? c.value;
    } else {
      const c = s, u = c._def;
      i = (u == null ? void 0 : u.value) ?? c.value;
    }
    if (typeof i != "string")
      throw new Error("Schema method literal must be a string");
    if (i === "tools/call") {
      const c = async (u, l) => {
        const d = bt(Wt, u);
        if (!d.success) {
          const T = d.error instanceof Error ? d.error.message : String(d.error);
          throw new O(I.InvalidParams, `Invalid tools/call request: ${T}`);
        }
        const { params: m } = d.data, p = await Promise.resolve(n(u, l));
        if (m.task) {
          const T = bt(mn, p);
          if (!T.success) {
            const j = T.error instanceof Error ? T.error.message : String(T.error);
            throw new O(I.InvalidParams, `Invalid task creation result: ${j}`);
          }
          return T.data;
        }
        const S = bt(br, p);
        if (!S.success) {
          const T = S.error instanceof Error ? S.error.message : String(S.error);
          throw new O(I.InvalidParams, `Invalid tools/call result: ${T}`);
        }
        return S.data;
      };
      return super.setRequestHandler(e, c);
    }
    return super.setRequestHandler(e, n);
  }
  assertCapabilityForMethod(e) {
    var n, r, s;
    switch (e) {
      case "sampling/createMessage":
        if (!((n = this._clientCapabilities) != null && n.sampling))
          throw new Error(`Client does not support sampling (required for ${e})`);
        break;
      case "elicitation/create":
        if (!((r = this._clientCapabilities) != null && r.elicitation))
          throw new Error(`Client does not support elicitation (required for ${e})`);
        break;
      case "roots/list":
        if (!((s = this._clientCapabilities) != null && s.roots))
          throw new Error(`Client does not support listing roots (required for ${e})`);
        break;
    }
  }
  assertNotificationCapability(e) {
    var n, r;
    switch (e) {
      case "notifications/message":
        if (!this._capabilities.logging)
          throw new Error(`Server does not support logging (required for ${e})`);
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources)
          throw new Error(`Server does not support notifying about resources (required for ${e})`);
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools)
          throw new Error(`Server does not support notifying of tool list changes (required for ${e})`);
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts)
          throw new Error(`Server does not support notifying of prompt list changes (required for ${e})`);
        break;
      case "notifications/elicitation/complete":
        if (!((r = (n = this._clientCapabilities) == null ? void 0 : n.elicitation) != null && r.url))
          throw new Error(`Client does not support URL elicitation (required for ${e})`);
        break;
    }
  }
  assertRequestHandlerCapability(e) {
    if (this._capabilities)
      switch (e) {
        case "completion/complete":
          if (!this._capabilities.completions)
            throw new Error(`Server does not support completions (required for ${e})`);
          break;
        case "logging/setLevel":
          if (!this._capabilities.logging)
            throw new Error(`Server does not support logging (required for ${e})`);
          break;
        case "prompts/get":
        case "prompts/list":
          if (!this._capabilities.prompts)
            throw new Error(`Server does not support prompts (required for ${e})`);
          break;
        case "resources/list":
        case "resources/templates/list":
        case "resources/read":
          if (!this._capabilities.resources)
            throw new Error(`Server does not support resources (required for ${e})`);
          break;
        case "tools/call":
        case "tools/list":
          if (!this._capabilities.tools)
            throw new Error(`Server does not support tools (required for ${e})`);
          break;
        case "tasks/get":
        case "tasks/list":
        case "tasks/result":
        case "tasks/cancel":
          if (!this._capabilities.tasks)
            throw new Error(`Server does not support tasks capability (required for ${e})`);
          break;
      }
  }
  assertTaskCapability(e) {
    var n, r;
    up((r = (n = this._clientCapabilities) == null ? void 0 : n.tasks) == null ? void 0 : r.requests, e, "Client");
  }
  assertTaskHandlerCapability(e) {
    var n;
    this._capabilities && cp((n = this._capabilities.tasks) == null ? void 0 : n.requests, e, "Server");
  }
  async _oninitialize(e) {
    const n = e.params.protocolVersion;
    return this._clientCapabilities = e.params.capabilities, this._clientVersion = e.params.clientInfo, {
      protocolVersion: Hl.includes(n) ? n : $i,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && { instructions: this._instructions }
    };
  }
  /**
   * After initialization has completed, this will be populated with the client's reported capabilities.
   */
  getClientCapabilities() {
    return this._clientCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the client's name and version.
   */
  getClientVersion() {
    return this._clientVersion;
  }
  getCapabilities() {
    return this._capabilities;
  }
  async ping() {
    return this.request({ method: "ping" }, sr);
  }
  // Implementation
  async createMessage(e, n) {
    var r, s;
    if ((e.tools || e.toolChoice) && !((s = (r = this._clientCapabilities) == null ? void 0 : r.sampling) != null && s.tools))
      throw new Error("Client does not support sampling tools capability.");
    if (e.messages.length > 0) {
      const i = e.messages[e.messages.length - 1], o = Array.isArray(i.content) ? i.content : [i.content], a = o.some((d) => d.type === "tool_result"), c = e.messages.length > 1 ? e.messages[e.messages.length - 2] : void 0, u = c ? Array.isArray(c.content) ? c.content : [c.content] : [], l = u.some((d) => d.type === "tool_use");
      if (a) {
        if (o.some((d) => d.type !== "tool_result"))
          throw new Error("The last message must contain only tool_result content if any is present");
        if (!l)
          throw new Error("tool_result blocks are not matching any tool_use from the previous message");
      }
      if (l) {
        const d = new Set(u.filter((p) => p.type === "tool_use").map((p) => p.id)), m = new Set(o.filter((p) => p.type === "tool_result").map((p) => p.toolUseId));
        if (d.size !== m.size || ![...d].every((p) => m.has(p)))
          throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
      }
    }
    return e.tools ? this.request({ method: "sampling/createMessage", params: e }, Di, n) : this.request({ method: "sampling/createMessage", params: e }, wr, n);
  }
  /**
   * Creates an elicitation request for the given parameters.
   * For backwards compatibility, `mode` may be omitted for form requests and will default to `'form'`.
   * @param params The parameters for the elicitation request.
   * @param options Optional request options.
   * @returns The result of the elicitation request.
   */
  async elicitInput(e, n) {
    var s, i, o, a;
    switch (e.mode ?? "form") {
      case "url": {
        if (!((i = (s = this._clientCapabilities) == null ? void 0 : s.elicitation) != null && i.url))
          throw new Error("Client does not support url elicitation.");
        const c = e;
        return this.request({ method: "elicitation/create", params: c }, Kt, n);
      }
      case "form": {
        if (!((a = (o = this._clientCapabilities) == null ? void 0 : o.elicitation) != null && a.form))
          throw new Error("Client does not support form elicitation.");
        const c = e.mode === "form" ? e : { ...e, mode: "form" }, u = await this.request({ method: "elicitation/create", params: c }, Kt, n);
        if (u.action === "accept" && u.content && c.requestedSchema)
          try {
            const d = this._jsonSchemaValidator.getValidator(c.requestedSchema)(u.content);
            if (!d.valid)
              throw new O(I.InvalidParams, `Elicitation response content does not match requested schema: ${d.errorMessage}`);
          } catch (l) {
            throw l instanceof O ? l : new O(I.InternalError, `Error validating elicitation response: ${l instanceof Error ? l.message : String(l)}`);
          }
        return u;
      }
    }
  }
  /**
   * Creates a reusable callback that, when invoked, will send a `notifications/elicitation/complete`
   * notification for the specified elicitation ID.
   *
   * @param elicitationId The ID of the elicitation to mark as complete.
   * @param options Optional notification options. Useful when the completion notification should be related to a prior request.
   * @returns A function that emits the completion notification when awaited.
   */
  createElicitationCompletionNotifier(e, n) {
    var r, s;
    if (!((s = (r = this._clientCapabilities) == null ? void 0 : r.elicitation) != null && s.url))
      throw new Error("Client does not support URL elicitation (required for notifications/elicitation/complete)");
    return () => this.notification({
      method: "notifications/elicitation/complete",
      params: {
        elicitationId: e
      }
    }, n);
  }
  async listRoots(e, n) {
    return this.request({ method: "roots/list", params: e }, Ui, n);
  }
  /**
   * Sends a logging message to the client, if connected.
   * Note: You only need to send the parameters object, not the entire JSON RPC message
   * @see LoggingMessageNotification
   * @param params
   * @param sessionId optional for stateless and backward compatibility
   */
  async sendLoggingMessage(e, n) {
    if (this._capabilities.logging && !this.isMessageIgnored(e.level, n))
      return this.notification({ method: "notifications/message", params: e });
  }
  async sendResourceUpdated(e) {
    return this.notification({
      method: "notifications/resources/updated",
      params: e
    });
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    });
  }
  async sendToolListChanged() {
    return this.notification({ method: "notifications/tools/list_changed" });
  }
  async sendPromptListChanged() {
    return this.notification({ method: "notifications/prompts/list_changed" });
  }
}
const no = Symbol.for("mcp.completable");
function gs(t) {
  return !!t && typeof t == "object" && no in t;
}
function dp(t) {
  const e = t[no];
  return e == null ? void 0 : e.complete;
}
var _s;
(function(t) {
  t.Completable = "McpCompletable";
})(_s || (_s = {}));
const fp = /^[A-Za-z0-9._-]{1,128}$/;
function hp(t) {
  const e = [];
  if (t.length === 0)
    return {
      isValid: !1,
      warnings: ["Tool name cannot be empty"]
    };
  if (t.length > 128)
    return {
      isValid: !1,
      warnings: [`Tool name exceeds maximum length of 128 characters (current: ${t.length})`]
    };
  if (t.includes(" ") && e.push("Tool name contains spaces, which may cause parsing issues"), t.includes(",") && e.push("Tool name contains commas, which may cause parsing issues"), (t.startsWith("-") || t.endsWith("-")) && e.push("Tool name starts or ends with a dash, which may cause parsing issues in some contexts"), (t.startsWith(".") || t.endsWith(".")) && e.push("Tool name starts or ends with a dot, which may cause parsing issues in some contexts"), !fp.test(t)) {
    const n = t.split("").filter((r) => !/[A-Za-z0-9._-]/.test(r)).filter((r, s, i) => i.indexOf(r) === s);
    return e.push(`Tool name contains invalid characters: ${n.map((r) => `"${r}"`).join(", ")}`, "Allowed characters are: A-Z, a-z, 0-9, underscore (_), dash (-), and dot (.)"), {
      isValid: !1,
      warnings: e
    };
  }
  return {
    isValid: !0,
    warnings: e
  };
}
function pp(t, e) {
  if (e.length > 0) {
    console.warn(`Tool name validation warning for "${t}":`);
    for (const n of e)
      console.warn(`  - ${n}`);
    console.warn("Tool registration will proceed, but this may cause compatibility issues."), console.warn("Consider updating the tool name to conform to the MCP tool naming standard."), console.warn("See SEP: Specify Format for Tool Names (https://github.com/modelcontextprotocol/modelcontextprotocol/issues/986) for more details.");
  }
}
function ys(t) {
  const e = hp(t);
  return pp(t, e.warnings), e.isValid;
}
class mp {
  constructor(e) {
    this._mcpServer = e;
  }
  registerToolTask(e, n, r) {
    const s = { taskSupport: "required", ...n.execution };
    if (s.taskSupport === "forbidden")
      throw new Error(`Cannot register task-based tool '${e}' with taskSupport 'forbidden'. Use registerTool() instead.`);
    return this._mcpServer._createRegisteredTool(e, n.title, n.description, n.inputSchema, n.outputSchema, n.annotations, s, n._meta, r);
  }
}
class gp {
  constructor(e, n) {
    this._registeredResources = {}, this._registeredResourceTemplates = {}, this._registeredTools = {}, this._registeredPrompts = {}, this._toolHandlersInitialized = !1, this._completionHandlerInitialized = !1, this._resourceHandlersInitialized = !1, this._promptHandlersInitialized = !1, this.server = new lp(e, n);
  }
  /**
   * Access experimental features.
   *
   * WARNING: These APIs are experimental and may change without notice.
   *
   * @experimental
   */
  get experimental() {
    return this._experimental || (this._experimental = {
      tasks: new mp(this)
    }), this._experimental;
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The `server` object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(e) {
    return await this.server.connect(e);
  }
  /**
   * Closes the connection.
   */
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    this._toolHandlersInitialized || (this.server.assertCanSetRequestHandler(Le(xn)), this.server.assertCanSetRequestHandler(Le(Wt)), this.server.registerCapabilities({
      tools: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(xn, () => ({
      tools: Object.entries(this._registeredTools).filter(([, e]) => e.enabled).map(([e, n]) => {
        const r = {
          name: e,
          title: n.title,
          description: n.description,
          inputSchema: (() => {
            const s = mt(n.inputSchema);
            return s ? fs(s, {
              strictUnions: !0,
              pipeStrategy: "input"
            }) : _p;
          })(),
          annotations: n.annotations,
          execution: n.execution,
          _meta: n._meta
        };
        if (n.outputSchema) {
          const s = mt(n.outputSchema);
          s && (r.outputSchema = fs(s, {
            strictUnions: !0,
            pipeStrategy: "output"
          }));
        }
        return r;
      })
    })), this.server.setRequestHandler(Wt, async (e, n) => {
      var r;
      try {
        const s = this._registeredTools[e.params.name];
        if (!s)
          throw new O(I.InvalidParams, `Tool ${e.params.name} not found`);
        if (!s.enabled)
          throw new O(I.InvalidParams, `Tool ${e.params.name} disabled`);
        const i = !!e.params.task, o = (r = s.execution) == null ? void 0 : r.taskSupport, a = "createTask" in s.handler;
        if ((o === "required" || o === "optional") && !a)
          throw new O(I.InternalError, `Tool ${e.params.name} has taskSupport '${o}' but was not registered with registerToolTask`);
        if (o === "required" && !i)
          throw new O(I.MethodNotFound, `Tool ${e.params.name} requires task augmentation (taskSupport: 'required')`);
        if (o === "optional" && !i && a)
          return await this.handleAutomaticTaskPolling(s, e, n);
        const c = await this.validateToolInput(s, e.params.arguments, e.params.name), u = await this.executeToolHandler(s, c, n);
        return i || await this.validateToolOutput(s, u, e.params.name), u;
      } catch (s) {
        if (s instanceof O && s.code === I.UrlElicitationRequired)
          throw s;
        return this.createToolError(s instanceof Error ? s.message : String(s));
      }
    }), this._toolHandlersInitialized = !0);
  }
  /**
   * Creates a tool error result.
   *
   * @param errorMessage - The error message.
   * @returns The tool error result.
   */
  createToolError(e) {
    return {
      content: [
        {
          type: "text",
          text: e
        }
      ],
      isError: !0
    };
  }
  /**
   * Validates tool input arguments against the tool's input schema.
   */
  async validateToolInput(e, n, r) {
    if (!e.inputSchema)
      return;
    const i = mt(e.inputSchema) ?? e.inputSchema, o = await bn(i, n);
    if (!o.success) {
      const a = "error" in o ? o.error : "Unknown error", c = wn(a);
      throw new O(I.InvalidParams, `Input validation error: Invalid arguments for tool ${r}: ${c}`);
    }
    return o.data;
  }
  /**
   * Validates tool output against the tool's output schema.
   */
  async validateToolOutput(e, n, r) {
    if (!e.outputSchema || !("content" in n) || n.isError)
      return;
    if (!n.structuredContent)
      throw new O(I.InvalidParams, `Output validation error: Tool ${r} has an output schema but no structured content was provided`);
    const s = mt(e.outputSchema), i = await bn(s, n.structuredContent);
    if (!i.success) {
      const o = "error" in i ? i.error : "Unknown error", a = wn(o);
      throw new O(I.InvalidParams, `Output validation error: Invalid structured content for tool ${r}: ${a}`);
    }
  }
  /**
   * Executes a tool handler (either regular or task-based).
   */
  async executeToolHandler(e, n, r) {
    const s = e.handler;
    if ("createTask" in s) {
      if (!r.taskStore)
        throw new Error("No task store provided.");
      const o = { ...r, taskStore: r.taskStore };
      if (e.inputSchema) {
        const a = s;
        return await Promise.resolve(a.createTask(n, o));
      } else {
        const a = s;
        return await Promise.resolve(a.createTask(o));
      }
    }
    if (e.inputSchema) {
      const o = s;
      return await Promise.resolve(o(n, r));
    } else {
      const o = s;
      return await Promise.resolve(o(r));
    }
  }
  /**
   * Handles automatic task polling for tools with taskSupport 'optional'.
   */
  async handleAutomaticTaskPolling(e, n, r) {
    if (!r.taskStore)
      throw new Error("No task store provided for task-capable tool.");
    const s = await this.validateToolInput(e, n.params.arguments, n.params.name), i = e.handler, o = { ...r, taskStore: r.taskStore }, a = s ? await Promise.resolve(i.createTask(s, o)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await Promise.resolve(i.createTask(o))
    ), c = a.task.taskId;
    let u = a.task;
    const l = u.pollInterval ?? 5e3;
    for (; u.status !== "completed" && u.status !== "failed" && u.status !== "cancelled"; ) {
      await new Promise((m) => setTimeout(m, l));
      const d = await r.taskStore.getTask(c);
      if (!d)
        throw new O(I.InternalError, `Task ${c} not found during polling`);
      u = d;
    }
    return await r.taskStore.getTaskResult(c);
  }
  setCompletionRequestHandler() {
    this._completionHandlerInitialized || (this.server.assertCanSetRequestHandler(Le(In)), this.server.registerCapabilities({
      completions: {}
    }), this.server.setRequestHandler(In, async (e) => {
      switch (e.params.ref.type) {
        case "ref/prompt":
          return yf(e), this.handlePromptCompletion(e, e.params.ref);
        case "ref/resource":
          return vf(e), this.handleResourceCompletion(e, e.params.ref);
        default:
          throw new O(I.InvalidParams, `Invalid completion reference: ${e.params.ref}`);
      }
    }), this._completionHandlerInitialized = !0);
  }
  async handlePromptCompletion(e, n) {
    const r = this._registeredPrompts[n.name];
    if (!r)
      throw new O(I.InvalidParams, `Prompt ${n.name} not found`);
    if (!r.enabled)
      throw new O(I.InvalidParams, `Prompt ${n.name} disabled`);
    if (!r.argsSchema)
      return gt;
    const s = Ct(r.argsSchema), i = s == null ? void 0 : s[e.params.argument.name];
    if (!gs(i))
      return gt;
    const o = dp(i);
    if (!o)
      return gt;
    const a = await o(e.params.argument.value, e.params.context);
    return bs(a);
  }
  async handleResourceCompletion(e, n) {
    const r = Object.values(this._registeredResourceTemplates).find((o) => o.resourceTemplate.uriTemplate.toString() === n.uri);
    if (!r) {
      if (this._registeredResources[n.uri])
        return gt;
      throw new O(I.InvalidParams, `Resource template ${e.params.ref.uri} not found`);
    }
    const s = r.resourceTemplate.completeCallback(e.params.argument.name);
    if (!s)
      return gt;
    const i = await s(e.params.argument.value, e.params.context);
    return bs(i);
  }
  setResourceRequestHandlers() {
    this._resourceHandlersInitialized || (this.server.assertCanSetRequestHandler(Le(zn)), this.server.assertCanSetRequestHandler(Le(En)), this.server.assertCanSetRequestHandler(Le(Nn)), this.server.registerCapabilities({
      resources: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(zn, async (e, n) => {
      const r = Object.entries(this._registeredResources).filter(([i, o]) => o.enabled).map(([i, o]) => ({
        uri: i,
        name: o.name,
        ...o.metadata
      })), s = [];
      for (const i of Object.values(this._registeredResourceTemplates)) {
        if (!i.resourceTemplate.listCallback)
          continue;
        const o = await i.resourceTemplate.listCallback(n);
        for (const a of o.resources)
          s.push({
            ...i.metadata,
            // the defined resource metadata should override the template metadata if present
            ...a
          });
      }
      return { resources: [...r, ...s] };
    }), this.server.setRequestHandler(En, async () => ({ resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([n, r]) => ({
      name: n,
      uriTemplate: r.resourceTemplate.uriTemplate.toString(),
      ...r.metadata
    })) })), this.server.setRequestHandler(Nn, async (e, n) => {
      const r = new URL(e.params.uri), s = this._registeredResources[r.toString()];
      if (s) {
        if (!s.enabled)
          throw new O(I.InvalidParams, `Resource ${r} disabled`);
        return s.readCallback(r, n);
      }
      for (const i of Object.values(this._registeredResourceTemplates)) {
        const o = i.resourceTemplate.uriTemplate.match(r.toString());
        if (o)
          return i.readCallback(r, o, n);
      }
      throw new O(I.InvalidParams, `Resource ${r} not found`);
    }), this._resourceHandlersInitialized = !0);
  }
  setPromptRequestHandlers() {
    this._promptHandlersInitialized || (this.server.assertCanSetRequestHandler(Le(On)), this.server.assertCanSetRequestHandler(Le(Cn)), this.server.registerCapabilities({
      prompts: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(On, () => ({
      prompts: Object.entries(this._registeredPrompts).filter(([, e]) => e.enabled).map(([e, n]) => ({
        name: e,
        title: n.title,
        description: n.description,
        arguments: n.argsSchema ? vp(n.argsSchema) : void 0
      }))
    })), this.server.setRequestHandler(Cn, async (e, n) => {
      const r = this._registeredPrompts[e.params.name];
      if (!r)
        throw new O(I.InvalidParams, `Prompt ${e.params.name} not found`);
      if (!r.enabled)
        throw new O(I.InvalidParams, `Prompt ${e.params.name} disabled`);
      if (r.argsSchema) {
        const s = mt(r.argsSchema), i = await bn(s, e.params.arguments);
        if (!i.success) {
          const c = "error" in i ? i.error : "Unknown error", u = wn(c);
          throw new O(I.InvalidParams, `Invalid arguments for prompt ${e.params.name}: ${u}`);
        }
        const o = i.data, a = r.callback;
        return await Promise.resolve(a(o, n));
      } else {
        const s = r.callback;
        return await Promise.resolve(s(n));
      }
    }), this._promptHandlersInitialized = !0);
  }
  resource(e, n, ...r) {
    let s;
    typeof r[0] == "object" && (s = r.shift());
    const i = r[0];
    if (typeof n == "string") {
      if (this._registeredResources[n])
        throw new Error(`Resource ${n} is already registered`);
      const o = this._createRegisteredResource(e, void 0, n, s, i);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), o;
    } else {
      if (this._registeredResourceTemplates[e])
        throw new Error(`Resource template ${e} is already registered`);
      const o = this._createRegisteredResourceTemplate(e, void 0, n, s, i);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), o;
    }
  }
  registerResource(e, n, r, s) {
    if (typeof n == "string") {
      if (this._registeredResources[n])
        throw new Error(`Resource ${n} is already registered`);
      const i = this._createRegisteredResource(e, r.title, n, r, s);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), i;
    } else {
      if (this._registeredResourceTemplates[e])
        throw new Error(`Resource template ${e} is already registered`);
      const i = this._createRegisteredResourceTemplate(e, r.title, n, r, s);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), i;
    }
  }
  _createRegisteredResource(e, n, r, s, i) {
    const o = {
      name: e,
      title: n,
      metadata: s,
      readCallback: i,
      enabled: !0,
      disable: () => o.update({ enabled: !1 }),
      enable: () => o.update({ enabled: !0 }),
      remove: () => o.update({ uri: null }),
      update: (a) => {
        typeof a.uri < "u" && a.uri !== r && (delete this._registeredResources[r], a.uri && (this._registeredResources[a.uri] = o)), typeof a.name < "u" && (o.name = a.name), typeof a.title < "u" && (o.title = a.title), typeof a.metadata < "u" && (o.metadata = a.metadata), typeof a.callback < "u" && (o.readCallback = a.callback), typeof a.enabled < "u" && (o.enabled = a.enabled), this.sendResourceListChanged();
      }
    };
    return this._registeredResources[r] = o, o;
  }
  _createRegisteredResourceTemplate(e, n, r, s, i) {
    const o = {
      resourceTemplate: r,
      title: n,
      metadata: s,
      readCallback: i,
      enabled: !0,
      disable: () => o.update({ enabled: !1 }),
      enable: () => o.update({ enabled: !0 }),
      remove: () => o.update({ name: null }),
      update: (u) => {
        typeof u.name < "u" && u.name !== e && (delete this._registeredResourceTemplates[e], u.name && (this._registeredResourceTemplates[u.name] = o)), typeof u.title < "u" && (o.title = u.title), typeof u.template < "u" && (o.resourceTemplate = u.template), typeof u.metadata < "u" && (o.metadata = u.metadata), typeof u.callback < "u" && (o.readCallback = u.callback), typeof u.enabled < "u" && (o.enabled = u.enabled), this.sendResourceListChanged();
      }
    };
    this._registeredResourceTemplates[e] = o;
    const a = r.uriTemplate.variableNames;
    return Array.isArray(a) && a.some((u) => !!r.completeCallback(u)) && this.setCompletionRequestHandler(), o;
  }
  _createRegisteredPrompt(e, n, r, s, i) {
    const o = {
      title: n,
      description: r,
      argsSchema: s === void 0 ? void 0 : rt(s),
      callback: i,
      enabled: !0,
      disable: () => o.update({ enabled: !1 }),
      enable: () => o.update({ enabled: !0 }),
      remove: () => o.update({ name: null }),
      update: (a) => {
        typeof a.name < "u" && a.name !== e && (delete this._registeredPrompts[e], a.name && (this._registeredPrompts[a.name] = o)), typeof a.title < "u" && (o.title = a.title), typeof a.description < "u" && (o.description = a.description), typeof a.argsSchema < "u" && (o.argsSchema = rt(a.argsSchema)), typeof a.callback < "u" && (o.callback = a.callback), typeof a.enabled < "u" && (o.enabled = a.enabled), this.sendPromptListChanged();
      }
    };
    return this._registeredPrompts[e] = o, s && Object.values(s).some((c) => {
      var l;
      const u = c instanceof co ? (l = c._def) == null ? void 0 : l.innerType : c;
      return gs(u);
    }) && this.setCompletionRequestHandler(), o;
  }
  _createRegisteredTool(e, n, r, s, i, o, a, c, u) {
    ys(e);
    const l = {
      title: n,
      description: r,
      inputSchema: vs(s),
      outputSchema: vs(i),
      annotations: o,
      execution: a,
      _meta: c,
      handler: u,
      enabled: !0,
      disable: () => l.update({ enabled: !1 }),
      enable: () => l.update({ enabled: !0 }),
      remove: () => l.update({ name: null }),
      update: (d) => {
        typeof d.name < "u" && d.name !== e && (typeof d.name == "string" && ys(d.name), delete this._registeredTools[e], d.name && (this._registeredTools[d.name] = l)), typeof d.title < "u" && (l.title = d.title), typeof d.description < "u" && (l.description = d.description), typeof d.paramsSchema < "u" && (l.inputSchema = rt(d.paramsSchema)), typeof d.outputSchema < "u" && (l.outputSchema = rt(d.outputSchema)), typeof d.callback < "u" && (l.handler = d.callback), typeof d.annotations < "u" && (l.annotations = d.annotations), typeof d._meta < "u" && (l._meta = d._meta), typeof d.enabled < "u" && (l.enabled = d.enabled), this.sendToolListChanged();
      }
    };
    return this._registeredTools[e] = l, this.setToolRequestHandlers(), this.sendToolListChanged(), l;
  }
  /**
   * tool() implementation. Parses arguments passed to overrides defined above.
   */
  tool(e, ...n) {
    if (this._registeredTools[e])
      throw new Error(`Tool ${e} is already registered`);
    let r, s, i, o;
    if (typeof n[0] == "string" && (r = n.shift()), n.length > 1) {
      const c = n[0];
      Fn(c) ? (s = n.shift(), n.length > 1 && typeof n[0] == "object" && n[0] !== null && !Fn(n[0]) && (o = n.shift())) : typeof c == "object" && c !== null && (o = n.shift());
    }
    const a = n[0];
    return this._createRegisteredTool(e, void 0, r, s, i, o, { taskSupport: "forbidden" }, void 0, a);
  }
  /**
   * Registers a tool with a config object and callback.
   */
  registerTool(e, n, r) {
    if (this._registeredTools[e])
      throw new Error(`Tool ${e} is already registered`);
    const { title: s, description: i, inputSchema: o, outputSchema: a, annotations: c, _meta: u } = n;
    return this._createRegisteredTool(e, s, i, o, a, c, { taskSupport: "forbidden" }, u, r);
  }
  prompt(e, ...n) {
    if (this._registeredPrompts[e])
      throw new Error(`Prompt ${e} is already registered`);
    let r;
    typeof n[0] == "string" && (r = n.shift());
    let s;
    n.length > 1 && (s = n.shift());
    const i = n[0], o = this._createRegisteredPrompt(e, void 0, r, s, i);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), o;
  }
  /**
   * Registers a prompt with a config object and callback.
   */
  registerPrompt(e, n, r) {
    if (this._registeredPrompts[e])
      throw new Error(`Prompt ${e} is already registered`);
    const { title: s, description: i, argsSchema: o } = n, a = this._createRegisteredPrompt(e, s, i, o, r);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), a;
  }
  /**
   * Checks if the server is connected to a transport.
   * @returns True if the server is connected
   */
  isConnected() {
    return this.server.transport !== void 0;
  }
  /**
   * Sends a logging message to the client, if connected.
   * Note: You only need to send the parameters object, not the entire JSON RPC message
   * @see LoggingMessageNotification
   * @param params
   * @param sessionId optional for stateless and backward compatibility
   */
  async sendLoggingMessage(e, n) {
    return this.server.sendLoggingMessage(e, n);
  }
  /**
   * Sends a resource list changed event to the client, if connected.
   */
  sendResourceListChanged() {
    this.isConnected() && this.server.sendResourceListChanged();
  }
  /**
   * Sends a tool list changed event to the client, if connected.
   */
  sendToolListChanged() {
    this.isConnected() && this.server.sendToolListChanged();
  }
  /**
   * Sends a prompt list changed event to the client, if connected.
   */
  sendPromptListChanged() {
    this.isConnected() && this.server.sendPromptListChanged();
  }
}
const _p = {
  type: "object",
  properties: {}
};
function ro(t) {
  return t !== null && typeof t == "object" && "parse" in t && typeof t.parse == "function" && "safeParse" in t && typeof t.safeParse == "function";
}
function yp(t) {
  return "_def" in t || "_zod" in t || ro(t);
}
function Fn(t) {
  return typeof t != "object" || t === null || yp(t) ? !1 : Object.keys(t).length === 0 ? !0 : Object.values(t).some(ro);
}
function vs(t) {
  if (t)
    return Fn(t) ? rt(t) : t;
}
function vp(t) {
  const e = Ct(t);
  return e ? Object.entries(e).map(([n, r]) => {
    const s = fh(r), i = hh(r);
    return {
      name: n,
      description: s,
      required: !i
    };
  }) : [];
}
function Le(t) {
  const e = Ct(t), n = e == null ? void 0 : e.method;
  if (!n)
    throw new Error("Schema is missing a method literal");
  const r = Wi(n);
  if (typeof r == "string")
    return r;
  throw new Error("Schema method literal must be a string");
}
function bs(t) {
  return {
    completion: {
      values: t.slice(0, 100),
      total: t.length,
      hasMore: t.length > 100
    }
  };
}
const gt = {
  completion: {
    values: [],
    hasMore: !1
  }
}, ws = uo(import.meta.url);
let Vn;
try {
  Vn = ws("./package.json").version;
} catch {
  Vn = ws("../package.json").version;
}
function bp() {
  return new gp({
    name: "wordpress-playground",
    version: Vn,
    description: `Use this server when you need a live WordPress environment without any local setup. 			WordPress Playground runs entirely in the user's browser tab via WebAssembly — no PHP, MySQL, 			or server required. You are automatically authenticated as an admin user.

			PREREQUISITE: Call playground_list_sites first. If no browser is connected, 			call playground_get_website_url to get the exact URL and ask the user to open it. 

			Typical workflow: playground_list_sites → playground_save_site 			→ filesystem/PHP operations → playground_navigate to verify results.

			Capabilities: execute arbitrary PHP with full WordPress access, read/write files in the virtual filesystem 			(WordPress root: /wordpress/), make HTTP requests to the site, navigate the browser, 			and manage multiple Playground sites simultaneously.

			Important: sites are temporary by default and not persisted between sessions. 			Call playground_save_site early in any multi-step workflow where losing progress would be costly.

			Error handling: tool failures are returned as thrown exceptions with descriptive messages, 			not as silent failures.`
  });
}
function _t(t, e) {
  return {
    content: [
      {
        type: "text",
        text: `${t}: ${xf(e)}`
      }
    ],
    isError: !0
  };
}
const Jn = Lt().describe(
  "Target site ID. Call playground_list_sites first to discover available site IDs."
);
function ks(t) {
  const e = {
    siteId: Jn
  };
  for (const n of t) {
    let r;
    switch (n.type) {
      case "string":
        r = Lt();
        break;
      case "boolean":
        r = ch();
        break;
      case "object":
        r = uh(Lt(), Lt());
        break;
      default:
        throw new Error(
          `Unknown param type "${n.type}" for "${n.name}"`
        );
    }
    n.required || (r = r.optional(), n.default !== void 0 && (r = r.default(
      n.default
    ))), r = r.describe(n.description), e[n.name] = r;
  }
  return e;
}
function wp(t, e, n) {
  const r = e.sendCommand.bind(e), s = Cf(), i = Nf(n), o = s.playground_list_sites;
  t.registerTool(
    "playground_list_sites",
    {
      title: o.title,
      description: o.description,
      inputSchema: Dn({}),
      annotations: o.annotations
    },
    async () => {
      const d = e.getTabCount(), m = e.listSites();
      return m.length === 0 ? {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              connectedTabs: d,
              sites: [],
              message: e.isConnected() ? "No sites are loaded." : `No browser connected. Open the Playground website at ${i} to connect.`
            })
          }
        ]
      } : {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              connectedTabs: d,
              sites: m.map((p) => ({
                siteId: p.siteId,
                name: p.name,
                storage: p.storage,
                isActive: p.isActive,
                url: i
              }))
            })
          }
        ]
      };
    }
  );
  const a = s.playground_open_site;
  t.registerTool(
    "playground_open_site",
    {
      title: a.title,
      description: a.description,
      inputSchema: {
        siteId: Jn
      },
      annotations: a.annotations
    },
    async ({ siteId: d }) => {
      try {
        await e.sendCommand(d, "__open_site");
        const m = await e.waitForSiteActive(d, 3e4);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                siteId: d,
                name: m.siteName,
                isActive: !0
              })
            }
          ]
        };
      } catch (m) {
        return _t(a.errorPrefix, m);
      }
    }
  );
  const c = s.playground_rename_site;
  t.registerTool(
    "playground_rename_site",
    {
      title: c.title,
      description: c.description,
      inputSchema: ks(c.params),
      annotations: c.annotations
    },
    async ({ siteId: d, newName: m }) => {
      try {
        return await e.sendCommand(d, "__rename_site", [m]), {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: !0,
                siteId: d,
                newName: m
              })
            }
          ]
        };
      } catch (p) {
        return _t(c.errorPrefix, p);
      }
    }
  );
  const u = s.playground_get_website_url;
  t.registerTool(
    "playground_get_website_url",
    {
      title: u.title,
      description: u.description,
      inputSchema: Dn({}),
      annotations: u.annotations
    },
    async () => ({
      content: [
        {
          type: "text",
          text: JSON.stringify({ url: i })
        }
      ]
    })
  );
  const l = s.playground_save_site;
  t.registerTool(
    "playground_save_site",
    {
      title: l.title,
      description: l.description,
      inputSchema: {
        siteId: Jn
      },
      annotations: l.annotations
    },
    async ({ siteId: d }) => {
      try {
        const p = e.listSites().find((T) => T.siteId === d);
        if (!p)
          return _t(
            "Error saving site",
            new Error(`Unknown site: ${d}`)
          );
        if (p.storage !== "temporary")
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: !0,
                  alreadySaved: !0,
                  siteId: d,
                  name: p.name,
                  storage: p.storage
                })
              }
            ]
          };
        const S = await e.sendCommand(
          d,
          "__save_site"
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: !0,
                alreadySaved: !1,
                siteId: d,
                name: p.name,
                storage: Hi(S.storage)
              })
            }
          ]
        };
      } catch (m) {
        return _t(l.errorPrefix, m);
      }
    }
  );
  for (const [d, m] of Object.entries(Of)) {
    const p = lo[d];
    p && t.registerTool(
      d,
      {
        title: m.title,
        description: m.description,
        inputSchema: ks(m.params),
        annotations: m.annotations
      },
      async (S) => {
        const { siteId: T, ...j } = S;
        try {
          const y = T, A = await p({
            run: (...z) => r(y, "run", z),
            request: (...z) => r(y, "request", z),
            goTo: (...z) => r(y, "goTo", z),
            getCurrentURL: () => r(y, "getCurrentURL", []),
            readFileAsText: (...z) => r(
              y,
              "readFileAsText",
              z
            ),
            writeFile: (...z) => r(y, "writeFile", z),
            listFiles: (...z) => r(y, "listFiles", z),
            mkdirTree: (...z) => r(y, "mkdirTree", z),
            unlink: (...z) => r(y, "unlink", z),
            rmdir: (...z) => r(y, "rmdir", z),
            fileExists: (...z) => r(y, "fileExists", z)
          }, j);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(A)
              }
            ]
          };
        } catch (y) {
          return _t(m.errorPrefix, y);
        }
      }
    );
  }
}
function kp() {
  const t = process.argv.find((e) => e.startsWith("--port="));
  return t ? Number(t.split("=")[1]) : 0;
}
async function Sp() {
  const t = new Af();
  await t.startWebSocketServer(kp());
  const e = t.getPort(), n = bp();
  wp(n, t, e);
  const r = new zf();
  await n.connect(r), console.error("[MCP] WordPress Playground MCP server running on stdio");
}
Sp().catch((t) => {
  console.error("Fatal error:", t), process.exit(1);
});
//# sourceMappingURL=index.js.map
