export default function Speakers() {
  return (
    <div className="min-h-screen p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Speakers</h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="p-3 bg-gray-100 rounded-xl shadow">
          <p className="font-semibold">Dr. Arpan Chakraborty</p>
          <p className="text-sm text-gray-500">Organising Co-Chairman</p>
        </div>

        <div className="p-3 bg-gray-100 rounded-xl shadow">
          <p className="font-semibold">Dr. XYZ</p>
          <p className="text-sm text-gray-500">Faculty</p>
        </div>

      </div>
    </div>
  );
}