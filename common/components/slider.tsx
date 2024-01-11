import React, { useContext, useState } from "react";
import { useThemeContext } from "../contexts/themeContext";
import Theme from "../types/theme";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";

interface Props {
  minValue: number,
  maxValue: number,
}

function Slider({minValue, maxValue}: Props): React.JSX.Element {
  const theme = useThemeContext();
  const styles = getStyles(theme);
  const [width, setWidth] = useState<number>(1);
  const [leftPer, setLeftPer] = useState<number>(0);

  const calculateLeftPer = (num: number) => {
    let per = (num/width) * 100;
    if (per < 0) per = 0;
    if (per > 100) per = 100;
    setLeftPer(per)
  }
    
  const pan = Gesture.Pan()
  .onBegin((event) => {
    runOnJS(calculateLeftPer)(event.x);
  })
  .onChange((event) => {
    runOnJS(calculateLeftPer)(event.x);
  })

  return (
    <GestureHandlerRootView onLayout={({nativeEvent}) => {
        setWidth(nativeEvent.layout.width);
    }}>
      <GestureDetector gesture={pan}>
        <View style={styles.sliderContainer}>
          <Animated.View style={[styles.track, {flexGrow: leftPer}]} />
          <Animated.View style={styles.thumb} />
          <Animated.View style={[styles.track, {backgroundColor: 'white', flexGrow: 100 - leftPer}]} />
        </View>
      </GestureDetector> 
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{((maxValue * leftPer)/100) + minValue}</Text>
        <Text style={styles.infoText}>{maxValue }</Text>
      </View>           
    </GestureHandlerRootView>
  );
}

const getStyles = (theme: Theme) => StyleSheet.create({
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 20,
    },
    track: {
      backgroundColor: theme.primary,
      height: 4, 
      borderRadius: 1,
    },
    thumb: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: theme.primary,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoText: {
      color: theme.text,
    }
});

export default Slider;