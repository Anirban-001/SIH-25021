import { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample user profile data
  const userProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@indianrailways.gov.in',
    department: 'Inventory Management',
    role: 'Manager',
    phone: '+91 9876543210',
    location: 'New Delhi',
  };

  // Sample notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    stockAlerts: true,
    supplierUpdates: false,
    maintenanceReminders: true,
    weeklyReports: true,
    systemAnnouncements: true
  });

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-tabs">
        <div 
          className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </div>
        <div 
          className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </div>
        <div 
          className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </div>
        <div 
          className={`settings-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System
        </div>
      </div>

      {activeTab === 'profile' && (
        <div className="settings-section">
          <h3>Profile Information</h3>
          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control" 
                  defaultValue={userProfile.name} 
                />
              </div>
            </div>
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  defaultValue={userProfile.email} 
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input 
                  type="text" 
                  id="department" 
                  className="form-control" 
                  defaultValue={userProfile.department} 
                />
              </div>
            </div>
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input 
                  type="text" 
                  id="role" 
                  className="form-control" 
                  defaultValue={userProfile.role} 
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="text" 
                  id="phone" 
                  className="form-control" 
                  defaultValue={userProfile.phone} 
                />
              </div>
            </div>
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  className="form-control" 
                  defaultValue={userProfile.location} 
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-save">Save Changes</button>
            <button className="btn-cancel">Cancel</button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="settings-section">
          <h3>Notification Settings</h3>
          
          <div className="switch-row">
            <span className="switch-label">Email Alerts</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.emailAlerts}
                onChange={() => handleNotificationChange('emailAlerts')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="switch-row">
            <span className="switch-label">Stock Level Alerts</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.stockAlerts}
                onChange={() => handleNotificationChange('stockAlerts')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="switch-row">
            <span className="switch-label">Supplier Updates</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.supplierUpdates}
                onChange={() => handleNotificationChange('supplierUpdates')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="switch-row">
            <span className="switch-label">Maintenance Reminders</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.maintenanceReminders}
                onChange={() => handleNotificationChange('maintenanceReminders')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="switch-row">
            <span className="switch-label">Weekly Reports</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.weeklyReports}
                onChange={() => handleNotificationChange('weeklyReports')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="switch-row">
            <span className="switch-label">System Announcements</span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={notificationSettings.systemAnnouncements}
                onChange={() => handleNotificationChange('systemAnnouncements')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="form-actions">
            <button className="btn-save">Save Preferences</button>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="settings-section">
          <h3>Security Settings</h3>
          
          <div className="form-group">
            <label htmlFor="current-password">Current Password</label>
            <input type="password" id="current-password" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" className="form-control" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input type="password" id="confirm-password" className="form-control" />
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="two-factor" />
            <label htmlFor="two-factor">Enable Two-Factor Authentication</label>
          </div>

          <div className="form-actions">
            <button className="btn-save">Update Password</button>
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="settings-section">
          <h3>System Preferences</h3>
          
          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select id="language" className="form-control">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="bn">Bengali</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Timezone</label>
            <select id="timezone" className="form-control">
              <option value="IST">Indian Standard Time (IST)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateformat">Date Format</label>
            <select id="dateformat" className="form-control">
              <option value="dd/mm/yyyy">DD/MM/YYYY</option>
              <option value="mm/dd/yyyy">MM/DD/YYYY</option>
              <option value="yyyy-mm-dd">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="autosave" defaultChecked />
            <label htmlFor="autosave">Enable Autosave</label>
          </div>

          <div className="form-actions">
            <button className="btn-save">Save Preferences</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;