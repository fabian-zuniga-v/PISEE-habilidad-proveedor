/**
 * Converts a date string from "DD-MM-YYYY HH:mm" or "DD-MM-YYYY" to ISO "YYYY-MM-DD HH:mm:ss"
 * Essential for SQL Server DATE and DATETIME types.
 */
const formatDBDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split(' ');
  const dateParts = parts[0].split('-');
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // YYYY-MM-DD
  return parts[1] ? `${formattedDate} ${parts[1]}:00` : formattedDate;
};

/**
 * Prepares the payload for database insertion.
 * Note: IDs are handled by the database DEFAULT (NEWID()).
 */
export const prepareHabilidadDataForDB = (response) => {
  const { success, trace, payload, errores } = response;
  
  return {
    main: {
      success,
      trace,
      rut: payload.rut,
      estado: payload.estado,
      acreditacionVigente: payload.acreditacionVigente ? 1 : 0, // Bit (0/1)
      fechaCalculoHabilidad: formatDBDate(payload.fechaCalculoHabilidad),
      fechaConsulta: formatDBDate(payload.fechaConsulta),
      errores: errores ? JSON.stringify(errores) : null
    },
    causales: payload.causales.map(item => ({
      causa: item.causa,
      estado: item.estado
    }))
  };
};

/**
 * Real fetch call to the local storage server.
 * This will hit http://localhost:3001/storage/save-habilidad via Vite proxy.
 */
export const saveToDatabase = async (data) => {
  try {
    const response = await fetch('/storage/save-habilidad', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error al guardar en el servidor de base de datos.');
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

/**
 * Saves a base64 PDF certificate into the database.
 */
export const saveCertificadoToDatabase = async (respuesta_id, archivo_base64, nombre_archivo) => {
  try {
    const response = await fetch('/storage/save-certificado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        respuesta_id,
        archivo_base64,
        nombre_archivo
      })
    });

    if (!response.ok) {
      throw new Error('Error al guardar el certificado en la base de datos.');
    }

    return await response.json();

  } catch (error) {
    console.error('Certificado save error:', error);
    throw error;
  }
};
