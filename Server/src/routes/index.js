const accountsRouter = require('./accounts');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const cartsRouter = require('./carts');
const ordersRouter = require('./orders');

const initialRoutes = (app) => {
    app.use('/api/accounts', accountsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/categories', categoriesRouter);
    app.use('/api/carts', cartsRouter);
    app.use('/api/orders', ordersRouter);
};

module.exports = initialRoutes;
