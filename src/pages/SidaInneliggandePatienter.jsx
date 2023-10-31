import React from "react";
import NyPatientForm from "../Formular/NyPatientForm";
import IngaInneliggande from "../IngaInneliggande";
import PatienterTabell from "../Tabell/PatienterTabell";

function SidaInneliggandePatienter({
  visaForm,
  handleSubmitNypatient,
  inPlats,
  setInPlats,
  inKontakt,
  setInKontakt,
  inDatum,
  setInDatum,
  initialer,
  setInitialer,
  valdAvd,
  setValdAvd,
  valdDygn,
  setValdDygn,
  patienter,
  redigeradPatient,
  setRedigeradPatient,
  sparaRedigering,
  startRedigering,
  deletePatient,
  setVisaForm,
}) {
  return (
    <>
      {visaForm && (
        <NyPatientForm
          handleSubmitNypatient={handleSubmitNypatient}
          inPlats={inPlats}
          setInPlats={setInPlats}
          inKontakt={inKontakt}
          setInKontakt={setInKontakt}
          inDatum={inDatum}
          setInDatum={setInDatum}
          initialer={initialer}
          setInitialer={setInitialer}
          valdAvd={valdAvd}
          setValdAvd={setValdAvd}
          valdDygn={valdDygn}
          setValdDygn={setValdDygn}
        />
      )}
      {patienter.length === 0 ? (
        <IngaInneliggande />
      ) : (
        <PatienterTabell
          patienter={patienter}
          redigeradPatient={redigeradPatient}
          setRedigeradPatient={setRedigeradPatient}
          sparaRedigering={sparaRedigering}
          startRedigering={startRedigering}
          deletePatient={deletePatient}
          inDatum={inDatum}
        />
      )}
      <div>
        <button onClick={() => setVisaForm(true)}>Ny patient</button>
      </div>
    </>
  );
}

export default SidaInneliggandePatienter;
