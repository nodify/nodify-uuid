nodify-uuid
===========

RFC4122 Compliant UUIDs for node & HTML5 browsers w/ "real" entropy & hash functions

# Introduction

* Generates hash-based and random RFC 4122 Compliant UUIDs
* Actually generates MD5 & SHA1 UUIDs correctly
* Uses strong crypto and "real" entropy if available. if not, fails safe
* Works in Node.JS & HTML5 browsers

# API

To generate a Random UUID, do the following:

* include the nodify-uuid package
* call the .generate() method specifying the V_RANDOM version and a callback

Example:
<pre>    var uuid = require( 'node-uuid' );
    uuid.generate( uuid.V_RANDOM, function( err, u ) {
      console.log( (err?err:u).toString() );
    }</pre>

To generate a MD5 or SHA1 name-based UUID, do the following:

* include the nodify-uuid package
* call the .generate() method specifying the V_MD5 (or V_SHA1) type, the namespace UUID, the name and a callback

Example:
<pre>    var uuid = require( 'node-uuid' );
    uuid.generate( uuid.V_MD5. uuid.NS_DNS, "github.com", uuid.function( err, u ) {
      console.log( (err?err:u).toString() );
    }</pre>