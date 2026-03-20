import React, { useState } from 'react';
import { formatRut, cleanRut } from '../utils/format';

const Search = ({ onSearch, isLoading }) => {
  const [rut, setRut] = useState('');

  const handleChange = (e) => {
    const formatted = formatRut(e.target.value);
    setRut(formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rut.trim()) {
      // Send the clean RUT to the API (e.g. 76106857-1) or (761068571)
      // Usually these APIs expect it with hyphen or just numbers.
      // Based on endpoint provided: /habilidad/76106857-1, it needs the hyphen.
      const cleaned = cleanRut(rut);
      if (cleaned.length > 1) {
        const dv = cleaned.slice(-1);
        const num = cleaned.slice(0, -1);
        onSearch(`${num}-${dv}`);
      }
    }
  };

  return (
    <div className="mb-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-1">Búsqueda de proveedores</h2>
        <p className="text-slate-500 text-sm">Revisa si un determinado proveedor se encuentra inscrito en Mercado Público.</p>
      </div>
      
      <form className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex flex-col md:flex-row items-end gap-4 shadow-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full md:w-32">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identificador</label>
          <select className="bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-mp-blue outline-none transition-all cursor-pointer">
            <option value="RUT">RUT</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-2 flex-1 w-full max-w-sm">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rut chileno</label>
          <input 
            type="text" 
            className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-100 focus:border-mp-blue outline-none transition-all" 
            value={rut}
            onChange={handleChange}
            placeholder="Ej: 7.610.685-7"
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full md:w-auto px-10 py-2.5 bg-mp-blue text-white rounded-full font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-200"
          disabled={!rut.trim() || isLoading}
        >
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </div>
  );
};

export default Search;
