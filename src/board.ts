import produce from "immer";

export const enum TerrainTypes {
  MOUNTAIN = "mountain",
  WETLAND = "wetland",
  JUNGLE = "jungle",
  SANDS = "sands",
  COASTAL = "coastal",
}

// NOTE (tech debt):
// Invader card stages matter
// current setup is agnostic
// will present problems when impelmenting adversaries
type InvaderCard = TerrainTypes[];
export interface InvaderDeck {
  stage1: InvaderCard[];
  stage2: InvaderCard[];
  stage3: InvaderCard[];
  ravage?: InvaderCard;
  build?: InvaderCard;
  explore?: InvaderCard;
}

function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function makeTheInvaderDeck(): InvaderDeck {
  /*
    Stage 1 - Mountain, Wetland, Jungle, Sands
    Stage 2 - Mountain, Wetlands, Jungle, Sands, Coastal
    Stage 3 - Mountain/Wetlands, Mountain/Jungle, Mountain/Sands, Wetlands/Jungle, Wetlands/Sands, Forest/Sands

    Start of each game, pick randomly [3 Stage 1], [4 Stage 2], [5 Stage 3] cards.
    */
  const stage1: InvaderCard[] = [
    [TerrainTypes.MOUNTAIN],
    [TerrainTypes.WETLAND],
    [TerrainTypes.JUNGLE],
    [TerrainTypes.SANDS],
  ];
  const stage2: InvaderCard[] = [
    [TerrainTypes.MOUNTAIN],
    [TerrainTypes.WETLAND],
    [TerrainTypes.JUNGLE],
    [TerrainTypes.SANDS],
    [TerrainTypes.COASTAL],
  ];
  const stage3: InvaderCard[] = [
    [TerrainTypes.MOUNTAIN, TerrainTypes.WETLAND],
    [TerrainTypes.MOUNTAIN, TerrainTypes.JUNGLE],
    [TerrainTypes.MOUNTAIN, TerrainTypes.SANDS],
    [TerrainTypes.WETLAND, TerrainTypes.JUNGLE],
    [TerrainTypes.WETLAND, TerrainTypes.SANDS],
    [TerrainTypes.JUNGLE, TerrainTypes.SANDS],
  ];

  shuffleArray(stage1);
  shuffleArray(stage2);
  shuffleArray(stage3);

  stage1.pop();
  stage2.pop();
  stage3.pop();

  return {
    // explore starts as defined from beginning (failure state when undefined)
    stage1,
    stage2,
    stage3,
    explore: stage1.pop(),
  };
}

export interface Piece {
  readonly baseHealth: number;
  currentHealth: number;
  damage: number;
  type: Pieces;
}

export const enum Pieces {
  EXPLORER = "explorer",
  TOWN = "town",
  CITY = "city",
  BLIGHT = "blight",
  DAHAN = "dahan",
}

export interface Tile {
  id: number;
  terrain: TerrainTypes;
  pieces: Array<Pieces.BLIGHT | Piece>;
  touching: Array<number>;
}

export interface Board {
  [n: number]: Tile | undefined;
}

export interface GameState {
  board: Board;
  invaderCards: InvaderDeck;
}
