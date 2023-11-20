const Excel = require('exceljs');
const { getTemplatePath } = require("../utils/impuesto.utils");

async function createPlanTrabajoReteicaBogota(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options);
    let celda;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    // ----------------------- HOJA DE RUTA -----------------------
    // INFO DE PRUEBAS BOGOTÁ
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;//.

    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;//.

    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_recibido.split("T")[0];;

    celda = sheet_hoja_ruta.getCell(19, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_hoja_ruta.getCell(28, 3);
    celda.value = plan_trabajo.conclusiones[0], plan_trabajo.conclusiones[1], plan_trabajo.conclusiones[3], plan_trabajo.conclusiones[4], plan_trabajo.conclusiones[5];

    // RENGLONES DEL 6 AL 14

    celda = sheet_hoja_ruta.getCell(35, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "7");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "8");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "9");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(48, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(49, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(50, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(48, 9);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(49, 9);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(50, 9);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // ----------------------- PAPEL DE TRABAJO -----------------------
    // INFO DE PRUEBAS

    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 9);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 9);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(25, 4);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(26, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(31, 2);
    celda.value = plan_trabajo.conclusiones[0];

    // RENGLONES (FORMULARIO) 6 AL 14

    celda = sheet_papel_trabajo.getCell(40, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "7");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "8");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "9");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (BALANCE) DEL 6 AL 14

    celda = sheet_papel_trabajo.getCell(40, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "7");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "8");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "9");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    // DIFERENCIA
    // RENGLONES (DIFERENCIA) DEL 6 AL 14

    celda = sheet_papel_trabajo.getCell(40, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "7");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "8");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "9");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    // CONCLUSIONES

    celda = sheet_papel_trabajo.getCell(51, 2);
    celda.value = plan_trabajo.conclusiones[1];

    celda = sheet_papel_trabajo.getCell(52, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(56, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(57, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(58, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPresentacion;

    celda = sheet_papel_trabajo.getCell(65, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(66, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_pago;

    celda = sheet_papel_trabajo.getCell(67, 4);
    celda.value = plan_trabajo.diasRetrasoFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(68, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(69, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(70, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(71, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(74, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(75, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(76, 2);
    celda.value = plan_trabajo.conclusiones[5];


    await workbook.xlsx.writeFile(template_file);

    return template_file;

}

async function createPlanTrabajoReteicaBarranquilla(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options);
    let celda;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    // ----------------------- HOJA DE RUTA -----------------------
    // INFO DE PRUEBAS BARRANQUILLA
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;//.

    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;//.

    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_recibido.split("T")[0];

    celda = sheet_hoja_ruta.getCell(19, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_hoja_ruta.getCell(27, 3);
    celda.value = plan_trabajo.conclusiones[0], plan_trabajo.conclusiones[1], plan_trabajo.conclusiones[3], plan_trabajo.conclusiones[4], plan_trabajo.conclusiones[5];

    // RENGLONES DEL 11 AL 16

    celda = sheet_hoja_ruta.getCell(35, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;


    //RENGLONES DEL 17 AL 21

    celda = sheet_hoja_ruta.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(45, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;


    //RENGLONES DEL 22 AL 24

    celda = sheet_hoja_ruta.getCell(46, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(47, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(48, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    //RENGLONES DEL 25 AL 29

    celda = sheet_hoja_ruta.getCell(49, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(50, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(51, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(52, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(53, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;


    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(58, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(59, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(60, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(58, 9);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(59, 9);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(60, 9);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // ----------------------- PAPEL DE TRABAJO -----------------------
    // INFO DE PRUEBAS

    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 10);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 10);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(25, 4);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(26, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(31, 2);
    celda.value = plan_trabajo.conclusiones[0];

    // RENGLONES (FORMULARIO) 11 AL 16

    celda = sheet_papel_trabajo.getCell(40, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES DEL 17 AL 21

    celda = sheet_papel_trabajo.getCell(46, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES DEL 22 AL 24

    celda = sheet_papel_trabajo.getCell(51, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES DEL 25 AL 29

    celda = sheet_papel_trabajo.getCell(54, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(55, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(56, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(57, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(58, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (BALANCE) DEL 11 AL 16

    celda = sheet_papel_trabajo.getCell(40, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    // RENGLONES (BALANCE) DEL 17 AL 21

    celda = sheet_papel_trabajo.getCell(46, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    // RENGLONES (BALANCE) DEL 22 AL 24

    celda = sheet_papel_trabajo.getCell(51, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    // RENGLONES (BALANCE) DEL 25 AL 29

    celda = sheet_papel_trabajo.getCell(54, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(55, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(56, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(57, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(58, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;


    // DIFERENCIA
    // RENGLONES (DIFERENCIA) DEL 11 AL 16

    celda = sheet_papel_trabajo.getCell(40, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;


    // RENGLONES (DIFERENCIA) DEL 17 AL 21

    celda = sheet_papel_trabajo.getCell(46, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    // RENGLONES (DIFERENCIA) DEL 22 AL 24

    celda = sheet_papel_trabajo.getCell(51, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    // RENGLONES (DIFERENCIA) DEL 25 AL 29

    celda = sheet_papel_trabajo.getCell(54, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(55, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(56, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(57, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(58, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;


    // CONCLUSIONES

    celda = sheet_papel_trabajo.getCell(61, 2);
    celda.value = plan_trabajo.conclusiones[1];

    celda = sheet_papel_trabajo.getCell(62, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(66, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(67, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(68, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPresentacion;

    celda = sheet_papel_trabajo.getCell(73, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(74, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_pago;

    celda = sheet_papel_trabajo.getCell(75, 4);
    celda.value = plan_trabajo.diasRetrasoFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(76, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(77, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(78, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(79, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(82, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(83, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(84, 2);
    celda.value = plan_trabajo.conclusiones[5];


    await workbook.xlsx.writeFile(template_file);

    return template_file;
}

async function createPlanTrabajoReteicaYumbo(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options.iid);
    let celda;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    // ----------------------- HOJA DE RUTA -----------------------
    // INFO DE PRUEBAS YUMBO
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;//.

    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;//.

    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    valor = plan_trabajo.informacionPruebas.fecha_recibido.split("T")[0];
    celda.value = Date(valor).toLocaleString("en-GB");

    celda = sheet_hoja_ruta.getCell(19, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_hoja_ruta.getCell(28, 3);
    celda.value = plan_trabajo.conclusiones[0], plan_trabajo.conclusiones[1], plan_trabajo.conclusiones[3], plan_trabajo.conclusiones[4], plan_trabajo.conclusiones[5];

    // RENGLONES DEL 15 AL 29

    celda = sheet_hoja_ruta.getCell(35, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(45, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(46, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(47, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(48, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(49, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(54, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(55, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(56, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(54, 8);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(55, 8);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(56, 8);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // ----------------------- PAPEL DE TRABAJO -----------------------
    // INFO DE PRUEBAS

    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 11);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 11);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(25, 4);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(26, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(31, 2);
    celda.value = plan_trabajo.conclusiones[0];


    // RENGLONES (BASE GRAVABLE) 15 AL 23

    celda = sheet_papel_trabajo.getCell(40, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.baseGravable)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (FORMULARIO) 15 AL 29

    celda = sheet_papel_trabajo.getCell(40, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(54, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;



    // RENGLONES (BALANCE-BASE) DEL 15 AL 29

    celda = sheet_papel_trabajo.getCell(40, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(54, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;


    // RENGLONES (BALANCE-VALOR) DEL 15 AL 29

    celda = sheet_papel_trabajo.getCell(40, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(54, 10);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    // RENGLONES (DIFERENCIA-BASE) DEL 15 AL 29

    celda = sheet_papel_trabajo.getCell(40, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;

    celda = sheet_papel_trabajo.getCell(54, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.base)) ? (Number(valor.base)) : 0;


    // RENGLONES (DIFERENCIA-VALOR) DEL 15 AL 29

    celda = sheet_papel_trabajo.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "23");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "24");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "25");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "26");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(52, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "27");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(53, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "28");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    celda = sheet_papel_trabajo.getCell(54, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "29");
    celda.value = (Number(valor.valor)) ? (Number(valor.valor)) : 0;

    // CONCLUSIONES

    celda = sheet_papel_trabajo.getCell(57, 2);
    celda.value = plan_trabajo.conclusiones[1];

    celda = sheet_papel_trabajo.getCell(58, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(62, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(63, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presen4tacion;

    celda = sheet_papel_trabajo.getCell(64, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPresentacion;

    celda = sheet_papel_trabajo.getCell(71, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(72, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_pago;

    celda = sheet_papel_trabajo.getCell(73, 4);
    celda.value = plan_trabajo.diasRetrasoFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(74, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(75, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(76, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(77, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(80, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(81, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(82, 2);
    celda.value = plan_trabajo.conclusiones[5];


    await workbook.xlsx.writeFile(template_file);

    return template_file;
}

async function createPlanTrabajoReteicaCali(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options.iid);
    let celda;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    // ----------------------- HOJA DE RUTA -----------------------
    // INFO DE PRUEBAS CALI
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;//.

    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;//.

    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    valor = plan_trabajo.informacionPruebas.fecha_recibido.split("T")[0];
    celda.value = Date(valor).toLocaleString("en-GB");

    celda = sheet_hoja_ruta.getCell(19, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_hoja_ruta.getCell(28, 3);
    celda.value = plan_trabajo.conclusiones[0], plan_trabajo.conclusiones[1], plan_trabajo.conclusiones[3], plan_trabajo.conclusiones[4], plan_trabajo.conclusiones[5];

    // RENGLONES DEL 10 AL 22

    celda = sheet_hoja_ruta.getCell(34, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(35, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(45, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(46, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(51, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(52, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(53, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(51, 9);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(52, 9);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(53, 9);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // ----------------------- PAPEL DE TRABAJO -----------------------
    // INFO DE PRUEBAS

    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 8);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 8);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(25, 4);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(26, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(30, 2);
    celda.value = plan_trabajo.conclusiones[0];

    // RENGLONES (FORMULARIO) 10 AL 22

    celda = sheet_papel_trabajo.getCell(39, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(40, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;


    // RENGLONES (BALANCE) DEL 10 AL 22

    celda = sheet_papel_trabajo.getCell(39, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(40, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 8);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;


    // DIFERENCIA
    // RENGLONES (DIFERENCIA) DEL 10 AL 22

    celda = sheet_papel_trabajo.getCell(39, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "10");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(40, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "11");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(45, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "17");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "18");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "19");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "20");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "21");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(51, 9);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "22");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;


    // CONCLUSIONES

    celda = sheet_papel_trabajo.getCell(54, 2);
    celda.value = plan_trabajo.conclusiones[1];

    celda = sheet_papel_trabajo.getCell(55, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(60, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(61, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(62, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPresentacion;

    celda = sheet_papel_trabajo.getCell(64, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(65, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_pago;

    celda = sheet_papel_trabajo.getCell(66, 4);
    celda.value = plan_trabajo.diasRetrasoFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(69, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(70, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(71, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(72, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(75, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(77, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(78, 2);
    celda.value = plan_trabajo.conclusiones[5];


    await workbook.xlsx.writeFile(template_file);

    return template_file;

}

async function createPlanTrabajoReteicaCota(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options.iid);
    let celda;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    // ----------------------- HOJA DE RUTA -----------------------
    // INFO DE PRUEBAS COTA
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;//.

    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;//.

    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    valor = plan_trabajo.informacionPruebas.fecha_recibido.split("T")[0];
    celda.value = Date(valor).toLocaleString("en-GB");

    celda = sheet_hoja_ruta.getCell(19, 5);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_hoja_ruta.getCell(27, 3);
    celda.value = plan_trabajo.conclusiones[0], plan_trabajo.conclusiones[1], plan_trabajo.conclusiones[3], plan_trabajo.conclusiones[4], plan_trabajo.conclusiones[5];

    // RENGLONES (VALOR 1 )DEL 1 AL 16

    celda = sheet_hoja_ruta.getCell(34, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(35, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (VALOR 2 )DEL 1 AL 16

    celda = sheet_hoja_ruta.getCell(34, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(35, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(36, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(37, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(38, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(39, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(40, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(41, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(42, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(43, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_hoja_ruta.getCell(44, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;


    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(49, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(50, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(51, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(49, 9);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(50, 9);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(51, 9);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // ----------------------- PAPEL DE TRABAJO -----------------------
    // INFO DE PRUEBAS

    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 12);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 12);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(25, 4);
    celda.value = plan_trabajo.informacionPruebas.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(26, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(30, 2);
    celda.value = plan_trabajo.conclusiones[0];


    // RENGLONES (% PORCENTAJE) 1 AL 14

    celda = sheet_papel_trabajo.getCell(39, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.porcentaje)) ? (Number(valor.porcentaje)) : 0;

    celda = sheet_papel_trabajo.getCell(40, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 7);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (MESES) 1 AL 14

   celda = sheet_papel_trabajo.getCell(39, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
   celda.value = (Number(valor.meses)) ? (Number(valor.meses)) : 0;

   celda = sheet_papel_trabajo.getCell(40, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(41, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(42, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(43, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(44, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(46, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(47, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(48, 8);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   // RENGLONES (IMPUESTO) 1 AL 14

   celda = sheet_papel_trabajo.getCell(39, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
   celda.value = (Number(valor.impuesto)) ? (Number(valor.impuesto)) : 0;

   celda = sheet_papel_trabajo.getCell(40, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(41, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(42, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(43, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(44, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(46, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(47, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(48, 9);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   // RENGLONES (FORMULARIO +) 1 AL 15

   celda = sheet_papel_trabajo.getCell(39, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(40, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(41, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(42, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(43, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(44, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(46, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(47, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(48, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

   celda = sheet_papel_trabajo.getCell(49, 10);
   valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
   celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    // RENGLONES (FORMULARIO -) 1 AL 16

    celda = sheet_papel_trabajo.getCell(39, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(40, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(41, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(42, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(43, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(44, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(46, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(47, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(48, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 
    celda = sheet_papel_trabajo.getCell(49, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 11);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
 

    // RENGLONES (BALANCE) DEL 1 AL 16

    celda = sheet_papel_trabajo.getCell(39, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(40, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(41, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(42, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(43, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(44, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(46, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(47, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(48, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
 
    celda = sheet_papel_trabajo.getCell(49, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 12);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

    // RENGLONES (DIFERENCIA-VALOR) DEL 15 AL 29

    celda = sheet_papel_trabajo.getCell(39, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "1");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(40, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "2");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(41, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "3");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(42, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "4");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(43, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "5");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(44, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "6");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(46, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "12");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(47, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "13");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(48, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "14");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(49, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "15");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;

    celda = sheet_papel_trabajo.getCell(50, 13);
    valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == "16");
    celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;
   
    // CONCLUSIONES

    celda = sheet_papel_trabajo.getCell(52, 2);
    celda.value = plan_trabajo.conclusiones[1];

    celda = sheet_papel_trabajo.getCell(53, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(58, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(59, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_presentacion;

    celda = sheet_papel_trabajo.getCell(60, 4);
    celda.value = plan_trabajo.diasAnticipacionFechaPresentacion;

    celda = sheet_papel_trabajo.getCell(62, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;

    celda = sheet_papel_trabajo.getCell(64, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.fecha_pago;

    celda = sheet_papel_trabajo.getCell(65, 4);
    celda.value = plan_trabajo.diasRetrasoFechaPagoDeclaracion;

    celda = sheet_papel_trabajo.getCell(67, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(68, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(69, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(70, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(73, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(75, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(76, 2);
    celda.value = plan_trabajo.conclusiones[5];


    await workbook.xlsx.writeFile(template_file);

    return template_file;
}

module.exports = {
    createPlanTrabajoReteicaBogota,
    createPlanTrabajoReteicaBarranquilla,
    createPlanTrabajoReteicaYumbo,
    createPlanTrabajoReteicaCali,
    createPlanTrabajoReteicaCota
}