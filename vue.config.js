module.exports = {
  transpileDependencies: [
    'vuetify', // Thay thế bằng tên dependencies nếu cần
  ],

  // Tạm thời vô hiệu hóa linting
  lintOnSave: false,

  pluginOptions: {
    vuetify: {
      // Thêm thông tin nếu bạn đang dùng Vuetify
    }
  },

  devServer: {
    port: 9090,
  }
};
