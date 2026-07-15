import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Under Construction | Children Book Magic';
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>We're Working On This Page!</h1>
      <p className={styles.text}>
        We're bringing something exciting to life here! This page is currently being updated—check back soon.
      </p>
      <Link to="/" className={styles.link}>Return Home</Link>
    </div>
  );
}