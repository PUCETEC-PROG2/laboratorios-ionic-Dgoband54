import React, { useRef } from 'react';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { Repository } from '../interfaces/Repository';
import './RepoItem.css';

interface RepoItemProps {
    repository: Repository;
    onEdit: (repository: Repository) => void;
    onDelete: (repository: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onEdit, onDelete }) => {
    const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

    const closeSliding = () => {
        slidingRef.current?.close();
    };

    return (
        <IonItemSliding ref={slidingRef}>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={repository.owner.avatar_url} alt={repository.name} />
                </IonThumbnail>
                <IonLabel>
                    <h3>{repository.name}</h3>
                    <p>{repository.description}</p>
                    {repository.language && (
                        <p><strong>Lenguaje: </strong>{repository.language}</p>
                    )}
                </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption
                    color="primary"
                    onClick={() => {
                        closeSliding();
                        onEdit(repository);
                    }}
                >
                    <IonIcon icon={pencil} slot="icon-only" />
                </IonItemOption>
                <IonItemOption
                    color="danger"
                    onClick={() => {
                        closeSliding();
                        onDelete(repository);
                    }}
                >
                    <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>

    );
};

export default RepoItem;
