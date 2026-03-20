export const formatRut = (rut) => {
  if (!rut) return '';
  
  // Remove all non-alphanumeric characters (keep K/k)
  let value = rut.replace(/[^0-9kK]/g, '');
  
  if (value.length <= 1) return value;
  
  // Split into number and divider
  const dv = value.slice(-1);
  const num = value.slice(0, -1);
  
  // Add dots to the number part
  const formattedNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `${formattedNum}-${dv.toUpperCase()}`;
};

export const cleanRut = (rut) => {
  return rut.replace(/[^0-9kK]/g, '');
};
