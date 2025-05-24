const Footer = () => {
  return (
    <footer className="px-5 pt-2.5 md:pt-4 pb-2 md:pb-4 lg:px-8">
      <div className="bg-charcoal-black flex min-w-84 items-center justify-between rounded-2xl px-5 py-3 md:px-4 md:py-4">
        <span className="text-base">
          &copy; 2025{" "}
          <a
            href="https://github.com/grizeus"
            target="_blank"
            rel="noopener noreferrer">
            grizeus
          </a>{" "}
          &mdash; designed by{" "}
          <a
            href="https://goit.global/ua/"
            target="_blank"
            rel="noopener noreferrer">
            GoIT
          </a>{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
