import o, { forwardRef as Bt, useMemo as Nt, useState as Q, useRef as M, useEffect as I, useImperativeHandle as Wt, useLayoutEffect as Gt, useCallback as ft } from "react";
import { dirname as Oe, joinPaths as We, basename as Ot, normalizePath as At } from "@php-wasm/util";
import { __experimentalTreeGrid as Kt, Popover as qt, NavigableMenu as Jt, MenuItem as qe, __experimentalTreeGridRow as Xt, __experimentalTreeGridCell as Qt, Button as mt, Modal as er, Icon as Ft, Notice as tr } from "@wordpress/components";
import et from "classnames";
import { forwardRef as Ht, cloneElement as rr, createElement as nr } from "@wordpress/element";
import ar from "clsx";
import { Compartment as Tt, EditorSelection as pt, EditorState as or } from "@codemirror/state";
import { ViewPlugin as ir, lineNumbers as sr, highlightActiveLineGutter as lr, highlightActiveLine as cr, dropCursor as ur, rectangularSelection as fr, crosshairCursor as dr, EditorView as Qe, keymap as mr } from "@codemirror/view";
import { history as pr, historyKeymap as hr, defaultKeymap as wr, indentWithTab as vr } from "@codemirror/commands";
import { highlightSelectionMatches as gr, searchKeymap as Er } from "@codemirror/search";
import { closeBrackets as yr, autocompletion as _r, closeBracketsKeymap as br, completionKeymap as Cr } from "@codemirror/autocomplete";
import { foldGutter as xr, syntaxHighlighting as Rr, defaultHighlightStyle as Tr, indentOnInput as Pr, bracketMatching as kr, foldKeymap as Sr } from "@codemirror/language";
import { php as tt } from "@codemirror/lang-php";
import { FilePickerTree as Nr, BinaryFilePreview as Dr } from "@wp-playground/components";
import { logger as dt } from "@php-wasm/logger";
import Lt from "@php-wasm/universal/mime-types";
const fa = (n) => /* @__PURE__ */ o.createElement(
  "svg",
  {
    width: "32",
    height: "32",
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...n
  },
  /* @__PURE__ */ o.createElement(
    "rect",
    {
      width: "10.4176",
      height: "10.4176",
      rx: "3.86258",
      transform: "matrix(0.829038 -0.559193 0.838671 0.544639 7.45703 24.1775)",
      stroke: "white",
      strokeWidth: "0.965644"
    }
  ),
  /* @__PURE__ */ o.createElement(
    "rect",
    {
      width: "13.2346",
      height: "13.2346",
      rx: "3.86258",
      transform: "matrix(0.829038 -0.559193 0.838671 0.544639 5.0918 18.9934)",
      stroke: "white",
      strokeWidth: "1.44847"
    }
  ),
  /* @__PURE__ */ o.createElement(
    "rect",
    {
      width: "17.451",
      height: "17.451",
      rx: "3.86258",
      transform: "matrix(0.829038 -0.559193 0.838671 0.544639 1.55371 11.6099)",
      stroke: "white",
      strokeWidth: "1.93129"
    }
  )
), da = (n) => /* @__PURE__ */ o.createElement(
  "svg",
  {
    width: "16",
    height: "17",
    viewBox: "0 0 16 17",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...n
  },
  /* @__PURE__ */ o.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8 15C4.41015 15 1.5 12.0899 1.5 8.5C1.5 4.91015 4.41015 2 8 2C11.5899 2 14.5 4.91015 14.5 8.5C14.5 12.0899 11.5899 15 8 15ZM0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5ZM9 9.5V4.5H7.5V8H5.5V9.5H9Z",
      fill: "#949494"
    }
  )
), ma = (n) => /* @__PURE__ */ o.createElement(
  "svg",
  {
    width: "20",
    height: "21",
    viewBox: "0 0 20 21",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...n
  },
  /* @__PURE__ */ o.createElement(
    "path",
    {
      d: "M20 10.5C20 4.99 15.51 0.5 10 0.5C4.48 0.5 0 4.99 0 10.5C0 16.02 4.48 20.5 10 20.5C15.51 20.5 20 16.02 20 10.5ZM7.78 15.87L4.37 6.72C4.92 6.7 5.54 6.64 5.54 6.64C6.04 6.58 5.98 5.51 5.48 5.53C5.48 5.53 4.03 5.64 3.11 5.64C2.93 5.64 2.74 5.64 2.53 5.63C4.12 3.19 6.87 1.61 10 1.61C12.33 1.61 14.45 2.48 16.05 3.95C15.37 3.84 14.4 4.34 14.4 5.53C14.4 6.27 14.85 6.89 15.3 7.63C15.65 8.24 15.85 8.99 15.85 10.09C15.85 11.58 14.45 15.09 14.45 15.09L11.42 6.72C11.96 6.7 12.24 6.55 12.24 6.55C12.74 6.5 12.68 5.3 12.18 5.33C12.18 5.33 10.74 5.45 9.8 5.45C8.93 5.45 7.47 5.33 7.47 5.33C6.97 5.3 6.91 6.53 7.41 6.55L8.33 6.63L9.59 10.04L7.78 15.87ZM17.41 10.5C17.65 9.86 18.15 8.63 17.84 6.25C18.54 7.54 18.89 8.96 18.89 10.5C18.89 13.79 17.16 16.74 14.49 18.28C15.46 15.69 16.43 13.08 17.41 10.5ZM6.1 18.59C3.12 17.15 1.11 14.03 1.11 10.5C1.11 9.2 1.34 8.02 1.83 6.91C3.25 10.8 4.67 14.7 6.1 18.59ZM10.13 11.96L12.71 18.94C11.85 19.23 10.95 19.39 10 19.39C9.21 19.39 8.43 19.28 7.71 19.06C8.52 16.68 9.33 14.32 10.13 11.96Z",
      fill: "#ffffff"
    }
  )
), Or = /* @__PURE__ */ o.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "15",
    height: "14",
    viewBox: "0 0 15 14",
    fill: "none"
  },
  /* @__PURE__ */ o.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M7.59196 3.59524L6.77745 1.96623C6.70755 1.82641 6.56464 1.7381 6.40832 1.7381H1.65079C1.42287 1.7381 1.2381 1.92287 1.2381 2.15079V11.8492C1.2381 12.0771 1.42287 12.2619 1.65079 12.2619H13.2063C13.4343 12.2619 13.619 12.0771 13.619 11.8492V4.00794C13.619 3.78001 13.4343 3.59524 13.2063 3.59524H7.59196ZM8.35714 2.35714L7.88484 1.41254C7.60521 0.853274 7.0336 0.5 6.40832 0.5H1.65079C0.739085 0.5 0 1.23909 0 2.15079V11.8492C0 12.7609 0.739085 13.5 1.65079 13.5H13.2063C14.1181 13.5 14.8571 12.7609 14.8571 11.8492V4.00794C14.8571 3.09623 14.1181 2.35714 13.2063 2.35714H8.35714Z"
    }
  )
), Ar = /* @__PURE__ */ o.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    fill: "currentColor",
    className: "bi bi-file-earmark",
    viewBox: "0 0 16 16"
  },
  /* @__PURE__ */ o.createElement("path", { d: "M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" })
), pa = (n) => /* @__PURE__ */ o.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "18",
    height: "18",
    viewBox: "0 0 14 14",
    fill: "none",
    ...n
  },
  /* @__PURE__ */ o.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M7 12.6875C3.85888 12.6875 1.3125 10.1411 1.3125 7C1.3125 3.85888 3.85888 1.3125 7 1.3125C10.1411 1.3125 12.6875 3.85888 12.6875 7C12.6875 10.1411 10.1411 12.6875 7 12.6875ZM0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7ZM7.875 7.875V3.5H6.5625V6.5625H4.8125V7.875H7.875Z",
      fill: "#949494"
    }
  )
), ha = /* @__PURE__ */ o.createElement(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  },
  /* @__PURE__ */ o.createElement(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12.25 1.3125H1.75C1.50838 1.3125 1.3125 1.50838 1.3125 1.75V4.37495H12.6875V1.75C12.6875 1.50837 12.4916 1.3125 12.25 1.3125ZM12.6875 5.68745H5.25003V12.6875H12.25C12.4916 12.6875 12.6875 12.4916 12.6875 12.25V5.68745ZM3.93753 5.68745H1.3125V12.25C1.3125 12.4916 1.50837 12.6875 1.75 12.6875H3.93753L3.93753 5.68745ZM1.75 0H12.25C13.2165 0 14 0.783502 14 1.75V12.25C14 13.2165 13.2165 14 12.25 14H1.75C0.783502 14 0 13.2165 0 12.25V1.75C0 0.783502 0.783502 0 1.75 0Z",
      fill: "#949494"
    }
  )
);
function wa(n) {
  return `data:${n.mime};base64,${n.data}`;
}
function va({
  size: n = 24,
  sidebarActive: u = !1
}) {
  return /* @__PURE__ */ o.createElement(
    "svg",
    {
      width: n,
      height: n,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    },
    /* @__PURE__ */ o.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
    u ? /* @__PURE__ */ o.createElement(
      "rect",
      {
        x: "3",
        y: "3",
        width: "7",
        height: "18",
        rx: "2",
        ry: "2",
        fill: "currentColor"
      }
    ) : /* @__PURE__ */ o.createElement(
      "rect",
      {
        x: "3",
        y: "3",
        width: "8",
        height: "18",
        rx: "2",
        ry: "2",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2"
      }
    )
  );
}
const jt = Ht(({
  icon: n,
  size: u = 24,
  ...l
}, m) => rr(n, {
  width: u,
  height: u,
  ...l,
  ref: m
}));
var Dt = { exports: {} }, Je = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var It;
function Fr() {
  if (It) return Je;
  It = 1;
  var n = o, u = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, E = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function k(V, T, y) {
    var v, N = {}, P = null, j = null;
    y !== void 0 && (P = "" + y), T.key !== void 0 && (P = "" + T.key), T.ref !== void 0 && (j = T.ref);
    for (v in T) m.call(T, v) && !g.hasOwnProperty(v) && (N[v] = T[v]);
    if (V && V.defaultProps) for (v in T = V.defaultProps, T) N[v] === void 0 && (N[v] = T[v]);
    return { $$typeof: u, type: V, key: P, ref: j, props: N, _owner: E.current };
  }
  return Je.Fragment = l, Je.jsx = k, Je.jsxs = k, Je;
}
var Xe = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Mt;
function Lr() {
  return Mt || (Mt = 1, process.env.NODE_ENV !== "production" && function() {
    var n = o, u = Symbol.for("react.element"), l = Symbol.for("react.portal"), m = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), k = Symbol.for("react.provider"), V = Symbol.for("react.context"), T = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), j = Symbol.for("react.offscreen"), Z = Symbol.iterator, A = "@@iterator";
    function D(e) {
      if (e === null || typeof e != "object")
        return null;
      var c = Z && e[Z] || e[A];
      return typeof c == "function" ? c : null;
    }
    var p = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(e) {
      {
        for (var c = arguments.length, f = new Array(c > 1 ? c - 1 : 0), R = 1; R < c; R++)
          f[R - 1] = arguments[R];
        q("error", e, f);
      }
    }
    function q(e, c, f) {
      {
        var R = p.ReactDebugCurrentFrame, $ = R.getStackAddendum();
        $ !== "" && (c += "%s", f = f.concat([$]));
        var Y = f.map(function(L) {
          return String(L);
        });
        Y.unshift("Warning: " + c), Function.prototype.apply.call(console[e], console, Y);
      }
    }
    var B = !1, G = !1, ee = !1, W = !1, F = !1, te;
    te = Symbol.for("react.module.reference");
    function _(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === m || e === g || F || e === E || e === y || e === v || W || e === j || B || G || ee || typeof e == "object" && e !== null && (e.$$typeof === P || e.$$typeof === N || e.$$typeof === k || e.$$typeof === V || e.$$typeof === T || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === te || e.getModuleId !== void 0));
    }
    function H(e, c, f) {
      var R = e.displayName;
      if (R)
        return R;
      var $ = c.displayName || c.name || "";
      return $ !== "" ? f + "(" + $ + ")" : f;
    }
    function de(e) {
      return e.displayName || "Context";
    }
    function ae(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case m:
          return "Fragment";
        case l:
          return "Portal";
        case g:
          return "Profiler";
        case E:
          return "StrictMode";
        case y:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case V:
            var c = e;
            return de(c) + ".Consumer";
          case k:
            var f = e;
            return de(f._context) + ".Provider";
          case T:
            return H(e, e.render, "ForwardRef");
          case N:
            var R = e.displayName || null;
            return R !== null ? R : ae(e.type) || "Memo";
          case P: {
            var $ = e, Y = $._payload, L = $._init;
            try {
              return ae(L(Y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var re = Object.assign, ue = 0, oe, be, Re, Te, Pe, le, S;
    function C() {
    }
    C.__reactDisabledLog = !0;
    function J() {
      {
        if (ue === 0) {
          oe = console.log, be = console.info, Re = console.warn, Te = console.error, Pe = console.group, le = console.groupCollapsed, S = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: C,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        ue++;
      }
    }
    function z() {
      {
        if (ue--, ue === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: re({}, e, {
              value: oe
            }),
            info: re({}, e, {
              value: be
            }),
            warn: re({}, e, {
              value: Re
            }),
            error: re({}, e, {
              value: Te
            }),
            group: re({}, e, {
              value: Pe
            }),
            groupCollapsed: re({}, e, {
              value: le
            }),
            groupEnd: re({}, e, {
              value: S
            })
          });
        }
        ue < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ie = p.ReactCurrentDispatcher, Ee;
    function ve(e, c, f) {
      {
        if (Ee === void 0)
          try {
            throw Error();
          } catch ($) {
            var R = $.stack.trim().match(/\n( *(at )?)/);
            Ee = R && R[1] || "";
          }
        return `
` + Ee + e;
      }
    }
    var ce = !1, U;
    {
      var h = typeof WeakMap == "function" ? WeakMap : Map;
      U = new h();
    }
    function ge(e, c) {
      if (!e || ce)
        return "";
      {
        var f = U.get(e);
        if (f !== void 0)
          return f;
      }
      var R;
      ce = !0;
      var $ = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Y;
      Y = ie.current, ie.current = null, J();
      try {
        if (c) {
          var L = function() {
            throw Error();
          };
          if (Object.defineProperty(L.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(L, []);
            } catch (he) {
              R = he;
            }
            Reflect.construct(e, [], L);
          } else {
            try {
              L.call();
            } catch (he) {
              R = he;
            }
            e.call(L.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (he) {
            R = he;
          }
          e();
        }
      } catch (he) {
        if (he && R && typeof he.stack == "string") {
          for (var O = he.stack.split(`
`), pe = R.stack.split(`
`), ne = O.length - 1, se = pe.length - 1; ne >= 1 && se >= 0 && O[ne] !== pe[se]; )
            se--;
          for (; ne >= 1 && se >= 0; ne--, se--)
            if (O[ne] !== pe[se]) {
              if (ne !== 1 || se !== 1)
                do
                  if (ne--, se--, se < 0 || O[ne] !== pe[se]) {
                    var _e = `
` + O[ne].replace(" at new ", " at ");
                    return e.displayName && _e.includes("<anonymous>") && (_e = _e.replace("<anonymous>", e.displayName)), typeof e == "function" && U.set(e, _e), _e;
                  }
                while (ne >= 1 && se >= 0);
              break;
            }
        }
      } finally {
        ce = !1, ie.current = Y, z(), Error.prepareStackTrace = $;
      }
      var Be = e ? e.displayName || e.name : "", je = Be ? ve(Be) : "";
      return typeof e == "function" && U.set(e, je), je;
    }
    function me(e, c, f) {
      return ge(e, !1);
    }
    function ye(e) {
      var c = e.prototype;
      return !!(c && c.isReactComponent);
    }
    function ke(e, c, f) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, ye(e));
      if (typeof e == "string")
        return ve(e);
      switch (e) {
        case y:
          return ve("Suspense");
        case v:
          return ve("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case T:
            return me(e.render);
          case N:
            return ke(e.type, c, f);
          case P: {
            var R = e, $ = R._payload, Y = R._init;
            try {
              return ke(Y($), c, f);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, Ae = {}, ze = p.ReactDebugCurrentFrame;
    function Me(e) {
      if (e) {
        var c = e._owner, f = ke(e.type, e._source, c ? c.type : null);
        ze.setExtraStackFrame(f);
      } else
        ze.setExtraStackFrame(null);
    }
    function Ue(e, c, f, R, $) {
      {
        var Y = Function.call.bind(Ne);
        for (var L in e)
          if (Y(e, L)) {
            var O = void 0;
            try {
              if (typeof e[L] != "function") {
                var pe = Error((R || "React class") + ": " + f + " type `" + L + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[L] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw pe.name = "Invariant Violation", pe;
              }
              O = e[L](c, L, R, f, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              O = ne;
            }
            O && !(O instanceof Error) && (Me($), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", R || "React class", f, L, typeof O), Me(null)), O instanceof Error && !(O.message in Ae) && (Ae[O.message] = !0, Me($), b("Failed %s type: %s", f, O.message), Me(null));
          }
      }
    }
    var ht = Array.isArray;
    function Fe(e) {
      return ht(e);
    }
    function wt(e) {
      {
        var c = typeof Symbol == "function" && Symbol.toStringTag, f = c && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return f;
      }
    }
    function vt(e) {
      try {
        return at(e), !1;
      } catch {
        return !0;
      }
    }
    function at(e) {
      return "" + e;
    }
    function ot(e) {
      if (vt(e))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wt(e)), at(e);
    }
    var it = p.ReactCurrentOwner, gt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, st, Le;
    function Ve(e) {
      if (Ne.call(e, "ref")) {
        var c = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Et(e) {
      if (Ne.call(e, "key")) {
        var c = Object.getOwnPropertyDescriptor(e, "key").get;
        if (c && c.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function yt(e, c) {
      typeof e.ref == "string" && it.current;
    }
    function _t(e, c) {
      {
        var f = function() {
          st || (st = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: f,
          configurable: !0
        });
      }
    }
    function bt(e, c) {
      {
        var f = function() {
          Le || (Le = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", c));
        };
        f.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: f,
          configurable: !0
        });
      }
    }
    var Ct = function(e, c, f, R, $, Y, L) {
      var O = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: u,
        // Built-in properties that belong on the element
        type: e,
        key: c,
        ref: f,
        props: L,
        // Record the component responsible for creating this element.
        _owner: Y
      };
      return O._store = {}, Object.defineProperty(O._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(O, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: R
      }), Object.defineProperty(O, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    };
    function lt(e, c, f, R, $) {
      {
        var Y, L = {}, O = null, pe = null;
        f !== void 0 && (ot(f), O = "" + f), Et(c) && (ot(c.key), O = "" + c.key), Ve(c) && (pe = c.ref, yt(c, $));
        for (Y in c)
          Ne.call(c, Y) && !gt.hasOwnProperty(Y) && (L[Y] = c[Y]);
        if (e && e.defaultProps) {
          var ne = e.defaultProps;
          for (Y in ne)
            L[Y] === void 0 && (L[Y] = ne[Y]);
        }
        if (O || pe) {
          var se = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          O && _t(L, se), pe && bt(L, se);
        }
        return Ct(e, O, pe, $, R, it.current, L);
      }
    }
    var $e = p.ReactCurrentOwner, Ye = p.ReactDebugCurrentFrame;
    function De(e) {
      if (e) {
        var c = e._owner, f = ke(e.type, e._source, c ? c.type : null);
        Ye.setExtraStackFrame(f);
      } else
        Ye.setExtraStackFrame(null);
    }
    var Ze;
    Ze = !1;
    function Ge(e) {
      return typeof e == "object" && e !== null && e.$$typeof === u;
    }
    function ct() {
      {
        if ($e.current) {
          var e = ae($e.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function xt(e) {
      return "";
    }
    var ut = {};
    function t(e) {
      {
        var c = ct();
        if (!c) {
          var f = typeof e == "string" ? e : e.displayName || e.name;
          f && (c = `

Check the top-level render call using <` + f + ">.");
        }
        return c;
      }
    }
    function r(e, c) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var f = t(c);
        if (ut[f])
          return;
        ut[f] = !0;
        var R = "";
        e && e._owner && e._owner !== $e.current && (R = " It was passed a child from " + ae(e._owner.type) + "."), De(e), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', f, R), De(null);
      }
    }
    function a(e, c) {
      {
        if (typeof e != "object")
          return;
        if (Fe(e))
          for (var f = 0; f < e.length; f++) {
            var R = e[f];
            Ge(R) && r(R, c);
          }
        else if (Ge(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var $ = D(e);
          if (typeof $ == "function" && $ !== e.entries)
            for (var Y = $.call(e), L; !(L = Y.next()).done; )
              Ge(L.value) && r(L.value, c);
        }
      }
    }
    function s(e) {
      {
        var c = e.type;
        if (c == null || typeof c == "string")
          return;
        var f;
        if (typeof c == "function")
          f = c.propTypes;
        else if (typeof c == "object" && (c.$$typeof === T || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        c.$$typeof === N))
          f = c.propTypes;
        else
          return;
        if (f) {
          var R = ae(c);
          Ue(f, e.props, "prop", R, e);
        } else if (c.PropTypes !== void 0 && !Ze) {
          Ze = !0;
          var $ = ae(c);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $ || "Unknown");
        }
        typeof c.getDefaultProps == "function" && !c.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function i(e) {
      {
        for (var c = Object.keys(e.props), f = 0; f < c.length; f++) {
          var R = c[f];
          if (R !== "children" && R !== "key") {
            De(e), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", R), De(null);
            break;
          }
        }
        e.ref !== null && (De(e), b("Invalid attribute `ref` supplied to `React.Fragment`."), De(null));
      }
    }
    var w = {};
    function d(e, c, f, R, $, Y) {
      {
        var L = _(e);
        if (!L) {
          var O = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (O += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var pe = xt();
          pe ? O += pe : O += ct();
          var ne;
          e === null ? ne = "null" : Fe(e) ? ne = "array" : e !== void 0 && e.$$typeof === u ? (ne = "<" + (ae(e.type) || "Unknown") + " />", O = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof e, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, O);
        }
        var se = lt(e, c, f, $, Y);
        if (se == null)
          return se;
        if (L) {
          var _e = c.children;
          if (_e !== void 0)
            if (R)
              if (Fe(_e)) {
                for (var Be = 0; Be < _e.length; Be++)
                  a(_e[Be], e);
                Object.freeze && Object.freeze(_e);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              a(_e, e);
        }
        if (Ne.call(c, "key")) {
          var je = ae(e), he = Object.keys(c).filter(function(Zt) {
            return Zt !== "key";
          }), Rt = he.length > 0 ? "{key: someKey, " + he.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!w[je + Rt]) {
            var Yt = he.length > 0 ? "{" + he.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Rt, je, Yt, je), w[je + Rt] = !0;
          }
        }
        return e === m ? i(se) : s(se), se;
      }
    }
    function x(e, c, f) {
      return d(e, c, f, !0);
    }
    function X(e, c, f) {
      return d(e, c, f, !1);
    }
    var Se = X, Ke = x;
    Xe.Fragment = m, Xe.jsx = Se, Xe.jsxs = Ke;
  }()), Xe;
}
process.env.NODE_ENV === "production" ? Dt.exports = Fr() : Dt.exports = Lr();
var xe = Dt.exports, rt = (n) => nr("path", n), nt = Ht(
  /**
   * @param {SVGProps}                          props isPressed indicates whether the SVG should appear as pressed.
   *                                                  Other props will be passed through to svg component.
   * @param {React.ForwardedRef<SVGSVGElement>} ref   The forwarded ref to the SVG element.
   *
   * @return {React.JSX.Element} Stop component
   */
  ({ className: n, isPressed: u, ...l }, m) => {
    const E = {
      ...l,
      className: ar(n, { "is-pressed": u }) || void 0,
      "aria-hidden": !0,
      focusable: !1
    };
    return /* @__PURE__ */ xe.jsx("svg", { ...E, ref: m });
  }
);
nt.displayName = "SVG";
const jr = /* @__PURE__ */ xe.jsx(nt, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /* @__PURE__ */ xe.jsx(rt, {
    d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"
  })
}), Ir = /* @__PURE__ */ xe.jsx(nt, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /* @__PURE__ */ xe.jsx(rt, {
    d: "M10.6 6L9.4 7l4.6 5-4.6 5 1.2 1 5.4-6z"
  })
}), Mr = /* @__PURE__ */ xe.jsx(nt, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /* @__PURE__ */ xe.jsx(rt, {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.848 8a1 1 0 0 1-.914-.594l-.723-1.63a.5.5 0 0 0-.447-.276H5a.5.5 0 0 0-.5.5v11.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-9A.5.5 0 0 0 19 8h-6.152Zm.612-1.5a.5.5 0 0 1-.462-.31l-.445-1.084A2 2 0 0 0 10.763 4H5a2 2 0 0 0-2 2v11.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-5.54Z"
  })
}), Vr = /* @__PURE__ */ xe.jsxs(nt, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: [/* @__PURE__ */ xe.jsx(rt, {
    d: "M15.5 7.5h-7V9h7V7.5Zm-7 3.5h7v1.5h-7V11Zm7 3.5h-7V16h7v-1.5Z"
  }), /* @__PURE__ */ xe.jsx(rt, {
    d: "M17 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM7 5.5h10a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5Z"
  })]
}), $r = "_file-picker-tree_3rwm2_1", Br = "_file-node-button_3rwm2_17", Wr = "_selected_3rwm2_53", Hr = "_focused_3rwm2_65", zr = "_dropTarget_3rwm2_70", Ur = "_dropTargetInvalid_3rwm2_79", Yr = "_renaming_3rwm2_88", Zr = "_renameInput_3rwm2_93", Gr = "_file-name_3rwm2_108", we = {
  filePickerTree: $r,
  fileNodeButton: Br,
  selected: Wr,
  focused: Hr,
  dropTarget: zr,
  dropTargetInvalid: Ur,
  renaming: Yr,
  renameInput: Zr,
  fileName: Gr
};
function Pt(n) {
  if (!n) return [];
  const u = n.replaceAll(/\\+/g, "/").replace(/\/{2,}/g, "/").replace(/\/$/, "") || n, l = u.startsWith("/"), m = u.split("/").filter(Boolean), E = [];
  let g = l ? "/" : "";
  l && E.push("/");
  for (const k of m)
    !g || g === "/" ? g = g === "/" ? `/${k}` : k : g = `${g}/${k}`, E.push(g);
  return E;
}
function Kr(n, u) {
  if (!n || !u || n === u) return !1;
  const l = n === "/" ? "/" : n.replace(/\/{2,}/g, "/"), m = u.replace(/\/{2,}/g, "/");
  return l === "/" ? m.startsWith("/") && m !== "/" : m.startsWith(`${l}/`);
}
function kt(n, u, l) {
  return n && (n === u ? l : n.startsWith(u === "/" ? "/" : `${u}/`) ? l + n.slice(u.length) : n);
}
const qr = Bt(function({
  withContextMenu: u = !0,
  filesystem: l,
  root: m = "/wordpress",
  initialSelectedPath: E,
  onSelect: g = () => {
  },
  onDoubleClickFile: k
}, V) {
  const T = Nt(() => {
    let t = (m || "/").replace(/\\+/g, "/");
    return t.startsWith("/") || (t = `/${t}`), t = t.replace(/\/{2,}/g, "/"), t.length > 1 && t.endsWith("/") && (t = t.slice(0, -1)), t || "/";
  }, [m]), y = (t) => !t || t === "." || t === ".." ? !1 : !/[\\/]/.test(t), [v, N] = Q(() => {
    if (!E)
      return {};
    const t = {};
    for (const r of Pt(E))
      t[r] = !0;
    return t;
  }), [P, j] = Q(
    () => E ?? null
  ), [Z, A] = Q(
    () => E ?? null
  ), [D, p] = Q({}), [b, q] = Q(
    {}
  ), [B, G] = Q(null), [ee, W] = Q(
    null
  ), F = M({}), te = M(!1), _ = M(null), H = M(null), de = M(b), ae = M(D), re = () => {
    for (const t of Object.keys(F.current))
      clearTimeout(F.current[t]), delete F.current[t];
  }, ue = (t) => {
    const r = F.current[t];
    r && (clearTimeout(r), delete F.current[t]);
  };
  I(() => {
    de.current = b;
  }, [b]), I(() => {
    ae.current = D;
  }, [D]);
  const oe = (t) => {
    var a;
    const r = (a = _.current) == null ? void 0 : a.querySelector(
      `[data-path="${t}"]`
    );
    r && typeof r.focus == "function" && (r.focus(), r.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    }));
  }, be = (t, r = "") => (r ? `${r}/${t.name}` : t.name).replaceAll(/\\+/g, "/").replace(/\/{2,}/g, "/"), Re = (t, r) => t.children ? t.children : D[r], Te = async (t, r) => {
    const a = await t.listFiles(r), s = [];
    for (const i of a) {
      const w = r === "/" ? `/${i}` : `${r}/${i}`, d = await t.isDir(w);
      s.push({ name: i, type: d ? "folder" : "file" });
    }
    return s.sort((i, w) => {
      var Se;
      if (i.type !== w.type) return i.type === "folder" ? -1 : 1;
      const d = r === "/" ? `/${i.name}` : `${r}/${i.name}`, x = r === "/" ? `/${w.name}` : `${r}/${w.name}`, X = (Se = ye.current) == null ? void 0 : Se.tempPath;
      if (X) {
        if (d === X) return -1;
        if (x === X) return 1;
      }
      return i.name.localeCompare(w.name);
    }), s;
  }, Pe = async (t) => await Te(l, t), le = (t, r) => {
    if (r.type !== "folder")
      return r.children;
    const a = r.children ?? ae.current[t];
    return a || de.current[t] ? a : (q((s) => ({ ...s, [t]: !0 })), new Promise((s) => {
      Pe(t).then((i) => {
        p((w) => ({
          ...w,
          [t]: i ?? []
        })), s(i ?? []);
      }).catch(() => {
        s([]);
      }).finally(() => {
        q((i) => {
          const w = { ...i };
          return delete w[t], w;
        });
      });
    }));
  }, S = (t, r) => {
    r.type === "folder" && (typeof window > "u" || F.current[t] || (F.current[t] = window.setTimeout(() => {
      N((a) => a[t] ? a : { ...a, [t]: !0 }), le(t, r), delete F.current[t];
    }, 600)));
  }, C = (t) => (q((r) => ({ ...r, [t]: !0 })), new Promise((r) => {
    Pe(t).then((a) => {
      p((s) => ({
        ...s,
        [t]: a ?? []
      })), r(a ?? []);
    }).catch(() => {
      r([]);
    }).finally(() => {
      q((a) => {
        const s = { ...a };
        return delete s[t], s;
      });
    });
  })), J = (t, r, a) => {
    N((s) => ({
      ...s,
      [t]: a
    })), a ? le(t, r) : p((s) => {
      if (s[t] === void 0)
        return s;
      const i = { ...s };
      return delete i[t], i;
    });
  }, z = async (t) => {
    if (!t) return;
    const r = Pt(t);
    if (r.length === 0) return;
    N((i) => {
      const w = { ...i };
      for (const d of r)
        w[d] = !0;
      return w;
    });
    let a = [
      { name: T, type: "folder" }
    ], s = "";
    for (const i of r) {
      const w = a == null ? void 0 : a.find((x) => be(x, s) === i);
      if (!w || w.type !== "folder") {
        s = i, a = [];
        continue;
      }
      a = await le(i, w) ?? ae.current[i], s = i;
    }
  }, ie = (t, r) => {
    if (!t || !r || t === r)
      return;
    const a = t === "/" ? "/" : `${t}/`, s = (i) => i === t ? r : i.startsWith(a) ? r + i.slice(t.length) : null;
    N((i) => {
      let w = !1;
      const d = { ...i };
      for (const x of Object.keys(i)) {
        const X = s(x);
        X && X !== x && (d[X] = i[x], delete d[x], w = !0);
      }
      return w ? d : i;
    }), p((i) => {
      let w = !1;
      const d = { ...i };
      for (const x of Object.keys(i)) {
        const X = s(x);
        X && X !== x && (d[X] = i[x], delete d[x], w = !0);
      }
      return w ? d : i;
    }), j((i) => i && (s(i) ?? i)), A((i) => i && (s(i) ?? i));
  }, Ee = () => {
    G(null), W(null), re();
  }, ve = (t, r = !0) => {
    j(t), r && g(t);
  }, ce = Nt(() => [{ name: T, type: "folder" }], [T]), [U, h] = Q(null), [ge, me] = Q(null), ye = M(null), ke = ge;
  Wt(
    V,
    () => ({
      focusPath: (t, r = {}) => {
        if (!t) return;
        const {
          select: a = !0,
          domFocus: s = !0,
          notify: i = !1
        } = r;
        a && ve(t, i), A(t), s && oe(t);
      },
      selectPath: (t) => {
        t && (ve(t), A(t), oe(t));
      },
      getSelectedPath: () => P,
      expandToPath: async (t) => await z(t),
      refresh: async (t) => await C(t),
      remapPath: ie,
      createFile: async (t) => {
        await Ve(t, "file", "untitled.php");
      },
      createFolder: async (t) => {
        await Ve(t, "folder", "New Folder");
      }
    }),
    [P, C, ie, z]
  );
  const Ne = M(!1), Ae = M(
    E ?? null
  ), ze = M(E);
  I(() => {
    te.current = !1;
  }, [T]), I(() => {
    E && E !== ze.current ? Ae.current = E : E || (Ae.current = null), ze.current = E;
  }, [E]), I(() => {
    if (!E || Ne.current)
      return;
    Ne.current = !0;
    const t = Pt(E);
    N((a) => {
      const s = { ...a };
      for (const i of t)
        s[i] = !0;
      return s;
    });
    const r = t[t.length - 1] || E;
    A(r), j(r), z(E);
  }, [E, z]), I(() => {
    const t = Ae.current;
    !t || ce.length === 0 || (Ae.current = null, z(t));
  }, [ce, z]), I(() => {
    if (!Z) {
      if (ce.length > 0) {
        const t = be(ce[0]);
        A(t);
      }
      return;
    }
    ke && ke === Z || oe(Z);
  }, [ce, Z, ke]), I(() => {
    if (ce.length === 0)
      return;
    const t = ce[0];
    if ((t == null ? void 0 : t.type) !== "folder" || te.current)
      return;
    const r = t.name;
    te.current = !0, N(
      (a) => a[r] ? a : { ...a, [r]: !0 }
    ), !ae.current[r] && !de.current[r] && le(r, t);
  }, [ce, le, T]), I(() => () => {
    H.current && clearTimeout(H.current), re();
  }, []), I(() => {
    U && setTimeout(() => {
      const t = document.querySelector(
        '[role="menu"] [role="menuitem"]'
      );
      t && typeof t.focus == "function" && t.focus();
    }, 0);
  }, [U]);
  const [Me, Ue] = Q(""), ht = (t, r) => {
    if (t.type === "folder")
      return r;
    const a = Oe(r);
    return a && a || "/";
  }, Fe = (t, r, a) => {
    const s = ht(t, r);
    if (!s)
      return { allowed: !1, state: "invalid", destination: null };
    if (a) {
      if (s === a)
        return { allowed: !1, state: "invalid", destination: null };
      if (Kr(a, s))
        return { allowed: !1, state: "invalid", destination: null };
    }
    return { allowed: !0, state: "valid", destination: s };
  }, wt = (t, r, a) => {
    r.type !== "folder" && r.type !== "file" || (G(a), W(null), t.dataTransfer && (t.dataTransfer.effectAllowed = "move", t.dataTransfer.setData(
      "application/x-wp-playground-path",
      a
    ), t.dataTransfer.setData("text/plain", a)));
  }, vt = () => {
    Ee();
  }, at = (t, r, a) => {
    const s = Fe(r, a, B);
    s.allowed && r.type === "folder" && S(a, r), W((i) => (i == null ? void 0 : i.path) === a && i.state === s.state ? i : { path: a, state: s.state });
  }, ot = (t, r, a) => {
    const s = Fe(r, a, B);
    s.allowed && s.destination ? (t.preventDefault(), t.dataTransfer && (t.dataTransfer.dropEffect = B ? "move" : "copy"), r.type === "folder" && S(a, r), W((i) => (i == null ? void 0 : i.path) === a && i.state === s.state ? i : { path: a, state: s.state })) : (t.dataTransfer && (t.dataTransfer.dropEffect = "none"), ue(a), W((i) => (i == null ? void 0 : i.path) === a && i.state === "invalid" ? i : { path: a, state: "invalid" }));
  }, it = (t, r, a) => {
    ue(a);
    const s = t.relatedTarget;
    s && t.currentTarget.contains(s) || W((i) => (i == null ? void 0 : i.path) === a ? null : i);
  }, gt = async (t, r, a) => {
    const s = B, i = Fe(r, a, s);
    if (!i.allowed || !i.destination) {
      Ee();
      return;
    }
    t.preventDefault(), t.stopPropagation(), ue(a), W(null);
    try {
      s ? await _t(s, i.destination) : await De(t, i.destination);
    } finally {
      Ee();
    }
  }, st = (t, r, a) => {
    u && (t.preventDefault(), t.stopPropagation(), me(null), h({
      absPath: a,
      type: r.type,
      x: t.clientX,
      y: t.clientY
    }));
  }, Le = async (t, r) => {
    let a = r, s = 0;
    const i = (d) => {
      const x = d.lastIndexOf(".");
      return x > 0 ? { stem: d.slice(0, x), ext: d.slice(x) } : { stem: d, ext: "" };
    }, w = t === "/" ? "" : t;
    for (; await (l == null ? void 0 : l.fileExists(`${w}/${a}`)) || await (l == null ? void 0 : l.isDir(`${w}/${a}`)); ) {
      s += 1;
      const { stem: d, ext: x } = i(r);
      a = `${d} (${s})${x}`;
    }
    return a;
  }, Ve = async (t, r, a) => {
    if (!l) return;
    let s = t || P || T;
    try {
      await l.isDir(s) || (s = Oe(s));
    } catch {
      s = Oe(s);
    }
    const i = s, w = await Le(i, a), d = We(i, w);
    r === "folder" ? await l.mkdir(d) : await l.writeFile(d, ""), ye.current = { type: r, tempPath: d }, me(d), await C(i), setTimeout(() => {
      A(d), oe(d);
    }, 0);
  }, Et = async (t) => {
    if (!l) return !1;
    try {
      if (await l.fileExists(t))
        return !0;
    } catch {
    }
    try {
      if (await l.isDir(t))
        return !0;
    } catch {
    }
    return !1;
  }, yt = async (t) => {
    if (l)
      try {
        await l.mkdir(t);
      } catch (r) {
        if (!await l.isDir(t).catch(() => !1))
          throw r;
      }
  }, _t = async (t, r) => {
    if (!l) return;
    const a = Ot(t), s = We(r, a);
    if (s === t || await Et(s))
      return;
    const i = Oe(t);
    try {
      await l.mv(t, s), ie(t, s);
      const w = kt(
        P,
        t,
        s
      );
      P && (P === t || P.startsWith(`${t}/`)) && g(w), A(
        (d) => kt(d, t, s)
      ), N((d) => ({
        ...d,
        [r]: !0
      })), await Promise.all([
        C(i),
        C(r)
      ]), j(
        (d) => kt(d, t, s)
      ), oe(s);
    } catch {
    }
  }, bt = (t) => {
    const r = t;
    return r.webkitGetAsEntry ? r.webkitGetAsEntry() : null;
  }, Ct = (t) => new Promise((r, a) => {
    t.file(r, a);
  }), lt = async (t, r) => {
    if (!l) return;
    const a = t.name || "untitled", s = await Le(r, a), i = We(r, s), w = new Uint8Array(await t.arrayBuffer());
    await l.writeFile(i, w);
  }, $e = async (t, r) => {
    const a = await Ct(t);
    await lt(a, r);
  }, Ye = async (t, r) => {
    const a = await Le(
      r,
      t.name || "New Folder"
    ), s = We(r, a);
    await yt(s);
    const i = t.createReader(), w = () => new Promise((d, x) => {
      i.readEntries(
        (X) => d(Array.from(X)),
        x
      );
    });
    for (; ; ) {
      const d = await w();
      if (!d.length)
        break;
      for (const x of d)
        x.isFile ? await $e(
          x,
          s
        ) : x.isDirectory && await Ye(
          x,
          s
        );
    }
  }, De = async (t, r) => {
    var i, w;
    if (!l) return;
    const s = ((i = t.dataTransfer) != null && i.items ? Array.from(t.dataTransfer.items) : []).filter((d) => d.kind === "file").map((d) => bt(d)).filter((d) => !!d);
    if (s.length > 0)
      for (const d of s)
        d.isFile ? await $e(
          d,
          r
        ) : d.isDirectory && await Ye(
          d,
          r
        );
    else {
      const d = (w = t.dataTransfer) != null && w.files ? Array.from(t.dataTransfer.files) : [];
      for (const x of d)
        await lt(x, r);
    }
    await C(r), N((d) => ({
      ...d,
      [r]: !0
    }));
  }, Ze = async (t, r) => {
    if (!l) return;
    const a = t;
    h(null);
    try {
      r === "folder" ? await l.rmdir(a, { recursive: !0 }) : await l.unlink(a);
    } catch {
    } finally {
      me(null);
      const s = Oe(a);
      await C(s), P && (P === a || P.startsWith(`${a}/`)) && g(null);
    }
  }, Ge = async (t) => {
    if (l)
      try {
        const a = await (await l.read(t)).arrayBuffer(), s = new Blob([a]), i = URL.createObjectURL(s), w = document.createElement("a");
        w.href = i, w.download = Ot(t) || "download", document.body.appendChild(w), w.click(), document.body.removeChild(w), setTimeout(() => URL.revokeObjectURL(i), 6e4);
      } catch (r) {
        console.error("Failed to download file", r);
      }
  }, ct = (t) => {
    var r;
    if (!ge)
      if (t.key.length === 1 && t.key.match(/\S/)) {
        const a = Me + t.key.toLowerCase();
        if (Ue(a), H.current && clearTimeout(H.current), H.current = setTimeout(() => {
          Ue("");
        }, 1e3), !_.current)
          return;
        const s = Array.from(
          _.current.querySelectorAll(".file-node-button")
        ), i = document.activeElement;
        let w = 0;
        i && s.includes(i) && (w = s.indexOf(
          i
        ));
        for (let d = 0; d < s.length; d++) {
          const x = (w + d) % s.length, X = s[x];
          if ((r = X.textContent) != null && r.toLowerCase().trim().startsWith(a)) {
            X.focus();
            const Se = X.getAttribute("data-path");
            Se && A(Se);
            break;
          }
        }
      } else
        Ue(""), H.current && clearTimeout(H.current);
  }, xt = async (t, r) => {
    const a = ye.current, s = (a == null ? void 0 : a.tempPath) === t, i = Oe(t), w = (r || "").trim();
    if (!y(w)) {
      if (s) {
        try {
          a.type === "folder" ? await l.rmdir(t, {
            recursive: !0
          }) : await l.unlink(t);
        } catch {
        }
        ye.current = null;
      }
      me(s ? null : t);
      return;
    }
    let d = We(i, w), x = d;
    if (x === t) {
      me(null);
      const e = s && (a == null ? void 0 : a.type) === "file";
      s && (ye.current = null), setTimeout(() => {
        A(x), oe(x), e && k && k(x);
      }, 0);
      return;
    }
    const X = await l.fileExists(x), Se = await l.isDir(x);
    if ((X || Se) && x !== t)
      if (s)
        try {
          const e = await Le(
            i === "/" ? "/" : i,
            w
          );
          d = We(i, e), x = d;
        } catch {
        }
      else {
        me(t);
        return;
      }
    let Ke = (a == null ? void 0 : a.type) === "folder";
    try {
      await l.mv(t, d), a || (Ke = await l.isDir(d)), Ke && ie(t, x), P === t && g(x), await C(i), A(x), oe(x), s && !Ke && k && k(x);
    } catch {
      if (s)
        try {
          (a == null ? void 0 : a.type) === "folder" ? await l.rmdir(t, {
            recursive: !0
          }) : await l.unlink(t);
        } catch {
        }
    } finally {
      ye.current = null, me(null);
    }
  }, ut = async (t) => {
    const r = ye.current;
    if (!l || (r == null ? void 0 : r.tempPath) !== t) {
      me((s) => s === t ? null : s);
      return;
    }
    try {
      r.type === "folder" ? await l.rmdir(t, { recursive: !0 }) : await l.unlink(t);
    } catch {
    }
    ye.current = null, me(null);
    const a = Oe(t);
    await C(a), A(a), oe(a);
  };
  return /* @__PURE__ */ o.createElement("div", { onKeyDown: ct, ref: _ }, /* @__PURE__ */ o.createElement(Kt, { className: we.filePickerTree }, ce.map((t, r) => /* @__PURE__ */ o.createElement(
    zt,
    {
      key: t.name,
      node: t,
      level: 0,
      position: r + 1,
      setSize: ce.length,
      expandedNodePaths: v,
      onToggle: J,
      selectedNode: P,
      focusPath: (a) => A(a),
      focusedNode: Z,
      selectPath: ve,
      generatePath: be,
      getChildren: Re,
      onContextMenu: st,
      renamingPath: ke,
      onRename: xt,
      onRenameCancel: ut,
      dropIndicator: ee,
      onDragStart: wt,
      onDragEnd: vt,
      onDragEnter: at,
      onDragOver: ot,
      onDragLeave: it,
      onDrop: gt,
      rootPath: T,
      onDoubleClickFile: k
    }
  ))), U && /* @__PURE__ */ o.createElement(
    qt,
    {
      placement: "bottom-start",
      onClose: () => h(null),
      anchor: {
        getBoundingClientRect: () => ({
          x: U.x,
          y: U.y,
          width: 0,
          height: 0,
          top: U.y,
          left: U.x,
          right: U.x,
          bottom: U.y,
          toJSON: () => ({})
        }),
        ownerDocument: document
      },
      noArrow: !0,
      resize: !1,
      focusOnMount: "firstElement"
    },
    /* @__PURE__ */ o.createElement(Jt, { role: "menu" }, U.type === "folder" && /* @__PURE__ */ o.createElement(
      qe,
      {
        role: "menuitem",
        onClick: async () => {
          h(null), await Ve(
            U.absPath,
            "file",
            "untitled.php"
          );
        }
      },
      "Create file"
    ), U.type === "folder" && /* @__PURE__ */ o.createElement(
      qe,
      {
        role: "menuitem",
        onClick: async () => {
          h(null), await Ve(
            U.absPath,
            "folder",
            "New Folder"
          );
        }
      },
      "Create directory"
    ), /* @__PURE__ */ o.createElement(
      qe,
      {
        role: "menuitem",
        onClick: () => {
          h(null), me(U.absPath);
        }
      },
      "Rename"
    ), U.type === "file" && /* @__PURE__ */ o.createElement(
      qe,
      {
        role: "menuitem",
        onClick: async () => {
          h(null), await Ge(
            U.absPath
          );
        }
      },
      "Download"
    ), /* @__PURE__ */ o.createElement(
      qe,
      {
        role: "menuitem",
        onClick: () => Ze(
          U.absPath,
          U.type
        )
      },
      "Delete"
    ))
  ));
}), zt = ({
  node: n,
  level: u,
  position: l,
  setSize: m,
  expandedNodePaths: E,
  onToggle: g,
  selectedNode: k,
  focusPath: V,
  focusedNode: T,
  selectPath: y,
  generatePath: v,
  getChildren: N,
  onContextMenu: P,
  renamingPath: j,
  onRename: Z,
  onRenameCancel: A,
  parentPath: D = "",
  dropIndicator: p,
  onDragStart: b,
  onDragEnd: q,
  onDragEnter: B,
  onDragOver: G,
  onDragLeave: ee,
  onDrop: W,
  rootPath: F,
  onDoubleClickFile: te
}) => {
  const _ = v(n, D), H = E[_], de = j === _, ae = M(null), [re, ue] = Q(n.name), oe = M(!1), be = (p == null ? void 0 : p.path) === _, Re = be && (p == null ? void 0 : p.state) === "valid", Te = be && (p == null ? void 0 : p.state) === "invalid", Pe = !de && _ !== F, le = M(null), S = {
    onDragEnter: (h) => B == null ? void 0 : B(h, n, _),
    onDragOver: (h) => G == null ? void 0 : G(h, n, _),
    onDragLeave: (h) => ee == null ? void 0 : ee(h, n, _),
    onDrop: (h) => W == null ? void 0 : W(h, n, _)
  }, C = N(n, _) ?? [];
  I(() => {
    var h;
    de ? (ue(n.name), oe.current = !1, typeof window < "u" && requestAnimationFrame ? requestAnimationFrame(() => {
      var ge;
      (ge = ae.current) == null || ge.select();
    }) : (h = ae.current) == null || h.select()) : oe.current = !1;
  }, [de, n.name]);
  const J = () => {
    n.type === "folder" && g(_, n, !H);
  }, z = (h) => {
    var ge, me;
    if (h.key === "ArrowLeft")
      H ? J() : (ge = document.querySelector(
        `[data-path="${D}"]`
      )) == null || ge.focus(), h.preventDefault(), h.stopPropagation();
    else if (h.key === "ArrowRight") {
      if (H) {
        if (C != null && C.length) {
          const ye = v(
            C[0],
            _
          );
          (me = document.querySelector(
            `[data-path="${ye}"]`
          )) == null || me.focus();
        }
      } else
        J();
      h.preventDefault(), h.stopPropagation();
    } else h.key === " " || h.key === "Space" || h.key === "Spacebar" ? (n.type === "folder" && g(_, n, !H), h.preventDefault()) : h.key === "Enter" && (n.type === "folder" ? g(_, n, !H) : (y(_, !1), V(_), te ? te(_) : y(_, !0)), h.preventDefault());
  }, ie = (h) => {
    P == null || P(h, n, _);
  }, Ee = (h) => {
    h.preventDefault(), oe.current = !0, Z == null || Z(_, re.trim());
  }, ve = (h) => {
    if (h.key === "Escape") {
      h.preventDefault(), h.stopPropagation(), oe.current = !0, A == null || A(_);
      return;
    }
    (h.key === "ArrowLeft" || h.key === "ArrowRight" || h.key === "ArrowUp" || h.key === "ArrowDown") && h.stopPropagation();
  }, ce = () => {
    oe.current || A == null || A(_), oe.current = !1;
  }, U = () => {
    if (n.type === "folder") {
      J(), y(_), V(_);
      return;
    }
    const h = le.current !== null;
    if (h && le.current && clearTimeout(le.current), le.current = null, h) {
      te ? te(_) : y(_, !0);
      return;
    }
    y(_, !1), V(_), y(_, !0), le.current = window.setTimeout(() => {
      le.current = null;
    }, 300);
  };
  return I(() => () => {
    le.current !== null && typeof window < "u" && clearTimeout(le.current);
  }, []), /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement(
    Xt,
    {
      level: u,
      positionInSet: l,
      setSize: m
    },
    /* @__PURE__ */ o.createElement(Qt, null, () => /* @__PURE__ */ o.createElement(o.Fragment, null, de ? /* @__PURE__ */ o.createElement(
      "form",
      {
        onSubmit: Ee,
        className: et(
          we.fileNodeButton,
          we.renaming,
          "file-node-button",
          {
            [we.selected]: k === _,
            [we.focused]: T === _,
            [we.dropTarget]: Re,
            [we.dropTargetInvalid]: Te
          }
        ),
        "data-path": _,
        onContextMenu: ie,
        ...S
      },
      /* @__PURE__ */ o.createElement(
        Vt,
        {
          node: n,
          isOpen: n.type === "folder" && H,
          level: u,
          hideName: !0
        }
      ),
      /* @__PURE__ */ o.createElement(
        "input",
        {
          ref: ae,
          className: we.renameInput,
          value: re,
          onChange: (h) => ue(h.target.value),
          onBlur: ce,
          onFocus: () => V(_),
          onKeyDown: ve
        }
      )
    ) : /* @__PURE__ */ o.createElement(
      mt,
      {
        ...S,
        draggable: Pe,
        onDragStart: (h) => b == null ? void 0 : b(h, n, _),
        onDragEnd: (h) => q == null ? void 0 : q(h, n, _),
        onClick: U,
        onKeyDown: z,
        onFocus: () => {
          V(_);
        },
        onContextMenu: ie,
        className: et(
          we.fileNodeButton,
          "file-node-button",
          {
            [we.selected]: k === _,
            [we.focused]: T === _,
            [we.dropTarget]: Re,
            [we.dropTargetInvalid]: Te
          }
        ),
        "data-path": _,
        "data-expanded": H ? "true" : "false"
      },
      /* @__PURE__ */ o.createElement(
        Vt,
        {
          node: n,
          isOpen: n.type === "folder" && H,
          level: u
        }
      )
    )))
  ), H && C && C.map((h, ge) => /* @__PURE__ */ o.createElement(
    zt,
    {
      key: h.name,
      node: h,
      level: u + 1,
      position: ge + 1,
      setSize: C.length,
      expandedNodePaths: E,
      onToggle: g,
      selectedNode: k,
      focusPath: V,
      focusedNode: T,
      selectPath: y,
      generatePath: v,
      getChildren: N,
      onContextMenu: P,
      renamingPath: j,
      onRename: Z,
      onRenameCancel: A,
      parentPath: _,
      dropIndicator: p,
      onDragStart: b,
      onDragEnd: q,
      onDragEnter: B,
      onDragOver: G,
      onDragLeave: ee,
      onDrop: W,
      rootPath: F,
      onDoubleClickFile: te
    }
  )));
}, Vt = ({ node: n, level: u, isOpen: l, hideName: m = !1 }) => {
  const E = [];
  for (let g = 0; g < u; g++)
    E.push("&nbsp;&nbsp;&nbsp;&nbsp;");
  return /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement(
    "span",
    {
      "aria-hidden": "true",
      dangerouslySetInnerHTML: { __html: E.join("") }
    }
  ), n.type === "folder" ? /* @__PURE__ */ o.createElement(jt, { width: 16, icon: l ? jr : Ir }) : /* @__PURE__ */ o.createElement("div", { style: { width: 16 } }, " "), /* @__PURE__ */ o.createElement(jt, { width: 16, icon: n.type === "folder" ? Or : Ar }), !m && /* @__PURE__ */ o.createElement("span", { className: we.fileName }, n.name));
}, Jr = "_control_kp9d9_1", Xr = "_browse-label_kp9d9_11", Qr = "_path-preview_kp9d9_37", en = "_modal_kp9d9_43", tn = "_modal-footer_kp9d9_48", He = {
  control: Jr,
  browseLabel: Xr,
  pathPreview: Qr,
  modal: en,
  modalFooter: tn
};
function rn({ path: n }) {
  if (!n)
    return /* @__PURE__ */ o.createElement("div", { className: He.pathPreview }, /* @__PURE__ */ o.createElement("i", null, "Select a path"));
  const u = n.split("/");
  let l = (u.length > 2 ? "/" : "") + u.pop();
  l.length > 10 && (l = l.substring(l.length - 10));
  const m = n.substring(
    0,
    n.length - l.length
  );
  return /* @__PURE__ */ o.createElement(
    "div",
    {
      className: He.pathPreview,
      "data-content-start": m,
      "data-content-end": l
    }
  );
}
function ga({
  value: n = "",
  onChange: u,
  filesystem: l
}) {
  const [m, E] = Q(!1), g = () => E(!0), k = () => E(!1), [V, T] = Q(
    n || null
  );
  function y(v) {
    v == null || v.preventDefault(), u(V || ""), k();
  }
  return /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement(
    mt,
    {
      variant: "tertiary",
      className: He.control,
      onClick: g
    },
    /* @__PURE__ */ o.createElement("span", { className: He.browseLabel }, "Browse"),
    /* @__PURE__ */ o.createElement(rn, { path: n || "" })
  ), m && /* @__PURE__ */ o.createElement(
    er,
    {
      title: "Select a path ",
      onRequestClose: k,
      className: He.modal
    },
    /* @__PURE__ */ o.createElement("form", { onSubmit: y }, /* @__PURE__ */ o.createElement(
      qr,
      {
        filesystem: l,
        initialSelectedPath: n,
        onSelect: T
      }
    ), /* @__PURE__ */ o.createElement("div", { className: He.modalFooter }, /* @__PURE__ */ o.createElement(mt, { type: "submit", variant: "primary" }, "Select Path")))
  ));
}
const nn = "_container_1h0az_1", an = "_header_1h0az_9", on = "_filename_1h0az_18", sn = "_downloadLink_1h0az_26", ln = "_previewArea_1h0az_38", cn = "_imagePreview_1h0az_51", un = "_videoPreview_1h0az_57", fn = "_audioPreview_1h0az_64", dn = "_unsupportedMessage_1h0az_68", mn = "_actions_1h0az_74", Ce = {
  container: nn,
  header: an,
  filename: on,
  downloadLink: sn,
  previewArea: ln,
  imagePreview: cn,
  videoPreview: un,
  audioPreview: fn,
  unsupportedMessage: dn,
  actions: mn
}, pn = (n) => {
  if (!n)
    return {
      isImage: !1,
      isVideo: !1,
      isAudio: !1
    };
  const u = n.toLowerCase();
  return {
    isImage: u.startsWith("image/"),
    isVideo: u.startsWith("video/"),
    isAudio: u.startsWith("audio/")
  };
};
function Ea({
  filename: n,
  mimeType: u,
  dataUrl: l,
  downloadUrl: m,
  showHeader: E = !0
}) {
  const { isImage: g, isVideo: k, isAudio: V } = pn(u), T = E !== !1, y = !!(m && n), v = () => y ? /* @__PURE__ */ o.createElement(
    "a",
    {
      className: Ce.downloadLink,
      href: m,
      download: n
    },
    "Download"
  ) : null, N = () => g ? /* @__PURE__ */ o.createElement(
    "img",
    {
      className: Ce.imagePreview,
      src: l,
      alt: n || "Preview"
    }
  ) : k ? /* @__PURE__ */ o.createElement(
    "video",
    {
      className: Ce.videoPreview,
      controls: !0,
      preload: "metadata"
    },
    /* @__PURE__ */ o.createElement("source", { src: l, type: u }),
    "Your browser does not support the video tag."
  ) : V ? /* @__PURE__ */ o.createElement("audio", { className: Ce.audioPreview, controls: !0 }, /* @__PURE__ */ o.createElement("source", { src: l, type: u }), "Your browser does not support the audio tag.") : /* @__PURE__ */ o.createElement("div", { className: Ce.unsupportedMessage }, /* @__PURE__ */ o.createElement("p", null, "Preview unavailable for this file type."), y ? /* @__PURE__ */ o.createElement("p", null, v()) : /* @__PURE__ */ o.createElement("p", null, "Download the file to inspect its contents."));
  return /* @__PURE__ */ o.createElement("div", { className: Ce.container }, T && /* @__PURE__ */ o.createElement("div", { className: Ce.header }, /* @__PURE__ */ o.createElement("span", { className: Ce.filename, title: n }, n), v()), /* @__PURE__ */ o.createElement("div", { className: Ce.previewArea }, N()), !T && y && /* @__PURE__ */ o.createElement("div", { className: Ce.actions }, v()));
}
const St = /* @__PURE__ */ new Map(), hn = async (n) => {
  var E;
  if (!n)
    return tt();
  const u = (E = n.split(".").pop()) == null ? void 0 : E.toLowerCase();
  if (!u || u === "php")
    return tt();
  const l = n;
  if (St.has(l))
    return St.get(l);
  let m;
  switch (u) {
    case "css":
      m = await import("@codemirror/lang-css").then(
        (g) => g.css()
      );
      break;
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      m = await import("@codemirror/lang-javascript").then(
        (g) => g.javascript({
          jsx: u === "jsx" || u === "tsx",
          typescript: u === "ts" || u === "tsx"
        })
      );
      break;
    case "json":
      m = await import("@codemirror/lang-json").then(
        (g) => g.json()
      );
      break;
    case "html":
    case "htm":
      m = await import("@codemirror/lang-html").then(
        (g) => g.html()
      );
      break;
    case "md":
    case "markdown":
      m = await import("@codemirror/lang-markdown").then(
        (g) => g.markdown()
      );
      break;
    default:
      m = tt();
  }
  return St.set(l, m), m;
};
class wn {
  constructor(u) {
    this.view = u, this.handleClick = this.handleClick.bind(this), this.view.dom.addEventListener("mousedown", this.handleClick);
  }
  handleClick(u) {
    const l = u.target;
    if ((l.classList.contains("cm-scroller") || l.classList.contains("cm-content")) && this.view.posAtCoords({
      x: u.clientX,
      y: u.clientY
    }) === null) {
      const E = this.view.state.doc.length, g = pt.create([
        pt.range(E, E)
      ]);
      this.view.dispatch({
        selection: g,
        effects: Qe.scrollIntoView(E, {
          y: "center"
        })
      }), this.view.focus(), u.preventDefault();
    }
  }
  destroy() {
    this.view.dom.removeEventListener("mousedown", this.handleClick);
  }
}
const vn = ir.define(
  (n) => new wn(n)
), Ut = Bt(
  function({
    code: u,
    onChange: l,
    currentPath: m,
    className: E,
    onSaveShortcut: g,
    readOnly: k = !1,
    additionalExtensions: V
  }, T) {
    const y = M(
      null
    ), v = M(null), N = M(new Tt()), P = M(new Tt()), j = M(new Tt()), Z = M(u), A = M(l), D = M(!1);
    return Wt(T, () => ({
      focus: () => {
        var p;
        (p = v.current) == null || p.focus();
      },
      blur: () => {
        const p = v.current;
        p && p.contentDOM.blur();
      },
      getCursorPosition: () => v.current ? v.current.state.selection.main.anchor : null,
      setCursorPosition: (p) => {
        if (!v.current)
          return;
        const b = Math.min(
          p,
          v.current.state.doc.length
        ), q = pt.create([
          pt.range(b, b)
        ]);
        v.current.dispatch({
          selection: q,
          scrollIntoView: !0
        });
      }
    })), I(() => {
      Z.current = u;
    }, [u]), I(() => {
      A.current = l;
    }, [l]), I(() => {
      if (v.current)
        return;
      const p = y.current;
      if (!p)
        return;
      const b = or.create({
        doc: u,
        extensions: [
          j.current.of(V ?? []),
          sr(),
          lr(),
          cr(),
          xr(),
          ur(),
          fr(),
          dr(),
          vn,
          N.current.of(tt()),
          P.current.of(
            Qe.editable.of(!k)
          ),
          Rr(Tr),
          Pr(),
          kr(),
          yr(),
          pr(),
          gr(),
          _r(),
          Qe.updateListener.of((B) => {
            if (!B.docChanged)
              return;
            const G = B.state.doc.toString();
            G !== Z.current && (Z.current = G, A.current(G));
          }),
          mr.of([
            {
              key: "Mod-s",
              preventDefault: !0,
              run: () => (g == null || g(), !0)
            },
            ...br,
            ...Cr,
            ...Sr,
            ...Er,
            ...hr,
            ...wr,
            vr
          ])
        ]
      }), q = new Qe({ state: b, parent: p });
      return v.current = q, () => {
        q.destroy(), v.current = null;
      };
    }, []), I(() => {
      const p = v.current;
      p && p.dispatch({
        effects: j.current.reconfigure(
          V ?? []
        )
      });
    }, [V]), I(() => {
      const p = v.current;
      if (!p)
        return;
      const b = p.state.doc.toString();
      u !== b && p.dispatch({
        changes: { from: 0, to: p.state.doc.length, insert: u }
      });
    }, [u]), I(() => {
      var G;
      const p = v.current;
      if (!p)
        return;
      const b = (G = m == null ? void 0 : m.split(".").pop()) == null ? void 0 : G.toLowerCase();
      (!b || b === "php") && p.dispatch({
        effects: N.current.reconfigure(tt())
      });
      let B = !1;
      return hn(m).then((ee) => {
        B || !v.current || v.current.dispatch({
          effects: N.current.reconfigure(ee)
        });
      }), () => {
        B = !0;
      };
    }, [m]), I(() => {
      const p = v.current;
      p && (p.hasFocus && (D.current = !0), p.dispatch({
        effects: P.current.reconfigure(
          Qe.editable.of(!k)
        )
      }));
    }, [k]), Gt(() => {
      const p = v.current;
      p && D.current && !p.hasFocus && (p.focus(), D.current = !1);
    }, [m, k]), /* @__PURE__ */ o.createElement("div", { ref: y, className: E });
  }
);
Ut.displayName = "CodeEditor";
const gn = "_fileExplorerContainer_1m4t6_1", En = "_fileExplorerHeader_1m4t6_14", yn = "_fileExplorerTitle_1m4t6_23", _n = "_fileExplorerActions_1m4t6_31", bn = "_fileExplorerButton_1m4t6_37", Cn = "_fileExplorerTree_1m4t6_84", Ie = {
  fileExplorerContainer: gn,
  fileExplorerHeader: En,
  fileExplorerTitle: yn,
  fileExplorerActions: _n,
  fileExplorerButton: bn,
  fileExplorerTree: Cn
}, xn = 1024 * 1024, Rn = (n) => {
  const u = n.byteLength;
  for (let l = 0; l < Math.min(u, 4096); l++)
    if (n[l] === 0)
      return !0;
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(n), !1;
  } catch {
    return !0;
  }
}, $t = (n, u) => {
  const l = new Blob([n]), m = URL.createObjectURL(l);
  return setTimeout(() => URL.revokeObjectURL(m), 6e4), { url: m, filename: u };
}, Tn = (n) => {
  const u = n.split(".").pop();
  return Lt[u] || Lt._default;
}, Pn = (n) => n.startsWith("image/") || n.startsWith("video/") || n.startsWith("audio/");
function kn({
  filesystem: n,
  currentPath: u,
  selectedDirPath: l,
  setSelectedDirPath: m,
  onFileOpened: E,
  onSelectionCleared: g,
  onShowMessage: k,
  documentRoot: V
}) {
  const T = M(null), y = Nt(() => At(
    u ? Oe(At(u)) : l ?? V
  ), [u, V]), [v, N] = Q(
    null
  ), P = async (j, Z) => {
    try {
      const A = await n.read(j), D = new Uint8Array(await A.arrayBuffer()), p = D.byteLength, b = j.split("/").pop() || "download";
      if (p > xn) {
        const { url: B, filename: G } = $t(
          D,
          b
        );
        await k(
          j,
          /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement("p", null, "File too large to open (>1MB)."), /* @__PURE__ */ o.createElement("p", null, /* @__PURE__ */ o.createElement("a", { href: B, download: G }, "Download ", G)))
        );
        return;
      }
      if (Rn(D)) {
        const B = Tn(b), { url: G, filename: ee } = $t(
          D,
          b
        );
        if (Pn(B)) {
          const W = new Blob([D], { type: B }), F = URL.createObjectURL(W);
          await k(
            j,
            /* @__PURE__ */ o.createElement(
              Dr,
              {
                filename: ee,
                mimeType: B,
                dataUrl: F,
                downloadUrl: G
              }
            )
          );
          return;
        }
        await k(
          j,
          /* @__PURE__ */ o.createElement(o.Fragment, null, /* @__PURE__ */ o.createElement("p", null, "Binary file. Cannot be edited."), /* @__PURE__ */ o.createElement("p", null, /* @__PURE__ */ o.createElement("a", { href: G, download: ee }, "Download ", ee)))
        );
        return;
      }
      const q = new TextDecoder("utf-8").decode(D);
      await E(j, q, Z);
    } catch (A) {
      dt.error("Could not open file", A), await k(null, "Could not open file.");
    }
  };
  return /* @__PURE__ */ o.createElement("div", { className: Ie.fileExplorerContainer }, /* @__PURE__ */ o.createElement("div", { className: Ie.fileExplorerHeader }, /* @__PURE__ */ o.createElement("span", { className: Ie.fileExplorerTitle }, "Files"), /* @__PURE__ */ o.createElement("div", { className: Ie.fileExplorerActions }, /* @__PURE__ */ o.createElement(
    "button",
    {
      className: Ie.fileExplorerButton,
      type: "button",
      onClick: () => {
        T.current && T.current.createFile(
          v ?? void 0
        );
      },
      title: "Create new file"
    },
    /* @__PURE__ */ o.createElement(Ft, { icon: Vr, size: 16 }),
    "New File"
  ), /* @__PURE__ */ o.createElement(
    "button",
    {
      className: Ie.fileExplorerButton,
      type: "button",
      onClick: () => {
        T.current && T.current.createFolder(
          v ?? void 0
        );
      },
      title: "Create new folder"
    },
    /* @__PURE__ */ o.createElement(Ft, { icon: Mr, size: 16 }),
    "New Folder"
  ))), /* @__PURE__ */ o.createElement("div", { className: Ie.fileExplorerTree }, /* @__PURE__ */ o.createElement(
    Nr,
    {
      ref: T,
      filesystem: n,
      root: V,
      initialSelectedPath: y,
      onSelect: async (j) => {
        if (N(j), !j) {
          await g();
          return;
        }
        try {
          if (await n.isDir(j)) {
            m(j);
            return;
          }
        } catch {
        }
        await P(j, !1);
      },
      onDoubleClickFile: async (j) => {
        await P(j, !0);
      }
    }
  )));
}
const Sn = "_container_15o5h_1", Nn = "_content_15o5h_9", Dn = "_sidebarWrapper_15o5h_17", On = "_editorWrapper_15o5h_28", An = "_editorHeader_15o5h_37", Fn = "_editorPath_15o5h_49", Ln = "_editorPathPlaceholder_15o5h_60", jn = "_saveStatus_15o5h_71", In = "_saveStatusSaving_15o5h_78", Mn = "_saveStatusPending_15o5h_79", Vn = "_saveStatusError_15o5h_83", $n = "_editor_15o5h_28", Bn = "_placeholder_15o5h_105", Wn = "_messageArea_15o5h_116", Hn = "_mobileToggle_15o5h_152", zn = "_mobileOverlay_15o5h_156", Un = "_sidebarOpen_15o5h_171", fe = {
  container: Sn,
  content: Nn,
  sidebarWrapper: Dn,
  editorWrapper: On,
  editorHeader: An,
  editorPath: Fn,
  editorPathPlaceholder: Ln,
  saveStatus: jn,
  saveStatusSaving: In,
  saveStatusPending: Mn,
  saveStatusError: Vn,
  editor: $n,
  placeholder: Bn,
  messageArea: Wn,
  mobileToggle: Hn,
  mobileOverlay: zn,
  sidebarOpen: Un
}, Yn = 1500, K = {
  IDLE: "idle",
  PENDING: "pending",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error"
};
function ya({
  filesystem: n,
  isVisible: u = !0,
  documentRoot: l,
  initialPath: m = null,
  placeholderText: E = "Select a file to view or edit its contents.",
  onSaveFile: g,
  onBeforeFilesystemChange: k
}) {
  const [V, T] = Q(
    l
  ), [y, v] = Q(null), [N, P] = Q(""), [j, Z] = Q(!0), [A, D] = Q(K.IDLE), [p, b] = Q(null), [q, B] = Q(!1), [G, ee] = Q(null), W = M(null), F = M(null), te = M(!1), _ = M(N), H = M(y), de = M(n), ae = M(null), re = M(/* @__PURE__ */ new Map()), ue = M(!1);
  I(() => {
    _.current = N;
  }, [N]), I(() => {
    H.current = y;
  }, [y]), I(() => {
    de.current = n;
  }, [n]), I(() => {
    const S = ae.current;
    S && S !== n && k && k(S), ae.current = n;
  }, [n, k]), I(() => {
    n || (te.current = !0, P(""), v(null), Z(!0), D(K.IDLE), b(null), B(!1), ee(null), ue.current = !1);
  }, [n]), I(() => {
    if (!n || !m || ue.current)
      return;
    (async () => {
      try {
        if (await n.fileExists(m)) {
          const J = await n.readFileAsText(m);
          te.current = !0, v(m), P(J), Z(!1), D(K.IDLE), b(null), setTimeout(() => {
            var z;
            (z = W.current) == null || z.focus();
          }, 100);
        }
      } catch (C) {
        dt.debug("Could not auto-open initial path:", C);
      } finally {
        ue.current = !0;
      }
    })();
  }, [n, m]), I(() => {
    T(l), v(null), P(""), Z(!0), D(K.IDLE), b(null), te.current = !0, ee(null), ue.current = !1;
  }, [l]), I(() => () => {
    F.current !== null && (window.clearTimeout(F.current), F.current = null);
  }, []), I(() => {
    const S = de.current;
    if (!S || !y) {
      F.current !== null && (window.clearTimeout(F.current), F.current = null), y || D(K.IDLE);
      return;
    }
    if (te.current) {
      te.current = !1;
      return;
    }
    F.current !== null && (window.clearTimeout(F.current), F.current = null), D(K.PENDING);
    const C = window.setTimeout(async () => {
      F.current = null, D(K.SAVING);
      try {
        const J = H.current, z = _.current;
        g ? await g(J, z) : await S.writeFile(J, z), D(K.SAVED), b(null);
      } catch (J) {
        dt.error("Failed to save file", J), D(K.ERROR), b("Could not save changes. Try again.");
      }
    }, Yn);
    return F.current = C, () => {
      F.current === C && (window.clearTimeout(C), F.current = null);
    };
  }, [N, y, g]), I(() => {
    if (A !== K.SAVED)
      return;
    const S = window.setTimeout(() => {
      D(
        (C) => C === K.SAVED ? K.IDLE : C
      );
    }, 2e3);
    return () => window.clearTimeout(S);
  }, [A]);
  const oe = ft(
    async (S, C, J = !0) => {
      var ie;
      const z = (ie = W.current) == null ? void 0 : ie.getCursorPosition();
      z != null && H.current && re.current.set(
        H.current,
        z
      ), te.current = !0, v(S), P(C), ee(null), Z(!1), D(K.IDLE), b(null), B(!1), setTimeout(() => {
        var ve, ce, U;
        const Ee = re.current.get(S);
        Ee !== void 0 && ((ve = W.current) == null || ve.setCursorPosition(Ee)), J ? (ce = W.current) == null || ce.focus() : (U = W.current) == null || U.blur();
      }, 50);
    },
    []
  );
  I(() => {
    var J;
    if (!y)
      return;
    const S = setInterval(() => {
      var ie;
      const z = (ie = W.current) == null ? void 0 : ie.getCursorPosition();
      z != null && re.current.set(y, z);
    }, 1e3), C = (J = W.current) == null ? void 0 : J.getCursorPosition();
    return C != null && re.current.set(y, C), () => {
      var ie;
      clearInterval(S);
      const z = (ie = W.current) == null ? void 0 : ie.getCursorPosition();
      z != null && re.current.set(y, z);
    };
  }, [y]), I(() => {
    if (!u || !y)
      return;
    const S = setTimeout(() => {
      var J;
      const C = re.current.get(y);
      C !== void 0 && ((J = W.current) == null || J.setCursorPosition(C));
    }, 100);
    return () => clearTimeout(S);
  }, [u, y]);
  const be = ft(async () => {
    var C;
    const S = (C = W.current) == null ? void 0 : C.getCursorPosition();
    S != null && H.current && re.current.set(H.current, S), te.current = !0, v(null), P(""), ee(null), Z(!0), D(K.IDLE), b(null);
  }, []), Re = ft(
    async (S, C) => {
      te.current = !0, v(null), typeof C == "string" ? (P(C), ee(null)) : (P(""), ee(C)), Z(!0), D(K.IDLE), b(null), B(!1);
    },
    []
  ), Te = ft(async () => {
    if (F.current !== null) {
      if (!de.current || !H.current) {
        window.clearTimeout(F.current), F.current = null;
        return;
      }
      window.clearTimeout(F.current), F.current = null, D(K.SAVING);
      try {
        const S = H.current, C = _.current;
        g ? await g(S, C) : await de.current.writeFile(
          S,
          C
        ), D(K.SAVED), b(null);
      } catch (S) {
        dt.error("Failed to save file", S), D(K.ERROR), b("Could not save changes. Try again.");
      }
    }
  }, [g]), Pe = Zn(A, p), le = Gn(A, fe);
  return n ? /* @__PURE__ */ o.createElement("div", { className: fe.container }, /* @__PURE__ */ o.createElement(
    "div",
    {
      className: et(fe.content, {
        [fe.sidebarOpen]: q
      })
    },
    /* @__PURE__ */ o.createElement(
      "div",
      {
        className: fe.mobileOverlay,
        onClick: () => B(!1)
      }
    ),
    /* @__PURE__ */ o.createElement("aside", { className: fe.sidebarWrapper }, /* @__PURE__ */ o.createElement(
      kn,
      {
        filesystem: n,
        currentPath: y,
        selectedDirPath: V,
        setSelectedDirPath: T,
        onFileOpened: oe,
        onSelectionCleared: be,
        onShowMessage: Re,
        documentRoot: l
      }
    )),
    /* @__PURE__ */ o.createElement("section", { className: fe.editorWrapper }, /* @__PURE__ */ o.createElement("div", { className: fe.editorHeader }, /* @__PURE__ */ o.createElement(
      mt,
      {
        className: fe.mobileToggle,
        variant: "secondary",
        onClick: () => B((S) => !S)
      },
      q ? "Hide files" : "Browse files"
    ), /* @__PURE__ */ o.createElement(
      "div",
      {
        className: et(fe.editorPath, {
          [fe.editorPathPlaceholder]: !(y != null && y.length)
        })
      },
      y != null && y.length ? y : `Browse files under ${l}`
    ), /* @__PURE__ */ o.createElement(
      "div",
      {
        className: et(
          fe.saveStatus,
          le
        )
      },
      Pe
    )), p ? /* @__PURE__ */ o.createElement("div", { style: { padding: "8px 16px" } }, /* @__PURE__ */ o.createElement(tr, { status: "error", isDismissible: !1 }, p)) : null, y || N || G ? G ? /* @__PURE__ */ o.createElement("div", { className: fe.messageArea }, G) : /* @__PURE__ */ o.createElement(
      Ut,
      {
        ref: W,
        code: N,
        onChange: P,
        currentPath: y,
        className: fe.editor,
        onSaveShortcut: Te,
        readOnly: j
      }
    ) : /* @__PURE__ */ o.createElement("div", { className: fe.placeholder }, E))
  )) : /* @__PURE__ */ o.createElement("div", { className: fe.container }, /* @__PURE__ */ o.createElement("div", { className: fe.placeholder }, E));
}
function Zn(n, u) {
  switch (n) {
    case K.PENDING:
    case K.SAVING:
      return "Saving…";
    case K.SAVED:
      return "Saved";
    case K.ERROR:
      return u ?? "Save failed";
    default:
      return "";
  }
}
function Gn(n, u) {
  switch (n) {
    case K.PENDING:
      return u.saveStatusPending;
    case K.SAVING:
      return u.saveStatusSaving;
    case K.ERROR:
      return u.saveStatusError;
    default:
      return;
  }
}
export {
  Ea as BinaryFilePreview,
  pa as ClockIcon,
  Ut as CodeEditor,
  kn as FileExplorerSidebar,
  ga as FilePickerControl,
  qr as FilePickerTree,
  xn as MAX_INLINE_FILE_BYTES,
  ya as PlaygroundFileEditor,
  va as SiteManagerIcon,
  ma as WordPressIcon,
  $t as createDownloadUrl,
  Ar as file,
  Or as folder,
  wa as getLogoDataURL,
  Tn as getMimeType,
  Pn as isPreviewableBinary,
  ha as layout,
  fa as playgroundLogo,
  Rn as seemsLikeBinary,
  da as temporaryStorage
};
//# sourceMappingURL=index.js.map
