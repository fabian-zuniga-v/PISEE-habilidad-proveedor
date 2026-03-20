import React, { useState } from 'react';
import HabilidadDetails from './HabilidadDetails';

const ProviderTabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState('habilidad');

  const causaMap = {
    "Documentación falsa": { title: "Documentación falsa", subtitle: "Tribunales de Justicia", positiveText: "El proveedor no ha declarado documentación falsa ante el Registro Nacional de Proveedores." },
    "Suspensión": { title: "Suspensión del Registro de Proveedores", subtitle: "Dirección ChileCompra", positiveText: "No se encuentra suspendido del Registro Nacional de Proveedores por resolución fundada de la Dirección de Compras." },
    "Cohecho": { title: "Condenas por delitos de cohecho o financiamiento del terrorismo", subtitle: "Tribunales de Justicia", positiveText: "El proveedor cumple con no haber sido condenado por cualquiera de los delitos de cohecho o financiamiento del terrorismo contemplados en el título V del Libro Segundo del Código Penal." },
    "Quiebra": { title: "Liquidación concursal / Quiebra", subtitle: "Superintendencia de Insolvencia y Reemprendimiento", positiveText: "Cumple con no haber sido declarado en liquidación concursal por resolución judicial ejecutoriada." },
    "Deudas tributarias": { title: "Deudas tributarias", subtitle: "Tesorería General de la República", positiveText: "El proveedor no registra una o más deudas tributarias por un monto total superior a 500 UTM por más de un año, o superior a 200 UTM e inferior a 500 UTM por un período superior a 2 años." },
    "Delitos concursales": { title: "Sentencias Informadas por Tribunales / Delitos concursales", subtitle: "Tribunales de Justicia", positiveText: "Proveedor cumple con no haber sido condenado por delitos concursales establecidos en el Código Penal, delitos tributarios, incumplimiento contractual, prácticas antisindicales o infracción a los derechos fundamentales del trabajador. Tampoco ha sido condenado en Chile o en el extranjero por cohecho, lavado de activos o financiamiento del terrorismo." },
    "Deudas laborales": { title: "Deudas previsionales / laborales", subtitle: "Boletín Laboral Dirección del Trabajo", positiveText: "El proveedor no registra deudas previsionales o de salud por más de 12 meses por sus trabajadores dependientes, lo que se acreditará mediante certificado de la autoridad competente." },
    "Listas negras": { title: "Listas Negras Internacionales", subtitle: "Instituciones financieras multilaterales", positiveText: "Cumple con no haber sido declarado inelegible para la adjudicación de contratos por instituciones financieras multilaterales." },
    "Falta de diligencia": { title: "Condenas por incumplimiento contractual derivado de culpa o falta de diligencia", subtitle: "Tribunales de Justicia", positiveText: "Cumple con no haber sido condenado por incumplimiento contractual." },
    "Lavado de activos": { title: "Condenas por Lavado de Activos", subtitle: "Bancos Internacionales", positiveText: "Cumple con no haber sido condenado por los delitos de lavado de activos, establecido en el Párrafo 2 del Título V del Libro II del Código Penal, lavado de activos establecido en el Título III de la ley N° 19.913." },
    "Prácticas antisindicales": { title: "Prácticas antisindicales", subtitle: "Tribunales de Justicia", positiveText: "Cumple con no tener condenas por prácticas antisindicales." },
    "Eliminación": { title: "Eliminación del Registro de Proveedores", subtitle: "Dirección ChileCompra", positiveText: "Cumple con no haber sido eliminado del Registro de Proveedores por resolución fundada de la Dirección de Compras." }
  };

  const enhancedCausales = (data?.causales || []).map(item => {
    const mapped = causaMap[item.causa];
    return {
      originalCausa: item.causa,
      estado: item.estado,
      title: mapped?.title || item.causa,
      subtitle: mapped?.subtitle || 'Información no especificada',
      positiveText: mapped?.positiveText || `El proveedor se encuentra en estado ${item.estado} para la causal ${item.causa}`
    };
  });

  return (
    <div className="mt-8">
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide print:hidden">
        {[
          { id: 'general', label: 'Información general' },
          { id: 'habilidad', label: 'Habilidad' },
          { id: 'comportamiento', label: 'Comportamiento' }
        ].map((tab) => (
          <button 
            key={tab.id}
            className={`px-8 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 outline-none ${
              activeTab === tab.id 
                ? 'text-mp-blue border-mp-blue bg-blue-50/30' 
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="fade-in px-2">
        {activeTab === 'general' && <div className="p-12 text-center text-slate-400 font-medium">Contenido de información general no disponible en este demo...</div>}
        {activeTab === 'comportamiento' && <div className="p-12 text-center text-slate-400 font-medium">Contenido de comportamiento no disponible en este demo...</div>}
        {activeTab === 'habilidad' && <HabilidadDetails data={data} causales={enhancedCausales} />}
      </div>
    </div>
  );
};

export default ProviderTabs;
