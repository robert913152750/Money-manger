# 收支記帳本

#### 兼具支出及收入的簡易記帳軟體 [(點擊使用)](https://polar-peak-36824.herokuapp.com/users/login)

---

## 線上版測試帳號

- 使用測試帳號登錄或是自行創建帳戶

```
帳號: 123@example.com
密碼: 123456
```

---

## 功能

- 使用者可以瀏覽所有支出及收入
- 使用者可以刪除特定的支出及收入
- 使用者可以編輯特定的支出及收入
- 使用者可以篩選日期
- 使用者可以篩選特定類別的支出及收入
- 具備註冊功能，可供多人使用
- 支援 Facebook 登錄

---

## 配備需求

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

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

5. 新增.env 檔，並前往[facebooks for developers](https://developers.facebook.com/)獲取必要數據

```
//請自行至facebooks for developers創建專案
$ FACEBOOK_ID='創建的facebook開發專案id'
$ FACEBOOK_SECRET='創建的facebook開發專案secret'
$ FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

6. 執行專案

```
$ node app.js
// 出現以下訊息即開啟成功
// App is running
// mongodb connected!
```

7. 使用測試帳號登錄或是自行創建帳戶

```
帳號: 123@example.com
密碼: 123
```

## 介面預覽

- 登入介面
  ![login](https://github.com/robert913152750/Money-manger/blob/master/imageForGithub/login.png)
- 首頁介面
  ![index](https://github.com/robert913152750/Money-manger/blob/master/imageForGithub/index.png)
- 選擇頁面
  ![choose](https://github.com/robert913152750/Money-manger/blob/master/imageForGithub/choose.png)
- 編輯介面
  ![edit](https://github.com/robert913152750/Money-manger/blob/master/imageForGithub/edit.png)
