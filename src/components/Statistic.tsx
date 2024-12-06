
import {useEffect, useState} from "react";
import "../../styles/statistic.scss"
export const Statistic  = () => {

    const [gameHistory, setGameHistory] = useState([]);

    useEffect(() => {
        const storedHistory = localStorage.getItem("gameHistory");
        if (storedHistory) {
            setGameHistory(JSON.parse(storedHistory));
        }
    }, []);

    return (
        <div className="statistics-container">
            <h2>Game Statistics</h2>
            {gameHistory.length > 0 ? (
                <table className="statistics-table">
                    <thead>
                    <tr>
                        <th>Game #</th>
                        <th>Attempts</th>
                        <th>Duration (seconds)</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {gameHistory.map((game: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{game.score}</td>
                            <td>{game.gameDuration}</td>
                            <td>{game.gameDate}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No statistics available</p>
            )}
        </div>
    );
};