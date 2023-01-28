import { createSlice } from "@reduxjs/toolkit";

import { Board, Tile, Pieces, Piece, InvaderDeck, TerrainTypes } from "../board";

export const invaderTypes = [Pieces.CITY, Pieces.TOWN, Pieces.EXPLORER];

const explorerFactory: () => Piece = () => {
  return {
    baseHealth: 1,
    currentHealth: 1,
    damage: 1,
    type: Pieces.EXPLORER,
  };
};

const townFactory: () => Piece = () => {
  return {
    baseHealth: 2,
    currentHealth: 2,
    damage: 2,
    type: Pieces.TOWN,
  };
};

const cityFactory: () => Piece = () => {
  return {
    baseHealth: 3,
    currentHealth: 3,
    damage: 3,
    type: Pieces.CITY,
  };
};

const dahanFactory: () => Piece = () => {
  return {
    baseHealth: 2,
    currentHealth: 2,
    damage: 2,
    type: Pieces.DAHAN,
  };
};

export const boardAAsGrid = [
  [0, 1, 6, 6, 8],
  [0, 1, 5, 5, 8],
  [0, 2, 4, 5, 7],
  [3, 3, 4, 5, 7],
];

export const createBoardA: () => Board = () => ({
  1: {
    id: 1,
    terrain: TerrainTypes.MOUNTAIN,
    pieces: [townFactory()],
    touching: [0, 2, 4, 5, 6],
  },
  2: {
    id: 2,
    terrain: TerrainTypes.WETLAND,
    pieces: [cityFactory(), Pieces.BLIGHT, dahanFactory()],
    touching: [0, 1, 3, 4],
  },
  3: {
    id: 3,
    terrain: TerrainTypes.JUNGLE,
    pieces: [dahanFactory(), dahanFactory()],
    touching: [0, 2, 4],
  },
  4: {
    id: 4,
    terrain: TerrainTypes.SANDS,
    pieces: [],
    touching: [1, 2, 3, 5],
  },
  5: {
    id: 5,
    terrain: TerrainTypes.WETLAND,
    pieces: [],
    touching: [1, 4, 5, 6, 8],
  },
  6: {
    id: 6,
    terrain: TerrainTypes.MOUNTAIN,
    pieces: [dahanFactory()],
    touching: [1, 4, 5, 7, 8],
  },
  7: {
    id: 7,
    terrain: TerrainTypes.SANDS,
    pieces: [],
    touching: [5, 8],
  },
  8: {
    id: 8,
    terrain: TerrainTypes.JUNGLE,
    pieces: [dahanFactory(), dahanFactory()],
    touching: [5, 6, 7],
  },
});

const getIsCoastal = (board: Board, id: number) => {
  const tile = board[id];
  return !!tile?.touching.includes(0);
};

const getIsInland = (board: Board, id: number) => {
  return !getIsCoastal(board, id);
};

const getHasBuilding = (tile: Tile) => {
  return !!(
    countPiecesOfType(tile, Pieces.CITY) || countPiecesOfType(tile, Pieces.TOWN)
  );
};

const getAllTilesOfType = (board: Board, landTypes: TerrainTypes[]): Tile[] => {
  return Object.values(board).filter((tile: Tile) =>
    landTypes.includes(tile.terrain)
  );
};

const countPiecesOfType = (tile: Tile, type: Pieces) => {
  return tile.pieces.filter((piece) =>
    typeof piece === "string" ? piece === type : piece.type === type
  ).length;
};

