import fetch from 'node-fetch';

async function testChatHealth() {
    const url = 'http://localhost:5001/api/chapters/chat/health';
    console.log(`Testing health at ${url}...`);
    try {
        const res = await fetch(url);
        console.log(`Status: ${res.status}`);
        const data = await res.json();
        console.log('Data:', data);
    } catch (err) {
        console.error('Error:', err);
    }
}

testChatHealth();
