import { Allergen } from "@prisma/client";

import CeleryIcon from "./Allergens/CeleryIcon";
import CrustaceanIcon from "./Allergens/CrustaceanIcon";
import EggIcon from "./Allergens/EggIcon";
import FishIcon from "./Allergens/FishIcon";
import GlutenIcon from "./Allergens/GlutenIcon";
import LupinIcon from "./Allergens/LupinIcon";
import MilkIcon from "./Allergens/MilkIcon";
import MolluscIcon from "./Allergens/MolluscIcon";
import MustardIcon from "./Allergens/MustardIcon";
import NutsIcon from "./Allergens/NutsIcon";
import PeanutIcon from "./Allergens/PeanutIcon";
import SesameIcon from "./Allergens/SesameIcon";
import SoyaIcon from "./Allergens/SoyaIcon";
import SulphiteIcon from "./Allergens/SulphiteIcon";

const AllergensComponent = ({
  allergens,
  size,
}: {
  allergens: Allergen[];
  size: number;
}) => {
  return (
    <div className="flex-row  flex gap-3">
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
      return <CeleryIcon width={size} height={size}></CeleryIcon>;
    case "crustaceans":
      return <CrustaceanIcon width={size} height={size}></CrustaceanIcon>;
    case "cereals":
      return <GlutenIcon width={size} height={size}></GlutenIcon>;
    case "eggs":
      return <EggIcon width={size} height={size}></EggIcon>;
    case "fish":
      return <FishIcon width={size} height={size}></FishIcon>;
    case "lupin":
      return <LupinIcon width={size} height={size}></LupinIcon>;
    case "milk":
      return <MilkIcon width={size} height={size}></MilkIcon>;
    case "molluscs":
      return <MolluscIcon width={size} height={size}></MolluscIcon>;
    case "mustard":
      return <MustardIcon width={size} height={size}></MustardIcon>;
    case "nuts":
      return <NutsIcon width={size} height={size}></NutsIcon>;
    case "peanuts":
      return <PeanutIcon width={size} height={size}></PeanutIcon>;
    case "sesameSeeds":
      return <SesameIcon width={size} height={size}></SesameIcon>;
    case "soybeans":
      return <SoyaIcon width={size} height={size}></SoyaIcon>;
    case "sulphurDioxideAndSulphites":
      return <SulphiteIcon width={size} height={size}></SulphiteIcon>;
  }
}

export default AllergensComponent;
