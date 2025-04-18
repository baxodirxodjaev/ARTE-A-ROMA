import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import styles from "./HeroSection.module.css";
import { useHomePage } from "../services/dataBaseSecvice";
import fallbackImage from '../../public/hero section.jpg'
import Spinner from "./Spinner";

const HeroSection = () => {
  const { data: homepage, isLoading: isLoadingHome, error: errorHome } = useHomePage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);


  if (isLoadingHome) return <Spinner/>;
  if (errorHome) return <div>Error loading data</div>;
  if (!homepage || homepage.length < 4) return <div>No data found</div>;

  const { homeTitle, homePoster, homeDescription } = homepage[2];

  return (
    <section className={`${styles["hero-section"]}  ${loaded ? styles.loaded : ""}`}>
        <div className="absolute top-0 z-20 mx-auto w-full container">
            <Header />
            
        </div>
      <img
        src={homePoster || fallbackImage}
        alt={homeTitle || "Default title"}
        className={styles["hero-image"]}
      />
      <div className={`${styles["hero-content"]} mt-[60px] sm:mt-0`}>
        <h1 className={`${styles["hero-title"]} titles`}>{homeTitle}</h1>
        <p className={styles["hero-text"]}>{homeDescription}</p>
        <Link to="/product" className={`${styles["hero-button"]} animate-pulse `}>
          Reservations
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
