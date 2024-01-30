import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} de ${currentDate.toLocaleString('default', { month: 'long' })} del ${currentDate.getFullYear()}`;

const PP: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Políticas de Privacidad</Text>

        <Text style={styles.policyText}>
          DulceDesafío reconoce la importancia de la privacidad de sus usuarios y se compromete a proteger la información personal recopilada. Al utilizar nuestra aplicación, aceptas las siguientes políticas de privacidad:
        </Text>

        <Text style={styles.policyText}>
          1. **Información Recopilada:**
          {'\n'}- Al registrarte en DulceDesafío, recopilamos información básica como tu nombre y dirección de correo electrónico. Esta información se utiliza para personalizar tu experiencia en la aplicación y para facilitar la comunicación.
        </Text>

        <Text style={styles.policyText}>
          2. **Datos de Desafíos:**
          {'\n'}- La aplicación permite a los usuarios participar en desafíos amigables. La información generada durante estos desafíos, como resultados y estadísticas, se almacena para mejorar la funcionalidad de la aplicación y proporcionar características personalizadas.
        </Text>

        <Text style={styles.policyText}>
          3. **Uso de la Información:**
          {'\n'}- Utilizamos la información recopilada para mejorar nuestros servicios, personalizar la experiencia del usuario y enviar notificaciones relevantes sobre desafíos y actualizaciones de la aplicación.
        </Text>

        <Text style={styles.policyText}>
          4. **Compartir Información:**
          {'\n'}- No compartimos tu información personal con terceros sin tu consentimiento. La información generada durante desafíos solo se comparte públicamente si decides participar en desafíos públicos.
        </Text>

        <Text style={styles.policyText}>
          5. **Seguridad de la Información:**
          {'\n'}- Implementamos medidas de seguridad para proteger la información personal de nuestros usuarios. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet o sistema de almacenamiento es completamente seguro.
        </Text>

        <Text style={styles.policyText}>
          6. **Cookies:**
          {'\n'}- DulceDesafío utiliza cookies para mejorar la experiencia del usuario. Puedes configurar tu dispositivo para que rechace cookies, pero esto podría afectar algunas funcionalidades de la aplicación.
        </Text>

        <Text style={styles.policyText}>
          7. **Cambios en la Política de Privacidad:**
          {'\n'}- Nos reservamos el derecho de actualizar nuestras políticas de privacidad. Los cambios entrarán en vigencia una vez publicados en la aplicación. Te recomendamos revisar periódicamente estas políticas para estar informado.
        </Text>

        <Text style={styles.policyText}>
          8. **Contacto:**
          {'\n'}- Si tienes preguntas o inquietudes sobre nuestras políticas de privacidad, contáctanos en [ jofraber203@gmail.com ].
        </Text>

        <Text style={styles.policyText}>
          Gracias por confiar en DulceDesafío para tus desafíos amigables y experiencias entre amigos y parejas.
          {'\n\n'}{formattedDate}
        </Text>

        <Text style={styles.policyText}>
            Al utilizar esta aplicación, aceptas nuestras políticas de privacidad. Para obtener más información, consulta nuestras políticas de privacidad AQUI.
            {'\n\n'}{formattedDate}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#3333',
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:'#142157',
  },
  policyText: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 12,
    color:'black',
  },
});

export default PP;