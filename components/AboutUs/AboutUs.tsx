import Image from 'next/image';
import styles from './AboutUs.module.css';

export const AboutUs = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.AboutUsContainer}`}>
        <div className={styles.textCard}>
          <h2 className={styles.title}>About us</h2>
          <p className={styles.description}>
            Harmoniq is a mindful publishing platform dedicated to mental health and well-being. We bring together writers, thinkers, and readers who believe that open, thoughtful stories can heal, inspire, and connect. Whether you&apos;re here to share your journey or learn from others &mdash; this is your space to slow down, reflect, and grow.
          </p>
        </div>
        
        <div className={`${styles.imageCard} ${styles.imageCardLotus}`}>
          <Image 
            src="/images/mobile_lotus2x.png"
            alt="Lotus flower" 
            fill 
            className={`${styles.image} ${styles.mobileImage}`}
            sizes="100vw"
          />
          <Image 
            src="/images/tablet_lotus2x.png"
            alt="Lotus flower" 
            fill 
            className={`${styles.image} ${styles.tabletImage}`}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
          <Image 
            src="/images/desktop_lotus2x.png"
            alt="Lotus flower" 
            fill 
            className={`${styles.image} ${styles.desktopImage}`}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>
        
        <div className={`${styles.imageCard} ${styles.imageCardPeople}`}>
          <Image 
            src="/images/mobile_people2x.png" 
            alt="People hugging outdoors" 
            fill 
            className={`${styles.image} ${styles.mobileImage}`}
            sizes="100vw"
          />
          <Image 
            src="/images/tablet_people2x.png" 
            alt="People hugging outdoors" 
            fill 
            className={`${styles.image} ${styles.tabletImage}`}
            sizes="(max-width: 767px) 100vw, 100vw"
          />
          <Image 
            src="/images/desktop_people2x.png" 
            alt="People hugging outdoors" 
            fill 
            className={`${styles.image} ${styles.desktopImage}`}
            sizes="66vw"
          />
        </div>
        
        <div className={`${styles.imageCard} ${styles.imageCardMeditate}`}>
          <Image 
            src="/images/desktop_meditating2x.png" 
            alt="Person meditating" 
            fill 
            className={styles.image}
            sizes="33vw"
          />
        </div>
      </div>
    </section>
  );
};
