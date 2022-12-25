import * as bcrypt from "bcrypt";

export async function hash(pass) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt)
}
