/**
 * RanSovie It Agency & Technology - Success Toast & Check Animation Notification
 * A Ar Raiyan International Group of Company
 */

(function () {
  'use strict';

  // Inject Styles for Toast and SVG Checkmark Drawing Animation
  function injectToastStyles() {
    if (document.getElementById('albaraqah-toast-styles')) return;

    const style = document.createElement('style');
    style.id = 'albaraqah-toast-styles';
    style.textContent = `
      /* Toast Container */
      #albaraqah-toast-container {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
        max-width: 420px;
        width: calc(100vw - 32px);
      }

      @media (max-width: 640px) {
        #albaraqah-toast-container {
          top: 16px;
          right: 16px;
          left: 16px;
          max-width: none;
          width: auto;
        }
      }

      /* Individual Toast Card */
      .albaraqah-toast {
        pointer-events: auto;
        background: #090D16;
        background: linear-gradient(135deg, #0B1120 0%, #070B14 100%);
        color: #F8FAFC;
        border: 1px solid rgba(212, 175, 55, 0.35);
        border-radius: 16px;
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.15);
        overflow: hidden;
        position: relative;
        animation: albaraqahToastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }

      .albaraqah-toast.is-leaving {
        animation: albaraqahToastSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
      }

      /* Subtle Checkmark SVG Animation */
      .albaraqah-check-circle {
        stroke-dasharray: 126;
        stroke-dashoffset: 126;
        animation: albaraqahCheckCircle 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.05s forwards;
      }

      .albaraqah-check-stem {
        stroke-dasharray: 36;
        stroke-dashoffset: 36;
        animation: albaraqahCheckMark 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.32s forwards;
      }

      @keyframes albaraqahCheckCircle {
        0% { stroke-dashoffset: 126; opacity: 0.2; transform-origin: center; transform: scale(0.9); }
        60% { opacity: 1; transform: scale(1.04); }
        100% { stroke-dashoffset: 0; opacity: 1; transform: scale(1); }
      }

      @keyframes albaraqahCheckMark {
        0% { stroke-dashoffset: 36; opacity: 0; }
        100% { stroke-dashoffset: 0; opacity: 1; }
      }

      @keyframes albaraqahToastSlideIn {
        0% { opacity: 0; transform: translateY(-24px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes albaraqahToastSlideOut {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-16px) scale(0.95); }
      }

      /* Toast Progress Bar */
      .albaraqah-toast-progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #10B981, #D4AF37);
        width: 100%;
        transform-origin: left;
      }
    `;
    document.head.appendChild(style);
  }

  // Ensure Toast Container Exists in DOM
  function getOrCreateContainer() {
    let container = document.getElementById('albaraqah-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'albaraqah-toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Notifications');
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Show Success Toast with Animated SVG Check
   * @param {Object} options
   * @param {string} options.title - Header title
   * @param {string} options.message - Descriptive text
   * @param {string} [options.referenceId] - Unique reference badge
   * @param {string} [options.type] - 'quote' or 'contact' or 'success'
   * @param {number} [options.duration] - Auto dismiss duration in ms (default 5000)
   */
  window.showSuccessToast = function (options) {
    injectToastStyles();
    const container = getOrCreateContainer();

    const title = options.title || 'Message Sent Successfully!';
    const message = options.message || 'Thank you for reaching out. Our team will review your request and reply shortly.';
    const referenceId = options.referenceId || ('AB-' + Math.floor(100000 + Math.random() * 900000));
    const duration = options.duration || 5000;
    const isQuote = options.type === 'quote';

    const toast = document.createElement('div');
    toast.className = 'albaraqah-toast';
    toast.setAttribute('role', 'alert');

    toast.innerHTML = `
      <div style="padding: 16px 18px 18px 16px; display: flex; align-items: flex-start; gap: 14px;">
        
        <!-- Subtle Animated SVG Check Circle -->
        <div style="position: relative; width: 44px; height: 44px; shrink-0; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; inset: -4px; background: rgba(16, 185, 129, 0.15); border-radius: 50%; filter: blur(6px);"></div>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style="display: block; position: relative;">
            <!-- Outer soft gold/emerald background circle -->
            <circle cx="24" cy="24" r="20" stroke="rgba(212, 175, 55, 0.25)" stroke-width="2.5" />
            <!-- Animated Drawing Circle -->
            <circle class="albaraqah-check-circle" cx="24" cy="24" r="20" stroke="#10B981" stroke-width="3" stroke-linecap="round" />
            <!-- Animated Drawing Checkmark Stem -->
            <path class="albaraqah-check-stem" d="M14.5 24.5L21.5 31.5L33.5 17.5" stroke="#FDE047" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- Content Body -->
        <div style="flex: 1; min-width: 0;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="font-weight: 800; font-size: 14px; color: #FFFFFF; letter-spacing: -0.01em;">
              ${title}
            </span>
            <span style="font-size: 10px; font-family: monospace; font-weight: 700; color: #D4AF37; background: rgba(212, 175, 55, 0.15); padding: 2px 6px; border-radius: 6px; border: 1px solid rgba(212, 175, 55, 0.3);">
              #${referenceId}
            </span>
          </div>

          <p style="font-size: 12.5px; line-height: 1.5; color: rgba(255, 255, 255, 0.75); margin: 0 0 8px 0;">
            ${message}
          </p>

          <div style="display: flex; align-items: center; gap: 12px; font-size: 11px; color: rgba(255, 255, 255, 0.45); font-weight: 500;">
            <span><i class="fa-regular fa-clock" style="color:#D4AF37; margin-right:4px;"></i> 24h Response SLA</span>
            <span>•</span>
            <span style="color:#10B981;"><i class="fa-solid fa-shield-halved" style="margin-right:4px;"></i> Confidential</span>
          </div>
        </div>

        <!-- Close Button -->
        <button type="button" class="albaraqah-toast-close" style="background: transparent; border: none; color: rgba(255, 255, 255, 0.4); hover:color: #FFFFFF; cursor: pointer; padding: 4px; font-size: 14px; line-height: 1; transition: color 0.2s;" title="Dismiss notification" aria-label="Close notification">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Linear Countdown Progress Bar -->
      <div class="albaraqah-toast-progress-bar" style="animation: albaraqahProgress ${duration}ms linear forwards;"></div>
    `;

    // Add progress animation keyframe dynamically
    if (!document.getElementById('albaraqah-progress-keyframes')) {
      const kf = document.createElement('style');
      kf.id = 'albaraqah-progress-keyframes';
      kf.textContent = `
        @keyframes albaraqahProgress {
          0% { transform: scaleX(1); }
          100% { transform: scaleX(0); }
        }
      `;
      document.head.appendChild(kf);
    }

    container.appendChild(toast);

    // Dismiss Logic
    let isDismissed = false;
    function dismiss() {
      if (isDismissed) return;
      isDismissed = true;
      toast.classList.add('is-leaving');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }

    // Auto dismiss after duration
    const timer = setTimeout(dismiss, duration);

    // Close button
    const closeBtn = toast.querySelector('.albaraqah-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismiss();
      });
    }

    // Keyboard dismissal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearTimeout(timer);
        dismiss();
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return toast;
  };

  // Initialize styles on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectToastStyles);
  } else {
    injectToastStyles();
  }
})();
