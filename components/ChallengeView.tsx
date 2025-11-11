import React, { useState } from 'react';
// FIX: Import Category to resolve reference errors.
import { User, Challenge, Category } from '../types';
import { CheckCircleIcon, XCircleIcon, StarIcon, TrophyIcon } from './Icons';

interface ChallengeViewProps {
  user: User;
  challenge: Challenge;
  onChallengeComplete: (challengeId: string, points: number) => void;
}

// Simple simulation for Python code execution
const simulatePythonExecution = (code: string, challenge: Challenge): string => {
  try {
    // This is a VERY simplified simulation.
    // It looks for print() statements and extracts their content.
    const printRegex = /print\(([^)]+)\)/g;
    let match;
    const output: string[] = [];

    // Create a sandboxed evaluation context
    const context: { [key: string]: any } = {};
    const codeLines = code.split('\n').filter(line => !line.trim().startsWith('print'));
    
    // Attempt to pre-run non-print lines to define variables
    try {
        const preRunCode = codeLines.join('\n');
        // A slightly safer eval by wrapping in a function
        const defineVars = new Function('context', `
            with (context) {
                ${preRunCode};
            }
        `);
        defineVars(context);
    } catch (e) {
        // Ignore errors here, might be complex logic
    }
    
    // Process print statements
    while ((match = printRegex.exec(code)) !== null) {
      let content = match[1].trim();
      try {
        // Evaluate the content of print() within the sandboxed context
        const value = new Function('context', `
            with (context) {
                return ${content};
            }
        `)(context);
        output.push(String(value));
      } catch (e) {
         // Fallback for simple literals if context eval fails
          if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
            output.push(content.slice(1, -1));
          } else {
            output.push(`Erreur d'évaluation: ${content}`);
          }
      }
    }
    
    if (output.length > 0) {
      return output.join('\n');
    }

    // If no print, try to evaluate the last non-commented line as an expression
    const lastLine = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).pop()?.trim();
    if(lastLine) {
        try {
             const result = new Function('context', `
                with (context) {
                    return ${lastLine};
                }
            `)(context);
            return String(result);
        } catch(e) {
            // It might not be an expression, which is fine.
        }
    }

    return ''; // No output
  } catch (e) {
    if (e instanceof Error) {
        return `Erreur: ${e.message}`;
    }
    return 'Erreur inconnue';
  }
};


const VictoryModal: React.FC<{ points: number; onClose: () => void }> = ({ points, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 p-8 rounded-2xl border border-green-400/50 shadow-2xl text-center flex flex-col items-center max-w-sm">
                <TrophyIcon className="w-24 h-24 text-yellow-300 animate-bounce" />
                <h2 className="text-4xl font-bold mt-4 text-white">Victoire !</h2>
                <p className="text-lg mt-2 text-gray-200">Vous avez réussi le défi !</p>
                <div className="mt-6 flex items-center justify-center gap-3 bg-yellow-400/20 px-6 py-3 rounded-full">
                    <StarIcon className="w-8 h-8 text-yellow-300" />
                    <span className="text-2xl font-bold text-white">+{points} Points</span>
                </div>
                <button
                    onClick={onClose}
                    className="mt-8 w-full py-3 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 font-semibold"
                >
                    Continuer
                </button>
            </div>
        </div>
    );
};


export const ChallengeView: React.FC<ChallengeViewProps> = ({ user, challenge, onChallengeComplete }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const normalize = (str: string) => str.replace(/\s+/g, '').replace(/['"]/g, '');

  const handleRun = () => {
    let result: string;
    let success: boolean;

    if (challenge.category === Category.Python) {
        result = simulatePythonExecution(code, challenge);
        success = normalize(result) === normalize(challenge.solution);
    } else { // HTML/CSS
      result = code;
      const simplifiedUserCode = result.replace(/\s/g, '').replace(/alt=""/g, '');
      const simplifiedSolution = challenge.solution.replace(/\s/g, '').replace(/alt=""/g, '');
      success = simplifiedUserCode.includes(simplifiedSolution);
    }

    setOutput(result);
    setIsCorrect(success);
    
    if (success) {
        // Call the parent handler to update progress and award badges
        onChallengeComplete(challenge.id, challenge.points);
        // Show victory modal only if the challenge was not previously completed
        if (!user.progress.completedChallenges.includes(challenge.id)) {
            setShowVictoryModal(true);
        }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        {showVictoryModal && <VictoryModal points={challenge.points} onClose={() => setShowVictoryModal(false)} />}
      {/* Left Panel: Instructions */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 space-y-4">
        <h1 className="text-3xl font-bold">{challenge.title}</h1>
        <p className="text-gray-300">{challenge.description}</p>
        <div className="flex items-center gap-2 text-yellow-400">
            <StarIcon className="w-5 h-5" />
            <span className="font-semibold">{challenge.points} Points</span>
        </div>
      </div>

      {/* Right Panel: Editor and Output */}
      <div className="flex flex-col gap-4">
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-white/10 flex-grow flex flex-col">
            <div className="p-4 border-b border-white/10 text-gray-300">Éditeur de code</div>
             <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 flex-grow p-4 bg-transparent text-white font-mono focus:outline-none resize-none"
                spellCheck="false"
            />
        </div>
         <button
            onClick={handleRun}
            className="w-full py-3 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300 font-semibold text-lg"
          >
            Exécuter & Vérifier
        </button>
        {output !== null && (
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-white/10 p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Résultat</h3>
                    {isCorrect === true && <div className="flex items-center gap-2 text-green-400"><CheckCircleIcon className="w-6 h-6" /><span>Correct!</span></div>}
                    {isCorrect === false && <div className="flex items-center gap-2 text-red-400"><XCircleIcon className="w-6 h-6" /><span>Incorrect, réessayez.</span></div>}
                </div>
                 {challenge.category === Category.HTML_CSS ? (
                    <iframe title="html-output" srcDoc={output} className="w-full h-32 bg-white rounded-md" />
                ) : (
                     <pre className="bg-black/30 p-3 rounded-md text-white whitespace-pre-wrap font-mono text-sm">{output}</pre>
                )}
            </div>
        )}
      </div>
    </div>
  );
};
