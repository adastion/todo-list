import React, { useEffect, useState } from "react";
import { Field } from "../../styles/Field";
import { Button } from "./../../styles/Button.styles";
import styled from "styled-components";

const SpotifyStyles = styled.div`
  display: grid;
  gap: 25px;
  text-align: center;

  & ${Field} + * {
    margin-top: 25px;
  }
`;

export const Spotify = () => {
  const CLIENT_ID = "4ef8202170f94c73bc0f7b23babd79a2";
  // const CLIENT_SECRET = "9dcf9a4c7e9b456ea9db916eb4229e2e";
  const REDIRECT_URI = "http://localhost:3000/todo-list";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((item) => item.startsWith("access_token"))
        .split("=")[1];

      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const logOut = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <SpotifyStyles>
      <h3>Spotify</h3>

      {!token ? (
        <Button
          as={"a"}
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Authorization in spotify
        </Button>
      ) : (
        <Button onClick={logOut}>Log out</Button>
      )}
      {token ? (
        <form action="">
          <Field type="search" placeholder="search music" />
          <Button type="submit">Search</Button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}
    </SpotifyStyles>
  );
};
