const express = require('express');
const app = express();
// const exampleRoutes = require('./routes/exampleRoutes');

// app.set('view engine', 'ejs'); // Set view engine to EJS
// app.use(express.json());
// app.use(express.static('public'));

// app.use('/example', exampleRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
