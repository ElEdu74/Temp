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
            generarControl2();
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







var titulo = "Cálculo de Intereses Resarcitorios y Punitorios";
var version = "2.08"
var dto0 = "Resarcitorios y Punitorios";
var dto1 = "Fecha de Vencimiento";
var dto2 = "Fecha de Inicio Demanda";
var dto3 = "Fecha de Pago del Capital";
var dto4 = "Importe del Capital";
var dto5 = "Fecha de Pago de Intereses";
var cl = "\r\n";
var fmin = "27/01/1988", fmax = "31/12/2099";
var xvto, xdem, xfpa, ximp, xfin;
var tres, tpun, tcap, tgen;
var hoy, vent, vd, lmax;
var totDifDias = 0;

var tdes = new Array();
var thas = new Array();
var cdes = new Array();
var chas = new Array();
var cimp = new Array();
var ctip = new Array();
var ctas = new Array();
var cdif = new Array();
var cint = new Array();





function generarControl2()
{

//	var iframes = document.querySelector("iframe"); //te da los Iframes de la pagina
    var iframes = document.querySelector("#panel");
    var iframeDocument = iframes.contentWindow.document; //Con esto tenemos el iframe
//    var mi_form = iframeDocument.getElementsByName("consulta")
    elem_nro_juicio = iframeDocument.getElementsByName("juicio");
	elem_anio_juicio = iframeDocument.getElementsByName("anio");
	nro_juicio = elem_nro_juicio[0].value;
	anio_juicio = elem_anio_juicio[0].value;
	mi_bbdd = "801" + nro_juicio + anio_juicio;

/*     forms = iframeDocument.getElementsByName("consulta")
    mi_form = forms[0]
    divs = mi_form.getElementsByTagName("div")
    mi_div = divs[1]
 */
    mi_div = iframeDocument.querySelector("body > div")
    mis_tr = mi_div.getElementsByTagName("tr")
    tr0 = mis_tr[0]
    cuit = tr0.getElementsByTagName("td")[1].textContent.substring(0,12)
    tr5 = mis_tr[5]
    contrib = tr5.getElementsByTagName("td")[1].textContent
    tr10 = mis_tr[10]
    monto_demanda = tr10.getElementsByTagName("td")[1].textContent

    mitr=iframeDocument.getElementById("Deuda" + mi_bbdd);
	mitr.style="";
	mistr=mitr.getElementsByTagName("tr");

	const separarString = (value) => value.split(/\r\n|\r|\n/, -1);

	impuestos = [];
	conceptos = [];
	subconceptos = [];
	montos = [];
	periodos = [];
	vencimientos = [];

	for (var i = 1; i < mistr.length - 1; i++) {
		for (var j = 0, col; col = mistr[i].cells[j]; j++) {
			if (j==0) {
				renglones = separarString(col.innerText);
				impu = renglones[0].trim();
				impuestos.push(impu);
				conceptos.push(renglones[1].trim());
				subconceptos.push(renglones[2].trim());
			}
			if (j==1) {
				montos.push(col.innerText.replace(",","."));
			}
			if (j==2) {
				renglones = separarString(col.innerText);
				periodos.push(renglones[0].replace("Período:","").trim());
				vencimientos.push(renglones[1].trim());
			}
		}
	}

	montosPago=[];
	fec_pago=[];
	tipo_pago=[];
	montosPagoInteResa=[];
	fec_pagoInteResa=[];
    tipo_pagoInteResa=[];
	montosPagoIntePuni=[];
	fec_pagoIntePuni=[];
	calculosInteResa=[];
	calculosIntePuni=[];
	for (var i = 0; i < impuestos.length; i++) {
		montosPago[i] = 0;
        fec_pago[i] = "";
        tipo_pago[i] = "";
		montosPagoInteResa[i]="";
		fec_pagoInteResa[i]="";
        tipo_pagoInteResa[i] = "";
		montosPagoIntePuni[i]="";
		fec_pagoIntePuni[i]="";
        calculosInteResa[i]="";
        calculosIntePuni[i]="";
    }

	mitr=iframeDocument.getElementById("PagosCapital" + mi_bbdd);
	if (mitr!=null) {
        mitr.style="";
		mistr=mitr.getElementsByTagName("tr");

		for (var i = 2; i < mistr.length; i++) {
			for (var j = 0, col; col = mistr[i].cells[j]; j++) {
				if (j==0) {
					renglones = separarString(col.innerText);
					impu = renglones[0].trim();
					conc = renglones[1].trim();
					subconc = renglones[2].trim();
					per_venc = renglones[renglones.length-1].trim();
					per_venc = per_venc.replace("Período:","");
					per_venc = per_venc.replace("-","\n");
					renglones2 = separarString(per_venc);
					per = renglones2[0].trim();
					venc = renglones2[1].trim();
				}
				if (j==1) {
					monto = col.innerText;
					for (var k = 0; k < impuestos.length; k++) {
						if(impu==impuestos[k] && conc==conceptos[k] && subconc==subconceptos[k] && per==periodos[k] && venc==vencimientos[k]){
							montosPago[k] = montosPago[k] + parseFloat(monto.replace(",","."));
                            // redondeo a dos decimales
                            montosPago[k] = Math.round(montosPago[k]*100)/100
						}
					}
				}
				if (j==2) {
					renglones = separarString(col.innerText);
					for (var k = 0; k < impuestos.length; k++) {
						if(impu==impuestos[k] && conc==conceptos[k] && subconc==subconceptos[k] && per==periodos[k] && venc==vencimientos[k]){
							fec_pago[k] = renglones[0].trim();
							tipo_pago[k] = renglones[3].replace("Tipo de Cancelación:","");
						}
					}
				}
			}
		}
	}

	mitr=iframeDocument.getElementById("PagosInteResa" + mi_bbdd);
	if (mitr!=null) {
        mitr.style="";
		mistr=mitr.getElementsByTagName("tr");

		for (var i = 2; i < mistr.length; i++) {
			for (var j = 0, col; col = mistr[i].cells[j]; j++) {
				if (j==0) {
					renglones = separarString(col.innerText);
					impu = renglones[0].trim();
					conc = renglones[1].trim();
					subconc = renglones[2].trim();
					per_venc = renglones[renglones.length-1].trim();
					per_venc = per_venc.replace("Período:","");
					per_venc = per_venc.replace("-","\n");
					renglones2 = separarString(per_venc);
					per = renglones2[0].trim();
					venc = renglones2[1].trim();
				}
				if (j==1) {
					monto = col.innerText;
					for (var k = 0; k < impuestos.length; k++) {
						if(impu==impuestos[k] && conc==conceptos[k] && subconc==subconceptos[k] && per==periodos[k] && venc==vencimientos[k]){
							montosPagoInteResa[k] = monto.replace(",",".");
						}
					}
				}
				if (j==2) {
					renglones = separarString(col.innerText);
					for (var k = 0; k < impuestos.length; k++) {
						if(impu==impuestos[k] && conc==conceptos[k] && subconc==subconceptos[k] && per==periodos[k] && venc==vencimientos[k]){
							fec_pagoInteResa[k] = renglones[0].trim();
							tipo_pagoInteResa[k] = renglones[3].replace("Tipo de Cancelación:","");
						}
					}
				}
			}
		}
	}

	mitr=iframeDocument.getElementById("Etapas" + mi_bbdd);
	mitr.style="";
	mistr=mitr.getElementsByTagName("tr");

	for (var i = 0; i < mistr.length; i++) {
        if (mistr[i].cells[0].innerText == "Expediente :"){
			exp = mistr[i].cells[1].innerText;
		}
        if (mistr[i].cells[0].innerText == "Agente Fiscal:"){
			ag_fiscal = mistr[i].cells[1].innerText;
		}
        if (mistr[i].cells[0].innerText == "Etapa - Subetapa"){
			fec_etapa = mistr[i+1].cells[1].innerText;
		}
	}

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

	html = '<table border="1" width="25%" cellspacing="0" cellpadding="1" style="font-family: Verdana; font-size: 8pt">';
	html += '<tr>    <th>Fecha</th>    <td>' + today + '</td></tr>';
	html += '<tr>    <th>Fecha Demanda</th>    <td>' + fec_etapa + '</td></tr>';
	html += '<tr>    <th>Monto</th>    <td>' + monto_demanda + '</td></tr>';
	html += "</table>";

	html += '<table border="1" width="25%" cellspacing="0" cellpadding="1" style="font-family: Verdana; font-size: 8pt">';
    html += "<tr><td>Boleta de Deuda: <b><br>" + mi_bbdd.substring(0, 3) + '/' + mi_bbdd.substring(3, 9) + '/' + mi_bbdd.substring(9, 13) + "</b> - Exp: " + exp + "</td></tr>"
    html += "<tr><td>Contribuyente: <br>" + cuit + " - " + contrib + '</td></tr>'
    html += "<tr><td>Agente Fiscal: <br>" + ag_fiscal + "</td></tr>" 
	html += "</table>";
	html += '<br><table border="1" width="100%" cellspacing="0" cellpadding="1" style="font-family: Verdana; font-size: 8pt">  <tr>    <th>Impuesto</th>    <th>Concepto</th>    <th>Subconcepto</th>  <th>Periodo</th>  <th>Vencimiento</th>  <th>Monto</th>  <th>Monto Pago Capítal</th>  <th>Fecha Pago Capítal</th>  <th>Cálculo Int.Res.</th>  <th>Monto Pago Int.Res.</th>  <th>Fecha Pago Int.Res.</th>    <th>Cálculo Int.Pun.</th>  <th>Monto Pago Int.Pun.</th>  <th>Fecha Pago Int.Pun.</th>  </tr>'
	for (var i = 0; i < impuestos.length; i++) {
        if (fec_pago[i]!=""){
            xvto = formatFecha(vencimientos[i]);
            xdem = formatFecha(fec_etapa);
            xfpa = formatFecha(fec_pago[i]);
            ximp = montos[i].replace(",",".");
            xfin = formatFecha(fec_pagoInteResa[i]);
            calculoInt = validar(1, xvto, xdem, xfpa, ximp, xfin);
            calculosInteResa[i] = calculoInt[0];
            if (calculoInt[1] <=0){
                calculosIntePuni[i] = "";
            } else {
               calculosIntePuni[i] = calculoInt[1];
            }
            if (sTOd(xfpa) < sTOd(xdem)){ //(fec_pago[i]<fec_etapa){ 
                // si fecha de pago es menor a fecha demanda, 
                // calculo int.res. se hace hasta fecha pago capital
                xdem = xfpa
                calculoInt = validar(1, xvto, xdem, xfpa, ximp, xfin);
                calculosInteResa[i] = calculoInt[0];
                calculosIntePuni[i] = "N/C Pago anterior a la demanda";
            }
            // Modif 13/09/23 - Sí corresponde calcular resarcitorios de resarcitorios
            // if (subconceptos[i]=="INTERESES RESARCITORIOS"){ //(fec_pago[i]<fec_etapa){ 
            //     // si subconcepto es "Intereses Resarcitorios" no corresponde calcular int.res. 
            //     calculosInteResa[i] = "N/C";
            // }
        }

		html += "<tr><td>" + impuestos[i] + "</td><td>" + conceptos[i] + "</td><td>" + subconceptos[i] + "</td>"
		html += "<td>" + periodos[i] + "</td>"
		html += "<td>" + vencimientos[i] + "</td>"
		html += "<td>" + montos[i] + "</td>"
        if (montosPago[i]==0){
            html += "<td style='background-color: #FF8866'></td>"
        } else {
            parseFloat(montosPago[k]) + parseFloat(monto.replace(",","."))
            if (montosPago[i] >= montos[i].replace(",",".")){
                html += "<td style='background-color: #AAFFAA'>" + montosPago[i] + "</td>"
            } else {
                html += "<td style='background-color: #FF8866'>" + montosPago[i] + "</td>"
            }
        }
		html += "<td>" + fec_pago[i] + "<br>" + tipo_pago[i] + "</td>"
		html += "<td>" + calculosInteResa[i] + "</td>"
        if (montosPagoInteResa[i]==0){
            if (calculosInteResa[i] == "N/C"){
                html += "<td style='background-color: #AAFFAA'>" + montosPagoInteResa[i] + "</td>"
            } else {
                html += "<td style='background-color: #FF8866'></td>"
            }
        } else {
            parseFloat(montosPagoInteResa[k]) + parseFloat(monto.replace(",","."))
            if ((montosPagoInteResa[i] >= calculosInteResa[i])){
                html += "<td style='background-color: #AAFFAA'>" + montosPagoInteResa[i] + "</td>"
            } else {
                html += "<td style='background-color: #FF8866'>" + montosPagoInteResa[i] + "</td>"
            }
        }
        html += "<td>" + fec_pagoInteResa[i] + "<br>" + tipo_pagoInteResa[i] + "</td>"
		html += "<td>" + calculosIntePuni[i] + "</td>"
        html += "<td>" + montosPagoIntePuni[i] + "</td>"
        html += "<td>" + fec_pagoIntePuni[i] + "</td>"
		html += "</td></tr>"
	}
	html += "</table>";

	html += '<br><br><br><table border="1" width="100" cellspacing="0" cellpadding="1" style="font-family: Verdana; font-size: 8pt">';
	html += '<tr>    <td style="text-align:center;" height="30">   AFIP   </td>    </tr>';
	html += '<tr>    <td height="30">    </td>    </tr>';
	html += '<tr>    <td height="30">    </td>    </tr>';
	html += '<tr>    <td height="30">   </td>    </tr>';
	html += "</table>";

    //	iframeDocument.body.innerHTML+=html;

	var myWindow = window.open("", "", "width=800, height=400");
	myWindow.document.write(html);
//	myWindow.document.execCommand('print', true, null);
}



