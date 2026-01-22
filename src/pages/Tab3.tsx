import { useState } from "react";
import {
  IonButton, IonContent, IonHeader, IonIcon,
  IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonSpinner
} from "@ionic/react";
import {
  IonCard, IonCardContent, IonCardHeader,
  IonCardSubtitle, IonCardTitle
} from '@ionic/react';
import { getUserInfo } from "../services/GithubService";
import './Tab3.css';
import AuthService from "../services/AuthService";
import { useHistory } from "react-router";
import { logOutOutline } from "ionicons/icons";

const Tab3: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "No se puede cargar el usuario",
    username: "no-username",
    bio: "No se puede cargar la biografía",
    avatar_url: "https://ionicframework.com/docs/img/demos/card-media.png"
  });

  const loadUserInfo = async () => {
    setLoading(true);
    const response = await getUserInfo();
    if (response) {
      setUserInfo({
        name: response.name || "Sin nombre",
        username: response.login,
        bio: response.bio || "Sin biografía",
        avatar_url: response.avatar_url,
      });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push("/login");
  };

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
          {loading && (
            <div className="spinner-container">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && (
            <IonCard className="user-card">
              <img alt="Avatar del usuario" src={userInfo.avatar_url} />
              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo.username}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>{userInfo.bio}</IonCardContent>
            </IonCard>
          )}

          <IonButton expand="block" color="danger" onClick={handleLogout}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
