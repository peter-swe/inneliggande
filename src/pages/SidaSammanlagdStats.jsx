import React, {useState} from "react";

import DatumFilter from "../Datum/DatumFilter";

function SidaSammanlagdStats({patienter, historikInskrivna}) {
  const [filteredPatienter, setFilteredPatienter] = useState(patienter);

  const filterPatientsByDate = (startDate, endDate) => {
    const filtered = historikInskrivna.filter((patient) => {
      const patientDatum = new Date(patient.datum);
      return (
        patientDatum >= new Date(startDate) && patientDatum <= new Date(endDate)
      );
    });
    setFilteredPatienter(filtered);
  };

  const totalInskrivna = historikInskrivna.length;

  // Räkna antalet patienter med angivet 'dygn'
  const antalDygn = historikInskrivna.filter(
    (patient) => patient.dygn !== ""
  ).length;

  return (
    <>
      <p>totalt inlagda: {totalInskrivna}</p>
      <p>angivet vårdtid: {antalDygn}</p>
      <DatumFilter onFilter={filterPatientsByDate} />
    </>
  );
}

export default SidaSammanlagdStats;
