export default function Schedule() {
  return (
    <div className="min-h-screen p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Conference Schedule</h1>

      <div className="space-y-3">
        <div className="p-4 rounded-xl shadow bg-gray-100">
          <p className="font-semibold">Opening Ceremony</p>
          <p className="text-sm text-gray-500">9:00 AM</p>
        </div>

        <div className="p-4 rounded-xl shadow bg-gray-100">
          <p className="font-semibold">Cardiac Anaesthesia Session</p>
          <p className="text-sm text-gray-500">10:00 AM</p>
        </div>
      </div>
    </div>
  );
}