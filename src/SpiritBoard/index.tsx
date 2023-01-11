import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Col, Dropdown, MenuProps, Row } from 'antd';
import produce from "immer";

function SpiritBoardTemp() {
//   const [board, setBoard] = useState(createBoardA());

  return (
  <div>
    <div>
      Growth (Pick One) <br/>
      Reclaim One, Gain 1 Power Card, Gain 1 Energy OR Add 1 presence (1), Add 1 presence (1) OR Gain 1 Power Card, Add 1 presence (2)
    </div>
    <div>
      Presence <br/>
      [1 per turn], [2 per turn], [2 per turn], [3 per turn], [4 per turn], [4 per turn], [5 per turn] <div/>
      [1 play], [2 play], [2 play], [3 play], [Reclaim One], [4 play], [5 play]
    </div>
  </div>
  )
}
// TODO: Growth Phase Modal - only select one (some spirits select multiple), only available during Growth Phase.

export const SpiritBoard: React.FC = () => {
  const [value, setValue] = useState(1);
  const [disabled, setDisabled] = useState(false);

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('checked = ', e.target.checked);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value} disabled={disabled}>
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