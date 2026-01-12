import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonPage, 
  IonTextarea, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput 
            label="Nombre del Repositorio" 
            labelPlacement="floating" 
            fill="outline" 
            placeholder="repositorio-de-ejemplo"
            className='form-field'
            ></IonInput>

          <IonTextarea 
            label="Descripción del Repositorio" 
            labelPlacement="floating" 
            fill="outline" 
            placeholder="Este es un repositorio de ejemplo."
            className='form-field'
            rows={6}></IonTextarea>

          <IonButton expand="block">Guardar</IonButton>

        </div>
      </IonContent>     
    </IonPage>
  );
};

export default Tab2;
