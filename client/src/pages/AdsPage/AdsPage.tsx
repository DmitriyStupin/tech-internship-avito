import {useEffect} from "react";
import {Link} from "react-router-dom";
import AdCard from "../../shared/ui/AdCard";
import styles from './AdsPage.module.scss'

import {
  Button,
  Checkbox,
  Collapse,
  Divider,
  Input,
  Pagination,
  Select,
  Space,
  Switch
} from "antd";
import {
  AppstoreOutlined,
  SearchOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import clsx from "clsx";
import {useAdsStore} from "../../shared/store/adsStore.ts";

const {Option} = Select;

const AdsPage = () => {
  const {
    ads, total, loading, searchQuery, selectedCategories,
    needsRevisionOnly, sortOption, currentPage, gridView, pageSize,
    fetchAds,
    setSearchQuery, setSelectedCategories, setNeedsRevisionOnly,
    setSortOption, setCurrentPage, setGridView
  } = useAdsStore();

  useEffect(() => {
    fetchAds();
  }, [searchQuery, selectedCategories, needsRevisionOnly, sortOption, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setNeedsRevisionOnly(false);
    setSortOption("nameAsc");
    setCurrentPage(1);
  };

  if (!ads.length) {
    return <div>Загрузка объвлений...</div>
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className={clsx(styles.pageInner, 'container')}>
        <div className={styles.pageTop}>
          <h1 className={styles.pageTitle}>Мои объявления</h1>
          <span className={styles.pageSubtitle}>{total} объявлений</span>
        </div>

        <div className={styles.pageTopControls}>
          <Input
            placeholder="Найти объявление..."
            suffix={<SearchOutlined />}
            className={styles.pageTopControlsSearch}
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
          <div className={styles.pageTopControlsRight}>
            <div className={styles.pageTopControlsButtons}>
              <Button
                icon={<AppstoreOutlined />}
                type={gridView ? "primary" : "default"}
                onClick={() => setGridView(true)}
              />
              <Button
                icon={<UnorderedListOutlined />}
                type={!gridView ? "primary" : "default"}
                onClick={() => setGridView(false)}
              />
            </div>

            <Select value={sortOption} onChange={val => setSortOption(val)} className="sortSelect">
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
          {/* Фильтры */}
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
                      <Checkbox.Group
                        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                        value={selectedCategories}
                        onChange={val => { setSelectedCategories(val as string[]); setCurrentPage(1); }}
                      >
                        <Checkbox value="auto">Авто</Checkbox>
                        <Checkbox value="real_estate">Недвижимость</Checkbox>
                        <Checkbox value="electronics">Электроника</Checkbox>
                      </Checkbox.Group>
                    ),
                  },
                ]}
              />
              <Divider style={{ margin: 0 }} />
              <Space align="center">
                <span>Только требующие доработок</span>
                <Switch
                  checked={needsRevisionOnly}
                  onChange={val => { setNeedsRevisionOnly(val); setCurrentPage(1); }}
                />
              </Space>
            </div>
            <Button onClick={handleResetFilters} style={{ marginTop: 12 }}>Сбросить фильтры</Button>
          </div>

          {/* Список объявлений */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: gridView ? 'repeat(5, minmax(0, 200px))' : '1fr',
                columnGap: '9.75px',
                rowGap: '12px',
                justifyContent: 'start',
              }}
            >
              {loading ? (
                <div>Загрузка объявлений...</div>
              ) : (
                ads.map((ad, index) => (
                  <Link
                    key={ad.title + index}
                    to={`/ads/${index + 1}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <AdCard {...ad} />
                  </Link>
                ))
              )}
            </div>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Pagination
                total={total}
                pageSize={pageSize}
                current={currentPage}
                onChange={page => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;