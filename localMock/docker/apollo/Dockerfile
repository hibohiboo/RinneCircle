FROM node:18

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
RUN npm i

CMD ["npm", "run", "dev" ]