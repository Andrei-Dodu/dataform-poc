var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
var t = require.transpiler;
// Does the transpiler escape other template-breakers? Test $ { } backtick backslash and nested ${}
var tests = {
  "dollar-brace":  'SELECT ${1}',
  "dollar-space":  'SELECT $ {1}',
  "backtick":      'SELECT `x`',
  "backslash":     'SELECT \\',
  "nested":        'SELECT ${ "${1}" }',
  "dollar-dollar": 'SELECT $$x$$',
  "closing brace": 'SELECT } AS y'
};
out.esc = {};
Object.keys(tests).forEach(function(k){
  try {
    var e = String(t('config { type: "view" }\n' + tests[k], "/t.sqlx"));
    // find the return[` ... `] region
    var i = e.indexOf("return [`");
    out.esc[k] = S(e.slice(i, i+220), 220);
  } catch(err){ out.esc[k] = "EXC:"+S(err,100); }
});
throw new Error("ESC::" + JSON.stringify(out.esc));
