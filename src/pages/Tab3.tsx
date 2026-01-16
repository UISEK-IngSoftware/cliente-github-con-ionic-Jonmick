import { useState } from "react";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from "@ionic/react"
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { getUserInfo } from "../services/GithubService";
import './Tab3.css';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    name: "No se puede cargar el usuario",
    username: "no-username",
    bio: "No se puede cargar la biografía",
    avatar_url: "https://ionicframework.com/docs/img/demos/card-media.png"
  });

const loadUserInfo = async () => {
  const response = await getUserInfo();
  if (response) {
    setUserInfo({
      name: response.name,
      username: response.login,
      bio: response.bio,
      avatar_url: response.avatar_url,
    });
  }
}

useIonViewDidEnter(() => {
  loadUserInfo();
});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="card">
            <img alt="Silhouette of mountains" src={userInfo.avatar_url}/>
          <IonCardHeader>
            <IonCardTitle>{userInfo.name}</IonCardTitle>
            <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>{userInfo.bio}</IonCardContent>
          </IonCard>
        </div>  
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