function validar(nmod, xvto, xdem, xfpa, ximp, xfin) {

	// dat1 = document.frmCom.fvenci;
    // dat2 = document.frmCom.fdeman;
    // dat3 = document.frmCom.fpagoc;
    // dat4 = document.frmCom.icapit;
    // dat5 = document.frmCom.fpagoi;

    //dat4.value = redondeo(dat4.value, 2);

    // xvto = "06/06/2023"; //dat1.value;
    // xdem = "05/07/2023"; //dat2.value;
    // xfpa = "05/08/2023"; //dat3.value;
    // ximp = "250663.18"; //dat4.value;
    // xfin = ""; //dat5.value;

    lmax = 0;
    tres = 0;
    tpun = 0;
    tcap = 0;
    tgen = 0;

    hoy = new Date();
    dia = padl(hoy.getDate(), 2, "0");
    mes = padl(hoy.getMonth() + 1, 2, "0");
    anio = padl(hoy.getFullYear(), 4, "0");
    hoy = dia + "/" + mes + "/" + anio;

    tasas(1);
    resu = calc(xvto, xdem, ximp, "Res", 1);
    res0 = resu.split(",");
    tres = res0[0] * 1;
    lmax = res0[1] * 1;
    if (tres > 0) tgen += tres;
    tasas(2);
    resu = calc(xdem, xfpa, ximp, "Pun", lmax);
    res1 = resu.split(",");
    tpun = res1[0] * 1;
    lmax = res1[1] * 1;
    if (tpun > 0) tgen += tpun;
    if (esFecha(xfin) && (sTOd(xfin) > sTOd(xfpa))) {
        resu = calc(xfpa, xfin, tres, "Cap", lmax);
        res2 = resu.split(",");
        tcap = res2[0] * 1;
        lmax = res2[1] * 1;
        if (tcap > 0) tgen += tcap;
    }
    for (x = 1; x < lmax; x++) {
        cdes[x] = dTOs(diaMas(cdes[x]));
        chas[x] = dTOs(chas[x]);
        ctas[x] = ctas[x].replace(".", ",");
    }
	resp=[tres,tpun];
	return(resp);
    // cabe();
    // if (nmod == 2) deta();
    // pie();
}

function formatFecha(fecha){
	fformat = fecha;
	fsplit = fecha.split("/");
	if (fsplit.length==3){
		fformat = fsplit[0].padStart(2, '0') + "/" + fsplit[1].padStart(2, '0') + "/" + fsplit[2];
	}
	return fformat;
}

function fechaTasaResar(fini) {
    var fout = tasasRes[0].f;
    for (i = 0; i < tasasRes.length; i++) {
        if (fini >= tasasRes[i].f) {
            if ((i + 1) == tasasRes.length) {
                fout = tasasRes[i].f;
                return fout;
            }
            if (fini < tasasRes[i + 1].f) {
                fout = tasasRes[i].f;
                return fout;
            }
        }
    }
    return fout;
}

