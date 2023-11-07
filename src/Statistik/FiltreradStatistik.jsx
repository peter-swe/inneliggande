// FiltreradStatistik.jsx
import React from "react";

const FiltreradStatistik = ({
  antalPatienter,
  antalDygn,
  antalFVKochDagar,
  newFilterHandler,
  periodStart,
  periodSlut,
}) => {
  return (
    <>
      <h2>
        Statistik för {periodStart} - {periodSlut}
      </h2>
      <p>totalt inlagda: {antalPatienter}</p>
      <p>angivet vårdtid: {antalDygn}</p>
      <p>Tilldelats FVK: {antalFVKochDagar}</p>
      <button onClick={newFilterHandler}>Nytt filter</button>
    </>
  );
};

export default FiltreradStatistik;
