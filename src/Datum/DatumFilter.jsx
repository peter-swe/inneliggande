import "../Formular/Form.css";
import Button from "../UI/Button";

const DatumFilter = ({
  historikInskrivna,
  setPeriodStart,
  periodStart,
  periodSlut,
  onFilter,
  setPeriodSlut,
}) => {
  const handleFilter = (e) => {
    e.preventDefault();
    // Konvertera start- och slutdatum till JavaScript Date-objekt
    const newStartDate = new Date(periodStart);
    const newEndDate = new Date(periodSlut);

    // Ta bort tidskomponenten för att jämföra enbart datum
    newStartDate.setHours(0, 0, 0, 0);
    newEndDate.setHours(0, 0, 0, 0);

    // Filtrera resultaten och uppdatera filtrerad data i komponentens lokala tillstånd
    const filtreradDatum = historikInskrivna.filter((patient) => {
      const patientDate = new Date(patient.datum);
      patientDate.setHours(0, 0, 0, 0);

      console.log("patientDate:", patientDate);
      console.log("startDate:", newStartDate);
      console.log("endDate:", newEndDate);

      const isWithinRange =
        patientDate >= newStartDate && patientDate <= newEndDate;
      console.log("isWithinRange:", isWithinRange);

      return isWithinRange;
    });

    onFilter(filtreradDatum);
  };

  return (
    <form>
      <div className="form-container">
        <div className="kolumn">
          <label>Startdatum</label>
          <input
            type="date"
            value={periodStart}
            onChange={(e) => setPeriodStart(e.target.value)}
          />
        </div>
        <div className="kolumn">
          <label>Slutdatum</label>
          <input
            type="date"
            value={periodSlut}
            onChange={(e) => setPeriodSlut(e.target.value)}
          />
        </div>
        <Button onClick={handleFilter}>Filtrera datum</Button>
      </div>
    </form>
  );
};

export default DatumFilter;
