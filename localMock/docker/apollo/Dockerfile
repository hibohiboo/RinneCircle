FROM node:18

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

COPY package*.json ./
RUN npm ci --quiet
COPY tsconfig.json /app/tsconfig.json


CMD ["npm", "run", "dev" ]