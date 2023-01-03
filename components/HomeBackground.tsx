import { useAssets } from "expo-asset";
import React, { useContext } from "react";
import { Dimensions, Image } from "react-native";
import { useGlobalContext } from "./LoadAssets";

const { width, height } = Dimensions.get("window");

interface Props {
  onLoad: () => void;
}

const HomeBackground = ({ onLoad }: Props) => {
  const { imageAssets } = useGlobalContext();

  return (
    <Image
      source={{ uri: imageAssets[0].uri }}
      style={{ width, height, position: "absolute", opacity: 0.3 }}
      onLoad={onLoad}
    />
  );
};

export default HomeBackground;
