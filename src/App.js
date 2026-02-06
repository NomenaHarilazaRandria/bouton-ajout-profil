import {useState} from "react";

function Profil({prenom, age, onVieillir, onRajeunir, resetAge, suprimProfil}){
  return (
    <>
      <h2>{prenom}</h2>
      <p>Âge: {age}</p>
      <button onClick = {onVieillir}>+1</button>
      <button onClick = {onRajeunir}>-1</button>
      <button onClick = {resetAge}> Reset Age </button>
      <button onClick = {suprimProfil}>Supprimer</button>
    </>
  );
}

export default function App(){
  const [profils, setProfils] = useState(
    [
      {id: 1, prenom: "Nomena", age: 25, initialAge: 25},
      {id: 2, prenom: "Laza", age: 19, initialAge: 19}
    ]
  );
const [nouveauPrenom, setNouveauPrenom] = useState("");
const [nouvelAge, setNouvelAge] = useState("");

  const vieillir = (id) => {
    setProfils(prevProfil => prevProfil.map(
      profil => profil.id === id ? {...profil, age: profil.age+1} : profil
    ))
  };
  const rajeunir = (id) => {
    setProfils(
      prevProfil => prevProfil.map(
        profil => profil.id === id ? {...profil, age: Math.max(0,profil.age-1)}:profil
      )
    )
  };
  const initialiserAge = (id)=>{setProfils(
    prevProfils => prevProfils.map(
      profil => profil.id === id ? {...profil, age: profil.initialAge} : profil
    )
  )};
  const suprimer = (id) => {
    setProfils(prevProfils => prevProfils.filter(profil => profil.id !== id))
  };
  const addProfil = () => {
    if (!nouveauPrenom || nouvelAge === "") return;
  
    setProfils(prevProfils => [
      ...prevProfils,
      {
        id: Date.now(), // id simple et unique
        prenom: nouveauPrenom,
        age: Number(nouvelAge),
        initialAge: Number(nouvelAge)
      }
    ]);
  
    // reset du formulaire
    setNouveauPrenom("");
    setNouvelAge("");
  };
  return(
    <>
      <h1>Liste des profils</h1>
      {
        profils.map(
          profil =>
            <Profil
              key = {profil.id}
              prenom = {profil.prenom}
              age = {profil.age}
              onVieillir = {()=>vieillir(profil.id)}
              onRajeunir = {()=>rajeunir(profil.id)}
              resetAge = {()=> initialiserAge(profil.id)}
              suprimProfil = {()=> suprimer(profil.id)}
            />
        )
      }
      <h2>Ajouter un profil</h2>

<input
  type="text"
  placeholder="Prénom"
  value={nouveauPrenom}
  onChange={(e) => setNouveauPrenom(e.target.value)}
/>

<input
  type="number"
  placeholder="Âge"
  value={nouvelAge}
  onChange={(e) => setNouvelAge(e.target.value)}
/>

<button onClick={addProfil}>Ajouter</button>
    </>
  );
}