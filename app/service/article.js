/*
 * @Author: gary 
 * @Date: 2019-11-06 21:23:46 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-11 08:20:04
 */
'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
    async find(id) {
        const result = await this.app.mysql.get('article', { id });
        return result;
    }

    async findAll() {
        const result = await this.app.mysql.select('article');
        return result;
    }

    async remove(id) {
        const result = await this.app.mysql.delete('article', { id });
        return result.affectedRows === 1;
    }

    async create({cover, title, content, category_id, status}) {
        const category = await this.ctx.service.category.find(category_id);
        if (!category.id) {
            throw { code: 501, message: '类型不存在' };
        }
        // category.folder
        const result = await this.app.mysql.create('article', { cover, title, content, category_id, status });
    }

    async update({id, cover, title, content, category_id, status}) {
        
    }
}

module.exports = ArticleService;
