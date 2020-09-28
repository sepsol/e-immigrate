import React, { useState, useEffect } from 'react';
import { content } from '../../data/LanguageContent';

import LanguageSelectionModal from '../../compositions/LanguageSelectionModal/LanguageSelectionModal';
import Navbar from '../../compositions/Navbar/Navbar';
import LandingPage from '../../compositions/LandingPage/LandingPage';
import ChooseLanguage from '../../compositions/ChooseLanguage/ChooseLanguage';
import Video from '../../compositions/Video/Video';
import HubspotForm from '../../compositions/HubspotForm/HubspotForm';

import './MainContainer.css';

const MainContainer = () => {
    const [language, setLanguage] = useState('en');
    const [videoState, setVideoState] = useState({ hasWatchedVideo: false });
    const [showModal, setShowModal] = useState(true);
    const { hasWatchedVideo } = videoState;
    const browserLanguage =
        window.navigator.userLanguage || window.navigator.language;
    useEffect(() => {
        setLanguage(browserLanguage.substring(0, 2));
    }, [browserLanguage]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/shell.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    portalId: '8034478',
                    formId: content[language].hubspot,
                    target: `#hubspotForm-en`,
                });
            }
        });
    }, [language]);
    const videoEndedHandler = (event) => {
        setVideoState({
            hasWatchedVideo: true,
        });
    };

    return (
        <div className="MainContainer">
            <div className="wrapper">
                <LanguageSelectionModal
                    language={language}
                    setLanguage={setLanguage}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
                <div className={`items ${showModal ? 'blur' : ''}`}>
                    <Navbar language={language} setLanguage={setLanguage} />
                    <LandingPage content={content[language]} />
                    <Video
                        onEnd={videoEndedHandler}
                        video={content[language].video}
                    />
                    <HubspotForm
                        hubspot={content[language].hubspot}
                        hasWatchedVideo={hasWatchedVideo}
                        language={language}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
