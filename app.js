/* reviewer notes are hidden unless the url carries ?draft */
if (location.search.indexOf('draft') > -1) document.documentElement.setAttribute('data-draft','1');

/* Bail Guard, shared behaviour */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');
  if (btn) btn.addEventListener('click', function () {
    var dark = matchMedia('(prefers-color-scheme: dark)').matches;
    var cur = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('bg-theme', next); } catch (e) {}
  });

  /* ------------------------------------------------------------------
     Every figure below comes from data/totals.json, which a scheduled
     Action copies from the trial repository. These values match what is
     written into the HTML, so the page stays correct if that fetch fails.
     ------------------------------------------------------------------ */
  var FALLBACK = {
    games: 491, bowled: 1722, stumped: 122, run_out: 728,
    hit_wicket: 10, dislodgements: 2582,
    data_from: '2026-01-18', data_to: '2026-08-09'
  };

  var MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  function parseDate(s) {
    var p = String(s || '').split('-');
    return p.length === 3 ? { y: +p[0], m: +p[1], d: +p[2] } : null;
  }
  function longDate(s) {
    var d = parseDate(s);
    return d ? d.d + ' ' + MONTHS[d.m - 1] + ' ' + d.y : '';
  }
  function rangeText(a, b) {
    var x = parseDate(a), y = parseDate(b);
    if (!x || !y) return '';
    return x.y === y.y
      ? x.d + ' ' + MONTHS[x.m - 1] + ' to ' + y.d + ' ' + MONTHS[y.m - 1] + ' ' + y.y
      : longDate(a) + ' to ' + longDate(b);
  }
  function monthsText(a, b) {
    var x = parseDate(a), y = parseDate(b);
    if (!x || !y) return '';
    return MONTHS[x.m - 1] + ' to ' + MONTHS[y.m - 1] + ' ' + y.y;
  }

  var heroTarget = FALLBACK.dislodgements;   // kept current so a late fetch retargets the count up
  var animating = false;

  function bind(d) {
    heroTarget = d.dislodgements;
    var values = {
      dislodgements: d.dislodgements.toLocaleString(),
      games: d.games.toLocaleString(),
      perGame: d.games ? (d.dislodgements / d.games).toFixed(1) : '',
      range: rangeText(d.data_from, d.data_to),
      months: monthsText(d.data_from, d.data_to),
      updated: longDate(d.data_to)
    };
    Object.keys(values).forEach(function (k) {
      if (!values[k]) return;
      [].forEach.call(document.querySelectorAll('[data-bg="' + k + '"]'), function (el) {
        if (el.id === 'heroFig' && animating) return;   // the count up owns this until it finishes
        el.textContent = values[k];
      });
    });
  }

  var donutG = document.getElementById('donutG');

  function drawChart(d) {
    var TOTAL = d.dislodgements;
    var SERIES = [
      { name: 'Bowled',     value: d.bowled,     v: '--s1' },
      { name: 'Run out',    value: d.run_out,    v: '--s2' },
      { name: 'Stumped',    value: d.stumped,    v: '--s3' },
      { name: 'Hit wicket', value: d.hit_wicket, v: '--s4' }
    ].sort(function (a, b) { return b.value - a.value; });
    var pct = function (s) { return s.value / TOTAL * 100; };

    /* donut: 2px gaps, with a floor so the smallest slice stays visible */
    donutG.innerHTML = '';
    var R = 74, C = 2 * Math.PI * R, GAP = 2, off = 0;
    SERIES.forEach(function (s) {
      var raw = s.value / TOTAL * C;
      var len = Math.max(raw - GAP, 1.5);
      var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', 100); c.setAttribute('cy', 100); c.setAttribute('r', R);
      c.setAttribute('stroke', 'var(' + s.v + ')');
      c.setAttribute('stroke-dasharray', len + ' ' + (C - len));
      c.setAttribute('stroke-dashoffset', -off);
      c.innerHTML = '<title>' + s.name + ': ' + s.value.toLocaleString() + ' (' + pct(s).toFixed(1) + '%)</title>';
      donutG.appendChild(c);
      off += raw;
    });
    var mid = donutG.parentNode.querySelector('text');
    if (mid) mid.textContent = TOTAL.toLocaleString();

    document.getElementById('legend').innerHTML = SERIES.map(function (s) {
      return '<div class="lg"><i style="background:var(' + s.v + ')"></i><span class="nm">' + s.name +
        '</span><span class="vl">' + s.value.toLocaleString() + '</span><span class="pc">' + pct(s).toFixed(1) + '%</span></div>';
    }).join('');

    /* bars, on an axis rounded up past the largest value */
    var top = Math.max.apply(null, SERIES.map(function (s) { return s.value; }));
    var step = Math.pow(10, String(Math.round(top)).length - 1);
    var SCALE = Math.ceil(top / step) * step;
    document.getElementById('bars').innerHTML = SERIES.map(function (s) {
      return '<div class="bar-row" title="' + s.name + ': ' + s.value.toLocaleString() + ' (' + pct(s).toFixed(1) + '%)">' +
        '<div class="bar-name">' + s.name + '</div><div class="bar-track">' +
        '<div class="bar-fill" style="background:var(' + s.v + ');width:' + (s.value / SCALE * 100) + '%"></div>' +
        '<div class="bar-val">' + s.value.toLocaleString() + '</div></div></div>';
    }).join('');
    var axis = document.querySelector('.axis');
    if (axis) axis.innerHTML = '<span>0</span><span>' + (SCALE / 2).toLocaleString() +
      '</span><span>' + SCALE.toLocaleString() + '</span>';

    document.getElementById('tbody').innerHTML = SERIES.map(function (s) {
      return '<tr><td>' + s.name + '</td><td>' + s.value.toLocaleString() + '</td><td>' + pct(s).toFixed(1) + '%</td></tr>';
    }).join('');
  }

  function apply(d) {
    bind(d);
    if (donutG) drawChart(d);
  }

  apply(FALLBACK);

  /* then the live file, if it is there and it parses */
  fetch('data/totals.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || !j.totals) return;
      var t = j.totals;
      var need = ['games', 'bowled', 'stumped', 'run_out', 'hit_wicket', 'dislodgements'];
      for (var n = 0; n < need.length; n++) if (typeof t[need[n]] !== 'number') return;
      if (!t.games || !t.dislodgements) return;
      apply({
        games: t.games, bowled: t.bowled, stumped: t.stumped, run_out: t.run_out,
        hit_wicket: t.hit_wicket, dislodgements: t.dislodgements,
        data_from: j.data_from || FALLBACK.data_from,
        data_to: j.data_to || FALLBACK.data_to
      });
    })
    .catch(function () { /* keep the built in values */ });

  /* view toggles */
  if (donutG) {
    var views = { donut: ['bDonut', 'vDonut'], bar: ['bBar', 'vBar'], table: ['bTable', 'vTable'] };
    Object.keys(views).forEach(function (k) {
      document.getElementById(views[k][0]).onclick = function () {
        Object.keys(views).forEach(function (key) {
          document.getElementById(views[key][1]).hidden = (key !== k);
          document.getElementById(views[key][0]).setAttribute('aria-pressed', String(key === k));
        });
      };
    });
  }

  /* count up: the correct value is already on the page, this is enhancement only */
  var fig = document.getElementById('heroFig');
  if (fig && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var done = false;
    new IntersectionObserver(function (e) {
      if (!e[0].isIntersecting || done) return;
      done = true;
      animating = true;
      var t0 = Date.now(), dur = 1300;
      var id = setInterval(function () {
        var p = Math.min(1, (Date.now() - t0) / dur);
        fig.textContent = Math.round(heroTarget * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p >= 1) {
          clearInterval(id);
          animating = false;
          fig.textContent = heroTarget.toLocaleString();   // always land on the current figure
        }
      }, 16);
    }, { threshold: .4 }).observe(fig);
  }
})();

