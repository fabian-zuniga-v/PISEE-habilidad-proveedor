import React from 'react';
import { CheckCircle, Download, XCircle } from 'lucide-react';
import { formatRut } from '../utils/format';
import cenabastLogo from '../assets/Logo-Cenabast.png';
import { saveCertificadoToDatabase } from '../utils/piseeStorage';

const CAUSA_MAP = {
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

const ProviderDashboard = ({ data }) => {
  if (!data) return null;

  const handlePrint = async () => {
    // 1. Configurar Título para el PDF
    const originalTitle = document.title;
    const fileName = `Certificado_Habilidad_${data.rut}_${new Date().getTime()}.pdf`;
    document.title = fileName.replace('.pdf', '');

    // 2. Elemento para el PDF
    const element = document.getElementById('printable-certificate');
    
    // Configuración para html2pdf (Asegurar que sea idéntico al impreso)
    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. Generar Base64 y GUARDAR COPIA EN SERVIDOR
    try {
      // Usamos el worker de html2pdf para capturar el PDF como Base64 sin descargar
      console.log('⏳ Generando copia de seguridad del certificado...');
      const pdfBase64 = await window.html2pdf().from(element).set(opt).outputPdf('datauristring');
      const base64Content = pdfBase64.split(',')[1];
      
      if (data.dbId) {
        const saveResult = await saveCertificadoToDatabase(data.dbId, base64Content, fileName);
        console.log('✅ Certificado guardado en base de datos:', saveResult);
      }
    } catch (err) {
      console.error('⚠️ Error al guardar copia del certificado en servidor:', err);
    }

    // 4. Abrir diálogo de impresión nativa (para visualización del usuario)
    window.print();
    
    // Restaurar título original
    document.title = originalTitle;
  };

  return (
    <div className="mb-10">
      {/* 1. VISTA WEB (Dashboard) */}
      <div className="print:hidden">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Ficha del proveedor</h1>
          <button
            className="flex items-center gap-2 px-6 py-2.5 bg-mp-blue text-white rounded-lg font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
            onClick={handlePrint}
          >
            <Download size={16} />
            Ver y Guardar Certificado
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-8 relative shadow-sm mb-10">
          <div className="absolute top-6 right-6">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold text-[10px] uppercase border ${data.estado === 'HABIL' ? 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' : 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]'
              }`}>
              {data.estado === 'HABIL' ? <CheckCircle size={12} /> : <XCircle size={12} />}
              {data.estado}
            </div>
          </div>

          <div className="mb-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">RUT DEL PROVEEDOR</span>
            <p className="text-4xl font-black text-slate-800 tracking-tight leading-none">
              {formatRut(data.rut)}
            </p>
          </div>

          <div className="border-t border-slate-100 divide-y divide-slate-100">
            <div className="py-4 flex gap-2">
              <span className="w-48 text-sm font-bold text-slate-700 shrink-0">Estado de habilidad</span>
              <span className="text-sm text-slate-600">
                {data.estado} (Cumple con los requisitos de inscripción en el Registro de Proveedores)
              </span>
            </div>
            <div className="py-4 flex gap-2 border-b border-slate-100">
              <span className="w-48 text-sm font-bold text-slate-700 shrink-0">Acreditación</span>
              <span className="text-sm text-slate-600">{data.acreditacionVigente ? 'Acreditado' : 'No vigente'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VISTA PARA EL PDF (Certificado Impreso) */}
      <div id="printable-certificate" className="hidden print:block bg-white text-slate-900 font-sans">

        {/* --- PÁGINA 1 --- */}
        <div className="p-12 min-h-screen flex flex-col">

          {/* Logo en la esquina superior izquierda */}
          <div className="flex justify-start mb-4">
            <img src={cenabastLogo} alt="Logo Cenabast" className="h-28 w-auto" />
          </div>

          {/* Títulos Centrados */}
          <div className="text-center mb-6">
            <h1 className="text-[24px] font-bold text-slate-800 leading-tight uppercase tracking-tighter">
              Certificado de Habilidad<br />
              Registro de Proveedores
            </h1>
            <p className="text-[11px] text-slate-600 mt-4 max-w-[550px] mx-auto leading-relaxed">
              Se certifica que el proveedor indicado a continuación posee el siguiente estado de habilidad para ser contratado por el Estado de Chile.
            </p>
          </div>

          {/* FICHA DEL PROVEEDOR (Compacta) */}
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 relative mb-6">
            <div className="absolute top-6 right-6">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-lg font-black text-[10px] uppercase border-2 ${data.estado === 'HABIL' ? 'bg-[#dcfce7] text-[#166534] border-[#166534]/20' : 'bg-[#fee2e2] text-[#991b1b] border-[#991b1b]/20'
                }`}>
                {data.estado === 'HABIL' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {data.estado}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">RUT Registrado</span>
              <p className="text-3xl font-black text-slate-800 tracking-tighter">
                {formatRut(data.rut)}
              </p>
            </div>

            <div className="border-t-2 border-slate-50 divide-y-2 divide-slate-50 text-[11px]">
              <div className="py-2 flex items-center">
                <span className="w-48 font-bold text-slate-700">Estado de habilidad:</span>
                <span className="text-slate-600 font-medium">Proveedor se encuentra {data.estado} para contratar con el Estado.</span>
              </div>
              <div className="py-2 flex items-center border-b-2 border-slate-50">
                <span className="w-48 font-bold text-slate-700">Acreditación:</span>
                <span className="text-slate-600 font-medium">{data.acreditacionVigente ? 'Acreditado' : 'No vigente'}</span>
              </div>
            </div>
          </div>

          {/* Observaciones (Textos Exactos según Imagen) */}
          <div className="mt-4">
            <h3 className="text-[14px] font-bold text-slate-800 mb-6 uppercase tracking-wider border-b-2 border-slate-100 pb-2">Observaciones:</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-[160px_1fr] gap-6 items-start">
                <div className="flex items-center gap-2 text-[#198754] font-bold text-[11px] uppercase">
                  <CheckCircle size={14} className="text-[#198754]" /> HÁBIL
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-medium">
                  Cumple con los requisitos para contratar con el Estado de acuerdo a las causales establecidas en el Reglamento de la Ley N° 19.886.
                </p>
              </div>

              <div className="grid grid-cols-[160px_1fr] gap-6 items-start">
                <div className="flex items-center gap-2 text-[#dc3545] font-bold text-[11px] uppercase">
                  <XCircle size={14} className="text-[#dc3545]" /> INHÁBIL
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-medium">
                  No cumple con uno o más de los requisitos para contratar con el Estado.
                </p>
              </div>

              <div className="grid grid-cols-[160px_1fr] gap-6 items-start">
                <div className="flex items-center gap-2 text-[#ffc107] font-bold text-[11px] uppercase">
                  <div className="w-4 h-4 rounded-full border-2 border-[#ffc107] flex items-center justify-center text-[10px] font-black">?</div>
                  EN REVISIÓN
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-medium">
                  Proveedor se encuentra en proceso de validación con fuentes oficiales para Ingreso al sistema. Su estado de habilidad aparecerá a contar del día hábil siguiente.
                </p>
              </div>

              <div className="grid grid-cols-[160px_1fr] gap-6 items-start">
                <div className="flex items-center gap-2 text-[#6c757d] font-bold text-[11px] uppercase">
                  <div className="w-4 h-4 rounded-full bg-[#6c757d] flex items-center justify-center text-white text-[12px] font-black">—</div>
                  SIN INFORMACIÓN
                </div>
                <p className="text-[11px] text-slate-600 leading-normal font-medium">
                  Proveedor no tiene contrato vigente con el Registro de Proveedores.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 flex justify-between items-end border-t border-slate-100 text-[8.5px] text-slate-400">
            <div className="max-w-[70%]">
              <p className="italic leading-tight">
                Información obtenida mediante el nodo de interoperabilidad <strong>'habilidadProveedor'</strong>, publicado en el catálogo de servicios de la Plataforma de Interoperabilidad del Estado (PISEE) por la Dirección de Compras y Contratación Pública (ChileCompra).
              </p>
            </div>
            <p className="font-medium">Fecha consulta: {data.fechaConsulta || `${new Date().toLocaleDateString('es-CL')} - ${new Date().toLocaleTimeString('es-CL')}`}</p>
          </div>
        </div>

        {/* --- PÁGINA 2 --- */}
        <div className="p-12 border-t-0" style={{ pageBreakBefore: 'always' }}>
          <h2 className="text-xl font-bold text-slate-800 mb-8 uppercase border-b-2 border-slate-800 pb-4">
            II. Detalle de Habilidad y Causales
          </h2>
          <div className="space-y-1">
            {(data.causales || []).map((c, i) => {
              const info = CAUSA_MAP[c.causa] || { title: c.causa, positiveText: `Estado: ${c.estado}` };
              return (
                <div key={i} className="flex items-start gap-4 p-1 border-b border-slate-50 last:border-0">
                  <div className="shrink-0 mt-0.5">
                    {c.estado === 'SI' ? <XCircle size={11} className="text-red-600" /> : <CheckCircle size={11} className="text-green-600" />}
                  </div>
                  <div className="flex-1 text-[11px] leading-relaxed">
                    <span className="font-bold text-slate-800 uppercase mr-2">{info.title}:</span>
                    <span className="text-slate-600">{c.estado === 'SI' ? "Inhabilidad registrada." : info.positiveText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
