// PM2 ecosystem configuration for production deployment
module.exports = {
  apps: [{
    name: 'neet-prep',
    script: './dist/index.js',
    instances: process.env.PM2_INSTANCES || 'max', // Use all CPU cores
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5001
    },
    // Logging configuration
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Auto-restart configuration
    autorestart: true,
    max_memory_restart: '1G', // Restart if memory exceeds 1GB
    max_restarts: 10,
    min_uptime: '10s',
    
    // Performance optimizations
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'dist/public', '.git'],
    
    // Graceful shutdown
    listen_timeout: 10000,
    kill_timeout: 5000,
    wait_ready: true,
    shutdown_with_message: true,
    
    // Advanced features
    cron_restart: '0 3 * * *', // Restart daily at 3 AM for memory cleanup
    
    // Environment-specific settings
    env_production: {
      NODE_ENV: 'production',
      PORT: 5001
    },
    env_staging: {
      NODE_ENV: 'staging',
      PORT: 5002
    }
  }]
};
