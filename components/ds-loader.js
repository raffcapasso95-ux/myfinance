// Fallback loader: if the compiled _ds_bundle.js is missing, synchronously load the component .jsx sources.
(function () {
  var found = window.SanitiDesignSystem || Object.keys(window).map(function (k) { try { var v = window[k]; return v && typeof v === 'object' && v.Button && v.NavBar ? v : null; } catch (e) { return null; } }).find(Boolean);
  if (found) { window.SanitiDesignSystem = found; return; }
  var base = document.currentScript.src.replace(/ds-loader\.js.*$/, '');
  var files = ['core/Button', 'core/Badge', 'core/Wordmark', 'core/Eyebrow', 'forms/TextInput', 'cards/FeatureCard', 'cards/PricingCard', 'cards/StudioWindow', 'feedback/AlertBanner', 'navigation/NavBar', 'navigation/Footer', 'sections/Section', 'sections/ComparisonTable'];
  var NS = window.SanitiDesignSystem = {};
  files.forEach(function (f) {
    var x = new XMLHttpRequest(); x.open('GET', base + f + '.jsx', false); x.send();
    if (x.status !== 200 && x.status !== 0) { console.error('ds-loader: failed ' + f); return; }
    var src = x.responseText.replace(/^import .*;?\s*$/gm, '');
    var names = []; src.replace(/^export function (\w+)/gm, function (_, n) { names.push(n); });
    src = src.replace(/^export /gm, '');
    var prev = Object.keys(NS);
    var code = '(function(){' + (prev.length ? 'var {' + prev.join(',') + '} = window.SanitiDesignSystem;' : '') + src + '\nreturn {' + names.join(',') + '};})()';
    var out = Babel.transform(code, { presets: ['react'] }).code;
    Object.assign(NS, (0, eval)(out));
  });
})();
