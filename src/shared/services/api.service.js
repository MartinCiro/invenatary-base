const axios = require("axios");
const config = require("../../config");

/**
 * @param {{
 *      method: string,
 *      body: {},
 *      params: {},
 *      headers: {}
 * }} axiosConfig
 * @returns {Promise<{}>}
 */

async function requestICAETLAPI(axiosConfig) {
  const baseURL = config.ETL_HOST;
  const url = "/extracticaform";

  const { body, params, headers, method } = axiosConfig;

  return axios({
    method,
    baseURL,
    url,
    data: body,
    params,
    headers,
  })
    .then((res) => {
      const { data } = res;
      console.log(data);

      if (data.status_cod) {
        throw {
          ok: false,
          status_cod: '500',
          data: 'Ocurrió un error inesperado extrayendo info del formulario',
        }
      }

      let lista = { renglones: [], actividades: [] };
      for (const renglon in data) {
        if (
          renglon != "actividades_gravadas" &&
          renglon != "municipio_distrito"
        ) {
          let info = {
            codigo: String(data[renglon][0])
              .replaceAll(".", "")
              .replaceAll("-", "")
              .replaceAll(" ", ""),
            concepto: data[renglon][1],
            valor: String(data[renglon][2])
              .replaceAll(",", "")
              .replaceAll("$", "")
              .replaceAll(".", ""),
          };

          lista.renglones.push(info);
        } else if (renglon == "actividades_gravadas") {
          const actividades_gravadas = data[renglon];
          let gravadas = [];
          for (const actividad_gravada in actividades_gravadas) {
            let actividad = actividades_gravadas[actividad_gravada];

            if (actividad_gravada == 'total_gravados') {
              lista[actividad_gravada] = actividad[1]
                .replaceAll(",", "")
                .replaceAll("$", "")
                .replaceAll(".", "");
              continue;
            }

            if (
              !Array.isArray(actividad) ||
              actividad.length < 4 ||
              actividad[0] == "" ||
              actividad[0] == "ACTIVIDADES GRAVADAS"
            ) continue;

            // SE VALIDA QUE VENGA LA TARIFA. SE HA VISTO EL COMPORTAMIENTO DE QUE SI LA TARIFA VIENE, LA ACTIVIDAD ESTÁ BIEN EXTRAÍDA
            const tarifa = String(actividad[2])
              .replaceAll(",", ".")
              .replaceAll("$", "");

            if (isNaN(Number(tarifa))) continue;

            let info = {
              actividad: actividad_gravada,
              codigo: actividad[0],
              ingreso_gravado: Number(
                String(actividad[1])
                  .replaceAll(",", "")
                  .replaceAll("$", "")
                  .replaceAll(".", "")
              ),
              tarifa: Number(tarifa),
              valor: Number(
                String(actividad[3])
                  .replaceAll(",", "")
                  .replaceAll("$", "")
                  .replaceAll(".", "")
              ),
            };

            gravadas.push(info);
          }

          lista.actividades = gravadas;
        } else {
          lista[renglon] = data[renglon];
        }
      }

      return lista;
    })
    .catch(error => {
      if (error.status_cod) {
        throw error;
      }
      console.log(error)
    });
}

async function requestAPIRUTAPI() {
  const url = config.ETL_HOST;
  const {
    nombre_obligacion,
    municipio,
    periodicidad,
    uvt,
    regimen,
    digito,
    periodo,
    fecha,
  } = infoRut;
}

/**
 * @param {{
 *      method: string,
 *      body: {},
 *      params: {},
 *      headers: {}
 * }} axiosConfig
 * @returns {Promise<{}>}
 */
async function requestRETEICAAPI(axiosConfig) {
  const baseURL = config.ETL_HOST;
  const url = "/extractreteicaform";

  const { body, params, headers, method } = axiosConfig;

  return axios({
    method,
    baseURL,
    url,
    data: body,
    params,
    headers,
  })
    .then((res) => {
      const { data } = res;
      console.log(data);
      let lista = { renglones: [], actividades: [], base_gravable: [], };

      if (data.status_cod) {
        throw {
          ok: false,
          status_cod: '500',
          data: 'Ocurrió un error inesperado extrayendo info del formulario',
        }
      }

      for (const renglon in data) {
        if (renglon == '') continue;

        let key = renglon
          .replaceAll(".", "")
          .replaceAll("-", "")
          .replaceAll(" ", "");

        if (!isNaN(Number(key))) {
          let info = {
            codigo: String(data[renglon][0])
              .replaceAll(".", "")
              .replaceAll("-", "")
              .replaceAll(" ", ""),
            concepto: data[renglon][1],
            valor: String(data[renglon][2])
              .replaceAll(",", "")
              .replaceAll("$", "")
              .replaceAll(".", ""),
          };
          lista.renglones.push(info);

          continue;
        } else if (renglon == 'base_gravable') {
          continue;
        } else {
          lista[renglon] = data[renglon];
        }
      }


      if (lista.renglones
        && Array.isArray(lista.renglones)
        && lista.renglones.length
        && data.base_gravable) {
        for (const cod_base in data.base_gravable) {
          let key = cod_base
            .replaceAll(".", "")
            .replaceAll("-", "")
            .replaceAll(" ", "");

          let renglonIndex = lista.renglones.findIndex(it => it.codigo == key);

          if (renglonIndex < 0) continue;

          lista.renglones[renglonIndex].base = data.base_gravable[cod_base][1]
            .replaceAll(",", "")
            .replaceAll("$", "")
            .replaceAll(".", "");
        }
      }

      return lista;
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  requestICAETLAPI,
  requestAPIRUTAPI,
  requestRETEICAAPI,
};
