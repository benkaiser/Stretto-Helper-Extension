declare const chrome: any;

var script = document.createElement('script');
script.textContent = "var helperExtensionId = " + JSON.stringify(chrome.runtime.id);
(document.head||document.documentElement).appendChild(script);
script.parentNode?.removeChild(script);