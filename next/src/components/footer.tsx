const Footer = () => {
  const menu = [
    { name: "Term of Service", link: "https://twitter.com/id/tos" },
    { name: "Privacy Policy", link: "https://twitter.com/id/privacy" },
    {
      name: "Cookie Policy",
      link: "https://help.twitter.com/id/rules-and-policies/twitter-cookies",
    },
    {
      name: "Accessibility",
      link: "https://help.twitter.com/id/resources/accessibility",
    },
    {
      name: "Ads Info",
      link: "https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo",
    },
  ];
  return (
    <div className="h-40 px-5 font-medium">
      {menu.map((m, i) => (
        <a
          key={i}
          className="mr-3 text-sm text-skin-accent hover:underline"
          href={m.link}
          target="_blank"
        >
          {m.name}
        </a>
      ))}
      <button className="mr-3 text-sm text-skin-accent cursor-pointer hover:underline">
        More...
      </button>
      <span className="text-sm text-skin-accent whitespace-nowrap">
        &copy; {new Date().getFullYear()} X Corp
      </span>
    </div>
  );
};

export default Footer;
