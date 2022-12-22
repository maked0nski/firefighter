import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {configs} from "./config";

export const getMailConfig = async (
): Promise<any> => {
    const transport = `${configs.MAIL_TRANSPORT}`;
    const mailFromName = `${configs.MAIL_FROM_NAME}`;
    const mailFromAddress = transport.split(':')[1].split('//')[1];

    return {
        transport,
        defaults: {
            from: `"${mailFromName}" <${mailFromAddress}>`,
        },
        template: {
            adapter: new EjsAdapter(),
            options: {
                strict: false,
            },
        },
    };
};
