import React from "react";
import SelectBakavd from "../Formular/SelectBakavd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import SelectVardTid from "../Formular/SelectVardTid";
import AntaletInneliggandeDagar from "../Datum/AntaletInneliggandeDagar";
import Button from "../UI/Button";

function InneliggandePatienter({
  patienter,
  redigeradPatient,
  setRedigeradPatient,
  sparaRedigering,
  startRedigering,
  deletePatient,
  valdAvd,
  setValdAvd,
  inDatum,
}) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Plats</th>
            <th>Datum</th>
            <th>Initialer</th>
            <th>FVK</th>
            <th>Bakavdelning</th>
            <th>Beräknad vårdtid</th>
            <th>Dagar vårdad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
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
              for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
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
            .map((patient) => (
              <tr key={patient.id}>
                <td>
                  {redigeradPatient && redigeradPatient.id === patient.id ? (
                    <input
                      type="text"
                      value={redigeradPatient.plats}
                      onChange={(e) =>
                        setRedigeradPatient({
                          ...redigeradPatient,
                          plats: e.target.value,
                        })
                      }
                    />
                  ) : (
                    patient.plats
                  )}
                </td>
                <td>{patient.datum}</td>
                <td>{patient.initialer}</td>
                <td>
                  {redigeradPatient && redigeradPatient.id === patient.id ? (
                    <input
                      type="text"
                      value={redigeradPatient.fvk}
                      onChange={(e) =>
                        setRedigeradPatient({
                          ...redigeradPatient,
                          fvk: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  ) : (
                    patient.fvk
                  )}
                </td>
                {/* <td>
                {redigeradPatient && redigeradPatient.id === patient.id ? (
                  <SelectBakavd
                    setInAvd={setRedigeradPatient}
                    inAvd={redigeradPatient.avd}
                    onChange={(e) =>
                      setRedigeradPatient({
                        ...redigeradPatient,
                        fvk: e.target.value,
                      })
                    }
                  />
                ) : (
                  patient.avd
                )}
              </td> */}
                <td>
                  {redigeradPatient && redigeradPatient.id === patient.id ? (
                    <SelectBakavd
                      setValdAvd={(value) =>
                        setRedigeradPatient({...redigeradPatient, avd: value})
                      }
                      inAvd={redigeradPatient.avd}
                    />
                  ) : (
                    patient.avd
                  )}
                </td>
                <td>
                  {redigeradPatient && redigeradPatient.id === patient.id ? (
                    <SelectVardTid
                      setValdDygn={(value) =>
                        setRedigeradPatient({...redigeradPatient, dygn: value})
                      }
                      valdDygn={redigeradPatient.dygn}
                    />
                  ) : (
                    patient.dygn
                  )}
                </td>
                <td>
                  <AntaletInneliggandeDagar inDatum={patient.datum} />
                </td>
                <td>
                  {redigeradPatient && redigeradPatient.id === patient.id ? (
                    <Button onClick={sparaRedigering}>Spara</Button>
                  ) : (
                    <Button onClick={() => startRedigering(patient)}>
                      Redigera
                    </Button>
                  )}
                </td>

                <td>
                  <span style={{color: "red", margin: "3px"}}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="lg"
                      onClick={() => deletePatient(patient.id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default InneliggandePatienter;
