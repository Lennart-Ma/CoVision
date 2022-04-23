import { IonCard, IonCardContent, IonContent, IonPage, IonText } from '@ionic/react';
import { useRef } from 'react';
import Webcam from 'react-webcam';
import useYolov5Analysis from '../api/useYolov5Analysis';
import CovCamera from '../components/CovCamera';
import { getValidTestArea } from '../api/getValidTestArea';
import useClassifierAnalysis, { TestResult } from '../api/useClassifierAnalysis';
import showWelcomeText from '../api/showWelcomeText';

showWelcomeText();

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
            top: 'env(safe-area-inset-top)',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(0deg, rgba(24,24,24,0) 0%, rgba(24,24,24,1) 100%);',
          }}
        >
          <img style={{ height: 80 }} src="/assets/logo.png" alt="CoVision" />
        </div>
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
              <IonText style={{ color: '#fff' }}>
                <h2 role="alert">
                  {testArea.area ? 'Test detected, result ' + TestResult[result] + '!' : 'Please scan a test'}
                </h2>
                {false && ( // debug info
                  <h2>
                    {testArea.area ? 1 : 0} tests detected (highest score: {testArea.score}), result:{' '}
                    {TestResult[result]} (score: {score})
                  </h2>
                )}
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
