'use client';

import { useState, useEffect } from 'react';

interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: 'normal' | 'absurd';
  description: string;
  blockchainHash: string;
  rarity: 'common' | 'rare' | 'legendary';
  amount: number;
}

interface GuacamoleLaboratoryProps {
  money: number;
  setMoney: (value: number) => void;
}

const INGREDIENTS: Ingredient[] = [
  // Normal ingredients
  {
    id: 'avocado',
    name: 'Fresh Avocados',
    icon: '🥑',
    category: 'normal',
    description: 'The foundation of any respectable guacamole. Blockchain-verified ripeness.',
    blockchainHash: '0x4v0c4d0...',
    rarity: 'common',
    amount: 0,
  },
  {
    id: 'lime',
    name: 'Quantum Limes',
    icon: '🍋',
    category: 'normal',
    description: 'Citrus enhanced with quantum entanglement for maximum tanginess.',
    blockchainHash: '0x1im3...',
    rarity: 'common',
    amount: 0,
  },
  {
    id: 'salt',
    name: 'Himalayan Pink Salt',
    icon: '🧂',
    category: 'normal',
    description: 'Mined by digital sherpas and processed through the blockchain.',
    blockchainHash: '0x541t...',
    rarity: 'common',
    amount: 0,
  },
  {
    id: 'onion',
    name: 'Crying Onions',
    icon: '🧅',
    category: 'normal',
    description: 'These onions make you cry tears of joy (and blockchain validation).',
    blockchainHash: '0x0n10n...',
    rarity: 'common',
    amount: 0,
  },
  {
    id: 'cilantro',
    name: 'WiFi Cilantro',
    icon: '🌿',
    category: 'normal',
    description: 'Grown in electromagnetic fields for enhanced flavor transmission.',
    blockchainHash: '0xc11nt0...',
    rarity: 'rare',
    amount: 0,
  },
  // Absurd ingredients
  {
    id: 'uranium',
    name: 'Enriched Uranium',
    icon: '☢️',
    category: 'absurd',
    description: 'For that extra glow in your guacamole. FDA-approved for blockchain consumption.',
    blockchainHash: '0xur4n1um...',
    rarity: 'legendary',
    amount: 0,
  },
  {
    id: 'liquid-wifi',
    name: 'Liquid WiFi',
    icon: '📶',
    category: 'absurd',
    description: 'Concentrated internet signals in liquid form. Improves guacamole connectivity.',
    blockchainHash: '0xw1f1...',
    rarity: 'legendary',
    amount: 0,
  },
  {
    id: 'crickets',
    name: 'Blockchain Crickets',
    icon: '🦗',
    category: 'absurd',
    description: 'Sustainably farmed insects trained to mine cryptocurrency while you eat.',
    blockchainHash: '0xcr1ck3t...',
    rarity: 'rare',
    amount: 0,
  },
  {
    id: 'moon-dust',
    name: 'Moon Dust',
    icon: '🌙',
    category: 'absurd',
    description: 'Authentic lunar soil harvested by blockchain-powered moon rovers.',
    blockchainHash: '0xm00n...',
    rarity: 'legendary',
    amount: 0,
  },
  {
    id: 'electrons',
    name: 'Free-Range Electrons',
    icon: '⚡',
    category: 'absurd',
    description: 'Ethically sourced electrons from renewable energy sources.',
    blockchainHash: '0x3l3ctr0n...',
    rarity: 'rare',
    amount: 0,
  },
  {
    id: 'nostalgia',
    name: 'Bottled Nostalgia',
    icon: '💭',
    category: 'absurd',
    description: 'The essence of childhood memories, distilled and blockchain-verified.',
    blockchainHash: '0xn057419...',
    rarity: 'legendary',
    amount: 0,
  },
];

