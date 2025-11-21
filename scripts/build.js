#!/usr/bin/env node

// Suppress punycode deprecation warnings
process.env.NODE_OPTIONS = '--no-deprecation';

// Import and run Next.js build
const { spawn } = require('child_process');

// Use 'next' command directly - npm scripts handle PATH correctly
const buildProcess = spawn('next', ['build'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--no-deprecation'
  }
});

buildProcess.on('close', (code) => {
  process.exit(code || 0);
});

buildProcess.on('error', (error) => {
  console.error('Error running build:', error);
  process.exit(1);
});

