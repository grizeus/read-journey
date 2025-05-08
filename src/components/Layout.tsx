import { Outlet } from "react-router";
import Header from "./Header";
import Section from "./Section";
import Container from "./Container";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="grow">
        <Section>
          <Container>
            <Outlet />
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
