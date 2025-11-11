import { UserProgress, Challenge, Category, Level } from '../types';
import { allBadges } from '../data/badges';
import { challenges as allChallenges } from '../data/challenges';

// This function checks for new badges based on the latest user progress.
export const checkNewBadges = (progress: UserProgress): string[] => {
  const newBadges: string[] = [];
  const alreadyEarned = new Set(progress.badges);

  const hasCompletedCategoryLevel = (category: Category, level: Level): boolean => {
    const relevantChallenges = allChallenges.filter(c => c.category === category && c.level === level);
    if (relevantChallenges.length === 0) return false;
    return relevantChallenges.every(c => progress.completedChallenges.includes(c.id));
  };

  for (const badge of allBadges) {
    if (alreadyEarned.has(badge.id)) continue;

    let earned = false;
    switch (badge.id) {
      // Point milestones
      case 'points-100':
        if (progress.points >= 100) earned = true;
        break;
      case 'points-500':
        if (progress.points >= 500) earned = true;
        break;
      
      // Completion milestones
      case 'complete-1':
        if (progress.completedChallenges.length >= 1) earned = true;
        break;
      case 'complete-10':
        if (progress.completedChallenges.length >= 10) earned = true;
        break;

      // Category/Level completion
      case 'python-beginner':
        if (hasCompletedCategoryLevel(Category.Python, Level.Beginner)) earned = true;
        break;
      case 'python-intermediate':
        if (hasCompletedCategoryLevel(Category.Python, Level.Intermediate)) earned = true;
        break;
      case 'python-expert':
        if (hasCompletedCategoryLevel(Category.Python, Level.Expert)) earned = true;
        break;
      case 'html-beginner':
        if (hasCompletedCategoryLevel(Category.HTML_CSS, Level.Beginner)) earned = true;
        break;
      case 'html-intermediate':
        if (hasCompletedCategoryLevel(Category.HTML_CSS, Level.Intermediate)) earned = true;
        break;
      case 'html-expert':
        if (hasCompletedCategoryLevel(Category.HTML_CSS, Level.Expert)) earned = true;
        break;
      case 'master-coder':
         if (progress.completedChallenges.length === allChallenges.length) earned = true;
         break;
    }

    if (earned) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
};
