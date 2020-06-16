const { Router } = require('express');

const routes = Router();
const UserRoutes = require('./User/index');
const VideoRoutes = require('./Video/index');
const ClientRoutes = require('./Client/index');

routes.use(UserRoutes);
routes.use(VideoRoutes);
routes.use(ClientRoutes);

module.exports = routes;
