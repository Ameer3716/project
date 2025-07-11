import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Upload, 
  Globe, 
  Eye, 
  Save, 
  Download,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Settings,
  Crown,
  Link as LinkIcon
} from 'lucide-react';

const WhiteLabelPage = () => {
  const [brandingConfig, setBrandingConfig] = useState({
    logo: null,
    customDomain: 'portal.agency.com',
    primaryColor: '#00FFFF',
    secondaryColor: '#E42289',
    companyName: 'Your Agency',
    showPoweredBy: true,
    favicon: null
  });
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const handleColorChange = (colorType, color) => {
    setBrandingConfig(prev => ({
      ...prev,
      [colorType]: color
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setBrandingConfig(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const refreshPreview = () => {
    setIsPreviewLoading(true);
    setTimeout(() => setIsPreviewLoading(false), 1000);
  };

  const ColorPicker = ({ label, value, onChange, description }) => (
    <div className="space-y-3">
      <div>
        <label className="block text-[#F0F0F0] font-medium mb-1">
          {label}
        </label>
        {description && (
          <p className="text-white/60 text-sm">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer"
            style={{ backgroundColor: value }}
          />
          <div 
            className="absolute inset-0 rounded-lg border-2 border-white/20 pointer-events-none"
            style={{ 
              boxShadow: `0 0 20px ${value}40`
            }}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-[#F0F0F0] font-mono focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
            placeholder="#00FFFF"
          />
        </div>
      </div>
    </div>
  );

  const FileUploader = ({ label, accept, onChange, currentFile, description }) => (
    <div className="space-y-3">
      <div>
        <label className="block text-[#F0F0F0] font-medium mb-1">
          {label}
        </label>
        {description && (
          <p className="text-white/60 text-sm">{description}</p>
        )}
      </div>
      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#00FFFF]/40 transition-colors cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files[0])}
          className="hidden"
          id={`upload-${label.toLowerCase().replace(' ', '-')}`}
        />
        <label 
          htmlFor={`upload-${label.toLowerCase().replace(' ', '-')}`}
          className="cursor-pointer"
        >
          <Upload className="mx-auto text-white/40 mb-3" size={32} />
          <p className="text-[#F0F0F0] font-medium mb-1">
            {currentFile ? currentFile.name : `Upload ${label}`}
          </p>
          <p className="text-white/60 text-sm">
            {accept.split(',').join(', ')} files supported
          </p>
        </label>
      </div>
    </div>
  );

  const PreviewFrame = () => {
    const deviceStyles = {
      desktop: { width: '100%', height: '100%' },
      tablet: { width: '768px', height: '1024px', maxWidth: '100%', maxHeight: '100%' },
      mobile: { width: '375px', height: '667px', maxWidth: '100%', maxHeight: '100%' }
    };

    return (
      <div className="bg-black/40 rounded-lg p-4 h-full flex items-center justify-center">
        <motion.div
          className="bg-white/5 rounded-lg border border-white/10 overflow-hidden relative"
          style={deviceStyles[previewDevice]}
          animate={{ scale: isPreviewLoading ? 0.95 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isPreviewLoading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="text-[#00FFFF]" size={32} />
              </motion.div>
            </div>
          )}
          
          {/* Mock Dashboard Preview */}
          <div className="h-full flex flex-col">
            {/* Header */}
            <div 
              className="p-4 border-b border-white/10"
              style={{ backgroundColor: `${brandingConfig.primaryColor}20` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  {brandingConfig.logo ? '📷' : '🏢'}
                </div>
                <span className="text-[#F0F0F0] font-bold">
                  {brandingConfig.companyName}
                </span>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="flex flex-1">
              <div className="w-64 bg-black/20 border-r border-white/10 p-4">
                <div className="space-y-2">
                  {['Dashboard', 'Analytics', 'Settings'].map((item, index) => (
                    <div 
                      key={item}
                      className={`p-3 rounded-lg transition-colors ${
                        index === 0 
                          ? 'border' 
                          : 'hover:bg-white/5'
                      }`}
                      style={index === 0 ? { 
                        borderColor: brandingConfig.primaryColor,
                        backgroundColor: `${brandingConfig.primaryColor}20`
                      } : {}}
                    >
                      <span className="text-[#F0F0F0] text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 p-6">
                <h2 className="text-xl font-bold text-[#F0F0F0] mb-4">
                  Welcome to {brandingConfig.companyName}
                </h2>
                
                {/* Sample Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Calls', value: '1,247', color: brandingConfig.primaryColor },
                    { label: 'Success Rate', value: '92%', color: brandingConfig.secondaryColor },
                    { label: 'Active Users', value: '24', color: '#9333EA' }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div 
                        className="text-2xl font-bold mb-1"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Sample Chart */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10 h-32">
                  <div className="text-[#F0F0F0] font-medium mb-3">Performance Overview</div>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 45, 80, 55, 70, 60].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(to top, ${brandingConfig.primaryColor}, ${brandingConfig.secondaryColor})`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            {brandingConfig.showPoweredBy && (
              <div className="p-3 border-t border-white/10 text-center">
                <span className="text-white/40 text-xs">
                  Powered by CallEase
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-[#E42289] mb-2">
          White-Label Studio
        </h1>
        <p className="text-[#00FFFF]/80">
          Branded Solutions & Custom Portal Designer
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branding Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-6 hover:border-[#00FFFF]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                <Palette className="text-white" size={20} />
              </div>
              <h3 className="text-xl font-bold text-[#F0F0F0]">
                Branding Configuration
              </h3>
            </div>

            <div className="space-y-6">
              {/* Company Name */}
              <div>
                <label className="block text-[#F0F0F0] font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={brandingConfig.companyName}
                  onChange={(e) => setBrandingConfig(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-[#F0F0F0] focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                  placeholder="Your Agency Name"
                />
              </div>

              {/* Logo Upload */}
              <FileUploader
                label="Company Logo"
                accept=".png,.jpg,.jpeg,.svg"
                onChange={(file) => handleFileUpload('logo', file)}
                currentFile={brandingConfig.logo}
                description="Recommended: 200x60px, PNG or SVG"
              />

              {/* Favicon Upload */}
              <FileUploader
                label="Favicon"
                accept=".ico,.png"
                onChange={(file) => handleFileUpload('favicon', file)}
                currentFile={brandingConfig.favicon}
                description="32x32px ICO or PNG file"
              />

              {/* Custom Domain */}
              <div>
                <label className="block text-[#F0F0F0] font-medium mb-2">
                  Custom Domain
                </label>
                <div className="flex items-center gap-2">
                  <Globe className="text-[#00FFFF]" size={20} />
                  <input
                    type="text"
                    value={brandingConfig.customDomain}
                    onChange={(e) => setBrandingConfig(prev => ({ ...prev, customDomain: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-[#F0F0F0] focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20 transition-all duration-300"
                    placeholder="portal.youragency.com"
                  />
                </div>
                <p className="text-white/60 text-sm mt-1">
                  Configure DNS to point to our servers
                </p>
              </div>

              {/* Color Customization */}
              <ColorPicker
                label="Primary Accent Color"
                value={brandingConfig.primaryColor}
                onChange={(color) => handleColorChange('primaryColor', color)}
                description="Main brand color for buttons and highlights"
              />

              <ColorPicker
                label="Secondary Accent Color"
                value={brandingConfig.secondaryColor}
                onChange={(color) => handleColorChange('secondaryColor', color)}
                description="Secondary color for gradients and accents"
              />

              {/* Powered By Toggle */}
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                <div>
                  <div className="text-[#F0F0F0] font-medium">Show "Powered by CallEase"</div>
                  <div className="text-white/60 text-sm">Display attribution in footer</div>
                </div>
                <motion.button
                  onClick={() => setBrandingConfig(prev => ({ ...prev, showPoweredBy: !prev.showPoweredBy }))}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                    brandingConfig.showPoweredBy ? 'bg-gradient-to-r from-[#E42289] to-[#00FFFF]' : 'bg-white/20'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                    animate={{ x: brandingConfig.showPoweredBy ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <motion.button
                className="flex-1 py-3 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg text-white font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={16} />
                Save Configuration
              </motion.button>
              <motion.button
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl overflow-hidden hover:border-[#00FFFF]/40 transition-all duration-300">
            {/* Preview Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#E42289] to-[#00FFFF] rounded-lg flex items-center justify-center">
                    <Eye className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#F0F0F0]">
                      Live Preview
                    </h3>
                    <p className="text-white/60 text-sm">
                      Real-time preview of your branded portal
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Device Selector */}
                  <div className="flex bg-black/20 rounded-lg p-1">
                    {[
                      { id: 'desktop', icon: Monitor },
                      { id: 'tablet', icon: Tablet },
                      { id: 'mobile', icon: Smartphone }
                    ].map(({ id, icon: Icon }) => (
                      <motion.button
                        key={id}
                        onClick={() => setPreviewDevice(id)}
                        className={`p-2 rounded transition-colors ${
                          previewDevice === id 
                            ? 'bg-[#00FFFF]/20 text-[#00FFFF]' 
                            : 'text-white/60 hover:text-white/80'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon size={16} />
                      </motion.button>
                    ))}
                  </div>

                  {/* Refresh Button */}
                  <motion.button
                    onClick={refreshPreview}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={isPreviewLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, ease: "linear" }}
                  >
                    <RefreshCw className="text-[#00FFFF]" size={16} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="h-96 lg:h-[600px]">
              <PreviewFrame />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              className="bg-white/10 backdrop-blur-[10px] border border-[#00FFFF]/20 rounded-xl p-4 hover:border-[#00FFFF]/40 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00FFFF]/20 rounded-lg flex items-center justify-center">
                  <LinkIcon className="text-[#00FFFF]" size={16} />
                </div>
                <div>
                  <div className="text-[#F0F0F0] font-medium">Setup Domain</div>
                  <div className="text-white/60 text-sm">Configure DNS settings</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-[10px] border border-[#E42289]/20 rounded-xl p-4 hover:border-[#E42289]/40 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#E42289]/20 rounded-lg flex items-center justify-center">
                  <Crown className="text-[#E42289]" size={16} />
                </div>
                <div>
                  <div className="text-[#F0F0F0] font-medium">Premium Features</div>
                  <div className="text-white/60 text-sm">Advanced customization</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-[10px] border border-[#9333EA]/20 rounded-xl p-4 hover:border-[#9333EA]/40 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#9333EA]/20 rounded-lg flex items-center justify-center">
                  <Settings className="text-[#9333EA]" size={16} />
                </div>
                <div>
                  <div className="text-[#F0F0F0] font-medium">Advanced Settings</div>
                  <div className="text-white/60 text-sm">Custom CSS & scripts</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhiteLabelPage;