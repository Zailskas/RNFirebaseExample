import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Alert} from 'react-native';
import {Card, Button, Input, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {signin} from '../../store/actions/authAction';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
);

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
    };
  }
  emailChange(email) {
    if (email.length <= 0 || !emailRegex.test(this.state.email)) {
      this.setState({email});
      this.emailErrorChange(true);
    } else {
      this.setState({email});
      this.emailErrorChange(false);
    }
  }
  passwordChange(password) {
    if (password.length < 3) {
      this.setState({password});
      this.passwordErrorChange(true);
    } else {
      this.setState({password});
      this.passwordErrorChange(false);
    }
  }
  emailErrorChange = (text) => {
    this.setState({emailError: text});
  };
  passwordErrorChange = (text) => {
    this.setState({passwordError: text});
  };
  handleSubmit = () => {
    this.props.signin(this.state.email, this.state.password, () => {
      if (this.props.login.isLoggedIn === true) {
        this.props.navigation.navigate('PrivatePage');
      } else {
        Alert.alert('Wrong credentials');
      }
    });
    //if (this.props.message)
    this.emailInput.clear();
    this.passwordInput.clear();
  };
  /*handleSubmit = () => {
    this.props.loginUser(this.state.username, this.state.password, () => {
      console.log('Login ' + this.props.login.isLoggedIn);
      if (this.props.login.isLoggedIn === true) {
        this.props.navigation.navigate('PrivatePage');
      } else {
        Alert.alert('Wrong credentials');
      }
    });
    //if (this.props.message)
  };*/
  //this.props.navigation.navigate('PrivatePage')

  render() {
    return (
      <View style={styles.Container}>
        <Card>
          <Input
            label="Your Email  Address"
            placeholder="email@address.com"
            leftIcon={{type: 'font-awesome', name: 'envelope'}}
            onChangeText={(text) => this.emailChange(text)}
            errorMessage={this.state.emailError ? 'Invalid email' : null}
            ref={(input) => {
              this.emailInput = input;
            }}
          />
          <Input
            label="Password"
            placeholder="Enter password"
            leftIcon={{type: 'font-awesome', name: 'lock'}}
            onChangeText={(text) => this.passwordChange(text)}
            secureTextEntry={true}
            errorMessage={
              this.state.passwordError
                ? 'Password must contain at least 3 characters'
                : null
            }
            ref={(input) => {
              this.passwordInput = input;
            }}
          />
          <Button title="LOGIN" onPress={this.handleSubmit} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register_page')}>
            <Text>No account? Create one !!!</Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
});
const mapStateToProps = (state) => {
  return {
    login: state.isLogged,
  };
};
export default connect(mapStateToProps, {signin})(LoginPage);
