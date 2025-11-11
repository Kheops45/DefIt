import React from 'react';
import { Badge } from '../types';
import { TrophyIcon, StarIcon, PythonIcon, HtmlCssIcon, CheckCircleIcon } from '../components/Icons';

export const allBadges: Badge[] = [
    // --- Point Milestones ---
    {
        id: 'points-100',
        title: 'Centurion',
        description: 'Atteindre 100 points.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(StarIcon, {...props, className: `text-yellow-400 ${props.className}`}),
    },
    {
        id: 'points-500',
        title: 'Maître des Points',
        description: 'Atteindre 500 points.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(StarIcon, {...props, className: `text-amber-500 ${props.className}`}),
    },
    // --- Completion Milestones ---
    {
        id: 'complete-1',
        title: 'Premiers Pas',
        description: 'Terminer votre premier défi.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(CheckCircleIcon, {...props, className: `text-green-400 ${props.className}`}),
    },
    {
        id: 'complete-10',
        title: 'Apprenti Codeur',
        description: 'Terminer 10 défis.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(CheckCircleIcon, {...props, className: `text-teal-400 ${props.className}`}),
    },
    // --- Python Course Completion ---
    {
        id: 'python-beginner',
        title: 'Python Débutant',
        description: 'Terminer tous les défis Python de niveau Débutant.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(PythonIcon, {...props, className: `text-sky-400 ${props.className}`}),
    },
    {
        id: 'python-intermediate',
        title: 'Python Intermédiaire',
        description: 'Terminer tous les défis Python de niveau Intermédiaire.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(PythonIcon, {...props, className: `text-sky-300 ${props.className}`}),
    },
    {
        id: 'python-expert',
        title: 'Expert Python',
        description: 'Terminer tous les défis Python de niveau Expert.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(PythonIcon, {...props, className: `text-sky-200 ${props.className}`}),
    },
    // --- HTML/CSS Course Completion ---
    {
        id: 'html-beginner',
        title: 'HTML/CSS Débutant',
        description: 'Terminer tous les défis HTML/CSS de niveau Débutant.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(HtmlCssIcon, {...props, className: `text-orange-400 ${props.className}`}),
    },
     {
        id: 'html-intermediate',
        title: 'HTML/CSS Intermédiaire',
        description: 'Terminer tous les défis HTML/CSS de niveau Intermédiaire.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(HtmlCssIcon, {...props, className: `text-orange-300 ${props.className}`}),
    },
    {
        id: 'html-expert',
        title: 'Expert HTML/CSS',
        description: 'Terminer tous les défis HTML/CSS de niveau Expert.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(HtmlCssIcon, {...props, className: `text-orange-200 ${props.className}`}),
    },
    // --- Grand Master ---
    {
        id: 'master-coder',
        title: 'Maître du Code',
        description: 'Terminer tous les défis disponibles.',
        // FIX: Replaced JSX with React.createElement to be valid in a .ts file.
        icon: (props) => React.createElement(TrophyIcon, {...props, className: `text-violet-400 ${props.className}`}),
    }
];
