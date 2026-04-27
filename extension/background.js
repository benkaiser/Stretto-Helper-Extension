const INITIATOR_DOMAINS = ['next.kaiserapps.com', 'localhost', '127.0.0.1'];
const SESSION_RULE_ID_START = 1000;
let nextRuleId = SESSION_RULE_ID_START;

const CORS_HEADERS = [
  { header: 'Access-Control-Allow-Origin', operation: 'set', value: 'null' },
  { header: 'Access-Control-Allow-Methods', operation: 'set', value: 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH' },
  { header: 'Access-Control-Allow-Credentials', operation: 'set', value: 'true' },
  { header: 'Access-Control-Allow-Headers', operation: 'set', value: '*' },
  { header: 'Access-Control-Expose-Headers', operation: 'set', value: '*' },
  { header: 'X-Frame-Options', operation: 'remove' },
];

function isStrettoInitiator(initiator) {
  if (!initiator) return false;
  try {
    const url = new URL(initiator);
    return INITIATOR_DOMAINS.includes(url.hostname);
  } catch (_) {
    return false;
  }
}

// Watch for 302 redirects from our origins and add a temporary session rule
// that sets ACAO: null for the redirect target, since cross-origin redirects
// cause the browser to send Origin: null.
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (!isStrettoInitiator(details.initiator)) return;
    if (details.statusCode < 300 || details.statusCode >= 400) return;

    const locationHeader = details.responseHeaders.find(
      (h) => h.name.toLowerCase() === 'location'
    );
    if (!locationHeader || !locationHeader.value) return;

    const ruleId = nextRuleId++;
    const redirectUrl = locationHeader.value;

    chrome.declarativeNetRequest.updateSessionRules({
      addRules: [
        {
          id: ruleId,
          priority: 2,
          action: {
            type: 'modifyHeaders',
            responseHeaders: CORS_HEADERS,
          },
          condition: {
            urlFilter: redirectUrl,
          },
        },
      ],
    });

  },
  { urls: ['<all_urls>'] },
  ['responseHeaders']
);
