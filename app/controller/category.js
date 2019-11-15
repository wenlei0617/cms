/*
 * @Author: gary 
 * @Date: 2019-11-06 20:10:00 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-06 21:13:25
 */
const Controller = require('egg').Controller;

class CategoryController extends Controller {
    async findAll() {
        const { ctx } = this;
        const result = await ctx.service.category.findAll();
        ctx.body = {
            code: 200,
            data: result
        }
    }

    async create() {
        const { ctx } = this;
        const { sort, folder, title, id } = ctx.request.body;
        try {
            ctx.validate({
                sort: 'string',
                folder: 'string',
                title: 'string'
            });
            let result;
            if (id) {
                result = await ctx.service.category.update({id, sort, title});
            } else {
                result = await ctx.service.category.create({sort, folder, title});
            }
            ctx.body = {
                code: 200,
                data: result
            }
        } catch (error) {
            ctx.body = error;
        }
    }

    async remove() {
        const { ctx } = this;
        const { id } = ctx.params;
        try {
            const category = await ctx.service.category.find(id);

            const result = await ctx.service.category.remove(id, category.folder);
            ctx.body = {
                code: 200,
                data: result
            }
        } catch (error) {
            ctx.body = error;   
        }
    }
}

module.exports = CategoryController;
