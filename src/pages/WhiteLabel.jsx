import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Upload, Eye, Save, Monitor, Smartphone, Tablet } from 'lucide-react';

const WhiteLabel = () => {
  const [settings, setSettings] = useState({
    logo: null,
    primaryColor: '#E42289',
    secondaryColor: '#00FFFF',
    customDomain: 'client.callease.com',
    companyName: 'Your Company',
    brandingEnabled: true
  });

  const [previewDevice, setPreviewDevice] = useState('desktop');

  const handleColorChange = (colorType, color) => {
    setSettings(prev => ({
      ...prev,
      [colorType]: color
    }));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          logo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">White-Label Branding</h1>
          <p className="text-[#E42289]">Customize the platform with your client's branding</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Logo Upload */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Logo Upload
            </h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#E42289] transition-colors duration-200">
                {settings.logo ? (
                  <div className="space-y-4">
                    <img
                      src={settings.logo}
                      alt="Uploaded logo"
                      className="max-h-20 mx-auto"
                    />
                    <p className="text-sm text-gray-600">Logo uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">Click to upload your logo</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Color Customization */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0C0A1D] mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Scheme
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primaryColor}
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondaryColor}
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Domain Settings */}
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-[#0C0A1D] mb-4">Custom Domain</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain Name</label>
                <input
                  type="text"
                  value={settings.customDomain}
                  onChange={(e) => setSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
                  placeholder="client.callease.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E42289]"
                  placeholder="Your Company Name"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="branding"
                  checked={settings.brandingEnabled}
                  onChange={(e) => setSettings(prev => ({ ...prev, brandingEnabled: e.target.checked }))}
                  className="w-4 h-4 text-[#E42289] border-gray-300 rounded focus:ring-[#E42289]"
                />
                <label htmlFor="branding" className="text-sm text-gray-700">
                  Enable white-label branding
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0C0A1D] flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </h3>
            
            <div className="flex gap-2">
              {[
                { id: 'desktop', icon: Monitor },
                { id: 'tablet', icon: Tablet },
                { id: 'mobile', icon: Smartphone }
              ].map(device => (
                <button
                  key={device.id}
                  onClick={() => setPreviewDevice(device.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    previewDevice === device.id
                      ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <device.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview Frame */}
          <div className={`mx-auto bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 ${
            previewDevice === 'desktop' ? 'w-full h-96' :
            previewDevice === 'tablet' ? 'w-80 h-96' :
            'w-64 h-96'
          }`}>
            <motion.div
              className="w-full h-full bg-[#F0F8FF] relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}10, ${settings.secondaryColor}10)`
              }}
            >
              {/* Mock Header */}
              <div 
                className="h-16 flex items-center justify-between px-6 text-white"
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                }}
              >
                <div className="flex items-center gap-3">
                  {settings.logo ? (
                    <img src={settings.logo} alt="Logo" className="h-8" />
                  ) : (
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                  )}
                  <span className="font-bold">{settings.companyName}</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span>Dashboard</span>
                  <span>Reports</span>
                  <span>Settings</span>
                </div>
              </div>

              {/* Mock Content */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-[#0C0A1D]">Dashboard Overview</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-gray-600">Total Calls</div>
                    <div className="text-2xl font-bold text-[#0C0A1D]">1,247</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <div className="text-sm text-gray-600">Success Rate</div>
                    <div className="text-2xl font-bold text-[#0C0A1D]">87%</div>
                  </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: settings.primaryColor }}
                      />
                      <span className="text-sm">New call completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: settings.secondaryColor }}
                      />
                      <span className="text-sm">Agent joined queue</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  className="w-full py-2 text-white rounded-lg font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start New Call
                </motion.button>
              </div>

              {/* Transition Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                style={{ width: '50%' }}
              />
            </motion.div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Preview updates in real-time as you modify settings
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhiteLabel;