import {SWAGGER_EXAMPLE_CAR, SWAGGER_EXAMPLE_POSITION} from "./";

export const SWAGGER_EXAMPLE_USER = {
    id: 1,
    surename: "Ivancovskiy",
    name: "Ivan",
    fathersname: "Ivanjvich",
    phone: "050-93-99-554",
    email: "Ivan1@gmail.com",
    birthday: "25.02.1990",
    image: "https://www.gravatar.com/avatar/ivan.jpg",
    role: "USER"
}

export const SWAGGER_EXAMPLE_USERS_LIST = [
    SWAGGER_EXAMPLE_USER,
    SWAGGER_EXAMPLE_USER
]

export const SWAGGER_EXAMPLE_USER_BY_ID = {
    ...SWAGGER_EXAMPLE_USER,
    car: SWAGGER_EXAMPLE_CAR,
    position_id: SWAGGER_EXAMPLE_POSITION
}

export const SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR = [
    {
        ...SWAGGER_EXAMPLE_USER,
        car: SWAGGER_EXAMPLE_CAR
    },
    {
        ...SWAGGER_EXAMPLE_USER,
        car: SWAGGER_EXAMPLE_CAR
    }
]

export const SWAGGER_EXAMPLE_USERS_LIST_WITH_POSITION = [
    {
        ...SWAGGER_EXAMPLE_USER,
        position_id: SWAGGER_EXAMPLE_POSITION
    },
    {
        ...SWAGGER_EXAMPLE_USER,
        position_id: SWAGGER_EXAMPLE_POSITION
    }
]

export const SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR_AND_POSITION = [
    SWAGGER_EXAMPLE_USER_BY_ID,
    SWAGGER_EXAMPLE_USER_BY_ID
]
