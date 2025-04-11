import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useRepositoryDetails } from '@/entities/repository/hooks/useRepositoryDetails.ts';
import Container from '@/shared/ui/Container/Container.tsx';

export const RepositoryDetailsPage = () => {
  const { repository, loading, error } = useRepositoryDetails();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>;
  }

  if (!repository) {
    return <div className={styles.error}>Repository not found</div>;
  }

  const { owner, url, description, name, stargazerCount, languages } = repository;

  return (
    <Container>
      <div className={styles.root}>
        <Link to="/" className={styles.backLink}>
          ← Вернутся на главную
        </Link>

        <div className={styles.header}>
          <img src={owner.avatarUrl} alt={owner.login} className={styles.avatar} />
          <div className={styles.title}>
            <h1>{name}</h1>
            <a
              href={owner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ownerLink}
            >
              {owner.login}
            </a>
          </div>
        </div>

        {description && <div className={styles.description}>{description}</div>}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.stat}>⭐ {stargazerCount}</span>
          </div>
          {languages.edges && languages.edges.length > 0 && (
            <div className={styles.stat}>
              <span className={styles.statLabel}>Languages:</span>
              <span className={styles.languages}>
                {languages.edges.map(({ node }) => (
                  <div key={node.id} style={{ color: node.color }}>
                    {node.name}
                  </div>
                ))}
              </span>
            </div>
          )}
        </div>

        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
          На ГитХабе
        </a>
      </div>
    </Container>
  );
};
