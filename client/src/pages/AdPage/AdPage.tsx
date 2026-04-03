import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ItemDetails} from "../../shared/types/ItemDetails.ts";
import {getAdById} from "../../shared/api/adApi.ts";

const AdPage = () => {
  const {id} = useParams<{ id: string }>()
  const [ad, setAd] = useState<ItemDetails | null>(null)

  useEffect(() => {
    if (!id) return;

    getAdById(Number(id) + 1).then((res) => {
      setAd(res.data)
      console.log(res.data)
    })
  }, [id]);

  if (!ad) return <div>Загрузка объявления...</div>;

  return (
    <div>
      <h2>{ad.title}</h2>
      <p>Категория: {ad.category}</p>
      <p>Цена: {ad.price}</p>
      <p>{ad.needsRevision ? "Требует доработки" : "Всё ок"}</p>
      <p>{new Date(ad.createdAt).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(' в', '')}</p>
      <p>{new Date(ad.updatedAt).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(' в', '')}</p>
      <ul>
        {Object.entries(ad.params).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong>: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdPage;