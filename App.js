import React, { Component } from 'react';
import { Picker,BackHandler,DeviceEventEmitter,Dimensions,ScrollView,PixelRatio,TouchableHighlight,StyleSheet, Platform, View, Image, Text, TextInput, TouchableOpacity, Alert, YellowBox } from 'react-native';
var Realm = require('realm');
let realm ;
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Communications from 'react-native-communications';
import Toast, {DURATION} from 'react-native-easy-toast';
import { TextField } from 'react-native-material-textfield';

import {ListView} from 'realm/react-native';

import ImageZoom from 'react-native-image-pan-zoom';
import Geocoder from 'react-native-geocoding';
import {requestPermission,checkPermission} from 'react-native-android-permissions';
class ShowDataActivity extends Component
{
  static navigationOptions =
  {
     title: 'Person Directory',
     headerLeft: null,
     headerStyle:{
      backgroundColor: 'blue'
   },
      headerTitleStyle:{
      alignSelf:'center',
}
};
  getState(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let mydata = realm.objects('Employee_Info').sorted('employee_id');
    return{
      dataSource: ds.cloneWithRows(mydata)
    };}
 
  constructor(props) {
 
    super(props);
    realm = new Realm({
      schema: [{name: 'Employee_Info', 
      properties: 
      {
        employee_id: {type: 'int',   default: 0},
        employee_firstname: 'string', 
        employee_lastname: 'string',
        employee_email: 'string',
        employee_phone: 'string',
        employee_fathername: 'string',
        employee_address_country: 'string',
        employee_address_state: 'string',
        employee_address_city: 'string',
        employee_address_postalcode: 'string',
        employee_address_streetaddress: 'string',
        employee_address_apartmentnumber: 'string',
        employee_image: 'string',
      }}]
    });
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
 
   var mydata = realm.objects('Employee_Info').sorted('employee_id');
 
   this.state = this.getState();
    realm.addListener('change',() => {
      this.setState({dataSource:this.state.dataSource.cloneWithRows(mydata)})
    });
  
  }
  GoToEditActivity ( employee_id,employee_firstname,employee_lastname,employee_email,employee_phone,employee_fathername,employee_address_country,employee_address_state,employee_address_city,employee_address_postalcode,employee_address_streetaddress,employee_address_apartmentnumber,employee_image) {

    this.props.navigation.navigate('First', { 
 
      ID : employee_id,
      FIRSTNAME : employee_firstname,
      LASTNAME : employee_lastname,
      EMAIL : employee_email,
      PHONE : employee_phone,
      FATHERNAME : employee_fathername,
      COUNTRY : employee_address_country,
      STATE : employee_address_state,
      CITY : employee_address_city,
      POSTALCODE : employee_address_postalcode,
      STREETADDRESS : employee_address_streetaddress,
      APARTMENTNUMBER : employee_address_apartmentnumber,
      IMAGE : employee_image

    });}
    GoToAddActivity (employee_id,employee_firstname,employee_lastname,employee_email,employee_phone,employee_fathername,employee_address_country,employee_address_state,employee_address_city,employee_address_postalcode,employee_address_streetaddress,employee_address_apartmentnumber,employee_image) {

    this.props.navigation.navigate('First', { 
      ID : employee_id,
 
      FIRSTNAME : employee_firstname,
      LASTNAME : employee_lastname,
      EMAIL : employee_email,
      PHONE : employee_phone,
      FATHERNAME : employee_fathername,
      COUNTRY : employee_address_country,
      STATE : employee_address_state,
      CITY : employee_address_city,
      POSTALCODE : employee_address_postalcode,
      STREETADDRESS : employee_address_streetaddress,
      APARTMENTNUMBER : employee_address_apartmentnumber,
      IMAGE : employee_image

    });}
     
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

 
  render()
  {
 
     return(
        <View style = { styles.MainContainer }>
 
            <ListView
            
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            RefreshList={this.onRefreshList}
            renderSeparator= {this.ListViewItemSeparator}
           
 
            renderRow={(rowData) => <View style={{flex:1, /*flexDirection: 'row',*/

            }} >
 
                      <TouchableOpacity onPress={this.GoToEditActivity.bind(this, rowData.employee_id,rowData.employee_firstname,rowData.employee_lastname,rowData.employee_email,rowData.employee_phone,rowData.employee_fathername,rowData.employee_address_country,rowData.employee_address_state,rowData.employee_address_city,rowData.employee_address_postalcode,rowData.employee_address_streetaddress,rowData.employee_address_apartmentnumber,rowData.employee_image)} >
                      <View style={styles.ganesh}>

                      <Image style={styles.ImagesContainer} source={{uri: rowData.employee_image}} />

                      
                      <View>

                
              
                      <Text style={styles.textViewContainer} >{ rowData.employee_firstname +' '+ rowData.employee_lastname}</Text>
              
                     <Text style={styles.textViewContainer} >{rowData.employee_phone}</Text>
                      </View>

                     
                      </View>
              
                      </TouchableOpacity>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                       
                    <TouchableOpacity onPress={() => Communications.phonecall(rowData.employee_phone, true)}>
          <View style={{padding:15}}>
            <Image style={{
              width:40,
              height:40,
     
     

    }} source={{uri:'https://lh3.googleusercontent.com/LsYpvhaEk0UCtFerm51IiXBrjRb0nrspJgpSG16CzbPfMUltqQ04MVYSTOYWGqDaYgJVE6qYOoVmtolIpYThk1mJsg=s1024'}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.email([rowData.employee_email,rowData.employee_email],null,null,'','')}>
          <View style={{padding:15}}>
            <Image style={{
      width:40,
      height:40,
      

    }} source={{uri:'https://lh3.googleusercontent.com/tpdKOxTJgzasn02WJ1Snj-qFDI907rwmsVSyYL4Ge-QZ6pL8KO-48wDpipYUyR-s7rRYzN5IGZZ5kiZteTObpSSqKCA=s1024'}} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Communications.text(rowData.employee_phone)}>
          <View style={{padding:15}}>
            <Image style={{
      width:40,
      height:40,
      

    }} source={{uri:'https://lh3.googleusercontent.com/VBaYbxBs9-xd8dSzI0KpEKlYb0LZbc07J8jBivPAhMCL-kD1l3gI6aAvp8R7SWXK_cYmvHYSbhGPtJTQKEqkWTlRLQ=s1024'}} />
          </View>
        </TouchableOpacity>
        </View>
       </View> 
              
            }
 
            />
            <View>
                   <TouchableHighlight style={styles.addButton}
                                       underlayColor='#1e3647' onPress={this.GoToAddActivity.bind(this,realm.objects('Employee_Info').length,'','','','','','','','','','','','https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024')}>
                       <Text style={{fontSize: 60, color: 'white',alignSelf:'center'}}  >+</Text>
                   </TouchableHighlight>
            </View>

 
        </View>
     );
  }
}
class MainActivity extends Component{
  static navigationOptions = {
    header: null,
  };
  GoToSecondActivity = () =>
  {
     this.props.navigation.navigate('Second');
  }
  constructor(){
    super();
    this.state = {
      Employee_Id:'',
      Employee_FirstName : '',
      Employee_LastName : '',
      Employee_Email : '',
      Employee_Phone : '',
      Employee_FatherName:'',
      Employee_COUNTRY : '',
      Employee_STATE : '',
      Employee_CITY : '',
      Employee_POSTALCODE : '',
      Employee_STREETADDRESS : '',
      Employee_APARTMENTNUMBER : '',
      Image_Source: 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024',
      latitude:null,
      longitude:null,
  }
  YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
     ]);
     }


  Cancel_Employee=()=>{
   this.setState({ 
      
      Employee_Id:this.props.navigation.state.params.ID,
      Employee_FirstName : this.props.navigation.state.params.FIRSTNAME,
      Employee_LastName : this.props.navigation.state.params.LASTNAME,
      Employee_Email : this.props.navigation.state.params.EMAIL,
      Employee_Phone : this.props.navigation.state.params.PHONE,
      Employee_FatherName:this.props.navigation.state.params.FATHERNAME,
      Employee_COUNTRY : this.props.navigation.state.params.COUNTRY,
      Employee_STATE : this.props.navigation.state.params.STATE,
      Employee_CITY : this.props.navigation.state.params.CITY,
      Employee_POSTALCODE : this.props.navigation.state.params.POSTALCODE,
      Employee_STREETADDRESS :this.props.navigation.state.params.STREETADDRESS,
      Employee_APARTMENTNUMBER : this.props.navigation.state.params.APARTMENTNUMBER,
      Image_Source:this.props.navigation.state.params.IMAGE
    })


  }
  componentWillMount(){
   this.setState({ 
      Employee_Id:this.props.navigation.state.params.ID,
      Employee_FirstName : this.props.navigation.state.params.FIRSTNAME,
      Employee_LastName : this.props.navigation.state.params.LASTNAME,
      Employee_Email : this.props.navigation.state.params.EMAIL,
      Employee_Phone : this.props.navigation.state.params.PHONE,
      Employee_FatherName:this.props.navigation.state.params.FATHERNAME,
      Employee_COUNTRY : this.props.navigation.state.params.COUNTRY,
      Employee_STATE : this.props.navigation.state.params.STATE,
      Employee_CITY : this.props.navigation.state.params.CITY,
      Employee_POSTALCODE : this.props.navigation.state.params.POSTALCODE,
      Employee_STREETADDRESS :this.props.navigation.state.params.STREETADDRESS,
      Employee_APARTMENTNUMBER : this.props.navigation.state.params.APARTMENTNUMBER,
      Image_Source:this.props.navigation.state.params.IMAGE
    })
   
   }
   Update_Employee=()=>{
   
   if(this.state.Employee_FirstName == '')
   {
      Alert.alert("Please enter First Name.");
   }
   else if(this.state.Employee_LastName == ''){
    Alert.alert("Please enter Last Name.");

   }
  
   else{
     realm.write(() => {

       var ID = this.state.Employee_Id - 1;

       var obj = realm.objects('Employee_Info');

       obj[ID].employee_firstname = this.state.Employee_FirstName;
       obj[ID].employee_lastname= this.state.Employee_LastName; 
       obj[ID].employee_email = this.state.Employee_Email;
       obj[ID].employee_phone = this.state.Employee_Phone;
       obj[ID].employee_fathername = this.state.Employee_FatherName;
       obj[ID].employee_address_country= this.state.Employee_COUNTRY,
        obj[ID].employee_address_state= this.state.Employee_STATE,
        obj[ID].employee_address_city= this.state.Employee_CITY,
        obj[ID].employee_address_postalcode= this.state.Employee_POSTALCODE,
        obj[ID].employee_address_streetaddress= this.state.Employee_STREETADDRESS,
        obj[ID].employee_address_apartmentnumber= this.state.Employee_APARTMENTNUMBER,
       obj[ID].employee_image = this.state.Image_Source;

      });
       this.refs.toast.show('Employee Saved', 200, () => {
        this.setState({
         Employee_Id:'',
      Employee_FirstName : '',
      Employee_LastName : '',
      Employee_Email : '',
      Employee_Phone : '',
      Employee_FatherName:'',
      Employee_COUNTRY : '',
      Employee_STATE : '',
      Employee_CITY : '',
      Employee_POSTALCODE : '',
      Employee_STREETADDRESS : '',
      Employee_APARTMENTNUMBER : '',
      Image_Source: 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024'
    })
       this.props.navigation.navigate('Second');
    });
     }
   }
 Delete_alert=()=>{
  Alert.alert(
  'Confirm Delete',
  'Are you sure you want to delete this employee',
  [
    {text: 'Delete', onPress: () => {

    realm.write(() => {

      var ID = this.state.Employee_Id - 1;
 
     realm.delete(realm.objects('Employee_Info')[ID]);

     for(i=1;i<=realm.objects('Employee_Info').length;i++){

      realm.objects('Employee_Info')[i-1].employee_id = i
     }
 });
    this.refs.toast.show('Employee Deleted', 200, () => {
      this.props.navigation.navigate('Second');
        // something you want to do at close
    });

   
 
  }},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
  ],
  { cancelable: false }
)

}
    Create_Employee=()=>{


    if(this.state.Employee_FirstName == '')
   {
      Alert.alert("Please enter First Name.");
   }
   else if(this.state.Employee_LastName == ''){
    Alert.alert("Please enter Last Name.");

   }
  
 else{

     realm.write(() => {
     var ID = this.state.Employee_Id + 1;
       realm.create('Employee_Info', {
         employee_id: ID, 
         employee_firstname: this.state.Employee_FirstName, 
         employee_lastname: this.state.Employee_LastName, 
         employee_email : this.state.Employee_Email,
         employee_phone : this.state.Employee_Phone,
         employee_fathername : this.state.Employee_FatherName,
         employee_address_country: this.state.Employee_COUNTRY,
        employee_address_state: this.state.Employee_STATE,
        employee_address_city: this.state.Employee_CITY,
        employee_address_postalcode: this.state.Employee_POSTALCODE,
        employee_address_streetaddress: this.state.Employee_STREETADDRESS,
        employee_address_apartmentnumber: this.state.Employee_APARTMENTNUMBER,
         employee_image : this.state.Image_Source
        });
   });
       this.refs.toast.show('Employee Details saved', 200, () => {
        this.setState({ 
      Employee_FirstName : this.props.navigation.state.params.FIRSTNAME,
      Employee_LastName : this.props.navigation.state.params.LASTNAME,
      Employee_Email : this.props.navigation.state.params.EMAIL,
      Employee_Phone : this.props.navigation.state.params.PHONE,
      Employee_FatherName:this.props.navigation.state.params.FATHERNAME,
      Employee_COUNTRY : this.props.navigation.state.params.COUNTRY,
      Employee_STATE : this.props.navigation.state.params.STATE,
      Employee_CITY : this.props.navigation.state.params.CITY,
      Employee_POSTALCODE : this.props.navigation.state.params.POSTALCODE,
      Employee_STREETADDRESS :this.props.navigation.state.params.STREETADDRESS,
      Employee_APARTMENTNUMBER : this.props.navigation.state.params.APARTMENTNUMBER,
      Image_Source:this.props.navigation.state.params.IMAGE
    })
     this.props.navigation.navigate('Second');
        // something you want to do at close
    });
     
   }
 
  }
     GoToImageActivity (employee_image) {
    if(employee_image == 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024'){
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
           let source =  response.uri ; 
  
          this.setState({

            Image_Source: source

          });
        }
      });
    }
    else{
      this.props.navigation.navigate('Fourth', { 
 
      IMAGE : employee_image

    });

    }

    }
         showheader_header = () => {
        if (this.props.navigation.state.params.FIRSTNAME == '' && this.props.navigation.state.params.LASTNAME =='' ) {
            return (
                 <View style={styles.header}>
                 <TouchableOpacity onPress={ this.GoToSecondActivity}>
                    <View style={{paddingHorizontal:10}}>
                      <Image style={{ width:40,height:40}} source={{uri:'https://lh3.googleusercontent.com/cf4onbPhuhLqLIKxgzqdSGaYOXpi9757g6I8_fcDW5Gt8uGuHorXEe1ALlP5Mzn_nymYDQIKhap1NMmNpaiuU1bMLA=s1024'}} />
                    </View>
                </TouchableOpacity>
                <View style={styles.whitespace}>
                <Text style={styles.title}>Add Person</Text></View>
                <TouchableOpacity onPress={this.Create_Employee}>
                    <View style={{paddingHorizontal:10}}>
                      <Image style={{width:40,height:40}} source={{uri:'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024'}} />
                    </View>
                </TouchableOpacity>
                 
                <TouchableOpacity onPress={this.Cancel_Employee}>
                    <View style={{paddingHorizontal:10}}>
                        <Image style={{width:40,height:40}} source={{uri:'https://lh3.googleusercontent.com/MmQUPVTdaMuyTWuXRnGKbLzbNshTBN1zr3q5jOxSXUWZS4rAJJ8zwExsytuNByGu3g9Akbgtrq2ysLRfYpknsdIkLg=s1024'}} />
                    </View>
                </TouchableOpacity>
                </View>
                
            );
        } else {
            return (
              <View style={styles.header}>
                <TouchableOpacity onPress={ this.GoToSecondActivity}>
                    <View style={{paddingHorizontal:10}}>
                        
                        <Image style={{

      width:40,
      height:40

    }} source={{uri:'https://lh3.googleusercontent.com/cf4onbPhuhLqLIKxgzqdSGaYOXpi9757g6I8_fcDW5Gt8uGuHorXEe1ALlP5Mzn_nymYDQIKhap1NMmNpaiuU1bMLA=s1024'}} />
                    </View>
                </TouchableOpacity>
                
               
                <View style={styles.whitespace}>
                <Text style={{fontSize:20,fontWeight: 'bold'}}>Update Person</Text></View>
                <TouchableOpacity
                    
                    
                    onPress={this.Delete_alert}
                >
                    <View style={{paddingHorizontal:10}}>
                        
                        <Image style={{
      width:40,
      height:40

    }} source={{uri:'https://lh3.googleusercontent.com/Hyqd6on3-bOQjI9kqfXreq4FM7yqPl4NZJjhixamVjzed6JTEdRTc6mhY-syc65R5XkokbJwT39ktlUWCKYDsHJa=s1024'}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    
                    
                    onPress={this.Update_Employee}
                >
                    <View style={{paddingHorizontal:10}}>
                        
                        <Image style={{
      width:40,
      height:40

    }} source={{uri:'https://lh3.googleusercontent.com/9ZHLjA-PkUZLolpB3ubiuQWKNzth8BTeyTKF00ItsWDT79PIhqGRkmSm9iLNnqQyPZPV3UmIs3k51gBuoAmUKfQSrw=s1024'}} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    
                    
                    onPress={this.Cancel_Employee}
                >
                    <View style={{paddingHorizontal:10}}>
                        
                         <Image style={{
      width:40,
      height:40

    }} source={{uri:'https://lh3.googleusercontent.com/MmQUPVTdaMuyTWuXRnGKbLzbNshTBN1zr3q5jOxSXUWZS4rAJJ8zwExsytuNByGu3g9Akbgtrq2ysLRfYpknsdIkLg=s1024'}} />
                    </View>
                </TouchableOpacity>
            </View>


              );
        }
    }

     showimage_image = () => {
        if (this.state.Image_Source == 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024') {
            return (
            <TouchableOpacity onPress={this.GoToImageActivity.bind(this,this.state.Image_Source)}>
            <View style={styles.ImageContainer}>

            
              <Image style={styles.ImageContainer} source={{uri: this.state.Image_Source}} />
            

            </View>

            </TouchableOpacity>
                
            );
        } else {
            return (
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
               <TouchableOpacity onPress={this.GoToImageActivity.bind(this,this.state.Image_Source)}>
               <View style={styles.ImageContainer}>

            
              <Image style={styles.ImageContainer} source={{uri: this.state.Image_Source}} />
            

            </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={this.Clear_Image}>
         

                    <View style={{paddingHorizontal:30,justifyContent:'center',alignItems:'center'}}>
                        
                        <Image style={{
      width:60,
      height:60

    }} source={{uri:'https://lh3.googleusercontent.com/Hyqd6on3-bOQjI9kqfXreq4FM7yqPl4NZJjhixamVjzed6JTEdRTc6mhY-syc65R5XkokbJwT39ktlUWCKYDsHJa=s1024'}} />
                    <Text style={{fontSize:20}}>Delete</Text>
                    </View>
               
            
            </TouchableOpacity></View>


              );
        }
    }
  Clear_Image=()=>{
   this.setState({ 
      
     
      Image_Source: 'https://lh3.googleusercontent.com/0Kgou0TtfKxvX2wPezXfbZwxmR6qAWEdemPNB57dQrjyRHC42cIPzEbESf2PDcJCc7WGO79dwsnCq-_6XaHnhmKyZJ8=s1024',
    })


  }
  validateemail = (text) => {
  let reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(reg.test(text) === true)
  {
   this.setState({Employee_Email:text})
    
  }
}
validatephone = (text) => {
  let reg = /^\d{10}$/ ;
  if(reg.test(text) === true)
  {
   this.setState({Employee_Phone:text})
  }
}
getlatlong(){
  navigator.geolocation.getCurrentPosition((position) => {
                 var lat = parseFloat(position.coords.latitude)
                 var long =parseFloat(position.coords.longitude)
                this.setState({ 
                 latitude:lat,
                longitude : long,
              })   
               Geocoder.setApiKey('AIzaSyBG-xFfVfilofGW35T82DCVXubdIo7tDwM');
    Geocoder.from(this.state.latitude,this.state.longitude).then(
      json => {
        var address_component = json.results[0].formatted_address.split(',');
        STREETADDRESS = '';
        for( i=1;i <= address_component.length - 4;i++){
          STREETADDRESS = STREETADDRESS+address_component[i]+',';
        }
        if(address_component[address_component.length-3] == 'AP'){
          cityaddress_1 = 'Andhra Pradesh'
        }
        else if(address_component[address_component.length-3] == 'AR'){
          cityaddress_1 = 'Arunachal Pradesh'
        }
        else if(address_component[address_component.length-3] == 'AS'){
          cityaddress_1 = 'Assam'
        }

        else if(address_component[address_component.length-3] == 'BR'){
          cityaddress_1 = 'Bihar'
        }
        else if(address_component[address_component.length-3] == 'CT' || address_component[address_component.length-3] == 'CG'){
          cityaddress_1 = 'Chhattisgarh'
        }
        else if(address_component[address_component.length-3] == 'GA'){
          cityaddress_1 = 'Goa'
        }
        else if(address_component[address_component.length-3] == 'GJ'){
          cityaddress_1 = 'Gujarat'
        }
        else if(address_component[address_component.length-3] == 'HR'){
          cityaddress_1 = 'Haryana'
        }
        else if(address_component[address_component.length-3] == 'HP'){
          cityaddress_1 = 'Himachal Pradesh'
        }
        else if(address_component[address_component.length-3] == 'JK'){
          cityaddress_1 = 'Jammu and Kashmir'
        }
        else if(address_component[address_component.length-3] == 'JH'){
          cityaddress_1 = 'Jharkhand'
        }
        else if(address_component[address_component.length-3] == 'KA'){
          cityaddress_1 = 'Karnataka'
        }
        else if(address_component[address_component.length-3] == 'KL'){
          cityaddress_1 = 'Kerala'
        }
        else if(address_component[address_component.length-3] == 'MP'){
          cityaddress_1 = 'Madhya Pradesh'
        }
        else if(address_component[address_component.length-3] == 'MH'){
          cityaddress_1 = 'Maharashtra'
        }else if(address_component[address_component.length-3] == 'MN'){
          cityaddress_1 = 'Manipur'
        }else if(address_component[address_component.length-3] == 'ML'){
          cityaddress_1 = 'Meghalaya'
        }else if(address_component[address_component.length-3] == 'MZ'){
          cityaddress_1 = 'Mizoram'
        }else if(address_component[address_component.length-3] == 'NL'){
          cityaddress_1 = 'Nagaland'
        }else if(address_component[address_component.length-3] == 'OR' || address_component[address_component.length-3] == 'Orissa' || address_component[address_component.length-3] == 'OD'){
          cityaddress_1 = 'Odisha'
        }else if(address_component[address_component.length-3] == 'PB'){
          cityaddress_1 = 'Punjab'
        }
        else if(address_component[address_component.length-3] == 'RJ'){
          cityaddress_1 = 'Rajasthan'
        }
        else if(address_component[address_component.length-3] == 'SK'){
          cityaddress_1 = 'Sikkim'
        }
        else if(address_component[address_component.length-3] == 'TN'){
          cityaddress_1 = 'Tamil Nadu'
        }
        else if(address_component[address_component.length-3] == 'TG' || address_component[address_component.length-3] == 'TS'){
          cityaddress_1 = 'Telangana'
        }
        else if(address_component[address_component.length-3] == 'TR'){
          cityaddress_1 = 'Tripura'
        }
        else if(address_component[address_component.length-3] == 'UP'){
          cityaddress_1 = 'Uttar Pradesh'
        }
        else if(address_component[address_component.length-3] == 'UK' || address_component[address_component.length-3] == 'Uttaranchal' || address_component[address_component.length-3] == 'UT'){
          cityaddress_1 = 'Uttarakhand'
        }
         else if(address_component[address_component.length-3] == 'WB'){
          cityaddress_1 = 'West Bengal'
        }
        else{
           cityaddress_1 = address_component[address_component.length-3]
        }


         this.setState({ 
       Employee_COUNTRY : address_component[address_component.length-1].toUpperCase(),
        Employee_STATE : address_component[address_component.length-2].split(' ')[1],
        Employee_CITY : cityaddress_1,

        Employee_POSTALCODE : address_component[address_component.length-2].split(' ')[address_component[address_component.length-2].split(' ').length - 1],
       
        Employee_STREETADDRESS : STREETADDRESS
    })
      },
      error => {
        this.refs.toast.show('error occured please try again', 200);
      })
                }, error => this.refs.toast.show('Turn on location services', 200),)
      

}
      getData(){
        checkPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        console.log("Already Granted!");
        console.log(result);
        this.getlatlong();

         }, 
      (result) => {
      
          setTimeout(() => {
      requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        this.getlatlong();
        
             }, (result) => {
        this.refs.toast.show('Permission Denied', 500);
        console.log(result);
      });
    }, 0);
      });
        
 }

  render() {
    return (
     <View style={styles.MainContainer}>
     {this.showheader_header()}

                <ScrollView>

         <View style={styles.container}>
         {this.showimage_image()}
         
         </View>
          <TextField 
                label="First Name"
                returnKeyType = {"next"}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                keyboardType={'default'}
                textColor ="#000007"
                baseColor ="#000007"
                underlineColorAndroid = "transparent" 
               value={this.state.Employee_FirstName}
               onChangeText = { ( text ) => { this.setState({ Employee_FirstName: text })} } 
              />
              <TextField  
                ref={(input) => { this.secondTextInput = input; }}
                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                returnKeyType = {"next"}
                label="Last Name"
                keyboardType={'default'}
                textColor ="#000007"
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_LastName}
                baseColor ="#000007"
                onChangeText = { ( text ) => { this.setState({ Employee_LastName: text })} } 
              />
 
          <TextField 
                ref={(input) => { this.thirdTextInput = input; }}
                returnKeyType = {"next"}
                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                label="Email ID"
                keyboardType={'email-address'}
                textColor ="#000007"
                baseColor ="#000007"
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_Email}
                onChangeText = { ( text ) => { this.validateemail(text)} } 
              />
          <TextField 
                ref={(input) => { this.fourthTextInput = input; }}
                returnKeyType = {"next"}
                onSubmitEditing={() => { this.fifthTextInput.focus(); }}
                label="Personal Contact Number"
                textColor ="#000007"
                baseColor ="#000007"
                underlineColorAndroid = "transparent" 
                //keyboardType={'default'}

                keyboardType={'phone-pad'}
                value={this.state.Employee_Phone}
                onChangeText = { ( text ) => { this.validatephone(text)} } 
              />
          <TextField 
                ref={(input) => { this.fifthTextInput = input; }}
                returnKeyType = {"next"}
                onSubmitEditing={() => { this.sixthTextInput.focus(); }}
                label="Father Name"
                textColor ="#000007"
                underlineColorAndroid = "transparent" 
                keyboardType={'default'}
                baseColor ="#000007"
                value={this.state.Employee_FatherName}
                onChangeText = { ( text ) => { this.setState({ Employee_FatherName: text })} } 
              />
              <View style={{borderWidth: 0.5,borderColor: '#000007',paddingHorizontal:10}} >


              <TouchableOpacity  onPress={()=>{this.getData()}}>
              <View style ={{marginLeft:'88%',marginTop:10}}>
                              <Image style={{ width:50,height:50}} source={{uri:'https://lh3.googleusercontent.com/FeFOsTFCtFwsE9e_ZaNFknAZXqJ-YFWuGe4qM9VdvX2EvfGj2X8CE_BW5VE-GArcDNTVpnpng0uICYFbdDZ59G2sVA=s1024'}} />
              </View>
             </TouchableOpacity>
            
              <TextField 
                 ref={(input) => { this.tenthTextInput = input; }}
                onSubmitEditing={() => { this.elevenTextInput.focus(); }}
                 returnKeyType = {"next"}
                label="Street Address"
                textColor ="#000007"
                baseColor ="#000007"
                keyboardType={'default'}
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_STREETADDRESS}
                onChangeText = { ( text ) => { this.setState({ Employee_STREETADDRESS: text })} } 
              />
              <TextField 
                ref={(input) => { this.elevenTextInput = input; }}
                 returnKeyType = {"done"}
                label="Apartment Number"
                textColor ="#000007"
                baseColor ="#000007"
                keyboardType={'default'}
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_APARTMENTNUMBER}
                onChangeText = { ( text ) => { this.setState({ Employee_APARTMENTNUMBER: text })} } 
              />

              <TextField 
                 ref={(input) => { this.ninthTextInput = input; }}
                onSubmitEditing={() => { this.tenthTextInput.focus(); }}
                 returnKeyType = {"next"}
                label="Postal Code"
                textColor ="#000007"
                baseColor ="#000007"
                keyboardType={'numeric'}
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_POSTALCODE}
                onChangeText = { ( text ) => { this.setState({ Employee_POSTALCODE: text })} } 
              />
              <TextField 
                 ref={(input) => { this.eightTextInput = input; }}
                onSubmitEditing={() => { this.ninthTextInput.focus(); }}
                 returnKeyType = {"next"}
                label="City"
                textColor ="#000007"
                baseColor ="#000007"
                keyboardType={'default'}
                underlineColorAndroid = "transparent" 
                value={this.state.Employee_CITY}
                onChangeText = { ( text ) => { this.setState({ Employee_CITY: text })} } 
              />
              <Picker

  selectedValue={this.state.Employee_STATE}

  //style={{ height: 50, width: 300 }}
  onValueChange={(itemValue, itemIndex) => this.setState({Employee_STATE: itemValue})}>
