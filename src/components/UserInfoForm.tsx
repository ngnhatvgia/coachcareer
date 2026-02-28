import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { User, BookOpen, GraduationCap, MapPin, Calendar, CheckCircle, Heart, Target, Briefcase, Zap, Plus, X } from 'lucide-react';
import { isValidDate } from '../utils/dateUtils';

interface UserInfoFormProps {
  isProfileMode?: boolean;
}

const HOBBIES_LIST = [
  'Công nghệ', 'Kinh doanh', 'Nghệ thuật', 'Giúp đỡ người khác', 
  'Sáng tạo nội dung', 'Làm việc với máy móc', 'Làm việc ngoài trời',
  'Thể thao', 'Âm nhạc', 'Đọc sách', 'Du lịch', 'Nấu ăn', 'Game'
];

const SUBJECTS_LIST = [
  'Toán Học', ' Vật Lý', 'Hóa Học', 'Sinh Học', 'Ngữ Văn', 'Lịch Sử', 'Địa Lý', 'Ngoại Ngữ', 'Tin học', 'GDCD', 'Công nghệ'
];

const STRENGTHS_LIST = [
  'Giao tiếp', 'Làm việc nhóm', 'Tư duy logic', 'Sáng tạo', 
  'Lãnh đạo', 'Giải quyết vấn đề', 'Tỉ mỉ', 'Kiên nhẫn', 'Thuyết trình'
];

interface TagSelectionProps {
  label: string;
  icon: React.ElementType;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  colorTheme: 'orange' | 'blue' | 'green';
}

