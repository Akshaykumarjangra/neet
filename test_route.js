import { spawn } from 'child_process';
import fetch from 'node-fetch';

const server = spawn('npm', ['run', 'dev'], { stdio: 'pipe' });

let started = false;
server.stdout.on('data', async (data) => {
  if (data.toString().includes('listening on') && !started) {
    started = true;
    console.log("Server started, testing route...");
    try {
      // Need a valid session or it'll fail auth. Let's just do a health check first
      const res = await fetch('http://localhost:5000/api/chat/health');
      console.log(res.status);
      console.log(await res.text());

      // We can't easily test /api/chat/threads because it needs auth.
      server.kill();
      process.exit(0);
    } catch(e) {
      console.error(e);
      server.kill();
      process.exit(1);
    }
  }
});
