

const SearchBar = () => {


  const SearchByTitle = async (keyword) => { //조건 = 성별, 분류1 이후에 선택한 **분류2**
      searchParams.set('searchItem', keyword)
      setSearchParams(searchParams)
  
      try {
        const res = await Api.get('itemsearch')
        console.log(res.data)
        return res.data
      } catch (error) {
        throw error
      }
    }
  return (
    <div>

    </div>
  )

}

export default SearchBar