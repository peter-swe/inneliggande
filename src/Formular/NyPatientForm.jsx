import React from "react";
import SelectBakavd from "./SelectBakavd";
import SelectVardTid from "./SelectVardTid";
import Button from "../UI/Button";

function NyPatientForm({
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
}) {
  return (
    <div className="card">
      <form onSubmit={handleSubmitNypatient}>
        <div className="form-container">
          <div className="va-container">
            <input
              type="text"
              value={inPlats}
              placeholder="sängplats..."
              onChange={(e) => setInPlats(e.target.value.toUpperCase())}
            />
            <input
              type="text"
              value={inKontakt}
              placeholder="FVK"
              onChange={(e) => setInKontakt(e.target.value.toUpperCase())}
            />
            <input
              type="text"
              value={initialer}
              placeholder="Initialer..."
              onChange={(e) => setInitialer(e.target.value.toUpperCase())}
            />
          </div>
          <div className="ho-container">
            <input
              type="date"
              value={inDatum}
              onChange={(e) => setInDatum(e.target.value)}
            />
            <span>
              <SelectBakavd setValdAvd={setValdAvd} valdAvd={valdAvd} />
            </span>
            <SelectVardTid valdDygn={valdDygn} setValdDygn={setValdDygn} />
          </div>
        </div>
        <div className="btn-container">
          <Button type="submit">Spara</Button>
        </div>
      </form>
    </div>
  );
}

export default NyPatientForm;
