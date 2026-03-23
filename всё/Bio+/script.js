// ------------------------кнопка вверх---------------------------------


var b = document.body || document.getElementsByTagName('body')[0];

b.insertAdjacentHTML('beforeend', '<button onclick="topFunction()" id="toTop" title="Вверх"><img src="img/200.png" width="40px"></button>');


document.getElementById("toTop").setAttribute("style", "display: block; position: fixed; bottom: 18px; right: 18px; z-index: 1000; border: none; outline: none; background: none; cursor: pointer;");

document.documentElement.setAttribute("style", "scroll-behavior: smooth;");

// ------------------------ПРИНУДИТЕЛЬНЫЕ СТИЛИ МОДАЛЬНЫХ ОКОН-------------------------
window.addEventListener('load', function() {
    console.log('JavaScript загружен, применяю стили модальных окон Лесной код...');
        
    // Применяем стили ко всем модальным окнам
    var modWrappers = document.querySelectorAll('.mod_click1 .mod-wrapper1, .mod_click2 .mod-wrapper2, .mod_click3 .mod-wrapper3');
    var modBodies = document.querySelectorAll('.mod-body1, .mod-body2, .mod-body3');
    
    console.log('Найдено модальных окон:', modWrappers.length);
    console.log('Найдено body модальных окон:', modBodies.length);
    
    modWrappers.forEach(function(wrapper, index) {
        console.log('Применяю стили к окну', index + 1);
        wrapper.style.maxHeight = '70vh';
        wrapper.style.overflowY = 'auto';
        wrapper.style.overflowX = 'hidden';
        wrapper.style.zIndex = '9999';
        wrapper.style.padding = '0 10px 10px 10px';
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.borderRadius = '20px';
    });
    
    modBodies.forEach(function(body, index) {
        console.log('Применяю стили к body окна', index + 1);
        body.style.maxHeight = '50vh';
        body.style.overflowY = 'auto';
        body.style.overflowX = 'hidden';
        body.style.padding = '5px 15px';
    });
    
    // Создаем и добавляем стили для ползунка
    var style = document.createElement('style');
    style.textContent = `
        .mod_click1 .mod-wrapper1::-webkit-scrollbar,
        .mod_click2 .mod-wrapper2::-webkit-scrollbar,
        .mod_click3 .mod-wrapper3::-webkit-scrollbar {
            width: 12px !important;
        }
        
        .mod_click1 .mod-wrapper1::-webkit-scrollbar-track,
        .mod_click2 .mod-wrapper2::-webkit-scrollbar-track,
        .mod_click3 .mod-wrapper3::-webkit-scrollbar-track {
            background: #f1f1f1 !important;
        }
        
        .mod_click1 .mod-wrapper1::-webkit-scrollbar-thumb,
        .mod_click2 .mod-wrapper2::-webkit-scrollbar-thumb,
        .mod_click3 .mod-wrapper3::-webkit-scrollbar-thumb {
            background: #888 !important;
            border-radius: 6px !important;
            border: 2px solid #f1f1f1 !important;
        }
        
        .mod_click1 .mod-wrapper1::-webkit-scrollbar-thumb:hover,
        .mod_click2 .mod-wrapper2::-webkit-scrollbar-thumb:hover,
        .mod_click3 .mod-wrapper3::-webkit-scrollbar-thumb:hover {
            background: #555 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Стили для ползунков добавлены');
});

window.onscroll = function() {scrollFunction()};


function scrollFunction() {
	let t = document.getElementById("toTop");
	if (document.body.scrollTop > 480 || document.documentElement.scrollTop > 480) {
		t.style.display = "block";
	} else {
		t.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// ------------------------WG---------------------------------

$(document).ready(function() {

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Заявка принята!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});

//-------------------------------------------------------------------

$(document).ready(function() {
    $('#customerData').validate({
    	rules: {}
    });
});   



var btn0 = document.querySelector('.window0'),
	mod_click0 = document.querySelector('.mod_click0'),
	cloSeBtn0 = document.querySelector('.cloSeBtn0');


	btn0.addEventListener('click', function(){
		mod_click0.style.display = 'flex';

	})

cloSeBtn0.addEventListener('click', function() {
		mod_click0.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click0) {
		mod_click0.style.display = 'none';
	}

})

//-----------------------------------win------------------------------------------

var btn1 = document.querySelector('.window1'),
	mod_click1 = document.querySelector('.mod_click1'),
	cloSeBtn1 = document.querySelector('.cloSeBtn1');


	btn1.addEventListener('click', function(){
		mod_click1.style.display = 'flex';

	})

cloSeBtn1.addEventListener('click', function() {
		mod_click1.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click1) {
		mod_click1.style.display = 'none';
	}
})

var btn2 = document.querySelector('.window2'),
	mod_click2 = document.querySelector('.mod_click2'),
	cloSeBtn2 = document.querySelector('.cloSeBtn2');


	btn2.addEventListener('click', function(){
		mod_click2.style.display = 'flex';

	})

cloSeBtn2.addEventListener('click', function() {
		mod_click2.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click2) {
		mod_click2.style.display = 'none';
	}
})

var btn3 = document.querySelector('.window3'),
	mod_click3 = document.querySelector('.mod_click3'),
	cloSeBtn3 = document.querySelector('.cloSeBtn3');


	btn3.addEventListener('click', function(){
		mod_click3.style.display = 'flex';

	})

cloSeBtn3.addEventListener('click', function() {
		mod_click3.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click3) {
		mod_click3.style.display = 'none';
	}
})

//------------------------.carouselG-------------------------------------

// var lis = document.getElementsByTagName('li');
// for (var i = 0; i < lis.length; i++) {
//  lis[i].style.position = 'relative';
//  var span = document.createElement('span');
//  span.style.cssText = 'position:absolute; left:0; top:0';
//  span.innerHTML = 1;
//  lis[i].appendChild(span);
// }

// var widht = 1280;
// var count = 1;

// var carousel = document.getElementById('carousel');
// var list = carousel.querySelector('ul');
// var listElements = carousel.querySelectorAll('li');
// var position = 0;

// carousel.querySelector('.prev').onclick = function () {
// 	position = Math.min(position + widht * count, 0);
// 	list.style.marginLeft = position + 'px';
// };

// carousel.querySelector('.next').onclick = function () {
// 	position = Math.max(position - widht * count, -widht * (listElements.length - count));
// 	list.style.marginLeft = position + 'px';
// };