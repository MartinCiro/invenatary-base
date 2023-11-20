const {
  getConnection,
  getImpuestosConnection,
} = require("../../../interface/DBConn");
const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');

/**
 * @param {{nombre: string, tipo: string, id_municipio: number, periodo_vencimiento: string}} options
 */
async function insertarImpuesto(options) {
  if (
    !options.nombre ||
    !options.tipo ||
    !options.id_municipio ||
    !options.periodo_vencimiento
  ) {
    return res.json({
      ok: false,
      status_cod: 400,
      data: "No se ha proporcionado suficiente información para crear un nuevo impuesto",
    });
  }

  const pool = await getConnection();

  return pool
    .query(
      `
        INSERT INTO obligacion (nombre, tipo, periodo_vencimiento, id_municipio, departamento, municipio)
        SELECT $1, $2, $3, $4, departamento, municipio
        FROM municipio 
        WHERE municipio.id = $4
        RETURNING id;
        `,
      [
        options.nombre,
        options.tipo,
        options.periodo_vencimiento,
        options.id_municipio,
      ]
    )
    .then((data) => {
      if (data.rowCount == 0)
        throw {
          ok: false,
          status_cod: 400,
          data: "El municipio no existe",
        };
      return data.rows[0];
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ha ocurrido un error en base de datos al insertar el impuesto",
      };
    });
}

/**
 *
 * @param {{
 *      nombre?: string,
 *      tipo?: string,
 *      id_municipio?: number,
 *      periodo_vencimiento?: string
 * }} options
 */
async function getImpuestos(options) {
  const pool = await getConnection();
  const params = [];
  let query = "";

  if (options.nombre) {
    params.push(options.nombre);
    query =
      query != ""
        ? `${query} OR (nombre = $${params.length})`
        : `WHERE (nombre = $${params.length})`;
  }

  if (options.tipo) {
    params.push(options.tipo);
    query =
      query != ""
        ? `${query} OR (tipo = $${params.length})`
        : `WHERE (tipo = $${params.length})`;
  }

  if (options.id_municipio) {
    params.push(options.id_municipio);
    query =
      query != ""
        ? `${query} OR (id_municipio = $${params.length})`
        : `WHERE (id_municipio = $${params.length})`;
  }

  if (options.periodo_vencimiento) {
    params.push(options.periodo_vencimiento);
    query =
      query != ""
        ? `${query} OR (periodo_vencimiento = $${params.length})`
        : `WHERE (periodo_vencimiento = $${params.length})`;
  }

  return pool
    .query(
      `
        SELECT * 
        FROM impuesto
        ${query}
        `,
      params
    )
    .then((data) => {
      return data.rows;
    })
    .catch((error) => {
      if (error.status_cod) throw error;
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error en base de datos consultando los impuestos",
      };
    });
}

/**
 * @param {string} id_user
 * @returns { Promise<{id: string, nombre:string, nit:string, id_municipio:string, municipio:string, departamento:string}[]>}
 */
async function getClientesMunicipio(id_user, id_impuesto) {
  const pool = await getConnection();
  let query,
    params = [];

  if (id_user) {
    query = `INNER JOIN usuarioxcliente uxc ON uxc.id_cliente = c.id AND uxc.id_usuario = ${id_user}`;
  }

  if (id_impuesto == 2) {
    params.push(1);
  }

  params.push(id_impuesto);

  return pool
    .query(
      `
            SELECT c.id, c.nombre, c.nit, ixm.id_municipio, ixm.municipio, ixm.departamento, pv.periodo, TO_CHAR(pv.fecha, 'yyyy-mm-dd') fecha
            FROM cliente c
            ${query ? query : ""}
            INNER JOIN obligaciones_muni_cliente omc 
                ON omc.id_cliente = c.id
            INNER JOIN impuestoxmunicipio ixm 
                ON ixm.id = omc.id_impuestoxmunicipio 
            INNER JOIN periodo_vencimiento pv 
                ON pv.id_calendario = omc.id_calendario 
            WHERE ixm.id_impuesto IN (${params.join(', ')})
        `)
    .then(data => data.rows)
    .catch(error => {
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: 'Ocurrió un error en base de datos consultando la información del cliente'
      }
    });
}

