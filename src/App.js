import React, {useState, useEffect, Fragment} from 'react';

const Cita = ({index, cita, eliminarCita}) => {
    return (
        <div className="cita">
            <p>Mascota: <span>{cita.mascota}</span></p>
            <p>Dueño: <span>{cita.propietario}</span></p>
            <p>Fecha: <span>{cita.fecha}</span></p>
            <p>Hora: <span>{cita.hora}</span></p>
            <p>Sintomas: <span>{cita.sintomas}</span></p>
            <button
                onClick={() => eliminarCita(index)}
                type="button" className="button eliminar u-full-width">Eliminar X</button>
        </div>
    )
}

const Formulario = ({crearCita}) => {
    const citaInicial = {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }
    const [cita, actualizarCita] = useState(citaInicial);

    const handleChange = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        crearCita(cita);
        actualizarCita(citaInicial);
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            <form onSubmit={handleSubmit}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    value={cita.mascota}
                    onChange={handleChange}
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    value={cita.propietario}
                    onChange={handleChange}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    className="u-full-width"
                    name="fecha"
                    value={cita.fecha}
                    onChange={handleChange}
                />

                <label>Hora</label>
                <input
                    type="time"
                    className="u-full-width"
                    name="hora"
                    value={cita.hora}
                    onChange={handleChange}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={cita.sintomas}
                ></textarea>

                <button type="submit" className="button-primary u-full-width">Agregar</button>
            </form>
        </Fragment>
    )
}

const App = () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) citasIniciales = [];

    const [citas, guardarCitas] = useState(citasIniciales);

    const crearCita = cita => {
        const nuevasCitas = [...citas, cita];
        guardarCitas(nuevasCitas);
    }

    const eliminarCita = index => {
        const nuevasCitas = [...citas];
        nuevasCitas.splice(index, 1);
        guardarCitas(nuevasCitas);
    }

    useEffect(() => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales) {
            localStorage.setItem('citas', JSON.stringify(citas));
        } else {
            localStorage.setItem('citas', JSON.stringify([]));
        }
    },[citas]);

    //cargar condicionalmente el titulo
    const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar Citas';

    return (
        <Fragment>
            <h1>Administrador de pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map((cita, index) => (
                            <Cita
                                key={index}
                                index={index}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>

    );
};

export default App;
