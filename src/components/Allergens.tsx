import { Allergen } from "@prisma/client";

import CeleryIcon from "./allergens/CeleryIcon";
import CrustaceanIcon from "./allergens/CrustaceanIcon";
import EggIcon from "./allergens/EggIcon";
import FishIcon from "./allergens/FishIcon";
import GlutenIcon from "./allergens/GlutenIcon";
import LupinIcon from "./allergens/LupinIcon";
import MilkIcon from "./allergens/MilkIcon";
import MolluscIcon from "./allergens/MolluscIcon";
import MustardIcon from "./allergens/MustardIcon";
import NutsIcon from "./allergens/NutsIcon";
import PeanutIcon from "./allergens/PeanutIcon";
import SesameIcon from "./allergens/SesameIcon";
import SoyaIcon from "./allergens/SoyaIcon";
import SulphiteIcon from "./allergens/SulphiteIcon";

const Allergens = ({
  allergens,
  size,
}: {
  allergens: Allergen[];
  size: number;
}) => {
  return (
    <div className="flex  flex-row gap-3">
      {allergens.map((allergen) => AllergenComponent({ allergen, size }))}
    </div>
  );
};

function AllergenComponent({
  allergen,
  size,
}: {
  allergen: Allergen;
  size: number;
}) {
  switch (allergen) {
    case "celery":
      return (
        <CeleryIcon key={allergen} width={size} height={size}></CeleryIcon>
      );
    case "crustaceans":
      return (
        <CrustaceanIcon
          key={allergen}
          width={size}
          height={size}
        ></CrustaceanIcon>
      );
    case "cereals":
      return (
        <GlutenIcon key={allergen} width={size} height={size}></GlutenIcon>
      );
    case "eggs":
      return <EggIcon key={allergen} width={size} height={size}></EggIcon>;
    case "fish":
      return <FishIcon key={allergen} width={size} height={size}></FishIcon>;
    case "lupin":
      return <LupinIcon key={allergen} width={size} height={size}></LupinIcon>;
    case "milk":
      return <MilkIcon key={allergen} width={size} height={size}></MilkIcon>;
    case "molluscs":
      return (
        <MolluscIcon key={allergen} width={size} height={size}></MolluscIcon>
      );
    case "mustard":
      return (
        <MustardIcon key={allergen} width={size} height={size}></MustardIcon>
      );
    case "nuts":
      return <NutsIcon key={allergen} width={size} height={size}></NutsIcon>;
    case "peanuts":
      return (
        <PeanutIcon key={allergen} width={size} height={size}></PeanutIcon>
      );
    case "sesameSeeds":
      return (
        <SesameIcon key={allergen} width={size} height={size}></SesameIcon>
      );
    case "soybeans":
      return <SoyaIcon key={allergen} width={size} height={size}></SoyaIcon>;
    case "sulphurDioxideAndSulphites":
      return (
        <SulphiteIcon key={allergen} width={size} height={size}></SulphiteIcon>
      );
  }
}

export default Allergens;