function fechaTasaPuni(fini) {
    var fout = tasasPun[0].f;
    for (i = 0; i < tasasPun.length; i++) {
        if (fini >= tasasPun[i].f) {
            if ((i + 1) == tasasPun.length) {
                fout = tasasPun[i].f;
                return fout;
            }
            if (fini < tasasPun[i + 1].f) {
                fout = tasasPun[i].f;
                return fout;
            }
        }
    }
    return fout;
}

function difFechaV2(fMayor, fMenor) {
    var fM = fMayor.toString();
    var fMe = fMenor.toString();
    var dhas = fM.substring(0, 4) + "/" + fM.substring(4, 6) + "/" + fM.substring(6, 8);
    var ddes = fMe.substring(0, 4) + "/" + fMe.substring(4, 6) + "/" + fMe.substring(6, 8);
    var fechaInicio = new Date(ddes).getTime();
    var fechaFin = new Date(dhas).getTime();

    var diff = fechaFin - fechaInicio;

    return (diff / (1000 * 60 * 60 * 24));

}

function esEntero(num1) {
    var dig;
    for (var x = 0; x < num1.length; x++) {
        dig = num1.charAt(x);
        if (dig < "0" || dig > "9") return false;
    }
    return true;
}

function esNumero(num2) {
    var nums = "0123456789.";
    var coma = ".";
    var ok = true;
    if (num2.length == 0) ok = false;
    if (num2.indexOf(coma) !== num2.lastIndexOf(coma)) ok = false;
    for (var x = 0; x < num2.length && ok == true; x++) {
        if (nums.indexOf(num2.charAt(x)) == -1) ok = false;
    }
    return ok;
}

function redondeo(num3, prec) {
    var ceros = Number("1e" + prec);
    var part = String(Math.round(num3 * ceros) / ceros).split(".");
    if (part[0] == "") part[0] = "0";
    if (!part[1]) part[1] = "";
    while (part[1].length < prec) part[1] += "0";
    return part.join(".");
}

function esFecha(fec1) {
    if (fec1.indexOf("/") == -1) return false;
    var f1 = fec1.split("/");
    if (!f1[0] || !f1[1] || !f1[2]) return false;
    if (!esEntero(f1[0]) || !esEntero(f1[1]) || !esEntero(f1[2])) return false;
    var d1 = f1[0] * 1;
    var m1 = f1[1] * 1 - 1;
    var a1 = f1[2] * 1;
    var f2 = new Date(a1, m1, d1);
    var d2 = f2.getDate();
    var m2 = f2.getMonth();
    var a2 = f2.getFullYear();
    if (d1 == d2 && m1 == m2 && a1 == a2) {
        return true;
    } else return false;
}

function sTOd(fec2) {
    if (esFecha(fec2)) {
        var f3 = fec2.split("/");
        return parseInt(f3[2] + "" + f3[1] + "" + f3[0], 10);
    } else return 0;
}

function dTOs(fec3) {
    var f4 = "" + fec3;
    var a4 = f4.substr(0, 4);
    var m4 = f4.substr(4, 2);
    var d4 = f4.substr(6, 2);
    var f5 = d4 + "/" + m4 + "/" + a4;
    if (esFecha(f5)) return f5;
    else return "";
}

function diaMenos(fec4) {
    var f6 = "" + fec4;
    var a5 = f6.substr(0, 4) * 1;
    var m5 = f6.substr(4, 2) * 1;
    var d5 = f6.substr(6, 2) * 1 - 1;
    if (d5 <= 0) {
        d5 = 31;
        m5 -= 1;
        if (m5 <= 0) {
            m5 = 12;
            a5 -= 1;
        }
    }
    while (!esFecha(dTOs(a5 * 10000 + m5 * 100 + d5))) {
        d5 -= 1;
    }
    return a5 * 10000 + m5 * 100 + d5;
}

function diaMas(fec5) {
    var f7 = "" + fec5;
    var a6 = f7.substr(0, 4) * 1;
    var m6 = f7.substr(4, 2) * 1;
    var d6 = f7.substr(6, 2) * 1 + 1;
    if (!esFecha(dTOs(a6 * 10000 + m6 * 100 + d6))) {
        d6 = 1;
        m6 += 1;
        if (m6 > 12) {
            m6 = 1;
            a6 += 1;
        }
    }
    return a6 * 10000 + m6 * 100 + d6;
}

function difFecha(fec7, fec6) {
    var xf7 = "" + fec7;
    var xf6 = "" + fec6;
    var ax7 = xf7.substr(0, 4) * 1;
    var mx7 = xf7.substr(4, 2) * 1;
    var dx7 = xf7.substr(6, 2) * 1;
    var ax6 = xf6.substr(0, 4) * 1;
    var mx6 = xf6.substr(4, 2) * 1;
    var dx6 = xf6.substr(6, 2) * 1;
    meses = (ax7 - ax6) * 12 + mx7 - mx6;
    if (dx6 > dx7) {
        meses -= 1;
        dias = difDias(fec7, sumMeses(fec6, meses));
    } else dias = dx7 - dx6;
    return meses + "," + dias;
}

function sumMeses(fec8, mes8) {
    var xf8 = "" + fec8;
    var xm8 = mes8;
    var ax8 = xf8.substr(0, 4) * 1;
    var mx8 = xf8.substr(4, 2) * 1;
    var dx8 = xf8.substr(6, 2) * 1;
    ax8 += parseInt(xm8 / 12);
    mx8 += xm8 % 12;
    if (mx8 > 12) {
        mx8 -= 12;
        ax8 += 1;
    }
    while (!esFecha(dTOs(ax8 * 10000 + mx8 * 100 + dx8))) {
        dx8 -= 1;
    }
    return ax8 * 10000 + mx8 * 100 + dx8;
}

function difDias(fec0, fec9) {
    var xf0 = "" + fec0;
    var xf9 = "" + fec9;
    var ax0 = xf0.substr(0, 4) * 1;
    var mx0 = xf0.substr(4, 2) * 1;
    var dx0 = xf0.substr(6, 2) * 1;
    var ax9 = xf9.substr(0, 4) * 1;
    var mx9 = xf9.substr(4, 2) * 1;
    var dx9 = xf9.substr(6, 2) * 1;
    mes9 = (ax0 - ax9) * 12 + mx0 - mx9;
    dia9 = 0;
    if (mes9 = 0) dia9 = dx0 - dx9;
    if (mes9 = 1) {
        dia9 += 1;
        dx9 += 1;
        while (esFecha(dTOs(ax9 * 10000 + mx9 * 100 + dx9))) {
            dia9 += 1;
            dx9 += 1;
        }
        mx9 += 1;
        if (mx9 > 12) {
            ax9 += 1;
            mx9 -= 12;
        }
        dx9 = 1;
        fecn = ax9 * 10000 + mx9 * 100 + dx9;
        while (fec0 > fecn) {
            dia9 += 1;
            dx9 += 1;
            fecn = ax9 * 10000 + mx9 * 100 + dx9;
        }
    }
    if (mes9 > 1) {
        dia9 += (mes9 - 1) * 30;
        dia9 += difDias(fec0, sumMeses(fec9, mes9 - 1));
    }
    return dia9;
}

function padl(str1, rep1, chr1) {
    var st1 = trim("" + str1);
    while (st1.length < rep1) st1 = chr1 + st1;
    return st1;
}

function trim(str2) {
    var st2 = "" + str2;
    var ini = 0;
    while (ini < st2.length && st2.charAt(ini) == ' ') {
        ini += 1;
    }
    var fin = st2.length;
    while (fin > 0 && st2.charAt(fin - 1) == ' ') {
        fin -= 1;
    }
    return st2.substring(ini, fin);
}

function puntos(numn) {
    var nn0 = redondeo(numn * 1, 2).split(".");
    var ln0 = nn0[0].length;
    var nn1 = "", px = 0, x;
    if (ln0 > 3) {
        for (x = ln0 - 1; x >= 0; x--) {
            if (px > 0 && (px % 3) == 0) nn1 = "." + nn1;
            nn1 = nn0[0].charAt(x) + nn1;
            px += 1;
        }
    } else nn1 = nn0[0];
    return nn1 + "," + nn0[1];
}

