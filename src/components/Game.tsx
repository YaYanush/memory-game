import {useCallback, useEffect, useRef, useState} from "react";
import {GameCard, GameStats, Level} from "../types/types.tsx";
import {Card} from "./Card.tsx";
import {useStore} from "../../store/useStore.tsx"
import {formatTime, shuffleArray} from "../../utils/utils.tsx";

const levels : Level[] = [
    {cardCount: 3, maxScour: 8},
    {cardCount: 4, maxScour: 10},
    {cardCount: 5, maxScour: 12},
    {cardCount: 6, maxScour: 14},
    {cardCount: 7, maxScour: 16},
]
function createGameCard(uniqueCards: number) : GameCard[]{
    const gameCards = [] as GameCard[];
    for (let value = 0; value <= uniqueCards; value++){
        gameCards.push({
            value,
            isMatched:false,
            id: `${value}-1`,
            imageUrl: `/assets/${value+1}.jpg`
        })
        gameCards.push({
            value,
            isMatched:false,
            id: `${value}-2`,
            imageUrl: `/assets/${value+1}.jpg`
        })
    }
    return shuffleArray(gameCards)
}
export let Game  = () => {

    const {flippedCards,
        addFlippedCard,
        resetFlippedCards,
        gameCards,
        addGameCards,
        score,
        incrScore,
        resetScore,
        elapsedTime,
        incrTime,
        resetTime,
    } = useStore()

    const [level, setLevel] = useState(0)

    const [gameStarted, setGameStarted] = useState(false)

    const timerRef = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 0));

    const isDone = gameCards.every(gameCard => gameCard.isMatched)

    useEffect(() => {
        if (!isDone && gameStarted) {
            timerRef.current = setInterval(() => {
                incrTime()
            }, 1000);
        }
        // Clear the timer when the game ends
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = 0;
            }
        };
    }, [isDone,gameStarted]);

    useEffect(() => {
        setGameStarted(false)

        const levelConfig = levels[level];
        if (levelConfig) {
            const initialCards = createGameCard(levelConfig.cardCount);
            addGameCards(initialCards);  // Инициализируем gameCards в store
        }
        if(score!== 0 && isDone){
            const newGameStats: GameStats = {
                score: score,
                gameDuration: elapsedTime,
                gameDate: new Date().toLocaleString(), // Форматируем дату
            };
            const storedHistory = localStorage.getItem("gameHistory");
            let history = storedHistory ? JSON.parse(storedHistory) : [];

            // Добавляем новую игру в историю
            history.push(newGameStats);

            // Сохраняем обновленную историю в localStorage
            localStorage.setItem("gameHistory", JSON.stringify(history));
        }
        resetTime();
        resetScore()

    }, [level]);

    const handleCardFlip  = useCallback((gameCard : GameCard) => {
        if(!flippedCards.length){ //first flip card
            addFlippedCard(gameCard)
            setGameStarted(true)
            return
        }
        if(flippedCards.length !== 1){ // prevent unexpected bugs
            return;
        }
        incrScore()

        if(flippedCards[0].value === gameCard.value){
            const updatedCards = gameCards.map((prevGameCard) =>
                [gameCard.id, flippedCards[0].id].includes(prevGameCard.id)
                    ? { ...prevGameCard, isMatched: true }
                    : prevGameCard
            );
            addGameCards(updatedCards);
            resetFlippedCards()
        }else{
            addFlippedCard(gameCard)
            setTimeout(() => {
                resetFlippedCards()
            }, 1000)
        }

    },[flippedCards])


    const handleNextLevel = useCallback(() => {
        resetFlippedCards();
        setLevel(prevLevel => prevLevel + 1)
        setGameStarted(false)
    },[])

    if(!levels[level]){
        return <h1>You win!</h1>
    }
    return (
        <div className="app-container">
            <div className="game-info">
                <p className="level-info">Level: {level + 1}</p>
                <p className="time-info">Time Elapsed: {formatTime(elapsedTime)}</p>
                {!isDone ? (
                    <div className="attempts-info">Attempts: {score}</div>
                ) : (
                    <>
                        <p className="success-message">Well played! 👌</p>
                        <button className="button-next" onClick={handleNextLevel}>
                            Next Level
                        </button>
                    </>
                )}
            </div>
            <div className={"container-cards"}>
                {
                    gameCards.map((gameCard,index) => (
                        <Card
                            key={index}
                            card={gameCard}
                            isFlipped={flippedCards.some(flippedCards => flippedCards.id === gameCard.id)}
                            isDisabled={flippedCards.length === 2}
                            onFlip={handleCardFlip}/>
                    ))
                }
            </div>
        </div>
    )
}

