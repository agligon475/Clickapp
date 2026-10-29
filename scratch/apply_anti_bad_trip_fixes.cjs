const fs = require('fs');

function assertReplaced(before, after, label) {
  if (before === after) {
    console.warn(`[WARN] Replacement had no effect (or already applied): ${label}`);
  } else {
    console.log(`[OK] Applied: ${label}`);
  }
}

// ============================================================================
// 1. alta-usuario.html
// ============================================================================
{
  let content = fs.readFileSync('alta-usuario.html', 'utf8');
  let prev = content;

  content = content.replace(
    `<button id="tab-login-btn" type="button" onclick="switchAuthTab('login')" style="flex:1; padding:9px 16px; background:var(--primary); color:#fff; border:none; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.2s;">`,
    `<button id="tab-login-btn" type="button" onclick="switchAuthTab('login')" style="flex:1; padding:9px 16px; background:transparent; color:var(--text-muted); border:none; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.2s;">`
  );
  content = content.replace(
    `<button id="tab-register-btn" type="button" onclick="switchAuthTab('register')" style="flex:1; padding:9px 16px; background:transparent; color:var(--text-muted); border:none; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.2s;">`,
    `<button id="tab-register-btn" type="button" onclick="switchAuthTab('register')" style="flex:1; padding:9px 16px; background:var(--primary); color:#fff; border:none; border-radius:8px; font-weight:700; font-size:13px; cursor:pointer; transition:all 0.2s;">`
  );
  content = content.replace(
    `<div id="panel-login-mode" style="display: block;">`,
    `<div id="panel-login-mode" style="display: none;">`
  );
  content = content.replace(
    `<div id="form-container" style="display: none;">`,
    `<div id="form-container" style="display: block;">`
  );

  content = content.replace(
    /const sessionData = \{\r?\n\s*store_id: storeId,\r?\n\s*token: 'auto-registered-' \+ Date\.now\(\),\r?\n\s*plan_level: 'trial',\r?\n\s*timestamp: Date\.now\(\)\r?\n\s*\};\r?\n\s*sessionStorage\.setItem\('storeapp_logged_in_' \+ storeId, 'true'\);/,
    `let signedToken = 'auto-registered-' + Date.now();
      try {
        const authRes = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', store_id: storeId, password: password })
        });
        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData && authData.token) signedToken = authData.token;
        }
      } catch (e) {}
      const sessionData = {
        store_id: storeId,
        token: signedToken,
        plan_level: 'trial',
        timestamp: Date.now()
      };
      sessionStorage.setItem('storeapp_logged_in_' + storeId, 'true');
      sessionStorage.setItem('storeapp_token_' + storeId, signedToken);`
  );

  content = content.replace(
    /sessionStorage\.setItem\('storeapp_logged_in_' \+ data\.store_id, 'true'\);\r?\n\s*localStorage\.setItem\('storeapp_logged_in_' \+ data\.store_id, 'true'\);/,
    `sessionStorage.setItem('storeapp_logged_in_' + data.store_id, 'true');
        sessionStorage.setItem('storeapp_token_' + data.store_id, data.token);
        localStorage.setItem('storeapp_logged_in_' + data.store_id, 'true');`
  );

  content = content.replace(
    /if \(urlParams\.get\('action'\) === 'register'\) \{\r?\n\s*switchAuthTab\('register'\);\r?\n\s*\} else \{\r?\n\s*switchAuthTab\('login'\);\r?\n\s*const savedStore = localStorage\.getItem\('storeapp_store_id'\) \|\| localStorage\.getItem\('daletepido_store_id'\);\r?\n\s*const storeInp = document\.getElementById\('login-store-id'\);\r?\n\s*if \(storeInp && !storeInp\.value && savedStore && savedStore !== 'noutacc' && savedStore !== 'ferre-now'\) \{\r?\n\s*storeInp\.value = savedStore;\r?\n\s*\}\r?\n\s*setTimeout\(\(\) => \{\r?\n\s*if \(storeInp && !storeInp\.value\) storeInp\.focus\(\);\r?\n\s*\}, 100\);\r?\n\s*\}/,
    `if (urlParams.get('action') === 'login' || urlParams.get('reset_store')) {
      switchAuthTab('login');
      const savedStore = localStorage.getItem('storeapp_store_id') || localStorage.getItem('daletepido_store_id');
      const storeInp = document.getElementById('login-store-id');
      if (storeInp && !storeInp.value && savedStore && savedStore !== 'noutacc' && savedStore !== 'ferre-now') {
        storeInp.value = savedStore;
      }
      setTimeout(() => {
        if (storeInp && !storeInp.value) storeInp.focus();
      }, 100);
    } else {
      switchAuthTab('register');
      setTimeout(() => {
        const nameInp = document.getElementById('store-name');
        if (nameInp && !nameInp.value) nameInp.focus();
      }, 100);
    }`
  );

  assertReplaced(prev, content, 'alta-usuario.html updates');
  fs.writeFileSync('alta-usuario.html', content, 'utf8');
}

