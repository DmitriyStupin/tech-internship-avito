export const paramsFieldsConfig = {
  electronics: [
    {
      name: "type", label: "Тип", type: 'select', options: [
        {label: "Телефон", value: "phone"},
        {label: "Ноутбук", value: "laptop"},
        {label: "Разное", value: "misc"},
      ]
    },
    {name: "brand", label: "Бренд", type: 'text'},
    {name: "model", label: "Модель", type: 'text'},
    {
      name: "condition", label: "Состояние", type: 'select', options: [
        {label: "Новое", value: "new"},
        {label: "Б/У", value: "used"},
      ]
    },
    {name: "color", label: "Цвет", type: 'text'},
  ],
  auto: [
    {name: "brand", label: "Бренд", type: "text"},
    {name: "model", label: "Модель", type: "text"},
    {name: "yearOfManufacture", label: "Год выпуска", type: "number"},
    {
      name: "transmission", label: "Коробка передач", type: "select", options: [
        {label: "Автомат", value: "automatic"},
        {label: "Механика", value: "manual"},
      ]
    },
    {name: "mileage", label: "Пробег", type: "number"},
    {name: "enginePower", label: "Мощность", type: "number"},
  ],
  real_estate: [
    {name: "type", label: "Тип", type: 'select', options: [
        {label: "Квартира", value: "flat"},
        {label: "Дом", value: "house"},
        {label: "Комната", value: "room"},
      ]},
    {name: "address", label: "Адрес"},
    {name: "area", label: "Площадь"},
    {name: "floor", label: "Этаж"},
  ],
};