const { request, response } = require("express")

const adminRol = (req = request, resp = response, next) => {

    if(!req.usuario){
        return resp.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        })
    }

    const {role, name } = req.usuario;

    if(role !== "ADMIN_ROLE"){
        resp.status(401).json({
            msg: `${name} no es administrador`
        })
    }

    next();

}

const tieneRol = (...roles) => {

    return (req = request, resp = response, next) => {
        if(!req.usuario){
            return resp.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        console.log(req.usuario.role);
        console.log(roles);
        if(!roles.includes(req.usuario.role)){
            return resp.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
    
        next();
    } 
}

module.exports = {
    adminRol,
    tieneRol
}