<Picker.Item label="State" value="State"/>

<Picker.Item label="Andra Pradesh" value="Andra Pradesh" />
<Picker.Item label="Arunachal Pradesh" value="Arunachal Pradesh" />
<Picker.Item label="Assam" value="Assam" />
<Picker.Item label="Bihar" value="Bihar" />
<Picker.Item label="Chhattisgarh" value="Chhattisgarh" />
<Picker.Item label="Goa" value="Goa" />
<Picker.Item label="Gujarat" value="Gujarat" />
<Picker.Item label="Haryana" value="Haryana" />
<Picker.Item label="Himachal Pradesh" value="Himachal Pradesh" />
<Picker.Item label="Jammu and Kashmir  " value="Jammu and Kashmir"/>
<Picker.Item label="Jharkhand  " value="Jharkhand"/>
<Picker.Item label="Karnataka  " value="Karnataka"/>
<Picker.Item label="Kerala" value="Kerala"/>
<Picker.Item label="Madhya Pradesh" value="Madya Pradesh"/>
<Picker.Item label="Maharashtra  " value="Maharashtra"/>
<Picker.Item label="Manipur  " value="Manipur"/>
<Picker.Item label="Meghalaya  " value="Meghalaya"/>
<Picker.Item label="Mizoram  " value="Mizoram"/>
<Picker.Item label="Nagaland   " value="Nagaland"/>
<Picker.Item label="Odisha   " value="Odisha"/>
<Picker.Item label="Punjab   " value="Punjab   "/>
<Picker.Item label="Rajasthan  " value="Rajasthan"/>
<Picker.Item label="Sikkim   " value="Sikkim"/>
<Picker.Item label="Tamil Nadu   " value="Tamil Nadu"/>
<Picker.Item label="Telangana" value="Telangana" />
<Picker.Item label="Tripura  " value="Tripura"/>
<Picker.Item label="Uttarakhand  " value="Uttarakhand"/>
<Picker.Item label="Uttar Pradesh  " value="Uttar Pradesh"/>
<Picker.Item label="West Bengal  " value="West Bengal"/>
</Picker>
            
            <Picker
  selectedValue={this.state.Employee_COUNTRY}
  onValueChange={(itemValue, itemIndex) => this.setState({Employee_COUNTRY: itemValue})}>