async function getTemplatePath(options) {
  let file_path = ['/src', '/templates'];

  let getTemplate = (folder, municipios, option, default_option) => {
    file_path.push(folder);

    if (option?.mid && municipios[option.mid]) {
      return municipios[option.mid];
    } else {
      if (default_option) return default_option;
      throw {
        ok: false,
        status_cod: 400,
        data: 'El impuesto no está parametrizado con la plantilla'
      }
    }
  }

  let template = {
    // ICA
    '4': option => getTemplate('/ica',
      { '1': '/ica_medellin_template.xlsx' },
      option, '/ica_template.xlsx'),

    // RETEICA
    '2': option => getTemplate('/reteica',
      {
        '872': '/reteica_bogota_template.xlsx',
      },
      option),

    // AUTORRETENCIÓN Y RETEICA
    '1': option => getTemplate('/reteica',
      {
        '783': '/reteica_barranquilla_template.xlsx'
      },
      option),
  };

  if (!template[options.iid]) {
    throw {
      ok: false,
      status_cod: 400,
      data: 'El impuesto no está parametrizado con la plantilla'
    }
  }

  let template_path = path.join(process.cwd(), ...file_path);

  let original_template_file = path.join(template_path, template[options.iid](options?.mid));
  let new_template_file = path.join(template_path, '/temp', `${v4()}.xlsx`);

  fs.copyFileSync(original_template_file, new_template_file);

  return new_template_file;
}




async function getBase64File(file_path) {
  let file = fs.readFileSync(file_path);

  return file.toString("base64");
}

async function getInputStreamFile(file_path) {
  let file = fs.createReadStream(file_path);

  return file;
}

async function savePlanTrabajo(plan_trabajo, options) { }

function unlinkFile(file) {
  fs.unlinkSync(file);
}

/**
 * @param {{
 *      cid: string
 * }} options
 */
async function getCalendarioClienteNacional(options) {
  const nexia = await getConnection();
  const impuesto = await getImpuestosConnection();
  const joinedData = [];

  let data_nexia;

  if (options.cid) {
    data_nexia = await nexia
      .query(`SELECT * FROM cliente WHERE id = $1`, [options.cid])
      .then(it => it)
      .catch(error => {
        console.log(error);
        throw {
          ok: false,
          status_cod: 500,
          data: "Ocurrió un error en la base de datos de nexia_automation consultando los impuestos",
        };
      });
  } else {
    data_nexia = await nexia
      .query(`SELECT * FROM cliente`)
      .then(it => it)
      .catch(error => {
        console.log(error);
        throw {
          ok: false,
          status_cod: 500,
          data: "Ocurrió un error en la base de datos de nexia_automation consultando los impuestos",
        };
      });
  }

  const data_impuesto = await impuesto
    .query(`SELECT * FROM "CalendarioTributario"`)
    .then(it => it)
    .catch(error => {
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error en la base de datos de Impuestos consultando los impuestos",
      };
    });

  const data_impuesto_Map = new Map();
  for (const oRow of data_impuesto.rows) {
    data_impuesto_Map.set(oRow.NumeroRut, oRow);
  }

  for (const oRow of data_nexia.rows) {
    const oRowMap = data_impuesto_Map.get(oRow.nit);

    if (oRowMap) {
      const combinedRow = { ...oRow, ...oRowMap, NumeroRut: undefined };
      joinedData.push(combinedRow);
    }
  }

  return joinedData;
}


async function getCalendarioNacional() {
  const impuesto = await getImpuestosConnection();

  return await impuesto.query(`
      SELECT ob.cod_obligacion,
        ob.obligacion,
        ob.cod_impuesto,
        c.digito,
        c.fecha_limite,
        c.tipo_impuesto,
        c.tipo_pago,
        c.observacion
      FROM obligaciones_trib ob
      JOIN calendario c ON c.tipo_impuesto::text = ob.cod_impuesto 
    `)
    .then(it => it)
    .catch(error => {
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error en la base de datos de Impuestos consultando los impuestos",
      };
    });
}

async function getImpuestosNacionales() {
  const impuesto = await getImpuestosConnection();

  return await impuesto.query(`
      SELECT *
      FROM obligaciones_trib ot 
      INNER JOIN tipo_impuesto ti ON ot.cod_impuesto = ti.codigo::TEXT
    `)
    .then(it => it)
    .catch(error => {
      console.log(error);
      throw {
        ok: false,
        status_cod: 500,
        data: "Ocurrió un error en la base de datos de Impuestos consultando los impuestos",
      };
    });
}

function unlinkFile(file) {
  fs.unlinkSync(file);
}

/**
 * 
 * @param {string} dateString
 * @returns 
 */
function getDate(dateString) {
  let date = new Date(Date.parse(dateString));
  return ('0' + date.getDate()).slice(-2) + '/'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
    + date.getFullYear();
}

/**
 * 
 * @param {string} dateString
 * @returns 
 */
function getDateHM(dateString) {
  let date = new Date(Date.parse(dateString));

  return ('0' + date.getDate()).slice(-2) + '/'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
    + date.getFullYear() + ' '
    + date.getHours() + ':' + date.getMinutes();
}


module.exports = {
  insertarImpuesto,
  getImpuestos,
  getClientesMunicipio,
  getTemplatePath,
  getBase64File,
  getInputStreamFile,
  savePlanTrabajo,
  unlinkFile,
  getDate,
  getDateHM,
  getCalendarioClienteNacional,
  getCalendarioNacional,
  getImpuestosNacionales
};
