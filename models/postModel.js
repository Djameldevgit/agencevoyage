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
    destinacion: String, // Campo unificado para destino

    // 🔷 FECHAS Y DURACIÓN
    datedepar: String,
    horadudepar: String,
    dateretour: String,
    dureeSejour: String,
    
    // 🔷 INFORMACIÓN HOTEL
    nombreHotel: String,
    ciudadHotel: String,
    zonaRegion: String,
    direccionHotel: String,
    commune: String,

    hotelMeca: String,
    hotelMedina: String,

    // 🔷 CAMPOS ESPECÍFICOS POR CATEGORÍA
    // Hajj & Omra
    categoriaHotelMeca: String,
    compagnieAerienne: String,
    typeTransport: String,
    precioBase: String,
    tipoPrecio: String,

    // 🆕 NUEVOS CAMPOS PARA TRANSPORTE HAJJ/OMRA
    classeVol: String,              // Clase de vuelo
    transportTerrestre: String,     // Transporte terrestre

    // Location Vacances  
    tipoPropiedad: String,
    capacidad: String,
    habitaciones: String,
    superficie: String,
    nombrePropiedad: String,
    
    // 🆕 NUEVOS CAMPOS PARA LOCATION VACANCES
    categoria: String,      // Categoría/comodidades (económico, estándar, premium, etc.)
    banos: String,         // Número de baños

    // Voyage Organisé
    categoriaAlojamiento: String,
    tipoHabitacion: String,
    regimenComidas: String,
    modeTransport: String,
    classeTransport: String,

    // 🔷 SISTEMA DE PRECIOS COMPLETO
    price: String,
    prixAdulte: String,
    prixEnfant: String,
    prixBebe: String,
    
    // 💰 NUEVOS CAMPOS DE PRECIOS
    tarifaNinos: String,
    tarifaBebes: String,
    descuentoGrupo: {
        type: Boolean,
        default: false
    },
    ofertaEspecial: {
        type: Boolean, 
        default: false
    },
    
    // 🆕 NUEVOS CAMPOS DE DESCUENTOS
    descuentoTemporadaBaja: {
        type: Boolean,
        default: false
    },
    descuentoAnticipacion: {
        type: Boolean,
        default: false
    },

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
postSchema.index({ destinacion: 1 }) // Nuevo índice para búsquedas por destino

// 🆕 NUEVOS ÍNDICES PARA LOCATION VACANCES
postSchema.index({ tipoPropiedad: 1 })
postSchema.index({ categoria: 1 })
postSchema.index({ capacidad: 1 })
postSchema.index({ habitaciones: 1 })

// 🆕 NUEVOS ÍNDICES PARA TRANSPORTE HAJJ/OMRA
postSchema.index({ typeTransport: 1 })
postSchema.index({ compagnieAerienne: 1 })
postSchema.index({ classeVol: 1 })

// 🆕 NUEVOS ÍNDICES PARA DESCUENTOS
postSchema.index({ descuentoGrupo: 1 })
postSchema.index({ ofertaEspecial: 1 })
postSchema.index({ descuentoTemporadaBaja: 1 })

module.exports = mongoose.model('post', postSchema)