import React, { useEffect } from 'react';
import { User } from '../types';
import { challenges } from '../data/challenges';
import { allBadges } from '../data/badges';
import { Badge as BadgeType } from '../types';
import { StarIcon, CheckCircleIcon, TrophyIcon } from './Icons';

interface ProfileProps {
  user: User;
  newlyEarnedBadgeIds: string[];
  onAnimationShown: () => void;
}

interface BadgeDisplayProps {
    badge: BadgeType;
    isNew: boolean;
    animationDelay: number;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ badge, isNew, animationDelay }) => (
    <div 
        className={`flex flex-col items-center text-center gap-2 p-4 bg-white/10 rounded-lg border border-white/20 group relative ${isNew ? 'animate-badge-reveal new-badge-glow-effect' : ''}`}
        style={isNew ? { animationDelay: `${animationDelay}ms` } : {}}
    >
        <div className="w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <badge.icon className="w-12 h-12" />
        </div>
        <span className="font-semibold text-sm">{badge.title}</span>
        <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 text-xs bg-gray-900 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {badge.description}
        </div>
    </div>
);


export const Profile: React.FC<ProfileProps> = ({ user, newlyEarnedBadgeIds, onAnimationShown }) => {
    const totalCompleted = user.progress.completedChallenges.length;
    const totalPoints = user.progress.points;
    const totalChallenges = challenges.length;
    const completionPercentage = totalChallenges > 0 ? Math.round((totalCompleted / totalChallenges) * 100) : 0;

    const earnedBadges = allBadges.filter(badge => user.progress.badges.includes(badge.id));

    useEffect(() => {
        if (newlyEarnedBadgeIds.length > 0) {
            // Set a timeout to clear the "new" status after animations are done
            // Increased timeout to allow glow effect to be visible for a few seconds
            const timer = setTimeout(() => {
                onAnimationShown();
            }, newlyEarnedBadgeIds.length * 150 + 4000); // Stagger delay + 4s for glow

            return () => clearTimeout(timer);
        }
    }, [newlyEarnedBadgeIds, onAnimationShown]);

    return (
        <div className="animate-fade-in p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 text-center flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-5xl font-bold mb-4">
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-4xl font-bold">{user.username}</h1>
                    <p className="text-indigo-200">Apprenti Codeur</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 text-center">
                        <StarIcon className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold">{totalPoints}</div>
                        <div className="text-gray-300">Points</div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 text-center">
                        <CheckCircleIcon className="w-10 h-10 text-green-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold">{totalCompleted}</div>
                        <div className="text-gray-300">Défis terminés</div>
                    </div>
                     <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 text-center">
                        <TrophyIcon className="w-10 h-10 text-orange-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold">{earnedBadges.length}</div>
                        <div className="text-gray-300">Badges</div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
                     <h2 className="text-2xl font-bold mb-6">Progression Globale</h2>
                     <div className="w-full bg-gray-700 rounded-full h-4">
                        <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full text-center text-white text-xs font-bold flex items-center justify-center" 
                        style={{ width: `${completionPercentage}%` }}>
                            {completionPercentage > 10 && `${completionPercentage}%`}
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8 mt-8">
                    <h2 className="text-2xl font-bold mb-6">Badges Obtenus</h2>
                    {earnedBadges.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {earnedBadges.map((badge) => {
                                const isNew = newlyEarnedBadgeIds.includes(badge.id);
                                const newIndex = newlyEarnedBadgeIds.indexOf(badge.id);
                                return (
                                    <BadgeDisplay
                                        key={badge.id}
                                        badge={badge}
                                        isNew={isNew}
                                        animationDelay={isNew ? newIndex * 150 : 0}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Aucun badge pour le moment. Continuez les défis !</p>
                    )}
                </div>
            </div>
        </div>
    );
};