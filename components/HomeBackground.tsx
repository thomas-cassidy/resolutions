import React from "react";
import { Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    onLoad: () => void;
}

const HomeBackground = ({ onLoad }: Props) => {
    return (
        <Image
            source={require("../assets/clare1.jpeg")}
            style={{ width, height, position: "absolute", opacity: 0.3 }}
            onLoad={onLoad}
        />
    );
};

export default HomeBackground;
