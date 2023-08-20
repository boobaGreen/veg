import { useParams } from "react-router-dom";
import { useRecipe } from "../hooks/useRecipe";

import Error from "./Error";
import Info from "../components/Info";
import Type from "../components/Type";
import Nutrition from "../components/Nutrition";
import Istructions from "../components/Istructions";
import Ingredients from "../components/Ingredients";
import WinePhoto from "../components/WinePhoto";
import Wine from "../components/Wine";
import Spinner from "../ui/Spinner";

import {
  StyledGridContainer,
  StyledDivPhoto,
  StyledInfo,
  StyledDivType,
  StyledDivNutrion,
  StyledDivIngredients,
  StyledDivIstructions,
  StyledDivWinePhoto,
  StyledDivWine,
  StyledPhoto,
} from "../styles/styledComponents/styledRecipePage";

function RecipePage({ recipe }) {
  const { id: idCustom } = useParams();
  const { isLoading, recipe: data, error } = useRecipe(idCustom);
  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  const percentCarbs = data.nutrition.caloricBreakdown.percentCarbs;
  const percentFat = data.nutrition.caloricBreakdown.percentFat;
  const percentProtein = data.nutrition.caloricBreakdown.percentProtein;

  const percentOfDailyNeedsCal =
    data.nutrition.nutrients[0].percentOfDailyNeeds;
  let istructionsArray = [{ number: 1, step: "😢" }];
  if (data.analyzedInstructions[0]) {
    istructionsArray = data.analyzedInstructions[0]?.steps;
  }

  const {
    vegan,
    glutenFree,
    dairyFree,
    image,
    readyInMinutes,
    servings,
    pricePerServing,
    dishTypes,
    extendedIngredients,
    winePairing,
  } = data;
  const productMatches = winePairing.productMatches;
  const pairingText = winePairing.pairingText;

  const dataPieNutrient = {
    labels: ["Carb", "Prot", "Fat"],
    datasets: [
      {
        label: "%",
        data: [percentCarbs, percentProtein, percentFat],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const dataPieCalories = {
    labels: [`kcal/serving`, `day percent`],
    datasets: [
      {
        label: `%`,
        data: [percentOfDailyNeedsCal, 100 - percentOfDailyNeedsCal],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };
  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <>
      <StyledGridContainer>
        <StyledDivIstructions>
          <Istructions istructionsArray={istructionsArray} />
        </StyledDivIstructions>
        <StyledDivPhoto>
          <StyledPhoto
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></StyledPhoto>
        </StyledDivPhoto>
        <StyledInfo>
          <Info
            vegan={vegan}
            dairyFree={dairyFree}
            glutenFree={glutenFree}
            readyInMinutes={readyInMinutes}
            servings={servings}
            pricePerServing={pricePerServing}
          ></Info>
        </StyledInfo>
        <StyledDivIngredients>
          <Ingredients extendedIngredients={extendedIngredients} />
        </StyledDivIngredients>
        <StyledDivType>
          <Type dishTypes={dishTypes} />
        </StyledDivType>
        <StyledDivWine>
          <Wine pairingText={pairingText} />
        </StyledDivWine>
        <StyledDivWinePhoto>
          <WinePhoto productMatches={productMatches} />
        </StyledDivWinePhoto>
        <StyledDivNutrion>
          <Nutrition
            dataPieCalories={dataPieCalories}
            dataPieNutrient={dataPieNutrient}
          />
        </StyledDivNutrion>
      </StyledGridContainer>
    </>
  );
}

export default RecipePage;
