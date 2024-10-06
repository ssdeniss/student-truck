import React from 'react';
import Button from '@mui/material/Button';

interface TablePrintProps {
  sortedRows: any[];
  columns: { id: string; label: string }[];
}

const TablePrint: React.FC<TablePrintProps> = ({ sortedRows, columns }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: #fff;
            }
            h1 {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              table-layout: auto; 
            }
            th, td {
              border: 1px solid #ddd;
              padding: 12px;
              text-align: left;
              height: 40px;
            }
            th {
              background-color: #f2f2f2;
              font-weight: bold;
            }
            .status-expelled {
              background-color: #ffcccc; 
            }
            @media print {
              th, td {
                background-color: white; 
              }
            }
          </style>
        </head>
        <body>
          <h1>Filtered Table</h1>
          <table>
            <thead>
              <tr>
                ${columns
                  .filter((column) => column.id !== 'actions')
                  .map((column) => `<th>${column.label}</th>`)
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${sortedRows
                .map(
                  (row) => `
                  <tr class="${row.status === 'expelled' ? 'status-expelled' : ''}">
                    ${columns
                      .filter((column) => column.id !== 'actions')
                      .map((column) => `<td>${row[column.id]}</td>`)
                      .join('')}
                  </tr>
                `,
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <Button variant="contained" color="info" onClick={handlePrint}>
      Print table
    </Button>
  );
};

export default TablePrint;
