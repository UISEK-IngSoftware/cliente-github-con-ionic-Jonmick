import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react"
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <img 
            alt='Jonathan Tituaña' 
            src='https://i.pinimg.com/736x/81/db/19/81db19c21f0e126b910a1c0c9fe050c3.jpg'
          />
          <IonCardHeader>
            <IonCardTitle>Jonathan Tituaña</IonCardTitle>
            <IonCardSubtitle>Jmk</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias distinctio explicabo deserunt fugit laborum placeat, consequatur porro omnis voluptas harum illo provident vero nostrum quis nam facere ut illum consectetur?
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
