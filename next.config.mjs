import nextra from 'nextra'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

export default withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  // 自定义优化打包image、处理打包报错问题
  images: {
    loader: 'imgix',
    domains: ['openapijs.vercel.app', 'openapijs.com', 'jwblog.cn'],
    path: "",
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: 'export', // 导出静态资源文件
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/

    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    fileLoaderRule.exclude = allowedSvgRegex

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    })
    // 打包分析
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: './analyze/bundle-report.html',
        openAnalyzer: false,
      })
    );
    // 代码分割
    config.optimization.splitChunks = {
      chunks: 'all', // 对所有 chunk 进行分割
      minSize: 20000, // 分割出来的 chunk 最小大小为 20KB
      maxSize: 70000,
      minChunks: 1,
      cacheGroups: {
        vendor: { // 一个模块至少被引用一次就会被提取到公共 chunk 中
          test: /[\\/]node_modules[\\/]/, // 创建了一个名为 vendors 的缓存组，用于提取所有 node_modules 中的模块
          name: 'vendors',
          chunks: 'all'
        }
      }
    };
    return config
  }
})
