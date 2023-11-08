import React from "react";

function SidaAktuellStats({patienter, antaletDagarMellanDagar}) {
  // function antaletDagarMellanDagar(startDatum, slutDatum) {
  //   const start = new Date(startDatum);
  //   const slut = new Date(slutDatum);
  //   const tidsSkillnad = slut - start;
  //   return Math.floor(tidsSkillnad / (1000 * 60 * 60 * 24));
  // }

  // Räkna antalet patienter
  const antalPatienter = patienter.length;

  // Räkna antalet patienter med FVK
  const antalFVKochDagar = patienter.filter((patient) => {
    return (
      patient.fvk !== "" &&
      antaletDagarMellanDagar(patient.datum, new Date()) > 5
    );
  }).length;

  // Beräkna antalet patienter som uppfyller villkoret för antalet dagar
  const eligibleFVK = patienter.filter((patient) => {
    return antaletDagarMellanDagar(patient.datum, new Date()) > 5;
  }).length;

  // Beräkna procentandelen och runda av till närmaste heltal
  const procentFVK = Math.round((antalFVKochDagar * 100) / eligibleFVK);

  // Räkna antalet patienter med angivet 'dygn'
  const antalDygn = patienter.filter((patient) => patient.dygn !== "").length;

  const procentDygn = Math.round((antalDygn * 100) / antalPatienter);

  return (
    <>
      {patienter.length ? (
        <>
          <p>inneliggande: {antalPatienter}</p>
          <p>
            antal som fått FVK: {antalFVKochDagar} = {procentFVK} %
          </p>
          <p>
            antal med beräknad vårdtid: {antalDygn} = {procentDygn} %
          </p>
        </>
      ) : (
        // <table style={{width: "50%", margin: "11px"}}>
        //   <tbody>
        //     <tr>
        //       <td>inneliggande:</td>
        //       <td>{antalPatienter}</td>
        //     </tr>
        //     <tr>
        //       <td>antal som tilldelats FVK:</td>
        //       <td>{antalFVKochDagar}</td>
        //     </tr>
        //     <tr>
        //       <td>antal med angiven vårdtid:</td>
        //       <td>{antalDygn}</td>
        //     </tr>
        //   </tbody>
        // </table>
        " inga patienter inskrivna"
      )}
    </>
  );
}

export default SidaAktuellStats;
