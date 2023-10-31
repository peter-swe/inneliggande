import {useState, useEffect} from "react";

function AntaletInneliggandeDagar({inDatum}) {
  const [antaletDagar, setAntaletDagar] = useState(0);

  useEffect(() => {
    const idag = new Date(); // Datumet när komponenten renderas
    const inDag = new Date(inDatum);
    const tidsSkillnad = idag - inDag;
    const antaletDagar = Math.floor(tidsSkillnad / (1000 * 60 * 60 * 24));
    setAntaletDagar(antaletDagar);
  }, [inDatum]);

  return antaletDagar;
}

export default AntaletInneliggandeDagar;
