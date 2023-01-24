import React, { useState } from "react";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

import "./index.css";

const Growth: React.FC = () => {
  const [value, setValue] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("checked = ", e.target.checked);
    setValue(e.target.value);
  };

  return disabled ? (
    <div className="SpiritBoardGrowth">
      <div className="small-text">Reclaim One, Gain 1 Power Card, Gain 1 Energy</div>
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
    </div>
  );
};

export const SpiritBoard: React.FC = () => {
  return (
    <div className="SpiritBoard">
      <div className="SpiritBoardImageContainer"></div>
      <Growth />
      <div className="SpiritBoardPresenceTrack"></div>
      <div className="SpiritBoardInnatePowers"></div>
    </div>
  );
};
// button: onClick, check radio value, disable radio group
// do thing based on radio value
/*<div onClick={() => {
     setDisabled = True;
     if value=1{
      console.log('Picked Reclaim 1, Gain 1 Power, Gain 1 Energy');
      else if value=2{
        console.log('Picked Add 1 Presence (range 1) twice');
        else if value=3{
          console.log('Picked Gain 1 Power, Add 1 Presence');
        }
      }
     };
      }}>Confirm Growth</div>*/

// playerOneEnergy =
// playerTwoEnergy =
// TODO: state based - energy is tokens that can be saved/called.
// TODO: remove presence from track, add presence to board
export default SpiritBoard;
