'use strict';

module.exports = {
    async send(ctx) {
        const {to, subject, html} = ctx.request.body;
        try {
            await strapi.plugins['email'].services.email.send({
                to,
                subject,
                html
            });
            ctx.send({ok: true});
        } catch (err) {
            ctx.throw(500, err);
        }
    },
};