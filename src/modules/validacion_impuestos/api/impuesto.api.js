const ResponseBody = require('../../../shared/model/ResponseBody.model');
const { crearImpuesto, listarImpuestos, getICAOptions, extractICAForm, 
    uploadPlanTrabajo, fetchCalendarioClienteNacional, fetchCalendarioNacional,
    fetchImpuestosNacionales, extractRETEICAForm, } = require('../controller/impuesto.controller');

const crearImpuestoAPI = async (req, res) => {
    const { nombre, tipo, id_municipio, municipio, departamento } = req.body;
    let response;

    if (!nombre || !tipo || !id_municipio || !municipio || !departamento) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado suficiente información para crear un nuevo impuesto'
        });
    }

    try {
        const crearResponse = await crearImpuesto({ nombre, tipo, id_municipio, municipio, departamento });
        response = new ResponseBody(true, 200, { message: 'Se ha creado el impuesto exitosamente', id: crearResponse.id })
    } catch (error) {
        if (error.status_cod) {
            response = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            response = new ResponseBody(false, 500, 'Ha ocurrido un error en el proceso de crear el impuesto');
        }

    }

    return res.json(response);
};

const listarImpuestosAPI = async (req, res) => {
    const { nombre, tipo, id_municipio, periodo_vencimiento } = req.query;
    let message;

    try {
        const resultado = await listarImpuestos({ nombre, tipo, id_municipio, periodo_vencimiento });
        message = new ResponseBody(true, 200, resultado);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error en el proceso para listar los impuestos');
        }
    }

    return res.json(message);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getOptionsICAAPI = async (req, res) => {
    const { iid } = req.query;
    const { id_user } = req.userData;
    let message;

    if (!iid) {
        return res.json(new ResponseBody(false, 400, 'No se proporcionó el id del impuesto'));
    }

    try {
        let datos = await getICAOptions(id_user, iid);
        message = new ResponseBody(true, 200, datos);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error intentando obtener las opciones');
        }
    }

    return res.json(message);
}


const imformacionPruebasAPI = async (req, res) => {
    const { id_cliente, descripcion, periodo, municipio, numero_formulario,
        fecha_recibida_info, fecha_vencimiento, firma_revisor_fiscal } = req.query;

    if (!id_cliente) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado identificador del cliente'
        });
    }

    if (!municipio) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado el municipio'
        });
    }

    if (!periodo) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado el periodo'
        });
    }

    if (!numero_formulario) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado identificador del numero_formulario'
        });
    }

    if (!fecha_recibida_info) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado la fecha en la que se recibio la información'
        });
    }

    if (!firma_revisor_fiscal) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado la firma del revisor fiscal'
        });
    }
    if (!descripcion) {
        return res.json({
            ok: false,
            status_cod: 400,
            data: 'No se ha proporcionado la descripcion del procedimiento'
        });
    }

    try {
        const response = await informacionPruebas(id_cliente, descripcion, periodo, municipio, numero_formulario,
            fecha_recibida_info, fecha_vencimiento, firma_revisor_fiscal);
        message = new ResponseBody(true, 200, response);
    } catch (error) {
        if (error.data) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, { message: 'Ha ocurrido un error inesperado. Por favor inténtelo nuevamente más tarde' });
        }
    }

    return res.json(message);
}

const extractICAFormAPI = async (req, res) => {
    const { formulario, municipio, departamento } = req.body;

    try {
        const extractRes = await extractICAForm(formulario, municipio, departamento);
        message = new ResponseBody(true, 200, extractRes);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error obteniendo el formulario');
        }
    }

    return res.json(message);
}

const extractRETEICAFormAPI = async (req, res) => {
    const { formulario, municipio, departamento } = req.body;

    try {
        const extractRes = await extractRETEICAForm(formulario, municipio, departamento);
        message = new ResponseBody(true, 200, extractRes);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error obteniendo el formulario');
        }
    }

    return res.json(message);
}

const uploadPlanTrabajoAPI = async (req, res) => {
    const { plan_trabajo, parameters } = req.body;
    let message;

    //Pruebas
    //let result;

    if (!plan_trabajo) {
        return res.json(new ResponseBody(false, 400, 'No se ha proporcionado un objeto de plan de trabajo'));
    }

    if (!parameters) {
        return res.json(new ResponseBody(false, 400, 'No se han proporcionado los parámetros de ejecución'));
    }

    try {
        //Pruebas
        //result = await uploadPlanTrabajo(plan_trabajo, parameters);

        let result = await uploadPlanTrabajo(plan_trabajo, parameters);
        message = new ResponseBody(true, 200, result);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error intentando procesar la solicitud');
        }
    }
    
    //Para pruebas
    //return result.pipe(res);

    return res.json(message);
}

const listarCalendarioClienteNacionalAPI = async (req, res) => {
    const options = req.query;
    let message;

    try {
        const resultado = await fetchCalendarioClienteNacional(options);
        message = new ResponseBody(true, 200, resultado);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error en el proceso para listar los impuestos');
        }
    }

    return res.json(message);
}

const listarCalendarioNacionalAPI = async (req, res) => {
    let message;

    try {
        const resultado = await fetchCalendarioNacional();
        message = new ResponseBody(true, 200, resultado);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error en el proceso para listar los impuestos');
        }
    }

    return res.json(message);
}

const listarImpuestosNacionalesAPI = async (req, res) => {
    let message;

    try {
        const resultado = await fetchImpuestosNacionales();
        message = new ResponseBody(true, 200, resultado);
    } catch (error) {
        if (error.status_cod) {
            message = new ResponseBody(error.ok, error.status_cod, error.data);
        } else {
            console.log(error);
            message = new ResponseBody(false, 500, 'Ocurrió un error en el proceso para listar los impuestos');
        }
    }

    return res.json(message);
}



module.exports = {
    crearImpuestoAPI,
    listarImpuestosAPI,
    imformacionPruebasAPI,
    extractICAFormAPI,
    getOptionsICAAPI,
    extractRETEICAFormAPI,
    uploadPlanTrabajoAPI,
    listarCalendarioClienteNacionalAPI,
    listarCalendarioNacionalAPI,
    listarImpuestosNacionalesAPI
}

