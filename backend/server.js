const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app = express()
const port = 5000

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors())
app.use(express.json())

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/') // Carpeta donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) // Nombre del archivo con marca de tiempo para evitar colisiones
    }
})

// Filtro para tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
    const tiposPermitidos = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ]

    if (tiposPermitidos.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Tipo de archivo no permitido'), false)
    }
}

// Inicializar multer con la configuración de almacenamiento y filtro
const upload = multer({ 
    storage, 
    fileFilter 
})

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('archivo'), (req, res) => {
    try {
        // Aquí podrías agregar la lógica para analizar el archivo y generar preguntas
        const preguntas = analizarArchivoYGenerarPreguntas(req.file.path)
        res.status(200).send({ mensaje: 'Archivo subido exitosamente', preguntas })
    } catch (error) {
        console.error('Error al subir el archivo:', error)
        res.status(500).send({ mensaje: 'Falló la subida del archivo' })
    }
})

// Función simulada para analizar el archivo y generar preguntas
function analizarArchivoYGenerarPreguntas(filePath) {
    // Aquí va la lógica para analizar el archivo y generar preguntas
    // Esto es solo un ejemplo simple
    return [
        { pregunta: '¿Cuál es el tema principal del documento?' },
        { pregunta: 'Menciona tres puntos clave del documento.' }
    ]
}

// Middleware para manejar errores
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send({ mensaje: err.message })
    } else {
        next()
    }
})

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
