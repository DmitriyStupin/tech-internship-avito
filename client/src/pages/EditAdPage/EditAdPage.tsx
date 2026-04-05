import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Typography
} from "antd";
import {BulbOutlined, CloseCircleOutlined,} from "@ant-design/icons";
import styles from './EditAdPage.module.scss'
import clsx from "clsx";
import {useEffect} from "react";
import {getAdById} from "../../shared/api/adApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {updateAdById} from "../../shared/api/adApiEdit.ts";

const {Title} = Typography;
const {TextArea} = Input;

const EditAdPage = () => {
  const {id} = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [form] = Form.useForm()

  useEffect(() => {
    if (!id) return

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
        message.error("Ошибка загрузки объявления");
      });
  }, [id, form]);

  const onFinish = (values: any) => {
    if (!id) return

    updateAdById(Number(id), values)
      .then(() => {
        message.success("Изменения сохранены");
        navigate(`/ads/${id}`);
      })
      .catch(() => {
        message.error("Ошибка сохранения");
      });
  }

  return (
    <div className={clsx(styles.pageInner, 'container')}>
      <Title level={2}>Редактирование объявления</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
          name="price"
          rules={[{required: true, message: "Цена должна быть заполнена"}]}
        >
          <Space style={{width: "100%"}}>
            <InputNumber
              style={{width: "100%"}}
              placeholder="Введите цену"
              type={"number"}
            />
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
              Узнать рыночную цену
            </Button>
          </Space>
        </Form.Item>

        <Divider style={{marginBlock: '18px'}} />

        <Title level={5}>Характеристики</Title>

        {/* TODO: Динамические поля */}
        <Form.Item
          label="Бренд"
          name={["params", "brand"]}
        >
          <Input allowClear={{clearIcon: <CloseCircleOutlined />}} />
        </Form.Item>

        <Form.Item
          label="Модель"
          name={["params", "model"]}
        >
          <Input allowClear={{clearIcon: <CloseCircleOutlined />}} />
        </Form.Item>

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
          >Сохранить</Button>
          <Button
            color="default"
            variant="filled"
            onClick={() => navigate(`/ads/${id}`)}
          >Отменить</Button>
        </Space>
      </Form>
    </div>
  );
};

export default EditAdPage;