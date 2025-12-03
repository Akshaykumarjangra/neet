# NEET Prep - Production Deployment Guide

## Prerequisites

- Node.js 20+ 
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- PM2 (for process management)

## Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables:**
   ```bash
   # Generate a strong session secret
   openssl rand -base64 32
   
   # Edit .env with your values
   nano .env
   ```

3. **Required environment variables:**
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: Strong random secret (use openssl command above)
   - `PORT`: Server port (default: 5001)
   - `NODE_ENV`: Set to `production`

## Database Setup

1. **Create PostgreSQL database:**
   ```bash
   createdb neet_prep
   ```

2. **Run migrations:**
   ```bash
   npm run db:push
   ```

## Deployment Options

### Option 1: Docker Compose (Recommended)

1. **Set environment variables:**
   ```bash
   export DB_PASSWORD="your-secure-password"
   export SESSION_SECRET="your-session-secret"
   ```

2. **Start services:**
   ```bash
   docker-compose up -d
   ```

3. **View logs:**
   ```bash
   docker-compose logs -f app
   ```

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Option 2: PM2 Process Manager

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.cjs
   ```

4. **Useful PM2 commands:**
   ```bash
   pm2 status              # Check status
   pm2 logs neet-prep      # View logs
   pm2 restart neet-prep   # Restart app
   pm2 stop neet-prep      # Stop app
   pm2 delete neet-prep    # Remove from PM2
   ```

5. **Setup PM2 startup:**
   ```bash
   pm2 startup
   pm2 save
   ```

### Option 3: Manual Production Start

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   NODE_ENV=production npm start
   ```

## Nginx Reverse Proxy (Recommended)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Node.js app
    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket support
    location /ws {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400;
    }
}
```

## Health Checks

The application exposes a health check endpoint:

```bash
curl http://localhost:5001/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

## Monitoring

### Application Logs

**PM2:**
```bash
pm2 logs neet-prep
```

**Docker:**
```bash
docker-compose logs -f app
```

### Database Monitoring

```bash
# Check active connections
psql -U neet_user -d neet_prep -c "SELECT count(*) FROM pg_stat_activity;"

# Check database size
psql -U neet_user -d neet_prep -c "SELECT pg_size_pretty(pg_database_size('neet_prep'));"
```

## Backup Strategy

### Database Backup

```bash
# Create backup
pg_dump -U neet_user neet_prep > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
psql -U neet_user neet_prep < backup_20240101_120000.sql
```

### Automated Backups (Cron)

```bash
# Add to crontab (crontab -e)
0 2 * * * pg_dump -U neet_user neet_prep > /backups/neet_prep_$(date +\%Y\%m\%d).sql
```

## Security Checklist

- [ ] Strong `SESSION_SECRET` configured
- [ ] Database credentials secured
- [ ] HTTPS enabled (SSL/TLS certificates)
- [ ] Firewall configured (only ports 80, 443 open)
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers enabled (Helmet)
- [ ] Regular security updates (`npm audit`)
- [ ] Database backups automated
- [ ] Non-root user for application
- [ ] Environment variables not committed to git

## Performance Optimization

1. **Enable compression** (already configured)
2. **Use CDN** for static assets
3. **Database indexing** (check slow queries)
4. **Connection pooling** (already configured)
5. **Caching strategy** (Redis recommended for sessions)

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -ti:5001

# Kill process
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check PostgreSQL status
systemctl status postgresql

# Check connection
psql -U neet_user -d neet_prep -c "SELECT 1;"
```

### Memory Issues
```bash
# Check memory usage
pm2 monit

# Increase memory limit in ecosystem.config.cjs
max_memory_restart: '2G'
```

## Scaling

### Horizontal Scaling

1. Use PM2 cluster mode (already configured)
2. Load balancer (Nginx, HAProxy)
3. Separate database server
4. Redis for session storage (shared across instances)

### Vertical Scaling

1. Increase server resources (CPU, RAM)
2. Optimize database queries
3. Add database read replicas

## Support

For issues or questions:
- Check logs: `pm2 logs` or `docker-compose logs`
- Health check: `curl http://localhost:5001/api/health`
- Database status: Check PostgreSQL logs

## Updates

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Restart
pm2 restart neet-prep
# or
docker-compose up -d --build
```
