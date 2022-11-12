export const enum TerrainTypes {
    MOUNTAIN = "mountain",
    WETLAND = "wetland",
    JUNGLE = "jungle",
    DESERT = "desert",
    COASTAL = "coastal",
};

export const enum Pieces {
    TOWN = "town",
    CITY = "city",
    EXPLORER = "explorer",
    BLIGHT = "blight",
    DAHAN = "dahan"
};

export interface Tile {
    id: number;
    terrain: TerrainTypes;
    pieces: Array<Pieces>;
    touching: Array<number>;
}

export interface Board {
    [n: number]: Tile,
}

export const createBoardA: () => Board = () => ({
    1: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        pieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    2: {
        id: 2,
        terrain: TerrainTypes.WETLAND,
        pieces: [
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
        pieces: [
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
        pieces: [
        ],
        touching: [
            1, 2, 3, 5,
        ],
    },
    5: {
        id: 5,
        terrain: TerrainTypes.WETLAND,
        pieces: [
        ],
        touching: [
            1, 4, 5, 6, 8
        ],
    },
    6: {
        id: 6,
        terrain: TerrainTypes.MOUNTAIN,
        pieces: [
            Pieces.DAHAN,
        ],
        touching: [
            1, 4, 5, 7, 8
        ],
    },
    7: {
        id: 7,
        terrain: TerrainTypes.DESERT,
        pieces: [
        ],
        touching: [
            5, 8
        ],
    },
    8: {
        id: 8,
        terrain: TerrainTypes.JUNGLE,
        pieces: [
            Pieces.DAHAN,
            Pieces.DAHAN
        ],
        touching: [
            5, 6, 7
        ],
    }
})

const isCoastal = (board: Board, id: number) => {
    const piece = board[id];
    return piece.touching.includes(0);
};

const isInland = (board: Board, id: number) => {
    return !isCoastal(board, id);
};

const getAllTilesOfType = (board: Board, landTypes: TerrainTypes[]) => {
    return Object.values(board).filter((tile: Tile) => landTypes.includes(tile.terrain));
}

const countPiecesOfType = (tile: Tile, type: Pieces) => {
    return tile.pieces.filter((piece) => piece === type).length
}

export const phases = {
    invader: {
        invaderActions: {
            build: (board: Board, landTypes: TerrainTypes[]) => {
                const buildTiles = getAllTilesOfType(board, landTypes);

                buildTiles.forEach((tile) => {
                    const cityCount = countPiecesOfType(tile, Pieces.CITY);
                    const townCount = countPiecesOfType(tile, Pieces.TOWN);
                    const explorerCount = countPiecesOfType(tile, Pieces.EXPLORER);

                    if (cityCount === 0 && townCount === 0 && explorerCount === 0) {
                        return;
                    }

                    if (townCount > cityCount) {
                        tile.pieces.push(Pieces.CITY);
                    } else {
                        tile.pieces.push(Pieces.TOWN);
                    }
                });
                return buildTiles;
            }
        },
    }
}