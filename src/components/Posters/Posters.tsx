import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './Posters.module.scss';
import noImage from '../../assets/noimg.png';

interface PosterProps {
  posters: Array<{
    Poster: string;
    Title: string;
    imdbID: string;
  }>;
  isWatchList?: boolean;
}

interface MediaProps {
  media: Array<{
    Poster: string;
    Title: string;
    imdbID: string;
    Year?: string;
    Runtime?: string;
    Genre?: string;
    imdbRating?: string;
    Ratings?: Array<{
      Source: string;
      Value: string;
    }>;
  }>;
  type: string;
}

interface Poster {
  Poster: string;
  Title: string;
  imdbID: string;
}

function Posters({ posters, isWatchList = false }: PosterProps) {
  const [postersToDisplay, setPostersToDisplay] = useState(posters);
  const [favorites, setFavorites] = useState<MediaProps['media'][0][]>(
    JSON.parse(localStorage.getItem('favorites') || '[]') || [],
  );

  const deleteFromWatchList = (imdbID: string) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== imdbID));
    setPostersToDisplay(
      postersToDisplay.filter((poster) => poster.imdbID !== imdbID),
    );
  };

  const addToFavorite = (mediaSource: MediaProps['media'][0]) => {
    const isDuplicated = favorites.some(
      (favoriteSource) => favoriteSource.imdbID === mediaSource.imdbID,
    );
    if (!isDuplicated) {
      setFavorites([...favorites, mediaSource]);
    } else {
      setFavorites(
        favorites.filter((fav) => fav.imdbID !== mediaSource.imdbID),
      );
    }
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  if (!posters || posters.length === 0) {
    return (
      <p
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#eaeaea',
        }}
      >
        Type Movie or Show
      </p>
    );
  }
  return (
    <div className={styles.box__posters}>
      {isWatchList
        ? postersToDisplay.map((poster: Poster) => (
          <div className={styles.box__posters_poster} key={poster.imdbID}>
            <div className={styles.box__posters__imageContainer}>
              <button
                type="button"
                onClick={() => deleteFromWatchList(poster.imdbID)}
              >
                <FontAwesomeIcon
                  icon={
                    favorites.some((fav) => fav.imdbID === poster.imdbID)
                      ? faMinus
                      : faPlus
                  }
                  className={styles.faPlus}
                />
              </button>
              <img
                src={poster.Poster === 'N/A' ? noImage : poster.Poster}
                alt={poster.Title}
                className={styles.box__posters__imageContainer_image}
                loading="lazy"
              />
            </div>
          </div>
        ))
        : posters.map((poster: Poster) => (
          <div className={styles.box__posters_poster} key={poster.imdbID}>
            <div className={styles.box__posters__imageContainer}>
              <button type="button" onClick={() => addToFavorite(poster)}>
                <FontAwesomeIcon
                  icon={
                    favorites.some((fav) => fav.imdbID === poster.imdbID)
                      ? faMinus
                      : faPlus
                  }
                  className={styles.faPlus}
                />
              </button>
              <img
                src={poster.Poster === 'N/A' ? noImage : poster.Poster}
                alt={poster.Title}
                className={styles.box__posters__imageContainer_image}
                loading="lazy"
              />
            </div>
          </div>
        ))}
    </div>
  );
}

Posters.defaultProps = {
  isWatchList: false,
};

export default Posters;
