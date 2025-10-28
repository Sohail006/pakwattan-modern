#!/bin/bash

# SharkASP.net Deployment Script for PakWattanModern
echo "🚀 Starting SharkASP.net deployment process..."

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Build the application
echo "🔨 Building application for production..."
npm run build

# Step 3: Create deployment package
echo "📁 Creating deployment package..."
mkdir -p sharkasp-deployment

# Copy essential files
cp -r .next sharkasp-deployment/
cp -r public sharkasp-deployment/
cp package.json sharkasp-deployment/
cp package-lock.json sharkasp-deployment/
cp server.js sharkasp-deployment/
cp ecosystem.config.js sharkasp-deployment/
cp next.config.js sharkasp-deployment/

# Create .htaccess file
cat > sharkasp-deployment/.htaccess << 'EOF'
RewriteEngine On

# Handle Next.js routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Security headers
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
EOF

# Create production environment file
cat > sharkasp-deployment/.env.production << 'EOF'
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://www.sharkasp.net/api
NEXT_PUBLIC_SITE_URL=https://www.sharkasp.net
NEXT_PUBLIC_APP_NAME=Pak Wattan School & College of Sciences
EOF

echo "✅ Deployment package created in 'sharkasp-deployment' folder"
echo "📋 Next steps:"
echo "1. Upload the 'sharkasp-deployment' folder contents to your SharkASP.net server"
echo "2. Configure Node.js application in control panel"
echo "3. Set startup file to 'server.js'"
echo "4. Test your deployment"
