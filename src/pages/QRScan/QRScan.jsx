import QrScanner from "qr-scanner";
import { useRef, useState, useEffect } from "react";
import "./style.css";
import axiosInstance from "../../services/http-service";
import { getDid } from "../../services/web3-service";
import * as EcdsaMultikey from "@digitalbazaar/ecdsa-multikey";
import { Ed25519Signature2018 } from "@digitalbazaar/ed25519-signature-2018";
import * as vc from "@digitalbazaar/vc";
import { dataloader } from "../../dataloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import SotatekLogo from "../../assets/images/sotatek-logo.png";
import AvaxLogo from "../../assets/images/avax-logo.png";

export const mockKey2 = {
  type: "Multikey",
  publicKeyMultibase: "zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ",
  secretKeyMultibase: "z42tzVHbFvnJQsor5gCQnakMnuTLioiGGkQAfshgES16Xfmk",
};
const ecdsaKeyPair2 = await EcdsaMultikey.from(mockKey2);
ecdsaKeyPair2.id = `did:avax:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ`;
ecdsaKeyPair2.controller = `did:controller:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ`;
const challenge = "12ec21";
const suite3 = new Ed25519Signature2018({
  verificationMethod:
    "did:avax:zDnaeWzcHdM7gTqVhGY2n8TSf9UKDWoh9rT2YdoWGpsycr9DJ",
  key: ecdsaKeyPair2,
});

const QRScan = () => {
  const videoRef = useRef(null);
  const [startRecord, setStartRecord] = useState(false);
  const [passed, setPassed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [userName, setUserName] = useState("");

  const [errorMsg, setErrorMsg] = useState();
  const [qrScanner, setQrScanner] = useState();

  const handleStartClick = () => {
    try {
      const newScanner = new QrScanner(
        videoRef.current,
        async (result) => {
          console.log("decoded qr code:", result);
          try {
            if (!result?.data?.includes("https://backend.hocptit.me")) {
              setPassed(false);
              setFailed(true);
              setTimeout(() => {
                setPassed(false);
                setFailed(false);
                setStartRecord(true);
              }, 5000);
              return;
            }
            newScanner.destroy();
            try {
              // const response = await axiosInstance.get(result.data);
              const response = await axiosInstance.get(
                // "http://localhost:3162/v1/short-url/46c30d61-7784-4275-821e-9b75aebfefd2",
                result.data
              );

              if (response?.status === 200 && response?.data?.success) {
                const { data } = response.data;

                const did = await getDid(
                  data.verifiableCredential[0].credentialSubject.id
                );
                setUserName(
                  data.verifiableCredential[0].credentialSubject.name
                );
                const presentation = data;
                const isValid = await vc.verify({
                  presentation: presentation,
                  suite: suite3,
                  documentLoader: dataloader,
                  challenge,
                });

                if (did && isValid) {
                  setPassed(true);
                  setFailed(false);
                } else {
                  setPassed(false);
                  setFailed(true);
                }
                setTimeout(() => {
                  setPassed(false);
                  setFailed(false);
                  setStartRecord(true);
                }, 5000);
              }
            } catch (error) {
              console.error("Error fetching data:", error);
              setPassed(false);
              setFailed(true);
              setTimeout(() => {
                setPassed(false);
                setFailed(false);
                setStartRecord(true);
              }, 5000);
            }
          } catch (err) {
            setErrorMsg("An error occurred, please try again");
          }
        },
        {
          /* your options or returnDetailedScanResult: true if you're not specifying any other options */
          highlightCodeOutline: true,
          highlightScanRegion: true,
        }
      );
      setQrScanner(newScanner);
      setStartRecord(true);

      newScanner.start();
    } catch (err) {
      setErrorMsg("An error occurred, please try again");
    }
  };

  useEffect(() => {
    handleStartClick();
  }, []);

  const handleStopClick = () => {
    if (qrScanner) {
      qrScanner.destroy();
      setStartRecord(false);
    } else {
      alert("scanner not found");
    }
  };
  return (
    <div className="container">
      {!passed && !failed ? (
        <div className="qr-scan-container">
          <h1>Welcome to the Hackathon event. Please scan QR to checkin.</h1>
          {/* {!startRecord ? (
            <button
              className="base-button primary-btn"
              onClick={handleStartClick}
            >
              Start camera
            </button>
          ) : (
            <button
              className="base-button delete-btn"
              onClick={handleStopClick}
            >
              Stop camera
            </button>
          )} */}

          <div className="video-container">
            <video className="video-preview" ref={videoRef}></video>
          </div>
          <p className="error-msg">{errorMsg}</p>

          <div className="footer-logo">
            <img src={SotatekLogo} alt="" width={110} height={110} style={{marginTop: '7px'}} />
            <img src={AvaxLogo} alt=""  width={170} height={130} />
          </div>
        </div>
      ) : (
        <div className="layout-container">
          {passed && (
            <>
              <FontAwesomeIcon icon={faCheckCircle} color="green" size="10x" />
              <p className="success">
                Welcome {userName} to the Hackathon Event
              </p>
            </>
          )}
          {failed && (
            <>
              <FontAwesomeIcon icon={faTimesCircle} color="red" size="10x" />
              <p className="success">Invalid QR code, please try again</p>
            </>
          )}

          <div className="footer-logo">
            <img src={SotatekLogo} alt="" width={110} height={110} style={{marginTop: '7px'}} />
            <img src={AvaxLogo} alt=""  width={170} height={130} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScan;
