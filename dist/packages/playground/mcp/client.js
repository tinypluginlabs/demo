import { c as h } from "./tool-executors-pMxJ1GXT.js";
const E = 5e3;
function k(t, n) {
  const d = crypto.randomUUID();
  let e = null, a = "", i = null, p = !1;
  function c(o) {
    const s = t.getSites(), l = JSON.stringify(s);
    l !== a && (a = l, o.send(JSON.stringify({ type: "register", tabId: d, sites: s })));
  }
  async function r() {
    try {
      const o = await fetch(
        `http://127.0.0.1:${n}/bridge-token`
      );
      if (!o.ok) {
        f();
        return;
      }
      const { token: s } = await o.json();
      e = new WebSocket(`ws://127.0.0.1:${n}?token=${s}`);
    } catch {
      f();
      return;
    }
    e.addEventListener("open", () => {
      var o;
      a = "", c(e), (o = t.onConnect) == null || o.call(t);
    }), e.addEventListener("message", async (o) => {
      let s;
      try {
        s = JSON.parse(o.data);
      } catch {
        return;
      }
      if (s.type !== "command")
        return;
      const { id: l, method: w, args: y, siteSlug: S } = s;
      try {
        const u = await N(
          t,
          w,
          y || [],
          S,
          n
        );
        (e == null ? void 0 : e.readyState) === WebSocket.OPEN && e.send(JSON.stringify({ id: l, type: "response", value: u }));
      } catch (u) {
        const m = u instanceof Error ? u.message : String(u);
        (e == null ? void 0 : e.readyState) === WebSocket.OPEN && e.send(
          JSON.stringify({
            id: l,
            type: "response",
            error: m
          })
        );
      }
    }), e.addEventListener("close", () => {
      e = null, f();
    }), e.addEventListener("error", () => {
    });
  }
  function f() {
    p || (i = setTimeout(r, E));
  }
  return r(), {
    notifySitesChanged: () => {
      (e == null ? void 0 : e.readyState) === WebSocket.OPEN && c(e);
    },
    stop: () => {
      p = !0, i !== null && (clearTimeout(i), i = null), e && (e.close(), e = null);
    }
  };
}
async function N(t, n, d, e, a) {
  if (n === "__open_site") {
    const r = new URL(window.location.href);
    if (r.searchParams.set("mcp", "yes"), r.searchParams.set("mcp-port", String(a)), r.searchParams.set("site-slug", e), !window.open(r.toString(), "_blank"))
      throw new Error(
        "Pop-up blocked by browser. The user must allow pop-ups for this site."
      );
    return !0;
  }
  if (n === "__rename_site") {
    if (!t.renameSite)
      throw new Error("renameSite not configured");
    const [r] = d;
    return await t.renameSite(e, r), !0;
  }
  if (n === "__save_site") {
    if (!t.saveSite)
      throw new Error("saveSite not configured");
    return await t.saveSite(e);
  }
  const i = t.getPlaygroundClient(e);
  if (!i)
    throw new Error(`No active client for site: ${e}`);
  const c = h(i)[n];
  if (typeof c != "function")
    throw new Error(`Unknown method: ${n}`);
  return await c(...d);
}
export {
  k as startMcpBridge
};
//# sourceMappingURL=client.js.map
