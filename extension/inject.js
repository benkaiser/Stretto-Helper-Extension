var helperExtensionId = document.currentScript.src.split('#')[1];
if (typeof window.onHelperExtensionReady === 'function') {
  window.onHelperExtensionReady(helperExtensionId);
}
