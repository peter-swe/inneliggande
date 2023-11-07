// import React, {useState} from "react";

import DatumFilter from "../Datum/DatumFilter";

function SidaSammanlagdStats({
  historikInskrivna,
  antaletDagarMellanDagar,
  filteredData,
  setFilteredData,
}) {
  const handleFilter = (nyaFiltreradeData) => {
    setFilteredData(nyaFiltreradeData);
  };

  // Använd filteredData för att utföra beräkningar eller visa information baserat på det.
  const antalPatienter = filteredData.length;
  // Räkna antalet patienter med angivet 'dygn'
  const antalDygn = filteredData.filter(
    (patient) => patient.dygn !== ""
  ).length;

  // Räkna antalet patienter med FVK
  const antalFVKochDagar = filteredData.filter((patient) => {
    return (
      patient.fvk !== "" &&
      antaletDagarMellanDagar(patient.datum, new Date()) > 5
    );
  }).length;

  // const totalInskrivna = historikInskrivna.filter((patient) => {
  //   const patientDatum = new Date(patient.datum);
  //   return (
  //     patientDatum >= new Date(periodStart) &&
  //     patientDatum <= new Date(periodSlut)
  //   );
  // }).length;

  return (
    <>
      <p>totalt inlagda: {antalPatienter}</p>
      <p>angivet vårdtid: {antalDygn}</p>
      <p>Tilldelats FVK: {antalFVKochDagar}</p>
      <DatumFilter
        historikInskrivna={historikInskrivna}
        onFilter={handleFilter}
      />
    </>
  );
}

export default SidaSammanlagdStats;