const invaderExplore = (board: Board, landTypes: TerrainTypes[]) => {
  const exploreTiles = getAllTilesOfType(board, landTypes);

  exploreTiles.forEach((tile) => {
    // Has City or Town
    const hasBuilding = getHasBuilding(tile);
    // Coastal
    const isCoastal = getIsCoastal(board, tile.id);
    // Adjacent to City or Town
    const adjacentExplore = tile.touching.some((id: number) => {
      // You can return a variable (you super dont have to do it like that)
      const adjacentTile = board[id];
      const adjacentBuilding = adjacentTile
        ? getHasBuilding(adjacentTile)
        : false;
      return adjacentBuilding;
    });
    if (hasBuilding || isCoastal || adjacentExplore) {
      tile.pieces.push(explorerFactory());
    }
  });
};
const invaderBuild = (board: Board, landTypes: TerrainTypes[]) => {
  const buildTiles = getAllTilesOfType(board, landTypes);

  buildTiles.forEach((tile) => {
    const cityCount = countPiecesOfType(tile, Pieces.CITY);
    const townCount = countPiecesOfType(tile, Pieces.TOWN);
    const explorerCount = countPiecesOfType(tile, Pieces.EXPLORER);

    if (cityCount === 0 && townCount === 0 && explorerCount === 0) {
      return;
    }

    if (townCount > cityCount) {
      tile.pieces.push(cityFactory());
    } else {
      tile.pieces.push(townFactory());
    }
  });
};
const invaderRavage = (board: Board, landTypes: TerrainTypes[]) => {
  const ravageTiles = getAllTilesOfType(board, landTypes);

  ravageTiles.forEach((tile) => {
    // Calculate invader damage
    const invaderDamage = tile.pieces.reduce((invaderDamage, piece) => {
      if (typeof piece === "string" || !invaderTypes.includes(piece.type)) {
        return invaderDamage;
      }
      return piece.damage + invaderDamage;
    }, 0);

    // TODO: Spirit Defend phase (spirits currently unimplemented entirely)
    const spiritDefend = 0;
    const unblockedDamage = invaderDamage - spiritDefend;
    if (unblockedDamage >= 2) {
      // TODO blightStuffHappens;
      //Blight stuff - add a blight to tile, remove 1 presence from any spirits present, if blight already present also place blight in adjacent tile (cascade)
      //That can also cause blight cascade - need to be able to pick which tile cascades into.
    }
    // remove dahan based on damage done versus health, sort from weakest to strongest
    const dahanPieces = tile.pieces.filter(
      (piece) => typeof piece !== "string" && piece.type === Pieces.DAHAN
    ) as Piece[];
    dahanPieces.sort((a, b) => a.currentHealth - b.currentHealth);
    let index = 0;
    let remainingDamage = unblockedDamage;
    while (
      dahanPieces[index] !== undefined &&
      remainingDamage >= dahanPieces[index].currentHealth
    ) {
      const dahanPiece = dahanPieces[index];
      remainingDamage -= dahanPiece.currentHealth;
      index += 1;
    }
    const survivingDahanPieces = dahanPieces.slice(index);
    tile.pieces = [
      ...survivingDahanPieces,
      ...tile.pieces.filter(
        (piece) => typeof piece === "string" || piece.type !== Pieces.DAHAN
      ),
    ];

    // if dahan > 0
    // then dahanDamage = dahan*2
    //need to be able to pick which invaders take damage
    // remove invader = dahanDamage - invaderHealth
    const invaderPieces = tile.pieces.filter(
      (piece) =>
        typeof piece !== "string" && invaderTypes.includes(piece.type)
    ) as Piece[];
    invaderPieces.sort((a, b) => a.currentHealth - b.currentHealth);
    index = 0;
    remainingDamage = survivingDahanPieces.reduce(
      (damage, dahan) => damage + dahan.damage,
      0
    );
    while (
      invaderPieces[index] !== undefined &&
      remainingDamage >= invaderPieces[index].currentHealth
    ) {
      const invaderPiece = invaderPieces[index];
      remainingDamage -= invaderPiece.currentHealth;
      index += 1;
    }
    const survivingInvaderPieces = invaderPieces.slice(index);
    tile.pieces = [
      ...survivingInvaderPieces,
      ...tile.pieces.filter(
        (piece) =>
          typeof piece === "string" || !invaderTypes.includes(piece.type)
      ),
    ];
  });
};

export const boardA = createSlice({
  name: "board",
  initialState: createBoardA(),
  reducers: {
    advanceInvaderDeckTemp: (
      board,
      { payload: invaderDeck }: { payload: InvaderDeck; type: string }
    ) => {
      if (invaderDeck.ravage) {
        invaderRavage(board, invaderDeck.ravage);
      }
      if (invaderDeck.build) {
        invaderBuild(board, invaderDeck.build);
      }
      if (invaderDeck.explore) {
        invaderExplore(board, invaderDeck.explore);
        //reminder: explore card hidden until that exploration is executed
      }
    },
  },
});

export const { advanceInvaderDeckTemp } = boardA.actions;

export default boardA.reducer;
