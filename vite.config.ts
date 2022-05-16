import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        AntDesignVueResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  server: {
    strictPort: true, // * 固定端口(如果端口被占用则中止)
    host: true, // 0.0.0.0
    port: 3920, // 指定启动端口
  },
});
