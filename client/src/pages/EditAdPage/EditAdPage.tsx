import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  Space,
  Typography
} from "antd";
import {BulbOutlined, CloseCircleOutlined,} from "@ant-design/icons";
import styles from './EditAdPage.module.scss'
import clsx from "clsx";
import {useEffect, useRef, useState} from "react";
import {getAdById} from "../../shared/api/adApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {updateAdById} from "../../shared/api/adApiEdit.ts";
import {paramsFieldsConfig} from "../../shared/config/paramsFields.ts";
import {generateDescription} from "../../shared/api/aiApi.ts";

const {Title} = Typography;
const {TextArea} = Input;

const EditAdPage = () => {
  const {id} = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const isInitialLoad = useRef(true)
  const storageKey = `edit-ad-${id}`
  const params = Form.useWatch("params", form);

  const [aiDescription, setAiDescription] = useState<string | null>(null)
  const [aiDescriptionLoading, setAiDescriptionLoading] = useState(false)

  const [aiPrice, setAiPrice] = useState<string | null>(null)
  const [aiDPriceLoading, setAiPriceLoading] = useState(false)

  const category = Form.useWatch<'electronics' | 'auto' | 'real_estate'>('category', form)
  const requiredFields = Form.useWatch([], form);

  const isFormValid =
    requiredFields?.category &&
    requiredFields?.title &&
    requiredFields?.price;

  useEffect(() => {
    if (!id) return

    const savedAd = localStorage.getItem(storageKey)

    if (savedAd) {
      form.setFieldsValue(JSON.parse(savedAd))
      notification.success({
        title: "Черновик загружен",
        placement: "topRight",
      });
      return
    }

    getAdById(Number(id))
      .then((res) => {
        const item = res.data

        form.setFieldsValue({
          category: item.category,
          title: item.title,
          description: item.description,
          price: item.price ? Number(item.price) : undefined,
          params: item.params,
        })
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
    if (!id) return

    updateAdById(Number(id), values)
      .then(() => {
        localStorage.removeItem(storageKey)
        notification.success({
          title: 'Изменения сохранены',
          placement: 'topRight'
        })
        navigate(`/ads/${id}`);
      })
      .catch(() => {
        notification.error({
          title: "Ошибка сохранения",
          description: "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
          placement: "topRight",
        });
      });
  }

  useEffect(() => {
    if (!category) return;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    form.setFields([
      {
        name: ['params'],
        value: {},
      },
    ]);
  }, [category]);

  const handleGenerateDescription = async () => {
    const values = form.getFieldsValue()

    setAiDescriptionLoading(true)

    try {
      const result = await generateDescription(values)
      setAiDescription(result)
    } catch (error) {
      setAiDescription("Произошла ошибка при запросе к AI. Попробуйте повторить запрос или закройте уведомление")
    } finally {
      setAiDescriptionLoading(false)
    }
  }

  return (
    <div className={clsx(styles.pageInner, 'container')}>
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
          rules={[{required: true, message: "Выберите категорию"}]}
        >
          <Select
            placeholder="Выберите категорию"
            options={[
              {label: "Электроника", value: "electronics"},
              {label: "Авто", value: "auto"},
              {label: "Недвижимость", value: "real_estate"},
            ]}
          />
        </Form.Item>

        <Divider style={{marginBlock: '18px'}} />

        <Form.Item
          label="Название"
          name="title"
          rules={[{required: true, message: "Название должно быть заполнено"}]}
        >
          <Input
            placeholder="Введите название"
            allowClear={{clearIcon: <CloseCircleOutlined />}}
          />
        </Form.Item>

        <Divider style={{marginBlock: '18px'}} />

        <Form.Item
          label="Цена"
          required
        >
          <Space style={{width: "100%"}}>
            <Form.Item
              name="price"
              noStyle
              rules={[{required: true, message: "Цена должна быть заполнена"}]}
            >
              <InputNumber
                style={{width: "100%"}}
                placeholder="Введите цену"
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<BulbOutlined />}
              style={{
                backgroundColor: "#f9f1e6",
                borderRadius: "8px",
                color: "#ffa940",
                boxShadow: "none",
              }}
            >
              Узнать рыночную цену
            </Button>
          </Space>
        </Form.Item>

        <Divider style={{marginBlock: '18px'}} />

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
                  <InputNumber style={{width: "100%"}} />
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

        <Form.Item
          label="Описание"
          name="description"
        >
          <TextArea
            rows={4}
            placeholder="Введите описание"
          />
        </Form.Item>

        <Button
          type="primary"
          icon={<BulbOutlined />}
          style={{
            backgroundColor: "#f9f1e6",
            borderRadius: "8px",
            color: "#ffa940",
            boxShadow: 'none'
          }}
        >
          Улучшить описание
        </Button>

        <Divider />

        <Space>
          <Button
            type="primary"
            htmlType={"submit"}
            disabled={!isFormValid}
          >Сохранить</Button>
          <Button
            color="default"
            variant="filled"
            onClick={() => {
              localStorage.removeItem(storageKey)
              navigate(`/ads/${id}`)
            }}
          >Отменить</Button>
        </Space>
      </Form>
    </div>
  )
};

export default EditAdPage;