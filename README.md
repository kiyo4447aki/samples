# 📁 開発ポートフォリオ

本リポジトリは、これまでに開発したシステムの成果物の一部をまとめたポートフォリオです。  
バックエンド・フロントエンド・モバイルアプリ・組み込みなど、幅広く開発に携わっています。

---

## 📷 cam-system-admin（FastAPI, React）

**概要**：  
WebRTC Gateway [Janus](https://janus.conf.meetecho.com/) を用いた監視カメラシステムの管理ツール。  
実運用中で、接続状況の可視化やリアルタイム映像モニタリング機能を提供しています。

**主な機能**：

-   カメラの接続状態の表示（ルームごと / フィードごと）
-   映像の高画質リアルタイム視聴（WebRTC + SFU）
-   Janus Admin API / Plugin API を活用した制御機能

**構成：**

-   `be-affiliate`：バックエンド（FastAPI）
-   `fe-backend`：フロントエンド（React）

---

## 🔧 cam-v1（Next.js, FastAPI）

**概要**：  
監視カメラシステムの初期プロトタイプ。WebRTC による映像視聴・配信を簡易的に実装。実験段階ながら動作確認済み。

**構成：**

-   `camera_app`：視聴用 PWA（Next.js）
-   `camera_backend`：バックエンド（FastAPI）
-   `camera_recorder`：録画 / 検証機材制御スクリプト群

---

## 💼 affiliate（FastAPI, React）

**概要**：  
アフィリエイトサービス開発プロジェクト（現在は中断）。企画段階から設計・実装まで主導。営業的理由でリリースは中止。

**構成：**

-   `be-affiliate`：バックエンド（FastAPI）
-   `fe-backend`：フロントエンド（React）

※開発途中段階のコードです。認証・ユーザー管理機能などの基盤を実装済み。

---

## 🌱 growth_diary（React Native）

**概要**：  
現在開発中の成長記録アプリ。モバイルユーザー向けにライフログや育児記録を簡単に残せる UI/UX を設計中。

-   React Native によるクロスプラットフォーム開発
-   状態管理・フォーム構築・データ保存を軸にリファクタリング中

---

## ✈️ drone_arduino（C++ / Arduino）

**概要**：  
趣味で自作したドローンのフライトコントローラ実装。Arduino ベースで制御アルゴリズムを自作。

-   センサー値の取得と PID 制御の実装
-   基本的な姿勢安定化とスロットル制御機能

---

## 🛠 技術スタックと得意分野

| 分野           | 使用技術など                             |
| -------------- | ---------------------------------------- |
| フロントエンド | React, React Native, Next.js, TypeScript |
| バックエンド   | FastAPI, Python                          |
| モバイルアプリ | React Native, Expo                       |
| 映像・通信系   | WebRTC, Janus Gateway, GStreamer         |
| 組み込み／IoT  | Arduino, C++                             |
| インフラ／運用 | Docker, Nginx, GitHub Actions など       |

---

## 📌 備考

-   `cam-system-admin` は現在も実運用中のプロジェクトです。
-   ご質問やご確認いただきたい点がありましたら、ぜひお知らせください。
