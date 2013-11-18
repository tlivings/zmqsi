'use strict';

var cluster = require('cluster'),
    http = require('http');

if (cluster.isMaster) {
    for (var i = 1; i < 8; i++) {
        cluster.fork();
    }
}
else {
    var server = http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('Result: ' + listPrimes(9999));
    });

    server.listen(3001, function () {
        console.log('Started worker.');
    });
}

function listPrimes( nPrimes ) {
    var primes = [];
    for( var n = 2;  nPrimes > 0;  n++ ) {
        if( isPrime(n) ) {
            primes.push( n );
            --nPrimes;
        }
    }
    return primes;
}

function isPrime( n ) {
    var max = Math.sqrt(n);
    for( var i = 2;  i <= max;  i++ ) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}