function soloEntero() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) {
        return false;
    }
    return true;
}

function soloFecha(vfec) {
    if (event.keyCode < 47 || event.keyCode > 57) return false;
    if (event.keyCode == 47 && (vfec.indexOf("/") !== vfec.lastIndexOf("/"))) return false;
    var auxf = vfec.split("/");
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        if (auxf[0] && !auxf[1] && !auxf[2]) {
            if ((!esEntero(auxf[0]) || auxf[0].length >= 2) && vfec.indexOf("/") == -1) return false;
        }
        if (auxf[1] && !auxf[2]) {
            if ((!esEntero(auxf[1]) || auxf[1].length >= 2) && vfec.indexOf("/") == vfec.lastIndexOf("/")) return false;
        }
    }
    if (event.keyCode == 47) {
        if (!auxf[0] || auxf[0].length < 2) return false;
        if (vfec.indexOf("/") !== -1 && (!auxf[1] || auxf[1].length < 2)) return false;
    }
}

function soloNumero(vnum, nent, nfra) {
    if (event.keyCode !== 46 && ((event.keyCode < 48) || (event.keyCode > 57))) return false;
    if (event.keyCode == 46 && (vnum.indexOf(".") !== -1)) return false;
    if (event.keyCode !== 46 && vnum.length >= nent && vnum.indexOf(".") == -1) return false;
    var auxn = vnum.split(".");
    if (auxn[1] && auxn[1].length >= nfra) return false;
    return true;
}

//FUNCION CALC VIEJA
function calc(fex1, fex2, impx, tipx, inix) {
    var mini = false;
    var maxi = false;
    var f001 = sTOd(fex1);
    var f002 = sTOd(fex2);
    var xind = tdes.length;
    var linx = inix;
    var x;
    for (x = 1; x < xind; x++) {
        todo = true;
        if (!mini) {
            if ((f001 >= tdes[x]) && (f001 <= thas[x])) {
                cdes[linx] = f001;
                mini = true;
                todo = false;
            }
        }
        if (mini) {
            if (f002 <= thas[x]) {
                if (todo) {
                    cdes[linx] = tdes[x];
                }
                chas[linx] = f002;
                maxi = true;
            }
            else {
                if (!todo) {
                    chas[linx] = thas[x];
                }
                else {
                    cdes[linx] = tdes[x];
                    chas[linx] = thas[x];
                }
            }
            ctas[linx] = tasa[x];
            linx += 1;
        }
        if (mini && maxi) break;
    }

    var totx = 0;
    for (x = inix; x < linx; x++) {
        dif0 = difFecha(chas[x], cdes[x]).split(",");
        mmm = parseInt(dif0[0]);
        ddd = parseInt(dif0[1]);
        cdif[x] = mmm * 30 + ddd;
        totDifDias += cdif[x];
        if (cdif[x] > 1) cdif[x] = cdif[x] + " dias";
        else cdif[x] = cdif[x] + " dia";
        cimp[x] = impx;
        ctip[x] = tipx;
        if (tipx == "Cap") {
            tasasRes = [];
            tasas(1);
            var temp = diaMas(cdes[x]);
            var ftasa = fechaTasaResar(temp);
            var t = tasasRes.find(x => x.f === ftasa).t;
            cint[x] = redondeo((mmm + (ddd / 30)) * redondeo((t / 30) * 30, 6) * impx / 100, 2);
            var stringTasa = "";
            stringTasa = redondeo((t / 30), 6).toString();
            stringTasa = stringTasa.replace(",", ".");
            ctas[x] = stringTasa;

        }
        else {
            cint[x] = redondeo((mmm + (ddd / 30)) * ctas[x] * impx / 100, 2);
            ctas[x] = redondeo(ctas[x] / 30, 6);

        }
        totx += cint[x] * 1;
    }
    return redondeo(totx, 2) + "," + linx;
}


//Funcion CALC VIGENTE MAYO 2019
//function calc(fex1, fex2, impx, tipx, inix) {
//    var mini = false;
//    var maxi = false;
//    var f001 = sTOd(fex1);
//    var f002 = sTOd(fex2);
//    var xind = tdes.length;
//    var linx = inix;
//    var x;
//    for (x = 1; x < xind; x++) {
//        todo = true;
//        if (!mini) {
//            if ((f001 >= tdes[x]) && (f001 <= thas[x])) {
//                cdes[linx] = f001;
//                mini = true;
//                todo = false;
//            }
//        }
//        if (mini) {
//            if (f002 <= thas[x]) {
//                if (todo) {
//                    cdes[linx] = tdes[x];
//                }
//                chas[linx] = f002;
//                maxi = true;
//            }
//            else {
//                if (!todo) {
//                    chas[linx] = thas[x];
//                }
//                else {
//                    cdes[linx] = tdes[x];
//                    chas[linx] = thas[x];
//                }
//            }
//            ctas[linx] = tasa[x];
//            linx += 1;
//        }
//        if (mini && maxi) break;
//    }

//    var totx = 0;
//    for (x = inix; x < linx; x++) {
//        dif0 = difFecha(chas[x], cdes[x]).split(",");
//        mmm = parseInt(dif0[0]);
//        ddd = parseInt(dif0[1]);
//        cdif[x] = difFechaV2(chas[x], cdes[x]);
//        //cdif[x] = mmm*30+ddd;
//        if (cdif[x] > 1) cdif[x] = cdif[x] + " dias";
//        else cdif[x] = cdif[x] + " dia";
//        cimp[x] = impx;
//        ctip[x] = tipx;
//        if (tipx == "Cap") {
//            tasasRes = [];
//            tasas(1);
//            var temp = diaMas(cdes[x]);
//            var ftasa = fechaTasaResar(temp);
//            var t = tasasRes.find(x => x.f === ftasa).t;
//            //cint[x] = redondeo((mmm + (ddd / 30)) * redondeo((t / 30) * 30, 6) * impx / 100, 2);
//            cint[x] = redondeo(impx * redondeo((t / 30), 6) * difFechaV2(chas[x], cdes[x]) / 100, 2);
//            var stringTasa = "";
//            stringTasa = redondeo((t / 30), 6).toString();
//            stringTasa = stringTasa.replace(",", ".");
//            ctas[x] = stringTasa;

//        }
//        else if (tipx == "Res") {
//            //cint[x] = redondeo((mmm + (ddd / 30)) * ctas[x] * impx / 100, 2);
//            var temp = diaMas(cdes[x]);
//            var ftasa = fechaTasaResar(temp);
//            var t = tasasRes.find(x => x.f === ftasa).t;
//            cint[x] = redondeo(impx * redondeo((t / 30), 6) * difFechaV2(chas[x], cdes[x]) / 100, 2);
//            ctas[x] = redondeo(ctas[x] / 30, 6);

//        } else { // if (tipx == "Pun")
//            var temp = diaMas(cdes[x]);
//            var ftasa = fechaTasaPuni(temp);
//            var t = tasasPun.find(x => x.f === ftasa).t;
//            cint[x] = redondeo(impx * redondeo((t / 30), 6) * difFechaV2(chas[x], cdes[x]) / 100, 2);
//            ctas[x] = redondeo(ctas[x] / 30, 6);

//        }
//        totx += cint[x] * 1;
//    }
//    return redondeo(totx, 2) + "," + linx;
//}

