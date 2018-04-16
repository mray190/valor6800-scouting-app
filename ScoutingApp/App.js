import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  TouchableHighlight as defaultTouchableHighlight,
  ScrollView,
  Button as defaultButton,
  View as defaultView,
  Text as defaultText,
  AppRegistry,
  TextInput as defaultTextInput,
  StyleSheet,
} from 'react-native';
import * as firebase from 'firebase';
import styled from 'styled-components';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'b57zJeLRQ1sAqIvoF06YmXsIc8Z0DD2uT8lMB6M9',
  authDomain: 'viperbotsvalor.firebaseapp.com',
  projectId: 'viperbotsvalor',
  databaseURL: 'https://viperbotsvalor.firebaseio.com',
  storageBucket: 'gs://viperbotsvalor.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

const Text = styled(defaultText)``;

const Heading = styled(defaultText)`
  font-weight: bold;
  font-size: 20;
  padding-top: 20;
`;

const Count = styled(defaultText)`
  font-size: 20;
  font-weight: bold;
  padding-bottom: 10;
`;

const Button = styled(defaultTouchableHighlight)`
  elevation: 4;
  border-radius: 2;
  width: 200;
  height: 50;
  flex-direction: column;
  align-items: center;
`;

const PlusButton = styled(defaultTouchableHighlight)`
  elevation: 4;
  border-radius: 2;
  width: 100;
  height: 60;
  flex-direction: column;
  align-items: center;
  background-color: grey;
`;

const MinusButton = styled(defaultTouchableHighlight)`
  elevation: 4;
  border-radius: 2;
  width: 100;
  height: 60;
  flex-direction: column;
  align-items: center;
  background-color: grey;
`;

const PlusMinusText = styled(defaultText)`
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 30;
  padding-top: 5;
`;

const ButtonText = styled(defaultText)`
  color: white;
  padding-top: 10;
  padding-bottom: 10;
  font-weight: 500;
  font-size: 17;
`;

const TextInput = styled(defaultTextInput)`
  border-color: grey;
  border-width: 2;
  font-size: 25;
  width: 100;
  padding-left: 10;
`;

const Comments = styled(defaultTextInput)`
  border-color: grey;
  border-width: 2;
  font-size: 15;
  width: 400;
  padding-left: 10;
`;

const Row = styled(defaultView)`
  padding-left: 30;
  padding-right: 30;
  padding-bottom: 20;
  flex-direction: row;
`;

const Col = styled(defaultView)`
  padding-right: 10;
  padding-left: 10;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledCol = styled(defaultView)`
  padding-right: 10;
  padding-left: 10;
  width: 100;
