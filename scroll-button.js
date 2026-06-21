// ------------------------кнопка вверх---------------------------------

var b = document.body || document.getElementsByTagName('body')[0];

b.insertAdjacentHTML('beforeend', '<button onclick="topFunction()" id="toTop" title="Вверх"><img src="img/200.png" width="40px"></button>');

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
