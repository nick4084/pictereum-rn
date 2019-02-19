import React from 'react';
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';
import pictereum from '../../build/contracts/pictereum.json';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';
import { Card, ListItem, Button} from 'react-native-elements';
import FilePickerManager from 'react-native-file-picker';
import ipfs from '../utils/ipfs'; 
import buffer from 'base64-arraybuffer';
//import WebViewBridge from 'react-native-webview-bridge';
import { WebView } from 'react-native-webview';

const buf = require('buffer').Buffer;
const RNFS = require('react-native-fs');
const contract = require('truffle-contract');
//const simpleStorage = contract(SimpleStorageContract);
const pictereumContract = contract(pictereum); 

export default class Home extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
  };
  constructor() {
    super();

    this.state = {
      ipfsHash: 0,
      pendingipfsHash: 0,
      ownner: '',
      accounts: [],
      pictereumContractInstance: null
    };

    this.CheckOwner = this.CheckOwner.bind(this);
    this.UploadIpfs = this.UploadIpfs.bind(this);
    this.getpath = this.getpath.bind(this);
    this.getBlobSize = this.getBlobSize.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props && props.screenProps && props.screenProps.web3) {
      this.setState({
        pictereumContractInstance: null
      });

      this.instantiateContract(props.screenProps.web3);
    }
  }

  async instantiateContract(web3) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    pictereumContract.setProvider(web3.currentProvider);

    // Declaring this for later so we can chain functions on SimpleStorage.
    let pictereumContractInstance;

    try {

      pictereumContractInstance = await pictereumContract.at("0x3FA743Fdcc7D709F3D1b459CB111C4e02EE01363");
      //let storageValue = await simpleStorageInstance.get.call();
      this.setState({ pictereumContractInstance });
    } catch(error) {
      console.log(error);
    }
  }

  async CheckOwner() {
    try{
    this.setState({ loading: true });
    let { pictereumContractInstance, ipfsHash } = this.state;
    let { address } = this.props.screenProps;
    let ownner = await pictereumContractInstance.checkOwnnership( ipfsHash ); 
    //let ownner ="";
    if(ownner === "0x0000000000000000000000000000000000000000"){
          console.log('Hash is not ownned by anyone')
          this.setState({ ownner: ipfsHash +' Hash is not ownned by anyone' }); 
    } else{
          console.log('ownner: ', ownner)
          this.setState({ ownner: 'Hash is ownned by:' + ownner });        
    }
    //await simpleStorageInstance.set(pendingStorageValue, {from: address});
    //storageValue = await simpleStorageInstance.get.call({from: address});
    this.setState(ipfsHash: '')
    this.setState({ loading: false });
    } catch(error){
      this.setState({ loading: false });
      console.log(error);
    }
    // Update state with the result.
    //this.setState({ storageValue: storageValue.c[0], loading: false });  
  }

  async UploadIpfs(){
    try{
      let { pictereumContractInstance } = this.state;
      let { address } = this.props.screenProps;

      await this.getBlobSize()
      console.log(buf.from(buffer.decode(this.state.blob)));
      //ipfs.add( buf.from(buffer.decode(this.state.blob)) , (error, result)=> {
      //ipfs.addFromFs( this.state.picture.path , (error, result)=> {
        //if(error){
         // console.log(error);
         // return
       // }
       // console.log(result);
      //});
    //} catch(e){
     // console.log(e);
    //}
    let content = buf.from('ABC');
    let results = await ipfs.files.add(content);
    let hash = results[0].hash;
    console.log(hash);

    
    
    } catch(e){
     console.log(e);

  }
}

  getBlobSize = async () => {
    //console.log('reading from:\t' + this.state.picture.path);
    RNFS.readFile(this.state.picture.path, 'base64').then((data) => {
      //console.log("found:\t" + this.state.picture.path)
      this.setState({blob: data});
        //console.log(data);
    }).catch((err) => console.error(err));
  }


  getpath(){
  /*FilePickerManager.showFilePicker(null, (response) => {
    console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else {
    this.setState({
      file: response,
      picture: response
    });
  }
  });
  */
  //this.webview.postMessage("Hello from RN");
  }

  onMessage(){
    console.log(JSON.parse(message.nativeEvent.data));
  }

  render() {
      const { picture } = this.state;
    return (
      <ScrollView>
        <Card>
          <Text>Picture uploaded to IPFS will be recorded on the Ethereum blockchain</Text>  
        </Card>
        <Card title="Info">
          <Text>Current Address: {this.props.screenProps.address}</Text>
        </Card>
        <Card title="Upload">
          <WebView 
            ref="webview"
            onMessage={this.onMessage}
            source={{ uri: "http://10.0.2.2:3000" }}
            style={{ width: 300, height: 300, marginTop: 10, marginBottom:10, alignItems: 'center', justifyContent: 'center' }}/>

          <Button
            onPress={this.getpath}
            title="Choose File"
            /> 
          {
          this.state.loadingUpload ?
            (<ActivityIndicator
             animating = {this.state.loadingUpload}
             style = {styles.activityIndicator}/>) :
            (<Button
            onPress={this.UploadIpfs}
            title="upload"
            accessibilityLabel="Upload"
            />)
        }
        </Card>
        <Card>
          <TextInput
          style={{height: 40}}
          placeholder="Check IPFS Hash ownner!"/>
          <Text>{this.state.ownner}</Text>
        {
          this.state.loading ?
            (<ActivityIndicator
             animating = {this.state.loading}
             style = {styles.activityIndicator}/>) :
            (<Button
            onPress={this.CheckOwner}
            title="Check"
            accessibilityLabel="Check!"
            />)
        }
        </Card>
        <Card>
          <Text>Current network: {this.props.screenProps.network.name}</Text>
          <Text>URL: {this.props.screenProps.network.url}</Text>
          <Button
            onPress={() => this.props.navigation.navigate('Network')}
            title="Choose Network"
            /> 
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  }
});


/*

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {picture && (
          <Image
            source={{ uri: picture.uri }}
            style={{ width: 300, height: 300 }}
          />
          )}
          </View>



*/
