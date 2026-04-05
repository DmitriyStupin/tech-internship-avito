import { Tag } from "antd";
import placeholder from '../../../assets/placeholder.png';
import type { AdItem } from "../../types/AdItem.ts";
import styles from './AdCard.module.scss';
import clsx from "clsx";

type AdCardProps = AdItem;

const AdCard = (props: AdCardProps) => {
  const { category, title, price, needsRevision } = props;

  const categoryNames = {
    auto: 'Авто',
    real_estate: 'Недвижимость',
    electronics: 'Электроника'
  }

  return (
    <div className={clsx(styles.card)}>
      <img
        alt="placeholder"
        src={placeholder}
        className={styles.cardImage}
      />
      <div className={styles.cardBottom}>
        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle} title={title}>{title}</h3>
          <p className={styles.cardPrice}>{price} ₽</p>
        </div>
        <Tag className={styles.cardTag}>{categoryNames[category]}</Tag>
        {needsRevision && (
          <div className={styles.cardNeedsRevision}>
            <span className={styles.dot}></span>
            Требует доработок
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCard;