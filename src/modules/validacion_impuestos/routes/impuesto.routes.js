const { Router } = require('express');
const { isAuthenticatedMW, checkPermissions } = require('../../auth/api/auth.api');
const { crearImpuestoAPI, listarImpuestosAPI, extractICAFormAPI,
    getOptionsICAAPI, extractRETEICAFormAPI, uploadPlanTrabajoAPI,
    listarCalendarioClienteNacionalAPI, listarCalendarioNacionalAPI,
    listarImpuestosNacionalesAPI } = require('../api/impuesto.api');

const router = Router();

router.post('/impuesto/crearImpuesto', isAuthenticatedMW, crearImpuestoAPI);
router.get('/impuesto/getImpuesto', isAuthenticatedMW, listarImpuestosAPI);
router.get('/impuesto/options', isAuthenticatedMW, checkPermissions([1, 2]), getOptionsICAAPI);

//IMPUESTO ICA
router.post('/impuesto/ica/extractForm', isAuthenticatedMW, extractICAFormAPI);
router.post('/impuesto/uploadPlanTrabajo', isAuthenticatedMW, uploadPlanTrabajoAPI);

//IMPUESTO RETEICA
router.post('/impuesto/reteica/extractForm', isAuthenticatedMW, extractRETEICAFormAPI);

//IMPUESTOS NACIONALES
router.get('/impuesto/getCalendariosClienteNacional', listarCalendarioClienteNacionalAPI);

router.get('/impuesto/getCalendariosNacional', listarCalendarioNacionalAPI);

router.get('/impuesto/getImpuestosNacionales', listarImpuestosNacionalesAPI);

module.exports = router;
