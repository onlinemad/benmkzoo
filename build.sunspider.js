var build = require('./build.common');
	
build.option = {
	suite: 'sunspider',
	suiteDir: 'sunspider/',
	testDir: 'tests/sunspider-0.9.1/',
	repo: 'http://sunspider-mod.googlecode.com/svn/trunk/',
	suffix: '-run'
}

build.build();