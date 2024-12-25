'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/get-upload-token', controller.upload.index.getUploadToken); // 上传预检
  router.post('/upload-transfer', app.middleware.uploadValidate(), controller.upload.index.transfer); // 上传传输

  // momlink api
  // router.resources('card', '/momlink/api/card', controller.card);
  router.resources('category', '/momlink/api/category', controller.category);
  router.post('/momlink/api/card/search', controller.card.search);
  router.post('/momlink/api/card/id', controller.card.id);
  router.post('/momlink/api/card/create', controller.card.create);
  router.post('/momlink/api/card/modify', controller.card.create);
  router.post('/momlink/api/card/delete', controller.card.create);

};
