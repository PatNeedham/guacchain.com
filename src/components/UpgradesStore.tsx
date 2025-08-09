'use client';

import { useState } from 'react';

interface Upgrade {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  purchased: boolean;
}

interface UpgradesStoreProps {
  money: number;
  setMoney: (value: number) => void;
  upgrades: Upgrade[];
  setUpgrades: (upgrades: Upgrade[]) => void;
}

export default function UpgradesStore({
  money,
  setMoney,
  upgrades,
  setUpgrades,
}: UpgradesStoreProps) {
  const purchaseUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    if (!upgrade || upgrade.purchased || money < upgrade.price) return;

    setMoney(money - upgrade.price);
    setUpgrades(upgrades.map(u => 
      u.id === upgradeId ? { ...u, purchased: true } : u
    ));
  };

  return (
    <div className="bg-purple-900/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold text-white mb-4">🛒 Absurd Upgrades Store</h3>
      
      <div className="mb-4 p-2 bg-yellow-600 rounded text-center">
        <span className="text-white font-bold">💰 GuacCoins: {money}</span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {upgrades.map((upgrade) => (
          <div
            key={upgrade.id}
            className={`p-3 rounded border transition-all duration-300 ${
              upgrade.purchased
                ? 'bg-green-800 border-green-600 opacity-60'
                : money >= upgrade.price
                ? 'bg-purple-800 border-purple-600 hover:bg-purple-700 cursor-pointer'
                : 'bg-gray-800 border-gray-600 opacity-50 cursor-not-allowed'
            }`}
            onClick={() => purchaseUpgrade(upgrade.id)}
            title={upgrade.description}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{upgrade.icon}</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{upgrade.name}</h4>
                  <p className="text-xs text-gray-300">{upgrade.description}</p>
                </div>
              </div>
              <div className="text-right">
                {upgrade.purchased ? (
                  <span className="text-green-400 text-sm">✓ Owned</span>
                ) : (
                  <span className="text-yellow-400 text-sm">{upgrade.price} 💰</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}