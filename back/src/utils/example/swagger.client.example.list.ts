export const SWAGGER_CLIENT_BODY_EXAMPLE = {
    name: "ТзОВ 'Рога та копита' ",
    city: "м.Івано-Франківськ",
    address: "вул.Вовчинецька, 124",
    coordinate: "Директор",
    service_contract: "48°55'58.2\"N 24°43'47.0\"E",
}

export const SWAGGER_CLIENT_EXAMPLE = {
    id: 1,
    ...SWAGGER_CLIENT_BODY_EXAMPLE
}

// export const SWAGGER_CONTACT_PERSON_FIRM = {
//     id: 1,
//     ...SWAGGER_CLIENT_BODY,
// }

export const SWAGGER_CLIENT_LIST_EXAMPLE = [
    SWAGGER_CLIENT_EXAMPLE,
    SWAGGER_CLIENT_EXAMPLE
]