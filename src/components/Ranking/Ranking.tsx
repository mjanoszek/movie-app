import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import styles from './Ranking.module.scss';
import noImage from '../../assets/noimg.png';
import imdbLogo from '../../assets/IMDB_Logo_2016.svg';
import rottenLogo from '../../assets/Rotten_Tomatoes.svg';
import metacriticLogo from '../../assets/Metacritic.svg';

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

function Ranking({ media, type }: MediaProps) {
  const [favorites, setFavorites] = useState<MediaProps['media'][0][]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  if (!media || media.length === 0) {
    return (
      <p
        style={{
          color: '#eaeaea',
          textAlign: 'center',
          marginTop: '30px',
          fontSize: '24px',
        }}
      >
        Loading...
      </p>
    );
  }

  return (
    
    <div className={styles[`box__${type}`]}>
      {media.map((mediaSource, indx) => (
        <div key={mediaSource.imdbID} className={styles[`box__${type}_${type.slice(0, -1)}`]}>
          <div className={styles[`box__${type}__imageContainer`]}>
            <button type="button" onClick={() => addToFavorite(mediaSource)} aria-label="Add to Watchlist">
              <FontAwesomeIcon
                icon={
                  favorites.some((fav) => fav.imdbID === mediaSource.imdbID)
                    ? faMinus
                    : faPlus
                }
                className={styles.faPlus}
              />
            </button>
            <img
              src={mediaSource.Poster === 'N/A' ? noImage : mediaSource.Poster}
              alt={mediaSource.Title}
              className={styles[`box__${type}__imageContainer_image`]}
            />
          </div>
          <div className={styles[`box__${type}_data`]}>
            <p>
              {indx + 1}. {mediaSource.Title}{' '}
              <span style={{ color: '#b7b7b7' }}>({mediaSource.Year})</span>
            </p>
            <div className={styles[`box__${type}_about`]}>
              <p>{mediaSource.Runtime}</p>
              <p>|</p>
              <p>{mediaSource.Genre}</p>
            </div>
            


            
            <div className={styles[`box__${type}_rating`]}>


              <div className={styles[`box__${type}_rating__row`]}>

                
                <div className={styles[`box__${type}_rating__rate`]}>
                  <img src={imdbLogo} alt="imdb" loading="lazy" />
                  <p>{mediaSource.imdbRating}</p>
                </div>

                
                <div className={styles[`box__${type}_rating__rate`]}>
                  {mediaSource.Ratings?.[1] && (
                    <>
                      <img src={rottenLogo} alt="rottentomatoes" loading="lazy" />
                      <p>{mediaSource.Ratings[1].Value}</p>
                    </>
                  )}
                </div>


                <div className={styles[`box__${type}_rating__rate`]}>
                  {mediaSource.Ratings?.[2] && (
                    <>
                      <img
                        src={metacriticLogo}
                        alt="metacritic"
                        loading="lazy"
                      />
                      <p>{mediaSource.Ratings[2].Value.slice(0, 2)}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ranking;
