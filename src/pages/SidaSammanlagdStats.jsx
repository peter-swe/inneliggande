import React, {useState} from "react";

import DatumFilter from "../Datum/DatumFilter";
import FiltreradStatistik from "../Statistik/FiltreradStatistik";

function SidaSammanlagdStats({
  historikInskrivna,
  antaletDagarMellanDagar,
  filteredData,
  setFilteredData,
}) {
  const [showFiltreradStatistik, setShowFiltreradStatistik] = useState(false);
  const [periodStart, setPeriodStart] = useState("");
  const [periodSlut, setPeriodSlut] = useState("");

  const handleFilter = (nyaFiltreradeData) => {
    setFilteredData(nyaFiltreradeData);
    setShowFiltreradStatistik(true); // Visa FiltreradStatistik när filtreringen är klar
  };

  function newFilterHandler() {
    setShowFiltreradStatistik(false);
  }
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
      {showFiltreradStatistik ? ( // Visa FiltreradStatistik om showFiltreradStatistik är true
        <FiltreradStatistik
          antalPatienter={antalPatienter}
          antalDygn={antalDygn}
          antalFVKochDagar={antalFVKochDagar}
          newFilterHandler={newFilterHandler}
          periodStart={periodStart} // Skicka periodStart som prop till FiltreradStatistik
          periodSlut={periodSlut} // Skicka periodSlut som prop till FiltreradStatistik
        />
      ) : (
        // Visa DatumFilter om showFiltreradStatistik är false
        <DatumFilter
          historikInskrivna={historikInskrivna}
          onFilter={handleFilter}
          periodStart={periodStart} // Skicka periodStart som prop till DatumFilter
          periodSlut={periodSlut} // Skicka periodSlut som prop till DatumFilter
          setPeriodStart={setPeriodStart}
          setPeriodSlut={setPeriodSlut}
        />
      )}
    </>
  );
}

export default SidaSammanlagdStats;