const TagSelection: React.FC<TagSelectionProps> = ({ 
  label, 
  icon: Icon, 
  options, 
  selected = [], 
  onToggle, 
  colorTheme 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newValue, setNewValue] = useState('');

  const themeClasses = {
    orange: {
      selected: 'bg-orange-100 border-orange-500 text-orange-700',
      hover: 'hover:border-orange-300',
      ring: 'focus:ring-orange-500',
      btn: 'bg-orange-600 hover:bg-orange-700'
    },
    blue: {
      selected: 'bg-blue-100 border-blue-500 text-blue-700',
      hover: 'hover:border-blue-300',
      ring: 'focus:ring-blue-500',
      btn: 'bg-blue-600 hover:bg-blue-700'
    },
    green: {
      selected: 'bg-green-100 border-green-500 text-green-700',
      hover: 'hover:border-green-300',
      ring: 'focus:ring-green-500',
      btn: 'bg-green-600 hover:bg-green-700'
    }
  };

  const theme = themeClasses[colorTheme];

  // Merge options with selected values to ensure custom tags are displayed
  const allTags = Array.from(new Set([...options, ...selected]));

  const handleAdd = () => {
    const trimmed = newValue.trim();
    if (trimmed) {
      if (!selected.includes(trimmed)) {
        onToggle(trimmed);
      }
      setNewValue('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewValue('');
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
        <Icon className="w-4 h-4" /> {label}
      </label>
      
      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout">
          {allTags.map(tag => {
            const isSelected = selected.includes(tag);
            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={tag}
                type="button"
                onClick={() => onToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? theme.selected
                    : `bg-white border-stone-200 text-stone-600 ${theme.hover}`
                }`}
              >
                {tag}
                {isSelected && (
                  <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>

        <motion.button
          layout
          type="button"
          onClick={() => setIsAdding(true)}
          className={`px-3 py-1.5 rounded-full text-sm border border-dashed border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-600 transition-all flex items-center gap-1 ${isAdding ? 'hidden' : ''}`}
        >
          <Plus className="w-3.5 h-3.5" /> Thêm
        </motion.button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="flex gap-2 items-center overflow-hidden"
          >
            <input
              autoFocus
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                // Optional: Auto-add on blur if content exists? 
                // Better to just let user confirm or cancel explicitly to avoid accidental adds.
                // But for better UX, let's keep it open or close if empty.
                if (!newValue.trim()) setIsAdding(false);
              }}
              placeholder="Nhập nội dung mới..."
              className={`flex-1 max-w-xs px-3 py-1.5 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 ${theme.ring}`}
            />
            <button
              type="button"
              onClick={handleAdd}
              className={`px-3 py-1.5 text-sm text-white rounded-lg shadow-sm ${theme.btn}`}
            >
              Thêm
            </button>
            <button
              type="button"
              onClick={() => { setIsAdding(false); setNewValue(''); }}
              className="p-1.5 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ isProfileMode = false }) => {
  const { userProfile, updateUserProfile, nextStep } = useApp();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!userProfile.name?.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!userProfile.grade) newErrors.grade = 'Vui lòng chọn khối lớp';
    if (!userProfile.location) newErrors.location = 'Vui lòng chọn khu vực';
    if (userProfile.birthDate && !isValidDate(userProfile.birthDate)) {
      newErrors.birthDate = 'Ngày sinh không hợp lệ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (!isProfileMode) {
        nextStep();
      } else {
        alert('Cập nhật hồ sơ thành công!');
      }
    }
  };

  const toggleSelection = (field: 'hobbies' | 'favoriteSubjects' | 'strengths', value: string) => {
    const current = userProfile[field] || [];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateUserProfile({ [field]: updated });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">{isProfileMode ? 'Hồ Sơ Của Bạn' : 'Thông tin cá nhân'}</h2>
          <p className="text-stone-600 mt-2">
            {isProfileMode ? 'Cập nhật thông tin để nhận kết quả chính xác hơn' : 'Giúp AI hiểu rõ hơn về bạn để tư vấn chính xác nhất'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Thông tin cơ bản</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <User className="w-4 h-4" /> Họ và tên
                </label>
                <input
                  type="text"
                  value={userProfile.name || ''}
                  onChange={(e) => updateUserProfile({ name: e.target.value })}
                  className={`w-full p-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all`}
                  placeholder="Nhập họ tên của bạn"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <Calendar className="w-4 h-4" /> Ngày sinh
                </label>
                <input
                  type="date"
                  value={userProfile.birthDate || ''}
                  onChange={(e) => updateUserProfile({ birthDate: e.target.value })}
                  className={`w-full p-3 rounded-xl border ${errors.birthDate ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all`}
                />
                {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <User className="w-4 h-4" /> Giới tính
                </label>
                <select
                  value={userProfile.gender || ''}
                  onChange={(e) => updateUserProfile({ gender: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <GraduationCap className="w-4 h-4" /> Khối lớp
                </label>
                <select
                  value={userProfile.grade || ''}
                  onChange={(e) => updateUserProfile({ grade: e.target.value })}
                  className={`w-full p-3 rounded-xl border ${errors.grade ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white`}
                >
                  <option value="">Chọn khối lớp</option>
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12</option>
                  <option value="university">Đại học</option>
                  <option value="other">Khác</option>
                </select>
                {errors.grade && <p className="text-red-500 text-sm">{errors.grade}</p>}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <MapPin className="w-4 h-4" /> Khu vực
                </label>
                <select
                  value={userProfile.location || ''}
                  onChange={(e) => updateUserProfile({ location: e.target.value })}
                  className={`w-full p-3 rounded-xl border ${errors.location ? 'border-red-500' : 'border-stone-200'} focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white`}
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                   <option>Hà Nội</option>
  <option>Tuyên Quang</option>
  <option>Lào Cai</option>
  <option>Thái Nguyên</option>
  <option>Phú Thọ</option>
  <option>Bắc Ninh</option>
  <option>Hưng Yên</option>
  <option>TP. Hải Phòng</option>
  <option>Ninh Bình</option>
  <option>Quảng Ninh</option>
  <option>Lai Châu</option>
  <option>Điện Biên</option>
  <option>Sơn La</option>
  <option>Lạng Sơn</option>
  <option>Cao Bằng</option>

  <option>Thanh Hóa</option>
  <option>Nghệ An</option>
  <option>Hà Tĩnh</option>
  <option>Quảng Trị</option>
  <option>TP. Huế</option>
  <option>TP. Đà Nẵng</option>
  <option>Quảng Ngãi</option>
  <option>Gia Lai</option>
  <option>Khánh Hòa</option>
  <option>Lâm Đồng</option>
  <option>Đắk Lắk</option>

  <option>TP. Hồ Chí Minh</option>
  <option>Đồng Nai</option>
  <option>Tây Ninh</option>

  <option>TP. Cần Thơ</option>
  <option>Vĩnh Long</option>
  <option>Đồng Tháp</option>
  <option>Cà Mau</option>
  <option>An Giang</option>
                  
                </select>
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>

               <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                  <BookOpen className="w-4 h-4" /> Học lực hiện tại
                </label>
                <select
                  value={userProfile.academicPerformance || ''}
                  onChange={(e) => updateUserProfile({ academicPerformance: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-white"
                >
                  <option value="">Chọn học lực</option>
                  <option value="Xuất sắc">Xuất sắc</option>
                  <option value="Giỏi">Giỏi</option>
                  <option value="Khá">Khá</option>
                  <option value="Trung bình">Trung bình</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interests & Skills Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Sở thích & Kỹ năng</h3>

            <TagSelection
              label="Sở thích (Chọn nhiều)"
              icon={Heart}
              options={HOBBIES_LIST}
              selected={userProfile.hobbies || []}
              onToggle={(val) => toggleSelection('hobbies', val)}
              colorTheme="orange"
            />

            <TagSelection
              label="Môn học yêu thích (Chọn nhiều)"
              icon={BookOpen}
              options={SUBJECTS_LIST}
              selected={userProfile.favoriteSubjects || []}
              onToggle={(val) => toggleSelection('favoriteSubjects', val)}
              colorTheme="blue"
            />

            <TagSelection
              label="Điểm mạnh bản thân (Chọn nhiều)"
              icon={Zap}
              options={STRENGTHS_LIST}
              selected={userProfile.strengths || []}
              onToggle={(val) => toggleSelection('strengths', val)}
              colorTheme="green"
            />
          </div>

          {/* Future Goals Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-stone-800 border-b pb-2">Định hướng tương lai</h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Target className="w-4 h-4" /> Điều bạn muốn đạt được trong tương lai
              </label>
              <textarea
                value={userProfile.goals || ''}
                onChange={(e) => updateUserProfile({ goals: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all min-h-[100px]"
                placeholder="Ví dụ: Trở thành lập trình viên giỏi, tự do tài chính, giúp đỡ cộng đồng..."
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
                <Briefcase className="w-4 h-4" /> Môi trường làm việc mong muốn
              </label>
              <input
                type="text"
                value={userProfile.workEnvironment || ''}
                onChange={(e) => updateUserProfile({ workEnvironment: e.target.value })}
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Ví dụ: Năng động, Sáng tạo, Ổn định, Quốc tế..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            {isProfileMode ? <CheckCircle className="w-5 h-5" /> : null}
            {isProfileMode ? 'Lưu thay đổi' : 'Tiếp tục'}
          </button>
        </form>
      </div>
    </motion.div>
  );
};
