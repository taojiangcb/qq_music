# Swipper 
轮播图专用插件：
地址: https://swiperjs.com/get-started/

# iScroll 滚动插件
列表滚动插件
http://caibaojian.com/iscroll-5/

# svg矢量图形绘制
矢量图形绘制
https://www.ibm.com/developerworks/cn/web/wa-scalable/


#server-work 之 workbox
webpack.config.cliserverwork.js
```
const WorkboxPlugin = require('workbox-webpack-plugin');
plugins:[
  new WorkboxPlugin.GenerateSW({
      exclude: [
        /\.(?:png|jpg|jpeg|svg)$/,
        /\.(?:js|json)$/,
        /\.(?:html)$/,
        new RegExp('http[s]?://.+\/api\/.+'),

      ],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30
          }
        }
      },
      {
        urlPattern: /\.(?:js|json)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'js_json',
        }
      },
      {
        urlPattern: new RegExp('http[s]?://.+\/api\/.+'),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'api',
        }
      },
      {
        urlPattern: /\.(?:html)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'html',
        }
      }
      ]
    })
  ]
})
]
```

indexserverwork.html
```
<body>
  <script async>
    if (navigator && navigator.serviceWorker) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }
  </script>
  <div id="root">
    <!--{content}--->
  </div>
  <!--{script}-->
</body>
```