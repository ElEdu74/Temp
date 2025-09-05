// content.js - Se ejecuta en cada página web
(function() {
    'use strict';
    
    // Evitar crear múltiples botones
    if (document.getElementById('generador-control-btn')) {
        return;
    }

    // Crear el botón
    const button = document.createElement('button');
    button.id = 'generador-control-btn';
    button.textContent = 'Generar Control';
    button.className = 'generador-control-button';
    
    // Función principal que se ejecutará al hacer click
    function generarControl() {
        console.log('Ejecutando función generar control...');
        
        // Aquí puedes personalizar la función según tus necesidades
        try {
            // Ejemplo de funcionalidad: obtener información de la página
            const pageInfo = {
                title: document.title,
                url: window.location.href,
                timestamp: new Date().toISOString(),
                elements: document.querySelectorAll('*').length
            };
            
            console.log('Información de la página:', pageInfo);
            
            // Mostrar una notificación visual
            mostrarNotificacion('Control generado exitosamente!');
            
            // Aquí puedes agregar más lógica específica
            // Por ejemplo: enviar datos a un servidor, procesar formularios, etc.
            
        } catch (error) {
            console.error('Error al generar control:', error);
            mostrarNotificacion('Error al generar control', 'error');
        }
    }
    
    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje, tipo = 'success') {
        const notification = document.createElement('div');
        notification.className = `generador-notification ${tipo}`;
        notification.textContent = mensaje;
        
        document.body.appendChild(notification);
        
        // Remover la notificación después de 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Agregar event listener al botón
    button.addEventListener('click', generarControl);
    
    // Posicionar el botón en la esquina superior derecha
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '10000';
    
    // Agregar el botón al DOM
    document.body.appendChild(button);
    
    console.log('Extensión Generador de Control cargada');
    
    // Opcional: Agregar funcionalidad de arrastrar el botón
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    button.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    function dragStart(e) {
        if (e.target === button) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
            
            if (e.target === button) {
                isDragging = true;
            }
        }
    }
    
    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            button.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }
    }
    
    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
})();