import React, { useState } from 'react';
import './Reporte.css';

function Reporte() {
  const [reporteActivo, setReporteActivo] = useState(null);

  const tiposReportes = [
    { id: 'ventas', titulo: 'Reporte General de Ventas', descripcion: 'Resumen consolidado de ingresos y ventas.', icon: '📄' },
    { id: 'inventario', titulo: 'Reporte de Stock e Inventario', descripcion: 'Estado de productos y stock disponible.', icon: '📦' },
    { id: 'ganancias', titulo: 'Reporte de Ganancias', descripcion: 'Balance entre costos y margen de ganancia.', icon: '📊' },
    { id: 'clientes', titulo: 'Reporte de Clientes', descripcion: 'Historial de compras de clientes frecuentes.', icon: '👥' }
  ];

  const ventas = [
    { id: 'VNT-001', fecha: '24/09/2026', cliente: 'Juan Pérez', metodo: 'Efectivo', total: 120.50 },
    { id: 'VNT-002', fecha: '24/09/2026', cliente: 'María López', metodo: 'Yape', total: 45.00 },
    { id: 'VNT-003', fecha: '23/09/2026', cliente: 'Carlos Gomez', metodo: 'Tarjeta', total: 310.00 },
    { id: 'VNT-004', fecha: '23/09/2026', cliente: 'Ana Torres', metodo: 'Plin', total: 85.20 }
  ];

  const generarPDF = () => {
    window.print();
  };

  return (
    <div className="reportes-container">
      <header className="reportes-header no-print">
        <h1>Módulo Generador de Reportes PDF</h1>
        <p>Selecciona una opción para ver un resumen y exportar el documento formal en PDF</p>
      </header>

      <section className="reportes-grid no-print">
        {tiposReportes.map((item) => (
          <div 
            key={item.id} 
            className={`reporte-card ${reporteActivo === item.id ? 'activa' : ''}`}
            onClick={() => setReporteActivo(item.id)}
          >
            <div className="reporte-icon">{item.icon}</div>
            <div className="reporte-info">
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
            <button className="btn-seleccionar">
              {reporteActivo === item.id ? '✓ Seleccionado' : 'Generar PDF'}
            </button>
          </div>
        ))}
      </section>

      {reporteActivo && (
        <div className="pdf-preview-container">
          <div className="pdf-actions no-print">
            <h3>Vista Previa del Documento PDF</h3>
            <button className="btn-descargar-pdf" onClick={generarPDF}>
              🖨️ Guardar / Descargar PDF
            </button>
          </div>

          <div className="documento-pdf" id="seccion-impresion">
            <div className="pdf-header">
              <div className="pdf-logo">
                <h2>🛒 GlobalExpress</h2>
                <span>Minimarket</span>
              </div>
              <div className="pdf-empresa-info">
                <h3>GLOBALEXPRESS MINIMARKET S.A.C.</h3>
                <p>RUC: 20601234567</p>
                <p>Av. Próceres de la Independencia 123</p>
                <p>Fecha de emisión: <strong>24/09/2026</strong></p>
              </div>
            </div>

            <hr className="pdf-divider" />

            <div className="pdf-titulo-doc">
              <h2>{tiposReportes.find(r => r.id === reporteActivo)?.titulo.toUpperCase()}</h2>
              <p>Documento generado desde el Sistema de Gestión</p>
            </div>

            <table className="pdf-tabla">
              <thead>
                <tr>
                  <th>N° CÓDIGO</th>
                  <th>FECHA</th>
                  <th>CLIENTE</th>
                  <th>MÉTODO DE PAGO</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.fecha}</td>
                    <td>{v.cliente}</td>
                    <td>{v.metodo}</td>
                    <td className="text-right">S/ {v.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pdf-resumen">
              <div className="pdf-firma">
                <div className="linea-firma"></div>
                <p>Firma del Administrador / Encargado</p>
              </div>
              <div className="pdf-totales">
                <p><span>Subtotal:</span> S/ 475.17</p>
                <p><span>I.G.V. (18%):</span> S/ 85.53</p>
                <h3><span>TOTAL GENERAL:</span> S/ 560.70</h3>
              </div>
            </div>

            <footer className="pdf-footer">
              <p>GlobalExpress Minimarket - Sistema de Control Interno | Página 1 de 1</p>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reporte;