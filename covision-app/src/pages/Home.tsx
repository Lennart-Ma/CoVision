import {
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonText,
  IonButton
} from "@ionic/react";
import { useRef } from "react";
import Webcam from "react-webcam";
import useYolov5Analysis from "../api/useYolov5Analysis";
import CovCamera from "../components/CovCamera";
import TextToSpeech from "../components/CovInstruction/TextToSpeech";

const Home: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const { valid_detections_data } = useYolov5Analysis(webcamRef) ?? {};

  return (
    <IonPage>
      <IonContent fullscreen>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IonCard>
            <IonCardContent>
              <IonText color="primary">
                <h1>{valid_detections_data + " tests detected"}</h1>
              </IonText>
            </IonCardContent>
          </IonCard>
        </div>
        <CovCamera ref={webcamRef} />
        
        <IonButton href="/testInstructionOverview">Go to full test instruction</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;