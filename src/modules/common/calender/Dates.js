import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Date from './Date';

export default class Dates extends PureComponent {
  render() {
    const {
      currentDateIndex,
      dates,
      onSelectDay,
      onRenderDay,
      shouldHideAll,
      defaultSelectedDate
    } = this.props;
    return (
      <View style={styles.container}>
        {dates.map((date, index) =>
          <View key={index}>
            <Date
              date={date}
              index={index}
              isActive={index === currentDateIndex}
              isCurrentDate={index === 0 && !shouldHideAll}
              isDisableDate={(shouldHideAll && index !== currentDateIndex)} //Remove "|| date.diff(dates[0], 'days') < 1"
              onPress={onSelectDay}
              onRender={onRenderDay}
              key={index}
            />
          </View>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
