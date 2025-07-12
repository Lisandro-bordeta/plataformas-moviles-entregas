var listaPersonasEjemplo = [
    {
        "apellido": "Perez",
        "nombre": "Juan",
        "edad": 20,
        "documento": 12345
    },
    {
        "apellido": "Lopez",
        "nombre": "Luis",
        "edad": 20,
        "documento": 23456
    },
    {
        "apellido": "Zapata",
        "nombre": "Pablo",
        "edad": 10,
        "documento": 34567
    },
    {
        "apellido": "Acuña",
        "nombre": "Ana",
        "edad": 30,
        "documento": 45678
    },
];

/**
 * 01 - ordenarPorApellido
 */
function ordenarPorApellido(listaDePersonas) {
    return listaDePersonas.slice().sort((a, b) => a.apellido.localeCompare(b.apellido));
}
console.log("ordenarPorApellido()", ordenarPorApellido(listaPersonasEjemplo));

/**
 * 02 - soloNombres
 */
function soloNombres(listaDePersonas) {
    return listaDePersonas.map(p => p.nombre);
}
console.log("soloNombres()", soloNombres(listaPersonasEjemplo));

/**
 * 03 - promedioEdades
 */
function promedioEdades(listaDePersonas) {
    if (listaDePersonas.length === 0) return 0;
    const total = listaDePersonas.reduce((sum, p) => sum + p.edad, 0);
    return total / listaDePersonas.length;
}
console.log("promedioEdades()", promedioEdades(listaPersonasEjemplo));

/**
 * 04 - cumplirAños
 */
function cumplirAños(listaDePersonas) {
    return listaDePersonas.map(p => ({ ...p, edad: p.edad + 1 }));
}
console.log("cumplirAños()", cumplirAños(listaPersonasEjemplo));

/**
 * 05 - soloMayoresDeEdad
 */
function soloMayoresDeEdad(listaDePersonas) {
    return listaDePersonas.filter(p => p.edad > 18);
}
console.log("soloMayoresDeEdad()", soloMayoresDeEdad(listaPersonasEjemplo));

/**
 * 06 - laPersonaMayor
 */
function laPersonaMayor(listaDePersonas) {
    return listaDePersonas.reduce((mayor, actual) =>
        actual.edad > mayor.edad ? actual : mayor
    );
}
console.log("laPersonaMayor()", laPersonaMayor(listaPersonasEjemplo));

/**
 * 07 - agregarHeladoFavorito
 */
function agregarHeladoFavorito(listaDePersonas, listaDeHelados) {
    return listaDePersonas.map((persona, i) => ({
        ...persona,
        heladoFavorito: listaDeHelados[i] || "vainilla"
    }));
}
console.log("agregarHeladoFavorito()", agregarHeladoFavorito(listaPersonasEjemplo, ["chocolate", "limon", "frutilla"]));
