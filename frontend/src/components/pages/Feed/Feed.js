import React from 'react';

import styles from './Feed.module.css';

import Pets from './Pets';

const Home = () => {
  const [infinite, setInfinite] = React.useState(true);
  const [pages, setPages] = React.useState([1]);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite && !wait) {
        const scroll = window.scrollY;
        const heightPage = document.body.offsetHeight - window.innerHeight;

        if (scroll >= heightPage) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;

          setTimeout(() => (wait = false), 400);
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {pages.map((page) => (
          <Pets key={page} page={page} setInfinite={setInfinite} />
        ))}
      </div>
      {!infinite && <p className={styles.noPetsAvailable}>Não há mais pets disponíveis para adoção</p>}
    </section>
  );
};

export default Home;
