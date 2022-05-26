import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Popup.scss";
import FavButton from "./component/FavButton";

// 拡張機能のポップアップにState保存するとポップアップ消したときにStateも消える
const Popup = () => {
  const [favoriteGroup, setFavoriteGroup] = useState("");
  
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
      <FavButton favGroup={favoriteGroup}></FavButton>
    </div>
  );
}

export default Popup;