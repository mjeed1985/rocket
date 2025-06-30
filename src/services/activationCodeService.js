// Activation Code Service
class ActivationCodeService {
  constructor() {
    this.storageKey = 'schoolplan_activation_codes';
    this.usedCodesKey = 'schoolplan_used_codes';
  }

  // Generate a random activation code
  generateCode() {
    const prefix = 'SP';
    const year = new Date().getFullYear();
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    
    for (let i = 0; i < 6; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return `${prefix}-${year}-${randomPart}`;
  }

  // Create multiple activation codes
  createCodes(options = {}) {
    const {
      quantity = 1,
      expiryDays = 30,
      schoolLevel = 'all',
      description = ''
    } = options;

    const existingCodes = this.getAllCodes();
    const newCodes = [];
    const currentDate = new Date();

    for (let i = 0; i < quantity; i++) {
      let code;
      let attempts = 0;
      
      // Ensure unique code generation
      do {
        code = this.generateCode();
        attempts++;
      } while (this.codeExists(code, existingCodes) && attempts < 100);

      if (attempts >= 100) {
        throw new Error('Unable to generate unique activation code');
      }

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + expiryDays);

      const activationCode = {
        id: Date.now() + i,
        code,
        status: 'نشط',
        createdDate: currentDate.toISOString().split('T')[0],
        expiryDate: expiryDate.toISOString().split('T')[0],
        usedBy: null,
        usedDate: null,
        schoolLevel: schoolLevel === 'all' ? 'جميع المراحل' : schoolLevel,
        description: description || `كود تفعيل للمرحلة ${schoolLevel === 'all' ? 'جميع المراحل' : schoolLevel}`,
        createdAt: currentDate.toISOString()
      };

      newCodes.push(activationCode);
    }

    // Save to localStorage
    const allCodes = [...existingCodes, ...newCodes];
    localStorage.setItem(this.storageKey, JSON.stringify(allCodes));

    return newCodes;
  }

  // Check if code exists
  codeExists(code, codesList = null) {
    const codes = codesList || this.getAllCodes();
    return codes.some(c => c.code === code);
  }

  // Get all activation codes
  getAllCodes() {
    try {
      const codes = localStorage.getItem(this.storageKey);
      return codes ? JSON.parse(codes) : [];
    } catch (error) {
      console.error('Error loading activation codes:', error);
      return [];
    }
  }

  // Validate activation code
  async validateCode(code) {
    if (!code || code.length < 6) {
      return { isValid: false, message: 'كود التفعيل غير صحيح' };
    }

    const codes = this.getAllCodes();
    const foundCode = codes.find(c => c.code === code.toUpperCase());

    if (!foundCode) {
      return { isValid: false, message: 'كود التفعيل غير موجود' };
    }

    if (foundCode.status === 'مستخدم') {
      return { isValid: false, message: 'كود التفعيل مستخدم بالفعل' };
    }

    if (foundCode.status === 'منتهي الصلاحية') {
      return { isValid: false, message: 'كود التفعيل منتهي الصلاحية' };
    }

    // Check expiry date
    const today = new Date();
    const expiryDate = new Date(foundCode.expiryDate);
    
    if (today > expiryDate) {
      // Update status to expired
      foundCode.status = 'منتهي الصلاحية';
      this.updateCode(foundCode);
      return { isValid: false, message: 'كود التفعيل منتهي الصلاحية' };
    }

    return { 
      isValid: true, 
      message: 'كود التفعيل صحيح ومتاح للاستخدام',
      codeData: foundCode 
    };
  }

  // Use activation code
  useCode(code, userInfo) {
    const codes = this.getAllCodes();
    const codeIndex = codes.findIndex(c => c.code === code.toUpperCase());

    if (codeIndex === -1) {
      return false;
    }

    codes[codeIndex].status = 'مستخدم';
    codes[codeIndex].usedBy = userInfo.name || userInfo.email;
    codes[codeIndex].usedDate = new Date().toISOString().split('T')[0];

    localStorage.setItem(this.storageKey, JSON.stringify(codes));
    
    // Track used codes
    this.trackUsedCode(codes[codeIndex], userInfo);
    
    return true;
  }

  // Track used codes
  trackUsedCode(codeData, userInfo) {
    try {
      const usedCodes = JSON.parse(localStorage.getItem(this.usedCodesKey) || '[]');
      usedCodes.push({
        ...codeData,
        userInfo,
        usedAt: new Date().toISOString()
      });
      localStorage.setItem(this.usedCodesKey, JSON.stringify(usedCodes));
    } catch (error) {
      console.error('Error tracking used code:', error);
    }
  }

  // Update code
  updateCode(updatedCode) {
    const codes = this.getAllCodes();
    const codeIndex = codes.findIndex(c => c.id === updatedCode.id);
    
    if (codeIndex !== -1) {
      codes[codeIndex] = updatedCode;
      localStorage.setItem(this.storageKey, JSON.stringify(codes));
      return true;
    }
    
    return false;
  }

  // Delete code
  deleteCode(codeId) {
    const codes = this.getAllCodes();
    const filteredCodes = codes.filter(c => c.id !== codeId);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredCodes));
    return true;
  }

  // Get code statistics
  getCodeStatistics() {
    const codes = this.getAllCodes();
    const today = new Date();

    // Update expired codes
    codes.forEach(code => {
      if (code.status === 'نشط' && new Date(code.expiryDate) < today) {
        code.status = 'منتهي الصلاحية';
      }
    });

    // Save updated codes
    localStorage.setItem(this.storageKey, JSON.stringify(codes));

    const stats = {
      total: codes.length,
      active: codes.filter(c => c.status === 'نشط').length,
      used: codes.filter(c => c.status === 'مستخدم').length,
      expired: codes.filter(c => c.status === 'منتهي الصلاحية').length
    };

    return stats;
  }

  // Export codes to CSV format
  exportCodes() {
    const codes = this.getAllCodes();
    const csvHeader = 'الكود,الحالة,المرحلة التعليمية,تاريخ الإنشاء,تاريخ الانتهاء,المستخدم,تاريخ الاستخدام,الوصف\n';
    
    const csvContent = codes.map(code => {
      return [
        code.code,
        code.status,
        code.schoolLevel,
        code.createdDate,
        code.expiryDate,
        code.usedBy || 'غير مستخدم',
        code.usedDate || '',
        code.description || ''
      ].join(',');
    }).join('\n');

    return csvHeader + csvContent;
  }

  // Initialize with sample data if no codes exist
  initializeSampleData() {
    const existingCodes = this.getAllCodes();
    
    if (existingCodes.length === 0) {
      const sampleCodes = [
        {
          id: 1,
          code: "SP-2024-ABC123",
          status: "نشط",
          createdDate: "2024-01-15",
          expiryDate: "2024-02-15",
          usedBy: null,
          usedDate: null,
          schoolLevel: "جميع المراحل",
          description: "كود تفعيل للمدارس الجديدة",
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          code: "SP-2024-DEF456",
          status: "مستخدم",
          createdDate: "2024-01-10",
          expiryDate: "2024-02-10",
          usedBy: "أحمد محمد الأحمد",
          usedDate: "2024-01-12",
          schoolLevel: "ابتدائية",
          description: "كود خاص بالمدارس الابتدائية",
          createdAt: new Date().toISOString()
        }
      ];
      
      localStorage.setItem(this.storageKey, JSON.stringify(sampleCodes));
    }
  }
}

// Create singleton instance
const activationCodeService = new ActivationCodeService();

// Initialize sample data on first load
activationCodeService.initializeSampleData();

export default activationCodeService;