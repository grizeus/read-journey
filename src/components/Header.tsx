import Navbar from "./NavBar";
import UserBar from "./UserBar";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="px-5 pt-5 pb-2.5 md:pb-4 lg:px-8 lg:pt-8">
      <div className="bg-charcoal-black flex min-w-84 items-center justify-between rounded-2xl px-5 py-3 md:px-4 md:py-4">
        <Logo/>
        <Navbar outerClass="hidden md:block" />
        <UserBar />
      </div>
    </header>
  );
};

export default Header;
