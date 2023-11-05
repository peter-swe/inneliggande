import React, {useEffect, useState} from "react";

function FiltreradStatistik({patienter}) {
  const [startDatum, setStartDatum] = useState("");
  const [slutDatum, setSlutDatum] = useState("");
  const [filtreradePatienter, setFiltreradePatienter] = useState([]);

  const [totaltInlagda, setTotaltInlagda] = useState(0);
  const [totaltFVK, setTotaltFVK] = useState(0);
  const [totaltVardtid, setTotaltVardtid] = useState(0);

  useEffect(() => {
    // Filtrera patienter baserat på kriterierna
    const startDate = new Date(startDatum);
    const endDate = new Date(slutDatum);
    const filteredPatients = patienter.filter((patient) => {
      const inDatum = new Date(patient.inDatum);
      return inDatum >= startDate && inDatum <= endDate;
    });

    setFiltreradePatienter(filteredPatients);
  }, [startDatum, slutDatum, patienter]);

  useEffect(() => {
    // Räkna det totala antalet inlagda patienter
    setTotaltInlagda(filtreradePatienter.length);
  }, [filtreradePatienter]);

  useEffect(() => {
    // Räkna det totala antalet patienter med FVK
    const antalFVK = filtreradePatienter.filter(
      (patient) => patient.fvk !== ""
    ).length;
    setTotaltFVK(antalFVK);
  }, [filtreradePatienter]);

  useEffect(() => {
    // Räkna det totala antalet med vald vårdtid
    const antalVardtid = filtreradePatienter.filter(
      (patient) => patient.vardtid !== ""
    ).length;
    setTotaltVardtid(antalVardtid);
  }, [filtreradePatienter]);

  const handleFilter = () => {
    const startDate = new Date(startDatum);
    const endDate = new Date(slutDatum);

    // Filtrera patienter baserat på kriterierna
    const filteredPatients = patienter.filter((patient) => {
      const inDatum = new Date(patient.inDatum);
      return inDatum >= startDate && inDatum <= endDate;
    });

    setFiltreradePatienter(filteredPatients);
  };

  return (
    <div>
      <h1>Filterad Statistik</h1>
      <input
        type="date"
        value={startDatum}
        onChange={(e) => setStartDatum(e.target.value)}
      />
      <input
        type="date"
        value={slutDatum}
        onChange={(e) => setSlutDatum(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrera</button>
      {console.log("in:", startDatum)}
      {console.log("slut:", slutDatum)}

      <p>Totalt antal inlagda patienter: {totaltInlagda}</p>
      <p>Totalt antal patienter med FVK: {totaltFVK}</p>
      <p>Totalt antal med vald vårdtid: {totaltVardtid}</p>

      <ul>
        {filtreradePatienter.map((patient) => (
          <li key={patient.id}>{patient.namn}</li>
        ))}
      </ul>
    </div>
  );
}

export default FiltreradStatistik;
