import React from 'react';
import './style.css';

export function Card(props) {
  return (
    <div className="container">
      <div className="card">
        <div className="imgBx">
          <img
            alt="movie"
            border="0"
            src="https://i.ibb.co/HDZQyGT/movie.png"
          />
        </div>
        <div className="contentBx">
          <a href="https://github.com/ltatarev/the-moviest" target="_blank">
            <h2>Moviest</h2>
            <p>MEAN stack movie app</p>
          </a>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {};

Card.defaultProps = {};

export default React.memo(Card);
