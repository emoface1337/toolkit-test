import { useNavigate } from 'react-router-dom';
import { RepositoryModel } from '@/entities/repository/model';
import styles from './styles.module.scss';
import { MouseEvent } from 'react';
import { formatDate } from '@/shared/utils/date.ts';

interface RepositoryCardProps {
  repository: RepositoryModel;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const navigate = useNavigate();

  const { url, name, stargazerCount, updatedAt } = repository;

  const handleCardClick = () => {
    const {
      owner: { login },
      name
    } = repository;
    navigate(`/${login}/${name}`);
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
    event.preventDefault();
    window.open(url);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.header}>
        <div className={styles.title}>{name}</div>
      </div>
      <div className={styles.stats}>
        <span className={styles.stat}>⭐ {stargazerCount}</span>
        {updatedAt && <span className={styles.stat}>{formatDate(updatedAt)}</span>}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => handleLinkClick(event)}
        >
          🔗 Ссылка на гитхаб
        </a>
      </div>
    </div>
  );
};
