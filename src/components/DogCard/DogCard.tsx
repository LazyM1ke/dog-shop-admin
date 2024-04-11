import React from "react";
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import styled from "styled-components";

interface DogCardProps {
  caption: string;
  breed: string;
  price: number;
  birthDate: string;
}

const DogCard: React.FC<DogCardProps> = ({
  caption,
  price,
  breed,
  birthDate,
}) => {
  return (
    <Card>
      <CardContentWrapper>
        <StyledImage
          src={
            "https://images.thevoicemag.ru/upload/img_cache/13b/13b070cb28ea4cbae2bc52ddffd72612_cropped_666x666.jpg"
          }
        />
        <CardDescription>
          <StyledCardText>{caption}</StyledCardText>
          <StyledCardText>
            {birthDate.split("-").reverse().join("-").replaceAll("-", ".")}
          </StyledCardText>
          <StyledCardText>{breed}</StyledCardText>
          <PriceText>{price} ₽</PriceText>
        </CardDescription>
      </CardContentWrapper>
    </Card>
  );
};

export default DogCard;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 450px;
  background-color: #191a23;
  border-radius: 10px;
`;

const CardDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  color: #fff;
`;

const StyledCardText = styled.div`
  font-size: 20px;
`;

const PriceText = styled(Text)`
  display: flex;
  justify-content: flex-end;
  color: #ffaf00;
  font-size: 20px;
`;
