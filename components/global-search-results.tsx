"use client"

import { Search, X, Users, DollarSign, Calendar, UserPlus, TrendingUp, FileText } from "lucide-react"

interface SearchResult {
  id: string
  title: string
  subtitle: string
  section: string
  type: string
  data: any
}

interface GlobalSearchResultsProps {
  results: SearchResult[]
  searchTerm: string
  onClearSearch: () => void
  onNavigate: (section: string) => void
}

export function GlobalSearchResults({ results, searchTerm, onClearSearch, onNavigate }: GlobalSearchResultsProps) {
  const getSectionIcon = (section: string) => {
    switch (section) {
      case "employees":
        return Users
      case "payroll":
        return DollarSign
      case "attendance":
        return Calendar
      case "recruitment":
        return UserPlus
      case "performance":
        return TrendingUp
      case "documents":
        return FileText
      default:
        return Search
    }
  }

  const getSectionColor = (section: string) => {
    switch (section) {
      case "employees":
        return "text-blue-400 bg-blue-500/20"
      case "payroll":
        return "text-green-400 bg-green-500/20"
      case "attendance":
        return "text-purple-400 bg-purple-500/20"
      case "recruitment":
        return "text-orange-400 bg-orange-500/20"
      case "performance":
        return "text-pink-400 bg-pink-500/20"
      case "documents":
        return "text-teal-400 bg-teal-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Search Results</h1>
          <p className="text-gray-400 mt-1">
            Found {results.length} results for "{searchTerm}"
          </p>
        </div>
        <button
          onClick={onClearSearch}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <X size={16} />
          <span>Clear Search</span>
        </button>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => {
            const Icon = getSectionIcon(result.section)
            const colorClass = getSectionColor(result.section)
            
            return (
              <div
                key={result.id}
                className="bg-[#1a1b23] rounded-lg p-4 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer"
                onClick={() => onNavigate(result.section)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-medium">{result.title}</h3>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full capitalize">
                        {result.section}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{result.subtitle}</p>
                    <p className="text-gray-500 text-xs mt-1 capitalize">{result.type}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-[#1a1b23] rounded-lg p-8 border border-gray-800 text-center">
          <Search size={48} className="text-gray-600 mx-auto mb-4" />
          <h3 className="text-white text-lg font-medium mb-2">No results found</h3>
          <p className="text-gray-400">
            Try searching for employees, departments, positions, or other terms
          </p>
        </div>
      )}
    </div>
  )
}