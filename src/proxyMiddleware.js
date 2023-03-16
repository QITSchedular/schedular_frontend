// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/tokenapi',
//     createProxyMiddleware({
//       target: 'https://login.microsoftonline.com',
//       changeOrigin: true,
//     })
//   );
// };


// import { createProxyMiddleware } from 'http-proxy-middleware';

// // Create a proxy middleware instance
// const apiProxy = createProxyMiddleware('/api', {
//   target: 'https://login.microsoftonline.com',
//   changeOrigin: true,
// });

// // Use the proxy middleware in your app
// fetch('/api/some-endpoint')
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data
//   })
//   .catch(error => {
//     // Handle the error
//   });
