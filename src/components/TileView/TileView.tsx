import React from "react";
import { Tile } from "../../board";

export interface TileViewProps {
  damage?: {
    targets?: unknown[];
    amount: number;
  };
  tile: Tile | undefined;
  setTile: (tile: Tile) => void;
}

function TileView({ tile, setTile }: TileViewProps) {
  return (
    <div>
      {tile?.pieces.map((piece) => {
        if (typeof piece === "string") {
          return <div>{piece}</div>;
        }
        return (
          <div>
            {piece.type} {piece.currentHealth}/{piece.baseHealth} Damage:{" "}
            {piece.damage}
          </div>
        );
      })}
    </div>
  );
}

export default TileView;
