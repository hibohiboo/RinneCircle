## テストについて

モックの DB と、モックの API を稼働させておく必要がある。

```
npm run pretest-start-rdb
```

```
npm run pretest-start-api
```

上記 2 つが稼働している状態で、テストを行うことができる。
テスト内容は workflow.yml に置いた。

```
npm run test
```

## 使用状況分析について

とりあえずユーザの利用状況分析はアップロード可にしている。
分析への協力を辞めたくなったら 1 にする。

https://docs.stepci.com/legal/privacy.html

## ライブラリ

| ライブラリ名      | 解説                                                                              | dev/prod |
| ----------------- | --------------------------------------------------------------------------------- | -------- |
| date-fns          | 日付操作ライブラリ。Moment/Day と異なり、独自の日付型は使わず既存の Date 型で処理 | prod     |
| @types/aws-lambda | AWS Lambda 関数の TypeScript 型定義。                                             | dev      |
| @types/node       | Node.js の TypeScript 型定義。                                                    | dev      |
| cross-env         | 環境変数をクロスプラットフォームで設定するためのユーティリティ。                  | dev      |
| stepci            | REST の単体テストツール                                                           | dev      |
| liquidless        | stepci 用のテンプレートエンジン                                                   | dev      |
| typescript        | JavaScript のスーパーセット                                                       | dev      |
| undici            | fetch の型定義のために使用。Node.js 用の HTTP/1.1 クライアント。                  | dev      |
