/*
 * @Author: gary 
 * @Date: 2019-11-05 23:43:46 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-06 20:07:28
 */
const Controller = require('egg').Controller;

class UserController extends Controller {
    async loginIn() {
        const { ctx } = this;
        const { account, password } = ctx.request.body;
        try {
            ctx.validate({
                account: 'string', 
                password: 'string',
            }, ctx.request.body);

            const user = await ctx.service.user.find(account, password);
            
            if (user) {
                ctx.body = {
                    code: 200,
                    data: user,
                    message: 'success'
                }
                return;
            }
            ctx.body = {
                code: 201,
                data: '',
                message: '账号或密码不存在'
            }
        } catch (error) {
            ctx.body = {
                message: error
            }
        }
    }

    async create() {
        const { ctx } = this;
        const { account, password, username, id } = ctx.request.body;
        try {
            ctx.validate({
                account: 'string',
                password: 'string',
                username: 'string',
            }, ctx.request.body);
            let result;
            if (id) {
                result = await ctx.service.user.update({id, password, username});
            } else {
                result = await ctx.service.user.create({account, password, username});
            }
            ctx.body = {
                code: 200,
                data: result
            }        
        } catch (error) {
            ctx.body = error;
        }
    }

    async findAll() {
        const { ctx } = this;
        const result = await ctx.service.user.findAll();
        ctx.body = {
            code: 200,
            data: result
        }
    }
}

module.exports = UserController;