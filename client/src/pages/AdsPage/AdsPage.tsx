import {useEffect, useState} from "react";
import {getAds} from "../../shared/api/adsApi.ts";
import type {AdItem} from "../../shared/types/AdItem.ts";
import {Link} from "react-router-dom";

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
    <div>
      {ads.map((ad, index) => (
        <Link
          key={ad.title}
          to={`/ads/${index}`}
          style={{textDecoration: 'none', color: 'inherit'}}
        >
          <div
            style={{
              border: '1px solid #000',
              padding: '10px',
              marginBottom: '10px'
            }}
          >
            <h3>{ad.title}</h3>
            <p>{ad.category}</p>
            <span>{ad.price}</span>
            <p>{ad.needsRevision ? 'Требует доработок' : ''}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdsPage;