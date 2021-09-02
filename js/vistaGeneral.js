function mostrarAlerta(mensaje ,redireccion){

  $("#body").html(`
  <div class="col-11 col-lg-8 d-flex flex-column">
    <div class="alert alert-danger p-1 text-center"" role="alert">
      ${mensaje}
    </div>
    <div class="col col-sm-6 col-md-4 align-self-center">
      <button type="button" class="btn btn-primary w-100" id="volver" name="volver">
        Volver
      </button> 
    </div>
  </div>
  `);
  $("#volver").click( () => redireccion() );

}

function crearTablaGenerica(encabezados, padre){
  $(padre).append(`  
      <div class="row mt-2 align-self-center">
          <div class="col-12 col-sm-8 mx-auto">
              <div class="card border-0 shadow">
                  <div class="card-body p-0 p-sm-3">
                      <div class="table-responsive">
                          <table class="table m-0">
                              <thead >
                                  <tr id="tabla__encabezados">
                                  </tr>
                              </thead>
                              <tbody id="table__contenido">
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>`);
  encabezados.forEach(encabezado => {
    $("#tabla__encabezados").append(`<th scope="col">${encabezado}</th>`);
  });
}

function crearFilaGenérica(padre, encabezadoFila, datosColumnas, identificadorBotones, funcionEliminar, funcionModificar){
  $(padre).append(`
  <tr>
      <td>
          <ul class="list-inline m-0 jugador__botones">
              <li class="list-inline-item">
                  <button class="btn btn-success btn-sm rounded-3" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                      <i id="modify-${identificadorBotones}" class="bi bi-pencil-square"></i>
                  </button>
              </li>
              <li class="list-inline-item">
                  <button class="btn btn-danger btn-sm rounded-3" type="button" data-toggle="tooltip" data-placement="top" title="Delete">
                      <i id="delete-${identificadorBotones}" class="bi bi-x-square"></i>
                  </button>
              </li>
          </ul>
      </td>
  </tr>`);
  datosColumnas.reverse();
  datosColumnas.forEach(dato => {
    $(`${padre} tr:last-child`).prepend(`<td>${dato}</td>`)
  })
  $(`${padre} tr:last-child`).prepend(`<th scope="row">${encabezadoFila}</th>`);
  $('#table__contenido').on('click',`#delete-${identificadorBotones}`, () => funcionEliminar() );
  $('#table__contenido').on('click',`#modify-${identificadorBotones}`, () => funcionModificar() );

}







