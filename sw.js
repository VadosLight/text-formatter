if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const a=e=>i(e,l),u={module:{uri:l},exports:o,require:a};s[l]=Promise.all(n.map((e=>u[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/HomePage-DPgfYb5T.js",revision:null},{url:"assets/index-CVjl9qZk.js",revision:null},{url:"assets/index-uKvDROnp.css",revision:null},{url:"assets/index-Uysquy4J.js",revision:null},{url:"assets/PageWrapper-CBn3MSsM.js",revision:null},{url:"assets/PageWrapper-DJdNkw5u.css",revision:null},{url:"assets/PrepareJsonPage-BcF8zQ-W.js",revision:null},{url:"assets/SpaceFixerPage-DOowSTug.js",revision:null},{url:"index.html",revision:"c451768bf57f803140a5c40051d08400"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"3526bcea8dd25c5aede73e6c2454354a"},{url:"maskable-icon-512x512.png",revision:"73fce3f864ac9e9af0c0e189adb0c93b"},{url:"pwa-192x192.png",revision:"7234bb8e89d65145a426775b8f489100"},{url:"pwa-512x512.png",revision:"3a59d0e23c24cf70d01d49e4de19c79f"},{url:"pwa-64x64.png",revision:"78fb597aa7ba63c53a366a193d037030"},{url:"manifest.webmanifest",revision:"9be4ccbd92cf910c3d77a32e3429b820"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
