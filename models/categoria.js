const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El Nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function(){
    const { __v, password, _id, ...data } = this.toObject();
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );