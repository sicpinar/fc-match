// FILE: src/views/Verify.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyMagicLink } from '../lib/api';

export default function Verify() {
  const nav = useNavigate();
  const [msg, setMsg] = useState('Prüfe deinen Login-Link ...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (!token) {
      setMsg('Kein Token gefunden.');
      return;
    }
    (async () => {
      try {
        const res = await verifyMagicLink(token);
        localStorage.setItem('fc_user', JSON.stringify(res.user));
        setMsg('Erfolgreich! Weiterleitung ...');
        setTimeout(() => nav('/search'), 600);
      } catch {
        setMsg('Link ungültig oder abgelaufen.');
      }
    })();
  }, [nav]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 text-center max-w-sm w-full">
        <div className="text-4xl mb-3">📧</div>
        <p className="text-gray-700">{msg}</p>
      </div>
    </div>
  );
}
