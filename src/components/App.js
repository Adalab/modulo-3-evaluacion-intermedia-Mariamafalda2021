import '../styles/App.scss';
import adalabers from '../services/data.json'
import { useState } from 'react';

function App() {
  //Creamos la variable de estado para las búsquedas
  const [search, setSearch] = useState('');

  //Creamos la función manejadora de la búsqueda
  const handleSearch = (ev) => {
    setSearch(ev.currentTarget.value);
  }
  //Creamos la variable de estado para tener la lista de adalabers y repintarla
  const [data, setData] = useState(adalabers.results);

  //Creamos tantas variables de estado como inputs tengamos
  const [name, setName] = useState('');
  const [tutor, setTutor] = useState('');
  const [specialty, setSpecialty] = useState('');

  //Creamos las funciones manejadoras a las que llamamos desde cada input con el onChange

  const handleAddName = (ev) =>
    setName(ev.currentTarget.value);
  const handleAddTutor = (ev) =>
    setTutor(ev.currentTarget.value);
  const handleAddSpecialty = (ev) =>
    setSpecialty(ev.currentTarget.value);

  //Creamos la funcion del botón de añadir
  const handleClick = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      "name": name,
      "counselor": tutor,
      "speciality": specialty
    };
    setData([...data, newAdalaber]);
    //Limpiamos los inputs
    setName('');
    setTutor('');
    setSpecialty('');
  };

  const filterData = data.filter((oneAdalaber) => oneAdalaber.name.toLowerCase().includes(search.toLowerCase())
  );

  //Pintamos la tabla con la nueva adalaber añadida
  const htmlAdalaber = filterData.map((adalaber, index) => (
    < tr key={index}>
      <td>{adalaber.name}</td>
      <td>{adalaber.counselor}</td>
      <td>{adalaber.speciality}</td>
    </tr >
  ));





  return (
    <div className="App">

      <h1>Adalabers</h1>
      <form>
        <label htmlFor="">Nombre</label>

        <input
          type="text"
          name="name"
          id="name"
          placeholder=""
          value={search}
          onChange={handleSearch}
        />
        <label htmlFor="">Tutora</label>
        <input
          type="text"
          name="tutora"
          id="tutora"
          placeholder="Tutora"
        />
      </form>

      <table>
        <thead className="table-header"><tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
        </tr>
        </thead>

        <tbody>
          {htmlAdalaber}
        </tbody>
      </table>

      <form>
        <h2>Añadir una Adalaber</h2>
        <label htmlFor="">Nombre</label>
        <input
          className="new-contact__input"
          type="text"
          name="name"
          id="name"
          placeholder=""
          onChange={handleAddName}
          value={name}
        />
        <label htmlFor="">Tutora</label>
        <input
          className="new-contact__input"
          type="text"
          name="tutora"
          id="tutora"
          placeholder=""
          onChange={handleAddTutor}
          value={tutor}
        />
        <label htmlFor="">Especialidad</label>
        <input
          className="new-contact__input"
          type="text"
          name="especialidad"
          id="especialidad"
          placeholder=""
          onChange={handleAddSpecialty}
          value={specialty}
        />
        <input className="new-contact__btn" type="submit" value="Añadir una adalaber" onClick={handleClick} />

      </form>
    </div>
  );
}

export default App;
