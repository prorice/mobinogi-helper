import React from 'react';
import LimitBadge from './LimitBadge';

export interface Trade {
  region: string;
  npc: string;
  need: string;
  needQty: number;
  get: string;
  getQty: number;
  limit: string;
  maxCount: number;
  note?: string;
}

interface TradeTableRowProps {
  trade: Trade;
}

const TradeTableRow: React.FC<TradeTableRowProps> = ({ trade }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-purple-50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-800">{trade.region}</td>
      <td className="px-4 py-3 text-sm font-medium text-blue-600">{trade.npc}</td>
      <td className="px-4 py-3 text-sm">
        <span className="text-gray-800">{trade.need}</span>
        <span className="ml-1 text-red-600 font-semibold">×{trade.needQty}</span>
      </td>
      <td className="px-4 py-3 text-center text-purple-600">→</td>
      <td className="px-4 py-3 text-sm">
        <span className="text-gray-800">{trade.get}</span>
        <span className="ml-1 text-green-600 font-semibold">×{trade.getQty}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <LimitBadge limit={trade.limit} />
      </td>
      <td className="px-4 py-3 text-center text-sm text-gray-600">
        {trade.maxCount === 999 ? '∞' : trade.maxCount}
      </td>
      <td className="px-4 py-3 text-xs text-gray-500">{trade.note || '-'}</td>
    </tr>
  );
};

export default TradeTableRow;
