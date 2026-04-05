const OLLAMA_URL = "http://127.0.0.1:11434/v1/completions";
const MODEL = "llama3";

interface AdData {
  title: string;
  description?: string;
  price?: number;
  category: string;
  params?: Record<string, any>;
}

// --- ОПИСАНИЕ ---
export const generateDescription = async (data: AdData): Promise<string> => {
  const prompt = `
Напиши краткое описание объявления на русском языке.

Требования:
- 2-3 предложения
- простой и естественный текст
- без списков

Пример:
Продаю свой MacBook Pro 16" (2021) на чипе M1 Pro. Состояние отличное, работал бережно. Подходит для работы, учебы и монтажа.

Данные:
Название: ${data.title}
Цена: ${data.price || "не указана"}
Характеристики: ${JSON.stringify(data.params || {})}
`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        max_tokens: 120,
        temperature: 0.3,
        stream: false,
      }),
    });

    const json = await response.json();

    return json.choices?.[0]?.text?.trim() || "Ошибка генерации";
  } catch (e) {
    console.error(e);
    return "Ошибка при генерации описания";
  }
};

// --- ЦЕНА ---
export const generatePrice = async (data: AdData): Promise<string> => {
  const prompt = `
Определи рыночную цену товара.

Ответ строго в формате:

Средняя цена на ${data.title}:
X – Y ₽ — отличное состояние.
От Z ₽ — идеал.
A – B ₽ — с дефектами.

Пример:
Средняя цена на MacBook Pro 16" M1 Pro:
115 000 – 135 000 ₽ — отличное состояние.
От 140 000 ₽ — идеал.
90 000 – 110 000 ₽ — с дефектами.

Данные:
Характеристики: ${JSON.stringify(data.params || {})}
`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        max_tokens: 100,
        temperature: 0.3,
        stream: false,
      }),
    });

    const json = await response.json();

    return json.choices?.[0]?.text?.trim() || "Ошибка генерации";
  } catch (e) {
    console.error(e);
    return "Ошибка при генерации цены";
  }
};
