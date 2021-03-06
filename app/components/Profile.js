var React = require( 'react' );
var Router = require( 'react-router' );
var Repos = require( './github/Repos' );
var Notes = require( './notes/Notes' );
var UserProfile = require( './github/UserProfile' );
var ReactFireMixin = require( 'reactfire' );
var Firebase = require( 'firebase' );
var helpers = require('../utils/helpers');

var config = {
  apiKey: "AIzaSyBErgEyC_PW5NlvM8NTCYM9pusNIN6QAbU",
  authDomain: "egghead-react-practice.firebaseapp.com",
  databaseURL: "https://egghead-react-practice.firebaseio.com",
  storageBucket: "egghead-react-practice.appspot.com",
};

Firebase.initializeApp( config );

var Profile = React.createClass( {
  mixins: [ReactFireMixin],
  getInitialState: function (  ) {
    return {
      notes: [],
      bio: {  },
      repos: []
    }
  },
  componentWillMount: function ( ) {
    this.ref = Firebase.database( ).ref( '/' );
    var childRef = this.ref.child( this.props.params.username );
    this.bindAsArray( childRef, 'notes' );

    helpers.getGithubInfo( this.props.params.username )
      .then( function ( data ) {
        this.setState( {
          bio: data.bio,
          repos: data.repos
        } );
      }.bind(this) );
  },
  componentWillUnmount: function (  ) {
    this.unbind( 'notes' );
  },
  handleAddNote: function ( newNote ) {
    this.ref.child( this.props.params.username ).child( this.state.notes.length ).set( newNote );
  },
  render: function(  ) {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote}
          />
        </div>
      </div>
    )
  }
} );

module.exports = Profile;
