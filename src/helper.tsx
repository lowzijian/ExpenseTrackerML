import {
  BillLogo,
  CarLogo,
  ClothLogo,
  CommunicationLogo,
  EntertainmentLogo,
  FoodLogo,
  GiftLogo,
  HealthLogo,
  HouseLogo,
  PetsLogo,
  SportsLogo,
  TransportLogo,
} from "./assets/icons";

export const getCategoryIcon = (category: string, className?: string) => {
  switch (category) {
    case "Bills":
      return <BillLogo className={className} />;
    case "Car":
      return <CarLogo className={className} />;
    case "Clothes":
      return <ClothLogo className={className} />;
    case "Communications":
      return <CommunicationLogo className={className} />;
    case "Entertainment":
      return <EntertainmentLogo className={className} />;
    case "Food":
      return <FoodLogo className={className} />;
    case "Gifts":
      return <GiftLogo className={className} />;
    case "Health":
      return <HealthLogo className={className} />;
    case "House":
      return <HouseLogo className={className} />;
    case "Pets":
      return <PetsLogo className={className} />;
    case "Sports":
      return <SportsLogo className={className} />;
    case "Transport":
      return <TransportLogo className={className} />;
  }
  return null;
};
