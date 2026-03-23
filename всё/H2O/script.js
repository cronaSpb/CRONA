// ------------------------ПРОСТЫЕ СТИЛИ МОДАЛЬНЫХ ОКОН-------------------------
window.addEventListener('load', function() {
    console.log('JavaScript загружен, применяю ПРОСТЫЕ стили модальных окон H2O...');
    
    // Применяем стили ко всем модальным окнам
    var modWrappers = document.querySelectorAll('.mod_click0 .mod-wrapper0, .mod_click4 .mod-wrapper4, .mod_click5 .mod-wrapper5, .mod_click6 .mod-wrapper6');
    var modBodies = document.querySelectorAll('.mod-body0, .mod-body4, .mod-body5, .mod-body6');
    
    console.log('Найдено модальных окон:', modWrappers.length);
    console.log('Найдено body модальных окон:', modBodies.length);
    
    modWrappers.forEach(function(wrapper, index) {
        console.log('Применяю стили к окну', index + 1);
        wrapper.style.maxHeight = '70vh';
        wrapper.style.overflowY = 'auto';
        wrapper.style.overflowX = 'hidden';
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.position = 'relative';
    });
    
    // Также применяем z-index к родительским контейнерам
    var modClicks = document.querySelectorAll('.mod_click0, .mod_click4, .mod_click5, .mod_click6');
    modClicks.forEach(function(modClick, index) {
        console.log('Применяю z-index к контейнеру', index + 1);
        modClick.style.position = 'fixed';
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
        .mod_click0 .mod-wrapper0::-webkit-scrollbar,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar {
            width: 10px !important;
        }
        
        .mod_click0 .mod-wrapper0::-webkit-scrollbar-track,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar-track,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar-track,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar-track {
            background: transparent !important;
            border-radius: 0 !important;
            margin: 0 !important;
        }
        
        .mod_click0 .mod-wrapper0::-webkit-scrollbar-thumb,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar-thumb,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar-thumb,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar-thumb {
            background: #666 !important;
            border-radius: 5px !important;
            border: none !important;
        }
        
        .mod_click0 .mod-wrapper0::-webkit-scrollbar-thumb:hover,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar-thumb:hover,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar-thumb:hover,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar-thumb:hover {
            background: #444 !important;
        }
        
        .mod_click0 .mod-wrapper0::-webkit-scrollbar-button,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar-button,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar-button,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar-button {
            background: #666 !important;
            border: none !important;
            border-radius: 2px !important;
        }
        
        .mod_click0 .mod-wrapper0::-webkit-scrollbar-button:hover,
        .mod_click4 .mod-wrapper4::-webkit-scrollbar-button:hover,
        .mod_click5 .mod-wrapper5::-webkit-scrollbar-button:hover,
        .mod_click6 .mod-wrapper6::-webkit-scrollbar-button:hover {
            background: #444 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('ПРОСТЫЕ стили для ползунков добавлены');
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

// ------------------------МОДАЛЬНЫЕ ОКНА С ЗАЩИТОЙ ОТ АНИМАЦИЙ-------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Функция для управления анимациями
    function manageAnimations(pause) {
        var animatedElements = document.querySelectorAll('.wow, .animated');
        animatedElements.forEach(function(el) {
            if (pause) {
                el.style.animationPlayState = 'paused';
                el.style.zIndex = '1';
            } else {
                el.style.animationPlayState = 'running';
                el.style.zIndex = '';
            }
        });
    }
    
    // Модальное окно 4
    var btn4 = document.querySelector('.window4');
    var mod_click4 = document.querySelector('.mod_click4');
    var cloSeBtn4 = document.querySelector('.cloSeBtn4');

    if (btn4 && mod_click4 && cloSeBtn4) {
        btn4.addEventListener('click', function(){
            mod_click4.style.display = 'flex';
            mod_click4.style.zIndex = '999999';
            manageAnimations(true); // Отключаем анимации
        });

        cloSeBtn4.addEventListener('click', function() {
            mod_click4.style.display = 'none';
            manageAnimations(false); // Включаем анимации
        });

        window.addEventListener('click', function(e) {
            if(e.target == mod_click4) {
                mod_click4.style.display = 'none';
                manageAnimations(false); // Включаем анимации
            }
        });
    }
    
    // Модальное окно 5
    var btn5 = document.querySelector('.window5');
    var mod_click5 = document.querySelector('.mod_click5');
    var cloSeBtn5 = document.querySelector('.cloSeBtn5');

    if (btn5 && mod_click5 && cloSeBtn5) {
        btn5.addEventListener('click', function(){
            mod_click5.style.display = 'flex';
            mod_click5.style.zIndex = '999999';
            manageAnimations(true); // Отключаем анимации
        });

        cloSeBtn5.addEventListener('click', function() {
            mod_click5.style.display = 'none';
            manageAnimations(false); // Включаем анимации
        });

        window.addEventListener('click', function(e) {
            if(e.target == mod_click5) {
                mod_click5.style.display = 'none';
                manageAnimations(false); // Включаем анимации
            }
        });
    }
    
    // Модальное окно 6
    var btn6 = document.querySelector('.window6');
    var mod_click6 = document.querySelector('.mod_click6');
    var cloSeBtn6 = document.querySelector('.cloSeBtn6');

    if (btn6 && mod_click6 && cloSeBtn6) {
        btn6.addEventListener('click', function(){
            mod_click6.style.display = 'flex';
            mod_click6.style.zIndex = '999999';
            manageAnimations(true); // Отключаем анимации
        });

        cloSeBtn6.addEventListener('click', function() {
            mod_click6.style.display = 'none';
            manageAnimations(false); // Включаем анимации
        });

        window.addEventListener('click', function(e) {
            if(e.target == mod_click6) {
                mod_click6.style.display = 'none';
                manageAnimations(false); // Включаем анимации
            }
        });
    }
    
    console.log('Модальные окна H2O настроены с защитой от анимаций');
});

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
