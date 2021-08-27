function mostrarVistaPartidos(equipoID){
    mostrarCreadorDePartidos();
    mostrarTablaDePartidos(equipoID);
}

function mostrarCreadorDePartidos(){
    $("#body").html(`
    <div id="partidosScreen" class="align-self-center col-12 col-lg-8">
      <form>
        <div class="row mt-2">
            <div class="col-md-6 col-sm-6 col-xs-6">
                <select class="form-select" aria-label="local" id="local" name="local">
                    <option value="-1" selected>Local</option>
                </select>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 mt-2 mt-sm-0">
                <select class="form-select" aria-label="visitante" id="visitante" name="visitante">
                    <option value="-1" selected>Visitante</option>
                </select>
            </div>
        </div>

        <div class="row mt-2 row-cols-12">
            <div class="col-3 col-sm-1">
                <button id ="localMenos" type="button" class="btn btn-primary rounded-pill w-100" disabled="disabled">-</button>
            </div>
            <div class="col-6 col-sm-4">
                <input id="localGoles" type="text" class="form-control text-center" value="0" min="0" max="30">
            </div>
            <div class="col-3 col-sm-1">
                <button id ="localMas" type="button" class="btn btn-primary rounded-pill w-100">+</button>
            </div>
            <div class="col-3 col-sm-1 mt-2 mt-sm-0">
                <button id ="visitanteMenos" type="button" class="btn btn-primary rounded-pill w-100" disabled="disabled">-</button>
            </div>
            <div class="col-6 col-sm-4 mt-2 mt-sm-0">
                <input id="visitanteGoles" type="text" class="form-control text-center" value="0" min="0" max="30">
            </div>
            <div class="col-3 col-sm-1 mt-2 mt-sm-0">
                <button id ="visitanteMas" type="button" class="btn btn-primary rounded-pill w-100">+</button>
            </div>
        </div>
  
        <div class="row mt-2">
            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust mt-2 mt-sm-0">
                <input type="button" class="btn btn-primary w-100" id="registrarPartido" value="Registrar" />
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 pad-adjust mt-2 mt-sm-0">
                <input type="RESET" class="btn btn-primary btn-block w-100" value="RESET" />
            </div>
        </div>
      </form>
    </div>`);
    setearCreadorDePartidos();
}

function setearCreadorDePartidos() {
    equipos.forEach(e => {
        $("#local").append(`<option value="${e.id}">${e.nombre}</option>`)    
    });

    $("#local").change( () => {
        let equipoSeleccionado = $("#local").val();
        $("#visitante").html(`<option value="-1" selected>Visitante</option>`);
        mostrarEquiposRestantes(equipoSeleccionado);
    });

    $("#registrarPartido").click( () =>{
        registrarPartido();
        $("#local option:eq(0)").prop('selected', true);
        $("#visitante").html(`<option value="-1" selected>Visitante</option>`); 
        $("#localGoles").val("0");
        $("#visitanteGoles").val("0");
        $("#localMenos").attr('disabled', true);
        $("#visitanteMenos").attr('disabled', true);
    });

    setearBotonesParaAñadirYRestarGoles('local');
    setearBotonesParaAñadirYRestarGoles('visitante');
    
}

function mostrarEquiposRestantes(equipoID){
    let equiposRestantes = equipos.filter(e => e.id != equipoID);
    equiposRestantes.forEach(e => {
        $("#visitante").append(`<option value="${e.id}">${e.nombre}</option>`);
    });
}

