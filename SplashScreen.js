import {image, text, view, StyleSheet} from "react-native";
import icon from "./assets/images/Logo StudyForest.png";

export default function SplashScreen() {
    return (
<view style>
    <view>
        <image source={icon} style={styles.image} />
    </view>
</view>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
})