function cabe() {
    ca0 = '            <td><p><font face="Arial, Helvetica, sans-serif" size="2"><b>';
    ca1 = '</b></font></p></td>' + cl;
    ca2 = '          <tr>' + cl;
    ca3 = '          </tr>' + cl;
    ca4 = '<p><b><font face="Arial, Helvetica, sans-serif" color="#000000" size="3">';
    ca5 = '</font></b></p></td>' + cl;
    ca8 = '    <tr>' + cl;
    ca9 = '    </tr>' + cl;
    vent = window.open("", "", "toolbar=yes, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width=700, height=450, top=0, left=0");
    vd = vent.document;
    vent.focus();
    vd.open();
    vd.write('<html>' + cl);
    vd.write('<head>' + cl);
    vd.write('  <title>' + titulo + '</title>' + cl);
    vd.write('</head>' + cl);
    vd.write('<body bgcolor="#FFFFFF">' + cl);
    vd.write('  <center>' + cl);
    vd.write('  <table width="640">' + cl);
    vd.write(ca8);
    vd.write('      <td align=left>' + ca4 + '<img name="ppal_arrib_r1_c3_2" src="//www.afip.gob.ar/sitio/images/afip.png" width="90" height="30" border="0" style="vertical-align: middle; margin-right: 10px;">' + titulo + ca5);
    vd.write('      <td align=right>' + ca4 + hoy + ca5);
    vd.write(ca9);
    vd.write('  </table>' + cl);
    vd.write('  <p style="line-height: 20%; margin: 0">&nbsp;</p>' + cl);
    vd.write('  <table border="1" width="640" bordercolor="#E6E8F4" cellspacing="0">' + cl);
    vd.write(ca8);
    vd.write('      <td colspan="6" bgcolor="#D2D7EC">' + cl); // modificado colspan de 7 a 6
    vd.write('        <table cellspacing="0">' + cl);
    vd.write(ca2);
    vd.write(ca0 + 'Tipo de cálculo' + ca1);
    vd.write(ca0 + ': Intereses RESARCITORIOS y PUNITORIOS' + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto1 + ca1);
    vd.write(ca0 + ': ' + xvto + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto2 + ca1);
    vd.write(ca0 + ': ' + xdem + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto3 + ca1);
    vd.write(ca0 + ': ' + xfpa + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto4 + ca1);
    vd.write(ca0 + ': ' + puntos(ximp) + ca1);
    vd.write(ca3);
    if (esFecha(xfin) && (sTOd(xfin) > sTOd(xfpa))) {
        vd.write(ca2);
        vd.write(ca0 + dto5 + ca1);
        vd.write(ca0 + ': ' + xfin + ca1);
        vd.write(ca3);
    }
    vd.write('        </table>' + cl);
    vd.write('      </td>' + cl);
    vd.write(ca9);
    vd.write(ca8);
    vd.write('      <th align="center" colspan="5">' + cl); // modificado de 7 a 5
    vd.write('        <p style="line-height: 25%; margin: 0">&nbsp;</p>' + cl);
    vd.write('      </th>' + cl);
    vd.write(ca9);
}

function deta() {
    de0 = '      <th align="center" width="';
    de1 = '" bgcolor="#D2D7EC"><font face="MS Sans Serif" size="2">';
    de2 = '</font></th>' + cl;
    de3 = '      <td align="right" bgcolor="#A0C4E7"><font face="MS Sans Serif" size="2">';
    de4 = '</font></td>' + cl;
    de5 = '    <tr height="25">' + cl;
    de6 = '    </tr>' + cl;
    de7 = '<center>';
    vd.write(de5);
    vd.write(de0 + '12%' + de1 + 'Desde' + de2);
    vd.write(de0 + '12%' + de1 + 'Hasta' + de2);
    vd.write(de0 + '19%' + de1 + 'Importe' + de2);
    vd.write(de0 + ' 7%' + de1 + 'Tipo' + de2);
    vd.write(de0 + '11%' + de1 + 'Tasa %' + de2);
    //vd.write(de0 + '14%' + de1 + 'Diferencia' + de2); //Eliminar diferencia de días
    vd.write(de0 + '25%' + de1 + 'Intereses' + de2);
    vd.write(de6);
    for (x = 1; x < lmax; x++) {
        vd.write(de5);
        vd.write(de3 + de7 + cdes[x] + de7 + de4);
        vd.write(de3 + de7 + chas[x] + de7 + de4);
        vd.write(de3 + puntos(cimp[x]) + de4);
        vd.write(de3 + de7 + ctip[x] + de7 + de4);
        vd.write(de3 + ctas[x] + de4);
        //vd.write(de3 + cdif[x] + de4); //Eliminar diferencia de días
        vd.write(de3 + puntos(cint[x]) + de4);
        vd.write(de6);
    }
}

function pie() {
    p0 = '    <tr height="22">' + cl;
    p1 = '      <td colspan="5" align="right" bgcolor="#E6E8F4"><font face="MS Sans Serif" size="2">Total '; //colspan de 6 a 5
    p2 = '</font></td>' + cl;
    p3 = '      <td align="right" bgcolor="#D2D7EC" width="25%"><font face="MS Sans Serif" size="2"><b>';
    p4 = '</b></font></td>' + cl;
    p5 = '    </tr>' + cl;
    if (tres > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Resarcitorios' + p2);
        vd.write(p3 + puntos(tres) + p4);
        vd.write(p5);
    }
    if (tpun > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Punitorios' + p2);
        vd.write(p3 + puntos(tpun) + p4);
        vd.write(p5);
    }
    if (tcap > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Capitalizados' + p2);
        vd.write(p3 + puntos(tcap) + p4);
        vd.write(p5);
    }
    if (totDifDias > 0) {
        vd.write(p0);
        vd.write(p1 + ' de días' + p2);
        vd.write(p3 + totDifDias + p4);
        vd.write(p5);
    }
    if (tgen > 0) {
        vd.write(p0);
        vd.write(p1 + 'General' + p2);
        vd.write(p3 + puntos(tgen) + p4);
        vd.write(p5);
    }
    vd.write('  </table>' + cl);
    vd.write('</body>' + cl);
    vd.write('<html>' + cl);
    vd.close();
}








var fecha = new Array();
var tasa = new Array();
var tasasRes = [];
var tasasPun = [];
function tasas(tipo) {
   if (tipo == 1) {
fecha[1] = '01/01/1901'; tasa[1] = 2;
fecha[2] = '24/07/1990'; tasa[2] = 1.5;
fecha[3] = '29/08/1990'; tasa[3] = 1.5;
fecha[4] = '10/09/1990'; tasa[4] = 15;
fecha[5] = '02/04/1991'; tasa[5] = 7;
fecha[6] = '31/08/1991'; tasa[6] = 4;
fecha[7] = '01/12/1991'; tasa[7] = 3;
fecha[8] = '01/12/1996'; tasa[8] = 2;
fecha[9] = '03/04/1998'; tasa[9] = 2;
fecha[10] = '01/10/1998'; tasa[10] = 3;
fecha[11] = '01/07/2002'; tasa[11] = 4;
fecha[12] = '01/02/2003'; tasa[12] = 3;
fecha[13] = '01/06/2004'; tasa[13] = 2;
fecha[14] = '01/09/2004'; tasa[14] = 1.5;
fecha[15] = '01/07/2006'; tasa[15] = 2;
fecha[16] = '01/01/2011'; tasa[16] = 3;
fecha[17] = '01/03/2019'; tasa[17] = 4.5;
fecha[18] = '01/04/2019'; tasa[18] = 3.76;
fecha[19] = '01/07/2019'; tasa[19] = 4.73;
fecha[20] = '01/08/2019'; tasa[20] = 4.73;
fecha[21] = '01/10/2019'; tasa[21] = 5.34;
fecha[22] = '01/01/2020'; tasa[22] = 3.6;
fecha[23] = '01/04/2020'; tasa[23] = 2.5;
fecha[24] = '01/07/2020'; tasa[24] = 2.76;
fecha[25] = '01/10/2020'; tasa[25] = 3.02;
fecha[26] = '01/01/2021'; tasa[26] = 3.35;
fecha[27] = '01/04/2021'; tasa[27] = 3.35;
fecha[28] = '01/07/2021'; tasa[28] = 3.35;
fecha[29] = '01/10/2021'; tasa[29] = 3.35;
fecha[30] = '01/01/2022'; tasa[30] = 3.35;
fecha[31] = '01/04/2022'; tasa[31] = 3.72;
fecha[32] = '01/07/2022'; tasa[32] = 4.25;
fecha[33] = '01/09/2022'; tasa[33] = 5.91;
fecha[34] = '01/02/2024'; tasa[34] = 15.27;
fecha[35] = '01/04/2024'; tasa[35] = 12.07;
fecha[36] = '01/06/2024'; tasa[36] = 6.41;
fecha[37] = '01/08/2024'; tasa[37] = 6.41;
fecha[38] = '01/10/2024'; tasa[38] = 6.41;
fecha[39] = '01/12/2024'; tasa[39] = 7.47;
for (i = 1; i < fecha.length; i++)
{
tasasRes.push({
f: sTOd(fecha[i]),
t: tasa[i]
});
}
 } else {
fecha[1] = '01/01/1901'; tasa[1] = 3;
fecha[2] = '24/07/1990'; tasa[2] = 3;
fecha[3] = '29/08/1990'; tasa[3] = 2.25;
fecha[4] = '10/09/1990'; tasa[4] = 20;
fecha[5] = '02/04/1991'; tasa[5] = 10.5;
fecha[6] = '31/08/1991'; tasa[6] = 6;
fecha[7] = '01/12/1991'; tasa[7] = 4.5;
fecha[8] = '01/12/1996'; tasa[8] = 3;
fecha[9] = '03/04/1998'; tasa[9] = 3;
fecha[10] = '01/10/1998'; tasa[10] = 4;
fecha[11] = '01/07/2002'; tasa[11] = 6;
fecha[12] = '01/02/2003'; tasa[12] = 4;
fecha[13] = '01/06/2004'; tasa[13] = 3;
fecha[14] = '01/09/2004'; tasa[14] = 2.5;
fecha[15] = '01/07/2006'; tasa[15] = 3;
fecha[16] = '01/01/2011'; tasa[16] = 4;
fecha[17] = '01/03/2019'; tasa[17] = 5.6;
fecha[18] = '01/04/2019'; tasa[18] = 4.61;
fecha[19] = '01/07/2019'; tasa[19] = 5.76;
fecha[20] = '01/08/2019'; tasa[20] = 5.76;
fecha[21] = '01/10/2019'; tasa[21] = 6.49;
fecha[22] = '01/01/2020'; tasa[22] = 4.41;
fecha[23] = '01/04/2020'; tasa[23] = 3.08;
fecha[24] = '01/07/2020'; tasa[24] = 3.39;
fecha[25] = '01/10/2020'; tasa[25] = 3.71;
fecha[26] = '01/01/2021'; tasa[26] = 4.11;
fecha[27] = '01/04/2021'; tasa[27] = 4.11;
fecha[28] = '01/07/2021'; tasa[28] = 4.11;
fecha[29] = '01/10/2021'; tasa[29] = 4.11;
fecha[30] = '01/01/2022'; tasa[30] = 4.11;
fecha[31] = '01/04/2022'; tasa[31] = 4.56;
fecha[32] = '01/07/2022'; tasa[32] = 5.19;
fecha[33] = '01/09/2022'; tasa[33] = 7.37;
fecha[34] = '01/02/2024'; tasa[34] = 17.62;
fecha[35] = '01/04/2024'; tasa[35] = 13.93;
fecha[36] = '01/06/2024'; tasa[36] = 7.39;
fecha[37] = '01/08/2024'; tasa[37] = 7.39;
fecha[38] = '01/10/2024'; tasa[38] = 7.39;
fecha[39] = '01/12/2024'; tasa[39] = 8.62;
for (i = 1; i < fecha.length; i++)
{
tasasPun.push({
f: sTOd(fecha[i]),
t: tasa[i]
});
}
   }
 var x, y = fecha.length;
 for (x = 1; x < y; x++) { 
   tdes[x] = sTOd(fecha[x]);
   if (x > 1){
    thas[x - 1] = diaMenos(tdes[x]);
    tdes[x] = thas[x - 1];
   }
 }
 thas[y - 1] = sTOd(fmax);
}