export default function GuacamoleLaboratory({ money, setMoney }: GuacamoleLaboratoryProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [isBlending, setIsBlending] = useState(false);
  const [replayData, setReplayData] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [guacamoleResult, setGuacamoleResult] = useState<{ name: string; description: string; hash: string } | null>(null);

  const addIngredient = (ingredient: Ingredient) => {
    const cost = ingredient.rarity === 'legendary' ? 30 : ingredient.rarity === 'rare' ? 15 : 5;
    if (money >= cost) {
      setMoney(money - cost);
      setSelectedIngredients([...selectedIngredients, { ...ingredient, amount: 1 }]);
      setReplayData([...replayData, `Added ${ingredient.name} at ${new Date().toISOString()}`]);
    }
  };

  const removeIngredient = (index: number) => {
    const newIngredients = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(newIngredients);
    setReplayData([...replayData, `Removed ingredient at ${new Date().toISOString()}`]);
  };

  const startBlending = () => {
    if (selectedIngredients.length === 0) return;
    
    setIsBlending(true);
    setReplayData([...replayData, `Started blending at ${new Date().toISOString()}`]);
    
    // Simulate blending animation
    setTimeout(() => {
      const hasAvocado = selectedIngredients.some(i => i.id === 'avocado');
      const hasAbsurd = selectedIngredients.some(i => i.category === 'absurd');
      const legendaryCount = selectedIngredients.filter(i => i.rarity === 'legendary').length;
      
      let resultName = 'Basic Guacamole';
      let resultDescription = 'A simple but blockchain-verified guacamole.';
      
      if (!hasAvocado) {
        resultName = 'Questionable Green Substance';
        resultDescription = 'This... might not technically be guacamole. The blockchain is confused.';
      } else if (legendaryCount >= 3) {
        resultName = 'Transcendent Quantum Guacamole';
        resultDescription = 'This guacamole exists in multiple dimensions simultaneously. Your taste buds have ascended.';
      } else if (hasAbsurd && legendaryCount >= 1) {
        resultName = 'Radioactive SuperGuac™';
        resultDescription = 'Glowing green perfection that may or may not grant superpowers. Side effects include seeing the blockchain.';
      } else if (hasAbsurd) {
        resultName = 'Experimental Guacamole';
        resultDescription = 'Science has gone too far, and we love it. Warning: May cause digital dreams.';
      } else if (selectedIngredients.length >= 4) {
        resultName = 'Premium Artisan Guacamole';
        resultDescription = 'A sophisticated blend worthy of the finest blockchain bistros.';
      }
      
      const resultHash = `0x9u4c${Math.random().toString(36).substr(2, 6)}...`;
      
      setGuacamoleResult({
        name: resultName,
        description: resultDescription,
        hash: resultHash,
      });
      
      setIsBlending(false);
      setShowResult(true);
      
      // Add reward money based on quality
      const reward = legendaryCount * 20 + selectedIngredients.length * 5;
      setMoney(money + reward);
      
      setReplayData([...replayData, `Completed ${resultName} at ${new Date().toISOString()}`]);
    }, 3000);
  };

  const resetLaboratory = () => {
    setSelectedIngredients([]);
    setShowResult(false);
    setGuacamoleResult(null);
    setReplayData([...replayData, `Reset laboratory at ${new Date().toISOString()}`]);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'legendary': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    return category === 'absurd' ? 'border-red-500 bg-red-900/20' : 'border-green-500 bg-green-900/20';
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-900 via-indigo-900 to-green-900 p-4 overflow-hidden">
      {/* Laboratory Header */}
      <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          🧪 Interactive Guacamole Laboratory
        </h2>
        <p className="text-gray-300 text-sm">
          Craft the perfect guacamole using blockchain-verified ingredients. Mix normal and absurd elements for unique results!
        </p>
        <div className="mt-2 text-yellow-400 font-semibold">
          💰 GuacCoins: {money} | 🥼 Experiments: {replayData.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Ingredients Panel */}
        <div className="lg:col-span-1 bg-black/30 backdrop-blur-sm p-4 rounded-lg overflow-y-auto max-h-96 lg:max-h-full">
          <h3 className="text-lg font-bold text-white mb-4">🧬 Available Ingredients</h3>
          
          <div className="space-y-2">
            <h4 className="text-green-400 font-semibold">Normal Ingredients</h4>
            {INGREDIENTS.filter(i => i.category === 'normal').map((ingredient) => (
              <div
                key={ingredient.id}
                className={`p-2 rounded border cursor-pointer transition-all duration-300 hover:scale-105 ${getCategoryColor(ingredient.category)}`}
                onClick={() => addIngredient(ingredient)}
                title={ingredient.description}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{ingredient.icon}</span>
                    <div>
                      <div className="text-white text-sm font-medium">{ingredient.name}</div>
                      <div className={`text-xs ${getRarityColor(ingredient.rarity)}`}>
                        {ingredient.rarity} • {ingredient.rarity === 'legendary' ? '30' : ingredient.rarity === 'rare' ? '15' : '5'} 💰
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <h4 className="text-red-400 font-semibold mt-4">Absurd Ingredients</h4>
            {INGREDIENTS.filter(i => i.category === 'absurd').map((ingredient) => (
              <div
                key={ingredient.id}
                className={`p-2 rounded border cursor-pointer transition-all duration-300 hover:scale-105 ${getCategoryColor(ingredient.category)}`}
                onClick={() => addIngredient(ingredient)}
                title={ingredient.description}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{ingredient.icon}</span>
                    <div>
                      <div className="text-white text-sm font-medium">{ingredient.name}</div>
                      <div className={`text-xs ${getRarityColor(ingredient.rarity)}`}>
                        {ingredient.rarity} • {ingredient.rarity === 'legendary' ? '30' : ingredient.rarity === 'rare' ? '15' : '5'} 💰
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mixing Bowl */}
        <div className="lg:col-span-1 bg-black/30 backdrop-blur-sm p-4 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">🥣 Mixing Bowl</h3>
          
          {/* Mixing Animation */}
          <div className={`relative w-full h-48 bg-gradient-to-b from-green-600 to-green-800 rounded-full border-4 border-gray-400 mb-4 overflow-hidden ${isBlending ? 'animate-pulse' : ''}`}>
            {isBlending && (
              <div className="absolute inset-0 bg-yellow-400/30 animate-spin rounded-full">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" />
                <div className="absolute bottom-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            )}
            
            {/* Ingredients in bowl */}
            <div className="absolute inset-4 flex flex-wrap items-center justify-center">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className={`text-lg m-1 cursor-pointer hover:scale-110 transition-transform ${isBlending ? 'animate-bounce' : ''}`}
                  onClick={() => removeIngredient(index)}
                  title={`Remove ${ingredient.name}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {ingredient.icon}
                </span>
              ))}
            </div>
            
            {/* Bowl status */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded">
              {isBlending ? 'Blending...' : selectedIngredients.length === 0 ? 'Empty' : `${selectedIngredients.length} ingredients`}
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-2">
            <button
              onClick={startBlending}
              disabled={selectedIngredients.length === 0 || isBlending}
              className="w-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded font-semibold transition-colors"
            >
              {isBlending ? '🌪️ Blending...' : '🔄 Start Blending'}
            </button>
            
            <button
              onClick={resetLaboratory}
              disabled={isBlending}
              className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded font-semibold transition-colors"
            >
              🗑️ Reset Laboratory
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-1 bg-black/30 backdrop-blur-sm p-4 rounded-lg overflow-y-auto max-h-96 lg:max-h-full">
          <h3 className="text-lg font-bold text-white mb-4">📊 Results & Analysis</h3>
          
          {showResult && guacamoleResult && (
            <div className="bg-gradient-to-r from-green-800 to-purple-800 p-4 rounded-lg mb-4 border-2 border-yellow-400">
              <h4 className="text-yellow-400 font-bold text-lg mb-2">🎉 {guacamoleResult.name}</h4>
              <p className="text-white text-sm mb-2">{guacamoleResult.description}</p>
              <div className="text-xs text-gray-300">
                <div>🔗 Blockchain Hash: {guacamoleResult.hash}</div>
                <div>⏰ Timestamp: {new Date().toLocaleString()}</div>
                <div>🔬 Quality: {selectedIngredients.length >= 5 ? 'Premium' : selectedIngredients.length >= 3 ? 'Good' : 'Basic'}</div>
              </div>
            </div>
          )}

          {/* Recipe suggestions */}
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">💡 Recipe Suggestions</h4>
            <div className="space-y-1 text-xs text-gray-300">
              <div>🥑 Classic: Avocado + Lime + Salt + Onion</div>
              <div>⚡ Electric: Add Free-Range Electrons</div>
              <div>🌙 Cosmic: Moon Dust + Uranium combo</div>
              <div>📶 Connected: WiFi Cilantro + Liquid WiFi</div>
            </div>
          </div>

          {/* Replay Data */}
          <div>
            <h4 className="text-white font-semibold mb-2">📝 Session Log</h4>
            <div className="space-y-1 text-xs text-gray-400 max-h-32 overflow-y-auto">
              {replayData.slice(-10).map((entry, index) => (
                <div key={index} className="truncate">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}