function setearBotonesParaAñadirYRestarGoles(localia) {

    $(`#${localia}Mas`).click( () => {
        let currentVal = parseInt($(`#${localia}Goles`).val());
        let maxVal = $(`#${localia}Goles`).attr('max');

        if(currentVal < maxVal){
            $(`#${localia}Goles`).val(currentVal + 1);
        }

        let valorDespuesDeSuma = $(`#${localia}Goles`).val();

        if(valorDespuesDeSuma >= maxVal){
            $(`#${localia}Mas`).attr('disabled', true);
        }

        if($(`#${localia}Menos`).attr('disabled')){
            $(`#${localia}Menos`).attr('disabled', false);
        }
    });
    
    $(`#${localia}Menos`).click( () => {
        let currentVal = parseInt($(`#${localia}Goles`).val());
        let minVal = $(`#${localia}Goles`).attr('min');

        if(currentVal > minVal){
            $(`#${localia}Goles`).val(currentVal - 1);
        }

        let valorDespuesDeResta = $(`#${localia}Goles`).val();

        if(valorDespuesDeResta <= minVal){
            $(`#${localia}Menos`).attr('disabled', true);
        }

        if($(`#${localia}Mas`).attr('disabled')){
            $(`#${localia}Mas`).attr('disabled', false);
        }
    }); 

}

function mostrarTablaDePartidos(equipoID){
    $("#body").append(`  
      <div class="row">
          <div class="col-12 col-sm-8 mx-auto">
              <div class="card border-0 shadow">
                  <div class="card-body p-0 p-sm-3">
                      <div class="table-responsive">
                          <table class="table m-0">
                              <thead>
                                  <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Local</th>
                                      <th scope="col">Visitante</th>
                                      <th scope="col">Resultado</th>
                                      <th scope="col"></th>
                                  </tr>
                              </thead>
                              <tbody id="partidosTabla"></tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>`);
    if (equipoID){
        partidos
            .filter( p => (p.equipoLocalId == equipoID) || (p.equipoVisitanteId == equipoID) )
            .forEach( p => mostrarPartido(p));
    } else {
        partidos.forEach(p => mostrarPartido(p));
    }

}
 
function mostrarPartido(partido){
    let equipoLocal = equipos.find( e => e.id == partido.equipoLocalId).nombre;
    let equipoVisitante = equipos.find( e => e.id == partido.equipoVisitanteId).nombre;
    $("#partidosTabla").append(`
        <tr>
            <th scope="row">${partido.id}</th>
            <td>${equipoLocal}</td>
            <td>${equipoVisitante}</td>
            <td>${partido.golesLocal} - ${partido.golesVisitante}</td>
            <td>
                <!-- Call to action buttons -->
                <ul class="list-inline m-0 jugador__botones">
                    <li class="list-inline-item">
                        <button class="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                            <i id="modify-${partido.id}" class="bi bi-pencil-square"></i>
                        </button>
                    </li>
                    <li class="list-inline-item">
                        <button class="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete">
                            <i id="delete-${partido.id}" class="bi bi-x-square"></i>
                        </button>
                    </li>
                </ul>
            </td>
        </tr>`);
  
    $(document).click( (e) => {
      if(e.target && e.target.id == `delete-${partido.id}`){
        eliminarPartido(partido.id);
      } else if (e.target && e.target.id== `modify-${partido.id}`){
        mostrarModificadorDePartidos(partido);
      }
   });
}

function mostrarModificadorDePartidos(partido){
    mostrarCreadorDePartidos();
    $('#localGoles').val(partido.golesLocal);
    $('#visitanteGoles').val(partido.golesVisitante);
    $(`#local option[value="-1"]`).prop('selected', false);
    $(`#visitante option[value="-1"]`).prop('selected', false);
    $(`#local option[value="${partido.equipoLocalId}"]`).prop('selected', true);

    let localias = ['local', 'visitante'];

    localias.forEach( l => {

        let defaultValue = $(`#${l}Goles`).val();
    
        if(defaultValue < $(`#${l}Goles`).attr('max')){
            $(`#${l}Mas`).attr('disabled', false);
        }

        if(defaultValue > $(`#${l}Goles`).attr('min')){
            $(`#${l}Menos`).attr('disabled', false);
        }

    })

    mostrarEquiposRestantes(partido.equipoLocalId);
    $(`#visitante option[value="${partido.equipoVisitanteId}"]`).prop('selected', true);
    $(`#registrarPartido`).val("Modificar");
    $(`#registrarPartido`).unbind();
    $(`#registrarPartido`).click( () => {
        modificarPartido(partido);
    });
}