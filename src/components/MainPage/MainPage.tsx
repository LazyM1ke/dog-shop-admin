import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DogCard from "../DogCard/DogCard";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { TextField } from "@consta/uikit/TextField";
import { Text } from "@consta/uikit/Text";
import { DatePicker } from "@consta/uikit/DatePicker";
import { DragNDropField } from "@consta/uikit/DragNDropField";
import { IconClose } from "@consta/icons/IconClose";

interface DogParent {
  id: number;
  explanation: string;
}

interface Dog {
  name: string;
  breed: string;
  birthDate: string;
  parents: DogParent[];
  images: string[];
  id: number;
}

interface GetDogsResponse {
  max_offset: number;
  dogs: Dog[];
}

const MainPage = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dogName, setDogName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const getDogs = async () => {
    const response = await axios.get<GetDogsResponse>(
      "http://109.207.171.149:8888/api/v1/dog/all",
    );
    const { dogs } = response.data;
    setDogs(dogs);
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <>
      <StyledHeader>
        <Button
          label={"Добавить собаку"}
          view={"secondary"}
          onClick={() => setIsModalOpen(true)}
        />
      </StyledHeader>
      <PageWrapper>
        <ContentWrapper>
          <div>
            {dogs.map((dog) => (
              <DogCard
                key={dog.id}
                caption={dog.name}
                birthDate={dog.birthDate}
                breed={dog.breed}
                price={25}
              />
            ))}
          </div>
        </ContentWrapper>
      </PageWrapper>
      <Modal
        isOpen={isModalOpen}
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <AddModalContent>
          <AddModalHeader>
            <Text size={"xl"}>Добавить новую собаку</Text>
            <Button
              label="Редактировать"
              view="clear"
              iconRight={IconClose}
              onlyIcon
              onClick={() => setIsModalOpen(false)}
            />
          </AddModalHeader>
          <Divider></Divider>
          <TextField label={"Кличка"} />
          <TextField label={"Порода"} />
          <DatePicker label={"Дата рождения"} />
          <DragNDropField onDropFiles={(files) => console.log(files)} />
          <Button
            label={"Добавить"}
            view={"primary"}
            onClick={() => setIsModalOpen(true)}
          />
        </AddModalContent>
      </Modal>
    </>
  );
};

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #191a23;
  gap: 15px;
`;

const PageWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr;
  width: 100%;
  background-color: #1e1f2a;
  min-height: calc(100vh - 40px);
`;

const AddModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 450px;
`;

const AddModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 66, 105, 0.28);
`;

export default MainPage;
