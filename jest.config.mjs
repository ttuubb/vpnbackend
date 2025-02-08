// jest.config.mjs
export default {
  transform: {
    "^.+\\.mjs$": "babel-jest"  // 让 Jest 支持 .mjs 文件
  },
  testRegex: "(__tests__/.*|.*)\\.test\\.mjs$",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "mjs"], // 支持的文件扩展名
};
// jest.config.mjs

  
