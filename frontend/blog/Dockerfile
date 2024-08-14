# 构建阶段
FROM node:21-alpine as builder

RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

# 运行阶段
FROM node:21-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g serve

EXPOSE 10000

CMD ["serve", "-s", "dist", "-l", "10000"]