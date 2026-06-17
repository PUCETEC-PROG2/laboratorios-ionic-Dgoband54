import { IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="card-container">
          <IonCard className="card">
            <img src="https://avatars.githubusercontent.com/u/210758791?s=400&u=09f91786825950de5842789622ae5275a88ecc7a&v=4" alt="avatar" />
            <IonCardHeader>
               <IonTitle>Diego Alejandro Banda Guaman</IonTitle>
              <IonCardSubtitle>Dgoband54</IonCardSubtitle>
               
            </IonCardHeader>
            <IonCardHeader>
              Desarollador de Software,Guitarrista, Boxeador Amateur, filantropo y ludopta los fines de semana, en sus tiempos libres amante de judios y peruanos
            </IonCardHeader>
          </IonCard>

        </div>




      </IonContent>
    </IonPage>
  );
};

export default Tab3;
