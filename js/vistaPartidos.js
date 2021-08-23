function mostrarCreadorDePartidos(){
    $("#body").html(`
    <div id="partidosScreen" class="col-12 col-lg-8">
      <form>
        <div class="row mt-2">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <select class="form-select" aria-label="local" id="local" name="local">
                    <option selected>Local</option>
                </select>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 mt-2 mt-sm-0">
                <select class="form-select" aria-label="visitante" id="visitante" name="visitante">
                    <option selected>Visitante</option>
                </select>
            </div>
        </div>

        <div class="row mt-2 row-cols-12">
            <div class="col-3 col-sm-1">
                <button type="button" class="btn btn-primary rounded-pill w-100" disabled="disabled">-</button>
            </div>
            <div class="col-6 col-sm-4">
                <input type="text" class="form-control text-center" value="0" min="0" max="30">
            </div>
            <div class="col-3 col-sm-1">
                <button type="button" class="btn btn-primary rounded-pill w-100">+</button>
            </div>
            <div class="col-3 col-sm-1 mt-2 mt-sm-0">
                <button type="button" class="btn btn-primary rounded-pill w-100" disabled="disabled">-</button>
            </div>
            <div class="col-6 col-sm-4 mt-2 mt-sm-0">
                <input type="text" class="form-control text-center" value="0" min="0" max="30">
            </div>
            <div class="col-3 col-sm-1 mt-2 mt-sm-0">
                <button type="button" class="btn btn-primary rounded-pill w-100">+</button>
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
    equipos.forEach(e => {
        $("#local").append(`<option value="${e.id}">${e.nombre}</option>`)    
    });
    $("#local").change()
}
 /* 
function mostrarPlantilla(equipoId){
    mostrarCreadorDeJugadores();
    $("#body").append(`  
      <div class="row">
          <div class="col-lg-7 mx-auto">
              <div class="card border-0 shadow">
                  <div class="card-body p-0 p-sm-5">
                      <div class="table-responsive">
                          <table class="table m-0">
                              <thead>
                                  <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Nombre</th>
                                      <th scope="col">DNI</th>
                                      <th scope="col">Posición</th>
                                      <th scope="col"></th>
                                  </tr>
                              </thead>
                              <tbody id="plantilla">
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>`);
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
    $("#plantilla").append(`
        <tr>
            <th scope="row">${jugador.camiseta}</th>
            <td>${jugador.nombre}</td>
            <td>${jugador.dni}</td>
            <td>${jugador.posicion}</td>
            <td>
                <!-- Call to action buttons -->
                <ul class="list-inline m-0 jugador__botones">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                            <i id="modify-${jugador.dni}" class="bi bi-pencil-square"></i>
                        </button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete">
                            <i id="delete-${jugador.dni}" class="bi bi-x-square"></i>
                        </button>
                    </li>
                </ul>
            </td>
        </tr>`);
  
    // Me aprovecho de la propagación de eventos del dom, para setear un evento
    // a un componente html que se crea dinámicamente.
    $(document).click( (e) => {
      if(e.target && e.target.id== `delete-${jugador.dni}`){
        eliminarJugador(jugador.dni, equipoId);
      } else if (e.target && e.target.id== `modify-${jugador.dni}`){
        mostrarModificadorDeJugadores(jugador, equipoId);
      }
   });
}*/