// *** Actualizado: Jueves 29/06/2006 *** //
var titulo = "Cálculo de Intereses Resarcitorios y Punitorios";
var version = "2.08"
var dto0 = "Resarcitorios y Punitorios";
var dto1 = "Fecha de Vencimiento";
var dto2 = "Fecha de Inicio Demanda";
var dto3 = "Fecha de Pago del Capital";
var dto4 = "Importe del Capital";
var dto5 = "Fecha de Pago de Intereses";
var cl = "\r\n";
var fmin = "27/01/1988", fmax = "31/12/2099";
var xvto, xdem, xfpa, ximp, xfin;
var tres, tpun, tcap, tgen;
var hoy, vent, vd, lmax;
var totDifDias = 0;

var tdes = new Array();
var thas = new Array();
var cdes = new Array();
var chas = new Array();
var cimp = new Array();
var ctip = new Array();
var ctas = new Array();
var cdif = new Array();
var cint = new Array();


function fechaTasaResar(fini) {
    var fout = tasasRes[0].f;
    for (i = 0; i < tasasRes.length; i++) {
        if (fini >= tasasRes[i].f) {
            if ((i + 1) == tasasRes.length) {
                fout = tasasRes[i].f;
                return fout;
            }
            if (fini < tasasRes[i + 1].f) {
                fout = tasasRes[i].f;
                return fout;
            }
        }
    }
    return fout;
}

function fechaTasaPuni(fini) {
    var fout = tasasPun[0].f;
    for (i = 0; i < tasasPun.length; i++) {
        if (fini >= tasasPun[i].f) {
            if ((i + 1) == tasasPun.length) {
                fout = tasasPun[i].f;
                return fout;
            }
            if (fini < tasasPun[i + 1].f) {
                fout = tasasPun[i].f;
                return fout;
            }
        }
    }
    return fout;
}

function difFechaV2(fMayor, fMenor) {
    var fM = fMayor.toString();
    var fMe = fMenor.toString();
    var dhas = fM.substring(0, 4) + "/" + fM.substring(4, 6) + "/" + fM.substring(6, 8);
    var ddes = fMe.substring(0, 4) + "/" + fMe.substring(4, 6) + "/" + fMe.substring(6, 8);
    var fechaInicio = new Date(ddes).getTime();
    var fechaFin = new Date(dhas).getTime();

    var diff = fechaFin - fechaInicio;

    return (diff / (1000 * 60 * 60 * 24));

}

function esEntero(num1) {
    var dig;
    for (var x = 0; x < num1.length; x++) {
        dig = num1.charAt(x);
        if (dig < "0" || dig > "9") return false;
    }
    return true;
}

function esNumero(num2) {
    var nums = "0123456789.";
    var coma = ".";
    var ok = true;
    if (num2.length == 0) ok = false;
    if (num2.indexOf(coma) !== num2.lastIndexOf(coma)) ok = false;
    for (var x = 0; x < num2.length && ok == true; x++) {
        if (nums.indexOf(num2.charAt(x)) == -1) ok = false;
    }
    return ok;
}

function redondeo(num3, prec) {
    var ceros = Number("1e" + prec);
    var part = String(Math.round(num3 * ceros) / ceros).split(".");
    if (part[0] == "") part[0] = "0";
    if (!part[1]) part[1] = "";
    while (part[1].length < prec) part[1] += "0";
    return part.join(".");
}

function esFecha(fec1) {
    if (fec1.indexOf("/") == -1) return false;
    var f1 = fec1.split("/");
    if (!f1[0] || !f1[1] || !f1[2]) return false;
    if (!esEntero(f1[0]) || !esEntero(f1[1]) || !esEntero(f1[2])) return false;
    var d1 = f1[0] * 1;
    var m1 = f1[1] * 1 - 1;
    var a1 = f1[2] * 1;
    var f2 = new Date(a1, m1, d1);
    var d2 = f2.getDate();
    var m2 = f2.getMonth();
    var a2 = f2.getFullYear();
    if (d1 == d2 && m1 == m2 && a1 == a2) {
        return true;
    } else return false;
}

function sTOd(fec2) {
    if (esFecha(fec2)) {
        var f3 = fec2.split("/");
        return parseInt(f3[2] + "" + f3[1] + "" + f3[0], 10);
    } else return 0;
}

function dTOs(fec3) {
    var f4 = "" + fec3;
    var a4 = f4.substr(0, 4);
    var m4 = f4.substr(4, 2);
    var d4 = f4.substr(6, 2);
    var f5 = d4 + "/" + m4 + "/" + a4;
    if (esFecha(f5)) return f5;
    else return "";
}

function diaMenos(fec4) {
    var f6 = "" + fec4;
    var a5 = f6.substr(0, 4) * 1;
    var m5 = f6.substr(4, 2) * 1;
    var d5 = f6.substr(6, 2) * 1 - 1;
    if (d5 <= 0) {
        d5 = 31;
        m5 -= 1;
        if (m5 <= 0) {
            m5 = 12;
            a5 -= 1;
        }
    }
    while (!esFecha(dTOs(a5 * 10000 + m5 * 100 + d5))) {
        d5 -= 1;
    }
    return a5 * 10000 + m5 * 100 + d5;
}

