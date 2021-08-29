function mostrarEquipo(equipo) {

    let avatar;
    switch (parseInt(equipo.idAvatar)) {
      case 1:
        avatar = "./img/equipoAmarillo.png";
        break;
      case 2:
        avatar = "./img/equipoAmarillo2.png";
        break;
      case 3:
        avatar = "./img/equipoAzul.png";
        break;
      case 4:
        avatar = "./img/equipoAzulOscuro.png";
        break;
      case 5:
        avatar = "./img/equipoBlanco.png";
        break;
      case 6:
        avatar = "./img/equipoBlancoYCeleste.png";
        break;
      case 7:
        avatar = "./img/equipoNaranja.png";
        break;
      case 8:
        avatar = "./img/equipoRojo.png";
        break;
      case 9:
        avatar = "./img/equipoRojo2.png";
        break;
      default:
        avatar = "./img/equipoRojoYNegro.png";
        break;
    }
    $("#equipos").append(`<div class="col">
                            <div class="card border-2 rounded-3">
                              <div class="card-header equipo__titulo">
                                <h5 class="card-title col-8 mb-0 align-self-center text-start">${equipo.nombre}</h5>
                                <button id="modify-${equipo.id}" type="button" class="col-2 btn btn-light p-1 me-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0d6efd" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                  </svg>
                                </button>
                                <button id="close-${equipo.id}" type="button" class="col-2 btn btn-light p-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0d6efd" class="bi bi-x-square" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                                  </svg>
                                </button>
                                
                              </div>
                              <div class="card-body d-flex justify-content-center">
                                <img src="${avatar}" class="card-img-top equipo__imagen" height="180" max-wi alt="imagen del equipo">  
                              </div>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item text-truncate"><strong>Entrenador:</strong> ${equipo.entrenador}</li>
                                <li class="list-group-item text-truncate"><strong>Estadio:</strong> ${equipo.estadio}</li>
                                <li class="list-group-item"><strong>ID:</strong> ${equipo.id}</li>
                                <li class="list-group-item equipo__editar">
                                  <button id="plantilla-${equipo.id}" type="button" class="btn btn-primary w-100">Plantilla</button>
                                </li>
                                <li class="list-group-item equipo__editar">
                                  <button id="partidos-${equipo.id}" type="button" class="btn btn-primary w-100">Partidos</button>
                                </li>
                              </ul>
                            </div>
                          </div>`);
      $('#equipos').on('click',`#modify-${equipo.id}`, () => mostrarModificadorDeEquipos(equipo) );
      $('#equipos').on('click',`#close-${equipo.id}`, () => eliminarEquipo(equipo.id) );
      $('#equipos').on('click',`#plantilla-${equipo.id}`, () =>  mostrarPlantilla(equipo.id));
      $('#equipos').on('click',`#partidos-${equipo.id}`, () => mostrarVistaPartidos(equipo.id));
}

function mostrarEquipos(equipos) {
    $("#body").html(`<div class ="col-12 col-sm-8 col-lg-5 align-self-center">
                       <form>
                          <div class="row mb-3 justify-content-center">
                            <label for="ordenar" class="form-label w-75"
                              >Ordenar por:
                            </label>
                            <select
                              id="ordenar"
                              name="ordenar"
                              class="form-select w-75"
                              aria-label="Ordenar equipos"
                            >
                              <option selected>Opciones</option>
                              <option value="1">Nombre</option>
                              <option value="2">ID</option>
                            </select>
                          </div>
  
                          <div class="row justify-content-center">
                            <div class="col-12 col-sm-7 mb-3">
                              <input id="equipoABuscar" class="form-control me-2 " type="search" placeholder="Buscar equipo" aria-label="Search">
                            </div>
                            <div class="col-6 col-sm-5 mb-3">
                              <button id="buscar" class="btn btn-primary w-100" type="button">Buscar</button>
                            </div> 
                            <div class="col-6 col-sm-5 mb-3">
                              <button id="mostrarTodos" class="btn btn-primary w-100" type="button">Mostrar todos</button>
                            </div> 
                          </div>

                       </form>
                    </div>
                    
                    <div id ="equipos" class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 col-12 col-lg-8 align-self-center"></div>`);
  
    equipos.forEach((e) => mostrarEquipo(e));

    $("#ordenar").change( () => {
      $("#equipos").html("");
      let ordenarValue = $( "#ordenar option:selected" ).val();
  
      switch (ordenarValue) {
        case "1":
          ordenarEquiposConFuncion((e) => e.nombre);
          break;
        default:
          ordenarEquiposConFuncion((e) => e.id);
          break;
      }
      equipos.forEach((e) => mostrarEquipo(e));
    });
  
    $("#buscar").click( () => {
      let inputValue = $("#equipoABuscar").val();
      buscarEquipo(inputValue);
    });
  
    $("#mostrarTodos").click( () => {
      $("#equipos").html("");
      equipos.forEach((e) => mostrarEquipo(e));
    });
}