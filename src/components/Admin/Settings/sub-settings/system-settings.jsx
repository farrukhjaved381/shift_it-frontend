import { useState } from "react";

export default function SystemSettings() {
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [notificationEmail, setNotificationEmail] = useState("");
  const [autoLogout, setAutoLogout] = useState(30);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-sm p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-900 mb-2 text-center">System Settings</h1>
        <p className="text-gray-600 mb-6 text-center">Configure system preferences and advanced options here.</p>

        <form className="space-y-6">
          {/* Language Select */}
          <div>
            <label htmlFor="language" className="block text-gray-800 font-medium mb-1">Language</label>
            <select
              id="language"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          {/* Timezone Input */}
          <div>
            <label htmlFor="timezone" className="block text-gray-800 font-medium mb-1">Timezone</label>
            <input
              id="timezone"
              type="text"
              value={timezone}
              onChange={e => setTimezone(e.target.value)}
              placeholder="e.g. GMT+5, PST, EST"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Date Format Select */}
          <div>
            <label htmlFor="dateFormat" className="block text-gray-800 font-medium mb-1">Date Format</label>
            <select
              id="dateFormat"
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          {/* Notification Email */}
          <div>
            <label htmlFor="notificationEmail" className="block text-gray-800 font-medium mb-1">Notification Email</label>
            <input
              id="notificationEmail"
              type="email"
              value={notificationEmail}
              onChange={e => setNotificationEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Auto Logout Duration */}
          <div>
            <label htmlFor="autoLogout" className="block text-gray-800 font-medium mb-1">Auto Logout (minutes)</label>
            <input
              id="autoLogout"
              type="number"
              min={5}
              max={120}
              value={autoLogout}
              onChange={e => setAutoLogout(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Save Button (dummy) */}
          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition-colors"
            onClick={() => alert("Settings saved (dummy)")}
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
