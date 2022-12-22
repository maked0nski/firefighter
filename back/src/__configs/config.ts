export const configs = {
    PORT: process.env.PORT || 8080,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "AccessToken_SECRET_KeY",
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "1h",

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "RefreshToken_SECRET_KeY",
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "2h",

    MAIL_TRANSPORT: process.env.MAIL_TRANSPORT || "smtps://useYandex@yandex.ru:password@smtp.yandex.ru",
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME || "WebWork",
}