function diaMas(fec5) {
    var f7 = "" + fec5;
    var a6 = f7.substr(0, 4) * 1;
    var m6 = f7.substr(4, 2) * 1;
    var d6 = f7.substr(6, 2) * 1 + 1;
    if (!esFecha(dTOs(a6 * 10000 + m6 * 100 + d6))) {
        d6 = 1;
        m6 += 1;
        if (m6 > 12) {
            m6 = 1;
            a6 += 1;
        }
    }
    return a6 * 10000 + m6 * 100 + d6;
}

function difFecha(fec7, fec6) {
    var xf7 = "" + fec7;
    var xf6 = "" + fec6;
    var ax7 = xf7.substr(0, 4) * 1;
    var mx7 = xf7.substr(4, 2) * 1;
    var dx7 = xf7.substr(6, 2) * 1;
    var ax6 = xf6.substr(0, 4) * 1;
    var mx6 = xf6.substr(4, 2) * 1;
    var dx6 = xf6.substr(6, 2) * 1;
    meses = (ax7 - ax6) * 12 + mx7 - mx6;
    if (dx6 > dx7) {
        meses -= 1;
        dias = difDias(fec7, sumMeses(fec6, meses));
    } else dias = dx7 - dx6;
    return meses + "," + dias;
}

function sumMeses(fec8, mes8) {
    var xf8 = "" + fec8;
    var xm8 = mes8;
    var ax8 = xf8.substr(0, 4) * 1;
    var mx8 = xf8.substr(4, 2) * 1;
    var dx8 = xf8.substr(6, 2) * 1;
    ax8 += parseInt(xm8 / 12);
    mx8 += xm8 % 12;
    if (mx8 > 12) {
        mx8 -= 12;
        ax8 += 1;
    }
    while (!esFecha(dTOs(ax8 * 10000 + mx8 * 100 + dx8))) {
        dx8 -= 1;
    }
    return ax8 * 10000 + mx8 * 100 + dx8;
}

function difDias(fec0, fec9) {
    var xf0 = "" + fec0;
    var xf9 = "" + fec9;
    var ax0 = xf0.substr(0, 4) * 1;
    var mx0 = xf0.substr(4, 2) * 1;
    var dx0 = xf0.substr(6, 2) * 1;
    var ax9 = xf9.substr(0, 4) * 1;
    var mx9 = xf9.substr(4, 2) * 1;
    var dx9 = xf9.substr(6, 2) * 1;
    mes9 = (ax0 - ax9) * 12 + mx0 - mx9;
    dia9 = 0;
    if (mes9 = 0) dia9 = dx0 - dx9;
    if (mes9 = 1) {
        dia9 += 1;
        dx9 += 1;
        while (esFecha(dTOs(ax9 * 10000 + mx9 * 100 + dx9))) {
            dia9 += 1;
            dx9 += 1;
        }
        mx9 += 1;
        if (mx9 > 12) {
            ax9 += 1;
            mx9 -= 12;
        }
        dx9 = 1;
        fecn = ax9 * 10000 + mx9 * 100 + dx9;
        while (fec0 > fecn) {
            dia9 += 1;
            dx9 += 1;
            fecn = ax9 * 10000 + mx9 * 100 + dx9;
        }
    }
    if (mes9 > 1) {
        dia9 += (mes9 - 1) * 30;
        dia9 += difDias(fec0, sumMeses(fec9, mes9 - 1));
    }
    return dia9;
}

function padl(str1, rep1, chr1) {
    var st1 = trim("" + str1);
    while (st1.length < rep1) st1 = chr1 + st1;
    return st1;
}

function trim(str2) {
    var st2 = "" + str2;
    var ini = 0;
    while (ini < st2.length && st2.charAt(ini) == ' ') {
        ini += 1;
    }
    var fin = st2.length;
    while (fin > 0 && st2.charAt(fin - 1) == ' ') {
        fin -= 1;
    }
    return st2.substring(ini, fin);
}

function puntos(numn) {
    var nn0 = redondeo(numn * 1, 2).split(".");
    var ln0 = nn0[0].length;
    var nn1 = "", px = 0, x;
    if (ln0 > 3) {
        for (x = ln0 - 1; x >= 0; x--) {
            if (px > 0 && (px % 3) == 0) nn1 = "." + nn1;
            nn1 = nn0[0].charAt(x) + nn1;
            px += 1;
        }
    } else nn1 = nn0[0];
    return nn1 + "," + nn0[1];
}

function soloEntero() {
    if ((event.keyCode < 48) || (event.keyCode > 57)) {
        return false;
    }
    return true;
}

function soloFecha(vfec) {
    if (event.keyCode < 47 || event.keyCode > 57) return false;
    if (event.keyCode == 47 && (vfec.indexOf("/") !== vfec.lastIndexOf("/"))) return false;
    var auxf = vfec.split("/");
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        if (auxf[0] && !auxf[1] && !auxf[2]) {
            if ((!esEntero(auxf[0]) || auxf[0].length >= 2) && vfec.indexOf("/") == -1) return false;
        }
        if (auxf[1] && !auxf[2]) {
            if ((!esEntero(auxf[1]) || auxf[1].length >= 2) && vfec.indexOf("/") == vfec.lastIndexOf("/")) return false;
        }
    }
    if (event.keyCode == 47) {
        if (!auxf[0] || auxf[0].length < 2) return false;
        if (vfec.indexOf("/") !== -1 && (!auxf[1] || auxf[1].length < 2)) return false;
    }
}

function soloNumero(vnum, nent, nfra) {
    if (event.keyCode !== 46 && ((event.keyCode < 48) || (event.keyCode > 57))) return false;
    if (event.keyCode == 46 && (vnum.indexOf(".") !== -1)) return false;
    if (event.keyCode !== 46 && vnum.length >= nent && vnum.indexOf(".") == -1) return false;
    var auxn = vnum.split(".");
    if (auxn[1] && auxn[1].length >= nfra) return false;
    return true;
}

//FUNCION CALC VIEJA
function calc(fex1, fex2, impx, tipx, inix) {
    var mini = false;
    var maxi = false;
    var f001 = sTOd(fex1);
    var f002 = sTOd(fex2);
    var xind = tdes.length;
    var linx = inix;
    var x;
    for (x = 1; x < xind; x++) {
        todo = true;
        if (!mini) {
            if ((f001 >= tdes[x]) && (f001 <= thas[x])) {
                cdes[linx] = f001;
                mini = true;
                todo = false;
            }
        }
        if (mini) {
            if (f002 <= thas[x]) {
                if (todo) {
                    cdes[linx] = tdes[x];
                }
                chas[linx] = f002;
                maxi = true;
            }
            else {
                if (!todo) {
                    chas[linx] = thas[x];
                }
                else {
                    cdes[linx] = tdes[x];
                    chas[linx] = thas[x];
                }
            }
            ctas[linx] = tasa[x];
            linx += 1;
        }
        if (mini && maxi) break;
    }

    var totx = 0;
    for (x = inix; x < linx; x++) {
        dif0 = difFecha(chas[x], cdes[x]).split(",");
        mmm = parseInt(dif0[0]);
        ddd = parseInt(dif0[1]);
        cdif[x] = mmm * 30 + ddd;
        totDifDias += cdif[x];
        if (cdif[x] > 1) cdif[x] = cdif[x] + " dias";
        else cdif[x] = cdif[x] + " dia";
        cimp[x] = impx;
        ctip[x] = tipx;
        if (tipx == "Cap") {
            tasasRes = [];
            tasas(1);
            var temp = diaMas(cdes[x]);
            var ftasa = fechaTasaResar(temp);
            var t = tasasRes.find(x => x.f === ftasa).t;
            cint[x] = redondeo((mmm + (ddd / 30)) * redondeo((t / 30) * 30, 6) * impx / 100, 2);
            var stringTasa = "";
            stringTasa = redondeo((t / 30), 6).toString();
            stringTasa = stringTasa.replace(",", ".");
            ctas[x] = stringTasa;

        }
        else {
            cint[x] = redondeo((mmm + (ddd / 30)) * ctas[x] * impx / 100, 2);
            ctas[x] = redondeo(ctas[x] / 30, 6);

        }
        totx += cint[x] * 1;
    }
    return redondeo(totx, 2) + "," + linx;
}

