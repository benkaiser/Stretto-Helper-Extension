# Stretto Helper
## Extension used to add extra functionality to the Stretto music player

This extension serves two primary purposes:
1. Fetch youtube stream urls
2. Unblock all CORs requests from Stretto

With these two, Stretto can successfully stream, cache offline, and do a bunch more processing on the client without a server for proxying requests.

## Installation

1. [Download the extension folder from this repo](https://github.com/benkaiser/Stretto-Helper-Extension/raw/master/extension.zip)
2. Unzip the extension folder
3. Go to chrome://extensions in Chrome
4. Toggle the "Developer Mode" in the top right corner
5. Click "Load unpacked"
6. Select the unzipped extension folder
7. Reload Stretto

## For Develoeprs

### Building

Run these commands from the root of the repo:

```
npm install
npm start
```

Then refresh the unpacked extension in chrome://extensions from the above installation steps.

### License

MIT