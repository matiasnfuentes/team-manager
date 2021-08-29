function getRandomTeam(){

    let randomTeamsIds = [
        98, 99, 100, 102, 103, 104, 107, 108, 109, 110, 113, 115, 445, 450, 454, 455, 471, 488, 584, 586,
        77, 78, 79, 80, 81, 82, 83, 86, 87, 88, 89, 90, 92, 94, 95, 263, 264, 285, 558, 57, 58, 61, 62, 64,
        65, 66, 67, 68, 73, 76, 328, 338, 340, 341, 346, 354, 397, 402, 563 , 512, 516, 518, 521, 522, 523,
        524, 525, 526, 527, 529, 531, 532, 541, 543, 545, 546, 547, 548, 576, 1765, 1766, 1767, 1769, 1776,
        1783, 2058, 2061, 2071, 2078, 2081, 4261, 4267, 4268, 4409, 4438, 4439, 4441, 4466, 4467, 4520, 4528,
        5167, 5170, 5171, 5191, 5347, 5675, 6667, 6684, 6685, 6803, 6989, 6993, 7055, 7118, 7865, 7868, 7930,
        8778, 9372, 9373, 9374, 9375, 9377, 9379, 666, 671, 672, 673, 674, 675, 676, 677, 678, 679, 682, 683,
        684, 718, 1909, 1915, 1920, 6806
    ];

    let avatarIds = Array.from({length: 10}, (_, i) => i + 1)
    let teamId = randomTeamsIds[Math.floor(Math.random() * randomTeamsIds.length)];
    let avatarId = avatarIds[Math.floor(Math.random() * avatarIds.length)];

    $.ajax( {headers: { 'X-Auth-Token': 'c725738adaf74702bfa4eb1ba8c2cbb8' },
         url: `https://api.football-data.org/v2/teams/${teamId}`,
         dataType: 'json', 
         type: 'GET'}).done(function(response) {
            let nombre = response.shortName;
            let estadio = response.venue;
            let plantel = response.squad;
            let entrenador;
            if (plantel.length === 0){
                entrenador = `Couch ${teamId}`;
            } else{
                entrenador = plantel[0].name;
            }

            let equipo = new Equipo(nombre, lastId, entrenador, estadio, avatarId);
            equipos.push(equipo);
            lastId++;
            mostrarModalDeEquipos(equipo);
            plantel.forEach( (j, index) => {
                equipo.agregarJugador(j.name, j.id, parsePosicion(j.position), index);
            })
    });

}

function parsePosicion(posicionJSON){
    let posicionModelo;
    switch (posicionJSON) {
      case "Attacker":
        posicionModelo = "Delantero";
        break;
      case "Midfielder":
        posicionModelo = "Mediocampista";
        break;
      case "Defender":
        posicionModelo = "Defensor";
        break;
      default:
        posicionModelo = "Arquero";
        break;
    }
    return posicionModelo;
}