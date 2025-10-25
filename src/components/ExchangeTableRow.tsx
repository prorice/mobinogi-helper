import React from 'react';
import LimitBadge from './LimitBadge';
import { Exchange } from '../types/exchange';

interface ExchangeTableRowProps {
  exchange: Exchange;
}

const ExchangeTableRow: React.FC<ExchangeTableRowProps> = ({ exchange }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-purple-50 transition-colors">
      <td className="px-4 py-3 text-sm text-gray-800">{exchange.region}</td>
      <td className="px-4 py-3 text-sm font-medium text-blue-600">{exchange.npc}</td>
      <td className="px-4 py-3 text-sm">
        <span className="text-gray-800">{exchange.need}</span>
        <span className="ml-1 text-red-600 font-semibold">×{exchange.needQty}</span>
      </td>
      <td className="px-4 py-3 text-center text-purple-600">→</td>
      <td className="px-4 py-3 text-sm">
        <span className="text-gray-800">{exchange.get}</span>
        <span className="ml-1 text-green-600 font-semibold">×{exchange.getQty}</span>
      </td>
      <td className="px-4 py-3 text-center">
        <LimitBadge limit={exchange.limit} />
      </td>
      <td className="px-4 py-3 text-center text-sm text-gray-600">
        {exchange.maxCount === 999 ? '∞' : exchange.maxCount}
      </td>
      <td className="px-4 py-3 text-xs text-gray-500">{exchange.note || '-'}</td>
    </tr>
  );
};

export default ExchangeTableRow;
