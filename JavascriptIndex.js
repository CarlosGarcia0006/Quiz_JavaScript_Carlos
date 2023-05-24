function ObtenerDatos() {
    const form = document.querySelector('form');
    const input = document.getElementById('Nombres');
    const resultadosTabla = document.getElementById('resultadosTabla');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const departamento = input.value.trim();
      if (departamento === '') {
        return;
      }
  
      fetch(`https://www.datos.gov.co/resource/ccvq-rp9s.json?departamento=${encodeURIComponent(departamento)}&$limit=10`)
        .then(response => response.json())
        .then(data => {
          resultadosTabla.innerHTML = '';
  
          data.forEach(item => {
            const fecha = item.fechaobservacion;
            const valor = item.valorobservado;
            const estacion = item.nombreestacion;
            const departamento = item.departamento;
            const municipio = item.municipio;
  
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${fecha}</td>
              <td>${valor}</td>
              <td>${estacion}</td>
              <td>${departamento}</td>
              <td>${municipio}</td>
            `;
  
            resultadosTabla.appendChild(row);
          });
        })
        .catch(error => console.error(error));
    });
  }
  
  ObtenerDatos();