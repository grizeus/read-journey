const Footer = () => {
  return (
    <footer className="border-waterloo/10 mt-auto w-full border-t">
      <div className="xs:min-w-80 mx-auto flex max-w-360 items-center px-10 py-6 md:px-29.5 lg:px-32">
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
