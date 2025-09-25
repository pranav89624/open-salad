export default function HowToUse() {
  return (
    <div className="bg-slate-800/30 rounded-lg p-4">
      <h3 className="font-semibold mb-3">How to use</h3>
      <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
        <li>Enter your name and room name</li>
        <li>Click <strong>Join Chat</strong> to connect</li>
        <li>Type messages and press <strong>Send</strong></li>
        <li>Share the room name with friends!</li>
        <li>New joiners will see chat history</li>
      </ol>
    </div>
  );
}