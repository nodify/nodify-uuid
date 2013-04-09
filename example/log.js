// Copyright (c) 2013 Smithee, Spelvin, Agnew & Plinge, Inc. All Rights Reserved
// See https://raw.github.com/nodify/nodify-logger/master/LICENSE for license.

( function () {
  function Log( id ) {
    this.el = document.getElementById( id );
    this.content = "";
  }

  Log.prototype.post = function ( message ) {
    this.content += message + "\n";
    this.el.innerHTML = this.content;
  };

  if( window ) {
    window._$Log = Log;
  }
} ) ();