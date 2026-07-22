import React from 'react';
import { Loader } from 'lucide-react';

const DataTable = ({ columns, data, isLoading, pagination, emptyMessage }) => {
  return (
    <div className="bg-brand-card rounded-xl border border-brand-purple/20 overflow-hidden flex flex-col shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-dark border-b border-brand-purple/20">
              {columns.map((col, idx) => (
                <th key={col.key || idx} className="py-3 px-4 text-sm font-semibold text-brand-gray whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-purple/10">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <Loader className="w-8 h-8 text-brand-gold animate-spin mx-auto mb-4" />
                  <p className="text-brand-gray">Loading data...</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <p className="text-brand-gray">{emptyMessage || 'No data found'}</p>
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr key={item._id || rowIndex} className="hover:bg-brand-dark/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={col.key || colIndex} className="py-3 px-4">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="p-4 border-t border-brand-purple/20 bg-brand-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-gray">
            Showing page <span className="font-medium text-brand-text">{pagination.currentPage}</span> of <span className="font-medium text-brand-text">{pagination.totalPages}</span>
            {' '} ({pagination.totalItems} items)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
              disabled={pagination.currentPage === 1 || isLoading}
              className="px-3 py-1.5 bg-brand-card border border-brand-purple/20 text-brand-text rounded hover:bg-brand-dark disabled:opacity-50 transition-colors text-sm"
            >
              Previous
            </button>
            <button
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
              disabled={pagination.currentPage === pagination.totalPages || isLoading}
              className="px-3 py-1.5 bg-brand-card border border-brand-purple/20 text-brand-text rounded hover:bg-brand-dark disabled:opacity-50 transition-colors text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
