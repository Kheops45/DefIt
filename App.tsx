import React, { useState, useEffect, useMemo } from 'react';
import { challenges } from './data/challenges';
import { User, Challenge, Level, Category, UserProgress } from './types';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { ChallengeList } from './components/ChallengeList';
import { ChallengeView } from './components/ChallengeView';
import { Profile } from './components/Profile';
import { Header } from './components/Header';
import { findOrCreateUser, saveUser } from './services/api';
import { checkNewBadges } from './utils/badgeManager';

type Page = 'dashboard' | 'challengeList' | 'challengeView' | 'profile';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<Page>('dashboard');
    const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Python);
    const [selectedLevel, setSelectedLevel] = useState<Level>(Level.Beginner);
    const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
    const [newlyEarnedBadgeIds, setNewlyEarnedBadgeIds] = useState<string[]>([]);

    useEffect(() => {
        const storedUserJson = localStorage.getItem('defitUser');
        if (storedUserJson) {
            setUser(JSON.parse(storedUserJson));
        }
        setIsLoading(false);
    }, []);

    const handleGoogleSignIn = async () => {
        // In a real app, this would come from the Google Auth SDK.
        // We simulate it here with a mock profile.
        const mockGoogleProfile = {
            id: 'google_123456789', // A stable, unique ID for the mock user
            username: 'SuperCoder',
        };

        const signedInUser = await findOrCreateUser(mockGoogleProfile);
        if (signedInUser) {
            setUser(signedInUser);
            localStorage.setItem('defitUser', JSON.stringify(signedInUser));
        } else {
            // This case is less likely with findOrCreateUser but good for safety
            alert('La connexion avec Google a échoué. Veuillez réessayer.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('defitUser');
        setUser(null);
        setPage('dashboard');
    };

    const handleChallengeComplete = async (challengeId: string, points: number) => {
        if (!user) return;

        // Avoid re-adding points for already completed challenges
        if (user.progress.completedChallenges.includes(challengeId)) {
            console.log("Challenge already completed, not awarding points again.");
            return;
        }

        const updatedProgress: UserProgress = {
            ...user.progress,
            completedChallenges: [...user.progress.completedChallenges, challengeId],
            points: user.progress.points + points,
        };

        const newBadgeIds = checkNewBadges(updatedProgress);
        if (newBadgeIds.length > 0) {
            updatedProgress.badges.push(...newBadgeIds);
            console.log("Nouveaux badges gagnés:", newBadgeIds);
            setNewlyEarnedBadgeIds(newBadgeIds);
        }

        const updatedUser = { ...user, progress: updatedProgress };
        setUser(updatedUser);
        await saveUser(updatedUser);
    };

    const handleSelectCategoryAndLevel = (category: Category, level: Level) => {
        setSelectedCategory(category);
        setSelectedLevel(level);
        setPage('challengeList');
    };

    const handleSelectChallenge = (challengeId: string) => {
        setSelectedChallengeId(challengeId);
        setPage('challengeView');
    };
    
    const selectedChallenge = useMemo(() => {
        return challenges.find(c => c.id === selectedChallengeId) || null;
    }, [selectedChallengeId]);

    const clearNewBadgesAnimation = () => {
        setNewlyEarnedBadgeIds([]);
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-screen"><p>Chargement...</p></div>;
        }

        if (!user) {
            return <AuthForm onGoogleSignIn={handleGoogleSignIn} />;
        }
        switch (page) {
            case 'dashboard':
                return <Dashboard user={user} onSelectCategoryAndLevel={handleSelectCategoryAndLevel} />;
            case 'challengeList':
                return <ChallengeList user={user} category={selectedCategory} level={selectedLevel} onSelectChallenge={handleSelectChallenge} />;
            case 'challengeView':
                if (selectedChallenge) {
                    return <ChallengeView user={user} challenge={selectedChallenge} onChallengeComplete={handleChallengeComplete} />;
                }
                setPage('dashboard'); // Fallback if challenge is not found
                return null;
            case 'profile':
                 return <Profile user={user} newlyEarnedBadgeIds={newlyEarnedBadgeIds} onAnimationShown={clearNewBadgesAnimation} />;
            default:
                return <Dashboard user={user} onSelectCategoryAndLevel={handleSelectCategoryAndLevel} />;
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-900/80 via-blue-900/60 to-pink-900/70 z-0"></div>
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-slower"></div>
            
            <main className="relative z-10 flex flex-col items-center p-4 min-h-screen">
                 {user && <Header username={user.username} points={user.progress.points} onNavigate={setPage} onLogout={handleLogout} />}
                <div className="w-full max-w-7xl mx-auto mt-4">
                  {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default App;
