const { Router, response } = require("express");
const { check } = require("express-validator");
const { cargarArchivos, mostrarImagen, actualizarImagenCloudDinary } = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const { fieldValidation } = require("../middlewares/field-validation");

const router = Router();

router.post("/", cargarArchivos);
router.put(
  "/:coleccion/:id",
  [
    check("id", "Tiene que ser un ID de mongo valido").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    fieldValidation,
  ],
  actualizarImagenCloudDinary
);

router.get("/:coleccion/:id", [
  check("id", "Tiene que ser un ID de mongo valido").isMongoId(),
  check("coleccion").custom((c) =>
    coleccionesPermitidas(c, ["usuarios", "productos"])
  ),
  fieldValidation,
], mostrarImagen);

module.exports = router;
