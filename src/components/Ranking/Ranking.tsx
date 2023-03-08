import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from '@material-ui/core';
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
    Plot?: string;
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

  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState(false);

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

  const showText = (indx: number) => {
    if (isExpanded === indx) {
      setIsExpanded(null);
      setIsClicked(!isClicked);
    } else {
      setIsExpanded(indx);
    }
  };


  const matches = useMediaQuery('(max-width:375px)');  

 

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
            <p className={styles[`box__${type}_title`]}>
              {indx + 1}. {mediaSource.Title}{' '}
              <span className={styles[`box__${type}_details`]}>({mediaSource.Year})</span>
            </p>
            <div className={styles[`box__${type}_about`]}>
              <p className={styles[`box__${type}_details`]}>{mediaSource.Runtime}</p>
              <p className={styles[`box__${type}_details`]}>|</p>
              <p className={styles[`box__${type}_details`]}>{mediaSource.Genre}</p>
            </div>
            


            
            <div className={styles[`box__${type}_rating`]}>
             
              

              {type != 'shows' && (
                <div className={styles[`box__${type}_rating__row`]}>

                  <div className={styles[`box__${type}_rating__box`]} style={{ display: matches ? 'none' : 'block' }}>
                    <div className={styles[`box__${type}_details_toggleButton`]} >
                      <button type='button' onClick={() => showText(indx)}>{isExpanded == indx ? 'Hide Plot' : 'Show Plot'}</button>
                    </div>
                  </div>
            
                  <div className={styles[`box__${type}_rating__box`]}>
                    <img src={imdbLogo} alt="imdb" loading="lazy"/>
                    <p className={styles[`box__${type}_details`]}>{mediaSource.imdbRating}</p>
                  </div>

                  <div className={styles[`box__${type}_rating__box`]}>
                    {mediaSource.Ratings?.[1] && (
                      <>
                        <img src={rottenLogo} alt="rottentomatoes" loading="lazy" />
                        <p className={styles[`box__${type}_details`]}>{mediaSource.Ratings[1].Value}</p>
                      </>
                    )}
                  </div>

                  <div className={styles[`box__${type}_rating__box`]}>
                    {mediaSource.Ratings?.[2] && (
                      <>
                        <img
                          src={metacriticLogo}
                          alt="metacritic"
                          loading="lazy"
                        />
                        <p className={styles[`box__${type}_details`]}>{mediaSource.Ratings[2].Value.slice(0, 2)}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
                        
            </div>
        
            {(isExpanded === indx || type !== 'movies') && (
              <div className={type == 'movies' ? styles[`box__${type}_moviePlot`] : styles[`box__${type}_showPlot`]}>
                <p className={styles[`box__${type}_details_plot`]}>{mediaSource.Plot}</p>
              </div>
            )}
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ranking;
