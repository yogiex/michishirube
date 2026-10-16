const state={
  user:null,view:'landing',query:'',auditQuery:'',modal:false,editing:null,
  theme:localStorage.getItem('theme')||'dark',
  sidebarOpen:false,collapsed:localStorage.getItem('collapsed')==='1',notif:false,
  routes:[
    {p:'/api/v1/orders',m:'GET',u:'order-svc',s:'active',rpm:4820},
    {p:'/api/v1/users/:id',m:'GET',u:'user-svc',s:'active',rpm:3120},
    {p:'/api/v1/payments',m:'POST',u:'pay-svc',s:'degraded',rpm:1640},
    {p:'/api/v1/payments/:id/refund',m:'POST',u:'pay-svc',s:'active',rpm:420},
    {p:'/api/v1/notifications',m:'POST',u:'notify-svc',s:'active',rpm:910},
    {p:'/api/v1/inventory/:sku',m:'PATCH',u:'inventory-svc',s:'active',rpm:230}
  ],
  apikeys:[
    {n:'admin-prod',p:'mk_live_8f2a',s:'active',c:'2026-04-02'},
    {n:'ci-pipeline',p:'mk_live_4a9c',s:'active',c:'2026-05-18'},
    {n:'partner-globex',p:'mk_live_77b1',s:'active',c:'2026-06-01'},
    {n:'legacy-mobile',p:'mk_test_1bcd',s:'revoked',c:'2025-11-20'}
  ],
  tenants:[
    {n:'acme-corp',p:'Enterprise',rpm:'12.4K',s:'active'},
    {n:'globex',p:'Starter',rpm:'1.2K',s:'throttled'},
    {n:'platform-internal',p:'Pro',rpm:'4.8K',s:'active'}
  ],
  audits:[
    {t:'route.updated',d:'/api/v1/payments → pay-svc',w:'2s',i:'route'},
    {t:'apikey.issued',d:'ci-pipeline · mk_live_4a9c',w:'14s',i:'key'},
    {t:'quota.exceeded',d:'tenant globex · 429 Too Many Requests',w:'41s',i:'alert'},
    {t:'circuit.open',d:'pay-svc breaker opened',w:'1m',i:'zap'},
    {t:'cache.purge',d:'tenant acme-corp · 1 240 keys',w:'2m',i:'server'},
    {t:'tenant.created',d:'platform-internal · Pro plan',w:'18m',i:'users'}
  ],
  loading:false
};

