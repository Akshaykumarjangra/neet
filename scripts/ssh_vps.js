import { Client } from 'ssh2';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const conn = new Client();

const host = process.env.VPS_IP;
const username = process.env.VPS_USER || 'root';
const password = process.env.VPS_PASSWORD;

if (!host || !password) {
  console.error('Error: Please configure VPS_IP and VPS_PASSWORD in your .env file.');
  process.exit(1);
}

const command = process.argv.slice(2).join(' ');
if (!command) {
  console.log('Usage: node scripts/ssh_vps.js "<command>"');
  console.log('Example: node scripts/ssh_vps.js "uname -a"');
  process.exit(0);
}

console.log(`Connecting to ${username}@${host}...`);

conn.on('ready', () => {
  console.log('SSH connection established successfully.\n');
  console.log(`Running remote command: "${command}"\n`);
  
  conn.exec(command, (err, stream) => {
    if (err) {
      console.error('Execution error:', err);
      conn.end();
      process.exit(1);
    }
    
    stream.on('close', (code, signal) => {
      console.log(`\nConnection closed. Exit code: ${code}`);
      conn.end();
      process.exit(code);
    }).on('data', (data) => {
      process.stdout.write(data);
    }).stderr.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}).on('error', (err) => {
  console.error('\nSSH connection failed:', err.message);
  process.exit(1);
}).connect({
  host,
  port: 22,
  username,
  password,
  readyTimeout: 10000
});
