import './RepoItem.css';
import React from 'react';
import { 
  IonIcon,
  IonItem, 
  IonItemOption, 
  IonItemOptions, 
  IonItemSliding, 
  IonLabel, 
  IonThumbnail 
} from "@ionic/react";
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { createOutline, trashOutline } from 'ionicons/icons';

interface Props {
  repo: RepositoryItem;
  onEdit: (repo: RepositoryItem) => void;
  onDelete: (repo: RepositoryItem) => void;
}

const RepoItem: React.FC<Props> = ({ repo, onEdit, onDelete }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img alt="Silhouette of mountains" src={repo.imageUrl || "https://ionicframework.com/docs/img/demos/thumbnail.svg"} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>
            <strong>Propietario: </strong>
            {repo.owner}
          </p>
          <p>
            <strong>Lenguaje: </strong>
            {repo.language}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption onClick={() => onEdit(repo)}>
          <IonIcon slot='icon-only' icon={createOutline}></IonIcon>
        </IonItemOption>
        <IonItemOption color='danger' onClick={() => onDelete(repo)}>
          <IonIcon slot='icon-only' icon={trashOutline}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default RepoItem;