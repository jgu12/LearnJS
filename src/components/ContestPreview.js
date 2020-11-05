import React from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends React.Component {

  handleClick = () => {
    // console.log(this.props.contestName);
    this.props.onClick(this.props.id);
  }

  render() {
    return (
      <div className = 'link ContestPreview' onClick={this.handleClick}>
        <div className = 'category-name'>
          {this.props.categoryName}
        </div>
        <div className = 'contest-name'>
          {this.props.contestName}
        </div>
        <div className = 'contest-id'>
          {this.props.id}
        </div>
      </div>
    );

  }
}

ContestPreview.propTypes = {
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ContestPreview;


//original was a Stateless component, when need to handle dynamic functions it's better to upgrade to a react class.
//Otherwise it creates a function everytime when used (?)

// import React from 'react';
// const ContestPreview = (contest) => {
//   return (
//     <div className = 'ContestPreview'>
//       <div className = 'category-name'>
//         {contest.categoryName}
//       </div>
//       <div className = 'contest-name'>
//         {contest.contestName}
//       </div>
//       <div className = 'contest-id'>
//         {contest.id}
//       </div>
//     </div>
//   );
// };
// export default ContestPreview;