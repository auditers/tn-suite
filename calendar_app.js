$('.ajax-cart-body').append('<label for="FechaEntrega">Fecha de entrega</label><p>Selecciona una fecha de entrega del pedido</p><input type="date" name="custom[FechaEntrega]" id="FechaEntrega" required="" style="background-color:#FFFFFF"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.css">');

var today = new Date();
var hh = today.getHours();
if (hh >= 20) {
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
$("#FechaEntrega").flatpickr({
    dateFormat: "d/m/Y",
    minDate: tomorrow,
    enableTime: false,
    "disable": [
        function(date) {
           return (date.getDay() === 0 || date.getDay() === 6);
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
