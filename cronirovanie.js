// ------------------------кнопка вверх---------------------------------


var b = document.body || document.getElementsByTagName('body')[0];

b.insertAdjacentHTML('beforeend', '<button onclick="topFunction()" id="toTop" title="Вверх"><img src="img/c60.png" width="40px"></button>');


document.getElementById("toTop").setAttribute("style", "display: block; position: fixed; bottom: 18px; right: 18px; z-index: 1000; border: none; outline: none; background: none; cursor: pointer;");


document.documentElement.setAttribute("style", "scroll-behavior: smooth;");

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

// --------------------------WG-------------------------------

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

//--------------------------------------------------------------------

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

//------------------Win------------------------------------

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

var btn4 = document.querySelector('.window4'),
	mod_click4 = document.querySelector('.mod_click4'),
	cloSeBtn4 = document.querySelector('.cloSeBtn4');


	btn4.addEventListener('click', function(){
		mod_click4.style.display = 'flex';

	})

cloSeBtn4.addEventListener('click', function() {
		mod_click4.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click4) {
		mod_click4.style.display = 'none';
	}

})


var btn5 = document.querySelector('.window5'),
	mod_click5 = document.querySelector('.mod_click5'),
	cloSeBtn5 = document.querySelector('.cloSeBtn5');


	btn5.addEventListener('click', function(){
		mod_click5.style.display = 'flex';

	})

cloSeBtn5.addEventListener('click', function() {
		mod_click5.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click5) {
		mod_click5.style.display = 'none';
	}

})


var btn6 = document.querySelector('.window6'),
	mod_click6 = document.querySelector('.mod_click6'),
	cloSeBtn6 = document.querySelector('.cloSeBtn6');


	btn6.addEventListener('click', function(){
		mod_click6.style.display = 'flex';

	})

cloSeBtn6.addEventListener('click', function() {
		mod_click6.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click6) {
		mod_click6.style.display = 'none';
	}

})


var btn7 = document.querySelector('.window7'),
	mod_click7 = document.querySelector('.mod_click7'),
	cloSeBtn7 = document.querySelector('.cloSeBtn7');


	btn7.addEventListener('click', function(){
		mod_click7.style.display = 'flex';

	})

cloSeBtn7.addEventListener('click', function() {
		mod_click7.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click7) {
		mod_click7.style.display = 'none';
	}

})


var btn8 = document.querySelector('.window8'),
	mod_click8 = document.querySelector('.mod_click8'),
	cloSeBtn8 = document.querySelector('.cloSeBtn8');


	btn8.addEventListener('click', function(){
		mod_click8.style.display = 'flex';

	})

cloSeBtn8.addEventListener('click', function() {
		mod_click8.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click8) {
		mod_click8.style.display = 'none';
	}

})



var btn9 = document.querySelector('.window9'),
	mod_click9 = document.querySelector('.mod_click9'),
	cloSeBtn9 = document.querySelector('.cloSeBtn9');


	btn9.addEventListener('click', function(){
		mod_click9.style.display = 'flex';

	})

cloSeBtn9.addEventListener('click', function() {
		mod_click9.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click9) {
		mod_click9.style.display = 'none';
	}

})



var btn10 = document.querySelector('.window10'),
	mod_click10 = document.querySelector('.mod_click10'),
	cloSeBtn10 = document.querySelector('.cloSeBtn10');


	btn10.addEventListener('click', function(){
		mod_click10.style.display = 'flex';

	})

cloSeBtn10.addEventListener('click', function() {
		mod_click10.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click10) {
		mod_click10.style.display = 'none';
	}

})



var btn11 = document.querySelector('.window11'),
	mod_click11 = document.querySelector('.mod_click11'),
	cloSeBtn11 = document.querySelector('.cloSeBtn11');


	btn11.addEventListener('click', function(){
		mod_click11.style.display = 'flex';

	})

cloSeBtn11.addEventListener('click', function() {
		mod_click11.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click11) {
		mod_click11.style.display = 'none';
	}

})



var btn12 = document.querySelector('.window12'),
	mod_click12 = document.querySelector('.mod_click12'),
	cloSeBtn12 = document.querySelector('.cloSeBtn12');


	btn12.addEventListener('click', function(){
		mod_click12.style.display = 'flex';

	})

cloSeBtn12.addEventListener('click', function() {
		mod_click12.style.display = 'none';
	})

window.addEventListener('click', function(e) {
	if(e.target == mod_click12) {
		mod_click12.style.display = 'none';
	}

})