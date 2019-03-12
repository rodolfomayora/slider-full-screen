/**
 * @fileoverview gestion de slideshow de imagenes
 * @author rodolfo mayora
 */
let // referencias DOM
		img = document.querySelectorAll( '.img' ),
		imgInterval = 4000;

/**
 * @function
 * @name setSlideImg
 * @description cambia las clases de la imagenes del carrusel
 */
function setSlideImg() {
	for ( let element of img ) {
		let elementClass = element.classList;
		if ( elementClass.contains( 'img--center' ) ) {
			elementClass.toggle( 'img--center' );
			elementClass.add( 'img--left' );
			continue;
		} 

		if ( elementClass.contains( 'img--left' ) ) {
			elementClass.toggle( 'img--left' );
			elementClass.add( 'img--right' );
			continue;
		} 

		if ( elementClass.contains( 'img--right' ) ) {
			elementClass.toggle( 'img--right' );
			elementClass.add( 'img--center' );
			continue;
		}
	}
}
window.setInterval( setSlideImg, imgInterval );