// ============================================================================
// 2. landing.html
// ============================================================================
{
  let content = fs.readFileSync('landing.html', 'utf8');
  let prev = content;

  content = content.replace(/href="\/alta-usuario"/g, 'href="/alta-usuario?action=register"');

  content = content.replace(
    /const sessionData = \{\r?\n\s*store_id: storeId,\r?\n\s*token: 'auto-registered-' \+ Date\.now\(\),\r?\n\s*plan_level: 'trial',\r?\n\s*timestamp: Date\.now\(\)\r?\n\s*\};\r?\n\s*sessionStorage\.setItem\('storeapp_logged_in_' \+ storeId, 'true'\);/,
    `let signedToken = 'auto-registered-' + Date.now();
                try {
                    const authRes = await fetch('/api/auth', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'login', store_id: storeId, password: password })
                    });
                    if (authRes.ok) {
                        const authData = await authRes.json();
                        if (authData && authData.token) signedToken = authData.token;
                    }
                } catch (e) {}
                const sessionData = {
                    store_id: storeId,
                    token: signedToken,
                    plan_level: 'trial',
                    timestamp: Date.now()
                };
                sessionStorage.setItem('storeapp_logged_in_' + storeId, 'true');
                sessionStorage.setItem('storeapp_token_' + storeId, signedToken);`
  );

  assertReplaced(prev, content, 'landing.html updates');
  fs.writeFileSync('landing.html', content, 'utf8');
}

// ============================================================================
// 3. tienda.html (Sync new order to AES-256-GCM cloud vault in /api/auth)
// ============================================================================
{
  let content = fs.readFileSync('tienda.html', 'utf8');
  let prev = content;

  content = content.replace(
    /localStorage\.setItem\(`storeapp_orders_\$\{STORE_ID\}`, JSON\.stringify\(cleanList\)\);\r?\n\s*\} catch\(e\) \{\r?\n\s*console\.warn\('Advertencia al guardar orden en localStorage:', e\.message\);\r?\n\s*\}/,
    `localStorage.setItem(\`storeapp_orders_\${STORE_ID}\`, JSON.stringify(cleanList));
    } catch(e) {
      console.warn('Advertencia al guardar orden en localStorage:', e.message);
    }

    // ── 3.1 Sincronización Cloud Cifrada para Tablero Kanban & Tracking Multi-Dispositivo ──
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sync_order_create',
        store_id: STORE_ID,
        order: localOrder
      })
    }).catch(err => console.warn('Sync order vault warning:', err));`
  );

  assertReplaced(prev, content, 'tienda.html cloud order sync');
  fs.writeFileSync('tienda.html', content, 'utf8');
}

