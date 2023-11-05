import {useEffect, useState} from "react";
import "./App.css";

// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// // import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
// import {faTrash} from "@fortawesome/free-solid-svg-icons";

import Navbar from "./navigering/Navbar";
import {Route, Routes} from "react-router-dom";
import SidaAktuellStats from "./pages/SidaAktuellStats";
import SidaSammanlagdStats from "./pages/SidaSammanlagdStats";
import SidaInneliggandePatienter from "./pages/SidaInneliggandePatienter";

function App() {
  const [patienter, setPatienter] = useState(() => {
    const sparadePatienter = localStorage.getItem("inneliggande");
    if (sparadePatienter === 0) return [];

    return JSON.parse(sparadePatienter);
  });
  const [historikInskrivna, setHistorikInskrivna] = useState(() => {
    const sparadHistorik = localStorage.getItem("historik");
    if (sparadHistorik) {
      return JSON.parse(sparadHistorik);
    }
    return [];
  }); // Används för historiken
  useEffect(() => {
    localStorage.setItem("inneliggande", JSON.stringify(patienter));
    localStorage.setItem("historik", JSON.stringify(historikInskrivna));
  }, [patienter, historikInskrivna]);
  //  state för ny patient - start in = input
  const [inPlats, setInPlats] = useState("");
  const [inDatum, setInDatum] = useState("");
  const [inKontakt, setInKontakt] = useState("");
  const [initialer, setInitialer] = useState("");
  const [valdAvd, setValdAvd] = useState("");
  const [valdDygn, setValdDygn] = useState("");

  //  state för redigering
  const [redigeradPatient, setRedigeradPatient] = useState(null);

  //visa formulär
  const [visaForm, setVisaForm] = useState(false);

  //funktioner som ska vara i appen
  const uniqueId = () => {
    return new Date().getTime();
  };

  const handleSubmitNypatient = (e) => {
    e.preventDefault();
    const id = uniqueId(); // Skapa id här
    const nyPatient = {
      id: id,
      plats: inPlats,
      datum: inDatum,
      fvk: inKontakt,
      initialer: initialer,
      avd: valdAvd,
      dygn: valdDygn,
    };
    setPatienter((prevPatienter) => [...prevPatienter, nyPatient]);
    // Lägg till den nya patienten i historiken
    setHistorikInskrivna((prevHistorik) => [
      ...prevHistorik,
      {id: id, datum: inDatum, dygn: valdDygn, fvk: inKontakt},
    ]);
    setInPlats("");
    setInDatum("");
    setInKontakt("");
    setInitialer("");
    setValdAvd("");
    setValdDygn("");
    setVisaForm(false);
  };

  const startRedigering = (patient) => {
    // kopiera patientobjekt
    setRedigeradPatient({...patient});
  };

  const sparaHistorikRedigering = () => {
    if (redigeradPatient) {
      setHistorikInskrivna((prevHistorik) => {
        return prevHistorik.map((patient) => {
          // Använd id för att matcha patienten
          if (patient.id === redigeradPatient.id) {
            return {
              ...patient,
              datum: redigeradPatient.datum,
              dygn: redigeradPatient.dygn,
              fvk: redigeradPatient.fvk,
            };
          } else {
            return patient;
          }
        });
      });
    }
  };

  const sparaRedigering = () => {
    if (redigeradPatient) {
      setPatienter((prevPatienter) => {
        return prevPatienter.map((patient) => {
          return patient.id === redigeradPatient.id
            ? redigeradPatient
            : patient;
        });
      });
      sparaHistorikRedigering();
      setRedigeradPatient(null);
    }
  };

  const deletePatient = (id) => {
    setPatienter((prevPatienter) => {
      return prevPatienter.filter((p) => p.id !== id);
    });
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <SidaInneliggandePatienter
              visaForm={visaForm}
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
              patienter={patienter}
              redigeradPatient={redigeradPatient}
              setRedigeradPatient={setRedigeradPatient}
              sparaRedigering={sparaRedigering}
              startRedigering={startRedigering}
              deletePatient={deletePatient}
              setVisaForm={setVisaForm}
            />
          }
        />

        <Route
          path="/statistik"
          element={
            <SidaAktuellStats patienter={patienter} inKontakt={inKontakt} />
          }
        />
        <Route
          path="/sammanlagd"
          element={
            <SidaSammanlagdStats
              patienter={patienter}
              historikInskrivna={historikInskrivna}
            />
          }
        />
      </Routes>
      <br />
    </div>
  );
}

export default App;
