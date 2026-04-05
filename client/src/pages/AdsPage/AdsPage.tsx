import { useEffect } from "react";
import styles from "./AdsPage.module.scss";

import {
  Pagination,
} from "antd";
import clsx from "clsx";
import { useAdsStore } from "../../shared/store/adsStore.ts";
import AdsFilters from "../../shared/ui/AdsFilters";
import AdsControls from "../../shared/ui/AdsControls";
import AdsGrid from "../../shared/ui/AdsGrid";


const AdsPage = () => {
  const {
    ads,
    total,
    loading,
    searchQuery,
    selectedCategories,
    needsRevisionOnly,
    sortOption,
    currentPage,
    gridView,
    pageSize,
    fetchAds,
    setSearchQuery,
    setSelectedCategories,
    setNeedsRevisionOnly,
    setSortOption,
    setCurrentPage,
    setGridView,
  } = useAdsStore();

  useEffect(() => {
    fetchAds();
  }, [
    searchQuery,
    selectedCategories,
    needsRevisionOnly,
    sortOption,
    currentPage,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setNeedsRevisionOnly(false);
    setSortOption("nameAsc");
    setCurrentPage(1);
  };

  if (!ads.length) {
    return <div>Загрузка объвлений...</div>;
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div className={clsx(styles.pageInner, "container")}>
        <div className={styles.pageTop}>
          <h1 className={styles.pageTitle}>Мои объявления</h1>
          <span className={styles.pageSubtitle}>{total} объявлений</span>
        </div>

        <AdsControls
          gridView={gridView}
          sortOption={sortOption}
          searchQuery={searchQuery}
          onGridViewChange={setGridView}
          onSortChange={setSortOption}
          onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
        />

        <div style={{ display: "flex", gap: 24 }}>
          <AdsFilters
            selectedCategories={selectedCategories}
            needsRevisionOnly={needsRevisionOnly}
            onCategoriesChange={(val) => { setSelectedCategories(val); setCurrentPage(1); }}
            onNeedsRevisionOnlyChange={(val) => { setNeedsRevisionOnly(val); setCurrentPage(1); }}
            onReset={handleResetFilters}
          />
          <div style={{ flex: 1 }}>
            <AdsGrid ads={ads} loading={loading} gridView={gridView} />

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Pagination
                total={total}
                pageSize={pageSize}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsPage;
