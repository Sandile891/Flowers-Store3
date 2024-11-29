// Service Worker File: service-worker.js

const CACHE_NAME = 'my-pwa-cache-v1';
const ASSETS_TO_CACHE = [
    '/', // Cache root path
    'index.html',
    'styles.css',  // Replace with your actual CSS file path if different
    '/app.js',     // Replace with your actual JavaScript file path if different
    'manifest.json',
    '/favicon.ico',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

// Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Service Worker: Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
    console.log('Service Worker: Fetching', event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match('/index.html');
        })
    );
});
