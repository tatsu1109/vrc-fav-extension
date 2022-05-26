import axios from "axios";
import React, { useEffect, useState } from "react";

const vrchatApi = {
    url: 'https://vrchat.com/api/1' as const,
    apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26' as const,
} as const

type FavButtonType = {
    favGroup:String
}
  
const FavButton = (props:FavButtonType) => {
    const [url, setUrl] = useState(new URL("https://example.com"));

    useEffect(() => {
        const fetchData = async () => {
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab?.url) {
            try {
              setUrl(new URL(tab.url));
            } catch {}
          }
        }
        chrome.tabs.onUpdated.addListener(fetchData);
      }, []);
    
      const registFavorite = ():void => {
        const path = url.pathname.split("/");
        const worldId = path[path.length-1];
        axios.post(`${vrchatApi.url}/favorites`, {
          "type": "world",
          "favoriteId": worldId,
          "tags": [
            props.favGroup
          ]
        }).then(
          res => alert("success!")
          ,value => alert(value.response.data.error.message)
        );
      }

    return <button type="button" onClick={registFavorite}>FavRegist</button>
};

export default FavButton;