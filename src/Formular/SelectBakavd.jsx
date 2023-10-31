import React from "react";

function SelectBakavd({valdAvd, setValdAvd}) {
  return (
    <select
      name="avd"
      onChange={(e) => setValdAvd(e.target.value)}
      value={valdAvd}
    >
      <option value="bakavd">Bakavdelning</option>
      <option value="Medicin barn">Medicin barn</option>
      <option value="Kirurgi barn">Kirurgi barn</option>
      <option value="BHC">BHC</option>
      <option value="BONK">BONK</option>
    </select>
  );
}

export default SelectBakavd;
