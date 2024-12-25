// app/controller/card.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

const attributes = [ 'id', 'name', 'platformId', 'qrcode', 'category', 'isPublic' ];

class CardController extends Controller {

  async search() {
    const ctx = this.ctx;
    const where = {};
    where.category = ctx.request.body.category;
    where.name = ctx.request.body.name;
    where.isPublic = 1;
    let cards = [];
    try {
      const card = await ctx.model.models.card.findAll({ where });
      const options = { password: card[0].password, isPublic: 1 };
      cards = await ctx.model.models.card.findAll({ where: options, attributes });
      ctx.success(cards);
    } catch (error) {
      ctx.debug(error);
      ctx.success(cards);
    }
  }

  async page() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.success(await ctx.model.models.card.findAll(query));
  }

  async id() {
    const ctx = this.ctx;
    const where = {};
    where.password = ctx.request.body.link;
    let cards = [];
    try {
      cards = await ctx.model.models.card.findAll({ where, attributes });
      ctx.success(cards);
    } catch (error) {
      ctx.debug(error);
      ctx.success(cards);
    }
  }

  async create() {
    const ctx = this.ctx;
    const { data } = ctx.request.body;
    const card = await ctx.model.models.card.create(data);
    ctx.status = 201;
    ctx.success(card);
  }

  async update() {
    const ctx = this.ctx;
    const { data } = ctx.request.body;

    const card = await ctx.model.models.card.findByPk(data.id);
    if (!card || card.password !== data.password) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await card.update({ name, age });
    ctx.body = card;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.cardId);
    const card = await ctx.model.models.card.findByPk(id);
    if (!card) {
      ctx.status = 404;
      return;
    }

    await card.destroy();
    ctx.status = 200;
  }
}

module.exports = CardController;
