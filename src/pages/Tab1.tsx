import React from 'react';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  IonInput,
  useIonViewWillEnter
} from '@ionic/react';
import './Tab1.css';
import { Repository } from '../interfaces/Repository';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { deleteRepository, fetchRepositories, updateRepository } from "../services/GitHubService";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [toastMsg, setToastMsg] = React.useState("");
  const [toastColor, setToastColor] = React.useState<"success" | "danger">("success");

  const [repoToDelete, setRepoToDelete] = React.useState<Repository | null>(null);

  const [repoToEdit, setRepoToEdit] = React.useState<Repository | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editErrorMsg, setEditErrorMsg] = React.useState("");
  const [savingEdit, setSavingEdit] = React.useState(false);

  const showToast = (message: string, color: "success" | "danger" = "success") => {
    setToastMsg(message);
    setToastColor(color);
  };

  const loadRepos = async () => {
    setLoading(true);
    setErrorMsg("");

    fetchRepositories()
      .then((reposData) => setRepositoryList(reposData))
      .catch((error) => {
        console.error(error);
        const apiError = error instanceof Error ? error.message : String(error);
        setErrorMsg(`Error al cargar repositorios: ${apiError}`);
      })
      .finally(() => setLoading(false));
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  const handleConfirmDelete = async () => {
    if (!repoToDelete) return;

    const repo = repoToDelete;
    setRepoToDelete(null);
    setErrorMsg("");

    try {
      await deleteRepository(repo.owner.login, repo.name);
      setRepositoryList((prev) => prev.filter((item) => item.id !== repo.id));
      showToast(`"${repo.name}" eliminado exitosamente`);
    } catch (error) {
      const apiError = error instanceof Error ? error.message : String(error);
      showToast(`Error al eliminar el repositorio: ${apiError}`, "danger");
    }
  };

  const openEdit = (repo: Repository) => {
    setRepoToEdit(repo);
    setEditName(repo.name);
    setEditDescription(repo.description ?? "");
    setEditErrorMsg("");
  };

  const closeEdit = () => {
    setRepoToEdit(null);
    setEditErrorMsg("");
  };

  const handleSaveEdit = async () => {
    if (!repoToEdit) return;

    if (!editName || editName.trim() === "") {
      setEditErrorMsg("El nombre del repositorio es obligatorio");
      return;
    }

    setSavingEdit(true);
    setEditErrorMsg("");

    try {
      const updatedRepo = await updateRepository(repoToEdit.owner.login, repoToEdit.name, {
        name: editName,
        description: editDescription
      });
      setRepositoryList((prev) =>
        prev.map((repo) => (repo.id === repoToEdit.id ? updatedRepo : repo))
      );
      setRepoToEdit(null);
      showToast("Repositorio actualizado exitosamente");
    } catch (error) {
      const apiError = error instanceof Error ? error.message : String(error);
      setEditErrorMsg(`Error al actualizar el repositorio: ${apiError}`);
    } finally {
      setSavingEdit(false);
    }
  };

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

        {loading && <LoadingSpinner />}

        {!loading && repositoryList.length > 0 && (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem
                key={repo.id}
                repository={repo}
                onEdit={openEdit}
                onDelete={setRepoToDelete}
              />
            ))}
          </IonList>
        )}

        {!loading && errorMsg && (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <IonText color="danger">
              <p style={{ fontWeight: 'bold' }}>{errorMsg}</p>
            </IonText>
          </div>
        )}

        <IonAlert
          isOpen={repoToDelete !== null}
          cssClass="delete-confirm-alert"
          header="Eliminar repositorio"
          message={`Seguro que quieres eliminar "${repoToDelete?.name}"? Esta accion no se puede deshacer.`}
          onDidDismiss={() => setRepoToDelete(null)}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', role: 'destructive', handler: handleConfirmDelete }
          ]}
        />

        <IonModal isOpen={repoToEdit !== null} onDidDismiss={closeEdit}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar repositorio</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeEdit}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Nombre del repositorio"
              labelPlacement="floating"
              value={editName}
              onIonChange={(event) => setEditName(event.detail.value ?? "")}
            />
            <IonTextarea
              label="Descripcion del repositorio"
              labelPlacement="floating"
              value={editDescription}
              onIonChange={(event) => setEditDescription(event.detail.value ?? "")}
              rows={6}
            />
            {editErrorMsg !== "" && (
              <IonText color="danger">
                <p>{editErrorMsg}</p>
              </IonText>
            )}
            <IonButton
              expand="block"
              color="dark"
              onClick={handleSaveEdit}
              disabled={savingEdit}
            >
              {savingEdit ? "Guardando..." : "Guardar cambios"}
            </IonButton>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={toastMsg !== ""}
          message={toastMsg}
          duration={2200}
          color={toastColor}
          position="top"
          onDidDismiss={() => setToastMsg("")}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
