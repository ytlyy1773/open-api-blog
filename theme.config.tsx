import ProjectButton from "@/components/themeProject";
import SignButton from "@/components/themeSign";
import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const logo = (
  <>
    <div className="flex oai-icon">
      <style jsx>
        {`
          .oai-icon {
            mask-image: linear-gradient(
              60deg,
              black 25%,
              rgba(0, 0, 0, 0.2) 50%,
              black 75%
            );
            mask-size: 400%;
            mask-position: 0%;
            transition: mask-position 1s ease;
          }
          .oai-icon:hover {
            mask-position: 100%;
          }
        `}
      </style>
      <svg
        className="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
      >
        <path
          d="M777.6 602.666667a133.333333 133.333333 0 1 1-67.370667 248.426666 354.602667 354.602667 0 0 1-214.272 58.026667 356.010667 356.010667 0 0 1-108.778666-22.976l-9.365334-3.754667 24.576-59.093333c30.506667 12.693333 63.146667 20.138667 96.917334 21.909333a290.901333 290.901333 0 0 0 164.138666-40.277333 133.333333 133.333333 0 0 1 114.133334-202.24zM320.96 254.485333l34.709333 53.76a291.776 291.776 0 0 0-133.546666 230.4 293.397333 293.397333 0 0 0 4.010666 66.282667 133.333333 133.333333 0 1 1-59.669333 27.690667 355.733333 355.733333 0 0 1-8.234667-97.322667 355.712 355.712 0 0 1 156.117334-276.437333l6.613333-4.373334zM777.6 666.666667a69.333333 69.333333 0 1 0 0 138.666666 69.333333 69.333333 0 0 0 0-138.666666z m-526.933333 0a69.333333 69.333333 0 1 0 0 138.666666 69.333333 69.333333 0 0 0 0-138.666666zM514.133333 96a133.333333 133.333333 0 0 1 133.162667 126.634667 356.437333 356.437333 0 0 1 222.570667 333.781333l-0.149334 7.509333-63.957333-2.005333a292.48 292.48 0 0 0-171.264-275.178667A133.333333 133.333333 0 1 1 514.133333 96z m0 64a69.333333 69.333333 0 1 0 0 138.666667 69.333333 69.333333 0 0 0 0-138.666667z"
          fill="currentColor"
        />
      </svg>
      <span className="ml-2 max-sm:hidden">Open Api Interface</span>
    </div>
  </>
);

const config: DocsThemeConfig = {
  logo,
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();
    const socialCard =
      route === "/" || !title
        ? "https://nextra.site/og.jpeg"
        : `https://nextra.site/api/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="zh-CN" />
        <meta name="description" content="简单、开源、免费的 api 接口" />
        <meta name="og:title" content={title} />
        <meta name="og:image" content={socialCard} />
        <meta name="og:description" content="简单、开源、免费的 api 接口" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta
          name="google-site-verification"
          content="ldR2JWC_gLOds20kvD4ODpr9GzT5jUUQPnyWwE1dxIM"
        />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  search: {
    placeholder: `🔍  搜索文档`,
  },
  docsRepositoryBase: "https://github.com/ytlyy1773/open-api-blog/tree/master",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – 一条懒羊羊",
      };
    }
  },
  banner: {
    text: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        title="一条懒羊羊的博客"
        href="https://www.jwblog.cn/oneself/contactInformation.html#%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F"
      >
        <span>广告招租</span>
      </a>
    ),
  },
  project: {
    icon: () => <ProjectButton />,
    link: "https://github.com/ytlyy1773/open-api-blog",
  },
  chat: {
    icon: () => <SignButton />,
    link: "https://gitee.com/ytlyy1773/open-api-blog",
  },
  themeSwitch: {
    useOptions: {
      dark: "深色",
      light: "浅色",
      system: "自动",
    },
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  editLink: {
    text: "在 GitHub 上编辑→",
  },
  feedback: {
    content: "有问题？向我们提供反馈 →",
    labels: "feedback",
  },
  toc: {
    backToTop: true,
    title: <span>页面导航</span>,
  },
  nextThemes: {
    defaultTheme: "light",
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            title="一条懒羊羊的博客"
            href="https://www.jwblog.cn"
          >
            <img
              src="https://www.jwblog.cn/image/logo.svg"
              alt="一条懒羊羊的博客 logo"
            />
            <span>一条懒羊羊的博客</span>
          </a>
        </div>
        <p className="mt-6 text-xs">
          {new Date().getFullYear()}&nbsp;©&nbsp;
          <a href="https://beian.miit.gov.cn/" target="_blank">
            豫ICP备2023019165号-3
          </a>
        </p>
      </div>
    ),
  },
  gitTimestamp: (times) => {
    const timestampString = times.timestamp;
    // 解析输入字符串为 Date 对象
    const date = new Date(timestampString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const time = `最后更新于: ${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    return <span>{time}</span>;
  },
};

export default config;
