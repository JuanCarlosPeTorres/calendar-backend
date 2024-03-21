/*
    Events Routes
    /api/events
*/

const express = require("express");
const { check } = require('express-validator')
const { validarToken } = require("../middlewares/validarToken");
const { validarCampos } = require('../middlewares/validarCampos')
const { isDate } = require('../helpers/isDate')

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");

const router = express.Router();

router.use(validarToken);

router.get("/", getEventos);

router.post(
    "/", 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
