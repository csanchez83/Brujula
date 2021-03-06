//actions
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});

//Variable que actua como WatchId
var accId = null;
var accBrujula = null;

$(function()
  {
      //Primero verificamos que se hayan cargado las librerias de phonegap
      document.addEventListener("deviceready", function() 
    {
      
          //Acelerometro

          $('#acelerometro .individual li').tap(function(){

              //alert($(this).index());

              if ($(this).index() == 0)
              {
                  //Pulsar boton Iniciar
                  //$('#acelerometro h2').html('Iniciado');
                  //Mandamos llamar la funcion
                  iniciarAcc();
              }
              else
              {
                  //Pulsar boton Detener
                  //$('#acelerometro h2').html('Detenido');
                    //Mandamos llamar la funcion detenerAcc
                  detenerAcc();
              }

          });
      
    }, false);
      
  });


function iniciarAcc()
{
        function onSuccess(acceleration) 
        {
            $('#acelerometro h2').html('Acceleration X: ' + acceleration.x + '<br>' +
                  'Acceleration Y: ' + acceleration.y + '<br>' +
                  'Acceleration Z: ' + acceleration.z + '<br>');
        };

        function onError() 
        {
            alert('onError!');
        };

        var options = { frequency: 500 };  // Update every 3 seconds

        accId = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function detenerAcc()
{
    if (accId != null)
    {
        navigator.accelerometer.clearWatch(accId);
        accId = null;
        $('#acelerometro h2').html('Detenido');
        
    }
}

function iniciarBrujula()
{
    function onSuccess(heading) 
    {
        //var element = document.getElementById('heading');
        //element.innerHTML = 'Heading: ' + heading.magneticHeading;
        //alert("Brujula iniciada: " + heading.magneticHeading);
        
        var posicion = heading.magneticHeading;
        
        if ((posicion >= 0) && (posicion <= 90))
        {
            $('#brujula h2').html('Posicion: ' + heading.magneticHeading + ' grados Noreste');
        }
        
        if ((posicion > 90) && (posicion <= 180))
        {
            $('#brujula h2').html('Posicion: ' + heading.magneticHeading + ' grados Sureste');
        }
        
        if ((posicion > 180) && (posicion <= 270))
        {
            $('#brujula h2').html('Posicion: ' + heading.magneticHeading + ' grados Suroeste');
        }
        
        if ((posicion > 270) && (posicion <= 360))
        {
            $('#brujula h2').html('Posicion: ' + heading.magneticHeading + ' grados Noroeste');
        }
             
    };

    function onError(compassError) 
    {
        alert('Compass error: ' + compassError.code);
    };

    var options = 
    {
        frequency: 1000
    }; // Update every 1 seconds

    accBrujula= navigator.compass.watchHeading(onSuccess, onError, options);
    
}

function detenerBrujula()
{
    if (accBrujula != null)
    {
        navigator.compass.clearWatch(accBrujula);
        accBrujula = null;
    }
    
}

$(function() 
  {
      //Funcion para rastrear los clic en la pagina de Brujula
      document.addEventListener("deviceready", function() 
      {
      
          //Brujula

          $('#brujula .individual li').tap(function(){

              //alert($(this).index());

              if ($(this).index() == 0)
              {
                  //Pulsar boton Iniciar
                  //$('#acelerometro h2').html('Iniciado');
                  //Mandamos llamar la funcion
                  iniciarBrujula();
              }
              else
              {
                  //Pulsar boton Detener
                  //$('#acelerometro h2').html('Detenido');
                    //Mandamos llamar la funcion detenerAcc
                  detenerBrujula();
              }

          });
      
    }, false);
      
  });