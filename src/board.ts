const TerrainTypes = {
    MOUNTAIN: "mountain",
    WETLAND: "wetland",
    JUNGLE: "jungle",
    DESERT: "desert"
};

const Pieces = {
    TOWN: "town",
    CITY: "city",
    BLIGHT: "blight",
    DAHAN: "dahan"
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

boardA[1].touching.includes

const isCoastal = (board, id) => {
    const piece = board[id];
    return piece.touching.includes(0);
};

const isInland = (board, id) => {
    return !isCoastal(board, id);
};