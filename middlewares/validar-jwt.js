const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require("../models/user");

const validarJWT = async (req = request, resp = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return resp.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return resp.status(401).json({
                msg: 'Token no válido - Usuario no existe'
            })
        }

        req.usuario = usuario;

        if(!usuario.state){
            return resp.status(401).json({
                msg: 'Token no válido'
            })
        }
        
        next();
    } catch (error) {
        console.log(error);
        resp.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = validarJWT;