/* ---------- icons ---------- */
const SVG=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICONS={
  grid:SVG('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
  chart:SVG('<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16l3-4 3 2 4-6"/>'),
  route:SVG('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 0 1 3 3v6.5"/>'),
  users:SVG('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 4.5a3 3 0 0 1 0 6"/><path d="M17 20a5.5 5.5 0 0 0-2.5-4.6"/>'),
  key:SVG('<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8"/><path d="M16 4h4v4"/>'),
  activity:SVG('<path d="M3 12h4l2.5-7 4 14L16 12h5"/>'),
  settings:SVG('<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>'),
  logout:SVG('<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17l-5-5 5-5"/><path d="M5 12h11"/>'),
  search:SVG('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
  bell:SVG('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 19a2 2 0 0 0 4 0"/>'),
  sun:SVG('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>'),
  moon:SVG('<path d="M21 13a8 8 0 1 1-9-9 7 7 0 0 0 9 9z"/>'),
  menu:SVG('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  plus:SVG('<path d="M12 5v14M5 12h14"/>'),
  panel:SVG('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>'),
  zap:SVG('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'),
  clock:SVG('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  shield:SVG('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'),
  server:SVG('<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>'),
  copy:SVG('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'),
  check:SVG('<path d="M20 6L9 17l-5-5"/>'),
  alert:SVG('<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>'),
  lock:SVG('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
  refresh:SVG('<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>')
};
function icon(n){return ICONS[n]||''}

/* ---------- helpers ---------- */
const kpis=[{v:'18.4K',l:'Requests'},{v:'99.97%',l:'Reliability'},{v:'42',l:'Routes'},{v:'12ms',l:'P95 Latency'}];
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2200);}
function barChart(vals){return `<div class="chart">${vals.map(v=>`<div class="bar" style="height:${v}%"></div>`).join('')}</div>`;}
function sparkline(vals,color,id){
  const w=140,h=40,max=Math.max(...vals),min=Math.min(...vals),rng=(max-min)||1;
  const pt=vals.map((v,i)=>`${(i/(vals.length-1)*w).toFixed(1)},${(h-3-((v-min)/rng)*(h-8)).toFixed(1)}`).join(' ');
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><defs><linearGradient id="sp${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".4"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><polygon points="0,${h} ${pt} ${w},${h}" fill="url(#sp${id})"/><polyline points="${pt}" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function statCard(o){return `<div class="card kpi"><div class="kpi-top"><span class="kpi-ico" style="--c:${o.color}">${icon(o.icon)}</span><span class="trend ${o.up?'up':'down'}">${o.up?'▲':'▼'} ${o.delta}</span></div><strong class="kpi-val">${o.value}</strong><span class="kpi-label">${o.label}</span><div class="kpi-spark">${sparkline(o.spark,o.color,o.id)}</div></div>`;}
function meter(label,val,pct,tone){return `<li><div class="route-meta"><strong>${label}</strong><span>${val}</span></div><div class="progress"><i class="${tone||''}" style="width:${pct}%"></i></div><small>${pct}%</small></li>`;}

/* ---------- state mutators ---------- */
function login(e){e.preventDefault();state.user={email:'admin@michishirube.local',role:'owner'};setView('dashboard-overview');toast('Welcome back ✨');}
function logout(){state.user=null;setView('landing');toast('Logged out');}
function setView(v){state.view=v;state.modal=false;state.editing=null;state.query='';state.auditQuery='';state.notif=false;state.sidebarOpen=false;render();}
function openModal(edit=null){state.modal=true;state.editing=edit;render();}
function closeModal(){state.modal=false;state.editing=null;render();}
function saveRoute(e){e.preventDefault();const f=new FormData(e.target);const r={p:f.get('path'),m:f.get('method'),u:f.get('upstream'),s:f.get('status')||'active',rpm:Math.floor(Math.random()*4000)+200};if(state.editing!==null)state.routes[state.editing]={...state.routes[state.editing],...r};else state.routes.unshift(r);toast(state.editing!==null?'Route updated':'Route added');closeModal();}
function deleteRoute(i){state.routes.splice(i,1);toast('Route deleted');render();}
function toggleSidebar(){state.sidebarOpen=!state.sidebarOpen;render();}
function toggleCollapse(){state.collapsed=!state.collapsed;localStorage.setItem('collapsed',state.collapsed?'1':'0');render();}
function toggleNotif(){state.notif=!state.notif;render();}
function toggleTheme(){setTheme(state.theme==='dark'?'light':'dark');}
function setTheme(t){state.theme=t;themeClass();render();}
function copyKey(p){if(navigator.clipboard)navigator.clipboard.writeText(p);toast('Copied '+p);}
function themeClass(){document.body.classList.toggle('theme-light',state.theme==='light');localStorage.setItem('theme',state.theme);}
themeClass();

/* ---------- landing ---------- */
function landing(){
return `<div class="wrap">
<nav class="topnav"><strong class="wordmark">Michishirube</strong><div class="topnav-links"><a href="#features">Features</a><a href="#flow">Architecture</a><a href="#pricing">Pricing</a><a href="./docs/ARCHITECTURE.md">Docs</a></div><button class="btn" onclick="setView('login')">Open Console</button></nav>
<header class="hero"><div>
  <div class="badge">⚡ Enterprise Multi-Tenant API Gateway</div>
  <h1 class="grad">One gateway.<br/>Every request secured,<br/>routed, and observed.</h1>
  <p>Michishirube sits in front of your microservices and centralizes auth, tenancy, rate limiting, idempotency, circuit breaking, caching, and observability — so your teams only ship business logic.</p>
  <div class="cta"><button class="btn" onclick="setView('login')">Open Live Console</button><button class="btn ghost" onclick="toast('Docs at /docs/ARCHITECTURE.md')">Read Architecture</button></div>
  <div class="logos"><span>Built for</span><b>NestJS</b><b>Fastify</b><b>Redis</b><b>OpenTelemetry</b><b>Prometheus</b><b>JWT / JWKS</b></div>
</div>
<div class="card terminal">
  <div class="terminal-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span><em>gateway · live</em></div>
  <pre><code><span class="c-key">$</span> curl https://api.michishirube.dev/api/v1/orders \\
  <span class="c-flag">-H</span> <span class="c-str">"Authorization: Bearer &lt;jwt&gt;"</span> \\
  <span class="c-flag">-H</span> <span class="c-str">"X-Tenant-Id: acme"</span> \\
  <span class="c-flag">-H</span> <span class="c-str">"Idempotency-Key: 7f9a..."</span>

<span class="c-ok">✓ jwt</span>     verified · rs256 · jwks
<span class="c-ok">✓ tenant</span>  acme · policy applied
<span class="c-ok">✓ quota</span>   4 821 / 5 000 rpm
<span class="c-ok">✓ route</span>   /orders → order-svc
<span class="c-ok">200 OK</span>   <span class="c-muted">38ms · trace 4bf9…e21</span></code></pre>
</div>
</header>

<section class="stats-strip">
  ${kpis.map(k=>`<div class="stat"><strong>${k.v}</strong><span>${k.l}</span></div>`).join('')}
  <div class="stat"><strong>&lt;10ms</strong><span>Gateway overhead</span></div>
</section>

<section id="flow">
  <h2>Every request, handled in order.</h2>
  <p class="section-lead">Cross-cutting concerns run before a single byte reaches your upstream.</p>
  <div class="flow">${[['01','Edge &amp; TLS','WAF, load balancer, request ID'],['02','Auth &amp; RBAC','JWT via JWKS or hashed API key'],['03','Tenant Resolve','JWT claim → subdomain → header'],['04','Rate Limit','Redis sliding window per tenant'],['05','Idempotency','SET NX lock + cached response'],['06','Circuit Breaker','Closed → Open → Half-Open'],['07','Proxy','Retry, timeout, header sanitize'],['08','Observe','Metrics, traces, audit feed']].map(s=>`<div class="step"><span class="step-num">${s[0]}</span><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join('')}</div>
</section>

<section id="features">
  <h2>Why teams pick Michishirube</h2>
  <div class="grid features">${[['Centralized Auth','RS256/ES256 JWT via JWKS plus hashed API keys for partners — no duplicated auth per service.'],['Reliability Stack','Sliding-window rate limit, idempotent writes, circuit breaker, retry with jitter, and Redis cache.'],['Tenant Isolation','Every cache, quota, and idempotency key is prefixed by a validated tenant.'],['Observability','Prometheus metrics, OpenTelemetry tracing, and structured audit events out of the box.'],['Configurable Routing','YAML + Redis route config, reloadable without restart, HTTP and gRPC upstreams.'],['Secure by Default','Zod validation, header sanitization, SSRF guard, fail-closed policies.'],['Stateless Scale','No local state — scale horizontally to N instances behind any edge.'],['OpenAPI Contract','Stable, documented API with standardized RFC 7807 error responses.']].map(f=>`<div class="card feature"><h3>${f[0]}</h3><p>${f[1]}</p></div>`).join('')}</div>
</section>

<section>
  <h2>Operational metrics that matter</h2>
  <div class="card">
    <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:.5rem;margin-bottom:.6rem"><strong>Requests / second (mock)</strong><span class="badge ok">Healthy</span></div>
    ${barChart([38,52,49,74,66,84,79,95,88,92,97,91])}
  </div>
</section>

<section id="pricing">
  <h2>Pricing</h2>
  <div class="pricing">
    <div class="card price"><h3>Starter</h3><strong>$0</strong><p>Single tenant, core gateway, basic metrics.</p><ul class="price-list"><li>JWT &amp; API key auth</li><li>Rate limiting</li><li>Community support</li></ul><button class="btn ghost" onclick="setView('login')">Start</button></div>
    <div class="card price featured"><span class="badge">Most popular</span><h3>Pro</h3><strong>$49</strong><p>Multi-tenant with the full resilience stack.</p><ul class="price-list"><li>Idempotency &amp; cache</li><li>Circuit breaker &amp; retry</li><li>Tracing + audit</li><li>Email support</li></ul><button class="btn" onclick="setView('login')">Start</button></div>
    <div class="card price"><h3>Enterprise</h3><strong>Custom</strong><p>Scale, compliance, and hands-on support.</p><ul class="price-list"><li>Multi-region</li><li>SSO &amp; custom policy</li><li>SLA 99.95%+</li><li>Dedicated engineer</li></ul><button class="btn ghost" onclick="toast('Contact sales coming soon')">Contact</button></div>
  </div>
</section>

<footer class="footer">© Michishirube • Enterprise API Gateway mockup • <a href="./docs/ARCHITECTURE.md">Architecture</a> · <a href="./docs/PRD.md">PRD</a> · <a href="./docs/FRONTEND-API-CONTRACT.md">API Contract</a></footer>
</div>`;}

/* ---------- login ---------- */
function loginView(){return `<div class="wrap" style="max-width:420px;margin:8rem auto"><div class="card login-card"><span class="logo logo-lg">${icon('zap')}</span><h2>Sign in to Console</h2><p class="muted" style="margin-top:-.6rem">Mock auth — no data leaves your browser.</p><form onsubmit="login(event)" style="display:grid;gap:.8rem"><label>Email<input required type="email" value="admin@michishirube.local"/></label><label>Password<input required type="password" value="demo-password"/></label><button class="btn" style="width:100%;justify-content:center">Masuk</button></form></div></div>`;}

/* ---------- dashboard ---------- */
const NAV=[
  {t:'General',items:[['dashboard-overview','Overview','grid'],['dashboard-metrics','Analytics','chart']]},
  {t:'Gateway',items:[['dashboard-routes','Routes','route'],['dashboard-tenants','Tenants','users'],['dashboard-apikeys','API Keys','key']]},
  {t:'System',items:[['dashboard-audit','Audit Log','activity'],['dashboard-settings','Settings','settings']]}
];
const TITLES={overview:'Overview',metrics:'Analytics',routes:'Routes',tenants:'Tenants',apikeys:'API Keys',audit:'Audit Log',settings:'Settings'};

function notifPanel(){return `<div class="notif-panel"><h4>Notifications</h4>${[['quota.exceeded','tenant globex hit 429','1m','alert'],['circuit.open','pay-svc breaker opened','2m','zap'],['deploy.done','gateway v1.8.2 rolled out','26m','check']].map(n=>`<div class="n-item"><span class="n-ico">${icon(n[3])}</span><div><strong>${n[0]}</strong><span>${n[1]} · ${n[2]}</span></div></div>`).join('')}<button class="btn ghost" style="width:100%;justify-content:center;margin-top:.5rem" onclick="toggleNotif()">Close</button></div>`;}

function viewOverview(){
  return `
<div class="kpis">
  ${statCard({icon:'zap',color:'#22d3ee',value:'18.4K',label:'Requests / min',delta:'12.5%',up:true,id:'a',spark:[10,14,12,18,16,22,20,26,24,30]})}
  ${statCard({icon:'shield',color:'#22c55e',value:'99.97%',label:'Reliability',delta:'0.02%',up:true,id:'b',spark:[99,99.2,99.1,99.5,99.4,99.6,99.7,99.6,99.8,99.9]})}
  ${statCard({icon:'clock',color:'#a78bfa',value:'12ms',label:'P95 Latency',delta:'8.3%',up:true,id:'c',spark:[22,20,21,18,17,16,15,14,13,12]})}
  ${statCard({icon:'alert',color:'#f59e0b',value:'0.03%',label:'Error Rate',delta:'15%',up:true,id:'d',spark:[9,8,8,7,6,6,5,4,4,3]})}
</div>
<div class="overview-grid">
  <div class="card">
    <div class="card-head"><h3>Gateway Traffic</h3><div class="chips"><span class="chip active">1H</span><span class="chip">24H</span><span class="chip">7D</span></div></div>
    ${barChart([38,52,49,74,66,84,79,95,88,92,97,91])}
    <div class="chart-legend"><span>12:00</span><span>12:20</span><span>12:40</span><span>Now</span></div>
  </div>
  <div class="card">
    <div class="card-head"><h3>System Health</h3><span class="badge ok">Operational</span></div>
    <ul class="health">
      <li><span>Authentication</span><span class="badge ok">99.99%</span></li>
      <li><span>Routing</span><span class="badge ok">99.98%</span></li>
      <li><span>Redis state</span><span class="badge ok">connected</span></li>
      <li><span>Circuit breakers</span><span class="badge warn">1 half-open</span></li>
      <li><span>Idempotency</span><span class="badge ok">healthy</span></li>
    </ul>
  </div>
</div>
<div class="overview-grid">
  <div class="card">
    <div class="card-head"><h3>Top Routes</h3><span class="muted">last 15 min</span></div>
    <ul class="route-list">${[['/api/v1/orders','order-svc',86],['/api/v1/users/:id','user-svc',64],['/api/v1/payments','pay-svc',48],['/api/v1/notifications','notify-svc',31]].map(r=>meter(r[0],r[1],r[2])).join('')}</ul>
  </div>
  <div class="card">
    <div class="card-head"><h3>Live Activity</h3><span class="badge ok">streaming</span></div>
    <ul class="activity">${[['route.updated','/pay → pay-svc','2s'],['apikey.issued','ci-pipeline','14s'],['quota.exceeded','tenant globex · 429','41s'],['circuit.open','pay-svc','1m'],['cache.purge','tenant acme','2m']].map(a=>`<li><span class="activity-dot"></span><div><strong>${a[0]}</strong><span>${a[1]}</span></div><em>${a[2]}</em></li>`).join('')}</ul>
  </div>
</div>
<div class="card quick">
  <div class="card-head"><h3>Quick actions</h3></div>
  <div class="toolbar"><button class="btn" onclick="setView('dashboard-routes');openModal()">${icon('plus')} Add route</button><button class="btn ghost" onclick="setView('dashboard-apikeys')">${icon('key')} Issue API key</button><button class="btn ghost" onclick="setView('dashboard-audit')">${icon('activity')} View audit</button><button class="btn ghost" onclick="toast('Runbook opened (mock)')">${icon('lock')} Open runbook</button></div>
</div>`;
}

function viewRoutes(){
  const q=state.query.toLowerCase();
  const f=state.routes.filter(r=>(r.p+r.u).toLowerCase().includes(q));
  return `
<div class="toolbar">
  <label class="searchbox" style="max-width:300px">${icon('search')}<input placeholder="Search routes…" value="${state.query}" oninput="state.query=this.value;render()"/></label>
  <div class="chips"><span class="chip active">All</span><span class="chip">Active</span><span class="chip">Degraded</span></div>
  <button class="btn" style="margin-left:auto" onclick="openModal()">${icon('plus')} Add Route</button>
</div>
<div class="card">
  <table><thead><tr><th>Path</th><th>Method</th><th>Upstream</th><th>RPM</th><th>Status</th><th></th></tr></thead>
  <tbody>${f.map(r=>{const i=state.routes.indexOf(r);return `<tr><td><code class="path">${r.p}</code></td><td><span class="m ${r.m}">${r.m}</span></td><td>${r.u}</td><td>${r.rpm.toLocaleString()}</td><td><span class="badge ${r.s==='active'?'ok':'warn'}">${r.s}</span></td><td class="row-actions"><button class="iconbtn sm" onclick="openModal(${i})" title="Edit">${icon('settings')}</button><button class="iconbtn sm danger" onclick="deleteRoute(${i})" title="Delete">${icon('alert')}</button></td></tr>`}).join('') || `<tr><td colspan="6" class="empty">No routes match “${state.query}”.</td></tr>`}</tbody></table>
</div>`;
}

function viewTenants(){
  return `<div class="kpis">${state.tenants.map((t,i)=>`<div class="card kpi"><div class="kpi-top"><span class="avatar">${t.n[0].toUpperCase()}</span><span class="badge ${t.s==='active'?'ok':'warn'}">${t.s}</span></div><strong class="kpi-val" style="font-size:1.2rem">${t.n}</strong><span class="kpi-label">${t.p} plan</span><div class="chart-legend" style="margin-top:.7rem"><span>${t.rpm} rpm</span><span>quota ok</span></div></div>`).join('')}</div>
<div class="card"><div class="card-head"><h3>Tenant policies</h3><span class="muted">applied per request</span></div>
<table><thead><tr><th>Tenant</th><th>Plan</th><th>Rate limit</th><th>Cache TTL</th><th>Status</th></tr></thead><tbody>
${state.tenants.map(t=>`<tr><td><strong>${t.n}</strong></td><td>${t.p}</td><td>${t.rpm} rpm</td><td>${t.p==='Enterprise'?'120s':t.p==='Pro'?'60s':'30s'}</td><td><span class="badge ${t.s==='active'?'ok':'warn'}">${t.s}</span></td></tr>`).join('')}
</tbody></table></div>`;
}

function viewApikeys(){
  return `
<div class="toolbar">
  <label class="searchbox" style="max-width:300px">${icon('search')}<input placeholder="Search API keys…"/></label>
  <button class="btn" style="margin-left:auto" onclick="toast('API key issued (mock)')">${icon('plus')} Issue Key</button>
</div>
<div class="card"><table><thead><tr><th>Name</th><th>Prefix</th><th>Created</th><th>Status</th><th></th></tr></thead>
<tbody>${state.apikeys.map(k=>`<tr><td><strong>${k.n}</strong></td><td><code class="path">${k.p}</code></td><td>${k.c}</td><td><span class="badge ${k.s==='active'?'ok':''}">${k.s}</span></td><td class="row-actions"><button class="iconbtn sm" onclick="copyKey('${k.p}')" title="Copy">${icon('copy')}</button>${k.s==='active'?`<button class="iconbtn sm danger" onclick="toast('Key revoked (mock)')" title="Revoke">${icon('lock')}</button>`:''}</td></tr>`).join('')}</tbody></table></div>`;
}

function viewMetrics(){
  return `
<div class="kpis">
  ${statCard({icon:'chart',color:'#22d3ee',value:'99.97%',label:'Availability',delta:'0.02%',up:true,id:'m1',spark:[99,99,99.1,99.2,99.2,99.5,99.6,99.7,99.9,99.97]})}
  ${statCard({icon:'clock',color:'#a78bfa',value:'12ms',label:'P95 Latency',delta:'8.1%',up:true,id:'m2',spark:[20,19,18,18,16,15,14,13,12,12]})}
  ${statCard({icon:'alert',color:'#f59e0b',value:'0.03%',label:'Error Rate',delta:'14%',up:true,id:'m3',spark:[7,7,6,6,5,5,4,4,3,3]})}
  ${statCard({icon:'zap',color:'#22c55e',value:'24',label:'Active Circuits',delta:'2',up:true,id:'m4',spark:[18,19,20,20,21,22,22,23,23,24]})}
</div>
<div class="overview-grid">
  <div class="card"><div class="card-head"><h3>Response Status</h3><span class="muted">last 24h</span></div>
    <div class="donut-wrap">
      <div class="donut" style="background:conic-gradient(#22c55e 0 92.4%,#f59e0b 92.4% 97%,#ef4444 97% 100%)"><span class="donut-label"><strong>99.97%</strong><small>success</small></span></div>
      <ul class="legend"><li><i style="background:#22c55e"></i>2xx success · 92.4%</li><li><i style="background:#f59e0b"></i>4xx client · 4.6%</li><li><i style="background:#ef4444"></i>5xx server · 3.0%</li></ul>
    </div>
  </div>
  <div class="card"><div class="card-head"><h3>Latency Percentiles</h3><span class="muted">p95 target 15ms</span></div>
    <ul class="route-list">${meter('p50','6ms',18)}${meter('p90','11ms',34)}${meter('p95','12ms',42)}${meter('p99','48ms',78,'warn')}</ul>
  </div>
</div>
<div class="card"><div class="card-head"><h3>Resource Usage</h3><span class="badge ok">nominal</span></div>
  <ul class="route-list">${meter('CPU','42%',42)}${meter('Memory','61%',61)}${meter('Redis connections','1 240 / 5 000',25)}${meter('Upstream pool','78%',78,'warn')}</ul>
</div>`;
}

function viewAudit(){
  const q=state.auditQuery.toLowerCase();
  const f=state.audits.filter(a=>(a.t+' '+a.d).toLowerCase().includes(q));
  return `
<div class="toolbar"><label class="searchbox" style="max-width:360px">${icon('search')}<input placeholder="Search audit events…" value="${state.auditQuery}" oninput="state.auditQuery=this.value;render()"/></label>
<span class="badge">${f.length} events</span></div>
<div class="card"><ul class="timeline">${f.map(a=>`<li><span class="t-ico">${icon(a.i)}</span><strong>${a.t}</strong><p>${a.d}</p><em>${a.w} ago · actor admin@michishirube.local</em></li>`).join('') || `<li class="empty">No events match “${state.auditQuery}”.</li>`}</ul></div>`;
}

function viewSettings(){
  return `
<div class="overview-grid">
  <div class="card"><div class="card-head"><h3>Appearance</h3></div>
    <div class="set-row"><div class="s-info"><strong>Theme</strong><span>Switch between dark and light console</span></div><div class="seg"><button class="${state.theme==='dark'?'active':''}" onclick="setTheme('dark')">Dark</button><button class="${state.theme==='light'?'active':''}" onclick="setTheme('light')">Light</button></div></div>
    <div class="set-row"><div class="s-info"><strong>Compact sidebar</strong><span>Collapse navigation to icons only</span></div><button class="chip ${state.collapsed?'active':''}" onclick="toggleCollapse()">${state.collapsed?'On':'Off'}</button></div>
    <div class="set-row"><div class="s-info"><strong>Reduced motion</strong><span>Follow the operating system preference</span></div><span class="badge ok">auto</span></div>
  </div>
  <div class="card"><div class="card-head"><h3>Gateway Policies</h3></div>
    <div class="set-row"><div class="s-info"><strong>Rate limiting</strong><span>Redis sliding window per tenant</span></div><span class="badge ok">enabled</span></div>
    <div class="set-row"><div class="s-info"><strong>Idempotency</strong><span>SET NX lock with cached response</span></div><span class="badge ok">enabled</span></div>
    <div class="set-row"><div class="s-info"><strong>Circuit breaker</strong><span>5 failures → open · 30s half-open</span></div><span class="badge ok">enabled</span></div>
    <div class="set-row"><div class="s-info"><strong>Header sanitization</strong><span>Strip hop-by-hop &amp; internal headers</span></div><span class="badge ok">enabled</span></div>
  </div>
</div>
<div class="card"><div class="card-head"><h3>Danger zone</h3></div>
  <div class="set-row"><div class="s-info"><strong>Purge tenant cache</strong><span>Invalidate all cached responses</span></div><button class="btn ghost" onclick="toast('Cache purge queued (mock)')">Purge</button></div>
</div>`;
}

function dashboard(){
  const view=state.view.replace('dashboard-','');
  let body='';
  if(view==='overview')body=viewOverview();
  else if(view==='routes')body=viewRoutes();
  else if(view==='tenants')body=viewTenants();
  else if(view==='apikeys')body=viewApikeys();
  else if(view==='metrics')body=viewMetrics();
  else if(view==='audit')body=viewAudit();
  else if(view==='settings')body=viewSettings();

  const nav=`<nav class="snav">${NAV.map(g=>`<div class="nav-group"><span class="nav-group-title">${g.t}</span>${g.items.map(([k,l,ic])=>`<button class="navlink ${state.view===k?'active':''}" onclick="setView('${k}')" title="${l}">${icon(ic)}<span>${l}</span></button>`).join('')}</div>`).join('')}</nav>`;
  const initials=(state.user&&state.user.email?state.user.email[0]:'A').toUpperCase();

  const modal=state.modal?`<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><div class="modal-head"><h3>${state.editing===null?'Add':'Edit'} Route</h3><button class="iconbtn sm" onclick="closeModal()">✕</button></div><form onsubmit="saveRoute(event)" style="display:grid;gap:.8rem"><label>Path<input name="path" required placeholder="/api/v1/resource" value="${state.editing===null?'':state.routes[state.editing].p}"/></label><div class="form-2"><label>Method<select name="method">${['GET','POST','PUT','PATCH','DELETE'].map(m=>`<option ${state.editing!==null&&state.routes[state.editing].m===m?'selected':''}>${m}</option>`).join('')}</select></label><label>Status<select name="status"><option value="active" ${state.editing!==null&&state.routes[state.editing].s==='active'?'selected':''}>active</option><option value="degraded" ${state.editing!==null&&state.routes[state.editing].s==='degraded'?'selected':''}>degraded</option></select></label></div><label>Upstream<input name="upstream" required placeholder="service-name" value="${state.editing===null?'':state.routes[state.editing].u}"/></label><button class="btn" style="width:100%;justify-content:center">Save Route</button></form></div></div>`:'';

  return `<div class="app ${state.collapsed?'collapsed':''} ${state.sidebarOpen?'sidebar-open':''}">
<div class="scrim" onclick="toggleSidebar()"></div>
<aside class="side">
  <div class="brand"><span class="logo">${icon('zap')}</span><span class="name"><strong>Michishirube</strong><span>Premium Console</span></span></div>
  ${nav}
  <div class="side-foot">
    <div class="user-card"><span class="avatar">${initials}</span><div class="u-info"><strong>${state.user?.email||'admin'}</strong><span>${state.user?.role||'owner'}</span></div></div>
    <button class="navlink collapse-btn" onclick="toggleCollapse()" title="Collapse">${icon('panel')}<span>Collapse</span></button>
    <button class="navlink" onclick="logout()" title="Logout">${icon('logout')}<span>Logout</span></button>
  </div>
</aside>
<main>
  <div class="topbar">
    <button class="iconbtn menu-toggle" onclick="toggleSidebar()">${icon('menu')}</button>
    <div class="page-title"><h2>${TITLES[view]||'Overview'}</h2><span class="crumb">Console / ${TITLES[view]||'Overview'}</span></div>
    <div class="topbar-actions">
      <label class="searchbox">${icon('search')}<input placeholder="Search routes, tenants…" onkeydown="if(event.key==='Enter')toast('Search: '+this.value)"/></label>
      <button class="iconbtn" onclick="toggleTheme()" title="Toggle theme">${icon(state.theme==='dark'?'sun':'moon')}</button>
      <div class="notif-wrap"><button class="iconbtn" onclick="toggleNotif()" title="Notifications">${icon('bell')}<span class="dotdot"></span></button>${state.notif?notifPanel():''}</div>
    </div>
  </div>
  ${body}
  ${modal}
</main></div>`;
}

function render(){
  if(state.view==='landing'){document.getElementById('root').innerHTML=landing();return;}
  if(state.view==='login'){document.getElementById('root').innerHTML=loginView();return;}
  if(state.view.startsWith('dashboard')){document.getElementById('root').innerHTML=dashboard();return;}
}
window.setView=setView;window.login=login;window.logout=logout;window.openModal=openModal;window.closeModal=closeModal;window.saveRoute=saveRoute;window.deleteRoute=deleteRoute;window.toast=toast;window.toggleSidebar=toggleSidebar;window.toggleCollapse=toggleCollapse;window.toggleNotif=toggleNotif;window.toggleTheme=toggleTheme;window.setTheme=setTheme;window.copyKey=copyKey;window.state=state;
state.view='landing';render();
