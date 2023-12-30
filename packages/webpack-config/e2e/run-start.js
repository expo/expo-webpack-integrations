const spawnAsync = require('@expo/spawn-async');
const arg = require('arg');
const assert = require('assert');
const path = require('path');

const options = arg({
  '--project': String,
});

async function main(args) {
  const { '--project': projectPath } = options;
  assert(projectPath, `--project is required`);
  const projectRoot = path.resolve(projectPath);

  // Ensure project is installed
  await spawnAsync('yarn', ['install', '--frozen-lockfile'], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  // Start the project using `expo start --web`
  const spawn = spawnAsync('yarn', ['expo', 'start', '--web', '--https'], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  // When the process is asked to close, Expo exists with status `1`
  // Prevent the process from failing due to this
  spawn.catch(error => console.log('Expo exited with status:', error.status));

  // Close the `expo start web` process when this script needs to shut down
  process.on('SIGINT', () => spawn.child.kill('SIGINT'));
  process.on('SIGTERM', () => spawn.child.kill('SIGTERM'));
}

if (require.main === module) {
  main();
}
