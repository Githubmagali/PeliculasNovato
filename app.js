let pagina = 1;

const cargarPeliculas = async() =>{
    try{
   const respuesta = await fetch (`https://api.themoviedb.org/3/movie/popular?api_key=83243bb30b64a34797e84b2dded59fac&language=es-MX&page=${pagina}`);

if(respuesta.status === 200){ //Para comprobar que el código este bien hacemos un if que me va a devolver el nro del error, ejemplo error 404; el titulo de la pelicula esta mal
const datos= await respuesta.json(); //json carga los datos del servidor y como es asincrono usamos await
 
let peliculas = ''; // va ir almacenando cada elemento(pelicula) modificado del html
datos.results.forEach(pelicula=>{
    //peliculas += o peliculas = peliculas ``;
    peliculas += ` 
    <div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
                    `; //
 });
 document.getElementById('contenedor').innerHTML = peliculas; //Accedo a las etiquetas de html para modificarlas
} else if(respuesta.status === 401){ //si quiero que me marque error en la llave
    console.log('La llave es incorrecta')
} else if(respuesta.status === 404){
    console.log('Error 404. La pelicula que buscas no existe ')
} else{
    console.log('Hay un error en el sitio')
}
    }
 catch(error) {
    console.log(error);
}
}
cargarPeliculas();


const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});
