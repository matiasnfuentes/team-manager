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