// ============================================================================
// 4. dashboard.html
// ============================================================================
{
  let content = fs.readFileSync('dashboard.html', 'utf8');
  let prev = content;

  // 4a. Remove hardcoded fallback passwords and preserve token in daletepido_session
  content = content.replace(
    /if \(storeRow\.password === passInput \|\| passInput === 'admin123' \|\| passInput === 'daletepido2026'\)/g,
    `if (storeRow.password && storeRow.password === passInput)`
  );
  content = content.replace(
    /if \(!storeRow\.password \|\| storeRow\.password === passInput \|\| passInput === 'admin123' \|\| passInput === 'daletepido2026'\)/g,
    `if (storeRow.password && storeRow.password === passInput)`
  );

  content = content.replace(
    /originalLocalStorage\.setItem\('daletepido_session', JSON\.stringify\(\{\r?\n\s*store_id: finalStoreId,\r?\n\s*timestamp: Date\.now\(\)\r?\n\s*\}\)\);/,
    `const savedTok = sessionStorage.getItem('storeapp_token_' + finalStoreId) || '';
        originalLocalStorage.setItem('daletepido_session', JSON.stringify({
          store_id: finalStoreId,
          token: savedTok,
          plan_level: sessionStorage.getItem('storeapp_plan_level_' + finalStoreId) || 'starter',
          timestamp: Date.now()
        }));`
  );

  // 4b. Add getStoreSessionToken() helper right before safeFetchSupabase
  if (!content.includes('function getStoreSessionToken()')) {
    content = content.replace(
      /async function safeFetchSupabase\(url, options = \{\}\) \{/,
      `function getStoreSessionToken() {
      try {
        const stTok = sessionStorage.getItem('storeapp_token_' + STORE_ID);
        if (stTok && stTok.includes('.')) return stTok;
        const sessRaw = localStorage.getItem('daletepido_session');
        if (sessRaw) {
          const sess = JSON.parse(sessRaw);
          if (sess && sess.token && sess.token.includes('.')) return sess.token;
        }
      } catch (e) {}
      return '';
    }

    async function safeFetchSupabase(url, options = {}) {`
    );
  }

  // 4c. Include x-store-session in /api/gemini calls
  content = content.replace(
    /headers: \{\r?\n\s*'x-gemini-key': geminiKey,\r?\n\s*'content-type': 'application\/json'\r?\n\s*\}/g,
    `headers: {
              'x-gemini-key': geminiKey,
              'x-store-session': getStoreSessionToken(),
              'content-type': 'application/json'
            }`
  );
  content = content.replace(
    /headers: \{\r?\n\s*'x-gemini-key': key,\r?\n\s*'content-type': 'application\/json'\r?\n\s*\}/g,
    `headers: {
            'x-gemini-key': key,
            'x-store-session': getStoreSessionToken(),
            'content-type': 'application/json'
          }`
  );

  // 4d. Update syncOrdersFromCloudAndStorage() to fetch from /api/auth (sync_orders_list) + Supabase
  content = content.replace(
    /\/\/ 2\. Sincronizar pedidos desde la base de datos Supabase\r?\n\s*let cloudList = \[\];\r?\n\s*try \{\r?\n\s*const res = await safeFetchSupabase\(`\$\{SUPABASE_URL\}\/rest\/v1\/orders\?store_id=eq\.\$\{encodeURIComponent\(STORE_ID\)\}&order=created_at\.desc`\);/,
    `// 2. Sincronizar pedidos desde el Vault Cloud Cifrado (/api/auth) y Supabase
      let cloudList = [];
      try {
        const vaultRes = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'sync_orders_list', store_id: STORE_ID })
        });
        if (vaultRes.ok) {
          const vaultData = await vaultRes.json();
          if (vaultData && Array.isArray(vaultData.orders)) {
            cloudList = vaultData.orders.map(o => ({
              ...o,
              id: o.id || o.order_number,
              store_id: o.store_id || STORE_ID,
              estado: o.estado || o.status || 'confirmar'
            }));
          }
        }
      } catch (e) {}

      try {
        const res = await safeFetchSupabase(\`\${SUPABASE_URL}/rest/v1/orders?store_id=eq.\${encodeURIComponent(STORE_ID)}&order=created_at.desc\`);`
  );

  content = content.replace(
    /cloudList = rawCloud\.map\(o => \{/,
    `const directOrders = rawCloud.map(o => {`
  );

  content = content.replace(
    /weight_kg: 0\.5,\r?\n\s*category: 'SMALL_BOX'\r?\n\s*\};\r?\n\s*\}\);/,
    `weight_kg: 0.5,
                category: 'SMALL_BOX'
              };
            });
            const existingIds = new Set(cloudList.map(x => x.id));
            directOrders.forEach(dOrd => {
              if (!existingIds.has(dOrd.id)) cloudList.push(dOrd);
            });`
  );

  // Also ensure cloud status wins if cloud order has a newer updated_at
  content = content.replace(
    /if \(!map\.has\(o\.id\)\) \{\r?\n\s*map\.set\(o\.id, o\);\r?\n\s*\} else \{\r?\n\s*const localObj = map\.get\(o\.id\);\r?\n\s*map\.set\(o\.id, \{ \.\.\.o, \.\.\.localObj \}\);\r?\n\s*\}/,
    `if (!map.has(o.id)) {
            map.set(o.id, o);
          } else {
            const localObj = map.get(o.id);
            map.set(o.id, { ...localObj, ...o, estado: o.estado || localObj.estado });
          }`
  );

  // 4e. Sync manual order creation, changeOrderEstado, assignPickUp, deleteOrder to /api/auth
  content = content.replace(
    /\/\/ Save to local list\r?\n\s*allOrders\.unshift\(order\);\r?\n\s*saveOrders\(allOrders\);/,
    `// Save to local list & Cloud Vault
      allOrders.unshift(order);
      saveOrders(allOrders);
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync_order_create', store_id: STORE_ID, order })
      }).catch(() => {});`
  );

  content = content.replace(
    /const previousEstado = o\.estado;\r?\n\s*o\.estado = estado;\r?\n\s*saveOrders\(allOrders\);/,
    `const previousEstado = o.estado;
      o.estado = estado;
      saveOrders(allOrders);
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_order_update',
          store_id: STORE_ID,
          order_id: id,
          updates: { estado, status: estado },
          full_order: o
        })
      }).catch(() => {});`
  );

  content = content.replace(
    /o\.pickup_id = pickupId;\r?\n\s*saveOrders\(allOrders\);/,
    `o.pickup_id = pickupId;
      saveOrders(allOrders);
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_order_update',
          store_id: STORE_ID,
          order_id: orderId,
          updates: { pickup_id: pickupId, pickup_cost: o.pickup_cost },
          full_order: o
        })
      }).catch(() => {});`
  );

  content = content.replace(
    /function deleteOrder\(id\) \{\r?\n\s*if \(!confirm\('¿Eliminar este pedido\?'\)\) return;\r?\n\s*allOrders = allOrders\.filter\(x => x\.id !== id\);\r?\n\s*saveOrders\(allOrders\);/,
    `function deleteOrder(id) {
      if (!confirm('¿Eliminar este pedido?')) return;
      allOrders = allOrders.filter(x => x.id !== id);
      saveOrders(allOrders);
      fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync_order_update',
          store_id: STORE_ID,
          order_id: id,
          delete: true
        })
      }).catch(() => {});`
  );

  // 4f. Sync Pickups (savePickup, deletePickup, loadPickupsList) via /api/auth
  content = content.replace(
    /localStorage\.setItem\('storeapp_pickups_' \+ STORE_ID, JSON\.stringify\(window\.currentPickups\)\);\r?\n\s*showView\('pickups'\);/,
    `localStorage.setItem('storeapp_pickups_' + STORE_ID, JSON.stringify(window.currentPickups));
        fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sync_pickups',
            store_id: STORE_ID,
            sub_action: 'replace_all',
            pickups: window.currentPickups
          })
        }).catch(() => {});
        showView('pickups');`
  );

  content = content.replace(
    /if \(window\.currentPickups\) \{\r?\n\s*window\.currentPickups = window\.currentPickups\.filter\(p => String\(p\.id\) !== String\(id\)\);\r?\n\s*localStorage\.setItem\('storeapp_pickups_' \+ STORE_ID, JSON\.stringify\(window\.currentPickups\)\);\r?\n\s*\}/,
    `if (window.currentPickups) {
        window.currentPickups = window.currentPickups.filter(p => String(p.id) !== String(id));
        localStorage.setItem('storeapp_pickups_' + STORE_ID, JSON.stringify(window.currentPickups));
        fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'sync_pickups',
            store_id: STORE_ID,
            sub_action: 'delete',
            pickup_id: id
          })
        }).catch(() => {});
      }`
  );

  content = content.replace(
    /let pickups = null;\r?\n\s*try \{\r?\n\s*pickups = await fetchFromSupabase\('pickups', \{ filter: 'order=id\.asc' \}\);\r?\n\s*\} catch \(e\) \{\r?\n\s*console\.warn\('Supabase fetch pickups error:', e\);\r?\n\s*\}/,
    `let pickups = null;
        try {
          const puVaultRes = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'sync_pickups', store_id: STORE_ID, sub_action: 'list' })
          });
          if (puVaultRes.ok) {
            const puVaultData = await puVaultRes.json();
            if (puVaultData && Array.isArray(puVaultData.pickups) && puVaultData.pickups.length > 0) {
              pickups = puVaultData.pickups;
            }
          }
        } catch (e) {}`
  );

  assertReplaced(prev, content, 'dashboard.html updates');
  fs.writeFileSync('dashboard.html', content, 'utf8');
}

// ============================================================================
// 5. tracking.html (Live Cloud Tracking via /api/auth + 8s Auto-Refresh)
// ============================================================================
{
  let content = fs.readFileSync('tracking.html', 'utf8');
  let prev = content;

  content = content.replace(
    /\/\/ 1\. Intentar buscar en Supabase por order_number o id\r?\n\s*let found = null;\r?\n\s*try \{\r?\n\s*const res = await fetch\(`\$\{SUPABASE_URL\}\/rest\/v1\/orders\?or=\(order_number\.eq\.\$\{encodeURIComponent\(orderParam\)\},id\.eq\.\$\{encodeURIComponent\(orderParam\)\}\)&limit=1`, \{\r?\n\s*headers: \{ 'apikey': ANON_KEY, 'Authorization': `Bearer \$\{ANON_KEY\}` \}\r?\n\s*\}\);/,
    `// 1. Consultar estado actualizado desde el Vault Cloud Seguro (/api/auth)
        let found = null;
        try {
          const apiRes = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'track_order', store_id: storeParam, order_id: orderParam })
          });
          if (apiRes.ok) {
            const apiData = await apiRes.json();
            if (apiData && apiData.success && apiData.order) {
              found = apiData.order;
              if (!storeParam && apiData.store_id) {
                loadStoreConfig(apiData.store_id);
              }
            }
          }
        } catch(e) {}

        // 1b. Fallback directo a Supabase si no se halló en el vault
        if (!found) {
          try {
            const res = await fetch(\`\${SUPABASE_URL}/rest/v1/orders?or=(order_number.eq.\${encodeURIComponent(orderParam)},id.eq.\${encodeURIComponent(orderParam)})&limit=1\`, {
              headers: { 'apikey': ANON_KEY, 'Authorization': \`Bearer \${ANON_KEY}\` }
            });`
  );

  content = content.replace(
    /\} catch\(e\) \{\r?\n\s*console\.warn\('\[Tracking\] Error buscando en Supabase:', e\);\r?\n\s*\}/,
    `  } catch(e) {
            console.warn('[Tracking] Error buscando en Supabase:', e);
          }
        }`
  );

  content = content.replace(
    /\/\/ Inicio\r?\n\s*initSupabase\(\);\r?\n\s*if \(storeParam\) loadStoreConfig\(storeParam\);\r?\n\s*fetchOrder\(\);/,
    `// Inicio y refresco reactivo cada 8 segundos
      initSupabase();
      if (storeParam) loadStoreConfig(storeParam);
      fetchOrder();
      setInterval(() => {
        fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'track_order', store_id: storeParam, order_id: orderParam })
        }).then(r => r.ok ? r.json() : null).then(d => {
          if (d && d.success && d.order) renderOrder(d.order);
        }).catch(() => {});
      }, 8000);`
  );

  assertReplaced(prev, content, 'tracking.html cloud tracking updates');
  fs.writeFileSync('tracking.html', content, 'utf8');
}

