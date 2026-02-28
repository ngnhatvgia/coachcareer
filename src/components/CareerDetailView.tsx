import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, MapPin, GraduationCap, TrendingUp, DollarSign, Brain, GitCompare, Sparkles, Loader2 } from 'lucide-react';
import { CareerDetail, getCareerDetails, compareCareers, CareerComparison } from '../services/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CareerDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const [details, setDetails] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [compareTarget, setCompareTarget] = useState('');
  const [comparisonResult, setComparisonResult] = useState<CareerComparison | null>(null);
  const [compareLoading, setCompareLoading] = useState(false);

  // Decode the ID from URL (it might be URL encoded)
  const careerTitle = id ? decodeURIComponent(id) : '';

  React.useEffect(() => {
    if (!careerTitle) return;
    const fetchDetails = async () => {
      try {
        const data = await getCareerDetails(careerTitle, userProfile);
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch career details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [careerTitle, userProfile]);

  const handleCompare = async () => {
    if (!compareTarget.trim()) return;
    setCompareLoading(true);
    try {
      const result = await compareCareers(careerTitle, compareTarget, userProfile);
      setComparisonResult(result);
    } catch (error) {
      console.error("Comparison failed", error);
    } finally {
      setCompareLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-orange-600 animate-spin mb-4" />
        <p className="text-stone-500">Đang tổng hợp thông tin chi tiết...</p>
      </div>
    );
  }

  if (!details) return <div className="text-center p-8">Không tìm thấy thông tin nghề nghiệp.</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto pb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-orange-600 mb-6 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Quay lại
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" />
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold mb-4">
            Nghề nghiệp tiềm năng
          </div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4">{details.title}</h1>
          <p className="text-lg text-stone-600 max-w-3xl">{details.overview.dailyTasks}</p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-xl border border-stone-200">
              <MapPin className="w-5 h-5 text-stone-400" />
              <span className="text-stone-700 text-sm">{details.overview.environment}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Fit Analysis */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Vì sao phù hợp với bạn?
            </h3>
            <p className="text-stone-700 leading-relaxed">{details.fitAnalysis}</p>
          </section>

          {/* Roadmap */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              Lộ trình học tập
            </h3>
            <div className="space-y-6">
              <div className="relative pl-8 border-l-2 border-stone-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
                <h4 className="font-bold text-stone-900 mb-2">Giai đoạn THPT</h4>
                <ul className="list-disc list-inside text-stone-600 text-sm space-y-1">
                  {details.roadmap.highSchool.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="relative pl-8 border-l-2 border-stone-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white" />
                <h4 className="font-bold text-stone-900 mb-2">Đại học & Chuyên ngành</h4>
                <ul className="list-disc list-inside text-stone-600 text-sm space-y-1">
                  {details.roadmap.university.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* Comparison Tool */}
          <section className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 rounded-2xl text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GitCompare className="w-6 h-6 text-orange-400" />
              So sánh nghề nghiệp
            </h3>
            <p className="text-stone-300 mb-6 text-sm">
              Phân vân giữa {details.title} và một nghề khác? Để AI giúp bạn phân tích.
            </p>
            
            {!comparing ? (
              <button 
                onClick={() => setComparing(true)}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
              >
                Bắt đầu so sánh
              </button>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Nhập tên nghề muốn so sánh (VD: Marketing)"
                    value={compareTarget}
                    onChange={(e) => setCompareTarget(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
                  />
                  <button 
                    onClick={handleCompare}
                    disabled={compareLoading || !compareTarget}
                    className="bg-orange-600 hover:bg-orange-500 disabled:bg-stone-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                  >
                    {compareLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'So sánh'}
                  </button>
                </div>

                {comparisonResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/10 rounded-xl p-6 mt-4 border border-white/10">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-bold text-orange-400 mb-1">{comparisonResult.career1.title}</h4>
                        <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: `${comparisonResult.career1.matchScore}%` }} />
                        </div>
                        <span className="text-xs text-stone-400">{comparisonResult.career1.matchScore}% phù hợp</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-400 mb-1">{comparisonResult.career2.title}</h4>
                        <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${comparisonResult.career2.matchScore}%` }} />
                        </div>
                        <span className="text-xs text-stone-400">{comparisonResult.career2.matchScore}% phù hợp</span>
                      </div>
                    </div>
                    <p className="text-sm text-stone-200 leading-relaxed mb-4">{comparisonResult.analysis}</p>
                    <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-500/30">
                      <p className="text-sm font-medium text-orange-200">💡 {comparisonResult.recommendation}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Universities */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-600" />
              Đào tạo tại
            </h4>
            {details.universities.fptCanTho && (
              <div className="mb-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <h5 className="font-bold text-orange-800 mb-1">Đại học FPT Cần Thơ</h5>
                <p className="text-xs text-stone-600">{details.universities.fptCanTho}</p>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {details.universities.others.map((uni, i) => (
                <span key={i} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-lg">{uni}</span>
              ))}
            </div>
          </div>

          {/* Income */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Mức thu nhập
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Fresher</span>
                <span className="font-bold text-stone-900">{details.incomeLevels.fresher}</span>
              </div>
              <div className="w-full h-1 bg-stone-100 rounded-full"><div className="h-full bg-emerald-200 w-1/3 rounded-full"/></div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Junior</span>
                <span className="font-bold text-stone-900">{details.incomeLevels.junior}</span>
              </div>
              <div className="w-full h-1 bg-stone-100 rounded-full"><div className="h-full bg-emerald-400 w-2/3 rounded-full"/></div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500">Senior</span>
                <span className="font-bold text-stone-900">{details.incomeLevels.senior}</span>
              </div>
              <div className="w-full h-1 bg-stone-100 rounded-full"><div className="h-full bg-emerald-600 w-full rounded-full"/></div>
            </div>
          </div>

          {/* Future Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Xu hướng tương lai
            </h4>
            <div className="space-y-4 text-sm text-stone-600">
              <div>
                <span className="font-bold text-stone-800 block mb-1">Tác động của AI:</span>
                {details.futureTrend.aiImpact}
              </div>
              <div>
                <span className="font-bold text-stone-800 block mb-1">Cơ hội phát triển:</span>
                {details.futureTrend.opportunity}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h4 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-rose-500" />
              Kỹ năng cần thiết
            </h4>
            <div className="flex flex-wrap gap-2">
              {details.requiredSkills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
