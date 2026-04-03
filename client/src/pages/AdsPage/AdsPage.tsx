import {useEffect, useState} from "react";
import {getAds} from "../../shared/api/adsApi.ts";
import type {AdItem} from "../../shared/types/AdItem.ts";

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
      {ads.map((ad) => (
        <div key={ad.title} style={{border: '1px solid #000'}}>
          <h3>{ad.title}</h3>
          <p>{ad.category}</p>
          <span>{ad.price}</span>
          <p>{ad.needsRevision}</p>
        </div>
      ))}
    </div>
  );
};

export default AdsPage;