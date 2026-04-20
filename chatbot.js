/**
 * Mila's Healing Touch - Decision Tree Chatbot Widget
 * Self-contained. No dependencies. Drop a single <script> tag to use.
 *
 * Usage:
 *   <script src="chatbot.js" defer></script>
 */

(function () {
  'use strict';

  // ─── Brand Tokens ────────────────────────────────────────────────────────────
  var BRAND = {
    primary:   '#5d81ff',
    secondary: '#6412b2',
    dark:      '#1d0426',
    light:     '#f1efef',
    accent:    '#f10065',
    gradStart: '#6412b2',
    gradEnd:   '#5d81ff',
  };

  // ─── Conversation Tree ────────────────────────────────────────────────────────
  var TREE = {
    START: {
      messages: [
        "Hey there! Welcome to Mila's Healing Touch.",
        "I'm here to help you find exactly what you need. What brings you here today?"
      ],
      options: [
        { label: 'I want to book a session',         next: 'BOOK_PATH' },
        { label: "I'm interested in a workshop",     next: 'WORKSHOP_PATH' },
        { label: "I'd like to join the waitlist",    next: 'WAITLIST_PATH' },
        { label: 'Tell me more about what Mila does', next: 'ABOUT_PATH' },
      ],
    },

    BOOK_PATH: {
      messages: [
        "Mila offers 1:1 energy healing sessions online via Zoom - no need to be in the same room. She works with trapped emotions, the Emotion Code, and deep energy clearing.",
        "Just so you know - Mila is currently booked out until the end of May 2026. You can either book ahead or join the waitlist to be first in line.",
      ],
      options: [
        { label: 'Book a 1:1 session',        next: 'LINK', url: 'https://milashealingtouch.as.me' },
        { label: 'Join the waitlist instead', next: 'WAITLIST_PATH' },
        { label: 'What about workshops?',     next: 'WORKSHOP_PATH' },
      ],
    },

    WORKSHOP_PATH: {
      messages: [
        "Mila runs live workshops on Zoom for $111 each. They're hands-on, transformational, and no experience needed. Which one interests you?",
      ],
      options: [
        { label: 'Energy Clearing',             next: 'WORKSHOP_EC' },
        { label: 'Learn the Emotion Code',      next: 'WORKSHOP_EMO' },
        { label: 'Muscle Test Like Mila',       next: 'WORKSHOP_MT' },
        { label: 'Tell me about all of them',   next: 'WORKSHOP_ALL' },
      ],
    },

    WORKSHOP_EC: {
      messages: [
        "In the Energy Clearing workshop, you'll learn how to identify and release trapped emotional energy that's been weighing you down. People walk in carrying years of heaviness and walk out feeling lighter - sometimes in ways they can't even explain.",
        '"Weight lifted like magic." - Multiple clients',
      ],
      options: [
        { label: 'Book Energy Clearing - $111', next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=78587690' },
        { label: 'See other workshops',         next: 'WORKSHOP_PATH' },
        { label: 'Back to start',               next: 'START' },
      ],
    },

    WORKSHOP_EMO: {
      messages: [
        "Learn the Emotion Code is where you'll discover how your body stores emotions and how to find and release them using muscle testing and the Chart of Emotions. This is the foundation of everything Mila does.",
        '"Better after one session than 10 years of talk therapy." - Nancy B',
      ],
      options: [
        { label: 'Book Emotion Code - $111', next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=81779394' },
        { label: 'See other workshops',      next: 'WORKSHOP_PATH' },
        { label: 'Back to start',            next: 'START' },
      ],
    },

    WORKSHOP_MT: {
      messages: [
        "Muscle Test Like Mila teaches you how to communicate directly with your subconscious mind. You'll learn the sway test, finger test, and how to use muscle testing for everyday decisions - not just healing. Once you learn this, you'll never look at your body the same way.",
      ],
      options: [
        { label: 'Book Muscle Testing - $111', next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=81779232' },
        { label: 'See other workshops',        next: 'WORKSHOP_PATH' },
        { label: 'Back to start',              next: 'START' },
      ],
    },

    WORKSHOP_ALL: {
      messages: [
        "Here's what's available:",
        "Energy Clearing ($111) - Learn to identify and release trapped emotional energy. Walk out lighter.",
        "Learn the Emotion Code ($111) - Discover how your body stores emotions and how to release them. The foundation of Mila's work.",
        "Muscle Test Like Mila ($111) - Communicate with your subconscious mind. Use it for healing, decisions, even your pets.",
      ],
      options: [
        { label: 'Book Energy Clearing',  next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=78587690' },
        { label: 'Book Emotion Code',     next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=81779394' },
        { label: 'Book Muscle Testing',   next: 'LINK', url: 'https://milashealingtouch.as.me/?appointmentType=81779232' },
        { label: 'Back to start',         next: 'START' },
      ],
    },

    WAITLIST_PATH: {
      messages: [
        "Mila is currently booked out for 1:1 sessions until the end of May. Join the waitlist and you'll be first to know when spots open up.",
        "In the meantime, her live workshops are running - same energy, same gift, group experience. $111 each.",
      ],
      options: [
        { label: 'Join the waitlist',            next: 'LINK', url: 'https://mila-healing-touch.onrender.com/#waitlist' },
        { label: 'Check out workshops instead',  next: 'WORKSHOP_PATH' },
        { label: 'Back to start',                next: 'START' },
      ],
    },

    ABOUT_PATH: {
      messages: [
        "Mila Velazquez spent 30 years as a Physical Therapist before discovering what medicine couldn't explain. Now she helps women release trapped emotions and chronic pain through energy healing.",
        "She's a Certified Emotion Code Practitioner who bridges the physical and the metaphysical - clinical experience meets consciousness work, the angelic realm, and all kinds of woo. And she owns it.",
        "86,000+ followers on Instagram. 1,690+ YouTube subscribers. Clients across the world.",
      ],
      options: [
        { label: 'Book a session',    next: 'BOOK_PATH' },
        { label: 'See workshops',     next: 'WORKSHOP_PATH' },
        { label: 'Join the waitlist', next: 'WAITLIST_PATH' },
      ],
    },
  };

  var LINK_FAREWELL = "Taking you there now! If you have any questions, Mila's DMs are always open @milashealingtouch";

  // ─── CSS ─────────────────────────────────────────────────────────────────────
  var CSS = [
    /* Keyframes */
    '@keyframes mht-pulse {',
    '  0%,100%{box-shadow:0 0 0 0 rgba(100,18,178,0.55),0 4px 24px rgba(93,129,255,0.35);}',
    '  50%{box-shadow:0 0 0 10px rgba(100,18,178,0),0 4px 24px rgba(93,129,255,0.55);}',
    '}',
    '@keyframes mht-slide-up {',
    '  from{opacity:0;transform:translateY(24px) scale(0.97);}',
    '  to{opacity:1;transform:translateY(0) scale(1);}',
    '}',
    '@keyframes mht-slide-down {',
    '  from{opacity:1;transform:translateY(0) scale(1);}',
    '  to{opacity:0;transform:translateY(24px) scale(0.97);}',
    '}',
    '@keyframes mht-fade-in {',
    '  from{opacity:0;transform:translateY(8px);}',
    '  to{opacity:1;transform:translateY(0);}',
    '}',
    '@keyframes mht-dot {',
    '  0%,80%,100%{transform:scale(0.6);opacity:0.4;}',
    '  40%{transform:scale(1);opacity:1;}',
    '}',
    /* Toggle button */
    '#mht-toggle {',
    '  position:fixed;',
    '  bottom:24px;',
    '  right:24px;',
    '  width:60px;',
    '  height:60px;',
    '  border-radius:50%;',
    '  border:none;',
    '  cursor:pointer;',
    '  background:linear-gradient(135deg,' + BRAND.gradStart + ',' + BRAND.gradEnd + ');',
    '  box-shadow:0 4px 24px rgba(93,129,255,0.35);',
    '  z-index:9998;',
    '  display:flex;',
    '  align-items:center;',
    '  justify-content:center;',
    '  animation:mht-pulse 2.6s ease-in-out infinite;',
    '  transition:transform 0.2s ease;',
    '  outline:none;',
    '}',
    '#mht-toggle:hover{transform:scale(1.08);}',
    '#mht-toggle:focus-visible{outline:3px solid ' + BRAND.primary + ';outline-offset:3px;}',
    '#mht-toggle svg{width:28px;height:28px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}',
    /* Window */
    '#mht-window {',
    '  position:fixed;',
    '  bottom:96px;',
    '  right:24px;',
    '  width:min(400px, calc(100vw - 32px));',
    '  height:520px;',
    '  border-radius:20px;',
    '  overflow:hidden;',
    '  display:flex;',
    '  flex-direction:column;',
    '  z-index:9999;',
    '  box-shadow:0 8px 48px rgba(29,4,38,0.32),0 2px 12px rgba(29,4,38,0.18);',
    '  background:rgba(245,243,248,0.97);',
    '  backdrop-filter:blur(16px);',
    '  -webkit-backdrop-filter:blur(16px);',
    '  border:1px solid rgba(100,18,178,0.12);',
    '  animation:mht-slide-up 0.32s cubic-bezier(0.34,1.2,0.64,1) both;',
    '}',
    '#mht-window.mht-closing{animation:mht-slide-down 0.24s ease forwards;}',
    /* Mobile full-width */
    '@media(max-width:460px){',
    '  #mht-window{right:8px;left:8px;width:auto;bottom:88px;height:calc(100dvh - 104px);}',
    '  #mht-toggle{bottom:16px;right:16px;}',
    '}',
    /* Header */
    '#mht-header {',
    '  background:linear-gradient(135deg,' + BRAND.gradStart + ' 0%,' + BRAND.gradEnd + ' 100%);',
    '  padding:14px 16px 12px;',
    '  display:flex;',
    '  align-items:center;',
    '  gap:10px;',
    '  flex-shrink:0;',
    '}',
    '.mht-avatar {',
    '  width:36px;height:36px;border-radius:50%;',
    '  background:rgba(255,255,255,0.2);',
    '  display:flex;align-items:center;justify-content:center;',
    '  flex-shrink:0;font-size:17px;',
    '}',
    '.mht-header-text{flex:1;min-width:0;}',
    '.mht-header-name {',
    '  font-family:"Cormorant Garamond",Georgia,serif;',
    '  font-size:16px;font-weight:600;color:#fff;',
    '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    '  line-height:1.2;letter-spacing:0.01em;',
    '}',
    '.mht-header-status {',
    '  font-family:Inter,system-ui,sans-serif;',
    '  font-size:11px;color:rgba(255,255,255,0.8);',
    '  display:flex;align-items:center;gap:5px;margin-top:2px;',
    '}',
    '.mht-dot-online {',
    '  width:7px;height:7px;border-radius:50%;',
    '  background:#7fffd4;flex-shrink:0;',
    '}',
    '#mht-close {',
    '  background:rgba(255,255,255,0.15);border:none;cursor:pointer;',
    '  width:30px;height:30px;border-radius:50%;',
    '  display:flex;align-items:center;justify-content:center;',
    '  color:#fff;font-size:18px;line-height:1;flex-shrink:0;',
    '  transition:background 0.15s;',
    '}',
    '#mht-close:hover{background:rgba(255,255,255,0.28);}',
    '#mht-close:focus-visible{outline:2px solid rgba(255,255,255,0.7);outline-offset:2px;}',
    /* Messages area */
    '#mht-messages {',
    '  flex:1;overflow-y:auto;overflow-x:hidden;',
    '  padding:16px 14px 8px;',
    '  display:flex;flex-direction:column;gap:6px;',
    '  scroll-behavior:smooth;',
    '}',
    '#mht-messages::-webkit-scrollbar{width:4px;}',
    '#mht-messages::-webkit-scrollbar-track{background:transparent;}',
    '#mht-messages::-webkit-scrollbar-thumb{background:rgba(100,18,178,0.2);border-radius:4px;}',
    /* Bubble shared */
    '.mht-bubble {',
    '  max-width:82%;',
    '  padding:10px 13px;',
    '  border-radius:16px;',
    '  font-family:Inter,system-ui,sans-serif;',
    '  font-size:14px;line-height:1.5;',
    '  animation:mht-fade-in 0.28s ease both;',
    '  word-break:break-word;',
    '}',
    /* Bot bubble */
    '.mht-bot {',
    '  align-self:flex-start;',
    '  background:#fff;',
    '  color:' + BRAND.dark + ';',
    '  border-bottom-left-radius:4px;',
    '  box-shadow:0 1px 6px rgba(29,4,38,0.08);',
    '}',
    /* Typing indicator */
    '.mht-typing {',
    '  align-self:flex-start;',
    '  background:#fff;',
    '  padding:12px 16px;',
    '  border-radius:16px;border-bottom-left-radius:4px;',
    '  box-shadow:0 1px 6px rgba(29,4,38,0.08);',
    '  display:flex;gap:5px;align-items:center;',
    '}',
    '.mht-typing span {',
    '  width:7px;height:7px;border-radius:50%;',
    '  background:' + BRAND.secondary + ';',
    '  display:inline-block;',
    '  animation:mht-dot 1.2s ease-in-out infinite;',
    '}',
    '.mht-typing span:nth-child(2){animation-delay:0.2s;}',
    '.mht-typing span:nth-child(3){animation-delay:0.4s;}',
    /* Options area */
    '#mht-options {',
    '  padding:8px 14px 14px;',
    '  display:flex;flex-direction:column;gap:7px;',
    '  flex-shrink:0;',
    '  border-top:1px solid rgba(100,18,178,0.07);',
    '  background:rgba(245,243,248,0.97);',
    '}',
    '.mht-option-btn {',
    '  background:#fff;',
    '  border:1.5px solid rgba(93,129,255,0.3);',
    '  border-radius:12px;',
    '  padding:9px 14px;',
    '  font-family:Inter,system-ui,sans-serif;',
    '  font-size:13.5px;font-weight:500;',
    '  color:' + BRAND.secondary + ';',
    '  cursor:pointer;text-align:left;',
    '  transition:all 0.18s ease;',
    '  animation:mht-fade-in 0.28s ease both;',
    '  line-height:1.4;',
    '}',
    '.mht-option-btn:hover {',
    '  background:linear-gradient(135deg,' + BRAND.gradStart + ',' + BRAND.gradEnd + ');',
    '  color:#fff;border-color:transparent;',
    '  transform:translateX(3px);',
    '}',
    '.mht-option-btn:focus-visible {',
    '  outline:2px solid ' + BRAND.primary + ';outline-offset:2px;',
    '}',
    '.mht-option-btn:active{transform:scale(0.98);}',
    /* User reply bubble */
    '.mht-user {',
    '  align-self:flex-end;',
    '  background:linear-gradient(135deg,' + BRAND.gradStart + ',' + BRAND.gradEnd + ');',
    '  color:#fff;',
    '  border-bottom-right-radius:4px;',
    '  box-shadow:0 2px 8px rgba(93,129,255,0.25);',
    '}',
    /* Scrollbar padding */
    '.mht-spacer{height:4px;flex-shrink:0;}',
  ].join('\n');

  // ─── State ────────────────────────────────────────────────────────────────────
  var state = {
    open: false,
    node: 'START',
    busy: false,
  };

  // ─── DOM refs ─────────────────────────────────────────────────────────────────
  var els = {};

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function injectCSS() {
    var tag = document.createElement('style');
    tag.id = 'mht-styles';
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }

  function scrollBottom() {
    var m = els.messages;
    if (m) m.scrollTop = m.scrollHeight;
  }

  function delay(ms) {
    return new Promise(function (res) { setTimeout(res, ms); });
  }

  // ─── Build DOM ────────────────────────────────────────────────────────────────
  function buildWidget() {
    // Toggle button
    var toggle = document.createElement('button');
    toggle.id = 'mht-toggle';
    toggle.setAttribute('aria-label', 'Open chat with Mila\'s Healing Touch');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mht-window');
    toggle.innerHTML = [
      '<svg viewBox="0 0 24 24" aria-hidden="true">',
      '  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
      '</svg>',
    ].join('');
    toggle.addEventListener('click', toggleChat);
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleChat(); }
    });

    // Window
    var win = document.createElement('div');
    win.id = 'mht-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-modal', 'false');
    win.setAttribute('aria-label', "Chat with Mila's Healing Touch");
    win.style.display = 'none';

    // Header
    var header = document.createElement('div');
    header.id = 'mht-header';
    header.innerHTML = [
      '<div class="mht-avatar" aria-hidden="true">',
      '  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
      '  </svg>',
      '</div>',
      '<div class="mht-header-text">',
      '  <div class="mht-header-name">Mila\'s Healing Touch</div>',
      '  <div class="mht-header-status"><span class="mht-dot-online"></span>Here to help</div>',
      '</div>',
    ].join('');

    var closeBtn = document.createElement('button');
    closeBtn.id = 'mht-close';
    closeBtn.setAttribute('aria-label', 'Close chat');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeChat);
    header.appendChild(closeBtn);

    // Messages
    var messages = document.createElement('div');
    messages.id = 'mht-messages';
    messages.setAttribute('role', 'log');
    messages.setAttribute('aria-live', 'polite');
    messages.setAttribute('aria-atomic', 'false');

    // Options
    var options = document.createElement('div');
    options.id = 'mht-options';
    options.setAttribute('role', 'group');
    options.setAttribute('aria-label', 'Reply options');

    win.appendChild(header);
    win.appendChild(messages);
    win.appendChild(options);

    document.body.appendChild(toggle);
    document.body.appendChild(win);

    els.toggle = toggle;
    els.window = win;
    els.messages = messages;
    els.options = options;
  }

  // ─── Chat open / close ────────────────────────────────────────────────────────
  function openChat() {
    state.open = true;
    els.window.style.display = 'flex';
    els.window.classList.remove('mht-closing');
    // Force reflow so animation re-triggers
    void els.window.offsetWidth;
    els.window.style.animation = 'none';
    void els.window.offsetWidth;
    els.window.style.animation = '';
    els.toggle.setAttribute('aria-expanded', 'true');
    els.toggle.setAttribute('aria-label', 'Close chat');
    try { localStorage.setItem('mht-open', '1'); } catch (e) {}
    // Start the conversation if messages area is empty
    if (els.messages.children.length === 0) {
      renderNode(state.node);
    }
    // Focus the close button for keyboard users
    setTimeout(function () { els.window.querySelector('#mht-close').focus(); }, 80);
  }

  function closeChat() {
    state.open = false;
    els.toggle.setAttribute('aria-expanded', 'false');
    els.toggle.setAttribute('aria-label', 'Open chat with Mila\'s Healing Touch');
    try { localStorage.removeItem('mht-open'); } catch (e) {}
    els.window.classList.add('mht-closing');
    setTimeout(function () {
      els.window.style.display = 'none';
      els.window.classList.remove('mht-closing');
      els.toggle.focus();
    }, 240);
  }

  function toggleChat() {
    if (state.open) {
      closeChat();
    } else {
      openChat();
    }
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!state.open) return;
    if (els.window.contains(e.target) || els.toggle.contains(e.target)) return;
    closeChat();
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && state.open) closeChat();
  });

  // ─── Conversation rendering ───────────────────────────────────────────────────
  function addBotBubble(text) {
    var bubble = document.createElement('div');
    bubble.className = 'mht-bubble mht-bot';
    bubble.setAttribute('role', 'article');
    bubble.textContent = text;
    els.messages.appendChild(bubble);
    scrollBottom();
    return bubble;
  }

  function addUserBubble(text) {
    var bubble = document.createElement('div');
    bubble.className = 'mht-bubble mht-user';
    bubble.setAttribute('aria-label', 'You said: ' + text);
    bubble.textContent = text;
    els.messages.appendChild(bubble);
    scrollBottom();
  }

  function showTyping() {
    var indicator = document.createElement('div');
    indicator.className = 'mht-typing';
    indicator.setAttribute('aria-label', 'Typing');
    indicator.innerHTML = '<span></span><span></span><span></span>';
    els.messages.appendChild(indicator);
    scrollBottom();
    return indicator;
  }

  function removeTyping(indicator) {
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  function clearOptions() {
    els.options.innerHTML = '';
  }

  async function renderNode(nodeKey) {
    if (state.busy) return;
    state.busy = true;
    clearOptions();

    var node = TREE[nodeKey];
    if (!node) { state.busy = false; return; }

    // Send each message with typing indicator
    for (var i = 0; i < node.messages.length; i++) {
      var typing = showTyping();
      await delay(600 + Math.random() * 200);
      removeTyping(typing);
      addBotBubble(node.messages[i]);
      if (i < node.messages.length - 1) {
        await delay(300);
      }
    }

    await delay(180);

    // Render options with staggered fade-in
    node.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.className = 'mht-option-btn';
      btn.textContent = opt.label;
      btn.style.animationDelay = (idx * 60) + 'ms';
      btn.addEventListener('click', function () { handleOption(opt); });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOption(opt);
        }
      });
      els.options.appendChild(btn);
    });

    // Move focus to first option for keyboard users
    var firstBtn = els.options.querySelector('.mht-option-btn');
    if (firstBtn) {
      setTimeout(function () {
        firstBtn.focus();
      }, 80);
    }

    scrollBottom();
    state.busy = false;
  }

  async function handleOption(opt) {
    if (state.busy) return;

    // Echo user choice as a right-aligned bubble
    addUserBubble(opt.label);
    clearOptions();

    if (opt.next === 'LINK') {
      // Open link in new tab
      window.open(opt.url, '_blank', 'noopener,noreferrer');

      // Show farewell message
      state.busy = true;
      var typing = showTyping();
      await delay(700);
      removeTyping(typing);
      addBotBubble(LINK_FAREWELL);

      // After a pause, offer to restart
      await delay(500);

      var restartBtn = document.createElement('button');
      restartBtn.className = 'mht-option-btn';
      restartBtn.textContent = 'Start over';
      restartBtn.addEventListener('click', function () {
        clearOptions();
        state.node = 'START';
        renderNode('START');
      });
      els.options.appendChild(restartBtn);

      scrollBottom();
      state.busy = false;
    } else {
      state.node = opt.next;
      renderNode(opt.next);
    }
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    if (document.getElementById('mht-toggle')) return; // already initialised
    injectCSS();
    buildWidget();

    // Re-open if it was open before page reload
    var wasOpen = false;
    try { wasOpen = !!localStorage.getItem('mht-open'); } catch (e) {}
    if (wasOpen) {
      openChat();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
