function mostrarModificadorDeJugadores(jugador, equipoId){

    mostrarCreadorDeJugadores();
    $("#nombreJugador").val(jugador.nombre);
    $("#dni").val(jugador.dni);
    $("#camiseta").val(jugador.camiseta);
    $( "#posicion option:selected" ).text(jugador.posicion);
  
    $("#crearJugador").val("EDITAR");
    $("#crearJugador").click( () => modificarJugador(equipoId, jugador.dni) );

}