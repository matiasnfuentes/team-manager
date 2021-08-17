function mostrarModificadorDeJugadores(jugador, equipoId){
    mostrarCreadorDeJugadores();
    document.getElementById("nombreJugador").value = jugador.nombre;
    document.getElementById("dni").value = jugador.dni;
    document.getElementById("camiseta").value = jugador.camiseta;
  
    let posicionSelect = document.getElementById("posicion");
    posicionSelect.options[posicionSelect.selectedIndex].innerHTML = jugador.posicion;
  
    let editarButton = document.getElementById("crearJugador");
    editarButton.value = "EDITAR";
    editarButton.onclick = () => modificarJugador(equipoId, jugador.dni);
  }