import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    // setCourseGoals(currentGoals => [...currentGoals, enteredGoal]); // -> refactor this to use flatList component
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { key: Date.now().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.key !== goalId);
    });
  };

  const cancelGoalAddtionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAddtionHandler}
      />
      <FlatList
        // keyExtractor={(item, index) => item.key} -> use if key prop is not present in the object, by default key is automatically extracted
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.key}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
      {/* use ScrollView only in case of small list, use flatList in case of infinite list */}
      {/* <ScrollView>
        {courseGoals.map(goal => (
          <View style={styles.listItem} key={goal}>
            <Text>{goal}</Text>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
