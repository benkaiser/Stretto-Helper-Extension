# Youtube Audio Fetcher
## Get youtube URLs from the extension context

Since youtube scraping cannot happen within the context of a page even with cross-origin headers added, this extension is needed to pull the requests out of a webpage context.

## Installation

1. [Download the extension folder from this repo](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/benkaiser/youtube-audio-fetcher/tree/master/extension)
2. Unzip the extension folder
3. Go to chrome://extensions in Chrome
4. Toggle the "Developer Mode" in the top right corner
5. Click "Load unpacked"
6. Select the unzipped extension folder
7. Use stretto with superpower now

## Building

Run these commands from the root of the repo:

```
npm install
npm start
```

Then refresh the unpacked extension in chrome://extensions from the above installation steps.

## License

MIT