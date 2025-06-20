#!/bin/sh
set -e

echo "📦 Applying pending migrations..."
pnpm exec prisma migrate deploy

echo "🚀 Starting application..."
exec pnpm start:prod