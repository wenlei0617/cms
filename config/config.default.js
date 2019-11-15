/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = exports = {};

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1572967608939_2084';

	// add your middleware config here
	config.middleware = [];

	config.security = {
		csrf: {
			enable: false
		}
	}

	// mysql
	config.mysql = {
		client: {
			host: '127.0.0.1',
			port: '3306',
			user: 'root',
			password: 'root',
			database: 'lu_cms'
		},
		app: true,
		agent: false
	}

	// validate
	config.validate = {}

	// error
	// config.onerror = {
	// 	all(err, ctx) {
	// 		ctx.body = JSON.stringify(err);
	// 		ctx.status = 500;
	// 	}
	// }

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
