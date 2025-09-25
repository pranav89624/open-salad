interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Open Salad - Simple Chat App</h1>
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-sm text-slate-300">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </header>
  );
}