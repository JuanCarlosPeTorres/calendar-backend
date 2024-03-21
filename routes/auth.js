/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { validarCampos } = require("../middlewares/validarCampos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarToken } = require("../middlewares/validarToken");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El mail es obligatorio").isEmail(),
    check(
      "password",
      "El password debe ser de 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El mail es obligatorio").isEmail(),
    check(
      "password",
      "El password debe ser de 6 caracteres como mínimo"
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarToken, revalidarToken);

module.exports = router;
