const { format, addMonths } = require("date-fns");

module.exports = {
  "0 0 1 */4 *": async ({ strapi }) => {
    const fourMonthsAgo = addMonths(new Date(), -4);

    console.log("Cron job running every minute");

    try {
      const books = await strapi.entityService.findMany("api::book.book", {
        filters: {
          isNewRelease: true,
          publicationDate: { $lt: fourMonthsAgo.toISOString() },
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
