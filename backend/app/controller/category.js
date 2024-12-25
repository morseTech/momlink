// app/controller/card.js
const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.success(await ctx.model.models.category.findAll());
  }

}

module.exports = CategoryController;
