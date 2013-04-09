// Copyright (c) 2013 Smithee, Spelvin, Agnew & Plinge, Inc. All Rights Reserved
// See https://raw.github.com/nodify/nodify-logger/master/LICENSE for license.

var uuid = require( '../nodify-uuid' );
console.log( "null   : " + uuid.nil.toString() );
console.log( "DNS  NS: " + uuid.NS_DNS.toString() );
console.log( "URL  NS: " + uuid.NS_URL.toString() );
console.log( "OID  NS: " + uuid.NS_OID.toString() );
console.log( "X500 NS: " + uuid.NS_X500.toString() );

uuid.generate( uuid.V_RANDOM, function (err, uuid ) {
  if( err ) {
    return console.log( err.toString() );
  }
  console.log( "random : " + uuid.toString() );
} );
uuid.generate( uuid.V_MD5, uuid.NS_DNS, "www.example.com", function( err, uuid ) {
  if( err ) {
    return console.log( err.toString() );
  }
  console.log( "md5    : " + uuid.toString() );
} );
uuid.generate( uuid.V_SHA1, uuid.NS_DNS, "www.example.com", function( err, uuid ) {
  if( err ) {
    return console.log( err.toString() );
  }
  console.log( "sha1   : " + uuid.toString() );
} );
