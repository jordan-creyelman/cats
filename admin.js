// admin.js
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');

const adminBro = new AdminBro({
  // Passer vos options ici
  resources: [],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = {router,adminBro};