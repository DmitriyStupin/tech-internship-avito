import {useEffect, useState} from "react";
import {getAds} from "../../shared/api/adsApi.ts";
import type {AdItem} from "../../shared/types/AdItem.ts";
import {Link} from "react-router-dom";
import AdCard from "../../shared/ui/AdCard";
import styles from './AdsPage.module.scss'

import {
  Input,
  Button,
  Select,
  Checkbox,
  Pagination,
  Space,
  Divider,
  Switch,
  Collapse
} from "antd";
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import clsx from "clsx";

const { Option } = Select;

const AdsPage = () => {
  const [ads, setAds] = useState<AdItem[]>([])

  useEffect(() => {
    getAds().then((res) => {
      setAds(res.data.items)
    })
  }, []);

  if (!ads.length) {
    return <div>Загрузка объвлений...</div>
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className={clsx(styles.pageInner,'container')}>
        <div className={styles.pageTop}>
          <h1 className={styles.pageTitle}>Мои объявления</h1>
          <span className={styles.pageSubtitle}>{ads.length} объявлений</span>
        </div>
        <div className={styles.pageTopControls}>
          <Input
            placeholder="Найти объявление..."
            suffix={<SearchOutlined />}
            className={styles.pageTopControlsSearch}
          />
          <div className={styles.pageTopControlsRight}>
            <div className={styles.pageTopControlsButtons}>
              <Button icon={<AppstoreOutlined />} />
              <Button icon={<UnorderedListOutlined />} />
            </div>

            <Select defaultValue="nameAsc" className="sortSelect">
              <Option value="nameAsc">Название: А → Я</Option>
              <Option value="nameDesc">Название: Я → А</Option>
              <Option value="dateNew">Сначала новые</Option>
              <Option value="dateOld">Сначала старые</Option>
              <Option value="priceAsc">Цена: дешевые</Option>
              <Option value="priceDesc">Цена: дорогие</Option>
            </Select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div className={styles.pageFiltersColumn}>
            <div className={styles.pageFilters}>
              <h3 className={styles.pageFiltersTitle}>Фильтры</h3>
              <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                className={styles.pageFiltersCollapse}
                expandIconPlacement="end"
                items={[
                  {
                    key: '1',
                    label: 'Категории',
                    children: (
                      <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Checkbox value="auto">Авто</Checkbox>
                        <Checkbox value="realEstate">Недвижимость</Checkbox>
                        <Checkbox value="electronics">Электроника</Checkbox>
                      </Checkbox.Group>
                    ),
                  },
                ]}
              />
              <Divider style={{ margin: 0 }} />
              <Space align="center">
                <span>Только требующие доработок</span>
                <Switch />
              </Space>
            </div>
            <Button>Сбросить фильтры</Button>
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 200px))',
                columnGap: '9.75px',
                rowGap: '12px',
                justifyContent: 'start',
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

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Pagination total={ads.length} pageSize={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;