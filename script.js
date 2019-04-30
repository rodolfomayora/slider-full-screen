/**
 * @fileoverview gestion del SLIDER de imagenes
 * @author rodolfo mayora
 */

let  // referencias DOM
	images = document.querySelectorAll( '.slider-item' ),
	//variables 
	imgTotal = images.length,
	imgLast = imgTotal - 1,
	imgIndexRight = 1,
	imgIndexCenter = 0,
	imgIndexLeft = imgLast,
	imgInterval = 7000,
	slider = null,
	//variables de touch slide para telefonos
	touchStartX = 0,
	touchEndX = 0,
	doc = document.getElementsByClassName( 'slider-container' );



/**
 * @function
 * @name changeImgLeft
 * @description cambiar la imagen a la izquierda
 */
function changeImgLeft () {
	//primero cancelo el cambio automatico
	clearInterval( slider );
	slider = null;
	//luego le doy al usuario la libertad de cambiar
	changePositionNext()
}


/**
 * @function
 * @name changeImgRight
 * @description cambiar la imagen a la derecha
 */
function changeImgRight () {
	//primero cancelo el cambio automatico
	clearInterval( slider );
	slider = null;
	//luego le doy al usuario la libertad de cambiar
	changePositionBack()
}


/**
 * @function
 * @name slideTouch
 * @description verifica la direccion del gesto del usuario
 */
function slideTouch () {

	if ( touchEndX < touchStartX ) changeImgLeft();
	if ( touchEndX > touchStartX ) changeImgRight()
}


/**
 * @function
 * @name changeImg
 * @description cambia las clases de los elementos del slideshow
 *  avancen hacia la izquierda
 * 
 * @param {number} newLeft
 * @param {number} newCenter
 * @param {number} newRight
 */
function changeImgNext ( newLeft, newCenter, newRight ) {
	
	// la imagen que esta a la izquierda sale del slider
	images[ imgIndexLeft ].classList.remove( 'slider-item--left' );

	// la imagen del centro se ubica a la izquierda
	images[ imgIndexCenter ].classList.add( 'slider-item--left' );
	images[ imgIndexCenter ].classList.remove( 'slider-item--center' );
	images[ imgIndexCenter ].style.zIndex = 15;


	// la imange de de la derecha se ubica en el centro 
	images[ imgIndexRight ].classList.add( 'slider-item--center' );
	images[ imgIndexRight ].classList.remove( 'slider-item--right' );
	images[ imgIndexRight].style.zIndex = 15;

	// una imagen entra al slider
	images[ newRight ].classList.add( 'slider-item--right' );
	images[ newRight ].style.zIndex = 10;

	// se actualizan los indices
	imgIndexLeft = newLeft;
	imgIndexCenter = newCenter;
	imgIndexRight = newRight;
} 




/**
 * @function
 * @name changeImgBack
 * @description cambia las clases para que los elmentos del slideshow
 *	avancen hacia la derecha
 *
 * @param {number} newLeft
 * @param {number} newCenter
 * @param {number} newRight
 */
function changeImgBack ( newLeft, newCenter, newRight ) {
	
	// la imagen que esta a la daracha sale del slider
	images[ imgIndexRight ].classList.remove( 'slider-item--right' );

	// la imagen del centro se ubica a la derecha
	images[ imgIndexCenter ].classList.add( 'slider-item--right' );
	images[ imgIndexCenter ].classList.remove( 'slider-item--center' );
	images[ imgIndexCenter ].style.zIndex = 15;


	// la imange de de la izquierda se ubica en el centro 
	images[ imgIndexLeft ].classList.add( 'slider-item--center' );
	images[ imgIndexLeft ].classList.remove( 'slider-item--left' );
	images[ imgIndexLeft ].style.zIndex = 15;

	// una imagen entra al slider
	images[ newLeft ].classList.add( 'slider-item--left' );
	images[ newLeft ].style.zIndex = 10;

	// se actualizan los indices
	imgIndexLeft = newLeft;
	imgIndexCenter = newCenter;
	imgIndexRight = newRight;
} 





/**
 * @function
 * @name changePositionNext
 * @description incrementa el indice de los elementos del slideshow
 */
function changePositionNext () {
	
	let left = 0,
			center = 0,
			rignt = 0;
			
	if ( imgIndexLeft === imgTotal - 1 ) left = 0;
	else left = imgIndexLeft + 1;

	if ( imgIndexCenter === imgTotal - 1 ) center = 0;
	else center = imgIndexCenter + 1;

	if ( imgIndexRight === imgTotal - 1 ) right = 0;
	else right = imgIndexRight + 1;

	changeImgNext( left, center, right );

}


/**
 * @function
 * @name changePositionBack
 * @description reduce los indices de los elementos del slideshow
 */
function changePositionBack () {
	
	let left = 0,
			center = 0,
			rignt = 0;
			
	if ( imgIndexLeft === 0 ) left = imgTotal - 1;
	else left = imgIndexLeft - 1;

	if ( imgIndexCenter === 0 ) center = imgTotal - 1;
	else center = imgIndexCenter - 1;

	if ( imgIndexRight === 0 ) right = imgTotal - 1;
	else right = imgIndexRight - 1;

	changeImgBack( left, center, right );

}




/* EVENTOS
 ====================================================*/
window.addEventListener( 'load', function () {

	// detiene el slider cuando el usuario quita el foco de la pagina
	window.addEventListener( 'blur', function () {
		clearInterval( slider );
		slider = null;
	} );

	// reanuda el slider cuando el usuario vuelve a la pagina
	window.addEventListener( 'focus', function () {
		slider = window.setInterval( changePositionNext, imgInterval );
	} );



	// EXPERIMENTAL ------------------------------------

	// eventos touch
	doc[ 0 ].addEventListener( 'touchstart', function ( event ) {
		touchStartX = event.changedTouches[ 0 ].screenX;
	} );

	doc[ 0 ].addEventListener( 'touchend', function ( event ) {
		touchEndX = event.changedTouches[ 0 ].screenX;

		slideTouch();
	} );
	// EXPERIMENTAL ------------------------------------






	// inicia el slider solo cuando toda la pagina ha cargado
	slider = window.setInterval( changePositionNext, imgInterval );

} );