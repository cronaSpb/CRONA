$(document).ready(function() {
	$('.zoom-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">больше фото в VK</a>';
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});
});


// var btn1 = document.querySelector('.window1'),
// mod_click1 = document.querySelector('.mod_click1'),
// cloSeBtn1 = document.querySelector('.cloSeBtn1');


// 	btn1.addEventListener('click', function(){
// 		mod_click1.style.display = 'flex';

// 	})

// cloSeBtn1.addEventListener('click', function() {
// 		mod_click1.style.display = 'none';
// 	})

// window.addEventListener('click', function(e) {
// 	if(e.target == mod_click1) {
// 		mod_click1.style.display = 'none';
// 	}

// })


// var btn2 = document.querySelector('.window2'),
// 	mod_click2 = document.querySelector('.mod_click2'),
// 	cloSeBtn2 = document.querySelector('.cloSeBtn2');


// 	btn2.addEventListener('click', function(){
// 		mod_click2.style.display = 'flex';

// 	})

// cloSeBtn2.addEventListener('click', function() {
// 		mod_click2.style.display = 'none';
// 	})

// window.addEventListener('click', function(e) {
// 	if(e.target == mod_click2) {
// 		mod_click2.style.display = 'none';
// 	}

// })


// var btn3 = document.querySelector('.window3'),
// 	mod_click3 = document.querySelector('.mod_click3'),
// 	cloSeBtn3 = document.querySelector('.cloSeBtn3');


// 	btn3.addEventListener('click', function(){
// 		mod_click3.style.display = 'flex';

// 	})

// cloSeBtn3.addEventListener('click', function() {
// 		mod_click3.style.display = 'none';
// 	})

// window.addEventListener('click', function(e) {
// 	if(e.target == mod_click3) {
// 		mod_click3.style.display = 'none';
// 	}

// })


////////////////////img///////////////////////

// var modal = document.getElementById('myModal');
// var img = document.getElementById('myImg1');


// var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");


// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var span = document.getElementsByClassName("close")[0];
// span.onclick = function () {
// 	modal.style.display = "none";
// }




// var img = document.getElementById('myImg2');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg3');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg4');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg5');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg6');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg7');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg8');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


// var img = document.getElementById('myImg9');
// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }


/////////////////////Magnific-Popup///////////////////////////////
// $(document).ready(function() {
// 	$('.zoom-gallery').magnificPopup({
// 		delegate: 'a',
// 		type: 'image',
// 		closeOnContentClick: false,
// 		closeBtnInside: false,
// 		mainClass: 'mfp-with-zoom mfp-img-mobile',
// 		image: {
// 			verticalFit: true,
// 			titleSrc: function(item) {
// 				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">фото в VK</a>';
// 			}
// 		},
// 		gallery: {
// 			enabled: true
// 		},
// 		zoom: {
// 			enabled: true,
// 			duration: 300, // don't foget to change the duration also in CSS
// 			opener: function(element) {
// 				return element.find('img');
// 			}
// 		}
		
// 	});

///////////////////modal-content///img01///////////////////////

// var lis = document.getElementsByTagName("img01");
// for (var i = 0; i < lis.length; i++) {
//  lis[i].style.position = 'relative';
//  var span = document.createElement('span');
//  span.style.cssText = 'position:absolute; left:0; top:0';
//  span.innerHTML = 1;
//  lis[i].appendChild(span);
// }

// var width = 1220;
// var count = 1;

// var carousel = document.getElementById('carousel');
// var list = carousel.querySelector('ul');
// var listElements = carousel.querySelectorAll('li');

// var position = 0;

// carousel.querySelector('.prev').onclick = function () {
// 	position = Math.min(position + width * count, 0);
// 	list.style.marginLeft = position + 'px';
// };

// carousel.querySelector('.next').onclick = function () {
// 	position = Math.max(position - width * count, -width * (listElements.length - count));
// 	list.style.marginLeft = position + 'px';
// };

// ///////                                        ///////

// var carousel = document.getElementById('carousel');
// var img = document.getElementById('myImg1');


// var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");


// img.onclick = function () {
// 	modal.style.display = "block";
// 	modalImg.src = this.src;
// 	captionText.innerHTML = this.alt;
// }

//////////////////////////////////////////////////////////

// var span = document.getElementsByClassName("close")[0];
// span.onclick = function () {
// 	modal.style.display = "none";
// }

////////////////////////////////////////////////////////////

// var $carousel = ${'.carousel'};
// var $modal = ${'.modal'};

// var carousel = document.getElementById('carousel');
// var img = document.getElementById('myImg2');


// $img.click(changePhoto);

// function changePhoto() {
// 	var $this = $(this);
// 	var newImage = $this();
// 	console.log(newImage)

// 	$carousel('Image');

// }


///////////////////////////////////////////////////////

// function fun1() {
// 		var chbox;
// 		chbox=document.getElementById('one')

// 		if (chbox.checked) {
// 		alert('выбран');
// 		}

// 		else {
// 		alert('не выбран')
// 		}
// 		}

//////////////////////w/////////////////////////////////