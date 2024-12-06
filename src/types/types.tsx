export type GameCard = {
    value: Number
    id: String
    isMatched: boolean
    imageUrl: string
}

export type GameStats = {
    score: Number
    gameDuration: Number
    gameDate: String;
}

export  type Level = {
    cardCount: number
    maxScour: Number
}