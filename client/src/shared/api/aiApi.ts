export const generateDescription = async (data: any) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Продаю отличный товар: ${data.title}. Отличное состояние, полностью исправен. Идеально подойдёт для повседневного использования.`)
    }, 1500)
  })
}

export const generatePrice = async (data: any) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(
        `Средняя цена ${data.title}:\n100 000 – 120 000 ₽ — хорошее состояние\n120 000+ ₽ — идеал`
      );
    }, 1500);
  });
};