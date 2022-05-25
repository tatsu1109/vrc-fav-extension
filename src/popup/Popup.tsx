import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Popup.scss";

const vrchatApi = {
  url: 'https://vrchat.com/api/1' as const,
  apiKey: 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26' as const,
} as const

const Popup = () => {
  const [url, setUrl] = useState(new URL("https://example.com"));
  const [favoriteGroup, setFavoriteGroup] = useState("");
  
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

  useEffect(() => {
    console.log(url.href);  
  },[url]);

  const registFavorite = async (targeUrl:URL) => {
    const path = targeUrl.pathname.split("/");
    const worldId = path[path.length-1];
    return await axios.post(`${vrchatApi.url}/favorites`, {
      "type": "world",
      "favoriteId": worldId,
      "tags": [
        favoriteGroup
      ]
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFavoriteGroup(event.target.value);
  }

  return (
    <div className="popupContainer">
      <select onChange={value => handleChange(value)}>
        <option>worlds1</option>
        <option>worlds2</option>
        <option>worlds3</option>
        <option>worlds4</option>
      </select>
      <button type="button" onClick={() => registFavorite(url)}>FavRegist</button>
    </div>
  );
}

export default Popup;