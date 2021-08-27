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
                            <div class="card w-100  ">
                              <div class="card-header equipo__titulo">
                                <h5 class="card-title">${equipo.nombre}</h5>
                                <button id="close-${equipo.id}" type="button" class="btn-close"></button>
                              </div>
                              <div class="card-body">
                                <img src="${avatar}" class="card-img-top" alt="...">  
                              </div>
                              <ul class="list-group list-group-flush">
                                <li class="list-group-item text-truncate">Entrenador: ${equipo.entrenador}</li>
                                <li class="list-group-item text-truncate">Estadio: ${equipo.estadio}</li>
                                <li class="list-group-item">ID: ${equipo.id}</li>
                                <li class="list-group-item equipo__editar">
                                  <button id="plantilla-${equipo.id}" type="button" class="btn btn-primary w-100">Plantilla</button>
                                </li>
                                <li class="list-group-item equipo__editar">
                                  <button id="partidos-${equipo.id}" type="button" class="btn btn-primary w-100">Partidos</button>
                                </li>
                              </ul>
                            </div>
                          </div>`);
                          
      $(document).click((e) => {
        if(e.target && e.target.id == `close-${equipo.id}`){
          eliminarEquipo(equipo.id);
        } else if (e.target && e.target.id == `plantilla-${equipo.id}`){
          mostrarPlantilla(equipo.id);
        } else if (e.target && e.target.id == `partidos-${equipo.id}`){
          mostrarVistaPartidos(equipo.id);
        }
      }); 
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
                            <div class="col-12 col-sm-5 mb-3">
                              <button id="buscar" class="btn btn-primary w-100" type="button">Buscar</button>
                            </div> 
                          </div>
                          
                          <div class="row justify-content-center">
                            <div class="col-12 col-sm-5 mb-3">
                              <button id="mostrarTodos" class="btn btn-primary w-100" type="button">Mostrar todos</button>
                            </div> 
                          </div> 
                       </form>
                    </div>
                    
                    <div id ="equipos" class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 col-12 col-lg-8"></div>`);
  
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