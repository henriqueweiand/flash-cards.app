import { GameProvider } from '@core/context/GameContext';
import { GameOption } from './GameOptions';
import React from 'react'

export const GameOptionPage = () => {
    return (
        <GameProvider gamesQuantity={4}>
            <GameOption />
        </GameProvider>
    )
}
