// Navegación accesible y menú adaptable.
function seleccionar(link) {
    document.querySelectorAll('#links a').forEach(function (opcion) {
        opcion.classList.toggle('seleccionado', opcion === link);
        if (opcion === link) opcion.setAttribute('aria-current', 'page');
        else opcion.removeAttribute('aria-current');
    });
    var nav = document.getElementById('nav');
    if (nav) nav.classList.remove('responsive');
}

function responsiveMenu() {
    var nav = document.getElementById('nav');
    var boton = document.getElementById('icono-nav');
    if (!nav) return;
    nav.classList.toggle('responsive');
    if (boton) boton.setAttribute('aria-expanded', nav.classList.contains('responsive') ? 'true' : 'false');
}

// Anima las barras cuando la sección de habilidades entra en pantalla.
function efectoHabilidades() {
    var skills = document.getElementById('skills');
    if (!skills) return;
    if (window.innerHeight - skills.getBoundingClientRect().top >= 180) {
        ['html', 'js', 'bd', 'ps'].forEach(function (id, i) {
            var barra = document.getElementById(id);
            if (barra) barra.classList.add('barra-progreso' + (i + 1));
        });
        window.removeEventListener('scroll', efectoHabilidades);
    }
}

window.addEventListener('scroll', efectoHabilidades, { passive: true });
window.addEventListener('load', efectoHabilidades);

// Año automático en el pie de página.
document.addEventListener('DOMContentLoaded', function () {
    var anio = document.getElementById('anio');
    if (anio) anio.textContent = new Date().getFullYear();

    // El formulario prepara un correo: no simula un envío al servidor.
    var formulario = document.getElementById('form-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function (evento) {
            evento.preventDefault();
            var datos = new FormData(formulario);
            var nombre = (datos.get('nombre') || '').toString().trim();
            var email = (datos.get('email') || '').toString().trim();
            var tema = (datos.get('tema') || 'Consulta desde el portfolio').toString().trim();
            var mensaje = (datos.get('mensaje') || '').toString().trim();
            var cuerpo = 'Nombre: ' + nombre + '\nCorreo: ' + email + '\n\n' + mensaje;
            window.location.href = 'mailto:fabianameneiros7@gmail.com?subject=' + encodeURIComponent(tema) + '&body=' + encodeURIComponent(cuerpo);
        });
    }
});
