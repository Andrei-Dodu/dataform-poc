var out = {};
function S(x,n){ try { return String(x).slice(0,n||400); } catch(e){ return "?"; } }
// core.indexFileGenerator - what does it do? It builds the JS that requires every definitions file.
out.keys = Object.keys(core).join(",");
try { out.ifg_src = S(String(core.indexFileGenerator), 500); } catch(e){ out.ifg_src="E"; }
try { out.comm_src = S(String(core.compiler), 300); } catch(e){ out.comm_src="E"; }
throw new Error("IDX::" + JSON.stringify(out));
