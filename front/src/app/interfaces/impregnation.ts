export interface IImpregnationCreate {
    reminding: boolean,
    seepage_liquid: string,
    area: number,
    next_check: string
}

export interface IImpregnation extends IImpregnationCreate {
    id: number,
    firmId: number
    timeLeft?: string
}
