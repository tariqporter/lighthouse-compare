const spawnSync = require('child_process').spawnSync;
const lighthouseCli = require.resolve('lighthouse/lighthouse-cli');
const { computeMedianRun } = require('lighthouse/lighthouse-core/lib/median-run.js');

const url1 = 'http://2746.uat.policygenius.cloud';
const url2 = 'http://2748.uat.policygenius.cloud';
const runs = 3;

const results1 = [],
  results2 = [];
for (let i = 0; i < runs; i++) {
  console.log(`Running Lighthouse attempt #${i + 1}...`);
  const result1 = spawnSync('node', [lighthouseCli, url1, '--output=json']);
  if (result1.status !== 0) {
    console.log('Lighthouse failed, skipping run...');
  } else {
    results1.push(JSON.parse(result1.stdout));
  }

  const result2 = spawnSync('node', [lighthouseCli, url2, '--output=json']);
  if (result2.status !== 0) {
    console.log('Lighthouse failed, skipping run...');
  } else {
    results2.push(JSON.parse(result2.stdout));
  }
}

const median1 = computeMedianRun(results1);
const median2 = computeMedianRun(results2);
console.log('url1:', median1.categories.performance.score * 100, 'url2:', median2.categories.performance.score * 100);
