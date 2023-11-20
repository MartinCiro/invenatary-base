const { requestICAETLAPI, requestRETEICAAPI } = require('../../../shared/services/api.service');
const { insertarImpuesto, getImpuestos, getClientesMunicipio, getBase64File,
    savePlanTrabajo, unlinkFile, getCalendarioClienteNacional, getCalendarioNacional,
    getImpuestosNacionales, getInputStreamFile } = require('../utils/impuesto.utils');
const { createPlanTrabajoICA } = require('./ica.controller');
const { createPlanTrabajoReteicaBarranquilla, createPlanTrabajoReteicaBogota } = require('./reteica.controller');

/**
 * @param {{nombre: string, tipo: string, id_municipio: number, periodo_vencimiento: string}} options 
 */
async function crearImpuesto(options) {
    if (!options.nombre || !options.tipo || !options.id_municipio || !options.periodo_vencimiento) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado suficiente información para crear un nuevo impuesto',
        });
    }

    try {
        return await insertarImpuesto(options);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error al insertar el nuevo impuesto'
        }
    }
}

async function listarImpuestos(options) {
    try {
        return await getImpuestos(options);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error al consultar los datos de impuestos'
        }
    }
}

/**
 * @param {string} id_user
 */
async function getICAOptions(id_user, id_impuesto) {
    let query, clientes = [];

    try {
        query = await getClientesMunicipio(id_user, id_impuesto);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error obteniendo la parametrización de clientes'
        }
    }

    if (query.length > 0) {
        // Itera el query
        for (const clienteMunicipio of query) {
            // Selecciona el cliente
            let cliente = clientes.find(i => clienteMunicipio.id == i.id);

            if (!cliente) {
                // Si cliente no existe     
                // Busca todos los municipios y vencimientos del cliente iterado
                let clienteMunicipiosVencimientos = query
                    .filter(i => clienteMunicipio.id == i.id);

                // Selecciona el cliente
                cliente = clienteMunicipiosVencimientos[0];

                // Inicializa los municipios que van a ser agregados al cliente
                let municipiosVencimientos = [];

                // Itera registros del query filtrados por el id del cliente (Sólo municipios y vencimientos de un cliente dado)
                for (const clienteMunicipio of clienteMunicipiosVencimientos) {
                    // Selecciona el municipio
                    let municipioSel = municipiosVencimientos.find(i => clienteMunicipio.id_municipio == i.id_municipio);

                    if (!municipioSel) {
                        // Si el municipio no existe
                        // Busca todos los vencimientos del municipio iterado
                        vencimientos = clienteMunicipiosVencimientos.filter(i => clienteMunicipio.id_municipio == i.id_municipio);

                        let { id_municipio, municipio, departamento } = vencimientos[0];

                        // Crea un nuevo municipio
                        let newMunicipio = {
                            id_municipio, municipio, departamento,
                            vencimientos: vencimientos
                                .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                                .map(i => {
                                    let { periodo, fecha } = i;
                                    return {
                                        periodo,
                                        fecha
                                    };
                                }),
                        };

                        municipiosVencimientos.push(newMunicipio);
                    }
                }

                clientes.push({
                    id: cliente.id,
                    nombre: cliente.nombre,
                    nit: cliente.nit,
                    municipios: municipiosVencimientos
                });
            }
        }
    }

    return clientes;
}

async function extractICAForm(formulario64, municipio, departamento) {
    let formulario;

    if (!formulario64) {
        return {
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado el formulario',
        };
    }

    if (!municipio) {
        return {
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado un municipio',
        };
    }

    try {
        formulario = await requestICAETLAPI({
            method: 'POST',
            body: {
                formulario: formulario64,
                municipio,
                departamento
            }
        });
    } catch (error) {
        throw error;
    }

    return formulario;
}

async function extractRETEICAForm(formulario64, municipio, departamento) {
    let formulario;

    if (!formulario64) {
        return {
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado el formulario',
        };
    }

    if (!municipio) {
        return {
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado un municipio',
        };
    }

    try {
        formulario = await requestRETEICAAPI({
            method: 'POST',
            body: {
                formulario: formulario64,
                municipio,
                departamento
            }
        });
    } catch (error) {
        throw error;
    }

    return formulario;
}

async function uploadPlanTrabajo(plan_trabajo, options) {
    let file;

    // FUNCIONES PARA ESCRIBIR EL ARCHIVO
    let functions = {
        '4': createPlanTrabajoICA,
        '2': uploadRETEICAPlanTrabajo,
        '1': uploadRETEICAPlanTrabajo,
    }

    if (!functions[options.iid]) throw {
        ok: false,
        status_cod: 400,
        data: 'El impuesto no está parametrizado para procesar el plan de trabajo'
    }

    // REEMPLAZAR VALORES SOBRE UNA COPIA DE LA PLANTILLA
    try {
        file = await functions[options.iid](plan_trabajo, options);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error creando el plan de trabajo'
        }
    }

    // GUARDAR EL PLAN DE TRABAJO EN BASE DE DATOS
    /*
    try {
        await savePlanTrabajo(plan_trabajo, options);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error guardando el plan de trabajo en base de datos'
        }
    }
    */

    // OBTENER EL ARCHIVO EN BASE64
    try {
        // ORIGINAL EN BASE 64
        b64File = await getBase64File(file);

        // STREAM PARA PRUEBAS - NO BORRAR
        //b64File = await getInputStreamFile(file);
        // Eliminar archivo

        unlinkFile(file);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error creando el plan de trabajo'
        }
    }

    // RETORNAR EL ARCHIVO EN BASE64
    return b64File;
}


async function fetchCalendarioClienteNacional(options) {
    try {
        return await getCalendarioClienteNacional(options);
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error al consultar los datos de impuestos'
        }
    }
}


async function fetchCalendarioNacional() {
    try {
        return await getCalendarioNacional();
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error al consultar los datos de impuestos'
        }
    }
}

async function fetchImpuestosNacionales() {
    try {
        return await getImpuestosNacionales();
    } catch (error) {
        if (error.status_cod) throw error;
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error al consultar los datos de impuestos'
        }
    }
}



async function uploadRETEICAPlanTrabajo(plan_trabajo, options) {
    let municipios = {
        '783': createPlanTrabajoReteicaBarranquilla,  //BARRANQUILLA
        //'885': '',  //CARTAGENA DE INDIAS
        //'7599': '', //YUMBO
        //'4493': '', //SANTA MARTA
        '872': createPlanTrabajoReteicaBogota,  //BOGOTÁ, D.C.
        //'7046': '', //CALI
        //'1': '',    //MEDELLÍN
        //'1648': '', //MANIZALES
        //'3299': '', //COTA
        //'5889': '', //PEREIRA
    }

    return municipios[options.id_municipio](plan_trabajo, options);
}

module.exports = {
    crearImpuesto,
    listarImpuestos,
    getICAOptions,
    extractICAForm,
    uploadPlanTrabajo,
    fetchCalendarioClienteNacional,
    fetchCalendarioNacional,
    fetchImpuestosNacionales,
    extractRETEICAForm,
    uploadPlanTrabajo,
}