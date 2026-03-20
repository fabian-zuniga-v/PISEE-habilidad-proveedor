import React, { useState } from 'react';
import Search from './components/Search';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderTabs from './components/ProviderTabs';
import { prepareHabilidadDataForDB, saveToDatabase } from './utils/piseeStorage';

function App() {
  const [providerData, setProviderData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (rut) => {
    setIsLoading(true);
    setError(null);
    setProviderData(null);

    try {
      const response = await fetch(`/api/chilecompra/habilidad/${rut}`);
      
      if (!response.ok) {
        throw new Error('Error al consultar los datos del proveedor. Verifique el RUT e intente nuevamente.');
      }

      const data = await response.json();
      
      if (data.success === "OK" && data.payload) {
        setProviderData(data.payload);
        
        // --- Added Database Storage Logic ---
        try {
          const dbPayload = prepareHabilidadDataForDB(data);
          const saveResult = await saveToDatabase(dbPayload);
          console.log('Database operation:', saveResult);
        } catch (dbErr) {
          console.warn('Silent fail: Non-critical DB error during search:', dbErr);
        }
        // ------------------------------------
        
      } else {
        throw new Error(data.errores?.[0] || 'No se encontraron datos para el RUT ingresado.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Error de conexión con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mp-bg">
      <header className="print:hidden">
        {/* Main Bar with reverted color */}
        <div className="bg-[#0B213F] text-white shadow-lg">
          <div className="max-w-[1240px] mx-auto px-10 h-24 flex items-center justify-between">
            {/* Simple Branding */}
            <div className="flex items-center">
              <span className="text-3xl font-black tracking-tight leading-none text-white lowercase">cenabast</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center h-full gap-8">
              <div className="h-full flex items-center relative">
                <a 
                  href="#" 
                  className="text-xs font-bold tracking-[0.1em] text-white py-2"
                >
                  HOME
                </a>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 print:py-0 print:px-0">
        <section className="fade-in print:hidden">
          <Search onSearch={handleSearch} isLoading={isLoading} />
        </section>

        {error && (
          <div className="fade-in mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm print:hidden">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium text-sm">{error}</p>
            </div>
          </div>
        )}

        {providerData ? (
          <div className="fade-in space-y-8">
            <ProviderDashboard data={providerData} />
            <ProviderTabs data={providerData} />
          </div>
        ) : !isLoading && !error && (
          <div className="fade-in border-2 border-dashed border-slate-300 rounded-xl p-20 text-center print:hidden">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">Buscar Proveedor</h3>
            <p className="text-slate-500">Ingrese un RUT en el buscador superior para ver la ficha del proveedor.</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-20 print:hidden">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400 text-sm">
          <p>© 2026 CENABAST - Gobierno de Chile</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
