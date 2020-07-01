var url = 'https://cdn.jsdelivr.net/gh/auditers/tn-suite@3.7/fecha_de_entrega/data.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
  	// Do something with your data
  	//console.log(data);

  	var calendar_store = data['calendar'].store;
  	var calendar_campo = data['calendar'].campo;
  	var calendar_textocustomDate = data['calendar'].textocustomDate;
  	var calendar_saturday = data['calendar'].saturday;
  	var calendar_sunday = data['calendar'].sunday;
  	var calendar_limiths = data['calendar'].limiths;

	$('.modal-fixed-wrapper-content').append('<div class="customDate pb-4"><label for="'+calendar_campo+'" class="form-label">'+calendar_textocustomDate+'</label><input type="date" name="custom['+calendar_campo+']" id="'+calendar_campo+'" required="" class="form-control" style="background-color:#FFFFFF"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.css"></div>');

	var today = new Date();
	var hh = today.getHours();
	if (hh >= calendar_limiths) {
	  var dd = today.getDate()+2;
	} else {
	  var dd = today.getDate()+1;
	}
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();
	 if(dd<10){
	        dd='0'+dd
	    } 
	    if(mm<10){
	        mm='0'+mm
	    } 
	tomorrow = dd+'/'+mm+'/'+yyyy;
	document.getElementById(calendar_campo).flatpickr({
	    dateFormat: "d/m/Y",
	    minDate: tomorrow,
	    enableTime: false,
	    allowInput: true,
	    "disable": [
	        function(date) {
	        	if (calendar_saturday === false && calendar_sunday === true) {
	        		return (date.getDay() === 6);
	        	} else if (calendar_sunday === false && calendar_sunday === true) {
	        		return (date.getDay() === 0);
	        	} else if (calendar_saturday === false && calendar_sunday === false) {
	        		return (date.getDay() === 0 || date.getDay() === 6);
	        	}	        	
	        }
	    ],
	    "locale": {
	        firstDayOfWeek: 0,
	        weekdays: {
	          shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
	          longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],         
	        }, 
	        months: {
	          shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Оct', 'Nov', 'Dic'],
	          longhand: ['Enero', 'Febreo', 'Мarzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	        },                  
	    },
	});

});
