import { Text, View } from "react-native"
import { gColors, gSizes } from "../../../utils/GlobalStyles"

const DaysHeader = () => {
    const daysArr = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    return (
        <View style={{
            height: gSizes.xl,
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginHorizontal: 10,
        }}
        >
            {daysArr.map((d, i) => (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} key={i}>
                    <Text style={{ color: gColors.primary, fontSize: 15 }}>{d}</Text>
                </View>
            ))}
        </View>
    )
}

export default DaysHeader