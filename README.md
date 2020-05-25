# 收支記帳本
####兼具支出及收入的簡易記帳軟體
---
##功能
+ 使用者可以瀏覽所有支出及收入
+ 使用者可以刪除特定的支出及收入
+ 使用者可以編輯特定的支出及收入
+ 使用者可以篩選特定類別的支出及收入
+ 具備註冊功能，可供多人使用
+ 支援Facebook登錄
---
##配備需求
+ [Node.js](https://nodejs.org/en/)
+ [MongoDB](https://www.mongodb.com/)
---
## 安裝及設定
1. 建立資料夾
```
$ mkdir expense-tracker
```
2. 下載專案
```
$ git clone https://github.com/robert913152750/Money-manger.git
$ cd expense-tracker
```
3. 安裝相依套件
```
$ npm install
```
4. 建立種子資料
```
$ npm run seeder
```
1. 新增.env檔，並前往[facebooks for developers](https://developers.facebook.com/)獲取必要數據
```
//請自行至facebooks for developers創建專案
$ FACEBOOK_ID='創建的facebook開發專案id'
$ FACEBOOK_SECRET='創建的facebook開發專案secret'
$ FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

