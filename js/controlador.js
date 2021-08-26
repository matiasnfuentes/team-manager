let equipos = []
let lastId = 0;
let partidos = [];
let lastPartidoID = 0;
// Equipos

function crearEquipo() {
    
    let nombre = $("#nombreEquipo").val();
    let entrenador = $("#entrenador").val();
    let estadio = $("#estadio").val();
    $("#nombreEquipo").val('');
    $("#entrenador").val('');
    $("#estadio").val('');
    if(verificarAtributosDelEquipo(nombre,entrenador,estadio)){
        var idAvatar = $("#avatarEquipo").children("option:selected").val();
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
    let equipoBuscado = equipos.find(e => e.nombre == nombreEquipo);
    $("#equipos").html('');
    if (equipoBuscado) {
	mostrarEquipo(equipoBuscado);
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
        equipo.plantilla = equipo.plantilla.filter(j => j.dni != dniOriginal);
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
    let nombre = $("#nombreJugador").val();
    let dni = $("#dni").val();
    dni = dni ? parseInt(dni) : dni; 
    let posicion = $( "#posicion option:selected" ).text();
    let camiseta = $("#camiseta").val();
    camiseta = camiseta ? parseInt(camiseta) : camiseta;
    let equipoDelJugador = getEquipo(equipoId);
    if(verificarAtributosDelJugador(nombre, dni, posicion, camiseta, equipoDelJugador, esModificion)){
        funcionSiVerificacionEsExitosa(nombre, dni, posicion, camiseta, equipoDelJugador);
    } else{
        mostrarAlerta("Los atributos del jugador son incorrectos", () => mostrarPlantilla(equipoId));
    }
}

// Partidos

function registrarPartido(){
    let equipoLocal = $("#local option:selected" ).val();
    let equipoVisitante = $("#visitante option:selected").val();
    let golesLocal = parseInt($("#localGoles").val());
    let golesVisitante = parseInt($("#visitanteGoles").val());
    if(equipoLocal!='-1' && equipoVisitante!='-1'){
        let partido = new Partido(lastPartidoID, equipoLocal, equipoVisitante , golesLocal, golesVisitante);
        lastPartidoID++;
        partidos.push(partido);
        mostrarPartido(partido);
    } else{
        mostrarAlerta("Debe seleccionar los equipos para registrar un partido", () => mostrarVistaPartidos());    
    }
}

function eliminarPartido(partidoId){
    partidos = partidos.filter(p => p.id != partidoId);
    $('#partidosTabla').html('');
    partidos.forEach(p => mostrarPartido(p));
}

function modificarPartido(partido){
    $(`#registrarPartido`).unbind();
    let equipoLocal = $("#local option:selected" ).val();
    let equipoVisitante = $("#visitante option:selected").val();
    console.log(equipoLocal);
    console.log(equipoVisitante);
    let golesLocal = parseInt($("#localGoles").val());
    let golesVisitante = parseInt($("#visitanteGoles").val());
    if(equipoLocal!='-1' && equipoVisitante!='-1'){
        partido.equipoLocalId = equipoLocal; 
        partido.equipoVisitanteId = equipoVisitante;
        partido.golesLocal = golesLocal;
        partido.golesVisitante = golesVisitante;
        mostrarVistaPartidos();
    } else{
        mostrarAlerta("Debe seleccionar los equipos para modificar un partido", () => mostrarVistaPartidos());    
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

        partidos = JSON.parse(localStorage.getItem('partidos'));
        if (!partidos) {
            partidos = [];    
        }
        
        lastId = localStorage.getItem('lastId');
        if (!lastId) {
            lastId = 0;
        }

        lastPartidoID = localStorage.getItem('lastPartidoID');
        if (!lastPartidoID) {
            lastPartidoID = 0;
        }

        mostrarCreadorDeEquipos();
        $("#creadorDeEquipos").click( () => mostrarCreadorDeEquipos() );
        $("#misEquipos").click(() => mostrarEquipos(equipos) );
        $("#partidos").click( () => mostrarVistaPartidos() );
    }

    window.onbeforeunload = e => {
        e.preventDefault();
        localStorage.setItem('equipos', JSON.stringify(equipos));
        localStorage.setItem('lastId', lastId);
        localStorage.setItem('partidos', JSON.stringify(partidos));
        localStorage.setItem('lastPartidoID', lastPartidoID);
        return undefined;
    }
}

init();