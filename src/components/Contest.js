import React from 'react';
import PropTypes from 'prop-types';

class Contest extends React.Component {
  state = {
    userClicked: false,
    submitSuccess: false
  }
  constructor() {
    super();
    this.submitRef = React.createRef();
  }
  componentDidMount() {
    this.setState({ submitSuccess: false, userClicked: false });
    this.props.fetchNames(this.props.nameIds);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //read value from input field
    if (this.submitRef.current.value === '') {
      this.setState({ submitSuccess: false, userClicked: true});
      return;
    }
    this.props.addName(this.submitRef.current.value, this.props._id);
    this.submitRef.current.value = '';
    this.setState({ submitSuccess: true, userClicked: true});
  }

  test = () => {
    if(this.state.userClicked == false){
      return;
    }
    if(this.state.submitSuccess == true){
      return <div className="alert alert-success" role="alert">
      Name added successfully :)
      </div>;
    }else{
      return <div className="alert alert-danger" role="alert">
      Empty Name!
      </div>;
    }
  }

  render() {
    return (
      <div className="Contest">
        <div className='category-name'>
          {this.props.categoryName}
        </div>
        <div className='contest-name'>
          {this.props.contestName}
        </div>
        <div className='contest-id'>
          {this.props.id}
        </div>
        <div className='contest-description'>
          {this.props.description}
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.nameIds.map(nameId =>
                <li key={nameId} className="list-group-item">
                  {this.props.lookupName(nameId).name}
                </li>
              )}
              <li className="list-group-item">...Intentional Empty Here...</li>
            </ul>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input type="text"
                  ref={this.submitRef}
                  placeholder="New Name Here..."
                  className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
              <div>
                {this.test()}
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
  contestListClick: PropTypes.func.isRequired,
  fetchNames: PropTypes.func.isRequired,
  nameIds: PropTypes.array.isRequired,
  lookupName: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

export default Contest;