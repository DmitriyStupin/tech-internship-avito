import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import {
  BulbOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import styles from "./EditAdPage.module.scss";
import clsx from "clsx";
import { type JSX, useEffect, useRef, useState } from "react";
import { getAdById } from "../../shared/api/adApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { updateAdById } from "../../shared/api/adApiEdit.ts";
import { paramsFieldsConfig } from "../../shared/config/paramsFields.ts";
import { generateDescription, generatePrice } from "../../shared/api/aiApi.ts";

const { Title } = Typography;
const { TextArea } = Input;

const EditAdPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const isInitialLoad = useRef(true);
  const storageKey = `edit-ad-${id}`;
  const params = Form.useWatch("params", form);

  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [aiDescriptionLoading, setAiDescriptionLoading] = useState(false);

  const [aiPrice, setAiPrice] = useState<string | null>(null);
  const [aiPriceLoading, setAiPriceLoading] = useState(false);

  const [descriptionButtonState, setDescriptionButtonState] = useState<{
    text: string;
    icon: JSX.Element;
  }>({
    text: form.getFieldValue("description")
      ? "Улучшить описание"
      : "Придумать описание",
    icon: <BulbOutlined />,
  });

  const [priceButtonState, setPriceButtonState] = useState<{
    text: string;
    icon: JSX.Element;
  }>({
    text: "Узнать рыночную цену",
    icon: <BulbOutlined />,
  });

  const category = Form.useWatch<"electronics" | "auto" | "real_estate">(
    "category",
    form,
  );

  const isFormValid =
    form.getFieldValue("category") &&
    form.getFieldValue("title") &&
    form.getFieldValue("price") &&
    !form.getFieldsError().some((f) => f.errors.length > 0);

  useEffect(() => {
    if (!id) return;

    const savedAd = localStorage.getItem(storageKey);

    if (savedAd) {
      form.setFieldsValue(JSON.parse(savedAd));
      notification.success({
        title: "Черновик загружен",
        placement: "topRight",
      });
      return;
    }

    getAdById(Number(id))
      .then((res) => {
        const item = res.data;

        form.setFieldsValue({
          category: item.category,
          title: item.title,
          description: item.description,
          price: item.price ? Number(item.price) : undefined,
          params: item.params,
        });
      })
      .catch(() => {
        notification.error({
          title: "Ошибка загрузки объявления",
          description: "Попробуйте ещё раз",
          placement: "topRight",
        });
      });
  }, [id, form]);

  const onFinish = (values: any) => {
    if (!id) return;

    updateAdById(Number(id), values)
      .then(() => {
        localStorage.removeItem(storageKey);
        notification.success({
          title: "Изменения сохранены",
          placement: "topRight",
        });
        navigate(`/ads/${id}`);
      })
      .catch(() => {
        notification.error({
          title: "Ошибка сохранения",
          description:
            "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
          placement: "topRight",
        });
      });
  };

  useEffect(() => {
    if (!category) return;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    form.setFields([
      {
        name: ["params"],
        value: {},
      },
    ]);
  }, [category]);

  const handleGenerateDescription = async () => {
    const values = form.getFieldsValue();

    setAiDescriptionLoading(true);

    try {
      const result = await generateDescription(values);
      setAiDescription(result);
      setDescriptionButtonState({
        text: "Повторить запрос",
        icon: <ReloadOutlined />,
      });
    } catch (error) {
      setAiDescription(
        "Произошла ошибка при запросе к AI. Попробуйте повторить запрос или закройте уведомление",
      );
      console.error(error);
      setDescriptionButtonState({
        text: "Повторить запрос",
        icon: <ReloadOutlined />,
      });
    } finally {
      setAiDescriptionLoading(false);
    }
  };

  const handleGeneratePrice = async () => {
    const values = form.getFieldsValue();

    setAiPriceLoading(true);
    try {
      const result = await generatePrice(values);
      setAiPrice(result);
      setPriceButtonState({
        text: "Повторить запрос",
        icon: <ReloadOutlined />,
      });
    } catch {
      setAiPrice("Ошибка при запросе к AI");
      setPriceButtonState({
        text: "Повторить запрос",
        icon: <ReloadOutlined />,
      });
    } finally {
      setAiPriceLoading(false);
    }
  };

  return (
    <div className={clsx(styles.pageInner, "container")}>
      <Title level={2}>Редактирование объявления</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(_, allValues) => {
          if (!id) return;

          localStorage.setItem(storageKey, JSON.stringify(allValues));
        }}
      >
        <Form.Item
          label="Категория"
          name="category"
          rules={[{ required: true, message: "Выберите категорию" }]}
        >
          <Select
            placeholder="Выберите категорию"
            options={[
              { label: "Электроника", value: "electronics" },
              { label: "Авто", value: "auto" },
              { label: "Недвижимость", value: "real_estate" },
            ]}
          />
        </Form.Item>

        <Divider style={{ marginBlock: "18px" }} />

        <Form.Item
          label="Название"
          name="title"
          rules={[
            { required: true, message: "Название должно быть заполнено" },
          ]}
        >
          <Input
            placeholder="Введите название"
            allowClear={{ clearIcon: <CloseCircleOutlined /> }}
          />
        </Form.Item>

        <Divider style={{ marginBlock: "18px" }} />

        <Form.Item label="Цена" required>
          <Space style={{ width: "100%" }}>
            <Form.Item
              name="price"
              noStyle
              rules={[
                { required: true, message: "Цена должна быть заполнена" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Введите цену"
              />
            </Form.Item>
            <Tooltip
              styles={{
                container: {
                  padding: "8px",
                  background: "#ffffff",
                  width: "332px",
                  borderRadius: "2px",
                },
                arrow: {
                  background: "#ffffff",
                },
              }}
              open={!!aiPrice}
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    fontSize: "12px",
                    lineHeight: "1.33",
                    letterSpacing: "0.03em",
                    color: "#1e1e1e",
                  }}
                >
                  <pre style={{ whiteSpace: "pre-wrap" }}>{aiPrice}</pre>

                  <Button size="small" onClick={() => setAiPrice(null)}>
                    Закрыть
                  </Button>
                </div>
              }
            >
              <Button
                loading={aiPriceLoading}
                onClick={handleGeneratePrice}
                icon={priceButtonState.icon}
                type="primary"
                style={{
                  backgroundColor: "#f9f1e6",
                  borderRadius: "8px",
                  color: "#ffa940",
                  boxShadow: "none",
                }}
              >
                {priceButtonState.text}
              </Button>
            </Tooltip>
          </Space>
        </Form.Item>

        <Divider style={{ marginBlock: "18px" }} />

        <Title level={5}>Характеристики</Title>

        {category &&
          paramsFieldsConfig[category]?.map((field) => {
            if (field.type === "number") {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={["params", field.name]}
                  validateStatus={!params?.[field.name] ? "warning" : undefined}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              );
            }

            if (field.type === "select") {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={["params", field.name]}
                  validateStatus={!params?.[field.name] ? "warning" : undefined}
                >
                  <Select options={field.options} />
                </Form.Item>
              );
            }

            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={["params", field.name]}
                validateStatus={!params?.[field.name] ? "warning" : undefined}
              >
                <Input allowClear />
              </Form.Item>
            );
          })}

        <Divider />

        <Form.Item label="Описание" name="description">
          <TextArea
            rows={4}
            showCount
            maxLength={1000}
            placeholder="Введите описание"
          />
        </Form.Item>

        <Tooltip
          open={!!aiDescription}
          styles={{
            container: {
              padding: "8px",
              background: "#ffffff",
              width: "332px",
              borderRadius: "2px",
            },
            arrow: {
              background: "#ffffff",
            },
          }}
          title={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "12px",
                lineHeight: "1.33",
                letterSpacing: "0.03em",
                color: "#1e1e1e",
              }}
            >
              <Title
                style={{
                  margin: 0,
                  fontWeight: "500",
                  fontSize: "12px",
                  lineHeight: "1.33",
                  letterSpacing: "0.03em",
                  color: "#1e1e1e",
                }}
              >
                Ответ AI:
              </Title>
              <p style={{ fontSize: "12px", margin: 0 }}>{aiDescription}</p>
              <Space>
                <Button
                  size="small"
                  onClick={() => {
                    form.setFieldValue("description", aiDescription);
                    setAiDescription(null);
                  }}
                >
                  Применить
                </Button>

                <Button size="small" onClick={() => setAiDescription(null)}>
                  Закрыть
                </Button>
              </Space>
            </div>
          }
        >
          <Button
            loading={aiDescriptionLoading}
            type="primary"
            icon={descriptionButtonState.icon}
            onClick={handleGenerateDescription}
            style={{
              backgroundColor: "#f9f1e6",
              borderRadius: "8px",
              color: "#ffa940",
              boxShadow: "none",
            }}
          >
            {descriptionButtonState.text}
          </Button>
        </Tooltip>

        <Divider />

        <Space>
          <Button type="primary" htmlType={"submit"} disabled={!isFormValid}>
            Сохранить
          </Button>
          <Button
            color="default"
            variant="filled"
            onClick={() => {
              localStorage.removeItem(storageKey);
              navigate(`/ads/${id}`);
            }}
          >
            Отменить
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default EditAdPage;
