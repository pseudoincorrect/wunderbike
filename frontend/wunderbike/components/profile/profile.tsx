import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import styles from './profile.module.css';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) {
    return <div> No user logged in </div>;
  }
  return (
    <div className={styles.container}>
      <img src={user.picture!} alt={user.name!} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
