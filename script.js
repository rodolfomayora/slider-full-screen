/**
 * @fileoverview gestion de slideshow de imagenes
 * @author rodolfo mayora
 */

let // referencias DOM
		images = document.querySelectorAll( '.img' ),
		imgIndex = 0,
		imgTotal = images.length,
		imgInterval = 3000,
		slideItems = [];

/**
 * @function
 * @name changeImg
 * @description cambia las clases de la imagenes del carrusel
 */
function changeImg( number ) {
	images[ imgIndex ].classList.remove( 'img--center');
	images[ imgIndex ].classList.add( 'img--left');

	images[ number ].classList.remove( 'img--right');
	images[ number ].classList.add( 'img--center');

	imgIndex = number;
}

function left() {
	let left = document.querySelector( '.img--left' );
	left.classList.remove( 'img--left' );
	left.classList.add( 'img--right' );
}

function change() {
	let a;
	if ( imgIndex === imgTotal - 1 ) a = 0;
	else a = imgIndex + 1;
	left();
	changeImg( a );
}

let carrusel = window.setInterval( change, imgInterval );

// detener intervalo
// clearInterval(carrusel)