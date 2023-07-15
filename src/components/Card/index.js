import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';

import styles from './Card.module.scss';

function Card({
                  id,
                  title,
                  imageUrl,
                  price,
                  onFavorite,
                  favorited,
                  onPlus,
                  loading = false,
              }) {
    const { isItemAdded, favorites } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = { id, parentId: id, title, imageUrl, price };

    const onClickPlus = () => {
        onPlus(obj);
    };

    const onClickFavorite = () => {
        onFavorite(obj);
    };

    React.useEffect(() => {
        if(favorites?.find(favObj => favObj.parentId === obj.parentId)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false)
        }
    }, [favorites]);


    return (
        <div className={styles.card}>
            {loading ? (
                <ContentLoader
                    speed={2}
                    width={155}
                    height={250}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
                </ContentLoader>
            ) : (
                <>
                    {onFavorite && (
                        <div className={styles.favorite} onClick={onClickFavorite}>
                            <img width={28} height={20} src={isFavorite ? 'img/heartlike.svg' : 'img/heart.jpg'} alt="Unliked" />
                        </div>
                    )}
                    <img width="100%" height={220} src={imageUrl} alt="parfumes" />
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>Արժեքը:</span>
                            <b>{price} AMD.</b>
                        </div>
                        {onPlus && (
                            <img width={40} height={40}
                                className={styles.plus}
                                onClick={onClickPlus}
                                src={isItemAdded(id) ? 'img/green.jpg' : 'img/plus.jpg' }
                                alt="Plus"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;