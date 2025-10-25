import React from 'react';
import clsx from 'clsx';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  colorClass: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isSelected, onClick, colorClass }) => {
  return (
    <button
      onClick={onClick}
      className={clsx('px-3 py-1 rounded-full text-sm transition-colors', {
        [colorClass]: isSelected,
        'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100': !isSelected,
      })}
    >
      {label}
    </button>
  );
};

export default FilterButton;
