// file này để xử lý riêng cho stores/config.js để tạo 1 dynamic variable cấu hình cho cái ip trong các API
// nó cũng tương tự như public/config.json thôi 
// nhưng để xử lý riêng cho pinia thì ko dùng dc API_BASE_URL trong public/config.json nên phải làm như này
export const config = {
    API_BASE_URL: 'http://172.20.10.4:5000',
  };
  