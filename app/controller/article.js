/*
 * @Author: gary 
 * @Date: 2019-11-09 17:26:51 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-11 08:20:02
 */
'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async findById() {
        const { ctx } = this;
        const { id } = ctx.params;
        const result = await ctx.service.article.find(id);
        ctx.body = {
            code: 200,
            data: result
        }
    }

    async createOrUpdate() {
        const { ctx } = this;
        const { id, cover, title, content, category_id, status } = ctx.body.request;
        try {
            ctx.validate({
                cover: 'string', 
                title: 'string', 
                content: 'string', 
                category_id: 'string',
                status: 'string'
            }, ctx.request.body);
            
            let result;

            if (id) {
                result = await ctx.service.article.update({id, cover, title, content, category_id, status});
            } else {
                result = await ctx.service.article.create({cover, title, content, category_id, status});
            }
            ctx.body = {
                code: 200,
                data: result
            }
        } catch (error) {
            ctx.body = error;
        }
    }
}

module.exports = ArticleController;