function cabe() {
    ca0 = '            <td><p><font face="Arial, Helvetica, sans-serif" size="2"><b>';
    ca1 = '</b></font></p></td>' + cl;
    ca2 = '          <tr>' + cl;
    ca3 = '          </tr>' + cl;
    ca4 = '<p><b><font face="Arial, Helvetica, sans-serif" color="#000000" size="3">';
    ca5 = '</font></b></p></td>' + cl;
    ca8 = '    <tr>' + cl;
    ca9 = '    </tr>' + cl;
    vent = window.open("", "", "toolbar=yes, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width=700, height=450, top=0, left=0");
    vd = vent.document;
    vent.focus();
    vd.open();
    vd.write('<html>' + cl);
    vd.write('<head>' + cl);
    vd.write('  <title>' + titulo + '</title>' + cl);
    vd.write('</head>' + cl);
    vd.write('<body bgcolor="#FFFFFF">' + cl);
    vd.write('  <center>' + cl);
    vd.write('  <table width="640">' + cl);
    vd.write(ca8);
    vd.write('      <td align=left>' + ca4 + '<img name="ppal_arrib_r1_c3_2" src="//www.afip.gob.ar/sitio/images/afip.png" width="90" height="30" border="0" style="vertical-align: middle; margin-right: 10px;">' + titulo + ca5);
    vd.write('      <td align=right>' + ca4 + hoy + ca5);
    vd.write(ca9);
    vd.write('  </table>' + cl);
    vd.write('  <p style="line-height: 20%; margin: 0">&nbsp;</p>' + cl);
    vd.write('  <table border="1" width="640" bordercolor="#E6E8F4" cellspacing="0">' + cl);
    vd.write(ca8);
    vd.write('      <td colspan="6" bgcolor="#D2D7EC">' + cl); // modificado colspan de 7 a 6
    vd.write('        <table cellspacing="0">' + cl);
    vd.write(ca2);
    vd.write(ca0 + 'Tipo de cálculo' + ca1);
    vd.write(ca0 + ': Intereses RESARCITORIOS y PUNITORIOS' + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto1 + ca1);
    vd.write(ca0 + ': ' + xvto + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto2 + ca1);
    vd.write(ca0 + ': ' + xdem + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto3 + ca1);
    vd.write(ca0 + ': ' + xfpa + ca1);
    vd.write(ca3);
    vd.write(ca2);
    vd.write(ca0 + dto4 + ca1);
    vd.write(ca0 + ': ' + puntos(ximp) + ca1);
    vd.write(ca3);
    if (esFecha(xfin) && (sTOd(xfin) > sTOd(xfpa))) {
        vd.write(ca2);
        vd.write(ca0 + dto5 + ca1);
        vd.write(ca0 + ': ' + xfin + ca1);
        vd.write(ca3);
    }
    vd.write('        </table>' + cl);
    vd.write('      </td>' + cl);
    vd.write(ca9);
    vd.write(ca8);
    vd.write('      <th align="center" colspan="5">' + cl); // modificado de 7 a 5
    vd.write('        <p style="line-height: 25%; margin: 0">&nbsp;</p>' + cl);
    vd.write('      </th>' + cl);
    vd.write(ca9);
}

function deta() {
    de0 = '      <th align="center" width="';
    de1 = '" bgcolor="#D2D7EC"><font face="MS Sans Serif" size="2">';
    de2 = '</font></th>' + cl;
    de3 = '      <td align="right" bgcolor="#A0C4E7"><font face="MS Sans Serif" size="2">';
    de4 = '</font></td>' + cl;
    de5 = '    <tr height="25">' + cl;
    de6 = '    </tr>' + cl;
    de7 = '<center>';
    vd.write(de5);
    vd.write(de0 + '12%' + de1 + 'Desde' + de2);
    vd.write(de0 + '12%' + de1 + 'Hasta' + de2);
    vd.write(de0 + '19%' + de1 + 'Importe' + de2);
    vd.write(de0 + ' 7%' + de1 + 'Tipo' + de2);
    vd.write(de0 + '11%' + de1 + 'Tasa %' + de2);
    //vd.write(de0 + '14%' + de1 + 'Diferencia' + de2); //Eliminar diferencia de días
    vd.write(de0 + '25%' + de1 + 'Intereses' + de2);
    vd.write(de6);
    for (x = 1; x < lmax; x++) {
        vd.write(de5);
        vd.write(de3 + de7 + cdes[x] + de7 + de4);
        vd.write(de3 + de7 + chas[x] + de7 + de4);
        vd.write(de3 + puntos(cimp[x]) + de4);
        vd.write(de3 + de7 + ctip[x] + de7 + de4);
        vd.write(de3 + ctas[x] + de4);
        //vd.write(de3 + cdif[x] + de4); //Eliminar diferencia de días
        vd.write(de3 + puntos(cint[x]) + de4);
        vd.write(de6);
    }
}

function pie() {
    p0 = '    <tr height="22">' + cl;
    p1 = '      <td colspan="5" align="right" bgcolor="#E6E8F4"><font face="MS Sans Serif" size="2">Total '; //colspan de 6 a 5
    p2 = '</font></td>' + cl;
    p3 = '      <td align="right" bgcolor="#D2D7EC" width="25%"><font face="MS Sans Serif" size="2"><b>';
    p4 = '</b></font></td>' + cl;
    p5 = '    </tr>' + cl;
    if (tres > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Resarcitorios' + p2);
        vd.write(p3 + puntos(tres) + p4);
        vd.write(p5);
    }
    if (tpun > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Punitorios' + p2);
        vd.write(p3 + puntos(tpun) + p4);
        vd.write(p5);
    }
    if (tcap > 0) {
        vd.write(p0);
        vd.write(p1 + 'de Intereses Capitalizados' + p2);
        vd.write(p3 + puntos(tcap) + p4);
        vd.write(p5);
    }
    if (totDifDias > 0) {
        vd.write(p0);
        vd.write(p1 + ' de días' + p2);
        vd.write(p3 + totDifDias + p4);
        vd.write(p5);
    }
    if (tgen > 0) {
        vd.write(p0);
        vd.write(p1 + 'General' + p2);
        vd.write(p3 + puntos(tgen) + p4);
        vd.write(p5);
    }
    vd.write('  </table>' + cl);
    vd.write('</body>' + cl);
    vd.write('<html>' + cl);
    vd.close();
}

function validar(nmod, xvto, xdem, xfpa, ximp, xfin) {

	// dat1 = document.frmCom.fvenci;
    // dat2 = document.frmCom.fdeman;
    // dat3 = document.frmCom.fpagoc;
    // dat4 = document.frmCom.icapit;
    // dat5 = document.frmCom.fpagoi;

    //dat4.value = redondeo(dat4.value, 2);

    // xvto = "06/06/2023"; //dat1.value;
    // xdem = "05/07/2023"; //dat2.value;
    // xfpa = "05/08/2023"; //dat3.value;
    // ximp = "250663.18"; //dat4.value;
    // xfin = ""; //dat5.value;

    lmax = 0;
    tres = 0;
    tpun = 0;
    tcap = 0;
    tgen = 0;

    hoy = new Date();
    dia = padl(hoy.getDate(), 2, "0");
    mes = padl(hoy.getMonth() + 1, 2, "0");
    anio = padl(hoy.getFullYear(), 4, "0");
    hoy = dia + "/" + mes + "/" + anio;

    tasas(1);
    resu = calc(xvto, xdem, ximp, "Res", 1);
    res0 = resu.split(",");
    tres = res0[0] * 1;
    lmax = res0[1] * 1;
    if (tres > 0) tgen += tres;
    tasas(2);
    resu = calc(xdem, xfpa, ximp, "Pun", lmax);
    res1 = resu.split(",");
    tpun = res1[0] * 1;
    lmax = res1[1] * 1;
    if (tpun > 0) tgen += tpun;
    if (esFecha(xfin) && (sTOd(xfin) > sTOd(xfpa))) {
        resu = calc(xfpa, xfin, tres, "Cap", lmax);
        res2 = resu.split(",");
        tcap = res2[0] * 1;
        lmax = res2[1] * 1;
        if (tcap > 0) tgen += tcap;
    }
    for (x = 1; x < lmax; x++) {
        cdes[x] = dTOs(diaMas(cdes[x]));
        chas[x] = dTOs(chas[x]);
        ctas[x] = ctas[x].replace(".", ",");
    }
	resp=[tres,tpun];
	return(resp);
    // cabe();
    // if (nmod == 2) deta();
    // pie();
}

})();