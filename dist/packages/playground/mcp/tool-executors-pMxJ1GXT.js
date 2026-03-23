async function u(r) {
  const [e, o] = await Promise.all([
    r.getCurrentURL(),
    r.run({
      code: `<?php
			require_once "/wordpress/wp-load.php";
			echo json_encode([
				"documentRoot" => ABSPATH,
				"wpVersion" => get_bloginfo("version"),
				"siteUrl" => get_site_url(),
				"phpVersion" => phpversion(),
			]);`
    }).then((s) => s.text)
  ]);
  let t;
  try {
    t = JSON.parse(o);
  } catch {
    t = {};
  }
  return {
    url: String(e),
    documentRoot: t.documentRoot ?? "/wordpress",
    siteUrl: t.siteUrl ?? String(e),
    wpVersion: t.wpVersion ?? "unknown",
    phpVersion: t.phpVersion ?? "unknown"
  };
}
const d = {
  playground_execute_php: (r, e) => r.run({ code: e.code }),
  playground_request: async (r, e) => {
    const o = {
      url: e.url,
      method: e.method ?? "GET"
    };
    return e.headers && (o.headers = e.headers), e.body && (o.body = e.body), await r.request(o);
  },
  playground_navigate: async (r, e) => (await r.goTo(e.path), { url: await r.getCurrentURL() }),
  playground_get_current_url: async (r) => ({
    url: await r.getCurrentURL()
  }),
  playground_get_site_info: (r) => u(r),
  playground_read_file: async (r, e) => ({
    contents: await r.readFileAsText(e.path)
  }),
  playground_write_file: async (r, e) => (await r.writeFile(
    e.path,
    e.contents
  ), { success: !0 }),
  playground_list_files: async (r, e) => ({
    files: await r.listFiles(e.path)
  }),
  playground_mkdir: async (r, e) => (await r.mkdirTree(e.path), { success: !0 }),
  playground_delete_file: async (r, e) => (await r.unlink(e.path), { success: !0 }),
  playground_delete_directory: async (r, e) => (await r.rmdir(e.path, {
    recursive: e.recursive ?? !1
  }), { success: !0 }),
  playground_file_exists: async (r, e) => ({
    exists: await r.fileExists(e.path)
  })
};
function i(r) {
  const e = new TextDecoder(), o = {
    async run(t) {
      const s = await r.run(t);
      return {
        text: e.decode(s.bytes),
        errors: s.errors,
        exitCode: s.exitCode
      };
    },
    async request(t) {
      const s = await r.request({
        url: t.url,
        method: t.method,
        headers: t.headers,
        body: t.body
      });
      return {
        text: e.decode(s.bytes),
        httpStatusCode: s.httpStatusCode,
        headers: s.headers
      };
    }
  };
  return new Proxy(r, {
    get: (t, s) => {
      const a = o[s];
      if (a !== void 0)
        return a;
      const n = t[s];
      return typeof n == "function" ? n.bind(t) : n;
    }
  });
}
export {
  i as c,
  d as t
};
//# sourceMappingURL=tool-executors-pMxJ1GXT.js.map
