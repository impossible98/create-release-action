const fs = require('fs');
const readline = require('readline');
const childProcess = require('child_process');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Please input the tag: ', tag => {
	fs.writeFileSync('VERSION', tag + '\n')
	childProcess.execSync('npm run dist');
	childProcess.execSync('git add --all');
	childProcess.execSync('git commit -m "fix: update tag v' + tag + '"');
	childProcess.execSync('git tag v' + tag);
	childProcess.execSync('git push --set-upstream origin v' + tag);
	console.log('All has been done.');
	rl.close()
});
