if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let c={};const l=e=>i(e,o),t={module:{uri:o},exports:c,require:l};s[o]=Promise.all(n.map((e=>t[e]||l(e)))).then((e=>(r(...e),c)))}}define(["./workbox-5ffe50d4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/HomePage-BYfUT7dE.css",revision:null},{url:"assets/HomePage-CfC9MbJO.js",revision:null},{url:"assets/index-BzsG1zA5.js",revision:null},{url:"assets/index-Cg6lcjUC.css",revision:null},{url:"index.html",revision:"298b579416829161cbe49bbbbf87af96"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"favicon.ico",revision:"3526bcea8dd25c5aede73e6c2454354a"},{url:"maskable-icon-512x512.png",revision:"73fce3f864ac9e9af0c0e189adb0c93b"},{url:"pwa-192x192.png",revision:"7234bb8e89d65145a426775b8f489100"},{url:"pwa-512x512.png",revision:"3a59d0e23c24cf70d01d49e4de19c79f"},{url:"pwa-64x64.png",revision:"78fb597aa7ba63c53a366a193d037030"},{url:"manifest.webmanifest",revision:"9be4ccbd92cf910c3d77a32e3429b820"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
