import { Html } from '@react-three/drei';

export default function LoadingFallback({ progress = 0, total = 100 }) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-medium">Loading Scene...</p>
        {total > 0 && (
          <div className="mt-2 w-48">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {progress} / {total} assets
            </p>
          </div>
        )}
      </div>
    </Html>
  );
}
