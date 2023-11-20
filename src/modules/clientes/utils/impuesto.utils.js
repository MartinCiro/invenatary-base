const { getConnection } = require('../../../interface/DBConn.js');

async function fetchImpuesto() {
    const pool = await getConnection();

    return pool.query(`
        SELECT 
            i.id id_impuesto, i.nombre nombre_impuesto, 
            i.tipo tipo_impuesto, ixm.id_municipio, ixm.municipio, 
            ixm.departamento, ixm.id id_impuestoxmunicipio
        FROM impuesto i 
        LEFT JOIN impuestoxmunicipio ixm ON ixm.id_impuesto = i.id 
    `,
    ).then(data => {
        return data.rows;
    }).catch(error => {
        console.log(error);
        throw {
            ok: false,
            status_cod: 500,
            data: 'Ocurrió un error consultando impuestos',
        }
    }).finally(() => pool.end);
}


/**
 * @param {number} id_cliente 
 * @returns {Promise<{
 *      id_cliente: string,
 *      id_impuesto: string,
 *      nombre: string,
 *      tipo: string,
 *      id_municipio: string,
 *      municipio: string,
 *      departamento: string,
 *      id_calendario: string,
 *      periodicidad: string,
 *      periodo: string,
 *      fecha: string,
 *      id_impuestoxmunicipio: string,
 * }[]>}
 */
async function fetchImpuestoxcliente(id_cliente) {
    const pool = await getConnection();
    const params = [id_cliente];

    return pool.query(`
        SELECT 
            omc.id_cliente, i.id id_impuesto, i.nombre, i.tipo tipo, 
            ixm.id id_impuestoxmunicipio,
            ixm.id_municipio, ixm.municipio, ixm.departamento,
            ci.id id_calendario, ci.periodicidad, pv.periodo, TO_CHAR(pv.fecha, 'yyyy-mm-dd') fecha
        FROM obligaciones_muni_cliente omc
        INNER JOIN impuestoxmunicipio ixm ON ixm.id = omc.id_impuestoxmunicipio
        INNER JOIN impuesto i ON i.id = ixm.id_impuesto
        LEFT JOIN calendario_impuesto ci ON ci.id = omc.id_calendario 
        LEFT JOIN periodo_vencimiento pv ON pv.id_calendario = ci.id
        WHERE omc.id_cliente = $1
    `, params)
        .then(data => data.rows)
        .catch(error => {
            console.log(error);
            throw {
                ok: false,
                status_cod: 500,
                data: 'Ocurrió un error consultando impuestos de clientes',
            }
        }).finally(() => pool.end);
}

/**
 * @param {{ 
 * nombre: string, 
 * tipo: string, 
 * id_municipio: string, 
 * municipio: string, 
 * departamento: string }} impuesto 
 */
async function insertarImpuesto(impuesto) {
    const pool = await getConnection();
    const params = [];

    params.push(impuesto.nombre);
    params.push(impuesto.tipo);

    return pool.query(`
    INSERT INTO impuesto (nombre, tipo)
    VALUES ($1, $2)
    RETURNING id;
    `, params
    ).then(data => data.rows[0].id)
        .catch(async error => {
            if (error.code == '23505') {
                return pool.query(`
                SELECT id
                FROM impuesto
                WHERE nombre = $1 AND tipo = $2
                `, params)
                    .then(data => data.rows[0].id)
                    .catch((err) => { throw err })
            }
            console.log(error);
            throw {
                ok: false,
                status_cod: 500,
                data: 'Ocurrió un error insertando un nuevo impuesto',
            }
        }).finally(() => pool.end);
}

/**
 * @param {number} id_impuesto
 * @param {{ 
 * nombre: string, 
 * tipo: string, 
 * id_municipio: string, 
 * municipio: string, 
 * departamento: string }} impuesto 
 */
async function insertarImpuestoxMunicipio(id_impuesto, impuesto) {
    const pool = await getConnection();
    const params = [];

    params.push(id_impuesto);

    if (impuesto.id_municipio) {
        params.push(impuesto.id_municipio);
    } else if (impuesto.municipio && impuesto.departamento) {
        params.push(impuesto.municipio);
        params.push(impuesto.departamento);
    } else throw {
        ok: false,
        status_cod: 400,
        data: 'No se relaciona un municipio'
    }


    return pool.query(`
        INSERT INTO impuestoxmunicipio (id_impuesto, id_municipio, municipio, departamento)
        SELECT $1, m.id, m.municipio, m.departamento 
        FROM municipio m 
        WHERE ${id_impuesto ? 'm.id = $2' : 'm.municipio = $2 AND m.departamento = $3'}
        RETURNING impuestoxmunicipio.id
        `, params)
        .then(data => data.rows[0].id)
        .catch(error => {
            //23505 duplicate error
            if (error.code == '23505') throw {
                ok: false,
                status_cod: 409,
                data: 'Ya exista la relación de impuesto - municipio',
            }
            console.log(error);
            throw {
                ok: false,
                status_cod: 500,
                data: 'Ocurrió un error insertando relación de impuesto - municipio',
            }
        }).finally(() => pool.end);
}

/**
 * @param {number} id_impuestoxmunicipio 
 * @param {number} id_cliente 
 * @param {number} id_calendario 
 * @returns 
 */
async function insertarRelImpuestoxCliente(id_impuestoxmunicipio, id_cliente, id_calendario) {
    const pool = await getConnection();
    const params = [];

    params.push(id_impuestoxmunicipio);
    params.push(id_cliente);
    if (id_calendario) {
        params.push(id_calendario);
    }

    return pool.query(`
        INSERT INTO obligaciones_muni_cliente (id_impuestoxmunicipio, id_cliente${id_calendario ? ', id_calendario' : ''})
        VALUES ($1, $2${id_calendario ? ', $3' : ''})
        `, params)
        .catch(error => {
            //23505 duplicate error
            if (error.code == '23505') throw {
                ok: false,
                status_cod: 400,
                data: 'El cliente ya posee esta relación de impuesto - municipio',
            }
            console.log(error);
            throw {
                ok: false,
                status_cod: 500,
                data: 'Ocurrió un error insertando relación de cliente - impuesto',
            }
        }).finally(() => pool.end);
}

/**
 * 
 */
async function fetchCalendarios() {
    const pool = await getConnection();

    return pool.query(`
        SELECT 
            ci.id, i.nombre nombre_impuesto, ci.id_impuestoxmunicipio, 
            ixm.id_impuesto, ci.periodicidad, ci.uvt, 
            ci.regimen, ci.digito, ci.vigencia, pv.periodo, TO_CHAR(pv.fecha, 'yyyy-mm-dd') fecha,
            ixm.municipio, ixm.departamento
        FROM calendario_impuesto ci
        INNER JOIN periodo_vencimiento pv ON pv.id_calendario = ci.id
        INNER JOIN impuestoxmunicipio ixm ON ixm.id = ci.id_impuestoxmunicipio
        INNER JOIN impuesto i ON i.id = ixm.id_impuesto
    `)
        .then(data => data.rows)
        .catch(error => {
            console.log(error);
            throw {
                ok: false,
                status_cod: 500,
                data: 'Ocurrió un error consultando calendarios',
            }
        }).finally(() => pool.end);
}

module.exports = {
    insertarImpuestoxMunicipio,
    insertarImpuesto,
    fetchImpuesto,
    insertarRelImpuestoxCliente,
    fetchImpuestoxcliente,
    fetchCalendarios,
}