import {GameCard} from "../types/types.tsx";
import {FC, useCallback} from "react";
import "../../styles/card.scss"
import clsx from "clsx";

type CardProps = {
    card: GameCard
    isFlipped: boolean
    isDisabled: boolean
    onFlip: (gameCard: GameCard) => void
}

export let Card : FC<CardProps> = ({card, isFlipped, isDisabled,onFlip}) => {

    const handleClick = useCallback(() =>{
            onFlip(card);
        },[onFlip,card]);

    const isCardFlipped = card.isMatched || isFlipped


    return(
        <button onClick={handleClick} disabled={isCardFlipped || isDisabled} className={clsx("card",{"is-flipped": isCardFlipped})}>
            <div className="card-face">

            </div>
            <div className="card-face card-back-face">
                <img src={card.imageUrl} alt="card" />
            </div>
        </button>
    )

}