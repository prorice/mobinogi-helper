import React from 'react';
import LimitBadge from './LimitBadge';
import { Exchange } from '../types/exchange';

interface ExchangeCardProps {
  exchange: Exchange;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ exchange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-xs text-gray-500">{exchange.region}</div>
          <div className="text-lg font-semibold text-blue-600">{exchange.npc}</div>
        </div>
        <span className="whitespace-nowrap">
          <LimitBadge limit={exchange.limit} maxCount={exchange.maxCount} showCount={true} />
        </span>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-2">
        <div className="text-xs text-gray-500 mb-1">필요</div>
        <div className="text-sm">
          <span className="text-gray-800 font-medium">{exchange.need}</span>
          <span className="ml-1 text-red-600 font-semibold">×{exchange.needQty}</span>
        </div>
      </div>

      <div className="flex justify-center my-2">
        <div className="text-purple-600 font-bold">↓</div>
      </div>

      <div className="bg-green-50 rounded-lg p-3 mb-2">
        <div className="text-xs text-gray-500 mb-1">교환</div>
        <div className="text-sm">
          <span className="text-gray-800 font-medium">{exchange.get}</span>
          <span className="ml-1 text-green-600 font-semibold">×{exchange.getQty}</span>
        </div>
      </div>

      {exchange.note && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">💡 {exchange.note}</div>
        </div>
      )}
    </div>
  );
};

export default ExchangeCard;
