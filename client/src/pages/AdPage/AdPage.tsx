import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {AdItem} from "../../shared/types/AdItem.ts";
import {getAds} from "../../shared/api/adsApi.ts";

const AdPage = () => {
  const { id } = useParams<{ id: string }>()
  const [ad, setAd] = useState<AdItem | null>(null)

  useEffect(() => {
    getAds().then((res) => {
      const index = Number(id)
      setAd(res.data.items[index])
    })
  }, [id]);

  if (!ad) return <div>Загрузка объявления...</div>;

  return (
    <div>
      <h2>{ad.title}</h2>
      <p>Категория: {ad.category}</p>
      <p>Цена: {ad.price}</p>
      <p>{ad.needsRevision ? "Требует доработки" : "Всё ок"}</p>
    </div>
  );
};

export default AdPage;