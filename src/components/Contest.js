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

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              <li className="list-group-item">Name one...</li>
              <li className="list-group-item">Name two...</li>
            </ul>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="input-group">
                <input type="text" placeholder="New Name Here..." className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
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