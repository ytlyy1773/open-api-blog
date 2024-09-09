## 开源接口

提供简单、开源、免费的 api 接口

供广大开发者学习使用

## 技术架构

- 前端使用 [nextjs](https://nextjs.org/) 开发

- 后端使用 [nestjs](https://nestjs.com/) 开发

## 网站链接

- 🚗&nbsp;&nbsp;[官网](https://www.openapijs.com/)

- 🚗&nbsp;&nbsp;[国际官网访问](https://openapijs.vercel.app/)

## 源码链接

- 🔰&nbsp;&nbsp;[github 仓库地址](https://github.com/ytlyy1773/open-api-blog.git)

- 🔰&nbsp;&nbsp;[gitee 仓库地址](https://gitee.com/ytlyy1773/open-api-blog.git)

## 系统要求

- **Node.js 18.18** 或更高版本。

## 运行

> 国内建议使用 `npm` 淘宝镜像地址下载

```bash
pnpm i

pnpm dev
```

## 说明

### 多 DevOps 构建问题

- 私有服务器

- vercel

两个不同平台构建出来需要不同 `robots.txt` 和 `sitemap.xml` 文件

自己平台可以控制打包构建的，但是 vercel 就不行了

### 如何解决 vercel 打包和服务器打包不冲突

因为多个域名 public 文件夹下没有 `robots.txt` 和 `sitemap.xml` 文件，需要动态生成

**添加 build:vercel 打包命令**

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build && next-sitemap",
    "build:vercel": "next build && next-sitemap && next build",
    "start": "next start",
    "build:map": "next-sitemap"
  },
```

- 第一次执行 `next build` 保证 `next-sitemap` 可以正常执行

- 执行 `next-sitemap` 可以根据 vercel 配置的**环境变量域名**动态生成 `robots.txt` 和 `sitemap.xml` 文件

- 第二次执行 `next build`，此时 `next-sitemap` 已经帮我们在 public 文件夹下生成了所需要的 `robots.txt` 和 `sitemap.xml` 文件。构建成功就可以正常访问 `robots.txt` 和 `sitemap.xml` 文件了

## 赞助

<div style="display: flex; justify-content: space-between;">
    <img src="./public/images/wechat.png" alt="微信赞助" width="300" height="450" />
    <img src="./public/images/zhifubao.png" alt="支付宝赞助" width="300" height="450" />
</div>
