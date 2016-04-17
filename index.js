var transform = require('buble').transform;

module.exports = bubleHTML;

var scripts = /<\s*script[^>]*>(([^](?!<\/script>))*.)/gi;
var type = /<\s*script[^>]*type=["']([^'" ]+)["'][^>]*>/i;

function bubleHTML( code, options ) {
  code = code.replace(scripts, function(whole, code, single) {
    var m = type.exec(whole);
    if (m && m[1] !== "text/javascript") return whole;
    return (m ? m[0] : '<script>') + transform(code, options).code;
  });
  return code;
}

bubleHTML.defaults = {
  accept: [ ".html", ".htm" ]
};
