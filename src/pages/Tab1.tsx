import React from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import './Tab1.css';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchRepositories } from '../services/GithubSevice';

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadRepos = async () => {
    setLoading(true);
    const reposData = await fetchRepositories();
    setRepositoryList(reposData);
    setLoading(false);
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
      <IonContent fullscreen>
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
      </IonContent>
    </IonPage>
  );
};

export default Tab1;