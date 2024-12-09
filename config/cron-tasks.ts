const { format, addMonths } = require("date-fns");

module.exports = {
  "0 0 1 */2 *": async ({ strapi }) => {
    const twoMonthsAgo = addMonths(new Date(), -2); // Subtract 2 months

    console.log("Cron job running every minute");

    try {
      const books = await strapi.entityService.findMany("api::book.book", {
        filters: {
          isNewRelease: true,
          publicationDate: { $lt: twoMonthsAgo.toISOString() },
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
