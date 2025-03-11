# Why i am using websocket
Instant Updates when an order is marked as "Complete,". Instead of sending repeated API requests, WebSockets push updates only when needed, reducing server load.

## Why not pooling
Polling would spam the server with requests every few seconds, even if no updates exist.
It could introduce slight delays in reflecting status changes, which is not ideal for real-time order tracking. 

### `npm start`

### `npm test`

### `npm run build`

### `npm run eject`

## Learn More

### Code Splitting

### Analyzing the Bundle Size

### Making a Progressive Web App

### Advanced Configuration

### Deployment
What i have left is Responsive layout for both desktop and mobile.