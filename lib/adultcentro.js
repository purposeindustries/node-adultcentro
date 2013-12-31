"use strict";

var
  request = require( "request" ),
  _ = require( "underscore" ),
  crypto = require( "crypto" ),
  url = require( "url" );

var defaultQuery = {
  json: 1
};
var AdultCentro = function( options ){
  if( !options || !options.user || !options.baseUrl || !options.password || !options.hash ){
    throw new Error( "user, baseUrl, password and hash are mandatory!" );
  }
  this.user = options.user;
  this.baseUrl = options.baseUrl;
  this.password = options.password;
  this.hash = options.hash;
  this.alias = options.alias;
};


AdultCentro.prototype.query = function( options, cb ){
  options || ( options = {} );
  request({
    url: this.baseUrl + "api/boxedpromo",
    qs: _.extend({}, defaultQuery, {
      action: "showGalleries",
      subAction: "listScenes"
    }, options ),
    json: true
  }, function( err, response, body ){
    if( err ){
      return cb( err );
    }
    cb( err, body );
  });
};

AdultCentro.prototype.signVideo = function( link, options ){
  var parts = url.parse( link, true );
  var hasher = crypto.createHash( "md5" );
  var passwordHasher = crypto.createHash( "md5" );
  passwordHasher.update( this.password );
  options || ( options = {} );
  delete parts.search;
  options.expiration = options.expiration||( Date.now() + 100 );
  var query = {
    till: options.expiration
  };
  if( options.stream ){
    query.stream = "on";
  }
  if( this.alias ){
    query.alias = this.alias;
  }
  _.extend( parts.query, query );
  hasher.update( url.format( parts ) );
  hasher.update( passwordHasher.digest( "hex" ) );
  hasher.update( this.hash );
  hasher.update( options.expiration + "" );

  parts.query.hash = hasher.digest( "hex" );
  return url.format( parts );
};

module.exports = AdultCentro;