
//Importando o que será usado
  //React
  import React from "react"; 
    //Componentes (botão, texto, view, touchableopacity, image)
    import {Button} from "react-native";
      import {Text} from "react-native";
    import {View} from "react-native";  
      import {TouchableOpacity} from "react-native";
    import {Image} from "react-native";
      //Component
      import {Component} from "react";
        //Stylesheet
        import {StyleSheet} from "react-native";
            //TextInpunt
            import {TextInput} from "react-native";
                //Permissões
                import * as Permissions from "expo-permissions";
                    //Scanner
                    import {BarCodeScanner} from "expo-barcode-scanner";
                        //Imagem fundo
                        import {ImageBackground} from "react-native";

//Constantes
    //Constante Imagem Fundo
    const Imagem_fundo = require("../assets/fundo.png");
        //Constante Imagem Ícone
        const Imagem_icone = require("../assets/livros.png");
            //Constante Imagem nome
            const Imagem_nome = require("../assets/nome.png");


//Classe pesquisa
export default class Trade extends Component{

    constructor(props){
        super(props)
            this.state = {    
                domState: "normal", /*Estado do modo*/
                hasCameraPermissions: null, /*Permissões da Câmera*/
                scanned: false, /*Digitalizado*/
                scannedData: "" /*Dado digitalizado*/
            } 
    }

    //Permissão da câmera
    permCamera =async domState=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
            this.setState({
                hasCameraPermissions: status === "granted",
                domState: domState,
                scanned: false
            })
    }

    //Digitalização do QRCode concluida
    digiConcluida =async ({type, data})=>{
        this.setState({
            scannedData: data,
            domState: "normal",
            scanned: true
        })
    }

    //Realizar Transação
    fazerTransação = async()=>{
        var{book_id, student_id} = this.state;
        await this.getBookDetails(book_id);
        await this.getStudentDetails(student_id);



    }

        //Renderização
        render(){

            const {domState, hasCameraPermissions, scanned, scannedData} = this.state

                if (domState === "scanner"){
                    return(
                        <BarCodeScanner onBarCodeScanned = {scanned ? undefined:this.digiConcluida}
                        style={StyleSheet.absoluteFillObject}></BarCodeScanner>
                    )
                }

                    return(
                        <View style={styles.fundo}>
                            <ImageBackground source = {Imagem_fundo} style={styles.image_fundo}>   
                                <View style={styles.container22}>
                                    <Image source = {Imagem_icone} style={styles.livro}></Image>    
                                </View>  
                                <View style={styles.container21}>
                                <Image source = {Imagem_nome}></Image>    
                                </View>  
                                
                                    <View style={styles.container2}>
         
                                        <View style={styles.container3}>
                                            <TextInput placeholder = "ID do livro" style={styles.containerID}></TextInput>
                                            <TouchableOpacity style={styles.botao} onPress = {()=>{
                                                this.permCamera("scanner")
                                            }}>
                                                <Text style={styles.texto_botao}>DIGITALIZAR</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                        <View style={styles.container3}>
                                            <TextInput placeholder = "ID do estudante" style={styles.containerID}></TextInput>
                                            <TouchableOpacity style={styles.botao} onPress = {()=>{
                                                this.permCamera("scanner")
                                            }}>
                                                <Text style={styles.texto_botao}>DIGITALIZAR</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                        <TouchableOpacity style={styles.botaoEnviar}>
                                            <Text style={styles.texto_botao}>ENVIAR</Text>

                                        </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    )
                    
        }
}

const styles = StyleSheet.create({

    fundo: {
        flex: 1,
        justifyContent: "center",
        alignItens: "center",
        backgroundColor: "#e5e7b9"
    },

    botao: {
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItens: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#470048",
    },

    texto_botao: {
        fontSize: 20,
        color: "#e5e7b9",
        fontWeight: "bold",
        textAlign: "center"
    },

    texto_permissao: {
        textAlign:"center",
        fontSize: 20,
        fontWeight: "bold",
        color: "red"
    },

    image_fundo: {
        flex:1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    container2: {
        flex:0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -180,
    },

    container21: {
        flex:0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
    },

    container22: {
        flex:0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 90,
    },

    livro: {
        width:200,
        height:200,
        resizeMode: "contain",
        marginTop: 350
    },

    container3: {
        borderWidth: 4,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#470048",
        borderColor: "white",
        marginTop: 25
    },

    containerID: {
        width:"50%",
        height: 50,
        padding: 10,
        borderColor: "#white",
        borderWidth: 3,
        fontSize: 18,
        backgroundColor: "#470048",
        textAlign: "center",
        color: "white",
        
    },

    botaoEnviar: {
        width: 150,
        height: 50,
        justifyContent: "center",
        alignItens: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "#470048",
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 5,
        marginLeft: 283,
        marginBottom: 50
    },
})