/**
 * Comprehensive Visitor & Reading Time Analytics Tracker
 * Reports site opens and active reading durations silently to singhshubham292005@gmail.com
 */

const TARGET_EMAIL = 'singhshubham292005@gmail.com';

// Generate or retrieve persistent session ID for this browsing session
function getSessionId() {
  if (typeof window === 'undefined') return 'unknown_session';
  let id = sessionStorage.getItem('aakanksha_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem('aakanksha_session_id', id);
  }
  return id;
}

// Active reading time accumulator
let activeReadingSeconds = 0;
let lastTick = Date.now();
let trackerInitialized = false;

// Format seconds into human-readable string: e.g. "4 minutes 23 seconds"
export function formatReadingDuration(seconds) {
  const s = Math.max(0, Math.floor(seconds || 0));
  if (s < 60) {
    return `${s} second${s === 1 ? '' : 's'}`;
  }
  const mins = Math.floor(s / 60);
  const remainingSecs = s % 60;
  if (remainingSecs === 0) {
    return `${mins} minute${mins === 1 ? '' : 's'}`;
  }
  return `${mins} min${mins === 1 ? '' : 's'} ${remainingSecs} sec${remainingSecs === 1 ? '' : 's'}`;
}

// Device & screen detector
function getDeviceDetails() {
  if (typeof window === 'undefined') return 'Unknown Device';
  const ua = navigator.userAgent;
  let device = 'Desktop';
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    device = 'iPhone / iPad (iOS)';
  } else if (/Android/.test(ua)) {
    device = 'Android Phone / Tablet';
  } else if (/Macintosh/.test(ua)) {
    device = 'Mac Desktop / Laptop';
  } else if (/Windows/.test(ua)) {
    device = 'Windows PC';
  }

  const width = window.innerWidth || window.screen?.width || 0;
  const height = window.innerHeight || window.screen?.height || 0;
  return `${device} (${width}x${height})`;
}

// Current IST Timestamp string
function getISTTimestamp() {
  try {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });
  } catch {
    return new Date().toISOString();
  }
}

// Silent dispatch to FormSubmit endpoint
async function sendNotification(data) {
  if (typeof window === 'undefined') return;

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const devTag = isDev ? '[TEST / LOCAL] ' : '';

  const payload = {
    ...data,
    _subject: `${devTag}${data._subject}`,
    _template: 'table',
    _captcha: 'false',
  };

  try {
    fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silently catch to never interrupt user
    });
  } catch {
    // Silently catch
  }
}

/**
 * Initialize active time accumulator
 * Pauses automatically when tab is hidden / minimized or phone screen is turned off.
 */
export function initReadingTracker() {
  if (trackerInitialized || typeof window === 'undefined') return;
  trackerInitialized = true;
  lastTick = Date.now();

  setInterval(() => {
    const now = Date.now();
    const elapsed = Math.round((now - lastTick) / 1000);
    lastTick = now;

    if (document.visibilityState === 'visible') {
      // Add elapsed seconds, capping in case of lag/freeze
      activeReadingSeconds += Math.min(elapsed, 2);
    }
  }, 1000);

  // Attach unload/pagehide listener to send session summary on exit if read for > 20s
  const handleExit = () => {
    trackSessionExit();
  };

  window.addEventListener('pagehide', handleExit);
  window.addEventListener('beforeunload', handleExit);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // Tab hidden or switched
      trackSessionExit(true);
    }
  });
}

/**
 * 1. Track Initial Site Open (Sent once per browsing session)
 */
export function trackSiteOpen() {
  if (typeof window === 'undefined') return;

  initReadingTracker();

  // Prevent multiple emails on rapid page reloads in the same session
  if (sessionStorage.getItem('site_open_reported')) {
    return;
  }
  sessionStorage.setItem('site_open_reported', 'true');

  const referrer = document.referrer ? document.referrer : 'Direct Link / WhatsApp / Instagram';

  sendNotification({
    _subject: '👀 Someone just opened aakankshaaa.in!',
    'Event Name': 'Website Opened',
    'Session Time': getISTTimestamp(),
    'Device & Screen': getDeviceDetails(),
    'Traffic Source': referrer,
    'Session ID': getSessionId(),
    Status: 'Browsing Opening screen...',
  });
}

