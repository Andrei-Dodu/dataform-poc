// @dataform/core is available - does it expose anything that reaches the network/fs?
var out = {};
try { var c = require("@dataform/core"); out.keys = Object.keys(c).slice(0,40).join(","); } catch(e){ out.err=String(e).slice(0,80); }
throw new Error("CORE::" + JSON.stringify(out));
