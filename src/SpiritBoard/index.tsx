import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

import "./index.css";
import { advanceToNextPhase, Phases } from "../features/phases";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { spiritEnergyChange as energyGain } from "../features/spiritEnergy";

const Growth: React.FC = () => {
  const [value, setValue] = useState(1);
  const [growthConfirm, setGrowthConfirm] = useState(false);
  const dispatch = useDispatch();
  const phase = useSelector((state: IRootState) => state.phase);
  const disabled = phase.value !== Phases.spiritGrowth || growthConfirm;
  useEffect(() => {
    setGrowthConfirm(false);
  }, [phase]);

  const onChange = (e: RadioChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setValue(e.target.value);
  };

  return disabled ? (
    <div className="SpiritBoardGrowth">
      <div className="small-text">
        Reclaim One, Gain 1 Power Card, Gain 1 Energy
      </div>
      <div className="small-text">Add 1 Presence (1), Add 1 Presence (1)</div>
      <div className="small-text">Gain 1 Power, Add 1 Presence (2)</div>
    </div>
  ) : (
    <div className="SpiritBoardGrowth">
      <Radio.Group onChange={onChange} value={value} disabled={false}>
        <Radio value={1}>
          <div>Reclaim One, Gain 1 Power Card, Gain 1 Energy</div>
        </Radio>
        <Radio value={2}>
          <div>Add 1 Presence (1), Add 1 Presence (1)</div>
        </Radio>
        <Radio value={3}>
          <div>Gain 1 Power, Add 1 Presence (2)</div>
        </Radio>
      </Radio.Group>
      <div
        onClick={() => {
          // ENERGY, POWER CARDS, HAND, DISCARD (RECLAIM), PRESENCE
          if (value === 1) {
            // TODO
            // dispatch(reclaim(1));
            // dispatch(gainPower(1));
            dispatch(energyGain(1));
          }
          if (value === 2) {
            // TODO
            // dispatch(addPresence(1,1));
            // dispatch(addPresence(1,1));
          }
          if (value === 3) {
            // TODO
            // dispatch(gainPower(1));
            // dispatch(addPresence(1,2));
          }
          setGrowthConfirm(true);
        }}
      >
        Confirm Growth
      </div>
    </div>
  );
};

export const SpiritBoard: React.FC = () => {
  const spiritEnergy = useSelector((state: IRootState) => state.spiritEnergy);
  return (
    <div className="SpiritBoard">
      <div className="SpiritBoardImageContainer"></div>
      <Growth />
      <div className="SpiritBoardPresenceTrack"></div>
      {/* Energy: [{spiritEnergy.value}] */}
      {/* <Presence /> */}
      <div className="SpiritBoardInnatePowers"></div>
    </div>
  );
};
// button: onClick, check radio value, disable radio group
// do thing based on radio value

// playerOneEnergy =
// playerTwoEnergy =
// TODO: state based - energy is tokens that can be saved/called.
// TODO: remove presence from track, add presence to board
export default SpiritBoard;
