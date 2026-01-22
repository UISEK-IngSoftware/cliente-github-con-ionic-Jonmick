import React from 'react';
import {
  IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar,
  useIonViewDidEnter, IonSpinner, IonCard, IonCardContent,
  IonButton, IonModal, IonInput, IonTextarea, IonButtons
} from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { deleteRepository, fetchRepositories, updateRepository } from '../services/GithubService';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<RepositoryItem[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [repoToEdit, setRepoToEdit] = React.useState<RepositoryItem | null>(null);
  const [editName, setEditName] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const loadRepos = async () => {
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepos(reposData);
    setLoading(false);
  };

  React.useEffect(() => {
    loadRepos();
  }, []);

  const handleDelete = async (repo: RepositoryItem) => {
    if (!repo.owner) return;
    try {
      await deleteRepository(repo.owner, repo.name);
      setRepos(prev => prev.filter(r => r.name !== repo.name));
    } catch (error) {
      console.error('Error al eliminar', error);
    }
  };

  const handleEdit = (repo: RepositoryItem) => {
    setRepoToEdit(repo);
    setEditName(repo.name);
    setEditDescription(repo.description || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!repoToEdit || !repoToEdit.owner) return;
    try {
      await updateRepository(repoToEdit.owner, repoToEdit.name, {
        name: editName,
        description: editDescription
      });

      setRepos(prev => prev.map(repo =>
        repo.name === repoToEdit.name
          ? { ...repo, name: editName, description: editDescription }
          : repo
      ));

      setShowEditModal(false);
    } catch (error) {
      console.log('Error al editar', error);
    }
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loading && (
          <div className="spinner-container">
            <IonSpinner name="crescent" />
          </div>
        )}

        {!loading && repos.length === 0 && (
          <IonCard className="empty-card">
            <IonCardContent>No hay repositorios disponibles</IonCardContent>
          </IonCard>
        )}

        <IonList>
          {repos.map(repo => (
            <RepoItem
              key={repo.name}
              repo={repo}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </IonList>

        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowEditModal(false)}>Cancelar</IonButton>
              </IonButtons>
              <IonTitle>Editar Repositorio</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleSaveEdit}>Guardar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <IonContent className="modal-content">
            <IonInput
              label="Nombre del Repositorio"
              labelPlacement="floating"
              fill="outline"
              value={editName}
              onIonChange={e => setEditName(e.detail.value!)}
              className="modal-field"
            />
            <IonTextarea
              label="Descripción"
              labelPlacement="floating"
              fill="outline"
              value={editDescription}
              onIonChange={e => setEditDescription(e.detail.value!)}
              rows={6}
              autoGrow
              className="modal-field"
            />
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
