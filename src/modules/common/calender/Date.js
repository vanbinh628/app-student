import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

export default class Date extends PureComponent {
  // Style helper functions that merge active date styles with the default ones
  // when rendering a date that was selected by user or was set active by default

  static defaultProps = {
      dateStyle: {
        container: {
            paddingHorizontal: 15,
            paddingVertical: 10,
        },
        containerActive: {
            borderBottomWidth: 4,
            borderBottomColor: '#6DCFF6',
            backgroundColor: '#6DCFF6'
        },
        containerCurrentDate: {
            borderBottomWidth: 4,
            borderBottomColor: '#6DCFF6'
        },
        day: {
            fontSize: 12,
        },
        date: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        text: {
            color: '#7A7A7A',
            textAlign: 'center',
        },
        disableText: {
            color: '#C4C4C4'
        },
        textActive: {
            color: '#FFFFFF',
        },
      }
  }

    getContainerStyle = () => {
        const {dateStyle} = this.props;
        return {
            ...dateStyle.container,
            ...(this.props.isActive ? dateStyle.containerActive : {}),
            ...(this.props.isCurrentDate ? dateStyle.containerCurrentDate : {})
        }
    };

    getDayStyle = () => {
        const {dateStyle} = this.props;
        return {
            ...dateStyle.text,
            ...dateStyle.day,
            ...(this.props.isActive ? dateStyle.textActive : {}),
            ...(this.props.isDisableDate ? dateStyle.disableText : {})
        }
    };

    getDateStyle = () => {
        const {dateStyle} = this.props;
        return {
            ...dateStyle.text,
            ...dateStyle.date,
            ...(this.props.isActive ? dateStyle.textActive : {}),
            ...(this.props.isDisableDate ? dateStyle.disableText : {})
        }
    };

  // Call `onRender` and pass component's with when rendered
  onLayout = (event) => {
    const {
      index,
      onRender,
    } = this.props;
    const { nativeEvent: { layout: { width } } } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const { index, onPress, isDisableDate } = this.props;

    if (!isDisableDate) {
        onPress(index);
    }
  };

  render() {
    const { date } = this.props;
    return (
      <TouchableOpacity
        style={this.getContainerStyle()}
        onLayout={this.onLayout}
        onPress={this.onPress}
      >
        <Text style={this.getDayStyle()}>{date.format('ddd').toUpperCase()}</Text>
        <Text style={this.getDateStyle()}>{date.format('DD')}</Text>
      </TouchableOpacity>
    );
  }

}