`;

const MyButton = styled(defaultView)``;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match_num: '',
      team_num: '',
      alliance: '',
      auto_line: '',
      auto_scale: 0,
      auto_start: '',
      auto_switch: 0,
      comments: '',
      defensive_rating: '',
      hang_attempt: false,
      hang_succeed: false,
      hang_time: '',
      host_succeed: false,
      teleop_opp_switch: 0,
      teleop_scale: 0,
      teleop_switch: 0,
      teleop_vault: 0,
    };
    this.sendData = this.sendData.bind(this);
  }
  sendData() {
    const path = 'Test/raw_results';
    const key = db
      .ref()
      .child('Test/raw_results')
      .push().key;
    let updates = {};
    updates['/' + key] = this.state;
    db.ref(path).update(updates);
  }
  allianceColor(color) {
    if (color === 'red') {
      this.setState({alliance: 'red'});
    } else {
      this.setState({alliance: 'blue'});
    }
  }
  startPos(side) {
    if (side === 'left') {
      this.setState({auto_start: 'left'});
    } else if (side === 'middle') {
      this.setState({auto_start: 'middle'});
    } else {
      this.setState({auto_start: 'right'});
    }
  }
  render() {
    let crossColor = this.state.auto_crossed
      ? {backgroundColor: 'green'}
      : {backgroundColor: 'grey'};
    let D1 =
      this.state.defensive_rating === 'None'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let D2 =
      this.state.defensive_rating === 'Bad'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let D3 =
      this.state.defensive_rating === 'Poor'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let D4 =
      this.state.defensive_rating === 'Average'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let D5 =
      this.state.defensive_rating === 'Good'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let D6 =
      this.state.defensive_rating === 'Great'
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'grey'};
    let H1 = {backgroundColor: 'grey'};
    let H2 = {backgroundColor: 'grey'};
    if (this.state.hang_succeed) {
      H1 = {backgroundColor: 'green'};
    }
    if (this.state.hang_attempt) {
      H2 = {backgroundColor: 'green'};
    }
    let H3 = this.state.host_succeed
      ? {backgroundColor: 'green'}
      : {backgroundColor: 'grey'};
    let leftStyle = {backgroundColor: 'grey'};
    let middleStyle = {backgroundColor: 'grey'};
    let rightStyle = {backgroundColor: 'grey'};
    if (this.state.auto_start === 'left') {
      leftStyle.backgroundColor = 'green';
    } else if (this.state.auto_start === 'middle') {
      middleStyle.backgroundColor = 'green';
    } else if (this.state.auto_start === 'right') {
      rightStyle.backgroundColor = 'green';
    }
    let redStyle = {backgroundColor: 'grey'};
    let blueStyle = {backgroundColor: 'grey'};

    if (this.state.alliance === 'red') {
      redStyle.backgroundColor = 'red';
    } else if (this.state.alliance === 'blue') {
      blueStyle.backgroundColor = 'blue';
    }

    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
        <ScrollView>
          <Row>
            <Heading>General</Heading>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Text> Match Number </Text>
                  <TextInput
                    onChangeText={text => this.setState({match_num: text})}
                    keyboardType="numeric"
                    value={this.state.match_num}
                    underlineColorAndroid={'transparent'}
                  />
                </Col>
                <Col>
                  <Text> Team Number </Text>
                  <TextInput
                    onChangeText={text => this.setState({team_num: text})}
                    keyboardType="numeric"
                    value={this.state.team_num}
                    underlineColorAndroid={'transparent'}
                  />
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Text> Alliance Color: </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    style={redStyle}
                    onPress={() => this.allianceColor('red')}
                    underlayColor="red">
                    <ButtonText> RED </ButtonText>
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => this.allianceColor('blue')}
                    uderlayColor="blue"
                    style={blueStyle}>
                    <ButtonText> BLUE </ButtonText>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Heading> Autonomous </Heading>
          </Row>
          <Row>
            <Text> Start Position </Text>
            <Col>
              <Button onPress={() => this.startPos('left')} style={leftStyle}>
                <ButtonText> LEFT </ButtonText>
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() => this.startPos('middle')}
                style={middleStyle}>
                <ButtonText> MIDDLE </ButtonText>
              </Button>
            </Col>
            <Col>
              <Button onPress={() => this.startPos('right')} style={rightStyle}>
                <ButtonText> RIGHT </ButtonText>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Text> Cubes in scale during Auto </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({auto_scale: this.state.auto_scale - 1})
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.auto_scale} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({auto_scale: this.state.auto_scale + 1})
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Text> Cubes in switch during Auto </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({auto_switch: this.state.auto_switch - 1})
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.auto_switch} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({auto_switch: this.state.auto_switch + 1})
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Text> Line crossed </Text>
            <Col>
              <Button
                onPress={() =>
                  this.setState({auto_crossed: !this.state.auto_crossed})
                }
                style={crossColor}>
                <ButtonText> CROSSED </ButtonText>
              </Button>
            </Col>
          </Row>
          <Row>
            <Heading> Teleop </Heading>
          </Row>
          <Row>
            <Col>
              <Row>
                <Text> Cubes in Scale during Teleop </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({teleop_scale: this.state.teleop_scale - 1})
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.teleop_scale} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({teleop_scale: this.state.teleop_scale + 1})
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Text> Cubes in Switch during Teleop </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({
                        teleop_switch: this.state.teleop_switch - 1,
                      })
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.teleop_switch} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({
                        teleop_switch: this.state.teleop_switch + 1,
                      })
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Text> Cubes in Oppenents Switch during Teleop </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({
                        teleop_opp_switch: this.state.teleop_opp_switch - 1,
                      })
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.teleop_opp_switch} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({
                        teleop_opp_switch: this.state.teleop_opp_switch + 1,
                      })
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Text> Cubes in Vault during Teleop </Text>
              </Row>
              <Row>
                <Col>
                  <MinusButton
                    onPress={() =>
                      this.setState({
                        teleop_switch: this.state.teleop_vault - 1,
                      })
                    }>
                    <PlusMinusText> - </PlusMinusText>
                  </MinusButton>
                </Col>
                <Col>
                  <Count> {this.state.teleop_vault} </Count>
                </Col>
                <Col>
                  <PlusButton
                    onPress={() =>
                      this.setState({teleop_vault: this.state.teleop_vault + 1})
                    }>
                    <PlusMinusText> + </PlusMinusText>
                  </PlusButton>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Heading> Defence Rating </Heading>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'None'})}
                    style={D1}>
                    <ButtonText> NONE </ButtonText>
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'Bad'})}
                    style={D2}>
                    <ButtonText> BAD </ButtonText>
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'Poor'})}
                    style={D3}>
                    <ButtonText> POOR </ButtonText>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'Average'})}
                    style={D4}>
                    <ButtonText> AVERAGE </ButtonText>
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'Good'})}
                    style={D5}>
                    <ButtonText> GOOD </ButtonText>
                  </Button>
                </Col>
                <Col>
                  <Button
                    onPress={() => this.setState({defensive_rating: 'Great'})}
                    style={D6}>
                    <ButtonText> GREAT </ButtonText>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Heading> Hang</Heading>
          </Row>
          <Row>
            <Col>
              <Button
                onPress={() =>
                  this.setState({hang_succeed: !this.state.hang_succeed})
                }
                style={H1}>
                <ButtonText> HANG SUCCESSFUL </ButtonText>
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() =>
                  this.setState({hang_attempt: !this.state.hang_attempt})
                }
                style={H2}>
                <ButtonText> HANG ATTEMPT </ButtonText>
              </Button>
            </Col>
            <Col>
              <Button
                onPress={() =>
                  this.setState({host_succeed: !this.state.host_succeed})
                }
                style={H3}>
                <ButtonText> HOST SUCCEED </ButtonText>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Text> Hang Time </Text>
              <TextInput
                keyboardType="numeric"
                onChangeText={text => this.setState({hang_time: text})}
                underlineColorAndroid={'transparent'}
                value={this.state.hang_time}
              />
            </Col>
          </Row>
          <Row>
            <Heading> Comments </Heading>
          </Row>
          <Row>
            <Col>
              <Comments
                underlineColorAndroid={'transparent'}
                multiline={true}
                numberOfLines={4}
                onChangeText={text => this.setState({comments: text})}
                value={this.state.comments}
              />
            </Col>
            <Col>
              <Button
                onPress={this.sendData}
                style={{backgroundColor: 'black'}}>
                <ButtonText> Submit </ButtonText>
              </Button>
            </Col>
          </Row>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

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
  teleop_vault,
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
    teleop_vault,
  });
