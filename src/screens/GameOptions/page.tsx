import React from 'react'
import { GameProvider } from '@core/context/GameContext';
import { GameOption } from './GameOptions';

export const GameOptionPage = () => {
    return (
        <GameProvider gamesQuantity={4}>
            <GameOption />
        </GameProvider>
    )
}
