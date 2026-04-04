import {Card, Tag} from "antd";
import placeholder from '../../../assets/placeholder.png'
import type {AdItem} from "../../types/AdItem.ts";

type AdCardProps = AdItem

const AdCard = (props: AdCardProps) => {
  const {
    category,
    title,
    price,
    needsRevision
  } = props

  return (
    <Card
      style={{ width: 200 }}
      cover={
        <img
          draggable={false}
          alt="placeholder"
          src={placeholder}
          style={{
            borderRadius: '0 0 8px 8px',
          }}
        />
      }
    >
      <h3>{title}</h3>
      <p>{price}</p>
      <Tag>{category}</Tag>
      {needsRevision && (
        <span>Требует доработок</span>
      )}
    </Card>
  );
};

export default AdCard;