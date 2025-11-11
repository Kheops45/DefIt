
import React from 'react';
import { User, Challenge, Level, Category } from '../types';
import { challenges } from '../data/challenges';
import { StarIcon, LockIcon, CheckCircleIcon } from './Icons';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onSelect: (id: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isCompleted, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(challenge.id)}
      className="w-full text-left p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xl font-bold">{challenge.title}</h3>
            <p className="text-gray-300 mt-1 text-sm">{challenge.description}</p>
        </div>
        {isCompleted && <CheckCircleIcon className="w-8 h-8 text-green-400 flex-shrink-0 ml-4" />}
      </div>
      <div className="flex items-center gap-2 mt-4 text-yellow-400">
        <StarIcon className="w-5 h-5" />
        <span className="font-semibold">{challenge.points} Points</span>
      </div>
    </button>
  );
};

interface ChallengeListProps {
  user: User;
  category: Category;
  level: Level;
  onSelectChallenge: (challengeId: string) => void;
}

export const ChallengeList: React.FC<ChallengeListProps> = ({ user, category, level, onSelectChallenge }) => {
  const filteredChallenges = challenges.filter(c => c.category === category && c.level === level);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">{category} - {level}</h1>
        <p className="text-lg text-indigo-200 mt-1">Choisissez un défi pour commencer</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            isCompleted={user.progress.completedChallenges.includes(challenge.id)}
            onSelect={onSelectChallenge}
          />
        ))}
      </div>
    </div>
  );
};