/* mobile navigation */
(function () {
  var nav = document.querySelector('.nav');
  var btn = document.getElementById('navToggle');
  var panel = document.getElementById('navLinks');
  if (!nav || !btn || !panel) return;

  function setOpen(open) {
    nav.setAttribute('data-open', String(open));
    btn.setAttribute('aria-expanded', String(open));
  }
  setOpen(false);

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(nav.getAttribute('data-open') !== 'true');
  });

  // a link closes it, so the panel never lingers over the page you asked for
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (nav.getAttribute('data-open') === 'true' && !nav.contains(e.target)) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') { setOpen(false); btn.focus(); }
  });

  // if the window grows past the breakpoint, drop the open state
  matchMedia('(min-width: 781px)').addEventListener('change', function (m) {
    if (m.matches) setOpen(false);
  });
})();

/* share controls on the petition card */
(function () {
  var URL_ = 'https://cricketbailguard.org';
  var MSG = 'Cricket bails fly off the stumps and have ended careers. A bail guard is a simple fix, and the design is published free for any club to build. Take a look: ';
  var wa = document.getElementById('shareWa');
  if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(MSG + URL_);
  var copy = document.getElementById('copyLink');
  if (copy) copy.addEventListener('click', function () {
    var done = function () {
      var t = copy.getAttribute('title');
      copy.setAttribute('title', 'Link copied');
      setTimeout(function () { copy.setAttribute('title', t); }, 1800);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(URL_).then(done, done);
    else { var i = document.createElement('input'); i.value = URL_; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); done(); }
  });
})();
