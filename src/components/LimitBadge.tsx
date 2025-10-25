import React from 'react';
import clsx from 'clsx';

interface LimitBadgeProps {
  limit: string;
  maxCount?: number;
  showCount?: boolean;
}

const LimitBadge: React.FC<LimitBadgeProps> = ({ limit, maxCount, showCount = false }) => {
  const badgeClass = clsx('px-2 py-1 rounded-full text-xs font-medium', {
    'bg-blue-100 text-blue-700': limit === '일일',
    'bg-green-100 text-green-700': limit === '주간',
    'bg-orange-100 text-orange-700': limit === '계정',
    'bg-gray-100 text-gray-700': limit === '무한',
  });

  return (
    <span className={badgeClass}>
      {limit}
      {showCount && maxCount && ` ${maxCount === 999 ? '∞' : maxCount}회`}
    </span>
  );
};

export default LimitBadge;
