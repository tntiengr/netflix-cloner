import React, { useEffect, useState } from "react";
import "./ActorDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { visible } from "../../components/Navigator/NavigatorSlice";
import axios from "axios";
import { getItem } from "./ActorDetailSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function ActorDetail() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [show, handleShow] = useState(false);
  const [items, setItems] = useState([]);
  const number = useSelector((state) => state.actor.value);
  const listItem = useSelector((state) => state.actor.list);
  const loading = useSelector((state) => state.actor.loading);

  if (match.path === "/actor-detail") dispatch(visible());
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {};
  }, []);

  useEffect(() => {
    setItems(listItem);
  }, [listItem]);
  function handleGetItem() {
    try {
      const listItem = dispatch(getItem());
      console.log(listItem);
    } catch (error) {
      console.log("fail to get items", error.message);
    }
  }
  return (
    <div
      className="actor-detail"
      style={{
        paddingTop: `${show ? "5rem" : "0rem"}`,
      }}
    >
      <h1 className="actor-detail__number">{number}</h1>
      <button className="actor-detail__button" onClick={handleGetItem}>
        Get Item
      </button>
      {loading && <p className="actor-detail__loading">LOADING...</p>}
      {items && (
        <div>
          {items.map((item, index) => {
            return (
              <img
                key={index}
                src={item.item.images.background}
                alt="item image"
                style={{ width: `20rem` }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActorDetail;
