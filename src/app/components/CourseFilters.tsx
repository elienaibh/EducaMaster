import Card from './Card';

interface CourseFiltersProps {
  categories: string[];
  levels: string[];
  selectedCategory?: string;
  selectedLevel?: string;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
}

export default function CourseFilters({
  categories,
  levels,
  selectedCategory,
  selectedLevel,
  onCategoryChange,
  onLevelChange,
}: CourseFiltersProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
          <select
            className="w-full rounded-lg border-gray-300"
            value={selectedCategory}
            onChange={e => onCategoryChange(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
          <select
            className="w-full rounded-lg border-gray-300"
            value={selectedLevel}
            onChange={e => onLevelChange(e.target.value)}
          >
            <option value="">Todos</option>
            {levels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}
