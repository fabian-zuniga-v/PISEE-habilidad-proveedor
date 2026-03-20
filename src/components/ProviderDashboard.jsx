import React from 'react';
import { CheckCircle, Download, XCircle, HelpCircle, MinusCircle } from 'lucide-react';
import { formatRut } from '../utils/format';

const ProviderDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mb-10">
      {/* --- WEB ONLY VIEW --- */}
      <div className="print:hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 font-primary">Ficha del proveedor</h2>
          <button 
            className="flex items-center gap-2 px-6 py-2.5 bg-mp-blue text-white rounded-lg font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
            onClick={() => window.print()}
          >
            <Download size={16} />
            Descargar Certificado
          </button>
        </div>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 relative overflow-hidden shadow-sm">
          {/* Status Badge */}
          <div className="absolute top-0 right-0 p-6">
            {data.estado === 'HABIL' ? (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-md font-bold text-[10px] uppercase border border-green-200 shadow-sm shadow-green-100">
                <CheckCircle size={12} className="text-green-600" />
                {data.estado}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-md font-bold text-[10px] uppercase border border-red-200 shadow-sm shadow-red-100">
                <XCircle size={12} className="text-red-600" />
                {data.estado}
              </div>
            )}
          </div>

          {/* Identity Section */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-10">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">RUT del Proveedor</span>
              <p className="text-3xl font-black text-slate-800 tracking-tight leading-tight">{formatRut(data.rut)}</p>
            </div>
          </div>

          {/* Details List */}
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {[
              { label: 'Estado de habilidad', value: `${data.estado} (Cumple con los requisitos de inscripción en el Registro de Proveedores)` },
              { label: 'Estado de acreditación', value: data.acreditacionVigente ? 'Proveedor acreditado' : 'Acreditación no vigente' }
            ].map((row, i) => (
              <div key={i} className="flex flex-col md:flex-row px-6 py-4 hover:bg-slate-50 transition-colors group">
                <span className="w-full md:w-48 text-sm font-bold text-slate-700 shrink-0 mb-1 md:mb-0">{row.label}</span>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PRINT ONLY VIEW (CERTIFICATE) --- */}
      <div className="hidden print:block">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight mb-2 uppercase">
            Certificado de Habilidad<br />
            Registro de Proveedores
          </h1>
          <p className="text-[10px] text-slate-500 max-w-2xl mx-auto leading-relaxed mt-4 italic">
            Se certifica que el proveedor indicado a continuación posee el siguiente estado de habilidad para ser contratado por el Estado de Chile, de acuerdo a la fecha y hora de la consulta especificada.
          </p>
        </div>
        
        {/* Identity Card - Matching Screenshot 501 exactly */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 relative shadow-sm">
          {/* Status Badge - Top Right */}
          <div className="absolute top-8 right-8">
            {data.estado === 'HABIL' ? (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded font-black text-[10px] uppercase border border-green-200">
                <CheckCircle size={12} className="stroke-[3]" />
                {data.estado}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded font-black text-[10px] uppercase border border-red-200">
                <XCircle size={12} className="stroke-[3]" />
                {data.estado}
              </div>
            )}
          </div>

          {/* RUT Info */}
          <div className="mb-8">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">RUT del Proveedor</span>
            <p className="text-4xl font-black text-slate-800 tracking-tight leading-none">{formatRut(data.rut)}</p>
          </div>

          {/* Nested Details Box */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 flex items-center border-b border-slate-100">
              <span className="w-40 text-[10px] font-bold text-slate-700 shrink-0">Estado de habilidad</span>
              <span className="text-[10px] text-slate-500 font-medium">HABIL (Cumple con los requisitos de inscripción en el Registro de Proveedores)</span>
            </div>
            <div className="px-6 py-4 flex items-center">
              <span className="w-40 text-[10px] font-bold text-slate-700 shrink-0">Estado de acreditación</span>
              <span className="text-[10px] text-slate-500 font-medium">{data.acreditacionVigente ? 'Proveedor acreditado' : 'Acreditación no vigente'}</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 bg-slate-50 border border-slate-100 rounded-xl p-8">
          <h4 className="text-[11px] font-black text-slate-800 mb-4 uppercase tracking-wider">Observaciones:</h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
               <div className="flex items-center gap-2 shrink-0 w-32">
                 <CheckCircle size={14} className="text-green-600" />
                 <span className="text-[10px] font-black text-green-700 uppercase">HÁBIL</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-normal">
                 Cumple con los requisitos para contratar con el Estado de acuerdo a las causales establecidas en el Reglamento de la Ley N° 19.886.
               </p>
            </div>
            
            <div className="flex gap-4 items-start opacity-70">
               <div className="flex items-center gap-2 shrink-0 w-32">
                 <XCircle size={14} className="text-red-600" />
                 <span className="text-[10px] font-black text-red-700 uppercase">INHÁBIL</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-normal">
                 No cumple con uno o más de los requisitos para contratar con el Estado.
               </p>
            </div>

            <div className="flex gap-4 items-start opacity-70">
               <div className="flex items-center gap-2 shrink-0 w-32">
                 <HelpCircle size={14} className="text-yellow-500" />
                 <span className="text-[10px] font-black text-yellow-700 uppercase">EN REVISIÓN</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-normal">
                 Proveedor se encuentra en proceso de validación con fuentes oficiales para Ingreso al sistema. Su estado de habilidad aparecerá a contar del día hábil siguiente.
               </p>
            </div>

            <div className="flex gap-4 items-start opacity-70">
               <div className="flex items-center gap-2 shrink-0 w-32">
                 <MinusCircle size={14} className="text-slate-400" />
                 <span className="text-[10px] font-black text-slate-500 uppercase">SIN INFORMACIÓN</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-normal">
                 Proveedor no tiene contrato vigente con el Registro de Proveedores.
               </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer - PISEE node HabilidadProveedor */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-[9px] text-slate-400 text-center leading-relaxed max-w-2xl mx-auto italic">
            La información contenida en este documento ha sido obtenida electrónicamente desde el catálogo de servicios de la Plataforma de Interoperabilidad del Estado (PISEE), específicamente a través del nodo <span className="font-bold text-slate-600">HabilidadProveedor</span>, garantizando su autenticidad y plena validez legal conforme a la normativa vigente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
