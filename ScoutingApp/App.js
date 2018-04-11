import React, { Component } from 'react';
import { ScrollView, Button, View, Text, AppRegistry, TextInput, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "b57zJeLRQ1sAqIvoF06YmXsIc8Z0DD2uT8lMB6M9",
  authDomain: "viperbotsvalor.firebaseapp.com",
  projectId: 'viperbotsvalor',
  databaseURL: "https://viperbotsvalor.firebaseio.com",
  storageBucket: "gs://viperbotsvalor.appspot.com"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match_num: "",
      team_num: "",
      alliance: "",
      auto_line: "",
      auto_scale: "",
      auto_start: "",
      auto_switch: "",
      comments: "",
      defensive_rating: "",
      hang_attempt: false,
      hang_succeed: false,
      hang_time: "",
      host_succeed: false,
      teleop_opp_switch: "",
      teleop_scale: "",
      teleop_switch: "",
      teleop_vault: "",
      redStyle: "grey",
      blueStyle: "grey",
    }
    this.sendData = this.sendData.bind(this);
  }
  sendData() {
    const path = "Test/raw_results"
    const key = db.ref().child("Test/raw_results").push().key;
    let updates = {};
    updates["/"+key] = this.state;
    db.ref(path).update(updates);
    console.log(this.state); 
  }
  allianceColor(color) {
    if(color === "red") {
      this.setState({alliance: "red"});
    } else {
      this.setState({alliance: "blue"});
    }
  }
  startPos(side) {
    if(side === "left") {
      this.setState({auto_start: "left"});
    } else if(side === "middle") {
      this.setState({auto_start: "middle"});
    } else {
      this.setState({auto_start: "right"});
    }  
  }
  render() {
    let crossColor = this.state.auto_crossed ? "black" : "grey";
    let D1 = this.state.defensive_rating === "None" ? "black" : "grey";
    let D2 = this.state.defensive_rating === "Bad" ? "black" : "grey";
    let D3 = this.state.defensive_rating === "Poor" ? "black" : "grey";
    let D4 = this.state.defensive_rating === "Average" ? "black" : "grey";
    let D5 = this.state.defensive_rating === "Good" ? "black" : "grey";
    let D6 = this.state.defensive_rating === "Great" ? "black" : "grey";
    let H1 = "grey";
    let H2 = "grey";
    if(this.state.hang_succeed) {
      H1 = "black";
    }
    if(this.state.hang_attempt) {
      H2 = "black";
    }
    let H3 = this.state.host_succeed ? "black" : "grey";
    let leftStyle = "grey";
    let middleStyle = "grey";
    let rightStyle = "grey";
    if(this.state.auto_start === "left") {
      leftStyle = "black";
    } else if(this.state.auto_start === "middle") {
      middleStyle = "black";
    } else if(this.state.auto_start === "right") {
      rightStyle = "black";
    }
    let redStyle = "grey";
    let blueStyle = "grey";

    if(this.state.alliance === "red") {
      redStyle = "red";
    } else if(this.state.alliance === "blue") {
      blueStyle = "blue";
    } 

    return (
     <ScrollView>
        <View style={{padding: 30}}>
          <Text>General</Text>
        </View>
        <View>
          <Text> Match Number </Text>
          <TextInput style={styles.box} onChangeText={(text) => this.setState({match_num: text})} value={this.state.match_num}/>
        </View>
        <View>
          <Text> Team Number </Text>
          <TextInput style={styles.box} onChangeText={(text) => this.setState({team_num: text})} value={this.state.team_num}/>
        </View>
        <View>
          <Text> Alliance Color </Text>
          <Button
            onPress={() => this.allianceColor("red")}
            title="Red"
            color={redStyle}
          />
          <Button
            onPress={() => this.allianceColor("blue")}
            title="Blue"
            color={blueStyle}
          />
        </View>
        <View>        
          <Text style={{fontWeight: 'bold'}}> Autonomous </Text>
          <View>
            <Text> Start Position </Text>
            <Button
                onPress={() => this.startPos("left")}
                title="Left"
                color={leftStyle}
              />
             <Button
                onPress={() => this.startPos("middle")}
                title="Middle"
                color={middleStyle}
              />
              <Button
                onPress={() => this.startPos("right")}
                title="Right"
                color={rightStyle}
              />
            </View>
            <View> 
              <Text> Cubes in scale during Auto </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({auto_scale: text})} value={this.state.auto_scale}/>
            </View>
            <View> 
              <Text> Cubes in switch during Auto </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({auto_switch: text})} value={this.state.auto_switch}/>
            </View>
            <View>
              <Text> Line crossed </Text>
              <Button
                onPress={() => this.setState({auto_crossed: !this.state.auto_crossed})}
                title="Crossed"
                color={crossColor}             
              /> 
            </View>
          </View>
          <View>
            <Text> Teleop </Text>
            <View> 
              <Text> Cubes in scale during Teleop </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({teleop_scale: text})} value={this.state.teleop_scale}/>
            </View>
            <View> 
              <Text> Cubes in switch during Teleop </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({teleop_switch: text})} value={this.state.teleop_switch}/>
            </View>
            <View> 
              <Text> Cubes in Oppenents switch during Teleop </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({teleop_opp_switch: text})} value={this.state.teleop_opp_switch}/>
            </View>
            <View> 
              <Text> Cubes in vault during Teleop </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({teleop_vault: text})} value={this.state.teleop_vault}/>
            </View>    
            <View>
              <Text> Defence Rating </Text>
              <Button
                onPress={() => this.setState({defensive_rating: "None"})}
                title="None"
                color={D1}             
              />
              <Button
                onPress={() => this.setState({defensive_rating: "Bad"})}
                title="Bad"
                color={D2}             
              /> 
              <Button
                onPress={() => this.setState({defensive_rating: "Poor"})}
                title="Poor"
                color={D3}             
              /> 
              <Button
                onPress={() => this.setState({defensive_rating: "Average"})}
                title="Average"
                color={D4}             
              /> 
              <Button
                onPress={() => this.setState({defensive_rating: "Good"})}
                title="Good"
                color={D5}             
              /> 
              <Button
                onPress={() => this.setState({defensive_rating: "Great"})}
                title="Great"
                color={D6}             
              />
            </View>
          </View>
          <View>
            <Text> End </Text>
            <View>
              <Text> Hang </Text>
              <Button
                onPress={() => this.setState({hang_succeed: !this.state.hang_succeed})}
                title="Successfull"
                color={H1}             
              />   
              <Button
                onPress={() => this.setState({hang_attempt: !this.state.hang_attempt})}
                title="Attempt"
                color={H2}             
              />
              <Button
                onPress={() => this.setState({host_succeed: !this.state.host_succeed })}
                title="Host Succeed"
                color={H3}             
              />
              <View> 
                <Text> Hang Time </Text>
                <TextInput style={styles.box} onChangeText={(text) => this.setState({hang_time: text})} value={this.state.hang_time}/>
              </View> 
            </View>
            <View> 
              <Text> Comments </Text>
              <TextInput style={styles.box} onChangeText={(text) => this.setState({comments: text})} value={this.state.comments}/>
            </View>     
          </View>
          <View>
              <Button
                onPress={this.sendData}
                title="Submit"
                color={H2}             
              />
          </View>
        </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
            box: {
              borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40
  },
  noColorBox: {
    borderRadius: 4,
    borderWidth: 0.5,
    height: 40
  }
});

export const doCreateMatch = (
  alliance,
  auto_line,
  auto_scale,
  auto_start,
  auto_switch,
  comments,
  defensive_rating,
  hang_attempt,
  hang_succeed,
  hang_time,
  host_succeed,
  match_num,
  team_num,
  teleop_opp_switch,
  teleop_scale,
  teleop_switch,
  teleop_vault
) =>
  db.ref(`raw_data/${id}`).set({
    alliance,
    auto_line,
    auto_scale,
    auto_start,
    auto_switch,
    comments,
    defensive_rating,
    hang_attempt,
    hang_succeed,
    hang_time,
    host_succeed,
    match_num,
    team_num,
    teleop_opp_switch,
    teleop_scale,
    teleop_switch,
    teleop_vault  
  });




