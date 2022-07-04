import Link from 'next/link';
import styles from './home_buttons.module.css';
import { useUser } from '@auth0/nextjs-auth0';

function HomeButtons() {
  const { user, error, isLoading } = useUser();
  return (
    <>
      {user && (
        <>
          <button className={`${styles.homeButton} btn btn-light`}>
            <a href='/api/auth/logout'>Logout</a>
          </button>
          <button className={`${styles.homeButton} btn btn-light`}>
            <Link href='/tricks'>
              <a>Tricks</a>
            </Link>
          </button>
        </>
      )}
      {!user && (
        <button className={`${styles.homeButton} btn btn-light`}>
          <a href='/api/auth/login'>Login</a>
        </button>
      )}
    </>
  );
}

export default HomeButtons;
