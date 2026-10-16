const state={user:null,theme:localStorage.getItem('theme')||'dark',view:'login',query:'',modal:false,selected:null};
const routes=['Overview','Routes','Tenants','API Keys','Metrics','Audit','Settings'];
const mockKpis=[{label:'Total requests',value:'12.8K'},{label:'Approved routes',value:'42'},{label:'API keys active',value:'17'},{label:'Audit events',value:'3.1K'}];
const mockRoutes=[{path:'/orders',method:'GET',upstream:'order-svc',enabled:true},{path:'/users/:id',method:'GET',upstream:'user-svc',enabled:true},{path:'/pay',method:'POST',upstream:'pay-svc',enabled:false}];
const mockApiKeys=[{name:'admin-key',prefix:'mk_abc',status:'active'},{name:'ci-key',prefix:'mk_def',status:'revoked'}];
const $=id=>document.getElementById(id);
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),2200);}
function applyTheme(){document.body.classList.toggle('theme-light',state.theme==='light');localStorage.setItem('theme',state.theme);}
applyTheme();
function login(e){e.preventDefault();state.user={email:'admin@michishirube.local',roles:['admin']};state.view='overview';render();toast('Login berhasil (mock)');}
function logout(){state.user=null;state.view='login';render();toast('Logout');}
function setView(v){state.view=v;state.selected=null;render();}
function routeLink(name){return `<button class="${state.view===name.toLowerCase().replace(' ','-')?'active':''}" onclick="setView('${name.toLowerCase().replace(' ','-')}')">${name}</button>`;}
function header(){return `<div class="topbar"><h2>${state.view[0].toUpperCase()+state.view.slice(1)}</h2><div class="toolbar"><button class="btn secondary" onclick="toggleTheme()">Tema</button><button class="btn secondary" onclick="logout()">Logout</button></div></div>`;}
function toggleTheme(){state.theme=state.theme==='dark'?'light':'dark';applyTheme();render();}
function overviewView(){return `<div class="card-grid">${mockKpis.map(k=>`<article class="card"><div class="kpi">${k.value}</div><p>${k.label}</p></article>`).join('')}</div><div class="panel"><h3>Ringkasan</h3><p>Mockup dashboard berjalan di GitHub Pages tanpa backend.</p></div>`;}
function routesView(){const filtered=mockRoutes.filter(r=>r.path.includes(state.query)||r.method.includes(state.query.toUpperCase()));return `<div class="toolbar"><input placeholder="search path/method" value="${state.query}" oninput="state.query=this.value;render()" /><button class="btn" onclick="openModal()">Tambah Route</button></div><div class="panel"><table><thead><tr><th>Path</th><th>Method</th><th>Upstream</th><th>Status</th></tr></thead><tbody>${filtered.map(r=>`<tr><td>${r.path}</td><td>${r.method}</td><td>${r.upstream}</td><td>${r.enabled?'<span class="badge">enabled</span>':'disabled'}</td></tr>`).join('')}</tbody></table></div>`;}
function tenantsView(){return `<div class="panel"><h3>Tenants</h3><p>platform, acme, globex</p></div>`;}
function apiKeysView(){return `<div class="panel"><table><thead><tr><th>Name</th><th>Prefix</th><th>Status</th></tr></thead><tbody>${mockApiKeys.map(k=>`<tr><td>${k.name}</td><td>${k.prefix}</td><td>${k.status}</td></tr>`).join('')}</tbody></table></div>`;}
function metricsView(){return `<div class="card-grid"><div class="card"><div class="kpi">99.9%</div><p>Uptime</p></div><div class="card"><div class="kpi">120ms</div><p>P95 latency</p></div><div class="card"><div class="kpi">0.2%</div><p>Error rate</p></div></div>`;}
function auditView(){return `<div class="panel"><p>audit.recorded · 100 events simulated</p></div>`;}
function settingsView(){return `<div class="panel"><label>Tema default<select onchange="state.theme=this.value;applyTheme();render()"><option value="dark" ${state.theme==='dark'?'selected':''}>Dark</option><option value="light" ${state.theme==='light'?'selected':''}>Light</option></select></label></div>`;}
function loginView(){return `<div class="panel" style="max-width:360px;margin:4rem auto"><h2>Login Admin</h2><form onsubmit="login(event)"><label>Email<input required type="email" value="admin@michishirube.local"/></label><br/><label>Password<input required type="password" value="demo-password" style="margin-top:.6rem"/></label><button class="btn" style="margin-top:1rem;width:100%">Masuk</button></form><p style="color:var(--muted);font-size:.85rem;margin-top:.8rem">Mock auth, tanpa backend.</p></div>`;}
function openModal(){state.modal=true;render();}
function closeModal(){state.modal=false;render();}
function render(){
if(!state.user){document.getElementById('root').innerHTML=loginView();return;}
const viewMap={overview:overviewView,routes:routesView,tenants:tenantsView,'api-keys':apiKeysView,metrics:metricsView,audit:auditView,settings:settingsView};
const content=viewMap[state.view]?viewMap[state.view]():'<div class="panel">not found</div>';
document.getElementById('root').innerHTML=`<div class="app"><aside class="sidebar"><h1>Michishirube</h1><small>Admin Dashboard Mockup</small><nav>${routes.map(r=>routeLink(r)).join('')}</nav></aside><main>${header()}${content}${state.modal?`<div class="modal-backdrop" onclick="closeModal()"><div class="modal" onclick="event.stopPropagation()"><h3>Tambah Route</h3><p>Form sederhana (mock)</p><button class="btn" onclick="closeModal()">Tutup</button></div></div>`:''}</main></div>`;
}
// adapt setView keys
function setViewState(v){state.view=v;state.query='';state.modal=false;render();}
window.setView=setViewState; window.login=login; window.logout=logout; window.toggleTheme=toggleTheme; window.openModal=openModal; window.closeModal=closeModal; window.state=state;
state.view='overview'; render();
