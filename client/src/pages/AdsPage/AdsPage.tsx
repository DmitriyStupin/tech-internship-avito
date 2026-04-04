import {useEffect, useState} from "react";
import {getAds} from "../../shared/api/adsApi.ts";
import type {AdItem} from "../../shared/types/AdItem.ts";
import {Link} from "react-router-dom";
import AdCard from "../../shared/ui/AdCard";
import styles from './AdsPage.module.scss'

const AdsPage = () => {
  const [ads, setAds] = useState<AdItem[]>([])

  useEffect(() => {
    getAds().then((res) => {
      console.log(res.data)
      setAds(res.data.items)
    })
  }, []);

  if (!ads.length) {
    return <div>Загрузка объвлений...</div>
  }

  return (
    <div className={'container'}>
      <div className={styles.pageTop}>
        <h1 className={styles.pageTitle}>Мои объявления</h1>
        <span className={styles.pageSubtitle}>{ads.length} объявлений</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
        }}
      >
        {ads.map((ad, index) => (
          <Link
            key={ad.title}
            to={`/ads/${index + 1}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <AdCard {...ad} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdsPage;