export const enum TerrainTypes {
    MOUNTAIN = "mountain",
    WETLAND = "wetland",
    JUNGLE = "jungle",
    DESERT = "desert"
};

export const enum Pieces {
    TOWN = "town",
    CITY = "city",
    BLIGHT = "blight",
    DAHAN = "dahan"
};

export interface Tile {
    id: number;
    terrain: TerrainTypes;
    startingPieces: Array<Pieces>;
    touching: Array<number>;
}

export interface Board {
    [n: number]: Tile,
}

export const boardA: Board = {
    1: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    2: {
        id: 2,
        terrain: TerrainTypes.WETLAND,
        startingPieces: [
            Pieces.CITY,
            Pieces.BLIGHT,
            Pieces.DAHAN
        ],
        touching: [
            0, 1, 3, 4,
        ],
    },
    3: {
        id: 3,
        terrain: TerrainTypes.JUNGLE,
        startingPieces: [
            Pieces.DAHAN,
            Pieces.DAHAN
        ],
        touching: [
            0, 2, 4,
        ],
    },
    4: {
        id: 4,
        terrain: TerrainTypes.DESERT,
        startingPieces: [
        ],
        touching: [
            1, 2, 3, 5,
        ],
    },
    5: {
        id: 5,
        terrain: TerrainTypes.WETLAND,
        startingPieces: [
        ],
        touching: [
            1, 4, 5, 6, 8
        ],
    },
    6: {
        id: 6,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.DAHAN,
        ],
        touching: [
            1, 4, 5, 7, 8
        ],
    },
    7: {
        id: 7,
        terrain: TerrainTypes.DESERT,
        startingPieces: [
        ],
        touching: [
            5, 8
        ],
    },
    8: {
        id: 8,
        terrain: TerrainTypes.JUNGLE,
        startingPieces: [
            Pieces.DAHAN,
            Pieces.DAHAN
        ],
        touching: [
            5, 6, 7
        ],
    }
}

const isCoastal = (board: Board, id: number) => {
    const piece = board[id];
    return piece.touching.includes(0);
};

const isInland = (board: Board, id: number) => {
    return !isCoastal(board, id);
};