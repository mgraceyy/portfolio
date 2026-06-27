import { useTheme } from './hooks/useTheme';
import { skills } from './data/skills';
import { Navbar } from './components/Navbar/Navbar';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { Marquee } from './components/Marquee/Marquee';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { SkillsAndExperience } from './components/SkillsAndExperience/SkillsAndExperience';
import { Projects } from './components/Projects/Projects';
import { Education } from './components/Education/Education';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import styles from './App.module.css';

const MARQUEE_ITEMS = skills
  .filter((g) => g.category !== 'Soft Skills')
  .flatMap((g) => g.items);

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.app}>
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={styles.main}>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <About />
        <SkillsAndExperience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;