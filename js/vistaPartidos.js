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
        let maxVal = parseInt($(`#${localia}Goles`).attr('max'));

        if(currentVal < maxVal){
            $(`#${localia}Goles`).val(currentVal + 1);
        }

        let valorDespuesDeSuma = parseInt($(`#${localia}Goles`).val());

        if(valorDespuesDeSuma >= maxVal){
            $(`#${localia}Mas`).attr('disabled', true);
        }

        if($(`#${localia}Menos`).attr('disabled')){
            $(`#${localia}Menos`).attr('disabled', false);
        }
    });
    
    $(`#${localia}Menos`).click( () => {
        let currentVal = parseInt($(`#${localia}Goles`).val());
        let minVal = parseInt($(`#${localia}Goles`).attr('min'));

        if(currentVal > minVal){
            $(`#${localia}Goles`).val(currentVal - 1);
        }

        let valorDespuesDeResta = parseInt($(`#${localia}Goles`).val());

        if(valorDespuesDeResta <= minVal){
            $(`#${localia}Menos`).attr('disabled', true);
        }

        if($(`#${localia}Mas`).attr('disabled')){
            $(`#${localia}Mas`).attr('disabled', false);
        }
    }); 

}

function mostrarTablaDePartidos(equipoID){
    let encabezados = ["#","Local","Visitante","Resultado",""];
    crearTablaGenerica(encabezados,"#body");
    if (typeof equipoID != "undefined"){
        let partidosDelEquipo = partidos.filter( p => (p.equipoLocalId == equipoID) || (p.equipoVisitanteId == equipoID) );
        console.log(partidosDelEquipo);
        partidosDelEquipo.forEach( p => mostrarPartido(p));
    } else {
        partidos.forEach(p => mostrarPartido(p));
    }

}
 
function mostrarPartido(partido){
    let equipoLocal = equipos.find( e => e.id == partido.equipoLocalId).nombre;
    let equipoVisitante = equipos.find( e => e.id == partido.equipoVisitanteId).nombre;
    let resultado = partido.golesLocal + '-' + partido.golesVisitante;

    let columnas = [equipoLocal, equipoVisitante, resultado];
    let funcionModificar = () => mostrarModificadorDePartidos(partido);
    let funcionEliminar = () => eliminarPartido(partido.id)
    crearFilaGenérica("#table__contenido", partido.id , columnas, partido.id, funcionEliminar, funcionModificar);
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