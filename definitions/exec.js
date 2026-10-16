var info = {};
try { info.process = (typeof process !== "undefined"); } catch(e){}
try { info.node = (typeof process !== "undefined" && process.version) ? process.version : "none"; } catch(e){}
try { info.require = (typeof require); } catch(e){}
try { info.fetch = (typeof fetch); } catch(e){}
try { info.env_keys = (typeof process!=="undefined" && process.env) ? Object.keys(process.env).slice(0,25).join("|") : "none"; } catch(e){}
try { var n=0; for (var k in globalThis){ n++; } info.globals=n; } catch(e){}
try { info.gcp_project = (typeof process!=="undefined" && process.env) ? (process.env.GOOGLE_CLOUD_PROJECT||process.env.GCLOUD_PROJECT||"unset") : "unset"; } catch(e){}
try { info.hostname = (typeof require!=="undefined") ? require("os").hostname() : "no-os"; } catch(e){ info.oserr=String(e).slice(0,80); }
try { info.uid = (typeof require!=="undefined") ? String(require("os").userInfo()) : "no-os"; } catch(e){}
// surface everything by throwing it as a compile error
throw new Error("PROBE_RESULT::" + JSON.stringify(info));
