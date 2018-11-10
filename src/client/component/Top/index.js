import React from 'react';
import {connect} from 'react-redux';
import './index.scss';

class _Top extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: this.props.movies || []
    };
  }

  render() {
    return (
      <div className="top-movies">
        {
          this.state.movies.map((movie, index) => {
            return (
              <div className="movie-item" key={index}>
                <div className="movie-item-inner">
                  <img src={movie.images.medium} alt=""/>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    movies: state.topMovies
  }
}


const Top = connect(mapStateToProps)(_Top);

export default  Top;


