const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");
const path = require("path");
const fs = require("fs");
const { patch } = require("../routes/users");

const cloudinary = require("cloudinary").v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivos = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json("No hay archivos que subir.");
    return;
  }

  try {
    const nombre = await subirArchivo(req.files, undefined, "textos");
    res.json({
      path: nombre,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const actualizarImagen = async (req, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un usuario con el ID " + id,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un producto con el ID " + id,
        });
      }

      break;

    default:
      return resp.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  try {
    modelo.img = await subirArchivo(req.files, undefined, coleccion);
    await modelo.save();
    resp.json(modelo);
  } catch (error) {
    resp.status(400).json({
      msg: error,
    });
  }
};

const mostrarImagen = async (req, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un usuario con el ID " + id,
        });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un producto con el ID " + id,
        });
      }

      break;

    default:
      return resp.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return resp.sendFile(pathImagen);
    }
  }

  const pathName = path.join(__dirname, "../assets/no-image.jpg");

  resp.sendFile(pathName);
};

const actualizarImagenCloudDinary = async (req, resp = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un usuario con el ID " + id,
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return resp.status(400).json({
          msg: "No existe un producto con el ID " + id,
        });
      }

      break;

    default:
      return resp.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if (modelo.img) {
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  try {
    const { tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url
      await modelo.save();
    resp.json(modelo);
  } catch (error) {
      console.log(error);
    resp.status(400).json({
      msg: error,
    });
  }
};

module.exports = {
  cargarArchivos,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudDinary,
};
