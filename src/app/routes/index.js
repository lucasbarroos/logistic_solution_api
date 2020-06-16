const { Router } = require('express');

const routes = Router();
const UserRoutes = require('./User/index');
const VideoRoutes = require('./Video/index');
const ChannelRoutes = require('./Channel/index');

routes.use(UserRoutes);
routes.use(VideoRoutes);
routes.use(ChannelRoutes);

module.exports = routes;
