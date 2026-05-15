import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Mock function representing our CORS configuration
function checkCors(origin: string | undefined): boolean {
    const allowedOrigins = [
      "https://neet.zeroai.org.in",
      "http://localhost:5173",
      "http://localhost:5001"
    ];

    if (!origin || allowedOrigins.some(o => origin === o || origin.startsWith("http://localhost:")) || origin.endsWith(".zeroai.org.in")) {
        return true;
    } else {
        return false;
    }
}

describe('CORS Configuration', () => {
  it('should allow valid main origin', () => {
    assert.equal(checkCors('https://neet.zeroai.org.in'), true);
  });

  it('should allow valid localhost origin', () => {
    assert.equal(checkCors('http://localhost:5173'), true);
    assert.equal(checkCors('http://localhost:3000'), true);
  });

  it('should allow dynamically generated subdomain origin', () => {
    assert.equal(checkCors('https://c0kwkk0gcggog0gc04oggkwg.zeroai.org.in'), true);
    assert.equal(checkCors('https://another-subdomain.zeroai.org.in'), true);
  });

  it('should disallow unknown origins completely', () => {
    assert.equal(checkCors('https://badorigin.com'), false);
    assert.equal(checkCors('https://neet.zeroai.org.in.baddomain.com'), false);
  });

  it('should allow no origin (undefined)', () => {
    assert.equal(checkCors(undefined), true);
  });
});
