import { useState } from 'react'
import axios from 'axios'
import './FileUpload.css'

const FileUpload = () => {
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState(false)
    const [preguntas, setPreguntas] = useState([])

    const onArchivoCambio = async (e) => {
        const archivo = e.target.files[0]

        const tiposPermitidos = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation']
        if (!tiposPermitidos.includes(archivo.type)) {
            setMensaje('Solo se permiten archivos .pdf, .doc y .pptx')
            setError(true)
            return
        }

        const formData = new FormData()
        formData.append('archivo', archivo)

        try {
            const respuesta = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setMensaje(respuesta.data.mensaje || '¡Archivo subido exitosamente!')
            setError(false)
            setPreguntas(respuesta.data.preguntas || [])
        } catch (error) {
            console.error('Error al subir el archivo:', error)
            setMensaje('Falló la subida del archivo')
            setError(true)
        }
    }

    return (
        <div className='caja'>
            <div className="file-upload-container">
            <h2>Subir Documento</h2>
            <form>
                <label htmlFor="archivo">Seleccionar archivo:</label>
                <input 
                    type="file" 
                    id="archivo" 
                    onChange={onArchivoCambio} 
                    title="Seleccionar archivo para subir" 
                />
            </form>
            <p className={error ? 'error' : ''}>{mensaje}</p>
            {preguntas.length > 0 && (
                <div className="preguntas">
                    <h3>Preguntas Generadas</h3>
                    <ul>
                        {preguntas.map((pregunta, index) => (
                            <li key={index}>{pregunta.pregunta}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </div>
    )
}


export default FileUpload
