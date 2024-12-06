import {create} from "zustand/react";
import {GameCard} from "../src/types/types.tsx";

interface FlippedState{
    flippedCards : GameCard[]
    addFlippedCard : (card: GameCard) => void
    resetFlippedCards: () => void
    gameCards: GameCard[]
    addGameCards : (card: GameCard[]) => void
    score: number
    incrScore: () => void
    resetScore: () => void
    elapsedTime: number
    incrTime: () => void
    resetTime: () => void
}
export const useStore= create<FlippedState>((set) => ({
    flippedCards: [],
    gameCards: [],
    score: 0,
    elapsedTime: 0,

    addFlippedCard: (card: GameCard) =>
        set((state) => ({
            flippedCards: [...state.flippedCards, card],
        })),

    resetFlippedCards: () =>
        set(() => ({
            flippedCards: [],
        })),

    addGameCards: (cards: GameCard[]) => {
        set(() => ({
            gameCards: cards,
        }));
    },

    incrScore: () => set((state) => (
        { score: state.score + 1 }
    )),

    resetScore: () => set(() => ({ score: 0 })),

    incrTime: () => set((state) => ({ elapsedTime: state.elapsedTime + 1 })),

    resetTime: () => set(() => ({ elapsedTime: 0 })),

}))