import React from 'react';
import MoodChart from './MoodChart';

const MoodButton = ({ emoji, label, mood }) => (
  <button className="mood-btn flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors" data-mood={mood}>
    <span className="text-2xl mb-1">{emoji}</span>
    <span className="text-sm">{label}</span>
  </button>
);

const RecommendationCard = ({ title, description, actionText, colorClass }) => (
  <div className={`p-4 bg-${colorClass}-50 rounded-lg`}>
    <h4 className={`font-medium text-${colorClass}-700 mb-2`}>{title}</h4>
    <p className="text-sm text-gray-600 mb-3">{description}</p>
    <button className={`text-${colorClass}-700 text-sm font-medium hover:underline`}>{actionText} →</button>
  </div>
);

const Dashboard = ({ onOpenModal }) => {
  return (
    <>
      {/* Header Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text mb-2">Good morning, Alex!</h2>
        <p className="text-gray-600">How are you feeling today?</p>
      </div>

      {/* Mood Check-in */}
      <div className="bg-surface rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">How are you feeling?</h3>
        <div className="flex space-x-4 ">
          <MoodButton emoji="😢" label="Very Low" mood="1"  />
          <MoodButton emoji="😕" label="Low" mood="2" />
          <MoodButton emoji="😐" label="Neutral" mood="3" />
          <MoodButton emoji="🙂" label="Good" mood="4" />
          <MoodButton emoji="😊" label="Great" mood="5" />
        </div>
        <button
            href="#"
            className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200"
        >
            Submit Mood
        </button>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick actions</h3>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
            Play Music
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Chat with AI
          </button>
          <button onClick={onOpenModal} className="flex items-center px-4 py-2 bg-danger text-white rounded-lg hover:bg-red-600 transition-colors">
            SOS
          </button>
        </div>
      </div>

      {/* Dashboard Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Mood Journey Chart */}
        <div className="lg:col-span-2 bg-surface rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Mood journey (7 days)</h3>
          </div>
          <div className="h-64">
            <MoodChart />
          </div>
        </div>

        {/* Journal Prompt */}
        <div className="bg-surface rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Journal prompt</h3>
          <p className="text-gray-600 mb-4">What's one thing you're grateful for today?</p>
          <textarea className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Write your thoughts..."></textarea>
          <button className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">Save</button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-surface rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recommendations for you</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecommendationCard title="Breathing Exercise" description="5-minute guided breathing to reduce stress" actionText="Start now" colorClass="blue" />
          <RecommendationCard title="Nature Walk" description="Take a 10-minute walk outside for fresh air" actionText="Learn more" colorClass="green" />
          <RecommendationCard title="Meditation" description="Short mindfulness session to center yourself" actionText="Begin" colorClass="purple" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;