import { TouchableOpacity, Text, View } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { Card } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { theme } from '../../theme';
import useTheme from '../../hooks/useTheme';
import useCustomStyles from 'app/hooks/useCustomStyles';

interface QuickActionButtonProps {
  onPress: () => void;
  iconName: string;
  text: string;
}

const QuickActionButton = ({
  onPress,
  iconName,
  text,
}: QuickActionButtonProps) => {
  const styles = useCustomStyles(loadStyles);
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Card style={styles.card}>
        <MaterialIcons
          name={iconName}
          size={24}
          color={theme.colors.iconColor}
          style={styles.icon}
        />
        <Text style={styles.text}>{text}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const loadStyles = (theme: any) => {
  const { currentTheme } = theme;
  return {
    container: {
      margin: 10,
    },
    card: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      backgroundColor: currentTheme.colors.primary,
    },
    icon: {
      marginBottom: 10,
    },
    text: {
      fontSize: 12,
      color: currentTheme.colors.iconColor,
    },
  };
};

export default QuickActionButton;
