import React from 'react';
import Index from '../components/Card';
import AppContext from '../context';

function Favorites() {
    const { favorites, onAddToFavorite } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Իմ Պահպանվածները</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Index key={index} {...item} favorited={true} onFavorite={onAddToFavorite} id={item.parentId} />
                ))}
            </div>
        </div>
    );
}

export default Favorites;