/**
 * Converts a date string from "DD-MM-YYYY HH:mm" or "DD-MM-YYYY" to ISO "YYYY-MM-DD HH:mm:ss"
 */
const formatDBDate = (dateStr) => {
  if (!dateStr) return null;
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('-');
  return timePart ? `${year}-${month}-${day} ${timePart}:00` : `${year}-${month}-${day}`;
};

/**
 * Prepares the payload for database insertion in PISEE_HabilidadRespuesta and PISEE_HabilidadCausales.
 * Note: IDs are now handled by the database DEFAULT (NEWID()).
 */
export const prepareHabilidadDataForDB = (response) => {
  const { success, trace, payload, errores } = response;
  
  // Prepare main table data
  const mainRecord = {
    // id is omitted because DB generates it automatically
    success,
    trace,
    rut: payload.rut,
    estado: payload.estado,
    acreditacionVigente: payload.acreditacionVigente ? 1 : 0, // Boolean to Bit (0/1)
    fechaCalculoHabilidad: formatDBDate(payload.fechaCalculoHabilidad),
    fechaConsulta: formatDBDate(payload.fechaConsulta),
    errores: errores ? JSON.stringify(errores) : null
  };
  
  // Prepare causales table data
  const causalesRecords = payload.causales.map(item => ({
    // id is omitted because DB generates it automatically
    // respuesta_id MUST be assigned after executing insertion of mainRecord to get the generated ID
    causa: item.causa,
    estado: item.estado
  }));
  
  return {
    main: mainRecord,
    causales: causalesRecords
  };
};

/**
 * Simulation logic to save into the database PISEE_HabilidadRespuesta / PISEE_HabilidadCausales.
 * In a real scenario, this would POST to a backend that performs the sequential inserts.
 */
export const saveToDatabase = async (data) => {
  console.log('--- Simulation: Saving to PISEE_HabilidadRespuesta ---');
  console.log('Sending data:', data.main);
  
  // Simulate database returning the auto-generated ID after main insert
  const simulatedGeneratedID = 'SIMULATED-DB-TOKEN-32-CHARS-XYZ'; 
  console.log('Simulated generated ID from DB:', simulatedGeneratedID);

  console.log('--- Simulation: Saving to PISEE_HabilidadCausales ---');
  const causalesWithFK = data.causales.map(c => ({ ...c, respuesta_id: simulatedGeneratedID }));
  console.log('Sending related items:', causalesWithFK);
  
  return { success: true, message: 'Data prepared and formatted for PISEE_HabilidadRespuesta and PISEE_HabilidadCausales.' };
};
