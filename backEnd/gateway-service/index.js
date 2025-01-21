const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy-middleware');

const gatewayRoutes = require('./routes/gatewayRoutes');

const app = express();
app.use(bodyParser.json());

// Apply gateway routes
app.use('/api', gatewayRoutes);

// Start the Gateway service
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Gateway Service is running on port ${PORT}`);
});
