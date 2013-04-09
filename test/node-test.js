// Copyright (c) 2013 Smithee, Spelvin, Agnew & Plinge, Inc. All Rights Reserved
// See https://raw.github.com/nodify/nodify-logger/master/LICENSE for license.

var uuid = require( '../nodify-uuid' );
var assert = require( 'assert' );

assert.equal( uuid.nil.toString(), '00000000-0000-0000-0000-000000000000', 'Nil UUID should be "00000000-0000-0000-0000-000000000000"' );
assert.equal( uuid.NS_DNS.toString(), '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'DNS Namespace UUID should be "6ba7b810-9dad-11d1-80b4-00c04fd430c8"' );
assert.equal( uuid.NS_URL.toString(), '6ba7b811-9dad-11d1-80b4-00c04fd430c8', 'URL Namespace UUID should be "6ba7b811-9dad-11d1-80b4-00c04fd430c8"' );
assert.equal( uuid.NS_OID.toString(), '6ba7b812-9dad-11d1-80b4-00c04fd430c8', 'OID Namespace UUID should be "6ba7b812-9dad-11d1-80b4-00c04fd430c8"' );
assert.equal( uuid.NS_X500.toString(), '6ba7b814-9dad-11d1-80b4-00c04fd430c8', 'X500 Namespace UUID should be "6ba7b814-9dad-11d1-80b4-00c04fd430c8"' );

_md5();

function _md5 () {
  uuid.generate( uuid.V_MD5, uuid.NS_DNS, "www.widgets.com", function(err, u) {
    err && assert.fail( "", "", err.toString(), "" );
    assert.equal( u.toString(), '3d813cbb-47fb-32ba-91df-831e1593ac29', 'MD5 Test UUID should be "3d813cbb-47fb-32ba-91df-831e1593ac29"' );
    _sha1();
  } );
}

function _sha1 () {
  uuid.generate( uuid.V_SHA1, uuid.NS_DNS, "www.widgets.com", function(err, u) {
    err && assert.fail( "", "", err.toString(), "" );
    assert.equal( u.toString(), '21f7f8de-8051-5b89-8680-0195ef798b6a', 'SHA1 Test UUID should be "21f7f8de-8051-5b89-8680-0195ef798b6a"' );
    _random();
  } );
}

function _random() {
  uuid.generate( uuid.V_RANDOM, function (err, uuid ) {
    err && assert.fail( "", "", err.toString(), "" );
  } );
}
