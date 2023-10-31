import {useEffect, useState} from "react";
import PattientData from "../components/patientList/PattientData";
import PatientForm from "../components/samlaInfo/PatientForm";
import "../AppStilar/Tabell.css";

function InneliggandePatienter() {
  const [show, setShow] = useState(false);
  const [patienter, setPatienter] = useState(() => {
    const storedPatienter = localStorage.getItem("inlagda");
    if (storedPatienter === null) return [];
    return JSON.parse(storedPatienter);
  });

  useEffect(() => {
    localStorage.setItem("inlagda", JSON.stringify(patienter));
  }, [patienter]);

  const addPatient = (newPatientData) => {
    // Skapa en kopia av den befintliga listan av patienter och lägg till den nya patienten
    setPatienter((prevPatienter) => [...prevPatienter, newPatientData]);
    setShow(false);
  };

  const showFormHandler = () => {
    setShow(true);
  };
  const deletePatientHandler = (id) => {
    setPatienter((currentPat) => {
      return currentPat.filter((pat) => pat.id !== id);
    });
  };
  return (
    <>
      <div className=".table-container">
        <table className="table">
          <thead>
            <tr className="trHead">
              <th className="th">Plats</th>
              <th className="th">Datum</th>
              <th className="th">Initialer</th>
              <th className="th">FVK</th>
              <th className="th">Bakavdelning</th>
              <th className="th">Beräknad Vårdtid</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {patienter
              .slice() //skapar en kopia
              .sort((a, b) => {
                const platsA = a.plats.toString();
                const platsB = b.plats.toString();

                // Dela upp platserna i deras delar (till exempel 113:1 blir [113, 1])
                const partsA = platsA
                  .split(":")
                  .map((part) => (isNaN(part) ? part : parseInt(part)));
                const partsB = platsB
                  .split(":")
                  .map((part) => (isNaN(part) ? part : parseInt(part)));

                // Jämför delarna en efter en
                for (
                  let i = 0;
                  i < Math.min(partsA.length, partsB.length);
                  i++
                ) {
                  if (partsA[i] < partsB[i]) {
                    return -1;
                  }
                  if (partsA[i] > partsB[i]) {
                    return 1;
                  }
                }

                // Om alla delar är lika, använd standardnummerordning
                if (partsA.length < partsB.length) {
                  return -1;
                }
                if (partsA.length > partsB.length) {
                  return 1;
                }

                return 0;
              })

              .map((pat) => (
                <PattientData
                  key={pat.id}
                  initialer={pat.initialer}
                  plats={pat.plats}
                  datum={pat.datum}
                  fvk={pat.fvk}
                  avd={pat.avd}
                  vardTid={pat.vardTid}
                  deletePatientHandler={deletePatientHandler}
                  id={pat.id}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <button onClick={showFormHandler}>Ny Patient</button>
      </div>
      {show && <PatientForm addPatient={addPatient} />}
    </>
  );
}

export default InneliggandePatienter;
