function mostrarCreadorDeJugadores(){
    document.getElementById(
      "body"
    ).innerHTML =`
    <div id="plantillaScreen" class="d-flex justify-content-center">
      <form action="#" class="credit-card-div">
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
    </div>`;
}
  
function mostrarPlantilla(equipoId){
    mostrarCreadorDeJugadores();
    document.getElementById(
      "body"
    ).innerHTML +=`  
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
      </div>`;
    document.getElementById("crearJugador").onclick = () => crearJugador(equipoId);
    let plantilla = getPlantillaDelEquipo(equipoId);
    plantilla.forEach(jugador => mostrarJugador(jugador, equipoId));
}

function mostrarJugador(jugador, equipoId){
    let plantillaHtml = document.getElementById("plantilla");
    plantillaHtml.innerHTML+=`
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
        </tr>`;
  
    // Me aprovecho de la propagación de eventos del dom, para setear un evento
    // a un componente html que se crea dinámicamente.
    document.addEventListener('click',function(e){
      if(e.target && e.target.id== `delete-${jugador.dni}`){
        eliminarJugador(jugador.dni, equipoId);
      } else if (e.target && e.target.id== `modify-${jugador.dni}`){
        mostrarModificadorDeJugadores(jugador, equipoId);
      }
   });
}