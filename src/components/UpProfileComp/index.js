import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useState } from "react";
import { User } from "../../providers/UserProvider";
import { useEffect } from "react";

const UpProfileComp = () => {
  const { id, loggedUser } = User();

  const [token] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    if (!localToken) {
      return "";
    }
    return JSON.parse(localToken);
  });

  const [nameInput, setNameInput] = useState("");

  const [cityInput, setCityInput] = useState("");

  const [have_vacanciesInput, setHave_vacanciesInput] = useState("");

  const [social_mediasInput, setSocial_mediasInput] = useState("");

  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    setNameInput(loggedUser.name);
    setCityInput(loggedUser.city);
    setHave_vacanciesInput(loggedUser.have_vacancies);
    setSocial_mediasInput(loggedUser.social_medias);
    setDescriptionInput(loggedUser.description);
  }, [
    loggedUser.city,
    loggedUser.description,
    loggedUser.have_vacancies,
    loggedUser.name,
    loggedUser.social_medias,
  ]);

  const { register, handleSubmit } = useForm({});

  const handleUpdate = (e) => {
    api
      .patch(
        `/users/${id}`,
        {
          name: nameInput,
          city: cityInput,
          have_vacancies: have_vacanciesInput,
          social_medias: social_mediasInput,
          description: descriptionInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h2>Atualizar perfil da Empresa</h2>

      <form onSubmit={handleSubmit(handleUpdate)}>
        <div>
          <input
            placeholder="Nome"
            {...register("name")}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Cidade"
            {...register("city")}
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </div>

        <div>
          <span>Está aceitando vagas?</span>
          <input
            type="radio"
            {...register("have_vacancies")}
            value={have_vacanciesInput}
            onChange={() => setHave_vacanciesInput(true)}
            checked={have_vacanciesInput === true}
          />
          <label>Sim!</label>
          <input
            {...register("have_vacancies")}
            type="radio"
            value={have_vacanciesInput}
            onChange={() => setHave_vacanciesInput(false)}
            checked={have_vacanciesInput === false}
          />
          <label>Ainda não!</label>
        </div>

        <div>
          <input
            placeholder="Redes Sociais"
            {...register("social_medias")}
            value={social_mediasInput}
            onChange={(e) => setSocial_mediasInput(e.target.value)}
          />
        </div>

        <div>
          <input
            placeholder="Descrição"
            {...register("description")}
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
        </div>

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default UpProfileComp;
