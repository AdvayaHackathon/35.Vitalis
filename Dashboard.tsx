import React, { useState } from 'react';
import { MessageSquare, Activity, Heart, LineChart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { userProfile, healthMetrics, chatHistory, addChatMessage } = useStore();
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    addChatMessage({
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    });

    // Simulate AI response (in a real app, this would call your AI service)
    setTimeout(() => {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I understand your concern. Based on your symptoms, I recommend scheduling an appointment with your healthcare provider for a thorough evaluation.',
        timestamp: new Date().toISOString(),
      });
    }, 1000);

    setMessage('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Health Metrics Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Activity className="h-6 w-6 text-indigo-600 mr-2" />
          Today's Health Metrics
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Steps</div>
            <div className="text-2xl font-bold">8,432</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Calories</div>
            <div className="text-2xl font-bold">1,850</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Heart Rate</div>
            <div className="text-2xl font-bold">72 bpm</div>
          </div>
          {userProfile?.medicalConditions.includes('Diabetes') && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Blood Sugar</div>
              <div className="text-2xl font-bold">120 mg/dL</div>
            </div>
          )}
        </div>
      </div>

      {/* Health Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <LineChart className="h-6 w-6 text-indigo-600 mr-2" />
          Health Trends
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={healthMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="steps" stroke="#6366F1" />
            </Chart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="md:col-span-2 bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-6 w-6 text-indigo-600 mr-2" />
            Health Assistant
          </h2>
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{msg.content}</p>
                  <p className="text-xs mt-1 opacity-75">
                    {format(new Date(msg.timestamp), 'HH:mm')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..."
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard