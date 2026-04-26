/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js') + '#' + chrome.runtime.id;
(document.head || document.documentElement).appendChild(script);

/******/ })()
;