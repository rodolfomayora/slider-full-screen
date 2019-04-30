/**
 * @fileoverview gestion del SLIDER de imagenes, la logica consiste en que se 
 *  tendra tres items del slideshow activos mientras que el resto de items
 *  se mantienen inactivos par no consumir resursos. este modulo cambia las
 *  clases de los elementos activos para que se desplazen 
 *
 * @author rodolfo mayora
 */

let  // referencias DOM
	slideshow = document.querySelector( '.slider-container' ),
	item = document.querySelectorAll( '.slider-item' ),
	//variables del slideshow
	itemTotal = item.length,
	lastItem = itemTotal - 1,
	itemIndexLeft = lastItem,
	itemIndexCenter = 0,
	itemIndexRight = 1,
	itemInterval = 5000,
	autoSlide = null,
	//variables del slide touch para telefonos
	touchStartX = 0,
	touchEndX = 0;


/**
 * @function
 * @name stopAutoSlide
 * @description detiene el slide automatico
 */
function stopAutoSlide () {
	clearInterval( autoSlide );
	autoSlide = null;
}


/**
 * @function
 * @name changeImg
 * @description cambia las clases de los elementos del slideshow,
 *  
 * @param { number } direction - recibe dos parametros: 1 y 0,
 *  en caso de recibir 1: el item que este a la izquierda sale del slideshow, 
 *  los items que estan en el centro y a la derecha se desplazan hacia la 
 *  izquierda, y finalmente añade un nuevo item a la derecha
 *
 *  en caso de recibir 0: el item que este a la derecha sale del slideshow, 
 *  los items que estan en el centro y a la izquieda se desplazan hacia la 
 *  derecha, y finalmente añade un nuevo item a la izquierda
 *
 * @param { number } newItem - nuevo elemento activo del slide 
 */
function changeClassItem ( direction, newItem ) {
	
	if ( direction ) {

		// la imagen que esta a la izquierda sale del slider
		item[ itemIndexLeft ].classList.remove( 'slider-item--left' );

		// la imagen del centro se ubica a la izquierda
		item[ itemIndexCenter ].classList.add( 'slider-item--left' );
		item[ itemIndexCenter ].classList.remove( 'slider-item--center' );
		item[ itemIndexCenter ].style.zIndex = 15;


		// la imange de de la derecha se ubica en el centro 
		item[ itemIndexRight ].classList.add( 'slider-item--center' );
		item[ itemIndexRight ].classList.remove( 'slider-item--right' );
		item[ itemIndexRight].style.zIndex = 15;

		// una imagen entra al slider
		item[ newItem ].classList.add( 'slider-item--right' );
		item[ newItem ].style.zIndex = 10;

	} else {

		// la imagen que esta a la daracha sale del slider
		item[ itemIndexRight ].classList.remove( 'slider-item--right' );

		// la imagen del centro se ubica a la derecha
		item[ itemIndexCenter ].classList.add( 'slider-item--right' );
		item[ itemIndexCenter ].classList.remove( 'slider-item--center' );
		item[ itemIndexCenter ].style.zIndex = 15;


		// la imange de de la izquierda se ubica en el centro 
		item[ itemIndexLeft ].classList.add( 'slider-item--center' );
		item[ itemIndexLeft ].classList.remove( 'slider-item--left' );
		item[ itemIndexLeft ].style.zIndex = 15;

		// una imagen entra al slider
		item[ newItem ].classList.add( 'slider-item--left' );
		item[ newItem ].style.zIndex = 10;

	}
} 


/**
 * @function
 * @name changeIndex
 * @description cambia los indices de los elementos del slideshow
 * @param { number } change - se le puede pasar 1 para que
 *  incremente los indices, o 0 para decrecer los indicies
 */
function changeIndex ( change ) {

	let left = 0,
			center = 0,
			rignt = 0;
	
	if ( change ) {

		itemIndexLeft === itemTotal - 1
			? left = 0
			: left = itemIndexLeft + 1;

		itemIndexCenter === itemTotal - 1 
			? center = 0
			: center = itemIndexCenter + 1;

		itemIndexRight === itemTotal - 1 
			? right = 0
			: right = itemIndexRight + 1;

		changeClassItem( 1, right );

	} else {

		itemIndexLeft === 0
			? left = itemTotal - 1
			: left = itemIndexLeft - 1;

		itemIndexCenter === 0
			? center = itemTotal - 1
			: center = itemIndexCenter - 1;

		itemIndexRight === 0
			? right = itemTotal - 1
			: right = itemIndexRight - 1;

		changeClassItem( 0, left );
	
	}

	// se actualizan los indices
	itemIndexLeft = left;
	itemIndexCenter = center;
	itemIndexRight = right;
}


/**
 * @function
 * @name changeItem
 * @description cambia el item si el usuario relizo un gesto
 * @param { number } direction - pasar 1 para mover el item a la izquierda,
 *  y 0 para mover el item a la derecha
 */
function changeItem ( direction ) {
	stopAutoSlide();
	changeIndex( direction );
}


/**
 * @function
 * @name slideTouch
 * @description evalua la direccion del gesto del usuario, 
 *  y determan que un gesto intecnional por parte del usuario
 *  debe superar a los 100px
 */
function slideTouch () {
	if ( touchEndX < touchStartX - 100 ) changeItem( 1 );
	if ( touchEndX > touchStartX + 100 ) changeItem( 0 );
}



/* EVENTOS
 ====================================================*/
window.addEventListener( 'load', function () {

	// detiene el slider cuando el usuario quita el foco de la pagina
	window.addEventListener( 'blur', function () {
		stopAutoSlide()
	} );

	// reanuda el slider cuando el usuario vuelve a la pagina
	window.addEventListener( 'focus', function () {
		autoSlide = window.setInterval( function () {
			changeIndex( 1 )
		}, itemInterval );
	} );

	// eventos touch
	slideshow.addEventListener( 'touchstart', function ( event ) {
		touchStartX = event.changedTouches[ 0 ].screenX;
	} );

	slideshow.addEventListener( 'touchend', function ( event ) {
		touchEndX = event.changedTouches[ 0 ].screenX;
		slideTouch();
	} );

	// inicia el slider automatico
	autoSlide = window.setInterval( function () {
		changeIndex( 1 );
	}, itemInterval );

} );