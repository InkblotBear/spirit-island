export const enum TerrainTypes {
    MOUNTAIN = "mountain",
    WETLAND = "wetland",
    JUNGLE = "jungle",
    DESERT = "desert",
    COASTAL = "coastal",
};

export const enum Pieces {
    EXPLORER = "explorer",
    TOWN = "town",
    CITY = "city",
    BLIGHT = "blight",
    DAHAN = "dahan"
};

export interface Tile {
    id: number;
    terrain: TerrainTypes;
    pieces: Array<Pieces>;
    touching: Array<number>;
}

export interface Piece {
    readonly baseHealth: number;
    currentHealth: number;
    damage: number;
    type: Pieces;
}

const explorerFactory: () => Piece = () => {
    return {
        baseHealth: 1,
        currentHealth: 1,
        damage: 1,
        type: Pieces.EXPLORER,
    }
}

const townFactory: () => Piece = () => {
    return {
        baseHealth: 2,
        currentHealth: 2,
        damage: 2,
        type: Pieces.TOWN,
    }
}

const cityFactory: () => Piece = () => {
    return {
        baseHealth: 3,
        currentHealth: 3,
        damage: 3,
        type: Pieces.CITY,
    }
}

const dahanFactory: () => Piece = () => {
    return {
        baseHealth: 2,
        currentHealth: 2,
        damage: 2,
        type: Pieces.DAHAN,
    }
}

/*
//ravage step
invaderDamage - spiritDefend = unblockedDamage
if unblockedDamage >= 2
    then blightStuffHappens;
    //Blight stuff - add a blight to tile, remove 1 presence from any spirits present, if blight already present also place blight in adjacent tile (cascade)
    //That can also cause blight cascade - need to be able to pick which tile cascades into.
    remove dahan = Math.floor(unblockedDamage/2)
    else (nothing happens)
if dahan > 0
    then dahanDamage = dahan*2
    //need to be able to pick which invaders take damage
    remove invader = dahanDamage - invaderHealth
*/

export interface Board {
    [n: number]: Tile | undefined,
}

export const boardAAsGrid = [
    [0, 1, 6, 6, 8],
    [0, 1, 5, 5, 8],
    [0, 2, 4, 5, 7],
    [3, 3, 4, 5, 7],
]

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

const getIsCoastal = (board: Board, id: number) => {
    const tile = board[id];
    return !!(tile?.touching.includes(0));
};

const getIsInland = (board: Board, id: number) => {
    return !getIsCoastal(board, id);
};

const getHasBuilding = (tile: Tile) => {
    return !!(countPiecesOfType(tile, Pieces.CITY) || countPiecesOfType(tile, Pieces.TOWN));
}

const getAllTilesOfType = (board: Board, landTypes: TerrainTypes[]) => {
    return Object.values(board).filter((tile: Tile) => landTypes.includes(tile.terrain));
}

const countPiecesOfType = (tile: Tile, type: Pieces) => {
    return tile.pieces.filter((piece) => piece === type).length
}

export const phases = {
    invader: {
        invaderActions: {
            explore: (board: Board, landTypes: TerrainTypes[]) => {
                const exploreTiles = getAllTilesOfType(board, landTypes);

                exploreTiles.forEach((tile: Tile) => {
                    // Has City or Town
                    const hasBuilding = getHasBuilding(tile);
                    // Coastal 
                    const isCoastal = getIsCoastal(board, tile.id)
                    // Adjacent to City or Town
                    const adjacentExplore = tile.touching.some((id: number) => {
                        // You can return a variable (you super dont have to do it like that)
                        const adjacentTile = board[id];
                        const adjacentBuilding = adjacentTile ? getHasBuilding(adjacentTile) : false;
                        return adjacentBuilding;
                    })
                    if (hasBuilding || isCoastal || adjacentExplore) {
                        tile.pieces.push(Pieces.EXPLORER);
                    }
                })
            },
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