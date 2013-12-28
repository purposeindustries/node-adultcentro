"use strict";
var should = require( "should" );

var AdultCentro = require( ".." );

describe( "Testing AdultCentro klass", function(){

  it( "should throw error if options is null", function(){
    (function(){
      new AdultCentro();
    }).should.throwErorr;
  });

  it( "should throw error if user is null", function(){
    (function(){
      new AdultCentro({
        user: null,
        hash: "foo",
        baseUrl: "bar",
        password: "foobar"
      });
    }).should.throwErorr;
  });

  it( "should throw error if baseUrl is null", function(){
    (function(){
      new AdultCentro({
        user: "bar",
        hash: "foo",
        baseUrl: null,
        password: "foobar"
      });
    }).should.throwErorr;
  });

  it( "should throw error if hash is null", function(){
    (function(){
      new AdultCentro({
        user: "foo",
        hash: null,
        baseUrl: "bar",
        password: "foobar"
      });
    }).should.throwErorr;
  });

  it( "should throw error if password is null", function(){
    (function(){
      new AdultCentro({
        user: "foobar",
        hash: "foo",
        baseUrl: "bar",
        password: null
      });
    }).should.throwErorr;
  });

  it( "should not throw error if user, baseUrl, hash, password are defined", function(){
    (function(){
      new AdultCentro({
        user: "foofoo",
        hash: "foo",
        baseUrl: "bar",
        password: "foobar"
      });
    }).should.not.throwErorr;
  });
});