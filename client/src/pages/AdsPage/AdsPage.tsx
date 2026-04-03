import {useEffect, useState} from "react";
import {getAds} from "../../shared/api/adsApi.ts";

const AdsPage = () => {
  const [ads, setAds] = useState([])
  
  useEffect(() => {
    getAds().then((res) => {
      console.log(res)
      setAds(res.data.items)
    })
  }, []);

  console.log(ads)

  return (
    <div>
      страница объявдений
    </div>
  );
};

export default AdsPage;