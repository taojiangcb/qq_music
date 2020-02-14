import { isType, __TYPES__ } from '../../es/CheckType';

/*
bounce	flash	pulse	rubberBand
shake	headShake	swing	tada
wobble	jello	bounceIn	bounceInDown
bounceInLeft	bounceInRight	bounceInUp	bounceOut
bounceOutDown	bounceOutLeft	bounceOutRight	bounceOutUp
fadeIn	fadeInDown	fadeInDownBig	fadeInLeft
fadeInLeftBig	fadeInRight	fadeInRightBig	fadeInUp
fadeInUpBig	fadeOut	fadeOutDown	fadeOutDownBig
fadeOutLeft	fadeOutLeftBig	fadeOutRight	fadeOutRightBig
fadeOutUp	fadeOutUpBig	flipInX	flipInY
flipOutX	flipOutY	lightSpeedIn	lightSpeedOut
rotateIn	rotateInDownLeft	rotateInDownRight	rotateInUpLeft
rotateInUpRight	rotateOut	rotateOutDownLeft	rotateOutDownRight
rotateOutUpLeft	rotateOutUpRight	hinge	jackInTheBox
rollIn	rollOut	zoomIn	zoomInDown
zoomInLeft	zoomInRight	zoomInUp	zoomOut
zoomOutDown	zoomOutLeft	zoomOutRight	zoomOutUp
slideInDown	slideInLeft	slideInRight	slideInUp
slideOutDown	slideOutLeft	slideOutRight	slideOutUp
heartBeat
*/

function animateCSS<T extends String | HTMLElement>(el: T, animateName: string, callBack?: Function) {
  
  const EVENT_END: string = 'animationend';
  let node: HTMLElement
  if (isType(el, __TYPES__.String)) { node = document.querySelector(String(el)); }
  else if (el instanceof HTMLElement) { node = el; }
  const theEnd = function () {
    node.classList.remove(animateName);
    node.removeEventListener(EVENT_END, theEnd);
    callBack && callBack();
  }

  if (node) {
    if (node.classList) node.classList.add(animateName);
    node.addEventListener(EVENT_END, theEnd);
  }
  else {
    console.warn(`el not's a valid object!`);
  }
}

export { animateCSS }