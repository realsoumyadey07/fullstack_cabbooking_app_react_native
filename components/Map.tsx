import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Map() {
  const {
     userLatitude,
     userLongitude,
     destinationLatitude,
     destinationLongitude
  } = useLocationStore();
  const region = calculateRegion({
     userLatitude,
     userLongitude,
     destinationLatitude,
     destinationLongitude
  });
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text></Text>
    </MapView>
  );
}
