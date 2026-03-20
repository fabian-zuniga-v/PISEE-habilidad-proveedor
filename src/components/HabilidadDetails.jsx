import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { formatRut } from '../utils/format';

const HabilidadDetails = ({ data, causales }) => {
  return (
    <div className="space-y-8 print:space-y-4 print:break-before-page">
      {/* Header - Hidden on print */}
      <div className="flex items-center gap-4 print:hidden">
        <h3 className="text-2xl font-bold text-slate-800 tracking-tight">Estado de habilidad</h3>
        {data.estado === 'HABIL' && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-md font-bold text-[10px] uppercase border border-green-200 shadow-sm shadow-green-50">
            <CheckCircle size={12} className="text-green-600" />
            {data.estado}
          </div>
        )}
      </div>

      <p className="text-slate-600 leading-relaxed text-sm max-w-4xl print:hidden">
        El proveedor con RUT <span className="font-bold text-slate-800">{formatRut(data.rut)}</span> se encuentra en estado <span className="font-bold text-slate-800 text-mp-blue">{data.estado}</span>, por no afectarle ninguna de las causales de inhabilidad descritas en el artículo 154 del Reglamento de la Ley N°19.886 de Compras Públicas.
      </p>

      <div>
        <h4 className="text-lg font-bold text-slate-800 mb-6 tracking-tight flex items-center gap-2 print:mb-4 print:text-md print:border-b print:border-slate-200 print:pb-2">
          Detalle habilidad
          <span className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-400 print:hidden">12</span>
        </h4>

        {/* Integrated List with Print Optimizations */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100 print:shadow-none print:rounded-none print:border-0 print:divide-slate-200">
          {causales.map((item, index) => (
            <div key={index} className="px-6 py-5 flex flex-col md:flex-row md:items-center gap-6 group hover:bg-slate-50 transition-colors print:py-3 print:px-0 print:flex-col print:items-start print:gap-1 print:hover:bg-transparent">
              {/* Causal Title - Visible on Print but compact */}
              <div className="md:w-72 shrink-0">
                <h5 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-mp-blue transition-colors mb-2 print:mb-1 print:text-[11px]">
                  {item.title}
                </h5>
                {item.estado !== 'HABIL' && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-extrabold rounded border border-red-100 uppercase">
                    INHÁBIL
                  </span>
                )}
              </div>
              
              <div className="flex-1 flex gap-3 items-center md:pl-8 md:border-l md:border-slate-100 print:pl-0 print:border-l-0">
                {item.estado === 'HABIL' ? (
                  <>
                    <CheckCircle className="text-green-600 shrink-0" size={14} />
                    <p className="text-sm text-slate-600 font-medium leading-tight print:text-[10px] print:text-slate-500">
                      {item.positiveText}
                    </p>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500 shrink-0" size={14} />
                    <p className="text-sm text-slate-600 font-medium leading-tight print:text-[10px] print:text-red-700">
                      Proveedor inhábil por esta causal.
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabilidadDetails;
