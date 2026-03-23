export const formatRut = (rut) => {
  if (!rut) return '';
  
  // Limpiar y limitar a máximo 9 caracteres alfanuméricos (8 cuerpo + 1 DV)
  let value = rut.replace(/[^0-9kK]/g, '').slice(0, 9);
  
  if (value.length <= 1) return value;
  
  // Dividir en cuerpo y DV
  const dv = value.slice(-1);
  const num = value.slice(0, -1);
  
  // Agregar puntos al cuerpo
  const formattedNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `${formattedNum}-${dv.toUpperCase()}`;
};

export const cleanRut = (rut) => {
  return rut.replace(/[^0-9kK]/g, '');
};
