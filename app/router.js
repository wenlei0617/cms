'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app;
	// 用户
	router.post('/api/user/loginIn', controller.user.loginIn);
	router.post('/api/user/createOrUpdate', controller.user.create);
	router.get('/api/user/getList', controller.user.findAll);

	//分类
	router.get('/api/category/getList', controller.category.findAll);
	router.post('/api/category/createOrUpdate', controller.category.create);
	router.delete('/api/category/delete/:id', controller.category.remove);
};
