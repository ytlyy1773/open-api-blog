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
    path: "",
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
    return config
  }
})
