# Stretto Helper
## Extension used to add extra functionality to the Stretto music player

This extension bypasses CORS restrictions for requests originating from Stretto, allowing the music player to stream audio, cache songs offline, and perform client-side processing without a server proxy.

It uses Chrome's Manifest V3 [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) API to inject CORS headers into responses, scoped to requests from Stretto origins only. A lightweight service worker handles 302 redirect chains (e.g. YouTube redirecting to blob storage) by dynamically adding session rules.

## Installation

1. [Download the extension zip from this repo](https://github.com/benkaiser/Stretto-Helper-Extension/raw/master/extension.zip)
2. Unzip the extension folder
3. Go to `chrome://extensions` in Chrome
4. Toggle "Developer Mode" in the top right corner
5. Click "Load unpacked"
6. Select the unzipped extension folder
7. Reload Stretto

## For Developers

### Building

Run these commands from the root of the repo:

```
npm install
npm start
```

To create a distributable zip:

```
npm run create-zip
```

Then refresh the unpacked extension in `chrome://extensions` from the above installation steps.

### License

MIT
