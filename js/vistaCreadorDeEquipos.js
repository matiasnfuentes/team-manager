function mostrarCreadorDeEquipos() {
    $('#body').html(`<form id="formulario" class="col col-lg-8 p-e-2 p-s-2">
                        <div class="mb-3">
                          <label for="nombreEquipo" class="form-label"
                            >Nombre del equipo:
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="nombreEquipo"
                            name="nombreEquipo"
                            aria-describedby="Nombre del equipo"
                          />
                        </div>
    
                        <div class="mb-3">
                          <label for="entrenador" class="form-label"
                            >Entrenador:</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="entrenador"
                            name="entrenador"
                            aria-describedby="Entrenador del equipo"
                          />
                        </div>
  
                        <div class="mb-3">
                          <label for="estadio" class="form-label"
                            >Estadio:</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="estadio"
                            name="estadio"
                            aria-describedby="estadio del equipo"
                          />
                        </div>
    
                        <div class="mb-3">
                          <label for="avatarEquipo" class="form-label"
                            >Seleccione el avatar de su equipo:
                          </label>
                          <select
                            id="avatarEquipo"
                            name="avatarEquipo"
                            class="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Seleccione el avatar</option>
                            <option value="1">Amarillo</option>
                            <option value="2">Amarillo 2</option>
                            <option value="3">Azul</option>
                            <option value="4">Azul Oscuro</option>
                            <option value="5">Blanco</option>
                            <option value="6">Blanco y celeste</option>
                            <option value="7">Naranja</option>
                            <option value="8">Rojo</option>
                            <option value="9">Rojo 2</option>
                            <option value="10">Rojo y Negro</option>
                          </select>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-12 col-sm-6 align-self-center">
                            <button
                            type="button"
                            class="btn btn-primary w-100"
                            id="crearEquipo"
                            name="crearEquipo"
                            >
                            Crear!
                            </button>  
                          </div>
                          <div class="col-12 col-sm-6 align-self-center mt-2 mt-sm-0">
                            <button
                            type="button"
                            class="btn btn-primary w-100"
                            id="randomTeam"
                            name="randomTeam"
                            >
                            Obtener equipo aleatorio
                            </button>  
                          </div>
                            
                        </div>
                    </form>
                    <div class="modal fade" id="randomModal" tabindex="-1" aria-labelledby="randomModalLabel" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title" id="randomModalLabel">Nuevo equipo generado!</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                          <div id="randomModal-body" class="modal-body">
                              
                          </div>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                      </div>
                  </div>`);
    $("#crearEquipo").click(() => crearEquipo());
    $("#randomTeam").click(() => getRandomTeam());
}