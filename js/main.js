(function () {
  "use strict";
  var regalo = document.getElementById('regalo');
  document.addEventListener('DOMContentLoaded', function () {

    var map = L.map('mapa').setView([41.541959, 2.121391], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([41.541959, 2.121391]).addTo(map)
    //   .bindPopup('GDL WebCamp 2020.<br> Boletos ya disponibles.')
    //   .openPopup();
      .bindTooltip('GDL WebCamp 2020 <br>Boletos ya disponibles')
      .openTooltip();
    // Campos Datos Usuarios
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');


    // Campos pases

    var pase_dia = document.getElementById('pase_dia');
    var pase_dosdias = document.getElementById('pase_dosdias');
    var pase_completo = document.getElementById('pase_completo');



    //Botones y divs


    var calcular = document.getElementById('calcular');
    var errorDiv = document.getElementById('error');
    var btnRegistro = document.getElementById('btnRegistro');
    var lista_productos = document.getElementById('lista-productos');
    var suma = document.getElementById('suma_total');

    //Extras

    var camisas = document.getElementById('camisa_evento');
    var etiquetas = document.getElementById('etiquetas');

    calcular.addEventListener('click', calcularMontos);
    pase_dia.addEventListener('blur', mostrarDias);
    pase_dosdias.addEventListener('blur', mostrarDias);
    pase_completo.addEventListener('blur', mostrarDias);

    nombre.addEventListener('blur', validarCampos);
    apellido.addEventListener('blur', validarCampos);
    email.addEventListener('blur', validarCampos);
    email.addEventListener('blur', validarMail);

    function validarCampos() {
      if (this.value == '') {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = 'Este campo es obligatorio';
        this.style.border = '1px solid red';
        errorDiv.style.border = '1px solid red';
      } else {
        errorDiv.style.display = 'none';
        this.style.border = '1px solid #cccccc';
      }
    }


    function validarMail() {
      if (this.value.indexOf('@gmail.com') > -1) {
        errorDiv.style.display = 'none';
        this.style.border = '1px solid #cccccc';
      } else {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = 'Este campo debe contener un email de goole';
        this.style.border = '1px solid red';
        errorDiv.style.border = '1px solid red';
      }
    }

    function calcularMontos(event) {
      event.preventDefault();
      if (regalo.value === '') {
        alert('Debes elegir un regalo');
        regalo.focus();
      } else {
        var boletosDia = parseInt(pase_dia.value, 10) || 0,
          boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
          boletoCompleto = parseInt(pase_completo.value, 10) || 0,
          cantCamisas = parseInt(camisas.value, 10) || 0,
          cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

        var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * .93) + (cantEtiquetas * 2);
        console.log(totalPagar);

        var listaProductos = [];

        if (boletosDia >= 1) {
          listaProductos.push(boletosDia + ' Pase por un dia');
        }
        if (boletos2Dias >= 1) {
          listaProductos.push(boletos2Dias + ' Pases por dos dias');
        }
        if (boletoCompleto >= 1) {
          listaProductos.push(boletoCompleto + ' Pases completos');
        }
        if (cantCamisas >= 1) {
          listaProductos.push(cantCamisas + ' Camisas');
        }
        if (cantEtiquetas >= 1) {
          listaProductos.push(cantEtiquetas + ' Etiquetas');
        }
        lista_productos.style.display = 'block';
        lista_productos.innerHTML = '';
        for (var i = 0; i < listaProductos.length; i++) {
          lista_productos.innerHTML += listaProductos[i] + '<br>';
        }

        suma.innerHTML = "$ " + totalPagar.toFixed(2);

      }
    }

    function mostrarDias() {
      var boletosDia = parseInt(pase_dia.value, 10) || 0,
        boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
        boletoCompleto = parseInt(pase_completo.value, 10) || 0;

      var diasElegidos = [];

      console.log(diasElegidos);

      if (boletosDia > 0) {
        diasElegidos.push('viernes');
      } else {
        document.getElementById('viernes').style.display = 'none';
      }
      if (boletos2Dias > 0) {
        diasElegidos.push('viernes', 'sabado');
      } else {
        document.getElementById('viernes').style.display = 'none';
        document.getElementById('sabado').style.display = 'none';
      }
      if (boletoCompleto > 0) {
        diasElegidos.push('viernes', 'sabado', 'domingo');
      } else {
        document.getElementById('viernes').style.display = 'none';
        document.getElementById('sabado').style.display = 'none';
        document.getElementById('domingo').style.display = 'none';
      }
      for (var i = 0; i < diasElegidos.length; i++) {
        document.getElementById(diasElegidos[i]).style.display = 'block';

      }

    }

  }); // DOM CONTENT LOADED

})();
