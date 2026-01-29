'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Loader2, Sparkles, Bot, User, Send } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
    sql?: string;
    results?: any;
}

interface QueryInterfaceProps {
    onRunQuery: (question: string) => void;
    isLoading: boolean;
}

export default function QueryInterface({ onRunQuery, isLoading }: QueryInterfaceProps) {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I can help you query your database using plain English. Just ask me anything!',
            sender: 'assistant',
            timestamp: new Date()
        }
    ]);
    const [isMobile, setIsMobile] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle responsive
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: question,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        onRunQuery(question);
        setQuestion('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            maxHeight: '70vh',
            minHeight: '500px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: isMobile ? '16px' : '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
            {/* Chat Header */}
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #00f2ff, #9d00ff)',
                    padding: isMobile ? '0.625rem' : '0.75rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Sparkles size={isMobile ? 18 : 20} color="#000" />
                </div>
                <div>
                    <h3 style={{
                        fontSize: isMobile ? '1rem' : '1.125rem',
                        fontWeight: 800,
                        color: '#fff',
                        margin: 0
                    }}>
                        AI Query Assistant
                    </h3>
                    <p style={{
                        fontSize: isMobile ? '0.6875rem' : '0.75rem',
                        color: '#94a3b8',
                        margin: 0
                    }}>
                        Ask in plain English • Converts to SQL
                    </p>
                </div>
            </div>

            {/* Messages Area */}
            <div style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: isMobile ? '1rem' : '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '1rem' : '1.25rem',
                scrollBehavior: 'smooth'
            }}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        style={{
                            display: 'flex',
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                            alignItems: 'flex-start',
                            gap: isMobile ? '0.625rem' : '0.75rem',
                            flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                            animation: 'slideIn 0.3s ease-out'
                        }}
                    >
                        {/* Avatar */}
                        <div style={{
                            minWidth: isMobile ? '32px' : '36px',
                            height: isMobile ? '32px' : '36px',
                            borderRadius: '50%',
                            background: message.sender === 'user'
                                ? 'linear-gradient(135deg, #00f2ff, #9d00ff)'
                                : 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: message.sender === 'assistant' 
                                ? '1px solid rgba(255, 255, 255, 0.1)' 
                                : 'none',
                            flexShrink: 0
                        }}>
                            {message.sender === 'user' ? (
                                <User size={isMobile ? 16 : 18} color="#000" />
                            ) : (
                                <Bot size={isMobile ? 16 : 18} color="#00f2ff" />
                            )}
                        </div>

                        {/* Message Bubble */}
                        <div style={{
                            maxWidth: isMobile ? '80%' : '75%',
                            background: message.sender === 'user'
                                ? 'linear-gradient(135deg, #00f2ff, #9d00ff)'
                                : 'rgba(255, 255, 255, 0.05)',
                            borderRadius: message.sender === 'user'
                                ? '18px 18px 4px 18px'
                                : '18px 18px 18px 4px',
                            padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.125rem',
                            border: message.sender === 'assistant'
                                ? '1px solid rgba(255, 255, 255, 0.1)'
                                : 'none',
                            boxShadow: message.sender === 'user'
                                ? '0 4px 12px rgba(0, 242, 255, 0.2)'
                                : '0 4px 12px rgba(0, 0, 0, 0.2)'
                        }}>
                            <p style={{
                                margin: 0,
                                color: message.sender === 'user' ? '#000' : '#fff',
                                fontSize: isMobile ? '0.875rem' : '0.9375rem',
                                lineHeight: '1.5',
                                fontWeight: message.sender === 'user' ? 600 : 400,
                                wordWrap: 'break-word'
                            }}>
                                {message.text}
                            </p>
                            <span style={{
                                fontSize: isMobile ? '0.625rem' : '0.6875rem',
                                color: message.sender === 'user' ? 'rgba(0,0,0,0.6)' : '#64748b',
                                marginTop: '0.25rem',
                                display: 'block'
                            }}>
                                {message.timestamp.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: isMobile ? '0.625rem' : '0.75rem',
                        animation: 'slideIn 0.3s ease-out'
                    }}>
                        <div style={{
                            minWidth: isMobile ? '32px' : '36px',
                            height: isMobile ? '32px' : '36px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            flexShrink: 0
                        }}>
                            <Bot size={isMobile ? 16 : 18} color="#00f2ff" />
                        </div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '18px 18px 18px 4px',
                            padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.125rem',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                <div style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: '#00f2ff',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    animationDelay: '0s'
                                }} />
                                <div style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: '#00f2ff',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    animationDelay: '0.2s'
                                }} />
                                <div style={{
                                    width: '7px',
                                    height: '7px',
                                    borderRadius: '50%',
                                    background: '#00f2ff',
                                    animation: 'bounce 1.4s infinite ease-in-out both',
                                    animationDelay: '0.4s'
                                }} />
                            </div>
                            <span style={{
                                color: '#94a3b8',
                                fontSize: isMobile ? '0.8125rem' : '0.875rem'
                            }}>
                                Generating SQL & fetching results...
                            </span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: isMobile ? '1rem 1.25rem' : '1.25rem 1.5rem',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div style={{
                    display: 'flex',
                    gap: isMobile ? '0.625rem' : '0.75rem',
                    alignItems: 'flex-end'
                }}>
                    {/* Input Field */}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask in plain English..."
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: isMobile ? '0.875rem 1rem' : '1rem 1.125rem',
                                borderRadius: '20px',
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                fontSize: isMobile ? '0.9375rem' : '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.6 : 1
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'rgba(0, 242, 255, 0.5)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(0, 242, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={!question.trim() || isLoading}
                        style={{
                            minWidth: isMobile ? '44px' : '48px',
                            height: isMobile ? '44px' : '48px',
                            borderRadius: '50%',
                            background: question.trim() && !isLoading
                                ? 'linear-gradient(135deg, #00f2ff, #9d00ff)'
                                : 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: question.trim() && !isLoading ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            opacity: question.trim() && !isLoading ? 1 : 0.5,
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                            if (question.trim() && !isLoading) {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 242, 255, 0.3)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {isLoading ? (
                            <Loader2 size={isMobile ? 18 : 20} color="#000" className="animate-spin" />
                        ) : (
                            <Send size={isMobile ? 18 : 20} color="#000" />
                        )}
                    </button>
                </div>

                {/* Helper Text */}
                {!question && !isLoading && (
                    <div style={{
                        textAlign: 'center',
                        marginTop: isMobile ? '0.625rem' : '0.75rem',
                        fontSize: isMobile ? '0.625rem' : '0.6875rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.3)'
                    }}>
                        Ask • NQL-MySQL System converts to SQL • Executes securely
                    </div>
                )}
            </form>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                /* Scrollbar Styling */
                div::-webkit-scrollbar {
                    width: 6px;
                }

                div::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }

                div::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                }

                div::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}