import { FC, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

const Container: FC<PropsWithChildren<Partial<Omit<HTMLDivElement, 'children'>>>> = ({
  className,
  children
}) => {
  return <div className={`${className ? `${className} ` : ''}${styles.container}`}>{children}</div>;
};

export default Container;
