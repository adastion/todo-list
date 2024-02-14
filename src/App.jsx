import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { Spotify } from "./componenets/Spotify/Spotify.jsx";
import { fetchDataList } from "./componenets/Tasks/taskSlice";

const AppStyles = styled.div`
  font-size: 1.5rem;
  padding-top: 1rem;
  display: grid;
  width: 100%;

  & > * + * {
    margin-top: 3rem;
  }

  @media screen and (max-width: 768px) {
    text-align: center;
    padding: 1rem;
  }
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataList());
  }, [dispatch]);

  return (
    <AppStyles>
      <header>
        <h1>To do List</h1>
      </header>

      <Spotify />
    </AppStyles>
  );
}

export default App;
