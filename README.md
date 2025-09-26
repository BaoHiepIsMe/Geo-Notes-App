# Geo-Notes-App
Ứng dụng có thể ghi chú nơi bạn đến và hiển thị trên bản đồ
<img width="1903" height="902" alt="Screenshot 2025-09-26 094652" src="https://github.com/user-attachments/assets/a4144abc-be66-4c91-ab18-9494bd316255" />
<img width="1905" height="912" alt="Screenshot 2025-09-26 094641" src="https://github.com/user-attachments/assets/47203e7c-035c-4871-9e55-d3016b7987a6" />

Clone về bằng http hoặc zip
Giải nén và chạy các câu lệnh sau
# 1. Di chuyển vào thư mục dự án
cd geo-notes-app

# 2. Cài đặt các packages cần thiết (React, Leaflet, Capacitor Geolocation)
npm install @capacitor/core @capacitor/cli @capacitor/geolocation leaflet react-leaflet
npm install --save-dev @types/leaflet
npm install @capacitor/geolocation leaflet react-leaflet
npm install --save-dev @types/leaflet
# 4. Khởi tạo capacitor
npx cap init
# Nhập tên ứng dụng: GeoNotes
# Nhập Package ID: com.yourcompany.geonotes (Quan trọng: Phải là định dạng đảo ngược tên miền)

# 3 Bắt đầu chạy
# Build project Web
npm run build

# Đồng bộ sang Native (Cần thực hiện lại nếu bạn đã thêm nền tảng trước đó)
npx cap sync

# Mở IDE Native (để cấu hình quyền và chạy trên thiết bị)
npx cap open android
# hoặc npx cap open ios  

# hoặc chạy trên network
npm run dev -- --host

Nguyễn Đức Bảo Hiệp - 22SE084


dfa
