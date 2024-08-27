// Reglas de encriptación y desencriptación
const reglasEncriptacion = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
  };
  
  const reglasDesencriptacion = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
  };
  
  // Función para encriptar texto
  const encriptarTexto = (texto) => {
    return texto.replace(/[eioua]/g, (letra) => reglasEncriptacion[letra]);
  };
  
  // Función para desencriptar texto
  const desencriptarTexto = (texto) => {
    return texto.replace(/enter|imes|ai|ober|ufat/g, (clave) => reglasDesencriptacion[clave]);
  };
  
  // Función para copiar texto
  const copiarTexto = (e) => {
    e.preventDefault();
    const contenido = document.querySelector('.presentacion__img__img p').textContent;
    navigator.clipboard.writeText(contenido).then(() => {
      alert('Texto copiado al portapapeles');
    });
  };
  
  // Función de actualización de interfaz con ajuste para pantallas pequeñas
  const actualizarInterfaz = (texto, encriptado = false) => {
    const imgDiv = document.querySelector('.presentacion__img__img');
    const txtDiv = document.querySelector('.presentacion__img__txt');
    const copiarEnlace = document.createElement('a');
  
    if (texto) {
      // Si hay texto, lo mostramos en lugar de la imagen
      imgDiv.innerHTML = `<p>${texto}</p>`;
      imgDiv.style.height = '75%';
      txtDiv.innerHTML = '';
      txtDiv.style.height = '25%';
  
      // Agregamos el enlace para copiar el texto
      copiarEnlace.textContent = 'Copiar';
      copiarEnlace.href = '#';
      copiarEnlace.addEventListener('click', copiarTexto);
      copiarEnlace.classList.add('btn-copiar');
      txtDiv.appendChild(copiarEnlace);
  
      // Aseguramos que el texto se vea incluso en pantallas pequeñas
      if (window.innerWidth <= 768) {
        imgDiv.style.display = 'block';  // Aseguramos que el div siga visible
      }
  
    } else {
      // Si no hay texto, restauramos la imagen y el texto original
      imgDiv.innerHTML = `<img src="./assets/NoEncontrado.png" alt="">`;
      imgDiv.style.height = '55%';
      txtDiv.innerHTML = `
        <p class="presentacion__img__txt__1">Ningún mensaje fue encontrado</p>
        <p class="presentacion__img__txt_2">Ingresa el texto que desees encriptar o desencriptar.</p>
      `;
      txtDiv.style.height = '45%';
  
      // Aseguramos que la imagen siga oculta en pantallas pequeñas
      if (window.innerWidth <= 768) {
        imgDiv.style.display = 'none';
      }
    }
  };
  
  // Ajustes para pantallas menores a 768px
  const ajustarPantallaPequeña = () => {
    const imgDiv = document.querySelector('.presentacion__img__img');
    const txtDiv = document.querySelector('.presentacion__img__txt');
    const pantallaAncho = window.innerWidth;
  
    if (pantallaAncho <= 768) {
      if (imgDiv.innerHTML.includes('<img')) {
        // Si hay una imagen, la ocultamos en pantallas pequeñas
        imgDiv.style.display = 'none';
      } else {
        // Si no hay imagen (hay texto encriptado/desencriptado), lo mostramos
        imgDiv.style.display = 'block';
      }
      txtDiv.style.height = '100%';
    } else {
      // Restaurar comportamiento normal si la pantalla es mayor a 768px
      imgDiv.style.display = 'block';
      imgDiv.style.height = '75%';
      txtDiv.style.height = '25%';
    }
  };
  
  // Función para manejar el botón de encriptar
  document.querySelector('#btn-encriptar').addEventListener('click', () => {
    const texto = document.querySelector('#input-texto').value;
    if (texto) {
      const textoEncriptado = encriptarTexto(texto);
      actualizarInterfaz(textoEncriptado, true);
    } else {
      actualizarInterfaz('');
    }
  });
  
  // Función para manejar el botón de desencriptar
  document.querySelector('#btn-desencriptar').addEventListener('click', () => {
    const texto = document.querySelector('#input-texto').value;
    if (texto) {
      const textoDesencriptado = desencriptarTexto(texto);
      actualizarInterfaz(textoDesencriptado, true);
    } else {
      actualizarInterfaz('');
    }
  });
  
  // Escucha los cambios en el tamaño de la pantalla
  window.addEventListener('resize', ajustarPantallaPequeña);
  
  // Ejecuta el ajuste en el inicio
  ajustarPantallaPequeña();
  