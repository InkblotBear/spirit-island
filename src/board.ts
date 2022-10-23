const TerrainTypes = {
    MOUNTAIN: "mountain",
};

const Pieces = {
    TOWN: "town",
};

const boardA = {
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
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    3: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    4: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    5: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    6: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    7: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    },
    8: {
        id: 1,
        terrain: TerrainTypes.MOUNTAIN,
        startingPieces: [
            Pieces.TOWN,
        ],
        touching: [
            0, 2, 4, 5, 6,
        ],
    }
}

boardA[1].touching.includes

const isCoastal = (board, id) => {
    const piece = board[id];
    return piece.touching.includes(0);
};

const isInland = (board, id) => {
    return !isCoastal(board, id);
};