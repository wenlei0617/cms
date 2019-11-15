/*
 * @Author: gary 
 * @Date: 2019-11-06 20:11:08 
 * @Last Modified by: gary
 * @Last Modified time: 2019-11-06 21:13:28
 */
'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');

class CategoryService extends Service {
    async find(id) {
        const result = await this.app.mysql.get('category', { id });
        return result;
    }

    async findAll() {
        const result = await this.app.mysql.select('category');
        return result;
    }

    async create({sort, folder, title}) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            const category = await this.app.mysql.get('category', { folder });
            if (category) {
                throw {
                    code: 501,
                    message: '文件夹已存在'
                }
            }
            this.createFolder(folder);
            const result = await conn.insert('category', {
                sort, folder, title
            });
            await conn.commit();
            return result.affectedRows === 1;        
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }

    async update({id, sort, title}) {
        const result  = await this.app.mysql.update('category', { sort, title }, {
            where: { id }
        });
        return result.affectedRows === 1;
    }

    async remove(id, folder) {
        const conn = await this.app.mysql.beginTransaction();
        try {
            const result = await conn.delete('category', { id });
            this.removeFolder(folder);
            await conn.commit();
            return result.affectedRows === 1;   
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }
    // 创建文件夹
    createFolder(name) {
        const pathUrl = path.join(__dirname, '../public/article/'+name);
        fs.mkdirSync(pathUrl)
    }

    // 删除文件夹
    removeFolder(name) {
        const pathUrl = path.join(__dirname, '../public/article/'+name);
        fs.rmdirSync(pathUrl);
    }
}

module.exports = CategoryService;
