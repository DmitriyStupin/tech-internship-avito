import {Link} from "react-router-dom";
import AdCard from "../AdCard";

type Props = {
  ads: any[],
  loading: boolean,
  gridView: boolean,
};

const AdsGrid = ({ads, loading, gridView}: Props) => {
  if (loading) return <div>Загрузка объявлений...</div>;
  if (!ads.length) return <div>Объявлений нет</div>;

  return (
    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: gridView ? "repeat(5, minmax(0, 200px))" : "1fr",
        columnGap: "9.75px",
        rowGap: "12px",
        justifyContent: "start",
      }}
    >
      {ads.map((ad, index) => (
        <Link
          key={ad.title + index}
          to={`/ads/${ad.id}`}
          style={{textDecoration: "none", color: "inherit"}}
        >
          <AdCard {...ad} />
        </Link>
      ))}
    </div>
  );
};

export default AdsGrid;