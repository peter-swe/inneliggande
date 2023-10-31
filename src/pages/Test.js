import React from "react";

function Test() {
  return (
    <div className="filter-container">
      <p>Statistik för perioden</p>
      <input type="date" placeholder="från datum" />
      <p>till</p>
      <input type="date" placeholder="till datum" />
    </div>
  );
}

export default Test;
