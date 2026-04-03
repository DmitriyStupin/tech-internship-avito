import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {ItemUpdateIn} from "../../shared/types/ItemUpdateIn.ts";
import {getAdById} from "../../shared/api/adApi.ts";
import {updateAdById} from "../../shared/api/adApiEdit.ts";

const EditAdPage = () => {
  const {id} = useParams<{ id: string }>()

  const [formData, setFormData] = useState<ItemUpdateIn | null>(null)

  useEffect(() => {
    if (!id) return;

    getAdById(Number(id)).then((res) => {
      const item = res.data

      setFormData({
        category: item.category,
        title: item.title,
        description: item.description,
        price: item.price,
        params: item.params,
      })

      console.log(item)
    })
  }, [id]);

  return (
    <div>
      <button
        onClick={() => {
          if (!formData || !id) return;

          updateAdById(Number(id), {
            ...formData,
            title: formData.title + " TEST",
          }).then(() => {
            getAdById(Number(id)).then(res => {
              console.log("AFTER UPDATE:", res.data);
            });
          });
        }}
      >
        TEST UPDATE
      </button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default EditAdPage;