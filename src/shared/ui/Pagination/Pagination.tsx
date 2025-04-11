import styles from './styles.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(
    1,
    Math.min(
      currentPage - 2,
      totalPages - maxVisiblePages + 1
    )
  );

  startPage = Math.max(1, startPage);
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`${styles.pageButton} ${i === currentPage ? styles.active : ''}`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className={styles.pageButton}>
          &lt;
        </button>
      )}

      {pages}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className={styles.pageButton}>
          &gt;
        </button>
      )}
    </div>
  );
};
