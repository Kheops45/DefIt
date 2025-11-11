import React, { useMemo } from 'react';
import { User, Level, Category } from '../types';
import { challenges } from '../data/challenges';
import { PythonIcon, HtmlCssIcon, StarIcon, CheckCircleIcon, TrophyIcon } from './Icons';

interface DashboardProps {
  user: User;
  onSelectCategoryAndLevel: (category: Category, level: Level) => void;
}

const DetailedCategoryProgress: React.FC<{
  category: Category;
  user: User;
  onSelectLevel: (level: Level) => void;
}> = ({ category, user, onSelectLevel }) => {
    const categoryChallenges = useMemo(() => challenges.filter(c => c.category === category), [category]);
    const completedInCategory = useMemo(() => 
        categoryChallenges.filter(c => user.progress.completedChallenges.includes(c.id)).length, 
        [categoryChallenges, user.progress.completedChallenges]
    );
    const totalInCategory = categoryChallenges.length;
    const categoryProgress = totalInCategory > 0 ? (completedInCategory / totalInCategory) * 100 : 0;

    const levels = [Level.Beginner, Level.Intermediate, Level.Expert];

    const getIcon = () => {
        switch (category) {
            case Category.Python:
                return <PythonIcon className="w-12 h-12 text-sky-300" />;
            case Category.HTML_CSS:
                return <HtmlCssIcon className="w-12 h-12 text-orange-400" />;
            default:
                return null;
        }
    };
    
    return (
        <div className="bg-black/20 p-6 rounded-lg border border-white/10 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
                {getIcon()}
                <div>
                    <h3 className="text-2xl font-bold">{category}</h3>
                    <p className="text-gray-300">{completedInCategory} / {totalInCategory} défis terminés</p>
                </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${categoryProgress}%` }}>
                </div>
            </div>

            <div className="space-y-4 flex-grow">
                {levels.map(level => {
                    const levelChallenges = categoryChallenges.filter(c => c.level === level);
                    const completed = levelChallenges.filter(c => user.progress.completedChallenges.includes(c.id)).length;
                    const total = levelChallenges.length;
                    const progress = total > 0 ? (completed / total) * 100 : 0;
                    
                    return (
                        <div key={level} className="bg-white/5 p-4 rounded-md">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{level}</span>
                                <span className="text-sm text-gray-300">{completed} / {total}</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2 mb-3">
                                <div className="bg-indigo-400 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                            <button 
                                onClick={() => onSelectLevel(level)}
                                className="w-full text-center py-2 px-3 text-sm font-semibold rounded-md bg-indigo-600 hover:bg-indigo-700 transition"
                            >
                                Voir les défis
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export const Dashboard: React.FC<DashboardProps> = ({ user, onSelectCategoryAndLevel }) => {
    const totalCompleted = user.progress.completedChallenges.length;
    const totalPoints = user.progress.points;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">Bienvenue, {user.username}!</h1>
        <p className="text-xl text-indigo-200">Prêt à relever de nouveaux défis ?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 flex items-center justify-center gap-4">
                <CheckCircleIcon className="w-10 h-10 text-green-400" />
                <div>
                    <div className="text-3xl font-bold">{totalCompleted}</div>
                    <div className="text-gray-300">Défis Réussis</div>
                </div>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 flex items-center justify-center gap-4">
                <StarIcon className="w-10 h-10 text-yellow-400" />
                <div>
                    <div className="text-3xl font-bold">{totalPoints}</div>
                    <div className="text-gray-300">Points Gagnés</div>
                </div>
            </div>
             <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 flex items-center justify-center gap-4">
                <TrophyIcon className="w-10 h-10 text-orange-400" />
                <div>
                    <div className="text-3xl font-bold">{user.progress.badges.length}</div>
                    <div className="text-gray-300">Badges Obtenus</div>
                </div>
            </div>
      </div>
      
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 md:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">Détail de votre Progression</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DetailedCategoryProgress 
                category={Category.Python} 
                user={user} 
                onSelectLevel={(level) => onSelectCategoryAndLevel(Category.Python, level)} 
            />
            <DetailedCategoryProgress 
                category={Category.HTML_CSS} 
                user={user} 
                onSelectLevel={(level) => onSelectCategoryAndLevel(Category.HTML_CSS, level)} 
            />
        </div>
      </div>
    </div>
  );
};
