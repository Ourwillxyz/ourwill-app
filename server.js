const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
// ...other routes and middleware

app.use('/admin', adminRoutes);
// ...app.listen, db connect, etc.
