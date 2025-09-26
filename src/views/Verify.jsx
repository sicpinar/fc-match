import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { verifyMagicLink } from '../lib/api';

export default function Verify() {
  const { t: tokenInPath } = useParams();
  const [msg, setMsg] = useState('Prüfe deinen Login-Link ...');

  useEffect(() => {
    const url = new URL(window.location.href);
    const token =
      url.searchParams.get('token') ||
      (url.hash.startsWith('#token=') ? url.hash.slice(7) : null) ||
      tokenInPath || null;

    if (!token) { setMsg('Kein Token gefunden.'); return; }

    (async () => {
      try {
        const res = await verifyMagicLink(token);
        localStorage.setItem('fc_user', JSON.stringify(res.user));

        // HARTE WEITERLEITUNG, damit App.jsx den User neu einliest
        const base = location.hash.startsWith('#/') ? '/#' : '';
        window.location.replace(`${base}/search`);
      } catch (e) {
        console.error('verify failed:', e);
        setMsg('Link ungültig oder abgelaufen.');
      }
    })();
  }, [tokenInPath]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 text-center max-w-sm w-full">
        <div className="text-4xl mb-3">📧</div>
        <p className="text-gray-700">{msg}</p>
      </div>
    </div>
  );
}