<Picker.Item label="Country" value="Country"/>
<Picker.Item label="AFGHANISTAN " value=" AFGHANISTAN"/>
<Picker.Item label="ALBANIA " value=" ALBANIA"/>
<Picker.Item label="ALGERIA " value=" ALGERIA"/>
<Picker.Item label="ANDORRA " value=" ANDORRA"/>
<Picker.Item label="ANGOLA  " value=" ANGOLA"/>
<Picker.Item label="ANTIGUA & BARBUDA " value=" ANTIGUA & BARBUDA"/>
<Picker.Item label="ARGENTINA " value=" ARGENTINA"/>
<Picker.Item label="ARMENIA " value=" ARMENIA"/>
<Picker.Item label="AUSTRALIA " value=" AUSTRALIA"/>
<Picker.Item label="AUSTRIA " value=" AUSTRIA"/>
<Picker.Item label="AZERBAIJAN  " value=" AZERBAIJAN"/>
<Picker.Item label="BAHAMAS, THE  " value=" BAHAMAS, THE"/>
<Picker.Item label="BAHRAIN " value=" BAHRAIN"/>
<Picker.Item label="BANGLADESH  " value=" BANGLADESH"/>
<Picker.Item label="BARBADOS  " value=" BARBADOS"/>
<Picker.Item label="BELARUS " value=" BELARUS"/>
<Picker.Item label="BELGIUM " value=" BELGIUM"/>
<Picker.Item label="BELIZE  " value=" BELIZE"/>
<Picker.Item label="BENIN " value=" BENIN"/>
<Picker.Item label="BHUTAN  " value=" BHUTAN"/>
<Picker.Item label="BOLIVIA " value=" BOLIVIA"/>
<Picker.Item label="BOSNIA & HERZEGOVINA  " value=" BOSNIA & HERZEGOVINA"/>
<Picker.Item label="BOTSWANA  " value=" BOTSWANA"/>
<Picker.Item label="BRAZIL  " value=" BRAZIL"/>
<Picker.Item label="BRUNEI  " value=" BRUNEI"/>
<Picker.Item label="BULGARIA  " value=" BULGARIA"/>
<Picker.Item label="BURKINA FASO  " value=" BURKINA FASO"/>
<Picker.Item label="BURUNDI " value=" BURUNDI"/>
<Picker.Item label="CABO VERDE  " value=" CABO VERDE"/>
<Picker.Item label="CAMBODIA  " value=" CAMBODIA"/>
<Picker.Item label="CAMEROON  " value=" CAMEROON"/>
<Picker.Item label="CANADA  " value=" CANADA"/>
<Picker.Item label="CENTRAL AFRICAN REPUBLIC  " value=" CENTRAL AFRICAN REPUBLIC"/>
<Picker.Item label="CHAD  " value=" CHAD"/>
<Picker.Item label="CHILE " value=" CHILE"/>
<Picker.Item label="CHINA " value=" CHINA"/>
<Picker.Item label="COLOMBIA  " value=" COLOMBIA"/>
<Picker.Item label="COMOROS " value=" COMOROS"/>

