const Excel = require('exceljs');
const { getTemplatePath, getDateHM, getDate } = require('../utils/impuesto.utils');


async function createPlanTrabajoICA(plan_trabajo, options) {
    const workbook = new Excel.Workbook();
    const template_file = await getTemplatePath(options);
    let celda, valor, fecha;

    await workbook.xlsx.readFile(template_file);

    const sheet_hoja_ruta = workbook.getWorksheet('HOJADERUTA');
    const sheet_papel_trabajo = workbook.getWorksheet('PAPELDETRABAJO');

    console.log({ renglones: plan_trabajo.formularioObj.renglones });
    console.log({ actividades: plan_trabajo.formularioObj.actividades });

    // INFO DE PRUEBAS
    //Cliente
    celda = sheet_hoja_ruta.getCell(5, 5);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    //NIT
    celda = sheet_hoja_ruta.getCell(7, 5);
    celda.value = plan_trabajo.informacionPruebas.nit;

    // Periodo
    celda = sheet_hoja_ruta.getCell(11, 5);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    // municipio
    celda = sheet_hoja_ruta.getCell(9, 5);
    celda.value = celda.value.replace('#MUNICIPIO', plan_trabajo.informacionPruebas.municipio);

    celda = sheet_hoja_ruta.getCell(13, 5);
    celda.value = plan_trabajo.informacionPruebas.revisor;

    celda = sheet_hoja_ruta.getCell(15, 5);
    celda.value = plan_trabajo.informacionPruebas.numero_formulario;

    celda = sheet_hoja_ruta.getCell(17, 5);
    valor = plan_trabajo.informacionPruebas.fecha_recibido;
    celda.value = getDateHM(valor);

    celda = sheet_hoja_ruta.getCell(19, 5);
    valor = plan_trabajo.informacionPruebas.fecha_vencimiento;
    celda.value = getDate(valor);

    celda = sheet_hoja_ruta.getCell(28, 3);
    celda.value = plan_trabajo.conclusiones[0];

    celda = sheet_hoja_ruta.getCell(29, 3);
    celda.value = plan_trabajo.conclusiones[3] + '. ' + plan_trabajo.conclusiones[5];

    celda = sheet_hoja_ruta.getCell(30, 3);
    celda.value = plan_trabajo.conclusiones[4] + '. ' + plan_trabajo.conclusiones[2] + '. ' + plan_trabajo.conclusiones[1];

    // ------------------------- PAPEL DE TRABAJO

    // ENCABEZADOS
    celda = sheet_papel_trabajo.getCell(2, 2);
    celda.value = plan_trabajo.informacionPruebas.cliente;

    celda = sheet_papel_trabajo.getCell(3, 2);
    celda.value = plan_trabajo.informacionPruebas.nit;

    celda = sheet_papel_trabajo.getCell(4, 2);
    celda.value = celda.value.replace('#PERIODO', plan_trabajo.informacionPruebas.periodo);

    celda = sheet_papel_trabajo.getCell(3, 10);
    celda.value = plan_trabajo.informacionPruebas.periodo;

    celda = sheet_papel_trabajo.getCell(4, 10);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_papel_trabajo.getCell(5, 10);
    celda.value = plan_trabajo.informacionPruebas.persona_revisor;


    // CONCLUSIONES
    celda = sheet_papel_trabajo.getCell(31, 2);
    celda.value = plan_trabajo.conclusiones[0];

    celda = sheet_papel_trabajo.getCell(25, 4);
    valor = plan_trabajo.informacionPruebas.fecha_vencimiento;
    celda.value = getDate(valor);

    let fechaInicio = new Date(valor).getTime();

    celda = sheet_papel_trabajo.getCell(26, 4);
    valor = plan_trabajo.informacionPruebas.fecha_declaracion;
    celda.value = getDate(valor);

    let fechaFin = new Date(valor).getTime();
    let diff = fechaInicio - fechaFin;

    celda = sheet_papel_trabajo.getCell(27, 4);
    celda.value = diff / (1000 * 60 * 60 * 24);

    // ------------------------- RENGLONES
    for (let i = 8; i <= 40; i++) {
        let extra = 0;
        // HOJA RUTA

        if (i == 18) continue;

        if (i == 17) extra = 5;

        if (i > 17) extra = 4;

        celda = sheet_hoja_ruta.getCell(27 + i + extra, 12);
        valor = plan_trabajo.formularioObj.renglones.find(item => item.codigo == `${i}`);
        celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
        // PAPEL_TRABAJO
        // FORMULARIO
        celda = sheet_papel_trabajo.getCell(32 + i + extra, 8);
        celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;
        // BALANCE
        celda = sheet_papel_trabajo.getCell(32 + i + extra, 9);
        celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;
        // DIFERENCIA
        celda = sheet_papel_trabajo.getCell(32 + i + extra, 10);
        celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;
    }

    for (let [i, actividad] of plan_trabajo.formularioObj.actividades.entries()) {
        let actividad_cod = i < 3 ? i + 1 : 'otros';

        // HOJA DE RUTA
        celda = sheet_hoja_ruta.getCell(i + 45, 6);
        valor = plan_trabajo.formularioObj.actividades.find(item => item.actividad == actividad_cod);
        celda.value = (Number(valor.codigo)) ? (Number(valor.codigo)) : 0;

        celda = sheet_hoja_ruta.getCell(i + 45, 8);
        celda.value = (Number(valor.ingresos)) ? (Number(valor.ingresos)) : 0;

        celda = sheet_hoja_ruta.getCell(i + 45, 10);
        celda.value = (Number(valor.tarifa)) ? (Number(valor.tarifa)) : 0;

        celda = sheet_hoja_ruta.getCell(i + 45, 12);
        celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

        // PLAN DE TRABAJO
        celda = sheet_papel_trabajo.getCell(i + 50, 4);
        celda.value = (Number(valor.codigo)) ? (Number(valor.codigo)) : 0;

        celda = sheet_papel_trabajo.getCell(i + 50, 5);
        celda.value = (Number(valor.ingresos)) ? (Number(valor.ingresos)) : 0;

        celda = sheet_papel_trabajo.getCell(i + 50, 7);
        celda.value = (Number(valor.tarifa)) ? (Number(valor.tarifa)) : 0;

        celda = sheet_papel_trabajo.getCell(i + 50, 8);
        celda.value = (Number(valor.formulario)) ? (Number(valor.formulario)) : 0;

        celda = sheet_papel_trabajo.getCell(i + 50, 9);
        celda.value = (Number(valor.balance)) ? (Number(valor.balance)) : 0;

        celda = sheet_papel_trabajo.getCell(i + 50, 10);
        celda.value = (Number(valor.diferencia)) ? (Number(valor.diferencia)) : 0;
    }

    celda = sheet_papel_trabajo.getCell(54, 5);
    celda.value = plan_trabajo.formularioObj.total_gravados;

    celda = sheet_hoja_ruta.getCell(49, 8);
    celda.value = plan_trabajo.formularioObj.total_gravados;

    // FIRMAS
    // FIRMA DE AUDITOR
    celda = sheet_hoja_ruta.getCell(77, 4);
    celda.value = plan_trabajo.firmaAuditor.firma;

    celda = sheet_hoja_ruta.getCell(78, 4);
    celda.value = plan_trabajo.firmaAuditor.nombre;

    celda = sheet_hoja_ruta.getCell(79, 4);
    celda.value = plan_trabajo.firmaAuditor.fecha;

    // FIRMA DE CLIENTE
    celda = sheet_hoja_ruta.getCell(77, 9);
    celda.value = plan_trabajo.firmaCliente.firma;

    celda = sheet_hoja_ruta.getCell(78, 9);
    celda.value = plan_trabajo.firmaCliente.nombre;

    celda = sheet_hoja_ruta.getCell(79, 9);
    celda.value = plan_trabajo.firmaCliente.fecha;

    // CONCLUSIONES
    celda = sheet_papel_trabajo.getCell(80, 2);
    celda.value = plan_trabajo.conclusiones[3];

    celda = sheet_papel_trabajo.getCell(81, 2);
    celda.value = plan_trabajo.conclusiones[5];

    celda = sheet_papel_trabajo.getCell(86, 4);
    valor = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;
    celda.value = getDate(valor);
    fechaInicio = new Date(valor);

    celda = sheet_papel_trabajo.getCell(87, 4);
    valor = plan_trabajo.informacionPagoAnterior.fecha_presentacion;
    celda.value = getDate(valor);
    fechaFin = new Date(valor);
    diff = fechaInicio - fechaFin;

    celda = sheet_papel_trabajo.getCell(88, 4);

    celda.value = diff / (1000 * 60 * 60 * 24);

    celda = sheet_papel_trabajo.getCell(90, 4);
    valor = plan_trabajo.informacionPagoAnterior.fecha_vencimiento;
    celda.value = getDate(valor);

    celda = sheet_papel_trabajo.getCell(91, 4);
    valor = plan_trabajo.informacionPagoAnterior.fecha_pago;
    celda.value = getDate(valor);
    fechaFin = new Date(valor);
    diff = fechaInicio - fechaFin;

    celda = sheet_papel_trabajo.getCell(92, 4);
    celda.value = diff / (1000 * 60 * 60 * 24);

    celda = sheet_papel_trabajo.getCell(93, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.entidad_bancaria;

    celda = sheet_papel_trabajo.getCell(94, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_declarado;

    celda = sheet_papel_trabajo.getCell(95, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.monto_pagado;

    celda = sheet_papel_trabajo.getCell(96, 4);
    celda.value = plan_trabajo.informacionPagoAnterior.diferencia;

    celda = sheet_papel_trabajo.getCell(99, 2);
    celda.value = plan_trabajo.conclusiones[4];

    celda = sheet_papel_trabajo.getCell(100, 2);
    celda.value = plan_trabajo.conclusiones[2];

    celda = sheet_papel_trabajo.getCell(101, 2);
    celda.value = plan_trabajo.conclusiones[1];


    await workbook.xlsx.writeFile(template_file);

    return template_file;
}

module.exports = {
    createPlanTrabajoICA
}