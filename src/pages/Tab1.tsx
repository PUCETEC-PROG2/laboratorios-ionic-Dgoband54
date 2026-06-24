import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter, IonText } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import './Tab1.css';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchRepositories } from "../services/GitHubService";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("")

  const loadRepos = async () => {
    setLoading(true);
    fetchRepositories()
    .then ((reposData) => setRepositoryList (reposData))
    .catch ((error) => setErrorMsg ("Error al cargar los repositorios. " + error) )
    .finally(() => setLoading(false));
  };

  useIonViewWillEnter(() => {
    loadRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className= "ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repositoryList.map((repo) => (
            <RepoItem key={repo.id} {...repo} /> 
          ))}
        </IonList>
        {loading && <LoadingSpinner />} 
        {errorMsg !== "" &&
          (<IonText color="danger">
            <p>{errorMsg}</p>
          </IonText>)
        }

      </IonContent>
    </IonPage>
  );
};

export default Tab1;