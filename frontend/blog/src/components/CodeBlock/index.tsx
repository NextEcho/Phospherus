import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "./index.module.scss";

interface CodeBlockProps {
    language: string;
    value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const customStyle = {
        backgroundColor: '#111014',
        padding: '1em',
        borderRadius: '5px',
        fontSize: '14px',
        lineHeight: '1.5',
    };

    return (
        <div className="relative group">
            <div className="absolute right-1 top-1 flex items-center space-x-2 font-main">
                <span className="text-xs text-gray-500 bg-gray-600/10 rounded px-2 py-1">
                    {language}
                </span>
                <button
                    onClick={copyToClipboard}
                    className="text-xs bg-indigo-200 hover:bg-indigo-300 text-gray-700 rounded px-2 py-1 transition-colors duration-200"
                >
                    {copied ? '已复制!' : '复制'}
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={nightOwl}
                customStyle={customStyle}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;