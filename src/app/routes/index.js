const { Router } = require('express');

const routes = Router();
const UserRoutes = require('./User/index');
const EmployeeRoutes = require('./Employee/index');
const ClientRoutes = require('./Client/index');

routes.use(UserRoutes);
routes.use(EmployeeRoutes);
routes.use(ClientRoutes);

module.exports = routes;