<Picker.Item label="COSTA RICA  " value=" COSTA RICA"/>
<Picker.Item label="CÔTE D'IVOIRE " value=" CÔTE D'IVOIRE"/>
<Picker.Item label="CROATIA " value=" CROATIA"/>
<Picker.Item label="CUBA  " value=" CUBA"/>
<Picker.Item label="CYPRUS  " value=" CYPRUS"/>
<Picker.Item label="CZECH REPUBLIC  " value=" CZECH REPUBLIC"/>
<Picker.Item label="DEMOCRATIC REPUBLIC OF THE CONGO  " value=" DEMOCRATIC REPUBLIC OF THE CONGO"/>
<Picker.Item label="DENMARK " value=" DENMARK"/>  
<Picker.Item label="DJIBOUTI  " value=" DJIBOUTI"/>
<Picker.Item label="DOMINICA  " value=" DOMINICA"/>
<Picker.Item label="DOMINICAN REPUBLIC  " value=" DOMINICAN REPUBLIC"/>
<Picker.Item label="ECUADOR " value=" ECUADOR"/>
<Picker.Item label="EGYPT " value=" EGYPT"/>
<Picker.Item label="EL SALVADOR " value=" EL SALVADOR"/>
<Picker.Item label="EQUATORIAL GUINEA " value=" EQUATORIAL GUINEA"/>
<Picker.Item label="ERITREA " value=" ERITREA"/>
<Picker.Item label="ESTONIA " value=" ESTONIA"/>
<Picker.Item label="ETHIOPIA  " value=" ETHIOPIA"/>
<Picker.Item label="FEDERATED STATES OF MICRONESIA  " value=" FEDERATED STATES OF MICRONESIA"/>
<Picker.Item label="FIJI  " value=" FIJI"/>
<Picker.Item label="FINLAND " value=" FINLAND"/>
<Picker.Item label="FRANCE  " value=" FRANCE"/>
<Picker.Item label="GABON " value=" GABON"/>
<Picker.Item label="GAMBIA, THE " value=" GAMBIA, THE"/>
<Picker.Item label="GEORGIA " value=" GEORGIA"/>
<Picker.Item label="GERMANY " value=" GERMANY"/>
<Picker.Item label="GHANA " value=" GHANA"/>
<Picker.Item label="GREECE  " value=" GREECE"/>
<Picker.Item label="GRENADA " value=" GRENADA"/>
<Picker.Item label="GUATEMALA " value=" GUATEMALA"/>
<Picker.Item label="GUINEA  " value=" GUINEA"/>
<Picker.Item label="GUINEA-BISSAU " value=" GUINEA-BISSAU"/>
<Picker.Item label="GUYANA  " value=" GUYANA"/>
<Picker.Item label="HAITI " value=" HAITI"/>
<Picker.Item label="HONDURAS  " value=" HONDURAS"/>
<Picker.Item label="HUNGARY " value=" HUNGARY"/>
<Picker.Item label="ICELAND " value=" ICELAND"/>
<Picker.Item label="INDIA" value=" INDIA"/>
<Picker.Item label="INDONESIA " value=" INDONESIA"/>
<Picker.Item label="IRAN  " value=" IRAN"/>
<Picker.Item label="IRAQ  " value=" IRAQ"/>
<Picker.Item label="IRELAND " value=" IRELAND"/>
<Picker.Item label="ISRAEL  " value=" ISRAEL"/>
<Picker.Item label="ITALY " value=" ITALY"/>
<Picker.Item label="JAMAICA " value=" JAMAICA"/>
<Picker.Item label="JAPAN " value=" JAPAN "/>
<Picker.Item label="JORDAN  " value=" JORDAN  "/>
<Picker.Item label="KAZAKHSTAN  " value=" KAZAKHSTAN  "/>
<Picker.Item label="KENYA " value=" KENYA "/>
<Picker.Item label="KIRIBATI  " value=" KIRIBATI"/>
<Picker.Item label="KOSOVO  " value=" KOSOVO"/>
<Picker.Item label="KUWAIT  " value=" KUWAIT"/>
<Picker.Item label="KYRGYZSTAN  " value=" KYRGYZSTAN"/>
<Picker.Item label="LAOS  " value=" LAOS"/>
<Picker.Item label="LATVIA  " value=" LATVIA"/>
<Picker.Item label="LEBANON " value=" LEBANON"/>
<Picker.Item label="LESOTHO " value=" LESOTHO"/>
<Picker.Item label="LIBERIA " value=" LIBERIA"/>
<Picker.Item label="LIBYA " value=" LIBYA"/>
<Picker.Item label="LIECHTENSTEIN " value=" LIECHTENSTEIN"/>
<Picker.Item label="LITHUANIA " value=" LITHUANIA"/>
<Picker.Item label="LUXEMBOURG  " value=" LUXEMBOURG"/>
<Picker.Item label="MACEDONIA " value=" MACEDONIA"/>
<Picker.Item label="MADAGASCAR  " value=" MADAGASCAR"/>
<Picker.Item label="MALAWI  " value=" MALAWI"/>
<Picker.Item label="MALAYSIA  " value=" MALAYSIA"/>
<Picker.Item label="MALDIVES  " value=" MALDIVES"/>
<Picker.Item label="MALI  " value=" MALI"/>
<Picker.Item label="MALTA " value=" MALTA"/>
<Picker.Item label="MARSHALL ISLANDS  " value=" MARSHALL ISLANDS"/>
<Picker.Item label="MAURITANIA  " value=" MAURITANIA"/>
<Picker.Item label="MAURITIUS " value=" MAURITIUS"/>
<Picker.Item label="MEXICO  " value=" MEXICO"/>
<Picker.Item label="MOLDOVA " value=" MOLDOVA"/>
<Picker.Item label="MONACO  " value=" MONACO"/>
<Picker.Item label="MONGOLIA  " value=" MONGOLIA"/>
<Picker.Item label="MONTENEGRO  " value=" MONTENEGRO"/>
<Picker.Item label="MOROCCO " value=" MOROCCO"/>
<Picker.Item label="MOZAMBIQUE  " value=" MOZAMBIQUE"/>
<Picker.Item label="MYANMAR " value=" MYANMAR"/>
<Picker.Item label="NAMIBIA " value=" NAMIBIA"/>
<Picker.Item label="NAURU " value=" NAURU"/>
<Picker.Item label="NEPAL " value=" NEPAL"/>
<Picker.Item label="NETHERLANDS " value=" NETHERLANDS"/>
<Picker.Item label="NEW ZEALAND " value=" NEW ZEALAND"/>
<Picker.Item label="NICARAGUA " value=" NICARAGUA"/>
<Picker.Item label="NIGER " value=" NIGER"/>
<Picker.Item label="NIGERIA " value=" NIGERIA"/>
<Picker.Item label="NORTH KOREA " value=" NORTH KOREA"/>
<Picker.Item label="NORWAY  " value=" NORWAY"/>
<Picker.Item label="OMAN  " value=" OMAN"/>
<Picker.Item label="PAKISTAN  " value=" PAKISTAN"/>
<Picker.Item label="PALAU " value=" PALAU"/>
<Picker.Item label="PALESTINE " value=" PALESTINE"/>
<Picker.Item label="PANAMA  " value=" PANAMA"/>
<Picker.Item label="PAPUA NEW GUINEA  " value=" PAPUA NEW GUINEA"/>
<Picker.Item label="PARAGUAY  " value=" PARAGUAY"/>
<Picker.Item label="PERU  " value=" PERU"/>
<Picker.Item label="PHILIPPINES " value=" PHILIPPINES"/>
<Picker.Item label="POLAND  " value=" POLAND"/>
<Picker.Item label="PORTUGAL  " value=" PORTUGAL"/>
<Picker.Item label="QATAR " value=" QATAR"/>
<Picker.Item label="REPUBLIC OF THE CONGO " value=" REPUBLIC OF THE CONGO"/>
<Picker.Item label="ROMANIA " value=" ROMANIA"/>
<Picker.Item label="RUSSIA  " value=" RUSSIA"/>
<Picker.Item label="RWANDA  " value=" RWANDA"/>
<Picker.Item label="SAINT KITTS & NEVIS " value=" SAINT KITTS & NEVIS"/>
<Picker.Item label="SAINT LUCIA " value=" SAINT LUCIA"/>
<Picker.Item label="SAINT VINCENT & THE GRENADINES  " value=" SAINT VINCENT & THE GRENADINES"/>
<Picker.Item label="SAMOA " value=" SAMOA"/>
<Picker.Item label="SAN MARINO  " value=" SAN MARINO"/>
<Picker.Item label="SÃO TOMÉ & PRÍNCIPE " value=" SÃO TOMÉ & PRÍNCIPE"/>
<Picker.Item label="SAUDI ARABIA  " value=" SAUDI ARABIA"/>
<Picker.Item label="SENEGAL " value=" SENEGAL"/>
<Picker.Item label="SERBIA  " value=" SERBIA"/>
<Picker.Item label="SEYCHELLES  " value=" SEYCHELLES"/>
<Picker.Item label="SIERRA LEONE  " value=" SIERRA LEONE"/>
<Picker.Item label="SINGAPORE " value=" SINGAPORE"/>
<Picker.Item label="SLOVAKIA  " value=" SLOVAKIA"/>
<Picker.Item label="SLOVENIA  " value=" SLOVENIA"/>
<Picker.Item label="SOLOMON ISLANDS " value=" SOLOMON ISLANDS"/>
<Picker.Item label="SOMALIA " value=" SOMALIA"/>
<Picker.Item label="SOUTH AFRICA  " value=" SOUTH AFRICA"/>
<Picker.Item label="SOUTH KOREA " value=" SOUTH KOREA"/>
<Picker.Item label="SOUTH SUDAN " value=" SOUTH SUDAN"/>
<Picker.Item label="SPAIN " value=" SPAIN"/>
<Picker.Item label="SRI LANKA " value=" SRI LANKA"/>
<Picker.Item label="SUDAN " value=" SUDAN"/>
<Picker.Item label="SURINAME  " value=" SURINAME"/>
<Picker.Item label="SWAZILAND " value=" SWAZILAND"/>
<Picker.Item label="SWEDEN  " value=" SWEDEN"/>
<Picker.Item label="SWITZERLAND " value=" SWITZERLAND"/>
<Picker.Item label="SYRIA " value=" SYRIA"/>
<Picker.Item label="TAJIKISTAN  " value=" TAJIKISTAN"/>
<Picker.Item label="TANZANIA  " value=" TANZANIA"/>
<Picker.Item label="THAILAND  " value=" THAILAND"/>
<Picker.Item label="TIMOR-LESTE " value=" TIMOR-LESTE"/>
<Picker.Item label="TOGO  " value=" TOGO"/>
<Picker.Item label="TONGA " value=" TONGA"/>
<Picker.Item label="TRINIDAD & TOBAGO " value=" TRINIDAD & TOBAGO"/>
<Picker.Item label="TUNISIA " value=" TUNISIA"/>
<Picker.Item label="TURKEY  " value=" TURKEY"/>
<Picker.Item label="TURKMENISTAN  " value=" TURKMENISTAN"/>
<Picker.Item label="TUVALU  " value=" TUVALU"/>
<Picker.Item label="UGANDA  " value=" UGANDA"/>
<Picker.Item label="UKRAINE " value=" UKRAINE"/>
<Picker.Item label="UNITED ARAB EMIRATES  " value=" UNITED ARAB EMIRATES"/>
<Picker.Item label="UNITED KINGDOM  " value=" UNITED KINGDOM"/>
<Picker.Item label="UNITED STATES " value=" UNITED STATES"/>
<Picker.Item label="URUGUAY " value=" URUGUAY"/>
<Picker.Item label="UZBEKISTAN  " value=" UZBEKISTAN"/>
<Picker.Item label="VANUATU " value=" VANUATU"/>
<Picker.Item label="VATICAN CITY  " value=" VATICAN CITY"/>
<Picker.Item label="VENEZUELA " value=" VENEZUELA"/>
<Picker.Item label="VIETNAM " value=" VIETNAM"/>
<Picker.Item label="YEMEN " value=" YEMEN"/>
<Picker.Item label="ZAMBIA  " value=" ZAMBIA"/>
<Picker.Item label="ZIMBABWE  " value=" ZIMBABWE"/>


  
</Picker>



             
              
              </View>
               
              <Toast
                    ref="toast"
                    style={{backgroundColor:'blue'}}
                    position='bottom'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'black',fontWeight:'bold',fontSize:20}}
                />
                </ScrollView>
        </View>
              
    );
  }
}
 

