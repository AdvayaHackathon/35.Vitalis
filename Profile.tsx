import React from 'react';
import { useStore } from '../store/useStore';

const Profile: React.FC = () => {
  const userProfile = useStore((state) => state.userProfile);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Name</label>
            <p className="text-lg text-gray-800">{userProfile.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Age</label>
              <p className="text-lg text-gray-800">{userProfile.age}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Gender</label>
              <p className="text-lg text-gray-800">{userProfile.gender}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Weight</label>
              <p className="text-lg text-gray-800">{userProfile.weight} kg</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Height</label>
              <p className="text-lg text-gray-800">{userProfile.height} cm</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Medical Conditions</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {userProfile.medicalConditions.map((condition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Current Medications</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {userProfile.medications.map((medication, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {medication}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
            <p className="text-lg text-gray-800">{userProfile.emergencyContact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;