import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {

  const PAGE_MIN = 1
  const UP = 'up'
  const DOWN = 'down'

  const [searchResult, setSearchResult] = useState()
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(PAGE_MIN)


  useEffect(() => {
    handleSearch(page);
  },[page,searchTerm])
 
  const handleSearch = async (searchPage = null) => {
    let searchString

    if (searchTerm) {
      if (searchPage) {
        searchString = `http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}&page=${searchPage}`
      } else {
        searchString = `http://www.omdbapi.com/?apikey=a461e386&s=${searchTerm}`
      }

      const response = await fetch(searchString)

      const data = await response.json()
      console.log('searchString', searchString)
      console.log('searchResult', data)
      setSearchResult(data)
    }
  }
  const handlePageChange = async direction => {
    if (direction === DOWN && page === PAGE_MIN) return

    const newPage = direction === DOWN ? page - 1 : page + 1
    setPage(newPage)
   // await handleSearch(newPage)
  }

  const handleUp = async () => {
    await handlePageChange(UP)
  }

  const handleDown = async () => {
    await handlePageChange(DOWN)
  }

  const handleKeypress = async e => {
    if (e.charCode === 13) {
  //    await handleSearch()
    }
  }

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyPress={handleKeypress}
        />
        <button /* onClick={handleSearch} */>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div onClick={handleDown} className="chevron">
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult &&
              searchResult.Search &&
              searchResult.Search.length &&
              searchResult.Search.map(result => (
                <div key={result.imdbID} className="search-item">
                  <img
                    src={
                      result.Poster === 'N/A' ? placeholderImg : result.Poster
                    }
                    alt="poster"
                  />
                  <div className="search-item-data">
                    <div className="title">{result.Title}</div>
                    <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                  </div>
                </div>
              ))}
          </div>
          <div onClick={handleUp} className="chevron">
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