class BigImageActivity extends Component{
  static navigationOptions = {
    headerStyle:{
      backgroundColor:'blue'
    },
  };
  constructor(){
 
    super();
 
    this.state = {
     
      Image_Source:''
 }
   YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
     ]);
 }
 componentWillMount(){
   this.setState({ 
     
      Image_Source:this.props.navigation.state.params.IMAGE
    })

   }
  render(){

    return(
    <View style={{flex: 1,alignItems:'center',justifyContent:'center', backgroundColor: 'black'}}>
  <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={500}
                       imageHeight={500}>
                <Image  source={{uri: this.state.Image_Source}} style={{width:500,height:500,alignSelf: 'center'}}/>
            </ImageZoom>
     </View>
    )
  }
}

 
export default  StackNavigator(
  {
    
  Second: { screen: ShowDataActivity },
  
   First: { screen: MainActivity },
 
   Fourth : {screen :  BigImageActivity }
  }
  );
    
const styles = StyleSheet.create({
    
  MainContainer :{
 
  flex:1,
  justifyContent: 'center',
  paddingHorizontal:8
  },
  container: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding:10,
      marginTop:30,
   },
    title:{
      alignItems: 'center',
      alignSelf:'center',
      fontSize:30,
      fontWeight: 'bold',
    },
    
    header: {
        flexDirection: 'row',
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 1,
        height:50,
        alignItems:'center',
    },
   
    whitespace: {
      alignItems: 'center',
        flex: 1
    },
       ImagesContainer: {
      
       width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8
    },
    
   
    ganesh:{
        flex: 1,
        flexDirection: 'row',
        width:"100%",
        padding: 10,
        
    },

   
    ImageContainer: {
      
      width: 233,
      height: 300,
      borderRadius:20,

      
       
      
    },
  addButton: {
        backgroundColor: 'blue',
        borderColor: '#2b5470',
        borderWidth: 1,
        height: 70,
        width: 70,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        bottom: 20,
        right: 20
    },
 
   textViewContainer: {
 
      textAlignVertical:'center', 
      padding:5,
      fontSize: 15,
      color: '#000',
      marginRight:5,
      
     }
   
  });


