var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    'mako5656.github.io/pwa/',
    'mako5656.github.io/pwa/app.js',
];

self.addEventListener('install', function(event) {
    event.waitUntil(caches
        .open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    // if (self.Notification.permission === "granted") {
        const notificationObject = {
          body: "ここをクリックしてメッセージを表示してください。",
          //data: { url: `${self.location.origin}/some/path` },
          data: { url: 'https://www.winbird-gp.co.jp' },
        };
        self.registration.showNotification(
          "メッセージがあります！",
          notificationObject,
        );
    //   }
});

self.addEventListener('fetch', function(event) {
    event.respondWith(caches
        .match(event.request)
        .then(function(response) {
            return response ? response : fetch(event.request);
        })
    );
});



// サービスワーカーの 'push' イベントで通知を処理する
self.addEventListener('push', function(event) {
    // プッシュ通知データから表示するメッセージを取得
    var message = event.data.text();
  
    // プッシュ通知を表示する
    event.waitUntil(
      self.registration.showNotification('新しい通知', {
        body: message,
        icon: 'images/icon-512.png'
      })
    );
  });
  
  // 通知がクリックされた時の処理
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    // ブラウザを開く
    event.waitUntil(
      clients.openWindow('https://www.winbird-gp.co.jp')
    );
  });