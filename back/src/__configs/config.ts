import * as process from "process";

export const configs = {
    PORT: process.env.PORT || 8080,
    FrontEnd_APP_URL: process.env.FE_APP_URL || "http://localhost:4200",

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "AccessToken_SECRET_KeY",
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "1h",

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "RefreshToken_SECRET_KeY",
    REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "2 days",

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,
    // NO_REPLY_EMAIL_FROM: `"No Reply. Пожежне Спостереження" <${process.env.NO_REPLY_EMAIL}>`
    NO_REPLY_EMAIL_FROM: process.env.NO_REPLY_EMAIL_FROM
}
