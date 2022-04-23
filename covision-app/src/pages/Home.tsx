import { IonButton, IonCard, IonCardContent, IonContent, IonPage, IonText } from '@ionic/react';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import useYolov5Analysis from '../api/useYolov5Analysis';
import CovCamera from '../components/CovCamera';
import { getValidTestArea } from '../api/getValidTestArea';
import useClassifierAnalysis, { TestResult } from '../api/useClassifierAnalysis';
import Scanner from '../components/Scanner';

const welcomeText =
  'Wilkommen bei CoVision. Richten Sie Ihre Kamera auf eine Covid Test Kasette um das Ergebnis zu erfahren oder auf den Barcode der Verpackung wenn Sie den Test noch nicht begonnen haben.';
// window.alert(welcomeText);

const Home: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const analysis = useYolov5Analysis(webcamRef) ?? {};
  const testArea = getValidTestArea(analysis);
  const [result, score] = useClassifierAnalysis(testArea);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <IonCard>
            <IonCardContent>
              <IonText color="primary">
                <h1>
                  {testArea.area ? 1 : 0} tests detected (highest score: {testArea.score}), result: {TestResult[result]}{' '}
                  (score: {score})
                </h1>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>

        {testArea.area && (
          <div
            style={{
              position: 'absolute',
              borderWidth: 4,
              borderColor: 'red',
              borderStyle: 'solid',
              borderRadius: 8,
              zIndex: 10000,
              top: testArea.area.top * 100 + '%',
              bottom: (1 - testArea.area.bottom) * 100 + '%',
              left: testArea.area.left * 100 + '%',
              right: (1 - testArea.area?.right) * 100 + '%',
            }}
          ></div>
        )}

        <CovCamera ref={webcamRef} />

        <Scanner target={webcamRef.current?.video} onDetected={console.log} />
        <IonButton href="/testInstructionOverview">Go to full test instruction</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
