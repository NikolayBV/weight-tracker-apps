FROM node:20

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN CI=true pnpm install --frozen-lockfile

WORKDIR /app/apps/nestjs-weight-tracker

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 3001

COPY apps/nestjs-weight-tracker/entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]