import { Button, Checkbox, Collapse, Divider, Space, Switch } from "antd";
import styles from "./AdsFilters.module.scss";

interface AdsFiltersProps {
  selectedCategories: string[];
  needsRevisionOnly: boolean;
  onCategoriesChange: (val: string[]) => void;
  onNeedsRevisionOnlyChange: (val: boolean) => void;
  onReset: () => void;
}

const { Panel } = Collapse;

const AdsFilters = ({
                      selectedCategories,
                      needsRevisionOnly,
                      onCategoriesChange,
                      onNeedsRevisionOnlyChange,
                      onReset,
                    }: AdsFiltersProps) => {
  return (
    <div className={styles.pageFiltersColumn}>
      <div className={styles.pageFilters}>
        <h3 className={styles.pageFiltersTitle}>Фильтры</h3>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          className={styles.pageFiltersCollapse}
          expandIconPlacement="end"
        >
          <Panel header="Категории" key="1">
            <Checkbox.Group
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
              value={selectedCategories}
              onChange={(val) => onCategoriesChange(val as string[])}
            >
              <Checkbox value="auto">Авто</Checkbox>
              <Checkbox value="real_estate">Недвижимость</Checkbox>
              <Checkbox value="electronics">Электроника</Checkbox>
            </Checkbox.Group>
          </Panel>
        </Collapse>
        <Divider style={{ margin: 0 }} />
        <Space align="center">
          <span>Только требующие доработок</span>
          <Switch checked={needsRevisionOnly} onChange={onNeedsRevisionOnlyChange} />
        </Space>
      </div>
      <Button onClick={onReset} style={{ marginTop: 12 }}>
        Сбросить фильтры
      </Button>
    </div>
  );
};

export default AdsFilters;