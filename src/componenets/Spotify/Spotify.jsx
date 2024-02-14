import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Field } from "../../styles/Field";
import { Button } from "./../../styles/Button.styles";

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
  const REDIRECT_URI = "http://localhost:3000/todo-list";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artistsList, setArtistsList] = useState("");

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

  const searchArtist = async (event) => {
    event.preventDefault();
    if (searchKey) {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/search?limit=5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchKey,
            type: "artist",
          },
        }
      );
      setArtistsList(data.artists.items);
      console.log(data.artists.items);
    } else {
      <h2>The search field is empty </h2>;
    }
  };

  const renderArtists = () => {
    return artistsList.map((artist) => (
      <li>
        {artist.images.length ? (
          <img width={"20%"} src={artist.images[0].url} alt="cover" />
        ) : (
          <div>not cover</div>
        )}
        <br />
        {artist.name}
      </li>
    ));
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
        <form onSubmit={searchArtist}>
          <Field
            onChange={setSearchKey}
            type="search"
            placeholder="search music"
          />
          <Button type="submit">Search</Button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}

      <ol>{artistsList ? renderArtists() : <div>artists:</div>}</ol>
    </SpotifyStyles>
  );
};
