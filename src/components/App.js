import '../styles/App.scss';
import { useState, useEffect } from 'react';

function App() {
  //Variables de estado
  const [data, setData] = useState([]);
  const [adalaberName, setAdalaberName] = useState('');
  const [counselor, setCounselor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [selected, setSelected] = useState('all');
  const [search, setSearch] = useState('');


  //Llamamos a la API
  useEffect(() => {
    fetch(
      'https://beta.adalab.es/pw-recursos/apis/adalabers-v1/promo-patata.json'
    )
      .then((response) => response.json())
      .then((dataAPI) => {
        setData(dataAPI.results);
      });
  }, []);




  // Funciones manejadoras
  const handleChangeName = (ev) => {
    setAdalaberName(ev.currentTarget.value);
  };
  const handleChangeCounselor = (ev) => {
    setCounselor(ev.currentTarget.value);
  };
  const handleChangeSpeciality = (ev) => {
    setSpeciality(ev.currentTarget.value);
  };

  const handleAddAdalaber = (ev) => {
    ev.preventDefault();

    setData([
      ...data,
      {
        id: data.length,
        name: adalaberName,
        counselor: counselor,
        promo: 'O',
        speciality: speciality,
        social_networks: [{}],
        teams: [{}],
      },
    ]);
    setAdalaberName('');
    setCounselor('');
    setSpeciality('');
  };

  const handleChangeSelect = (ev) => {
    setSelected(ev.currentTarget.value);
  };

  const handleInputSearch = (ev) => {
    setSearch(ev.currentTarget.value);
  };

  // Render HTML

  const renderStudents = data
    .filter((adalaber) => {
      if (search !== '') {
        return adalaber.name.toLowerCase().includes(search.toLowerCase());
      } else {
        return adalaber;
      }
    })

    .filter((adalaber) => {
      if (selected === 'all') {
        return adalaber;
      } else if (selected === 'yanelis') {
        return adalaber.counselor === 'Yanelis';
      } else if (selected === 'dayana') {
        return adalaber.counselor === 'Dayana';
      } else if (selected === 'ivan') {
        return adalaber.counselor === 'Iván';
      }
    })
    // Iconos redes sociales
    .map((adalaber) => {
      const networks = adalaber.social_networks.map((eachNetwork, index) => {

        const socialIcon = () => {
          if (eachNetwork.name === 'Twitter') {
            return <i className="fab fa-twitter"></i>;
          } else if (eachNetwork.name === 'GitHub') {
            return <i className="fab fa-github"></i>;
          } else if (eachNetwork.name === 'LinkedIn') {
            return <i className="fab fa-linkedin-in"></i>;
          } else {
            return null;
          }
        };
        return (
          <a key={index} href={eachNetwork.url} target="_blank">
            {socialIcon()}
          </a>
        );
      });

      return (
        <tr key={adalaber.id} className="tbody__row">
          <td className="tbody__row--column">{adalaber.name}</td>
          <td className="tbody__row--column">{adalaber.counselor}</td>
          <td className="tbody__row--column">{adalaber.speciality}</td>
          <td className="tbody__row--column">{networks}</td>
        </tr>
      );
    });

  return (
    <>
      <header className="header">
        <h1 className="header__title">Adalabers</h1>
        <form className="header__container">
          <input
            className="header__input"
            type="text"
            placeholder="Busca por alumna..."
            value={search}
            onChange={handleInputSearch}
          />
          <select
            className="header__select"
            name="filter-students"
            id="filter-students"
            value={selected}
            onChange={handleChangeSelect}
          >
            <option value="all">Cualquiera</option>
            <option value="yanelis">Yanelis</option>
            <option value="dayana">Dayana</option>
            <option value="ivan">Iván</option>
          </select>
        </form>
      </header>
      <main>
        <section className="students-section">
          <table cellSpacing={1} className="table">
            <thead className="thead">
              <tr className="thead__row">
                <th className="thead__row--column">Nombre</th>
                <th className="thead__row--column">Tutora</th>
                <th className="thead__row--column">Especialidad</th>
                <th className="thead__row--column">Redes Sociales</th>
              </tr>
            </thead>
            <tbody className="tbody">{renderStudents}</tbody>
          </table>
        </section>
        <section className="register-section">
          <form className="form" onSubmit={(ev) => ev.preventDefault()}>
            <h2 className="form__title">Añadir una Adalaber</h2>
            <div className="form-container">
              <label className="form__label" htmlFor="name">
                Nombre:
              </label>
              <input
                className="form__input"
                type="text"
                id="name"
                placeholder="Ej: Mari Carmen"
                value={adalaberName}
                onChange={handleChangeName}
              />
            </div>
            <div className="form-container">
              <label className="form__label" htmlFor="counselor">
                Tutora:
              </label>
              <input
                className="form__input"
                type="text"
                id="counselor"
                placeholder="Yanelis, Dayana o Iván"
                value={counselor}
                onChange={handleChangeCounselor}
              />
            </div>
            <div className="form-container">
              <label className="form__label" htmlFor="speciality">
                Especialidad:
              </label>
              <input
                className="form__input"
                type="text"
                id="speciality"
                placeholder="Javascript, React, Node JS..."
                value={speciality}
                onChange={handleChangeSpeciality}
              />
            </div>
            <button className="form__button" onClick={handleAddAdalaber}>
              Añadir una nueva Adalaber
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;