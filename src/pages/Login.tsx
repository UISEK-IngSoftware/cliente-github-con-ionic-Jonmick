import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonText } from '@ionic/react';
import "./Login.css";
import { logoGithub } from "ionicons/icons";
import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router';

const Login: React.FC = () => {
    const history = useHistory();
    const [userName, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!userName || !token) {
            setError("Por favor, complete ambos campos.");
            setLoading(false);
            return;
        }
        
        if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
            setError("Token inválido. Debe comenzar con 'ghp_' o 'github_pat_'");
            setLoading(false);
            return;
        }

        const success = AuthService.login(userName, token);
        if (success) {
            history.push("/tab1");
        } else {
            setError("Error al iniciar sesión.")
        }
        setLoading(false);
    }
    
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inicio de sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className='login-container'>
                    <IonIcon icon={logoGithub} className="login-logo"></IonIcon>
                    <h1>Iniciar sesión con GitHub</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <IonInput
                        className='login-field'
                        label='Usuario de Github'
                        labelPlacement='floating'
                        fill='outline'
                        type='text'
                        value={userName}
                        onIonChange={e => setUsername(e.detail.value!)}
                        required
                        disabled={loading}
                        />
                        <IonInput
                        className='login-field'
                        label='Token de acceso personal'
                        labelPlacement='floating'
                        fill='outline'
                        type='password'
                        value={token}
                        onIonChange={e => setToken(e.detail.value!)}
                        required
                        disabled={loading}
                        />

                        {error && (
                            <IonText color="danger" className='error-message'>{error}</IonText>
                        )}
                        <IonButton expand='block' type='submit' disabled={loading}>
                            {loading ? 'Validando...' : 'Iniciar sesión'}
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default Login;