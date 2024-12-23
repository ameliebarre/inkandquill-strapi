/**
 * book controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::book.book",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db.query("api::book.book").findOne({
        where: { slug: id },
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          authors: true,
          categories: true,
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
