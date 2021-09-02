function mostrarCreadorDeJugadores(){
    $("#body").html(`
    <div id="plantillaScreen" class="d-flex justify-content-center">
      <form action="#">
        <div class="row mt-2">
            <div class="col-md-12">
                <input type="text" class="form-control" id="nombreJugador" placeholder="Nombre del jugador" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <input type="text" class="form-control" id="dni" placeholder="DNI (solo números)" />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 mt-2 mt-sm-0"">
                <input type="text" class="form-control" id="camiseta" placeholder="Nº Camiseta" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-12 pad-adjust">
                <select class="form-select" aria-label="posicion" id="posicion">
                    <option selected >Posición</option>
                    <option value="1">Arquero</option>
                    <option value="2">Defensor</option>
                    <option value="3">Mediocampista</option>
                    <option value="4">Delantero</option>
                </select>
            </div>
        </div>
  
        <div class="row mt-2">
            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust mt-2 mt-sm-0">
                <input type="button" class="btn btn-primary w-100" id="crearJugador" value="AGREGAR" />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust mt-2 mt-sm-0">
                <input type="RESET" class="btn btn-primary btn-block w-100" value="RESET" />
            </div>
        </div>
      </form>
    </div>`);
}
  
function mostrarPlantilla(equipoId){
    mostrarCreadorDeJugadores();
    let encabezados = ["#","Nombre","DNI","Posición",""];
    crearTablaGenerica(encabezados, "#body");
    $("#crearJugador").click( () =>{
        crearJugador(equipoId);
        $("#nombreJugador").val("");
        $("#dni").val("");
        $("#camiseta").val("");
        $("#posicion option:eq(0)").prop('selected', true);
    });
    let plantilla = getPlantillaDelEquipo(equipoId);
    plantilla.forEach(jugador => mostrarJugador(jugador, equipoId));
}

function mostrarJugador(jugador, equipoId){
    
    let columnas = [jugador.nombre, jugador.dni, jugador.posicion];
    let funcionModificar = () => mostrarModificadorDeJugadores(jugador, equipoId);
    let funcionEliminar = () => eliminarJugador(jugador.dni, equipoId);
    crearFilaGenérica("#table__contenido", jugador.camiseta , columnas, jugador.dni, funcionEliminar, funcionModificar);

}