function getRandomTeam(){

    let randomTeamsIds = [
        98, 99, 100, 102, 103, 104, 107, 108, 109, 110, 113, 115, 445, 450, 454, 455, 471, 488, 584, 586,
        77, 78, 79, 80, 81, 82, 83, 86, 87, 88, 89, 90, 92, 94, 95, 263, 264, 285, 558, 57, 58, 61, 62, 64,
        65, 66, 67, 68, 73, 76, 328, 338, 340, 341, 346, 354, 397, 402, 563
    ];

    let avatarIds = Array.from({length: 10}, (_, i) => i + 1)
    let teamId = randomTeamsIds[Math.floor(Math.random() * randomTeamsIds.length)];
    let avatarId = avatarIds[Math.floor(Math.random() * avatarIds.length)];

    $.ajax( {headers: { 'X-Auth-Token': 'c725738adaf74702bfa4eb1ba8c2cbb8' },
         url: `http://api.football-data.org/v2/teams/${teamId}`,
         dataType: 'json', 
         type: 'GET'}).done(function(response) {
            let nombre = response.shortName;
            let estadio = response.venue;
            let entrenador = response.squad[0].name;
            
            let equipo = new Equipo(nombre, lastId, entrenador, estadio, avatarId);
            equipos.push(equipo);
            lastId++;
        $('#randomModal-body').html(`Se creo el equipo ${equipo.nombre} con el id ${equipo.id}`);
        var myModal = new bootstrap.Modal(document.getElementById('randomModal'), {focus: true})
        myModal.show()
    });

}

