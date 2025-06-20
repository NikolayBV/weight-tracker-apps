FROM node:18

WORKDIR /app

COPY . .

RUN npm i -g pnpm
RUN CI=true pnpm install --frozen-lockfile

WORKDIR /app/apps/next-weight-tracker
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]