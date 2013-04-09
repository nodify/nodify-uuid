// Copyright (c) 2013 Smithee, Spelvin, Agnew & Plinge, Inc. All Rights Reserved
// See https://raw.github.com/nodify/nodify-logger/master/LICENSE for license.

( function () {
  var _getRandomValues, _md5, _sha1;

  var _$UUID = {
    V_NULL: 0,
    V_TIME: 1,
    V_MD5: 3,
    V_RANDOM: 4,
    V_SHA1: 5,
    nil: new UUID( 0, new Uint8Array( 16 ) ),
    NS_DNS: new UUID( 1, new Uint8Array( [0x6b,0xa7,0xb8,0x10,0x9d,0xad,0x11,0xd1,0x80,0xb4,0x00,0xc0,0x4f,0xd4,0x30,0xc8] ) ),
    NS_URL: new UUID( 1, new Uint8Array( [0x6b,0xa7,0xb8,0x11,0x9d,0xad,0x11,0xd1,0x80,0xb4,0x00,0xc0,0x4f,0xd4,0x30,0xc8] ) ),
    NS_OID: new UUID( 1, new Uint8Array( [0x6b,0xa7,0xb8,0x12,0x9d,0xad,0x11,0xd1,0x80,0xb4,0x00,0xc0,0x4f,0xd4,0x30,0xc8] ) ),
    NS_X500: new UUID( 1, new Uint8Array( [0x6b,0xa7,0xb8,0x14,0x9d,0xad,0x11,0xd1,0x80,0xb4,0x00,0xc0,0x4f,0xd4,0x30,0xc8] ) ),
    registerAlgo: function( name, _f ) {
      switch( name ) {
      case 'random':
        _getRandomValues = _f;
        break;
      case 'md5':
        _md5 = _f;
        break;
      case 'sha1':
        _sha1 = _f;
        break;
      };
    },
    generate: function( type, namespace, data, callback ) {
      if( ( 'undefined' == typeof data ) && ( 'function' == typeof namespace ) ) {
        callback = namespace;
      }

      function _md5_or_sha1( _f ) {
        return _f( [ namespace.buffer, data ], function( err, buf ) {
          if( err ) {
            callback && callback( err );
            return;
          }
          callback && callback( null, new UUID( type, buf ) );
        } );
      }

      switch( type ) {
      case _$UUID.V_NULL:
        callback && callback( null, _$UUID.nil );
        break;
      case _$UUID.V_MD5:
        _md5_or_sha1( _md5 )
        break;
      case _$UUID.V_RANDOM:
        _getRandomValues( new Uint8Array( 16 ) , function( buf ) {
          callback && callback( null, new UUID( type, buf ) );
        } );
        break;
      case _$UUID.V_SHA1:
        _md5_or_sha1( _sha1 )
        break;
      default:
        callback && callback( new Error( "Unsupported UUID Version" ) );
        break;
      }
    }
  };

  function UUID( type, buffer ) {
    this.type = type;
    this.buffer = buffer.subarray(0,16);
    if( 0 !== this.type ) {
      this.buffer[ 6 ] = ( this.buffer[ 6 ] & 0x0F ) | ( (this.type << 4) & 0xF0 );
      this.buffer[ 8 ] = ( this.buffer[ 8 ] & 0x3F ) | 0x80;
    }
  }

  UUID.prototype.toString = function () {
    var output = "";
    for( var i = 0, il = this.buffer.length; i < il; i++ ) {
      output += _pad( this.buffer[i].toString(16) );
      if( ( 3 == i ) || ( 5 == i ) || ( 7 == i ) || ( 9 == i ) ) {
        output += "-";
      }
    }
    return( output );

    function _pad( string ) {
      if( string.length == 1 ) {
        return "0" + string;
      } else {
        return string;
      }
    }
  }

  UUID.prototype.toURN = function () {
    return "urn:uuid:" + this.toString();
  };

  try {
    module.exports = _$UUID;
    var nodecrypto = require( 'crypto' );
    _getRandomValues = function( buffer, callback ) {
      nodecrypto.randomBytes( buffer.length, function( ex, randomish ) {
        for( var i = 0, il = buffer.length; i < il; i++ ) {
          buffer[ i ] = randomish[ i ];
        }
        callback && callback( buffer );
      } );
    };
    function _hash( algo ) {
      return function( buffers, callback ) {
        var hash = nodecrypto.createHash( algo );
        for( var i = 0, il = buffers.length; i < il; i++ ) {
          hash.update( new Buffer( buffers[i] ) );
        }
        callback && callback( null, new Uint8Array( hash.digest() ) );
      };
    };
    _sha1 = _hash( 'sha1' );
    _md5 = _hash( 'md5' );
  } catch( e ) {
    if( "ReferenceError" !== e.name ) {
      throw e;
    }
  }

  try {
    window._$UUID = _$UUID;
    _sha1 = _md5 = function( buffers, callback ) {
      callback && callback( new Error( "Function Not Implemented" ), null );
    };
    if( window.crypto && window.crypto.getRandomValues ) {
      _getRandomValues = function( buffer, callback ) {
        crypto.getRandomValues( buffer );
        callback && callback( buffer );
      };
    } else {
      _getRandomValues = _md5;
    }
  } catch( e ) {
    if( "ReferenceError" !== e.name ) {
      alert( e.toString() );
      throw e;
    }
  }

} ) ();