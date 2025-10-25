import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import ExchangeTableRow from '../components/ExchangeTableRow';
import ExchangeCard from '../components/ExchangeCard';
import { ExchangeData } from '../data/exchangeData';

const ExchangePage: React.FC = () => {
  const [searchNeed, setSearchNeed] = useState<string>('');
  const [searchGet, setSearchGet] = useState<string>('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedNpcs, setSelectedNpcs] = useState<string[]>([]);
  const [selectedLimits, setSelectedLimits] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const regions = [...new Set(ExchangeData.map(t => t.region))];
  const limits = [...new Set(ExchangeData.map(t => t.limit))];

  const npcs = useMemo(() => {
    if (selectedRegions.length === 0) {
      return [...new Set(ExchangeData.map(t => t.npc))];
    }
    return [
      ...new Set(ExchangeData.filter(t => selectedRegions.includes(t.region)).map(t => t.npc)),
    ];
  }, [selectedRegions]);

  const filteredData = useMemo(() => {
    return ExchangeData.filter(exchange => {
      const matchNeed =
        !searchNeed || exchange.need.toLowerCase().includes(searchNeed.toLowerCase());
      const matchGet = !searchGet || exchange.get.toLowerCase().includes(searchGet.toLowerCase());
      const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(exchange.region);
      const matchNpc = selectedNpcs.length === 0 || selectedNpcs.includes(exchange.npc);
      const matchLimit = selectedLimits.length === 0 || selectedLimits.includes(exchange.limit);

      return matchNeed && matchGet && matchRegion && matchNpc && matchLimit;
    });
  }, [searchNeed, searchGet, selectedRegions, selectedNpcs, selectedLimits]);

  useEffect(() => {
    if (selectedRegions.length > 0) {
      const validNpcs = [
        ...new Set(ExchangeData.filter(t => selectedRegions.includes(t.region)).map(t => t.npc)),
      ];
      setSelectedNpcs(prev => prev.filter(npc => validNpcs.includes(npc)));
    }
  }, [selectedRegions]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchNeed('');
    setSearchGet('');
    setSelectedRegions([]);
    setSelectedNpcs([]);
    setSelectedLimits([]);
  };

  const hasActiveFilters =
    searchNeed ||
    searchGet ||
    selectedRegions.length > 0 ||
    selectedNpcs.length > 0 ||
    selectedLimits.length > 0;

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-purple-900 mb-2">물물교환</h2>
        <p className="text-gray-600 mb-6">NPC별 교환 아이템을 검색하고 필터링하세요</p>

        {/* 검색 */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <SearchBar
            placeholder="필요 아이템명 검색..."
            value={searchNeed}
            onChange={setSearchNeed}
          />
          <SearchBar
            placeholder="교환 아이템명 검색..."
            value={searchGet}
            onChange={setSearchGet}
          />
        </div>

        {/* 필터 토글 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            필터 {showFilters ? '숨기기' : '보기'}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              필터 초기화
            </button>
          )}
        </div>

        {/* 필터 영역 */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <FilterSection
              title="지역"
              items={regions}
              selectedItems={selectedRegions}
              onToggle={value => toggleFilter(value, selectedRegions, setSelectedRegions)}
              colorClass="bg-purple-600 text-white"
            />
            <FilterSection
              title="NPC"
              items={npcs}
              selectedItems={selectedNpcs}
              onToggle={value => toggleFilter(value, selectedNpcs, setSelectedNpcs)}
              colorClass="bg-blue-600 text-white"
            />
            <FilterSection
              title="제한 유형"
              items={limits}
              selectedItems={selectedLimits}
              onToggle={value => toggleFilter(value, selectedLimits, setSelectedLimits)}
              colorClass="bg-green-600 text-white"
            />
          </div>
        )}
      </div>

      {/* 결과 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            검색 결과 <span className="text-purple-600">({filteredData.length})</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          {/* 데스크톱 테이블 */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">지역</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">NPC</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    필요 아이템
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">→</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    교환 아이템
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    제한
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    횟수
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">비고</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      검색 결과가 없습니다
                    </td>
                  </tr>
                ) : (
                  filteredData.map((exchange, idx) => (
                    <ExchangeTableRow key={idx} exchange={exchange} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="md:hidden space-y-4">
            {filteredData.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">검색 결과가 없습니다</div>
            ) : (
              filteredData.map((exchange, idx) => <ExchangeCard key={idx} exchange={exchange} />)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangePage;
