var ID=document.getElementById.bind(document);var slideshow=ID('slider-container'),item=document.querySelectorAll('.js-item'),arrowLeft=ID('arrow-left'),arrowRight=ID('arrow-right'),itemTotal=item.length,lastItem=itemTotal-1,itemIndexLeft=lastItem,itemIndexCenter=0,itemIndexRight=1,itemInterval=7000,autoSlide=null,touchStartX=0,touchEndX=0;function stopAutoSlide(){clearInterval(autoSlide);autoSlide=null;} function changeClassItem(direction,newItem){if(direction){item[itemIndexLeft].classList.remove('slider-item--left');item[itemIndexCenter].classList.add('slider-item--left');item[itemIndexCenter].classList.remove('slider-item--center');item[itemIndexCenter].style.zIndex=15;item[itemIndexRight].classList.add('slider-item--center');item[itemIndexRight].classList.remove('slider-item--right');item[itemIndexRight].style.zIndex=15;item[newItem].classList.add('slider-item--right');item[newItem].style.zIndex=10;}else{item[itemIndexRight].classList.remove('slider-item--right');item[itemIndexCenter].classList.add('slider-item--right');item[itemIndexCenter].classList.remove('slider-item--center');item[itemIndexCenter].style.zIndex=15;item[itemIndexLeft].classList.add('slider-item--center');item[itemIndexLeft].classList.remove('slider-item--left');item[itemIndexLeft].style.zIndex=15;item[newItem].classList.add('slider-item--left');item[newItem].style.zIndex=10;}} function changeIndex(change){var left=0,center=0,rignt=0;if(change){itemIndexLeft===itemTotal-1?left=0:left=itemIndexLeft+1;itemIndexCenter===itemTotal-1?center=0:center=itemIndexCenter+1;itemIndexRight===itemTotal-1?right=0:right=itemIndexRight+1;changeClassItem(1,right);}else{itemIndexLeft===0?left=itemTotal-1:left=itemIndexLeft-1;itemIndexCenter===0?center=itemTotal-1:center=itemIndexCenter-1;itemIndexRight===0?right=itemTotal-1:right=itemIndexRight-1;changeClassItem(0,left);} itemIndexLeft=left;itemIndexCenter=center;itemIndexRight=right;} function changeItem(direction){stopAutoSlide();changeIndex(direction);} function slideTouch(){if(touchEndX<touchStartX-100)changeItem(1);if(touchEndX>touchStartX+100)changeItem(0);} window.addEventListener('load',function(){window.addEventListener('blur',function(){stopAutoSlide()});window.addEventListener('focus',function(){autoSlide=window.setInterval(function(){changeIndex(1)},itemInterval);});slideshow.addEventListener('touchstart',function(event){touchStartX=event.changedTouches[0].screenX;});slideshow.addEventListener('touchend',function(event){touchEndX=event.changedTouches[0].screenX;slideTouch();});arrowLeft.addEventListener('click',function(){changeItem(1)});arrowRight.addEventListener('click',function(){changeItem(0)});autoSlide=window.setInterval(function(){changeIndex(1);},itemInterval);});