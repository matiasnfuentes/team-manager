class Jugador {
  constructor (nombre, dni, posicion, camiseta) {
    this.nombre = nombre
    this.dni = dni
    this.posicion = posicion
    this.camiseta = camiseta
  }
}

class Equipo {
  constructor(nombre, id, entrenador, estadio, idAvatar) {
    this.nombre = nombre
    this.id = id
    this.estadio = estadio
    this.entrenador = entrenador
    this.idAvatar = idAvatar
    this.plantilla = [];
  }

  agregarJugador (nombre, dni, posicion, camiseta) {
    let jugador = new Jugador(
      nombre,
      dni,
      posicion,
      camiseta
    )
    this.plantilla.push(jugador)
    return jugador;
  }

  eliminarJugador (dni) {
    this.plantilla = this.plantilla.filter(j => j.dni != dni)
  }
  
}
