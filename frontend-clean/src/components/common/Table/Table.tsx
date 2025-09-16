import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import './Table.css';
import { FiChevronDown, FiChevronUp, FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((data: T) => ReactNode);
  cell?: (data: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  pagination?: {
    pageSize?: number;
    pageSizeOptions?: number[];
  };
  loading?: boolean;
  emptyState?: ReactNode;
}

const Table = <T extends object>({
  columns,
  data,
  onRowClick,
  pagination,
  loading = false,
  emptyState = <div className="table-empty-state">No data available</div>,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: SortDirection }>({
    key: null,
    direction: null,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);
  
  // Reset to first page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);
  
  // Handle sorting
  const handleSort = (key: keyof T) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };
  
  // Apply sorting
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key || sortConfig.direction === null) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' 
        ? aValue - bValue 
        : bValue - aValue;
    }
    
    return 0;
  });
  
  // Apply pagination
  const paginatedData = pagination 
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) 
    : sortedData;
  
  const totalPages = pagination 
    ? Math.ceil(sortedData.length / pageSize) 
    : 1;
  
  // Pagination controls
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  
  // Render table rows
  const renderRows = () => {
    if (loading) {
      return (
        <tr className="table-loading-row">
          <td colSpan={columns.length}>
            <div className="table-loading-state">
              <div className="table-spinner"></div>
              <span>Loading data...</span>
            </div>
          </td>
        </tr>
      );
    }
    
    if (paginatedData.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>{emptyState}</td>
        </tr>
      );
    }
    
    return paginatedData.map((row, rowIndex) => (
      <tr 
        key={rowIndex} 
        onClick={() => onRowClick && onRowClick(row)}
        className={onRowClick ? 'table-row-clickable' : ''}
      >
        {columns.map((column, colIndex) => {
          const cellContent = typeof column.accessor === 'function' 
            ? column.accessor(row)
            : column.cell 
              ? column.cell(row) 
              : String(row[column.accessor as keyof T]);
          
          return (
            <td key={colIndex} style={{ width: column.width }}>
              {cellContent}
            </td>
          );
        })}
      </tr>
    ));
  };
  
  // Render sort indicator
  const renderSortIndicator = (column: TableColumn<T>) => {
    if (!column.sortable) return null;
    
    const isSorted = typeof column.accessor === 'string' && sortConfig.key === column.accessor;
    
    return (
      <span className="table-sort-indicator">
        {isSorted && sortConfig.direction === 'asc' && <FiChevronUp />}
        {isSorted && sortConfig.direction === 'desc' && <FiChevronDown />}
        {(!isSorted || sortConfig.direction === null) && (
          <span className="table-sort-indicator-inactive">
            <FiChevronDown />
          </span>
        )}
      </span>
    );
  };
  
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index} 
                onClick={() => column.sortable && typeof column.accessor === 'string' && handleSort(column.accessor)}
                className={column.sortable ? 'table-header-sortable' : ''}
                style={{ width: column.width }}
              >
                {column.header}
                {renderSortIndicator(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
      
      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <div className="table-pagination-info">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          
          <div className="table-pagination-controls">
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <FiChevronsLeft />
            </button>
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            
            <div className="pagination-pages">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                
                // Logic to show pages around current page
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`pagination-button ${currentPage === pageNum ? 'pagination-button-active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
            <button 
              className="pagination-button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <FiChevronsRight />
            </button>
          </div>
          
          {pagination.pageSizeOptions && pagination.pageSizeOptions.length > 0 && (
            <div className="table-page-size-selector">
              <span>Show</span>
              <select 
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              >
                {pagination.pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Table;