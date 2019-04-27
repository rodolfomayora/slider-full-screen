/**
 * @fileoverview gestion del SLIDER de imagenes
 * @author rodolfo mayora
 */

let  // referencias DOM
	images = document.querySelectorAll( '.img' ),
	//variables 
	imgTotal = images.length,
	imgLast = imgTotal - 1,
	imgIndexRight = 1,
	imgIndexCenter = 0,
	imgIndexLeft = imgLast,
	imgInterval = 6000,
	slider = null;


/**
 * @function
 * @name changeImg
 * @description cambia las clases de la imagenes del slider
 * @param {number} newLeft
 * @param {number} newCenter
 * @param {number} newRight
 */
function changeImg ( newLeft, newCenter, newRight ) {
	// la imagen que esta a la derecha sale del slider
	images[ imgIndexLeft ].classList.remove( 'img--left' );

	// la imagen del centro se ubica a la derecha
	images[ imgIndexCenter ].classList.add( 'img--left' );
	images[ imgIndexCenter ].classList.remove( 'img--center' );

	// la imange de de la derecha se ubica en el centro 
	images[ imgIndexRight ].classList.add( 'img--center' );
	images[ imgIndexRight ].classList.remove( 'img--right' );

	// una imagen entra al carrusel
	images[ newRight ].classList.add( 'img--right' );

	// se actualizan los indices
	imgIndexLeft = newLeft;
	imgIndexCenter = newCenter;
	imgIndexRight = newRight;
} 


/**
 * @function
 * @name changePosition
 * @description verifica el estado de los indices izquierdo y central
 */
function changePosition () {
	
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


/* EVENTOS
 ====================================================*/
window.addEventListener( 'load', function () {

	// detiene el slider cuando el usuario quita el foco de la pagina
	window.addEventListener( 'blur', function () {
		window.clearInterval( slider );
	} );

	// reanuda el slider cuando el usuario vuelve a la pagina
	window.addEventListener( 'focus', function () {
		slider = window.setInterval( changePosition, imgInterval );
	} );

	// inicia el slider solo cuando toda la pagina ha cargado
	slider = window.setInterval( changePosition, imgInterval );

} );