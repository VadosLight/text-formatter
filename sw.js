if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>n(e,o),f={module:{uri:o},exports:c,require:t};i[o]=Promise.all(s.map((e=>f[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BUXkfKUS.css",revision:null},{url:"assets/index-nXV0Ymgw.js",revision:null},{url:"index.html",revision:"62b8a7763bd29ca92b716f03546570a1"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"3526bcea8dd25c5aede73e6c2454354a"},{url:"maskable-icon-512x512.png",revision:"73fce3f864ac9e9af0c0e189adb0c93b"},{url:"pwa-192x192.png",revision:"7234bb8e89d65145a426775b8f489100"},{url:"pwa-512x512.png",revision:"3a59d0e23c24cf70d01d49e4de19c79f"},{url:"pwa-64x64.png",revision:"78fb597aa7ba63c53a366a193d037030"},{url:"manifest.webmanifest",revision:"a2f1f6f17ef523d97d0b51de8b43c45f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));