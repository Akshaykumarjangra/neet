export default function Offline() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-2">You're offline</h1>
      <p className="text-slate-600">Some content is cached. Reconnect to sync your latest progress.</p>
    </div>
  );
}
