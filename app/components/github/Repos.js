var React = require( 'react' );

var Repos = React.createClass( {
  propTypes: {
    username: React.PropTypes.string.isRequired,
    repos: React.PropTypes.array.isRequired
  },
  render: function(  ) {
    console.log('REPOS');
    console.log( this.props.repos );
    return (
      <div>
        <p> Repos </p>
      </div>
    )
  }
} );

module.exports = Repos;
