const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    // 🔷 CAMPOS BÁSICOS DEL SISTEMA
    content: String,
    title: String,
    images: {
        type: Array,
        required: true
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },

    // 🔷 CAMPOS PRINCIPALES DE VIAJE
    category: {
        type: String,
        default: "Agence de Voyage"
    },
    subCategory: String,
    description: String,
    wilaya: String,
    vile: String,
    contacto: String,

    // 🔷 DESTINOS SEGÚN CATEGORÍA
    destinacionlocacionvoyage: String, // Location Vacances
    destinacionomra: String,           // Hajj & Omra  
    destinacionvoyageorganise: String, // Voyage Organisé

    // 🔷 FECHAS Y DURACIÓN
    datedepar: String,
    horadudepar: String,
    dateretour: String,
    dureeSejour: String,

    // 🔷 CAMPOS ESPECÍFICOS POR CATEGORÍA
    // Hajj & Omra
    categoriaHotelMeca: String,
    compagnieAerienne: String,
    typeTransport: String,
    precioBase: String,
    tipoPrecio: String,

    // Location Vacances  
    tipoPropiedad: String,
    capacidad: String,
    habitaciones: String,
    superficie: String,
    nombrePropiedad: String,

    // Voyage Organisé
    categoriaAlojamiento: String,
    tipoHabitacion: String,
    regimenComidas: String,
    nombreHotel: String,
    modeTransport: String,
    classeTransport: String,

    // 🔷 PRECIOS
    price: String,
    prixAdulte: String,
    prixEnfant: String,
    prixBebe: String,

    // 🔷 ARRAYS PRINCIPALES
    servicios: {
        type: Array,
        default: []
    },
    specifications: {
        type: Array,
        default: []
    },

    // 🔷 META DATOS
    views: { type: Number, default: 0 }

}, {
    timestamps: true
})

// Índices para performance
postSchema.index({ category: 1, subCategory: 1 })
postSchema.index({ wilaya: 1, vile: 1 })
postSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('post', postSchema)