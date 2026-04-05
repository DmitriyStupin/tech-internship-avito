import {Button, Input, Select} from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import styles from "./AdsControls.module.scss";

const {Option} = Select;

interface AdsControlsProps {
  gridView: boolean;
  sortOption: string;
  searchQuery: string;
  onGridViewChange: (val: boolean) => void;
  onSortChange: (val: string) => void;
  onSearchChange: (val: string) => void;
}

const AdsControls = ({
                       gridView,
                       sortOption,
                       searchQuery,
                       onGridViewChange,
                       onSortChange,
                       onSearchChange,
                     }: AdsControlsProps) => {
  return (
    <div className={styles.pageTopControls}>
      <Input
        placeholder="Найти объявление..."
        suffix={<SearchOutlined />}
        className={styles.pageTopControlsSearch}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className={styles.pageTopControlsRight}>
        <div className={styles.pageTopControlsButtons}>
          <Button
            icon={<AppstoreOutlined />}
            type={gridView ? "primary" : "default"}
            onClick={() => onGridViewChange(true)}
          />
          <Button
            icon={<UnorderedListOutlined />}
            type={!gridView ? "primary" : "default"}
            onClick={() => onGridViewChange(false)}
          />
        </div>

        <Select
          value={sortOption}
          onChange={onSortChange}
          className="sortSelect"
        >
          <Option value="nameAsc">Название: А → Я</Option>
          <Option value="nameDesc">Название: Я → А</Option>
          <Option value="dateNew">Сначала новые</Option>
          <Option value="dateOld">Сначала старые</Option>
          <Option value="priceAsc">Цена: дешевые</Option>
          <Option value="priceDesc">Цена: дорогие</Option>
        </Select>
      </div>
    </div>
  );
};

export default AdsControls;