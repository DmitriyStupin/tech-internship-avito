import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ItemDetails } from "../../shared/types/ItemDetails.ts";
import { getAdById } from "../../shared/api/adApi.ts";
import { Alert, Button, Divider, Image } from "antd";
import { EditOutlined } from "@ant-design/icons";
import placeholder from "../../assets/placeholder.png";
import styles from "./AdPage.module.scss";
import clsx from "clsx";
import { ArrowLeftOutlined } from "@ant-design/icons";

const AdPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<ItemDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getAdById(Number(id)).then((res) => setAd(res.data));
  }, [id]);

  if (!ad) return <div>Загрузка объявления...</div>;

  const requiredFieldsMap: Record<string, string[]> = {
    auto: [
      "brand",
      "model",
      "yearOfManufacture",
      "transmission",
      "mileage",
      "enginePower",
    ],
    real_estate: ["type", "address", "area", "floor"],
    electronics: ["type", "brand", "model", "condition", "color"],
  };

  const requiredFields = requiredFieldsMap[ad.category] || [];

  const emptyFields: string[] = [];

  if (!ad.description) {
    emptyFields.push("Описание");
  }

  requiredFields.forEach((field) => {
    const value = ad.params[field as keyof typeof ad.params];

    if (value === undefined || value === null || value === "") {
      emptyFields.push(field);
    }
  });

  const photos = Array(5).fill(placeholder);

  const fieldNames: Record<string, string> = {
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег",
    enginePower: "Мощность двигателя",
    type: "Тип",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
    condition: "Состояние",
    color: "Цвет",
  };

  const fieldKeyNames: Record<string, string> = {
    automatic: "Автоматическая",
    manual: "Механическая",
    phone: "Мобильный телефон",
    laptop: "Ноутбук",
    misc: "Разное",
    new: "Новое",
    used: "Б/У",
    flat: "Квартира",
    house: "Дом",
    room: "Комната",
  };

  return (
    <div className={styles.page}>
      <div className={clsx(styles.pageInner, "container")}>
        <Button
          type="link" // или "default", "text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/ads")} // Возврат на -1 страницу в истории
          style={{ margin: 0, padding: 0, alignSelf: "flex-start" }}
        >
          Назад
        </Button>
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderLeft}>
            <h1 className={styles.pageHeaderLeftTitle}>{ad.title}</h1>
            <Link to={`/ads/${id}/edit`}>
              <Button type="primary" icon={<EditOutlined />}>
                Редактировать
              </Button>
            </Link>
          </div>
          <div className={styles.pageHeaderRight}>
            <div className={styles.pageHeaderRightPrice}>{ad.price} ₽</div>
            <div className={styles.pageHeaderRightDates}>
              <div>
                Опубликовано:{" "}
                {new Date(ad.createdAt)
                  .toLocaleString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(" в", "")}
              </div>
              {ad.updatedAt && (
                <div>
                  Отредактировано:{" "}
                  {new Date(ad.updatedAt)
                    .toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(" в", "")}
                </div>
              )}
            </div>
          </div>
        </div>
        <Divider style={{ margin: 0 }} />
        <div className={styles.pageDetails}>
          <div className={styles.pageDetailsImages}>
            <Image.PreviewGroup>
              <Image
                src={photos[0]}
                alt="Главное фото"
                width={480}
                style={{ marginBottom: 12 }}
              />
              <div className={styles.pageDetailsImagesRow}>
                {photos.slice(1).map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", marginRight: 8 }}
                  />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>

          <div className={styles.pageDetailsInfo}>
            {emptyFields.length > 0 && (
              <Alert
                title="Требуются доработки"
                description={
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div>У объявления не заполнены поля:</div>
                    <ul style={{ margin: 0, paddingLeft: "16px" }}>
                      {emptyFields.map((field) => (
                        <li key={field}>{fieldNames[field] || field}</li>
                      ))}
                    </ul>
                  </div>
                }
                type="warning"
                showIcon
                className={styles.pageDetailsInfoPanel}
              />
            )}

            <div className={styles.pageDetailsInfoParams}>
              <h3 className={styles.pageDetailsInfoParamsTitle}>
                Характеристики
              </h3>
              <ul className={styles.pageDetailsInfoParamsList}>
                {Object.entries(ad.params)
                  .filter(([, v]) => v !== undefined && v !== null && v !== "")
                  .map(([key, value]) => (
                    <li className={styles.pageDetailsInfoParamsRow} key={key}>
                      <span className={styles.pageDetailsInfoParamsKey}>
                        {fieldNames[key] || key}
                      </span>
                      <span className={styles.pageDetailsInfoParamsValue}>
                        {fieldKeyNames[value] || value}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.pageDescription}>
          <h3 className={styles.pageDescriptionTitle}>Описание</h3>
          <p className={styles.pageDescriptionText}>
            {ad.description || "Отсутствует"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdPage;
