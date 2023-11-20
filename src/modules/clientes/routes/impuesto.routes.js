const Router = require('express');
const { isAuthenticatedMW, checkPermissions } = require('../../auth/api/auth.api');
const { crearImpuestoAPI, listarImpuestosAPI, asignarImpuestoAPI, listarCalendariosAPI } = require('../api/impuesto.api');

// Inicializar router
const router = Router();


// CREAR IMPUESTO
/**
 * @param body {
 *          nombre: string,
 *          tipo: string,
 *          id_municipo: number,
 *          municipio: string,
 *          departamento: string,
 *      }
 */
router.post('/impuesto', isAuthenticatedMW, checkPermissions([1, 2]), crearImpuestoAPI);
// LISTAR IMPUESTOS
router.get('/impuesto', isAuthenticatedMW, checkPermissions([1, 2]), listarImpuestosAPI);


// ASIGNAR IMPUESTO A CLIENTE
/**
 * @param body: {
 *          id_impuesto: number,
 *          id_cliente: number,
 *          id_calendario: number
 *      }
 */
router.post('/impuesto/cliente', isAuthenticatedMW, checkPermissions([1, 2]), asignarImpuestoAPI);
// DESASIGNAR IMPUESTO DE CLIENTE
router.delete('/impuesto/cliente', isAuthenticatedMW, checkPermissions([1, 2]), );
// ACTUALIZAR CALENDARIO DE CLIENTE
router.put('/impuesto/cliente', isAuthenticatedMW, checkPermissions([1, 2]), );


// LISTAR CALENDARIOS
router.get('/impuesto/calendarios', isAuthenticatedMW, checkPermissions([1, 2]), listarCalendariosAPI);
// SUBIR CALENDARIOS
router.post('/impuesto/calendarios', isAuthenticatedMW, checkPermissions([1, 2]), );


module.exports = router;