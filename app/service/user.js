/*
 * @Author: gary 
 * @Date: 2019-11-05 23:34:31 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-06 20:07:14
 */
const Service = require('egg').Service;

class UserService extends Service {
    async find(account, password) {
        const user = await this.app.mysql.get('users', { account, password });
        return user;
    }

    async create({account, password, username}) {
        const users = await this.app.mysql.get('users', { account });
        if (users) {
            throw {
                code: 501,
                message: '用户名已存在'
            };
        }
        const result = await this.app.mysql.insert('users', { account, password, username });
        return result.affectedRows === 1;
    }

    async update({id, password, username}) {
        const result = await this.app.mysql.update('users', { password, username }, {
            where: { id }
        });
        return result.affectedRows === 1;
    }

    async findAll() {
        const users = await this.app.mysql.select('users', {
            columns: ['id', 'account', 'username', 'create_time']
        });
        return users
    }
}

module.exports = UserService;