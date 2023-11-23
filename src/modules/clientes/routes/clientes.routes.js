const { Router } = require('express');
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

// api handlers
const { crearClienteAPI, actualizarClienteAPI, listarClientesAPI, crearContratoAPI,
    asignacionUsuariosAPI, getClientePageAPI, actualizarCalendarioAPI, listarFechasAPI, actualizarFechaAPI, crearIngresoAPI, crearEgresoAPI, crearRolAPI, crearPermisoAPI } = require('../api/clientes.api');
const { isAuthenticatedMW, checkPermissions } = require('../../auth/api/auth.api');


const router = Router();

/**
 *  {
 *      headers: {
 *          Authorization | jwt: string,
 *      },
 * 
 *      body: {
 *          nombre: string | undefined,
 *          nit: string | undefined,
 *          direccion: string | undefined,
 *          obligaciones_tributarias: [] | undefined
 *      },
 * 
 *      query: {
 *          id: number
 *      }
 * 
 *  }
 */
router.patch('/clientes/actualizarCliente', isAuthenticatedMW, checkPermissions([2]), actualizarClienteAPI);

/**
 *  {
 *      headers: {
 *          Authorization | jwt: string,
 *      },
 *      query: {
 *          id_cliente: number
 *      }
 *  }
 */
router.get('/clientes/getClientePage', isAuthenticatedMW, checkPermissions([1, 2]), getClientePageAPI)

/**
 *  {
 *      headers: {
 *          Authorization | jwt: string,
 *      }
 *      body: {
 *          id_cliente: number, 
 *          fecha_inicio: Date,
 *          fecha_fin: Date,
 *          id_servicio: number
 *      },
 *      
 *  }
 */
router.post('/contrato/crearContrato', isAuthenticatedMW, checkPermissions([1, 2]), crearContratoAPI);


/**
 *  {
 *      headers: {
 *          Authorization | jwt: string,
 *      },
 *      body: {
 *          id_cliente: number, 
 *          id_usuario: number,
 *      }
 *  }
 */
router.delete('/clientes/usuario', isAuthenticatedMW, checkPermissions([1, 2]), asignacionUsuariosAPI);

router.get('/fechas/listar', listarFechasAPI);

router.patch('/fechas/actualizarFecha', actualizarFechaAPI);

router.post('/clientes/RUT', actualizarCalendarioAPI);

router.post('/crearIngreso', crearIngresoAPI);

router.post('/crearEgreso', crearEgresoAPI);

router.post('/crearRol', crearRolAPI);

router.post('/crearPermiso', crearPermisoAPI);
module.exports = router;