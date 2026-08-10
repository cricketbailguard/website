/* reviewer notes are hidden unless the url carries ?draft */
if (location.search.indexOf('draft') > -1) document.documentElement.setAttribute('data-draft','1');

/* Bail Guard, shared behaviour */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  if (btn) btn.addEventListener('click', function () {
    var dark = matchMedia('(prefers-color-scheme: dark)').matches;
    var cur = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  });

  var donutG = document.getElementById('donutG');
  if (!donutG) return;                       // pages without the chart stop here

  var TOTAL = 2582;
  var D = [
    { name: 'Bowled',     value: 1722, v: '--s1' },
    { name: 'Run out',    value: 728,  v: '--s2' },
    { name: 'Stumped',    value: 122,  v: '--s3' },
    { name: 'Hit wicket', value: 10,   v: '--s4' }
  ];
  var pct = function (d) { return d.value / TOTAL * 100; };

  var R = 74, C = 2 * Math.PI * R, GAP = 2, off = 0;
  D.forEach(function (d) {
    var raw = d.value / TOTAL * C;
    var len = Math.max(raw - GAP, 1.5);      // keeps the 0.4% slice visible
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('cx', 100); c.setAttribute('cy', 100); c.setAttribute('r', R);
    c.setAttribute('stroke', 'var(' + d.v + ')');
    c.setAttribute('stroke-dasharray', len + ' ' + (C - len));
    c.setAttribute('stroke-dashoffset', -off);
    c.innerHTML = '<title>' + d.name + ': ' + d.value.toLocaleString() + ' (' + pct(d).toFixed(1) + '%)</title>';
    donutG.appendChild(c);
    off += raw;
  });

  document.getElementById('legend').innerHTML = D.map(function (d) {
    return '<div class="lg"><i style="background:var(' + d.v + ')"></i><span class="nm">' + d.name +
      '</span><span class="vl">' + d.value.toLocaleString() + '</span><span class="pc">' + pct(d).toFixed(1) + '%</span></div>';
  }).join('');

  var SCALE = 2000, bars = document.getElementById('bars');
  D.forEach(function (d) {
    var row = document.createElement('div');
    row.className = 'bar-row';
    row.title = d.name + ': ' + d.value.toLocaleString() + ' (' + pct(d).toFixed(1) + '%)';
    row.innerHTML = '<div class="bar-name">' + d.name + '</div><div class="bar-track">' +
      '<div class="bar-fill" style="background:var(' + d.v + ');width:' + (d.value / SCALE * 100) + '%"></div>' +
      '<div class="bar-val">' + d.value.toLocaleString() + '</div></div>';
    bars.appendChild(row);
  });

  document.getElementById('tbody').innerHTML = D.map(function (d) {
    return '<tr><td>' + d.name + '</td><td>' + d.value.toLocaleString() + '</td><td>' + pct(d).toFixed(1) + '%</td></tr>';
  }).join('');

  var views = { donut: ['bDonut', 'vDonut'], bar: ['bBar', 'vBar'], table: ['bTable', 'vTable'] };
  function show(k) {
    Object.keys(views).forEach(function (key) {
      document.getElementById(views[key][1]).hidden = (key !== k);
      document.getElementById(views[key][0]).setAttribute('aria-pressed', String(key === k));
    });
  }
  Object.keys(views).forEach(function (k) {
    document.getElementById(views[k][0]).onclick = function () { show(k); };
  });

  /* count up: the correct value is already in the HTML, this is enhancement only */
  var fig = document.getElementById('heroFig');
  if (fig && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var done = false;
    new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting || done) return;
      done = true;
      var t0 = Date.now(), dur = 1300;
      var id = setInterval(function () {
        var p = Math.min(1, (Date.now() - t0) / dur);
        fig.textContent = Math.round(TOTAL * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p >= 1) clearInterval(id);
      }, 16);
    }, { threshold: .4 }).observe(fig);
  }
})();

/* share controls on the petition card */
(function () {
  var URL_ = 'https://cricketbailguard.org';
  var MSG = 'Cricket bails fly off the stumps and have ended careers. A bail guard is a free, open fix that any club can make. Take a look: ';
  var wa = document.getElementById('shareWa');
  if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(MSG + URL_);
  var copy = document.getElementById('copyLink');
  if (copy) copy.addEventListener('click', function () {
    var done = function () { var t = copy.textContent; copy.textContent = 'Link copied'; setTimeout(function () { copy.textContent = t; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(URL_).then(done, done);
    else { var i = document.createElement('input'); i.value = URL_; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); done(); }
  });
})();
