'use client';

interface FarmViewProps {
  digitalFog: number;
  blockchainRain: boolean;
  solarFlares: boolean;
  wifiStorms: number;
  treeHealth: number;
  upgrades: any[];
}

export default function FarmView({
  digitalFog,
  blockchainRain,
  solarFlares,
  wifiStorms,
  treeHealth,
  upgrades,
}: FarmViewProps) {
  const getTreeColor = (health: number) => {
    if (health <= 33) return 'text-red-600';
    if (health <= 66) return 'text-yellow-600';
    return 'text-green-600';
  };

  const hasSolarPanels = upgrades.find(u => u.id === 'solar-trees' && u.purchased);
  const hasSmartphones = upgrades.find(u => u.id === 'smartphone-trees' && u.purchased);
  const hasQuantumFertilizer = upgrades.find(u => u.id === 'quantum-fertilizer' && u.purchased);
  const hasWifiSprinklers = upgrades.find(u => u.id === 'wifi-sprinklers' && u.purchased);

  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-b from-sky-400 via-green-400 to-green-600">
      {/* Sky and background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-green-300" />
      
      {/* Digital Fog Effect */}
      {digitalFog > 0 && (
        <div 
          className="absolute inset-0 bg-gray-400/30 backdrop-blur-sm transition-opacity duration-500"
          style={{ opacity: digitalFog / 100 }}
        />
      )}

      {/* Solar Flares Effect */}
      {solarFlares && (
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute top-4 right-4 w-16 h-16 bg-orange-400 rounded-full opacity-80 animate-ping" />
          <div className="absolute top-8 right-8 w-8 h-8 bg-yellow-400 rounded-full opacity-60" />
        </div>
      )}

      {/* WiFi Storm Effects */}
      {wifiStorms > 0 && (
        <div className="absolute inset-0">
          {Array.from({ length: wifiStorms }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 5}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <span className="text-2xl opacity-70">📶</span>
            </div>
          ))}
        </div>
      )}

      {/* Blockchain Rain */}
      {blockchainRain && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${i * 10}%`,
                top: '-10%',
                animation: `fall 3s linear infinite ${i * 0.5}s`,
              }}
            >
              <div className="bg-blue-600 text-white text-xs p-1 rounded mb-2">⛓️</div>
            </div>
          ))}
        </div>
      )}

      {/* Ground */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-green-800 to-green-600">
        {/* Quantum Fertilizer Effect */}
        {hasQuantumFertilizer && (
          <div className="absolute inset-0 bg-purple-400/20 animate-pulse" />
        )}
      </div>

      {/* Trees */}
      <div className="absolute bottom-16 w-full">
        <div className="flex justify-around items-end px-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Tree */}
              <div className={`text-6xl md:text-8xl transition-all duration-300 ${getTreeColor(treeHealth)}`}>
                🌳
              </div>
              
              {/* Solar Panels */}
              {hasSolarPanels && (
                <div className="absolute -top-2 -right-2">
                  <span className="text-lg">⚡</span>
                </div>
              )}
              
              {/* Smartphone Trees */}
              {hasSmartphones && (
                <div className="absolute top-4 right-0">
                  <span className="text-sm">📱</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                </div>
              )}
              
              {/* Avocados */}
              <div className="absolute top-8 left-2">
                <span className="text-lg">🥑</span>
              </div>
              <div className="absolute top-12 right-2">
                <span className="text-lg">🥑</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WiFi Sprinklers */}
      {hasWifiSprinklers && (
        <div className="absolute bottom-32 w-full">
          <div className="flex justify-around">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl animate-spin">📡</span>
                <div className="text-blue-400 animate-pulse">💧💧💧</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farm Statistics Overlay */}
      <div className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded text-sm">
        <div>🌱 Farm Health: {Math.round((treeHealth + (hasQuantumFertilizer ? 20 : 0)) / 120 * 100)}%</div>
        <div>💰 Production: {Math.round(treeHealth * (hasWifiSprinklers ? 1.5 : 1))} GuacCoins/hr</div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100vh); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}