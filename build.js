var fs = require('fs');

var suites = ['sunspider', 'kraken'];


for(var i=0; i<suites.length; i++){
	require('./build.'+ suites[i]);
}

var benmkzoo = 'var ';
for(var i=0; i<suites.length; i++){
	benmkzoo+= suites[i] + ' = require(\'./' + suites[i] + '/' + suites[i] + '\'),';
}
benmkzoo = benmkzoo.slice(0, benmkzoo.length-1);

benmkzoo += ';\n';

for(var i=0; i<suites.length; i++){
	benmkzoo += 'exports.' + suites[i] + ' = ' + suites[i] + ';\n';
}

fs.writeFile('lib/benmkzoo.js' , benmkzoo, 'utf-8');