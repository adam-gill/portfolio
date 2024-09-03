import MouseFollower from "../MouseFollower"
import Header from "../Header";
import About from "../About";
import TechStack from "../TechStack";
import Projects from "../Projects";
import Resume from "../Resume";
import Footer from "../Footer";
import "../../App.css";



export default function Main() {
  return (
    <main>
      <MouseFollower />
      <Header />
      <About />
      <TechStack />
      <Projects />
      <Resume />
      <Footer />
    </main>
  );
}
