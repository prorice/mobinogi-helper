import React from 'react';
import FilterButton from './FilterButton';

interface FilterSectionProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  colorClass: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedItems,
  onToggle,
  colorClass,
}) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <FilterButton
            key={item}
            label={item}
            isSelected={selectedItems.includes(item)}
            onClick={() => onToggle(item)}
            colorClass={colorClass}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterSection;
