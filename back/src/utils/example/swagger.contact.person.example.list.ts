export const SWAGGER_CONTACT_PERSON_BODY = {
    surename: "Бананов",
    name: "Юрій",
    fathersname: "Крабович",
    phone: "(050) 45 45 454",
    position: "Директор",
    email: "bananov@gmail.com",
    firmId: 5
}

export const SWAGGER_CONTACT_PERSON = {
    id: 1,
    ...SWAGGER_CONTACT_PERSON_BODY
}

export const SWAGGER_CONTACT_PERSON_FIRM = {
    id: 1,
    ...SWAGGER_CONTACT_PERSON_BODY,
    client:{}
}

export const SWAGGER_CONTACT_PERSON_LIST = [
    SWAGGER_CONTACT_PERSON,
    SWAGGER_CONTACT_PERSON
]