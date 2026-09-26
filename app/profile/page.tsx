'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="profile-avatar">{user.name?.[0]?.toUpperCase()}</div>
        <h1>{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <form className="auth-form" onSubmit={async (e) => {
          e.preventDefault();
          await logout();
          router.push('/login');
        }}>
          <button className="logout-btn">გასვლა</button>
        </form>
      </div>
    </main>
  );
}