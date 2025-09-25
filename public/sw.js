// Projekt A: Service Worker für Offline-Funktionalität
const CACHE_NAME = 'fc-match-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  // Assets werden automatisch von Vite hinzugefügt
]

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  )
})

// Fetch Event - Cache First Strategy für Assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response
        }
        
        // Clone the request
        const fetchRequest = event.request.clone()
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          // Clone the response
          const responseToCache = response.clone()
          
          // Cache static assets
          if (event.request.url.includes('/assets/')) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
              })
          }
          
          return response
        })
      })
  )
})

// Activate Event - Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// EXT-HOOK: Push-Notifications für Projekt B
// EXT-HOOK: Background-Sync für Projekt C
