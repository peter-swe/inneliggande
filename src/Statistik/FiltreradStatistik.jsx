// FiltreradStatistik.jsx
import React from "react";
import Button from "../UI/Button";

const FiltreradStatistik = ({
  antalPatienter,
  antalDygn,
  antalFVKochDagar,
  newFilterHandler,
  periodStart,
  periodSlut,
  procentFVK,
  procentDygn,
}) => {
  return (
    <>
      <h2>
        Statistik för {periodStart} - {periodSlut}
      </h2>
      <p>totalt inlagda: {antalPatienter}</p>
      <p>
        angivet vårdtid: {antalDygn} = {procentDygn} %
      </p>
      <p>
        Tilldelats FVK: {antalFVKochDagar} = {procentFVK} %
      </p>
      <Button onClick={newFilterHandler}>Nytt filter</Button>
    </>
  );
};

export default FiltreradStatistik;
