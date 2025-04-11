import React from 'react';
import { Heart, Activity, Thermometer } from 'lucide-react';
import { useStore } from '../store/useStore';

const Vitals: React.FC = () => {
  const userProfile = useStore((state) => state.userProfile);
  const healthMetrics = useStore((state) => state.healthMetrics);

  const latestMetrics = healthMetrics[healthMetrics.length - 1] || {
    heartRate: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
    bloodSugar: 0,
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vitals Monitor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Heart Rate</h3>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {latestMetrics.heartRate} <span className="text-sm text-gray-500">bpm</span>
          </div>
        </div>

        {userProfile?.medicalConditions.includes('Hypertension') && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Activity className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Blood Pressure</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {latestMetrics.bloodPressure?.systolic}/{latestMetrics.bloodPressure?.diastolic}
              <span className="text-sm text-gray-500"> mmHg</span>
            </div>
          </div>
        )}

        {userProfile?.medicalConditions.includes('Diabetes') && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Thermometer className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Blood Sugar</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {latestMetrics.bloodSugar}
              <span className="text-sm text-gray-500"> mg/dL</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Reading</h3>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heart Rate (bpm)
            </label>
            <input
              type="number"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {userProfile?.medicalConditions.includes('Hypertension') && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Systolic (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diastolic (mmHg)
                </label>
                <input
                  type="number"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {userProfile?.medicalConditions.includes('Diabetes') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Sugar (mg/dL)
              </label>
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          )}
        </form>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vitals;