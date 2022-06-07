import { useState, useEffect } from "react";
import axios from "axios";
import balenImg from "./assets/img/Balen_Shah.jpeg";
import shirjanaImg from "./assets/img/Shirjana.jpeg";
import keshavImg from "./assets/img/Keshav.jpeg";
import ProfileCard from "./Components/ProfileCard";
import "./App.css";
import Province3data from "./VoteCountProvince3.json";
import Divider from "@mui/material/Divider";

import Datatable from "./Components/VoteTable";
import VoteIcon from "@mui/icons-material/HowToVote";

function App() {
  const [data, setData] = useState({});
  
  const url = "https://local-election-2079.herokuapp.com/data";

  useEffect(() => {
    axios.get(url).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h3>
        <VoteIcon />स्थानीय तहको निर्वाचन प्रदेश ३
      </h3>
      <Divider variant="middle"> काठमाण्डौ महानगरपालिका </Divider>
      <div className="container">
        <ProfileCard
          img={balenImg}
          name={data[0] ? data[0].name : null}
          vote={data[0] ? data[0].vote : null}
          partyName={data[0] ? data[0].partyName : null}
        />

        <ProfileCard
          img={shirjanaImg}
          name={data[1] ? data[1].name : null}
          vote={data[1] ? data[1].vote : null}
          partyName={data[1] ? data[1].partyName : null}
        />
        <ProfileCard
          img={keshavImg}
          name={data[2] ? data[2].name : null}
          vote={data[2] ? data[2].vote : null}
          partyName={data[2] ? data[2].partyName : null}
        />
      </div>
      <Divider variant="middle"> मत गणना </Divider>

      <Datatable data={Province3data} />
    </div>
  );
}

export default App;
