/**
 * @fileoverview gestion del SLIDER de imagenes
 * @author rodolfo mayora
 */

let // referencias DOM
	images = document.querySelectorAll( '.img' ),
	//variables 
	imgTotal = images.length,
	imgLast = imgTotal - 1,
	imgIndexCenter = 0,
	imgIndexRight = 1,
	imgIndexLeft = imgLast,
	imgInterval = 7000,
	isPause = false;


/**
 * @function
 * @name changeImg
 * @description cambia las clases de la imagenes del slider
 * @param {number} newLeft
 * @param {number} newCenter
 * @param {number} newRight
 */
function changeImg ( newLeft, newCenter, newRight ) {
	images[ imgIndexLeft ].classList.remove( 'img--left' );

	// lo puse en este orden por la cascada de CSS
	images[ imgIndexCenter ].classList.add( 'img--left' );
	images[ imgIndexCenter ].classList.remove( 'img--center' );

	images[ imgIndexRight ].classList.add( 'img--center' );
	images[ imgIndexRight ].classList.remove( 'img--right' );

	images[ newRight ].classList.add( 'img--right' );


	imgIndexLeft = newLeft;
	imgIndexCenter = newCenter;
	imgIndexRight = newRight;
} 


/**
 * @function
 * @name change
 * @description verifica el estado de los indices izquierdo y central
 */
function change () {
	
	if ( !isPause ) {

		let left = 0,
				center = 0,
				rignt = 0;
				
		if ( imgIndexLeft === imgTotal - 1 ) left = 0;
		else left = imgIndexLeft + 1;

		if ( imgIndexCenter === imgTotal - 1 ) center = 0;
		else center = imgIndexCenter + 1;

		if ( imgIndexRight === imgTotal - 1 ) right = 0;
		else right = imgIndexRight + 1;

		changeImg( left, center, right );
	}

}


/**
 * @function
 * @name setStatus
 * @description cambia el estado si el usuario sale o vuelve a la ventana del site
 */
function setStatus () {
	isPause = !isPause;
}


window.addEventListener( 'load', function () {

	// detiene el carrusel cuando el usuario quita el foco de la pagina
	window.addEventListener( 'blur', setStatus );

	// reanuda el carrusel cuando el usuario vuelve a la pagina
	window.addEventListener( 'focus', setStatus );

	// inicia el carrusel solo cuando toda la pagina halla cargado
	let carrusel = window.setInterval( change, imgInterval );
} )


// detener intervalo
// clearInterval(carrusel)