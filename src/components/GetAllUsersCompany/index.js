import { useEffect, useState } from "react";
import api from "../../services/api";

const GetAllComp = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    api
      .get(`/users?type=pj`)
      .then((res) => {
        console.log(res.data);
        console.log(res);
        setDados(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <h2>Todas as companhias</h2>
      {dados && dados.map((item, i) => <div key={i}>{item.email}</div>)}
    </>
  );
};

export default GetAllComp;
