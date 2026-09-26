'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await register(form.name, form.email, form.password);
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
        <p className="auth-kicker">დაწყება</p>
        <h1>ანგარიშის შექმნა</h1>
        <p className="auth-subtitle">დაგჭირდება მხოლოდ სახელი, ელფოსტა და პაროლი</p>

        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            სახელი
            <input placeholder="გიორგი" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </label>
          <label>
            ელფოსტა
            <input type="email" placeholder="you@example.com" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </label>
          <label>
            პაროლი
            <input type="password" placeholder="მინ. 6 სიმბოლო" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button disabled={busy}>{busy ? 'იქმნება...' : 'ანგარიშის შექმნა'}</button>
        </form>

        <p className="auth-switch">
          უკვე გაქვს ანგარიში? <Link href="/login">შესვლა</Link>
        </p>
      </div>
    </main>
  );
}