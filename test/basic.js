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

  it( "should save alias, which passed in constructor", function(){
    var client = new AdultCentro({
      user: "foofoo",
      hash: "foo",
      baseUrl: "bar",
      password: "foobar",
      alias: "alias"
    });

    client.alias.should.eql( "alias" );
  });
});

describe( "testing url signing", function(){
  beforeEach(function(){
    this.client = new AdultCentro({
      user: "foobaruser",
      hash: "foobarhash",
      baseUrl: "http://example.com",
      password: "foobarpassword"
    });
  });

  it( "should sign video link", function(){
    var link = "http://example.com/video-link";
    var expiration = new Date( "2013-12-31T15:18:22.438Z" ).getTime();

    var signed = this.client.signVideo( link, {
      expiration: expiration
    });
    signed.should.eql( "http://example.com/video-link?till=1388503102438&hash=89ba42734c710e30968ce952e4970c1d" );
  });

  it( "should sign video link with alias", function(){
    this.client.alias = "foobaralias";
    var link = "http://example.com/video-link";
    var expiration = new Date( "2013-12-31T15:18:22.438Z" ).getTime();

    var signed = this.client.signVideo( link, {
      expiration: expiration
    });
    signed.should.eql( "http://example.com/video-link?till=1388503102438&alias=foobaralias&hash=9731f1463ea884884369890cf6065891" );
  });
});