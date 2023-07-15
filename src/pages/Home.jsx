import React from 'react';

import Index from '../components/Card';

function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading,
              }) {
    const [type, setType] = React.useState('all');
    const [selectedBrands, setSelectedBrands] = React.useState(new Set());
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()),
        );
        const filteredItemsByType = type === 'all' ? filtredItems : filtredItems.filter(item => item.type === type);
        const fItems = selectedBrands.size === 0 ? filteredItemsByType : filteredItemsByType.filter(item => selectedBrands.has(item.brand))
        return (isLoading ? [...Array(8)] : fItems).map((item, index) => (
            <Index
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    };


    const handleBrandCheck = (e) => {
        const arg = e.target.value;
        let brands = new Set([...selectedBrands]);
        if(brands.has(arg)) {
            brands.delete(arg)
        } else {
            brands.add(arg);
        }
        setSelectedBrands(brands);
    }

    return (
        <div className="content p-40 ">
            <h1>{searchValue ? `Որոնում ըստ: "${searchValue}"` : 'Բոլոր ապրանքները'}</h1>
            <div className="d-flex align-center justify-between mb-40">
                <select onChange={e => setType(e.target.value)}>
                    <option value="all">All</option>
                    <option value="M">Male</option>
                    <option value="W">Female</option>
                </select>
                <input type="checkbox" name="chk_group" value="GUCCI" onChange={handleBrandCheck}/>Gucci<br />
                <input type="checkbox" name="chk_group" value="CHANEL" onChange={handleBrandCheck}/>Chanel<br />
                <input type="checkbox" name="chk_group" value="GIVENCHY" onChange={handleBrandCheck}/>Givenchy<br />
                <input type="checkbox" name="chk_group" value="HUGO" onChange={handleBrandCheck}/>Hugo Boss<br />
                <input type="checkbox" name="chk_group" value="VERSACE" onChange={handleBrandCheck}/>Versace<br />
                <div className="search-block d-flex">
                    <img width={45} height={45} src="img/search.jpg" alt="Search" />
                    {searchValue && (
                        <img
                            onClick={() => setSearchValue('')}
                            className="clear cu-p"
                            src="img/removeBtn.jpg"
                            alt="Clear"
                        />
                    )}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Որոնում..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">{renderItems()}</div>
        </div>
    );
}

export default Home;