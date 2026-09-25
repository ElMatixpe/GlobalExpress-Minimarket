import React, { useState } from 'react';
import './Reporte.css';

function Reporte() {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  // Lista de indicadores clave (KPIs) oficiales del proyecto
  const opcionesReporte = [
    {
      id: 'ventas_mes',
      titulo: 'Porcentaje de Ventas por Mes (%)',
      descripcion: 'Mide el porcentaje que representan las ventas del mes respecto al total del año.',
      icono: '📊'
    },
    {
      id: 'participacion_producto',
      titulo: 'Porcentaje de Participación del Producto (%)',
      descripcion: 'Mide las unidades vendidas de un producto respecto al total del mes.',
      icono: '📦'
    },
    {
      id: 'variacion_ventas',
      titulo: 'Porcentaje de Variación de Ventas Mensual (%)',
      descripcion: 'Mide la variación porcentual de las ventas comparadas con el mes anterior.',
      icono: '📈'
    },
    {
      id: 'promedio_operacion',
      titulo: 'Promedio de Venta Mensual por Operación',
      descripcion: 'Calcula el monto promedio generado por cada venta realizada en el mes.',
      icono: '💰'
    }
  ];

  const datosMock = {
    ventas_mes: [
      { id: 1, mes: 'Enero', totalVentas: 'S/ 12,500.00', porcentaje: '8.5%' },
      { id: 2, mes: 'Febrero', totalVentas: 'S/ 14,200.00', porcentaje: '9.6%' },
      { id: 3, mes: 'Marzo', totalVentas: 'S/ 18,900.00', porcentaje: '12.8%' },
      { id: 4, mes: 'Abril', totalVentas: 'S/ 15,300.00', porcentaje: '10.4%' }
    ],
    participacion_producto: [
      { id: 1, producto: 'Arroz Extra 5kg', unidades: 320, participacion: '24.5%' },
      { id: 2, producto: 'Aceite Vegetal 1L', unidades: 215, participacion: '16.4%' },
      { id: 3, producto: 'Leche Evaporada 400g', unidades: 180, participacion: '13.7%' },
      { id: 4, producto: 'Azúcar Rubia 1kg', unidades: 150, participacion: '11.5%' }
    ],
    variacion_ventas: [
      { id: 1, mesActual: 'Febrero', mesAnterior: 'Enero', diferencia: '+ S/ 1,700.00', variacion: '+13.6%' },
      { id: 2, mesActual: 'Marzo', mesAnterior: 'Febrero', diferencia: '+ S/ 4,700.00', variacion: '+33.1%' },
      { id: 3, mesActual: 'Abril', mesAnterior: 'Marzo', diferencia: '- S/ 3,600.00', variacion: '-19.0%' }
    ],
    promedio_operacion: [
      { id: 1, mes: 'Enero', numOperaciones: 410, totalMonto: 'S/ 12,500.00', promedio: 'S/ 30.48' },
      { id: 2, mes: 'Febrero', numOperaciones: 450, totalMonto: 'S/ 14,200.00', promedio: 'S/ 31.55' },
      { id: 3, mes: 'Marzo', numOperaciones: 520, totalMonto: 'S/ 18,900.00', promedio: 'S/ 36.34' }
    ]
  };

  const seleccionarReporte = (id) => {
    const reporte = opcionesReporte.find((opt) => opt.id === id);
    setReporteSeleccionado(reporte);
  };

  const generarPDF = () => {
    window.print();
  };

  return (
    <div className="reportes-container">
      <header className="reportes-header no-print">
        <h2>Módulo de Reportes e Indicadores</h2>
        <p>Selecciona una opción para ver un resumen y exportar el documento formal en PDF</p>
      </header>

      <div className="cards-grid no-print">
        {opcionesReporte.map((opcion) => (
          <div key={opcion.id} className="reporte-card">
            <div className="card-icon">{opcion.icono}</div>
            <h3>{opcion.titulo}</h3>
            <p>{opcion.descripcion}</p>
            <button
              className="btn-generar"
              onClick={() => seleccionarReporte(opcion.id)}
            >
              Generar PDF
            </button>
          </div>
        ))}
      </div>

      {reporteSeleccionado && (
        <div className="pdf-preview-container">
          <div className="pdf-actions no-print">
            <h3>Vista Previa del Documento PDF</h3>
            <button className="btn-descargar-pdf" onClick={generarPDF}>
               Descargar PDF
            </button>
          </div>

          <div className="documento-pdf" id="seccion-impresion">
            <div className="pdf-header">
              <div className="empresa-info">
                <h1>GLOBALEXPRESS MINIMARKET</h1>
                <p>Sistema de Gestión e Indicadores Comerciales</p>
                <p>Fecha de emisión: {new Date().toLocaleDateString()}</p>
              </div>
              <div className="reporte-badge">
                
              </div>
            </div>

            <hr className="pdf-divider" />

            <h2 className="pdf-titulo">{reporteSeleccionado.titulo}</h2>
            <p className="pdf-descripcion">{reporteSeleccionado.descripcion}</p>

            <table className="pdf-tabla">
              {reporteSeleccionado.id === 'ventas_mes' && (
                <>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>MES</th>
                      <th>TOTAL VENTAS</th>
                      <th>PORCENTAJE DEL AÑO (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMock.ventas_mes.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.mes}</td>
                        <td>{item.totalVentas}</td>
                        <td><strong>{item.porcentaje}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {reporteSeleccionado.id === 'participacion_producto' && (
                <>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>PRODUCTO</th>
                      <th>UNIDADES VENDIDAS</th>
                      <th>PARTICIPACIÓN (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMock.participacion_producto.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.producto}</td>
                        <td>{item.unidades} u.</td>
                        <td><strong>{item.participacion}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {reporteSeleccionado.id === 'variacion_ventas' && (
                <>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>MES EVALUADO</th>
                      <th>MES ANTERIOR</th>
                      <th>DIFERENCIA MONTO</th>
                      <th>VARIACIÓN (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMock.variacion_ventas.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.mesActual}</td>
                        <td>{item.mesAnterior}</td>
                        <td>{item.diferencia}</td>
                        <td><strong>{item.variacion}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}

              {reporteSeleccionado.id === 'promedio_operacion' && (
                <>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>MES</th>
                      <th>N° OPERACIONES</th>
                      <th>TOTAL MONTO</th>
                      <th>PROMEDIO X OPERACIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosMock.promedio_operacion.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.mes}</td>
                        <td>{item.numOperaciones} compras</td>
                        <td>{item.totalMonto}</td>
                        <td><strong>{item.promedio}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>

            <div className="pdf-footer">
              <p>Reporte generado automáticamente por el Módulo de Indicadores de GlobalExpress Minimarket.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reporte;