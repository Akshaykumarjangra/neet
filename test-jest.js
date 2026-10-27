const child_process = require('child_process');
try {
  child_process.execSync('npx jest --passWithNoTests --ci --coverage', { stdio: 'inherit' });
} catch (e) {
  console.log("Failed", e);
}
