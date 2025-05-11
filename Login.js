import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Svg, Rect } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.bemvindodevolta}>
        {`Bem vindo de volta!`}
      </Text>
      <Text style={styles.nãotemcontaCrieagora}>
        {`Não tem conta?`}<Text style={{"textAlign":"left","color":"rgba(135, 138, 246, 1)","fontFamily":"Inter","fontSize":12,"fontWeight":400}}>{`Crie agora!`}</Text>
      </Text>
      <Text style={styles.eNDEREÇOEMAIL}>
        {`ENDEREÇO E-MAIL`}
      </Text>
      <Text style={styles.sENHA}>
        {`SENHA`}
      </Text>
        <View style={styles.rectangle4}/>
        <ImageBackground style={styles.checkmark11} source={{ uri: /* dummy image */ 'https://th.bing.com/th/id/OIP.OodQ6JyT_QAUgNZYrYblEQHaHa?rs=1&pid=ImgDetMainhttps://dummyimage.com/50x50/000/fff.png' }}/>
      <Svg style={styles.group4} width="300" height="30" viewBox="0 0 300 30" fill="none" >
<Rect x="0.5" y="0.5" width="299" height="29" rx="14.5" fill="#F1F7FA" stroke="#D7D8D7"/>
</Svg>

      <Svg style={styles.group9} width="300" height="30" viewBox="0 0 300 30" fill="none" >
<Rect x="0.5" y="0.5" width="299" height="29" rx="14.5" fill="#F1F7FA" stroke="#D7D8D7"/>
</Svg>

      <Svg style={styles.group10} width="300" height="30" viewBox="0 0 300 30" fill="none" >
<Rect x="0.5" y="0.5" width="299" height="29" rx="14.5" fill="#F1F7FA" stroke="#D7D8D7"/>
</Svg>

      <Svg style={styles.group5} width="300" height="30" viewBox="0 0 300 30" fill="none" >
<Rect x="0.5" y="0.5" width="299" height="29" rx="14.5" fill="#F1F7FA" stroke="#D7D8D7"/>
</Svg>

     <TouchableOpacity style={styles.rectangle7} onPress={() => navigation.navigate('Home')}>
  <Text style={styles.entrar}>Entrar</Text>
</TouchableOpacity>
    </View>  )
}

const styles = StyleSheet.create({
  
  loginContainer: {
    position: "relative",
    flexShrink: 0,
    height: 667,
    width: 375,
    backgroundColor: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: 0
  },
  bemvindodevolta: {
    position: "absolute",
    flexShrink: 0,
    top: 215,
    left: 101,
    width: 173,
    height: 22,
    textAlign: "left",
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: 700
  },
  nãotemcontaCrieagora: {
    position: "absolute",
    flexShrink: 0,
    top: 626,
    left: 111,
    width: 152,
    height: 15,
    textAlign: "left",
    color: "rgba(128, 128, 128, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400
  },
  eNDEREÇOEMAIL: {
    position: "absolute",
    flexShrink: 0,
    top: 284,
    left: 40,
    width: 111,
    height: 15,
    textAlign: "left",
    color: "rgba(128, 128, 128, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 600
  },
  sENHA: {
    position: "absolute",
    flexShrink: 0,
    top: 350,
    left: 40,
    width: 43,
    height: 15,
    textAlign: "left",
    color: "rgba(128, 128, 128, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 600
  },
  logo: {
    position: "absolute",
    flexShrink: 0,
    top: 100,
    height: 80,
    left: 147,
    width: 80
  },
  rectangle4: {
    position: "absolute",
    flexShrink: 0,
    width: 80,
    height: 80,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 10
  },
  checkmark11: {
    position: "absolute",
    flexShrink: 0,
    top: 15,
    left: 15,
    width: 50,
    height: 50
  },
  group4: {
    position: "absolute",
    flexShrink: 0,
    top: 303,
    height: 30,
    left: 37,
    width: 300
  },
  group9: {
    position: "absolute",
    flexShrink: 0,
    top: 303,
    height: 30,
    left: 37,
    width: 300
  },
  group10: {
    position: "absolute",
    flexShrink: 0,
    top: 303,
    height: 30,
    left: 37,
    width: 300
  },
  group5: {
    position: "absolute",
    flexShrink: 0,
    top: 368,
    height: 30,
    left: 37,
    width: 300
  },
  
  entrar: {
    position: "absolute",
    flexShrink: 0,
    top: 448,
    left: 166,
    width: 58,
    height: 23,
    textAlign: "center",
    color: "rgb(255, 255, 255)",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 700
  },
   rectangle7: {
    position: "absolute",
    flexShrink: 0,
    top: 438,
    left: 95,
    width: 200,
    height: 40,
    backgroundColor: "rgba(135, 138, 246, 1)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
        width: 0,
        height: 4
      },
    shadowRadius: 4,
    borderRadius: 40
   }
  
});