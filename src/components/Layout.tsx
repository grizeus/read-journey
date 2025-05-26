import { Outlet } from "react-router";
import Header from "./Header";
import Section from "./Section";
import Container from "./Container";
import Footer from "./Footer";
import { useShouldRender } from "../hooks/useShouldRender";

const Layout = () => {
  const shouldRenderHeader = useShouldRender([
    "/recommended",
    "/library",
    /^\/reading\/[^/]+$/,
  ]);

  return (
    <div className="flex min-h-dvh flex-col">
      {shouldRenderHeader && <Header />}
      <main className="min-w-84 grow">
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
