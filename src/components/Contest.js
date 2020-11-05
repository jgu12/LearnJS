import React from 'react';
import PropTypes from 'prop-types';

class Contest extends React.Component{

  render(){
    return (
      <div className="Contest">
        <div className = 'category-name'>
          {this.props.categoryName}
        </div>
        <div className = 'contest-name'>
          {this.props.contestName}
        </div>
        <div className = 'contest-id'>
          {this.props.id}
        </div>
        <div className = 'contest-description'>
          {this.props.description}
        </div>
        <div className="home-link link" onClick={this.props.contestListClick}>
          Contest Link
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  contestListClick: PropTypes.func.isRequired
};

export default Contest;