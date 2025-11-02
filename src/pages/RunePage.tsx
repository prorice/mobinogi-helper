import React, { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterSection from '../components/FilterSection';
import { RuneData, jobs } from '../data/runeData';

const RunePage: React.FC = () => {
  const [searchName, setSearchName] = useState<string>('');
  const [selectedEquipments, setSelectedEquipments] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]); // 티어 필터 추가
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const equipments = ['무기', '방어구', '악세사리', '엠블럼'];
  const grades = ['전설', '신화'];
  const tiers = ['1티어'];

  const filteredData = useMemo(() => {
    return RuneData.filter(rune => {
      const matchName = !searchName || rune.name.toLowerCase().includes(searchName.toLowerCase());
      const matchEquipment =
        selectedEquipments.length === 0 || selectedEquipments.includes(rune.equipment);
      const matchGrade = selectedGrades.length === 0 || selectedGrades.includes(rune.grade);
      const matchJob =
        selectedJobs.length === 0 ||
        (rune.equipment === '악세사리' && rune.job && selectedJobs.includes(rune.job));
      const matchTier =
        selectedTiers.length === 0 || (rune.tier && selectedTiers.includes(`${rune.tier}티어`)); // 티어 필터 조건

      return matchName && matchEquipment && matchGrade && matchJob && matchTier;
    });
  }, [searchName, selectedEquipments, selectedGrades, selectedJobs, selectedTiers]);

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
    setSearchName('');
    setSelectedEquipments([]);
    setSelectedGrades([]);
    setSelectedJobs([]);
    setSelectedTiers([]);
  };

  const hasActiveFilters =
    searchName ||
    selectedEquipments.length > 0 ||
    selectedGrades.length > 0 ||
    selectedJobs.length > 0 ||
    selectedTiers.length > 0;

  const getTierColor = (tier?: number) => {
    if (!tier) return 'bg-gray-100 text-gray-700';
    switch (tier) {
      case 1:
        return 'bg-red-100 text-red-700';
      case 2:
        return 'bg-orange-100 text-orange-700';
      case 3:
        return 'bg-yellow-100 text-yellow-700';
      case 4:
        return 'bg-green-100 text-green-700';
      case 5:
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold text-purple-900 mb-2">룬 정보</h2>
        <p className="text-gray-600 mb-6">장비별 룬 정보를 검색하고 필터링하세요</p>

        {/* 검색 */}
        <div className="mb-4">
          <SearchBar placeholder="룬 이름 검색..." value={searchName} onChange={setSearchName} />
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
              title="장비"
              items={equipments}
              selectedItems={selectedEquipments}
              onToggle={value => toggleFilter(value, selectedEquipments, setSelectedEquipments)}
              colorClass="bg-purple-600 text-white"
            />
            <FilterSection
              title="등급"
              items={grades}
              selectedItems={selectedGrades}
              onToggle={value => toggleFilter(value, selectedGrades, setSelectedGrades)}
              colorClass="bg-blue-600 text-white"
            />
            <FilterSection
              title="티어"
              items={tiers}
              selectedItems={selectedTiers}
              onToggle={value => toggleFilter(value, selectedTiers, setSelectedTiers)}
              colorClass="bg-red-600 text-white"
            />
            <FilterSection
              title="직업"
              items={[...jobs]}
              selectedItems={selectedJobs}
              onToggle={value => toggleFilter(value, selectedJobs, setSelectedJobs)}
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

        {/* 룬 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.length === 0 ? (
            <div className="col-span-full px-4 py-8 text-center text-gray-500">
              검색 결과가 없습니다
            </div>
          ) : (
            filteredData.map((rune, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold text-gray-900">{rune.name}</h4>
                  {rune.tier && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTierColor(rune.tier)}`}
                    >
                      {rune.tier}티어
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {rune.equipment}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      rune.grade === '전설'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {rune.grade}
                  </span>
                  {rune.job && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                      {rune.job} 전용
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-700 font-medium mb-1">효과</div>
                  <div className="text-sm text-gray-600">{rune.effect}</div>
                </div>

                {rune.description && (
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">💡 {rune.description}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RunePage;
