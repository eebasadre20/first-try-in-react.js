var React = require( 'react' );

var UserProfile = React.createClass( {
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
  },
  render: function(  ) {
    console.log( 'BIO' );
    console.log( this.props.bio );
    return (
      <div>
        <p> User </p>
        <p>
          { this.props.username }
        </p>
      </div>
    )
  }
} );

module.exports = UserProfile;
