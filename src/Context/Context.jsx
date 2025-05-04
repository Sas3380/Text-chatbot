import React, { createContext, useState } from "react";
import runChat from "../config/gemini";
import PropTypes from "prop-types";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const cleanResponseText = (text) => {
        // Replace triple stars with <h3> tags with a class
        text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<h3 class="heading-class">$1</h3>');
        // Replace double stars with <h2> tags with a class
        text = text.replace(/\*\*(.*?)\*\*/g, '<h2 class="subheading-class">$1</h2>');
        // Remove single stars
        text = text.replace(/\*(.*?)\*/g, '$1');
        return text;
    };

    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPrompts(prev => [...prev, input]); 
        
        try {
            const response = await runChat(input);
            const cleanedResponse = cleanResponseText(response);
            setResultData(cleanedResponse);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            setResultData("An error occurred. Please try again.");
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ContextProvider;