/**
 * 2. Track Password Unlock / Entering Main Journey
 */
export function trackSiteEntered() {
  if (typeof window === 'undefined') return;

  if (sessionStorage.getItem('site_entered_reported')) {
    return;
  }
  sessionStorage.setItem('site_entered_reported', 'true');

  sendNotification({
    _subject: '💖 Aakanksha unlocked & entered the website!',
    'Event Name': 'Unlocked Date Passcode & Entered',
    'Time of Entry': getISTTimestamp(),
    'Device': getDeviceDetails(),
    'Time on Landing Screen': formatReadingDuration(activeReadingSeconds),
    'Session ID': getSessionId(),
    Status: 'Currently reading through the chapters & memories...',
  });
}

/**
 * 3. Track Reached Final Page (Sent when she reaches the very end)
 */
export function trackReachedFinalPage() {
  if (typeof window === 'undefined') return;

  if (sessionStorage.getItem('final_page_reported')) {
    return;
  }
  sessionStorage.setItem('final_page_reported', 'true');

  const durationStr = formatReadingDuration(activeReadingSeconds);

  sendNotification({
    _subject: `📖 Aakanksha reached the Final Page! (${durationStr} reading time)`,
    'Event Name': 'Reached The End of Website',
    'Total Active Reading Time': durationStr,
    'Reached At': getISTTimestamp(),
    'Device': getDeviceDetails(),
    'Session ID': getSessionId(),
    Status: 'Reading final message & interactive options 🤍',
  });
}

/**
 * 4. Track Session Exit / Close
 * Reports total time spent reading if she spent at least 25 seconds
 */
let sessionExitReported = false;

export function trackSessionExit(isTabHiddenOnly = false) {
  if (typeof window === 'undefined') return;

  // Only report if she read for at least 25 seconds
  if (activeReadingSeconds < 25) return;

  // Avoid spamming if already reported full session
  if (sessionExitReported) return;

  // If she already reached the final page, we don't need a duplicate exit email unless she read for 3+ minutes after
  const reachedEnd = !!sessionStorage.getItem('final_page_reported');
  const durationStr = formatReadingDuration(activeReadingSeconds);

  // If tab just became hidden, mark as candidate
  if (isTabHiddenOnly) {
    // Only send if she stayed for significant time
    if (activeReadingSeconds < 60 && !reachedEnd) return;
  }

  sessionExitReported = true;

  sendNotification({
    _subject: `⏱️ Reading Session Complete: ${durationStr} spent on aakankshaaa.in`,
    'Event Name': 'Session Finished',
    'Total Active Reading Time': durationStr,
    'Reached Final Page': reachedEnd ? 'Yes, read till the end! ❤️' : 'Left before reaching the end',
    'Lantern Released': localStorage.getItem('aakanksha_lantern_released') ? 'Yes 🏮' : 'Not yet',
    'Question Answered': localStorage.getItem('aakanksha_gussa_text') || 'No response selected yet',
    'Ended At': getISTTimestamp(),
    'Device': getDeviceDetails(),
    'Session ID': getSessionId(),
  });
}

/**
 * 5. Track Question Answer (Abhi bhi gussa ho mujhse?)
 */
export function trackQuestionAnswer(option) {
  const choiceText = option === 'little' ? 'Thoda sa... 🥺' : 'Haan bohot 😤';
  const durationStr = formatReadingDuration(activeReadingSeconds);

  sendNotification({
    _subject: `💌 Aakanksha answered: "${choiceText}" (${durationStr} reading time)`,
    'Question': 'Abhi bhi gussa ho mujhse?',
    'Her Answer': choiceText,
    'Reading Time Before Answering': durationStr,
    'Answered At': getISTTimestamp(),
    'Device': getDeviceDetails(),
    'Session ID': getSessionId(),
    'Website': 'aakankshaaa.in',
  });
}

/**
 * Get current active reading time in seconds
 */
export function getActiveReadingSeconds() {
  return activeReadingSeconds;
}
