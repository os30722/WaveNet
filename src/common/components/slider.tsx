import React, { useContext, useEffect, useState } from 'react';
import { useThemeContext } from '../contexts/themeContext';
import Theme from '../types/theme';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';

interface Props {
  minValue: number,
  maxValue: number,
  onChangeValue?: (value: number) => void 
  onDragEnd?: () => void
  currentValue?: number
  height?: number
  hideThumb?: boolean
}

function Slider({minValue, maxValue, onChangeValue, currentValue, onDragEnd, height,
        hideThumb}: Props): React.JSX.Element {
  const theme = useThemeContext();
  const styles = getStyles(theme, height);
  const [width, setWidth] = useState<number>(1);
  const [leftPer, setLeftPer] = useState<number>(0);

  useEffect(() => {
    if(currentValue != undefined && currentValue != 0) {
      const initialPer = (currentValue/maxValue) * 100;
      setLeftPer(initialPer)
    }
  }, [currentValue])

  const calculateLeftPer = (num: number) => {
    let per = (num/width) * 100;
    if (per <= 0) per = 0;
    if (per > 100) per = 100;
    onChangeValue?.((maxValue * per) / 100);
    setLeftPer(per);
  }   
    
  const pan = Gesture.Pan()
  .onBegin((event) => {
    runOnJS(calculateLeftPer)(event.x);
  })
  .onChange((event) => {
    runOnJS(calculateLeftPer)(event.x);
  })
  .onEnd(() => {
    onDragEnd && runOnJS(onDragEnd)();
  })
  .onFinalize(() => {
    onDragEnd && runOnJS(onDragEnd)()
  })

  return (
    <GestureHandlerRootView onLayout={({nativeEvent}) => {
        setWidth(nativeEvent.layout.width);
    }}>
      <GestureDetector gesture={pan}>
        <View style={styles.sliderContainer}>
          <Animated.View style={[styles.track, {flexGrow: leftPer}]} />
          {!hideThumb && <Animated.View style={styles.thumb} />}
          <Animated.View style={[styles.track, {backgroundColor: 'white', flexGrow: 100 - leftPer}]} />
        </View>
      </GestureDetector> 
    </GestureHandlerRootView>
  );
}

const getStyles = (theme: Theme, height?: number) => StyleSheet.create({
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 20,
    },
    track: {
      backgroundColor: theme.primary,
      height: height || 4, 
      borderRadius: 1,
    },
    thumb: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: theme.primary,
    },
});

export default Slider;