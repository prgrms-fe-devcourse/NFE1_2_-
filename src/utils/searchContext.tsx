import { createContext, useState, useContext } from 'react'

// SearchContext 생성
const SearchContext = createContext(null)

// SearchContextProvider 컴포넌트
export const SearchContextProvider = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  return (
    <SearchContext.Provider value={{ isSearchModalOpen, setIsSearchModalOpen }}>
      {children}
    </SearchContext.Provider>
  )
}

// Context를 사용할 수 있도록 커스텀 Hook 생성
export const useSearchContext = () => useContext(SearchContext)
