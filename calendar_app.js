$('.ajax-cart-body').append('{#Campocustom#}<labelfor="FechaEntrega">Fechadeentrega</label><p>Seleccionaunafechadeentregadelpedido</p><inputtype="date"name="custom[FechaEntrega]"id="FechaEntrega"required=""style="background-color:#FFFFFF"><linkrel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.css"><scriptsrc="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.js"></script><script>vartoday=newDate();varhh=today.getHours();if(hh>=20){vardd=today.getDate()+2;}else{vardd=today.getDate()+1;}varmm=today.getMonth()+1;//Januaryis0!varyyyy=today.getFullYear();if(dd<10){dd="0"+dd}if(mm<10){mm="0"+mm}//tomorrow=yyyy+"-"+mm+"-"+dd;tomorrow=dd+"/"+mm+"/"+yyyy;//document.getElementById("FechaEntrega").setAttribute("min",tomorrow);$("#FechaEntrega").flatpickr({enableTime:true,dateFormat:"d/m/Y",minDate:tomorrow,enableTime:false,"disable":[function(date){return(date.getDay()===0||date.getDay()===6);//disableweekends}],"locale":{firstDayOfWeek:0,weekdays:{shorthand:["Do","Lu","Ma","Mi","Ju","Vi","Sa"],longhand:["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],},months:{shorthand:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Оct","Nov","Dic"],longhand:["Enero","Febreo","Мarzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],},},});</script>{#endCampocustom#}');
