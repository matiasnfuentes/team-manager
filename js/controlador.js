let equipos = []
let lastId = 0;

// Equipos

function crearEquipo() {
    let nombre = document.getElementById('nombreEquipo').value;
    let entrenador = document.getElementById('entrenador').value;
    let estadio = document.getElementById('estadio').value;
    document.getElementById('nombreEquipo').value = '';
    document.getElementById('entrenador').value = '';
    document.getElementById('estadio').value = '';
    if(verificarAtributosDelEquipo(nombre,entrenador,estadio)){
        let avatarEquipo = document.getElementById('avatarEquipo');
        var idAvatar = avatarEquipo.options[avatarEquipo.selectedIndex].value;

        let equipo = new Equipo(nombre, lastId, entrenador, estadio, idAvatar);
        equipos.push(equipo);
        lastId++;
    }else{
        mostrarAlerta("Los parámetros ingresados para crear el equipo son incorrectos!", () => mostrarCreadorDeEquipos());
    }
    
}

function verificarAtributosDelEquipo(nombre, entrenador, estadio){
    return nombre!="" && entrenador!="" && estadio!="";
}

function eliminarEquipo(equipoId) {
    equipos = equipos.filter(e => e.id != equipoId);
    mostrarEquipos(equipos);
}

function getEquipo(equipoId){
    return equipos.find(e => e.id == equipoId);
}

function ordenarEquiposConFuncion(f) {
    equipos.sort((a, b) => (f(a) > f(b) ? 1 : f(b) > f(a) ? -1 : 0))
}

function buscarEquipo(nombreEquipo) {
    let equipoBuscado = equipos.find(e => e.nombre == nombreEquipo)
    document.getElementById('equipos').innerHTML = ''
    if (equipoBuscado) {
        mostarEquipo(equipoBuscado)
    }
}

function getPlantillaDelEquipo(idEquipo) {
    let equipo = equipos.find(e => e.id == idEquipo)
    let plantilla = [];
    if (equipo) {
        plantilla = equipo.plantilla;
    }
    return plantilla;
}

// Jugadores

function crearJugador(equipoId) {   
    const accionesParaCrearJugador = (nombre, dni, posicion, camiseta, equipo) => {
        let jugador = equipo.agregarJugador(nombre, dni, posicion, camiseta);
        mostrarJugador(jugador, equipoId);
    }
    obtenerDatosDelJugadorVerificarlosYSiSonCorrectosProceder(equipoId, accionesParaCrearJugador, false);
}

function modificarJugador(equipoId, dniOriginal){
    const accionesParaModificarJugador = (nombre, dni, posicion, camiseta, equipo) => {
        console.log(dniOriginal);
        console.log(equipo.plantilla);
        equipo.plantilla = equipo.plantilla.filter(j => j.dni != dniOriginal);
        console.log(equipo.plantilla);
        equipo.agregarJugador(nombre, dni, posicion, camiseta);
        mostrarPlantilla(equipoId);
    }
    obtenerDatosDelJugadorVerificarlosYSiSonCorrectosProceder(equipoId, accionesParaModificarJugador, true);
}

function eliminarJugador(dni, equipoId) {
    let equipoDelJugador = getEquipo(equipoId);
    equipoDelJugador.eliminarJugador(dni);
    mostrarPlantilla(equipoDelJugador.id);    
}

function verificarDNI(dni, equipo, esModificion){
    return (dni && !isNaN(dni) && dni<99999999 && (esModificion || !equipo.plantilla.some(j => j.dni == dni)));
}

function verificarAtributosDelJugador(nombre, dni, posicion, camiseta, equipo, esModificion){
    return (nombre!="") && verificarDNI(dni, equipo, esModificion)  && (posicion != "Posición") && (camiseta && !isNaN(camiseta) && camiseta<100);
}

function obtenerDatosDelJugadorVerificarlosYSiSonCorrectosProceder(equipoId, funcionSiVerificacionEsExitosa, esModificion) {
    let nombre = document.getElementById("nombreJugador").value;
    let dni = document.getElementById("dni").value;
    dni = dni ? parseInt(dni) : dni;
    let posiciones = document.getElementById("posicion");
    let posicion = posiciones.options[posiciones.selectedIndex].text;
    let camiseta = document.getElementById("camiseta").value;
    camiseta = camiseta ? parseInt(camiseta) : camiseta;
    let equipoDelJugador = getEquipo(equipoId);
    if(verificarAtributosDelJugador(nombre, dni, posicion, camiseta, equipoDelJugador, esModificion)){
        funcionSiVerificacionEsExitosa(nombre, dni, posicion, camiseta, equipoDelJugador);
    } else{
        mostrarAlerta("Los atributos del jugador son incorrectos", () => mostrarPlantilla(equipoId));
    }
}

//Inicialización

function init() {
    Object.cast = function cast(rawObj, constructor){
        var obj = new constructor();
        for(var i in rawObj)
            obj[i] = rawObj[i];
        return obj;
    }

    window.onload = () => {

        equipos = JSON.parse(localStorage.getItem('equipos'));
        if (equipos) {
            equipos = equipos.map( e => {
                        e.plantilla = e.plantilla.map(j => Object.cast(j, Jugador));
                        let equipo = Object.cast(e, Equipo);
                        return equipo;
                    })
        } else{
            equipos = [];    
        }

        
        lastId = localStorage.getItem('lastId');
        if (!lastId) {
            lastId = 0;
        }

        mostrarCreadorDeEquipos();
        document
            .getElementById('creadorDeEquipos')
            .addEventListener('click', () => mostrarCreadorDeEquipos());
        document
            .getElementById('misEquipos')
            .addEventListener('click', () => mostrarEquipos(equipos));
    }

    window.onbeforeunload = e => {
        e.preventDefault();
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('lastId', lastId)
        return undefined;
    }
}

init();