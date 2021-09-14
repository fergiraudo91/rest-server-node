const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ["jpg", "png", "gif", "jpeg"], carpeta='') => {
  return new Promise((resolve, reject) => {
    const archivo = files ? files.archivo: undefined;

    if(!archivo){
      return reject('Se necesita subir un archivo');
    }

    const nombreCortado = archivo.name.split(".");

    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extension ${extension} no es permitida`);
    }

    const nombreTemporal = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemporal);

    archivo.mv(uploadPath, function (err) {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemporal);
    });
  });
};

module.exports = {
  subirArchivo,
};
