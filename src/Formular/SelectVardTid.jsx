import React from "react";

function SelectVardTid({valdDygn, setValdDygn}) {
  return (
    <select onChange={(e) => setValdDygn(e.target.value)} value={valdDygn}>
      <option value="bakavd">Beräknad vårdtid</option>
      <option value="0 - 3">0 - 3</option>
      <option value="4 - 7">4 - 7</option>
      <option value="8 - 14">8 - 14</option>
      <option value="15 - 30">15 - 30</option>

      <option value="> 30">&gt; 30</option>
    </select>
  );
}

export default SelectVardTid;
