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
            // dispatch(reclaim)
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

type SideEffect<T extends Array<unknown>> = [(...args: T) => void, T];
type Render = string;
type PresenceTrack = SideEffect<Array<any>>[];

const sideEffect = <T extends Array<unknown>>(
  callback: (...args: T) => void,
  args: T
): SideEffect<T> => {
  return [callback, args];
};

const reclaim = (payload: number) => {
  // Delete this and import proper function when it exists
};

const cardPlays = (payload: number) => {
  // Delete this and import proper function when it exists
};

const Presence: React.FC = () => {
  const presenceTrackEnergy: Array<PresenceTrack> = [
    [sideEffect(energyGain, [1])],
    [sideEffect(energyGain, [2])],
    [sideEffect(energyGain, [2])],
    [sideEffect(energyGain, [3])],
    [sideEffect(energyGain, [4])],
    [sideEffect(energyGain, [5])],
  ];
  const presenceTrackPlays: Array<PresenceTrack> = [
    [sideEffect(cardPlays, [1])],
    [sideEffect(cardPlays, [2])],
    [sideEffect(cardPlays, [2])],
    [sideEffect(cardPlays, [3])],
    [sideEffect(cardPlays, [3]), sideEffect(reclaim, [1])],
    [sideEffect(cardPlays, [4]), sideEffect(reclaim, [1])],
    [sideEffect(cardPlays, [5]), sideEffect(reclaim, [1])],
  ];
  const presenceTrackEnergyString = ["1", "2", "2", "3", "4", "5"];
  const presenceTrackPlaysString = ["1", "2", "2", "3", "Reclaim 1", "4", "5"];
  
  // Increment Presence Track (Click leftmost inactive presence), Display Active Presence
  const [energyIndex, setEnergyIndex] = useState(2);
  const [playIndex, setPlayIndex] = useState(3);

  const incrementEnergyIndex = () => {
    setEnergyIndex(energyIndex + 1);
  };

  const incrementPlayIndex = () => {
    setPlayIndex(playIndex + 1);
  };

  return (
    <div className="SpiritBoardPresenceTrack">
      <div>
        {presenceTrackEnergyString.map((energyPresence, index) => {
          let renderPresence;
          if (index < energyIndex) {
            renderPresence = energyPresence;
          } else if (index === energyIndex) {
            renderPresence = <button onClick={incrementEnergyIndex}>X</button>;
          } else {
            renderPresence = "X";
          }

          if (index < presenceTrackEnergyString.length - 1) {
            renderPresence = <>{renderPresence}, </>;
          }

          return <span key={index}>{renderPresence}</span>;
        })}
      </div>
      <div>
        {presenceTrackPlaysString.map((playPresence, index) => {
          let renderPresence;
          if (index < playIndex) {
            renderPresence = playPresence;
          } else if (index === playIndex) {
            renderPresence = <button onClick={incrementPlayIndex}>X</button>;
          } else {
            renderPresence = "X";
          }

          if (index < presenceTrackPlaysString.length - 1) {
            renderPresence = <>{renderPresence}, </>;
          }

          return <span key={index}>{renderPresence}</span>;
        })}
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
      <Presence />
      <div className="SpiritBoardInnatePowers">
        Energy: [{spiritEnergy.value}]
      </div>
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
