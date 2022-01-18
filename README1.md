# Quanlysach

# Thiết kế Website quản lý sách cho một cửa hàng

# Cách cài đặt
  * Cài đặt vscode
  * Cài đặt git https://git-scm.com/downloads
  * Cài đặt mongodb https://www.mongodb.com/try/download/enterprise?fbclid=IwAR3-NpwhKmBd0KIgAdGTplaP619G0pnV1JTZx-86r4Ocz_-3hkTpWHcsMyA
    * Sau khi cài đặt xong, vào ổ C, tạo folder data, trong folder data tạo folder mongo
    * Vào folder C:\Program Files\MongoDB\Server\5.0\bin và open with vscode
    * Chuột phải, open with terminal và nhập mongod
    * Chuột phải, open with terminal nhập các dòng lệnh sau
       * use account
       * db.createCollection('account')
       * db.account.insert({"username":"admin","password":"admin"})
  * Mở vscode, terminal, new terminal và nhập dòng lệnh
    * git clone https://github.com/quThinh/QuanLySach.git
  * Sau đó open folder test vừa mới clone về
  * Chuột phải vào ./app.js và ./views/form/app.js và thực hiện 2 câu lệnh
    * npm install
  
# Cách sử dụng
  * Open in terminal file app.js tương ứng với trang quản lý/trang chủ và chạy câu lệnh npm start
  * Mở đường link http://localhost:3000/ để vào trang chủ cửa hàng
  * Mở đường link http://localhost:8080/ để vào trang chủ quản lý
  * Tài khoản và mật khẩu của quản lý mặc định sẽ là admin/admin

# Chức năng
  * Nhập thông tin sản phẩm từ trang quản lý, trang chủ quản lý sách sẽ tự động phun dữ liệu trong cơ sở dữ liệu lên 
