
 
 $(document).ready(validateDate({
    formSelector: '#form-events',
    datepickerSelector: '#datepicker',
    error: function(){
       $('small.help-block[data-bv-for="fecha_del_evento"]').html("La fecha debe ser de hoy en adelante");
       $('small.help-block[data-bv-for="fecha_del_evento"]').css("display", "block");
 
       window.globalDateTimeValue.fecha_del_evento = false;
    },
    success: function(){
       $('small.help-block[data-bv-for="fecha_del_evento"]').css("display", "none");
       window.globalDateTimeValue.fecha_del_evento = true;
    },
    done: function(){
       globalValidationDateTime();
       console.log("done!!!!");
       console.log("value is : fecha_: " + window.globalDateTimeValue.fecha_del_evento);
    }
 }));
 
 $(document).ready(validateTime({
    formSelector: '#form-events',
    timepickerSelector: '#hora_de_inicio',
    error: function(){
       $('small.help-block[data-bv-for="hora_de_inicio"]').html("El horario de servicio es de 11:00 a 22:00");
       $('small.help-block[data-bv-for="hora_de_inicio"]').css("display", "block");
       window.globalDateTimeValue.hora_de_inicio = false;
    },
    success: function(){
       $('small.help-block[data-bv-for="hora_de_inicio"]').css("display", "none");
       window.globalDateTimeValue.hora_de_inicio = true;
    },
    done: function(){
       globalValidationDateTime();
       console.log("done!!!!");
       console.log("value is : hora_de_inicio: " + window.globalDateTimeValue.hora_de_inicio);
    }
 }));
 
 $(document).ready(validateTime({
    formSelector: '#form-events',
    timepickerSelector: '#hora_de_fin',
    error: function(){
       $('small.help-block[data-bv-for="hora_de_fin"]').html("El horario de servicio es de 11:00 a 22:00");
       $('small.help-block[data-bv-for="hora_de_fin"]').css("display", "block");
       window.globalDateTimeValue.hora_de_fin = false;
    },
    success: function(){
       $('small.help-block[data-bv-for="hora_de_fin"]').css("display", "none");
       window.globalDateTimeValue.hora_de_fin = true;
    },
    done: function(){
       globalValidationDateTime();
       console.log("done!!!!");
       console.log("value is : hora_de_fin: " + window.globalDateTimeValue.hora_de_fin);
    }
 }));
 
 
 
 

 
 function globalValidationDateTime(){
    let {fecha_del_evento, hora_de_inicio, hora_de_fin} = window.globalDateTimeValue;
    window.allowSubmitFormDateTime = fecha_del_evento && hora_de_inicio && hora_de_fin;
 
    if(window.allowSubmitFormDateTime){
       $("#form-events button[type=submit]").prop('disabled', false);
       $("#form-events button[type=submit]").removeClass('disabled');
    }
    else{
       $("#form-events button[type=submit]").prop('disabled', true);
       $("#form-events button[type=submit]").addClass('disabled');
    }
 }

 $(document).ready(validateDateTime({
     form: $("#form-events")
 }));

 function validateDateTime(settings){

    window.psbamf_globalDateTimeValue = {
        fecha_del_evento: true,
        hora_de_inicio: true,
        hora_de_fin: true
     };
     window.psbamf_allowSubmitFormDateTime = true;
 }

 function validateDate(settings){
 
    $(settings.formSelector).on("change", "*", function(){
       runDateValidation(settings);
    });
 
    $(settings.datepickerSelector).on("change", function(){
       runDateValidation(settings);
    });
 
    function runDateValidation(settings){
       if(checkDate(settings)){
          settings.success();
       }
       else{ 
          settings.error();
       }
 
       settings.done();
    }
 
    function checkDate(settings){
       let current = moment();
        current = current.format('YYYY-MM-DD');
 
       let selectedDate = $(settings.datepickerSelector).val();
       selectedDate = moment(selectedDate, 'DD/MM/YYYY');
       selectedDate = selectedDate.format('YYYY-MM-DD');
 
       let isDateAfter = moment(selectedDate).isAfter(current);
       let isDateSame = moment(selectedDate).isSame(current);
 
       let result = ( isDateAfter || isDateSame );
 
       return result;
    }
 }
 
 function validateTime(settings){
 
    $(settings.formSelector).on("change", "*", function(){
       runTimeValidation(settings);
    });
 
    $(settings.timepickerSelector).on("change", function(){
       runTimeValidation(settings);
    });
 
    function runTimeValidation(settings){
       if(checkTime(settings)){
          settings.success();
       }
       else{ 
          settings.error();
       }
 
       settings.done();
    }
 
    function checkTime(settings){
       let minTime = moment('11:00', 'hh:mm');
       let maxTime = moment('22:00', 'hh:mm');
       let selectedTime = moment( $(settings.timepickerSelector).val(), 'hh:mm');
 
       let isTimeAfter = selectedTime.isAfter(minTime);
       let isTimeBefore = selectedTime.isBefore(maxTime);
 
       let result = ( isTimeAfter && isTimeBefore );
       return result;
    }
 }