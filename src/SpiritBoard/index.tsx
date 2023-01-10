import React, { useState } from 'react';

import { Col, Dropdown, MenuProps, Row } from 'antd';
import produce from "immer";

function SpiritBoard() {
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
// TODO: state based - energy is tokens that can be saved/called.
// TODO: remove presence from track, add presence to board
export default SpiritBoard;