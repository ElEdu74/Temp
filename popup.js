// popup.js - Script para el popup de la extensión

document.addEventListener('DOMContentLoaded', function() {
    const ejecutarBtn = document.getElementById('ejecutar-funcion');
    const toggleBtn = document.getElementById('toggle-boton');
    const infoBtn = document.getElementById('info-pagina');
    const statusDiv = document.getElementById('status');

    // Función para mostrar status
    function mostrarStatus(mensaje, tipo = 'success') {
        statusDiv.textContent = mensaje;
        statusDiv.className = `status ${tipo}`;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }

    // Ejecutar función generar control
    ejecutarBtn.addEventListener('click', async function() {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const btn = document.getElementById('generador-control-btn');
                    if (btn) {
                        btn.click();
                        return 'Función ejecutada OK';
                    } else {
                        return 'Botón no encontrado en la página';
                    }
                }
            });
            
            mostrarStatus('Función ejecutada correctamente', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            mostrarStatus('Error al ejecutar la función', 'error');
        }
    });

    // Toggle mostrar/ocultar botón
    toggleBtn.addEventListener('click', async function() {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    const btn = document.getElementById('generador-control-btn');
                    if (btn) {
                        if (btn.style.display === 'none') {
                            btn.style.display = 'block';
                            return 'Botón mostrado';
                        } else {
                            btn.style.display = 'none';
                            return 'Botón ocultado';
                        }
                    } else {
                        return 'Botón no encontrado';
                    }
                }
            });
            
            mostrarStatus(result[0].result, 'success');
            
        } catch (error) {
            console.error('Error:', error);
            mostrarStatus('Error al cambiar visibilidad', 'error');
        }
    });

    // Obtener información de la página
    infoBtn.addEventListener('click', async function() {
        try {
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
            
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    return {
                        title: document.title,
                        url: window.location.href,
                        elements: document.querySelectorAll('*').length,
                        hasButton: !!document.getElementById('generador-control-btn')
                    };
                }
            });
            
            const info = result[0].result;
            const mensaje = `Título: ${info.title.substring(0, 30)}...\nElementos: ${info.elements}\nBotón: ${info.hasButton ? 'Presente' : 'Ausente'}`;
            mostrarStatus(mensaje, 'success');
            
        } catch (error) {
            console.error('Error:', error);
            mostrarStatus('Error al obtener información', 'error');
        }
    });

    // Información inicial
    mostrarStatus('Extensión lista para usar', 'success');
});
