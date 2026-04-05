export const paramsFieldsConfig = {
  electronics: [
    { name: "type", label: "Тип" },
    { name: "brand", label: "Бренд" },
    { name: "model", label: "Модель" },
    { name: "condition", label: "Состояние" },
    { name: "color", label: "Цвет" },
  ],
  auto: [
    { name: "brand", label: "Бренд", type: "text" },
    { name: "model", label: "Модель", type: "text" },
    { name: "yearOfManufacture", label: "Год выпуска", type: "number" },
    { name: "transmission", label: "Коробка передач", type: "select", options: [
        { label: "Автомат", value: "automatic" },
        { label: "Механика", value: "manual" },
      ]},
    { name: "mileage", label: "Пробег", type: "number" },
    { name: "enginePower", label: "Мощность", type: "number" },
  ],
  real_estate: [
    { name: "type", label: "Тип" },
    { name: "address", label: "Адрес" },
    { name: "area", label: "Площадь" },
    { name: "floor", label: "Этаж" },
  ],
};