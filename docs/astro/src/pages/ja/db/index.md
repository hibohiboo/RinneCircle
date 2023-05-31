---
title: RinneCircle 開発室 DB設計
description: Docs intro
layout: ../../layouts/MainLayout.astro
---

# DB 設計

## 基本方針

- nvarchar(n) の n について
  - uuid が-を含めると 36 文字。特に理由がなければ、きりよく`nvarchar(64)`をデフォルトとする。
  - なお、text と nvarchar の使い分けに明確なメリットはない。[Let's POSTGRES - 文字列型の使い分け](https://lets.postgresql.jp/documents/technical/text-processing/1)

## データベース

環境として[Hasura](https://cloud.hasura.io/login?redirect_url=%2F) + [Neon](https://neon.tech/)を使用する。
エンジンは Postgers。

## テーブル

### RinneUser ユーザ

id は firebase auth の uid を基本的に使用。28 文字。

### RinneScenario シナリオ

path は S3 へのパス。「ユーザ ID+作成日+シナリオ ID」 `${ユーザID}/scenario/${yyyy}/${mm}/${dd}/${シナリオID}`

### RinneSession セッション ※未作成

### RinnePlayerCharacter キャラクター ※未作成

### RinneScenarioLimitTag シナリオ制限タグ ※未作成

シナリオの参加条件をタグで表現

### RinneScenarioSearchTag シナリオ検索タグ ※未作成

### RinnePlayerCharacterTag プレイヤーキャラクタータグ ※未作成

### Tag タグ ※未作成

制限や検索のためのタグ

### RinneSessionLog セッションログ ※未作成

プレイヤーの発言ログなど

### ScenarioRequire シナリオ要望 ※未作成

選択肢を追加してほしいなどの要望

## ER 図

<pre class="mermaid">
erDiagram
    RinneUser {
        id varchar(64)  PK "Not Null ... firebase auth uid"
        name varchar(64)  "Not Null"
        createdAt timestamp  "Not Null DEFAULT CURRENT_TIMESTAMP"
        updatedAt timestamp  "Not Null"
        imageUrl text   
        twitterAccount text
    }
    RinneScenario {
        id varchar(64)  PK "Not Null ... uuid"
        authorId varchar(64)     "Not Null ... firebase auth uid"
        title text   "Not Null"
        path text  "Not Null ... シナリオ置き場のパス"
        published boolean  "Not Null Default false"
        updatedAt timestamp  "Not Null"
        imageUrl text   
    }
    RinneUser ||--o{ RinneScenario : has
    RinneSession {
        id varchar(64)  PK "Not Null ... uuid"
        scenarioId varchar(64) "Not Null ... uuid|シナリオID"
        createdAt timestamp  "Not Null DEFAULT CURRENT_TIMESTAMP"
        gameMasterId varchar(64)   "Not Null ... firebase auth uid"
        gameMasterName text
    }
    RinneScenario o|--o{ RinneSession : has
    RinnePlayerCharacter {
        id varchar(64)  PK "Not Null ... uuid"
        name text "Not Null"
        createdAt timestamp  "Not Null DEFAULT CURRENT_TIMESTAMP"
        updatedAt timestamp  "Not Null"
        detail jsonb "Not Null"
    }
    RinneUser ||--o{ RinnePlayerCharacter : has

    RinneSessionPCs {
        sessionId varchar(64)  PK "Not Null ... uuid| セッションID"
        pcId varchar(64)  PK "Not Null ... uuid| プレイヤーキャラクターID"
    }
    RinneSession  ||--o{ RinneSessionPCs : join
    RinnePlayerCharacter  ||--o{ RinneSessionPCs : join
    Tag {
        name text PK
    }
    RinneScenario o|--o{ RinneScenarioLimitTag: has
    Tag ||--o{ RinneScenarioLimitTag: is
    RinnePlayerCharacter o|--o{ RinnePlayerCharacterTag: has
    RinnePlayerCharacterTag }o--|| Tag: is
    RinneSession  ||--o{ RinneSessionLog : has
    RinneScenario ||--o{ ScenarioRequire: has

</pre>
