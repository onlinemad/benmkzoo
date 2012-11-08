var exec = require('child_process').exec,
	fs = require('fs'), 
	util = require('util');

var child;

exports.option = {};

exports.build = function(){
	var option = exports.option;

	util.log('Building ' + option.suite);
	
	// Make temp folder
	var tmpDir = 'tmp/' + option.suiteDir;
	exec('rm -r ' + tmpDir);
	exec('mkdir ' + tmpDir);

	// Make distribution folder
	var distDir = 'lib/' + option.suiteDir;
	exec('rm -r ' + distDir);
	exec('mkdir ' + distDir);

	// Init build env
	var suiteDir = option.suiteDir;
	var repo = option.repo + ' '+ tmpDir + suiteDir;
	var testDir = option.testDir;
	var workdir = tmpDir + suiteDir + testDir;

	// Get SunSpider source
	child = exec('svn checkout ' + repo , function (error, stdout, stderr) {
		console.log('Fetch ' + option.suite + ' source.');
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});

	child.on('close', function(){

		var files = fs.readFileSync(workdir + 'LIST', 'utf-8').split("\n");
		var outputJs = '';
		for (var i = 0; i < files.length; i++) {
			if(files[i] != ''){
				// Read file
				var js = fs.readFileSync(workdir + files[i] + '.js', 'utf-8');
				var jsRun = fs.readFileSync(workdir + files[i] + option.suffix + '.js', 'utf-8');

				var fn = files[i].replace(/-/g,'_').replace('3', 'three_');

				var output = '';
				// Combine
				switch(option.suite){
					case 'kraken':
						output = 'function ' + fn + '(){' + jsRun + js + '}\n' +
								 'exports.' + fn + ' = { name: \'' + option.suite + '.' + fn + '\', fn: ' + fn + ' }';
					break;
					default:
						output = 'function ' + fn + '(){' + js + jsRun + '}\n' +
								 'exports.' + fn + ' = { name: \'' + option.suite + '.' + fn + '\', fn: ' + fn + ' }';
				}
				
				fs.writeFile( distDir + files[i] + '.js' , output, 'utf-8', function (err) {
					if (err) throw err;
				});

				// Build index
				outputJs += 'exports.' + fn + ' = require(\'./' + files[i] + '\').' + fn + '\n';
			}
		}

		fs.writeFile( distDir + option.suite + '.js' , outputJs, 'utf-8', function (err) {
			if (err) throw err;
		});
	});
}
