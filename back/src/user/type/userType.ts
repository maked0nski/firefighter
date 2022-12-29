export type UserType = {
    id: number,
    name: string,
    surename?: string;
    fathersname?: string;
    phone: string,
    email: string,
    birthday: string,
    image: string,
    role: string,
    status?: string,
    verificationCode?: string,
    verificationCodeAt?: Date
}
