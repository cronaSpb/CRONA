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

// -----------------------WG----------------------------------

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

//----------------------Win--------------------------


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