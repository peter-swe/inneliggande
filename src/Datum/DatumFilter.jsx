import "../Formular/Form.css";
import {useState} from "react";

function DatumFilter({onFilter}) {
  const [periodStart, setPeriodStart] = useState("");
  const [periodSlut, setPeriodSlut] = useState("");

  function handleFilter() {
    onFilter(periodStart, periodSlut);
  }
  return (
    <div>
      <>
        <form>
          <div className="form-container">
            <div className="kolumn">
              <label>start {periodStart}</label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
              />
            </div>
            <div className="kolumn">
              <label>slut {periodSlut}</label>
              <input
                type="date"
                value={periodSlut}
                onChange={(e) => setPeriodSlut(e.target.value)}
                placeholder="ange slut datum"
              />
            </div>
            <button onClick={handleFilter}>Filtrera datum</button>
          </div>
        </form>
      </>
    </div>
  );
}

export default DatumFilter;
