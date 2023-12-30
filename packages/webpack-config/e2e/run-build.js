const spawnAsync = require('@expo/spawn-async');
const arg = require('arg');
const assert = require('assert');
const path = require('path');

const options = arg({
  '--project': String,
  '--port': Number,
  '--build': Boolean,
});

async function main() {
  const { '--project': projectPath, '--port': port, '--build': build } = options;

  assert(projectPath, `--project is required`);
  assert(port, `--port is required`);

  const projectRoot = path.resolve(projectPath);
  const exportDir = path.join(projectRoot, 'web-build');

  if (build) {
    console.log('Building', projectRoot);

    // Ensure project is installed
    await spawnAsync('yarn', ['install', '--frozen-lockfile'], {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    // Build the project using `expo export:web`
    await spawnAsync('yarn', ['expo', 'export:web'], { cwd: projectRoot, stdio: 'inherit' });
  }

  // Serve the project through `serve`
  const spawn = spawnAsync('npx', ['serve', exportDir, `--listen=${port}`], {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  // Close the `serve` process when this script needs to shut down
  process.on('SIGINT', () => spawn.child.kill('SIGINT'));
  process.on('SIGTERM', () => spawn.child.kill('SIGTERM'));
}

if (require.main === module) {
  main();
}
