const { format } = require("date-fns");

module.exports = {
  "0 0 */30 * *": async ({ strapi }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log("Cron job running every minute");

    try {
      const books = await strapi.entityService.findMany("api::book.book", {
        filters: {
          isNewRelease: true,
          publicationDate: { $lt: thirtyDaysAgo.toISOString() },
        },
      });

      for (const book of books) {
        const formattedPublicationDate = format(
          new Date(book.publicationDate),
          "yyyy-MM-dd"
        );

        await strapi.entityService.update("api::book.book", book.id, {
          data: {
            publicationDate: formattedPublicationDate,
          },
        });
      }
    } catch (err) {
      console.error("Error in cron job:", err);
    }
  },
};
