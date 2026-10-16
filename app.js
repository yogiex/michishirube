const state={user:null,view:'landing',query:'',auditQuery:'',modal:false,editing:null,theme:localStorage.getItem('theme')||'dark',sidebarOpen:false,routes:[{p:'/orders',m:'GET',u:'order-svc',s:'active'},{p:'/users/:id',m:'GET',u:'user-svc',s:'active'},{p:'/pay',m:'POST',u:'pay-svc',s:'degraded'}],apikeys:[{n:'admin-prod',p:'mk_8f2',s:'active'},{n:'ci-pipeline',p:'mk_4a9',s:'active'},{n:'legacy',p:'mk_1bc',s:'revoked'}],audits:['route.updated','apikey.issued','policy.changed','tenant.created','route.deleted'],loading:false};
const $=id=>document.getElementById(id);
const kpis=[{v:'18.4K',l:'Requests'},{v:'99.97%',l:'Reliability'},{v:'42',l:'Routes'},{v:'12ms',l:'P95 Latency'}];
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.append(t);setTimeout(()=>t.remove(),2200);}
function login(e){e.preventDefault();state.user={email:'admin@michishirube.local',role:'admin'};setView('dashboard-overview');toast('Welcome to Michishirube ✨');}
function logout(){state.user=null;setView('landing');toast('Logged out');}
function setView(v){state.view=v;state.modal=false;state.editing=null;state.query='';state.auditQuery='';render();}
function openModal(edit=null){state.modal=true;state.editing=edit;render();}
function closeModal(){state.modal=false;state.editing=null;render();}
function saveRoute(e){e.preventDefault();const f=new FormData(e.target);const r={p:f.get('path'),m:f.get('method'),u:f.get('upstream'),s:'active'};if(state.editing!==null)state.routes[state.editing]=r;else state.routes.unshift(r);toast(state.editing!==null?'Route updated':'Route added');closeModal();}
function deleteRoute(i){state.routes.splice(i,1);toast('Route deleted');render();}
function barChart(vals){return `<div class="chart">${vals.map(v=>`<div class="bar" style="height:${v}%"></div>`).join('')}</div>`;}
function themeClass(){document.body.classList.toggle('theme-light',state.theme==='light');localStorage.setItem('theme',state.theme);}
themeClass();
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
function loginView(){return `<div class="wrap" style="max-width:420px;margin:8rem auto"><div class="card"><h2>Login Admin</h2><form onsubmit="login(event)" style="display:grid;gap:.8rem"><label>Email<input required type="email" value="admin@michishirube.local"/></label><label>Password<input required type="password" value="demo-password"/></label><button class="btn" style="width:100%">Masuk</button></form><p style="color:var(--muted);font-size:.85rem;margin-top:.8rem">Mock auth only.</p></div></div>`;}
function dashboard(){
const view=state.view.replace('dashboard-','');
const links=[['dashboard-overview','Overview'],['dashboard-routes','Routes'],['dashboard-tenants','Tenants'],['dashboard-apikeys','API Keys'],['dashboard-metrics','Metrics'],['dashboard-audit','Audit'],['dashboard-settings','Settings']];
let body='';
if(view==='overview')body=`<div class="grid stats">${kpis.map(k=>`<div class="stat"><strong>${k.v}</strong><span style="color:var(--muted)">${k.l}</span></div>`).join('')}</div><div class="card"><h3>Gateway Traffic (mock)</h3>${barChart([38,52,49,74,66,84,79,95,88,92])}</div>`; 
else if(view==='routes'){const f=state.routes.filter(r=>r.p.includes(state.query));body=`<div class="toolbar"><input placeholder="search route" value="${state.query}" oninput="state.query=this.value;render()" /><button class="btn" onclick="openModal()">Tambah Route</button></div><div class="card"><table><thead><tr><th>Path</th><th>Method</th><th>Upstream</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${f.map((r,i)=>`<tr><td>${r.p}</td><td>${r.m}</td><td>${r.u}</td><td><span class="badge ${r.s==='active'?'ok':'warn'}">${r.s}</span></td><td><button class="btn ghost" onclick="openModal(${i})">Edit</button> <button class="btn ghost" onclick="deleteRoute(${i})">Hapus</button></td></tr>`).join('')}</tbody></table></div>`;} 
else if(view==='tenants')body=`<div class="card"><p>dengan filter demo: platform, acme-corp, globex</p><input placeholder="search tenant" oninput="toast('tenant search: '+this.value)"/></div>`; 
else if(view==='apikeys')body=`<div class="card"><table><thead><tr><th>Name</th><th>Prefix</th><th>Status</th></tr></thead><tbody>${state.apikeys.map(k=>`<tr><td>${k.n}</td><td>${k.p}</td><td>${k.s}</td></tr>`).join('')}</tbody></table><button class="btn" onclick="toast('API key issued (mock)')">Issue Key</button></div>`; 
else if(view==='metrics')body=`<div class="grid stats">${[{v:'99.97%',l:'Availability'},{v:'12ms',l:'P95'},{v:'0.03%',l:'Error Rate'},{v:'24 active',l:'Circuits'}].map(k=>`<div class="stat"><strong>${k.v}</strong><span style="color:var(--muted)">${k.l}</span></div>`).join('')}</div>`; 
else if(view==='audit'){const f=state.audits.filter(a=>a.includes(state.auditQuery));body=`<div class="toolbar"><input placeholder="search audit" value="${state.auditQuery}" oninput="state.auditQuery=this.value;render()"/></div><div class="card"><ul>${f.map(a=>`<li>${a}</li>`).join('')}</ul></div>`;} 
else if(view==='settings')body=`<div class="card"><label>Tema<select onchange="state.theme=this.value;themeClass();render()"><option value="dark" ${state.theme==='dark'?'selected':''}>Dark</option><option value="light" ${state.theme==='light'?'selected':''}>Light</option></select></label></div>`;
const modal=state.modal?`<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><h3>${state.editing===null?'Tambah':'Edit'} Route</h3><form onsubmit="saveRoute(event)" style="display:grid;gap:.8rem"><label>Path<input name="path" required value="${state.editing===null?'':state.routes[state.editing].p}"/></label><label>Method<select name="method"><option>GET</option><option>POST</option></select></label><label>Upstream<input name="upstream" required value="${state.editing===null?'':state.routes[state.editing].u}"/></label><button class="btn" style="width:100%">Simpan</button></form></div></div>`:'';
return `<div class="app"><aside class="sidebar"><h1>Michishirube</h1><small>Premium Console</small><nav>${links.map(([k,l])=>`<button class="${state.view===k?'active':''}" onclick="setView('${k}')">${l}</button>`).join('')}</nav><button class="btn ghost" style="margin-top:auto;width:100%" onclick="logout()">Logout</button></aside><main><div class="topbar"><h2>${view[0].toUpperCase()+view.slice(1)}</h2><button class="btn ghost" onclick="toast('Notifications cleared')">Notifications</button></div>${body}${modal}</main></div>`;
}
function render(){if(state.view==='landing'){document.getElementById('root').innerHTML=landing();return;}if(state.view==='login'){document.getElementById('root').innerHTML=loginView();return;}if(state.view.startsWith('dashboard')){document.getElementById('root').innerHTML=dashboard();return;}}
window.setView=setView;window.login=login;window.logout=logout;window.openModal=openModal;window.closeModal=closeModal;window.saveRoute=saveRoute;window.deleteRoute=deleteRoute;window.toast=toast;window.state=state;state.view='landing';render();
