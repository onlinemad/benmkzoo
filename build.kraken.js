var build = require('./build.common');
	
build.option = {
	suite: 'kraken',
	suiteDir: 'kraken/',
	testDir: 'kraken/tests/kraken-1.1/',
	repo: 'http://kraken-mirror.googlecode.com/svn/trunk/',
	suffix: '-data'
}

build.build();