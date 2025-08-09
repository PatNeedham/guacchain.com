'use client';

interface FarmControlsProps {
  soilQuality: number;
  setSoilQuality: (value: number) => void;
  workerHappiness: number;
  setWorkerHappiness: (value: number) => void;
  treeHealth: number;
  setTreeHealth: (value: number) => void;
}

export default function FarmControls({
  soilQuality,
  setSoilQuality,
  workerHappiness,
  setWorkerHappiness,
  treeHealth,
  setTreeHealth,
}: FarmControlsProps) {
  const getHappinessEmoji = (level: number) => {
    if (level <= 20) return '😢';
    if (level <= 40) return '😐';
    if (level <= 60) return '🙂';
    if (level <= 80) return '😊';
    return '🤩';
  };

  const getSoilColor = (quality: number) => {
    if (quality <= 33) return 'bg-red-500';
    if (quality <= 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTreeHealthColor = (health: number) => {
    if (health <= 33) return 'text-red-500';
    if (health <= 66) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-green-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">🚜 Farm Management</h3>
      
      {/* Soil Quality */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-green-100 mb-2">
          🌱 Soil Quality: {soilQuality}%
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={soilQuality}
            onChange={(e) => setSoilQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            title="Affects crop yield and tree growth rate"
          />
          <div className="mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getSoilColor(soilQuality)} transition-all duration-300`}
              style={{ width: `${soilQuality}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-green-200">Rich soil = abundant avocados</span>
      </div>

      {/* Worker Happiness */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-green-100 mb-2">
          👷 Worker Happiness: {getHappinessEmoji(workerHappiness)} {workerHappiness}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={workerHappiness}
          onChange={(e) => setWorkerHappiness(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          title="Happy workers are more productive and innovative"
        />
        <span className="text-xs text-green-200">Happy workers = efficient blockchain farming</span>
      </div>

      {/* Tree Health */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-green-100 mb-2">
          🥑 Tree Health: {treeHealth}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={treeHealth}
          onChange={(e) => setTreeHealth(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          title="Overall health of your avocado trees"
        />
        <div className="flex justify-between mt-2">
          <span className={`text-lg ${getTreeHealthColor(treeHealth)}`}>🌳</span>
          <span className={`text-lg ${getTreeHealthColor(treeHealth)}`}>🌳</span>
          <span className={`text-lg ${getTreeHealthColor(treeHealth)}`}>🌳</span>
          <span className={`text-lg ${getTreeHealthColor(treeHealth)}`}>🌳</span>
          <span className={`text-lg ${getTreeHealthColor(treeHealth)}`}>🌳</span>
        </div>
        <span className="text-xs text-green-200">Healthy trees produce premium guacamole</span>
      </div>
    </div>
  );
}