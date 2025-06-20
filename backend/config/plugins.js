module.exports = ({ env }) => ({
    email: {
        config: {
            provider: "nodemailer",
            providerOptions: {
                host: env("EMAIL_SMTP_HOST", "localhost"),
                port: env.int("EMAIL_SMTP_PORT", 1024),
                secure: env.bool("EMAIL_SMTP_SECURE", false),
                auth: {
                    user: env("EMAIL_SMTP_USER", "mailhog"),
                    pass: env("EMAIL_SMTP_PASS", "mailhog"),
                },
            },
            settings: {
                defaultFrom: env("EMAIL_ADDRESS_FROM", "no-reply@audeilwess.com"),
                defaultReplyTo: env("EMAIL_ADDRESS_REPLY", "support@audeilwess.com"),
            },
        },
    },
});
