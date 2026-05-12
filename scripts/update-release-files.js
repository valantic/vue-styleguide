import path from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const version = process.env.npm_package_version;

if (!version) {
  throw new Error('npm_package_version is not set. Run this script via npm version lifecycle.');
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Update CHANGELOG.md
const changelogPath = path.resolve(root, 'CHANGELOG.md');
let changelog = readFileSync(changelogPath, 'utf8');

changelog = changelog.replaceAll('## unreleased', `## v${version}`);

const titleEnd = changelog.indexOf('\n') + 1;

changelog = changelog.slice(0, titleEnd) + '\n## unreleased\n' + changelog.slice(titleEnd);

writeFileSync(changelogPath, changelog);

// Update README.md
const readmePath = path.resolve(root, 'README.md');
let readme = readFileSync(readmePath, 'utf8');

readme = readme.replaceAll(/#v[\d.]+/g, `#v${version}`);

writeFileSync(readmePath, readme);

process.stdout.write(`Updated CHANGELOG.md and README.md to v${version}\n`);
