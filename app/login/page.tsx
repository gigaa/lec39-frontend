'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="auth-kicker">კეთილი იყოს დაბრუნება</p>
        <h1>შესვლა</h1>
        <p className="auth-subtitle">შეიყვანე მონაცემები ანგარიშზე შესასვლელად</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            ელფოსტა
            <input type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            პაროლი
            <input type="password" placeholder="••••••••" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button disabled={busy}>{busy ? 'შედის...' : 'შესვლა'}</button>
        </form>

        <p className="auth-switch">
          ანგარიში არ გაქვს? <Link href="/register">რეგისტრაცია</Link>
        </p>
      </div>
    </main>
  );
}