/**
 * jAIme Chatbot Widget — Dale! Te Pido
 */

(function () {
  if (window.jAImeWidgetInitialized) return;

  // Do NOT render floating FAB helper on landing page (landing page has its dedicated jAIme section)
  const isLandingPage = window.location.pathname === '/' || 
                        window.location.pathname === '/landing' || 
                        window.location.pathname === '/landing.html' || 
                        document.body.hasAttribute('data-disable-jaime-fab');
  
  if (isLandingPage) return;

  window.jAImeWidgetInitialized = true;

  const JAIME_POSES = {
    buenaonda: '/img/jaime/jaime-buenaonda.png',
    pensando: '/img/jaime/jaime-pensando.png',
    alegria: '/img/jaime/jaime-alegria.png',
    empatia: '/img/jaime/jaime-empatia.png',
    resolucion: '/img/jaime/jaime-resolucion.png'
  };

  let currentPose = 'buenaonda';

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes jaimeFloatBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    #jaime-fab {
      position: fixed;
      bottom: 12px;
      right: 18px;
      width: 100px;
      height: 200px;
      max-width: 100px;
      max-height: 200px;
      background: transparent;
      box-shadow: none;
      border: none;
      cursor: pointer;
      z-index: 999990;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      animation: jaimeFloatBounce 4s ease-in-out infinite;
      transition: filter 0.25s ease, transform 0.25s ease;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.6));
    }
    #jaime-fab:hover {
      filter: drop-shadow(0 14px 28px rgba(214, 0, 0, 0.7));
      transform: scale(1.06) translateY(-4px);
    }
    #jaime-fab img {
      max-height: 190px;
      max-width: 100px;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    #jaime-bubble-callout {
      position: absolute;
      top: 0px;
      background: #D60000;
      color: #fff;
      font-size: 10.5px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 99px;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.3);
      pointer-events: none;
    }

    #jaime-window {
      position: fixed;
      bottom: 20px;
      right: 125px;
      width: 380px;
      max-width: calc(100vw - 140px);
      height: 540px;
      max-height: calc(100vh - 40px);
      background: #141111;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.7);
      z-index: 999991;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transition: opacity 0.25s ease, transform 0.25s ease;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
    }
    #jaime-window.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0) scale(1);
    }
    @media (max-width: 600px) {
      #jaime-window {
        right: 12px;
        bottom: 80px;
        width: calc(100vw - 24px);
        max-width: calc(100vw - 24px);
      }
    }

    .jaime-header {
      background: linear-gradient(135deg, #1f1919 0%, #151010 100%);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .jaime-avatar-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .jaime-avatar-img-wrap {
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .jaime-avatar-img-wrap img {
      width: auto;
      height: 44px;
      max-width: 44px;
      object-fit: contain;
      filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
    }
    .jaime-title-name {
      font-size: 15px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .jaime-status-text {
      font-size: 11px;
      color: #10b981;
      font-weight: 600;
    }
    .jaime-close-btn {
      background: transparent;
      border: none;
      color: rgba(255,255,255,0.5);
      font-size: 22px;
      cursor: pointer;
      padding: 4px;
      line-height: 1;
    }
    .jaime-close-btn:hover { color: #fff; }

    /* Character Display Section inside Header/Top */
    .jaime-pose-banner {
      background: radial-gradient(circle at 50% 0%, rgba(214,0,0,0.2) 0%, transparent 70%);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      padding: 10px 16px;
      display: flex;
      align-items: center;
      gap: 14px;
    }
    .jaime-pose-banner img {
      height: 60px;
      width: auto;
      object-fit: contain;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
      transition: transform 0.3s ease;
    }
    .jaime-pose-banner-text {
      font-size: 12px;
      color: rgba(255,255,255,0.75);
      line-height: 1.35;
    }

    .jaime-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #0f0c0c;
    }
    .jaime-msg {
      max-width: 85%;
      padding: 12px 14px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      word-wrap: break-word;
    }
    .jaime-msg-bot {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      color: #e5e7eb;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .jaime-msg-user {
      background: linear-gradient(135deg, #D60000 0%, #b30000 100%);
      color: #ffffff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    .jaime-actions-wrap {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
    }
    .jaime-action-btn {
      background: rgba(214,0,0,0.15);
      border: 1px solid rgba(214,0,0,0.4);
      color: #ff7777;
      padding: 7px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      transition: background 0.2s;
    }
    .jaime-action-btn:hover {
      background: rgba(214,0,0,0.3);
      color: #fff;
    }

    .jaime-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 8px 16px;
      background: #141111;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    .jaime-chip {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.8);
      font-size: 11.5px;
      padding: 5px 10px;
      border-radius: 99px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .jaime-chip:hover {
      background: rgba(214,0,0,0.15);
      border-color: rgba(214,0,0,0.4);
      color: #fff;
    }

    .jaime-footer {
      padding: 12px 14px;
      background: #141111;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .jaime-input {
      flex: 1;
      background: rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 10px;
      padding: 10px 14px;
      color: #fff;
      font-size: 13.5px;
      outline: none;
    }
    .jaime-input:focus {
      border-color: #D60000;
    }
    .jaime-send-btn {
      background: #D60000;
      color: #fff;
      border: none;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
    }
  `;
  document.head.appendChild(style);

  // Widget HTML structure
  const fab = document.createElement('div');
  fab.id = 'jaime-fab';
  fab.title = 'Consultar a jAIme 24/7';
  fab.innerHTML = `
    <div id="jaime-bubble-callout">💬 jAIme 24/7</div>
    <img src="${JAIME_POSES.buenaonda}" alt="jAIme Asistente">
  `;

  const win = document.createElement('div');
  win.id = 'jaime-window';
  win.innerHTML = `
    <div class="jaime-header">
      <div class="jaime-avatar-box">
        <div class="jaime-avatar-img-wrap">
          <img id="jaime-header-pose-img" src="${JAIME_POSES.buenaonda}" alt="jAIme">
        </div>
        <div>
          <div class="jaime-title-name">jAIme <span style="font-size:10px; background:rgba(214,0,0,0.2); border:1px solid rgba(214,0,0,0.4); color:#ff6666; padding:1px 6px; border-radius:4px;">Asistente Virtual</span></div>
          <div class="jaime-status-text">🟢 En línea · Dale! Te Pido</div>
        </div>
      </div>
      <button class="jaime-close-btn" id="jaime-close">&times;</button>
    </div>

    <div class="jaime-pose-banner">
      <img id="jaime-banner-pose-img" src="${JAIME_POSES.buenaonda}" alt="jAIme Pose">
      <div class="jaime-pose-banner-text" id="jaime-banner-pose-text">
        ¡Hola! Soy <strong>jAIme</strong>. ¿En qué puedo ayudarte hoy con tu tienda online?
      </div>
    </div>

    <div class="jaime-body" id="jaime-chat-body">
      <div class="jaime-msg jaime-msg-bot">
        ¡Hola! 👋 Soy <strong>jAIme</strong>, tu asistente virtual. ¿En qué te puedo dar una mano hoy? Elegí una de las opciones o escribime tu duda.
      </div>
    </div>

    <div class="jaime-chips">
      <div class="jaime-chip" data-query="¿Cómo cargo un producto?">📦 Cargar producto</div>
      <div class="jaime-chip" data-query="¿Cómo imprimo mi Código QR?">📱 Descargar QR</div>
      <div class="jaime-chip" data-query="¿Cómo configuro WhatsApp?">💬 Configurar WhatsApp</div>
      <div class="jaime-chip" data-query="¿Cómo cambio mi plan?">⭐ Cambiar de Plan</div>
    </div>

    <div class="jaime-footer">
      <input type="text" id="jaime-input-text" class="jaime-input" placeholder="Escribí tu pregunta aquí..." autocomplete="off">
      <button id="jaime-send-btn" class="jaime-send-btn">➤</button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(win);

  // Event Listeners
  let isOpen = false;
  fab.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      win.classList.add('open');
      document.getElementById('jaime-input-text')?.focus();
    } else {
      win.classList.remove('open');
    }
  });

  document.getElementById('jaime-close')?.addEventListener('click', () => {
    isOpen = false;
    win.classList.remove('open');
  });

  const inputEl = document.getElementById('jaime-input-text');
  const sendBtn = document.getElementById('jaime-send-btn');
  const chatBody = document.getElementById('jaime-chat-body');

  function updatePose(poseName, textNotice) {
    const targetPose = JAIME_POSES[poseName] || JAIME_POSES.buenaonda;
    currentPose = poseName;
    const headerImg = document.getElementById('jaime-header-pose-img');
    const bannerImg = document.getElementById('jaime-banner-pose-img');
    const bannerText = document.getElementById('jaime-banner-pose-text');
    const fabImg = fab.querySelector('img');

    if (headerImg) headerImg.src = targetPose;
    if (bannerImg) bannerImg.src = targetPose;
    if (fabImg) fabImg.src = targetPose;
    if (bannerText && textNotice) bannerText.innerHTML = textNotice;
  }

  async function handleSend(userText) {
    const q = userText || inputEl.value.trim();
    if (!q) return;

    if (inputEl) inputEl.value = '';

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'jaime-msg jaime-msg-user';
    userMsg.textContent = q;
    chatBody.appendChild(userMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Set Pose: Thinking
    updatePose('pensando', '<em>Pensando respuesta...</em>');

    // Append Loading Indicator
    const botLoading = document.createElement('div');
    botLoading.className = 'jaime-msg jaime-msg-bot';
    botLoading.id = 'jaime-loading-indicator';
    botLoading.textContent = 'Pensando... ⏳';
    chatBody.appendChild(botLoading);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const res = await fetch('/api/jaime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q })
      });

      const data = await res.json();
      botLoading.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'jaime-msg jaime-msg-bot';
      
      let htmlContent = (data.reply || '').replace(/\n/g, '<br/>');

      if (data.actions && data.actions.length > 0) {
        htmlContent += '<div class="jaime-actions-wrap">';
        data.actions.forEach(act => {
          htmlContent += `<a href="${act.url}" target="_blank" data-section="${act.section || ''}" class="jaime-action-btn">${act.label}</a>`;
        });
        htmlContent += '</div>';
      }

      botMsg.innerHTML = htmlContent;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Update Pose based on response
      const pose = data.pose || 'buenaonda';
      let notice = '¡Acá tenés la respuesta!';
      if (pose === 'alegria') notice = '¡Qué alegría responderte!';
      if (pose === 'resolucion') notice = '¡Paso a paso resolutivo!';
      if (pose === 'empatia') notice = 'Acá estoy para lo que necesites.';
      
      updatePose(pose, notice);

    } catch (err) {
      botLoading.remove();
      const botErr = document.createElement('div');
      botErr.className = 'jaime-msg jaime-msg-bot';
      botErr.textContent = '¡Ups! Ocurrió un error temporal al conectar. Podés escribirme nuevamente o consultar en /ayuda.';
      chatBody.appendChild(botErr);
      chatBody.scrollTop = chatBody.scrollHeight;
      updatePose('empatia', 'Ocurrió una pequeña falla.');
    }
  }

  sendBtn?.addEventListener('click', () => handleSend());
  inputEl?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });

  document.querySelectorAll('.jaime-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) handleSend(query);
    });
  });

  // Manejador dinámico de acciones para navegar al Dashboard
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.jaime-action-btn');
    if (!btn) return;
    const href = btn.getAttribute('href') || '';
    const section = btn.getAttribute('data-section');

    if (href.startsWith('mailto:')) return;

    const isInsideDashboard = window.location.pathname.includes('dashboard');

    if (isInsideDashboard && section) {
      e.preventDefault();
      if (typeof window.goToMobileView === 'function') {
        window.goToMobileView(section);
      }
      if (section === 'account-plan' || section === 'plan') {
        if (typeof window.openUpgradePlanModal === 'function') {
          window.openUpgradePlanModal();
        }
      }
      return;
    }

    if (!isInsideDashboard && href.startsWith('/dashboard')) {
      e.preventDefault();
      window.location.href = href;
    }
  });

})();
