
import React from 'react';
import { SlideContent } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SlideProps {
  content: SlideContent;
}

const Slide: React.FC<SlideProps> = ({ content }) => {
  const renderContent = () => {
    switch (content.type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center slide-enter">
            <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {content.title}
            </h1>
            <p className="text-3xl text-slate-300 mb-8">{content.subtitle}</p>
            <div className="w-24 h-1 bg-blue-500 mb-8"></div>
            <p className="text-xl text-slate-400">{content.description}</p>
          </div>
        );

      case 'list':
        return (
          <div className="h-full flex flex-col slide-enter">
            <h2 className="text-4xl font-bold mb-12 border-l-8 border-blue-500 pl-6">{content.title}</h2>
            <ul className="space-y-8">
              {content.items?.map((item, idx) => (
                <li key={idx} className="flex items-start text-2xl group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold mr-4 mt-1 group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
            {content.description && (
              <p className="mt-auto text-xl text-slate-400 italic bg-slate-800/50 p-4 rounded-lg">
                {content.description}
              </p>
            )}
          </div>
        );

      case 'twocolumn':
        return (
          <div className="h-full flex flex-col slide-enter">
            <h2 className="text-4xl font-bold mb-12 border-l-8 border-blue-500 pl-6">{content.title}</h2>
            <div className="grid grid-cols-2 gap-12 flex-grow">
              <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700">
                <ul className="space-y-6">
                  {content.leftContent?.map((item, idx) => (
                    <li key={idx} className="flex items-center text-xl">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-4"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700">
                <ul className="space-y-6">
                  {content.rightContent?.map((item, idx) => (
                    <li key={idx} className="flex items-center text-xl">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-4"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {content.description && <p className="mt-8 text-xl text-center text-blue-400">{content.description}</p>}
          </div>
        );

      case 'chart':
        return (
          <div className="h-full flex flex-col slide-enter">
            <h2 className="text-4xl font-bold mb-12 border-l-8 border-blue-500 pl-6">{content.title}</h2>
            <div className="flex-grow w-full h-[400px] bg-slate-800/20 rounded-2xl p-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={content.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  />
                  <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#94a3b8' }} />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center mt-4 text-slate-500">Unit: DAU (Millions)</p>
            </div>
            {content.description && <p className="mt-8 text-xl text-center text-slate-300">{content.description}</p>}
          </div>
        );

      case 'roadmap':
        return (
          <div className="h-full flex flex-col slide-enter">
            <h2 className="text-4xl font-bold mb-12 border-l-8 border-blue-500 pl-6">{content.title}</h2>
            <div className="grid grid-cols-4 gap-4 flex-grow">
              {content.columns?.map((col, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="bg-blue-600 text-white p-4 rounded-t-xl font-bold text-center">
                    {col.title}
                  </div>
                  <div className="bg-slate-800/60 p-4 rounded-b-xl border-x border-b border-slate-700 flex-grow">
                    <ul className="space-y-4">
                      {col.items.map((item, i) => (
                        <li key={i} className="text-lg flex items-start">
                          <span className="mr-2">➔</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'conclusion':
        return (
          <div className="h-full flex flex-col items-center justify-center text-center slide-enter">
            <div className="mb-12 p-8 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-3xl border border-blue-500/30">
               <h2 className="text-5xl font-bold mb-8 italic">"{content.title}"</h2>
               <p className="text-3xl leading-relaxed text-slate-200 max-w-4xl">
                 {content.description}
               </p>
            </div>
            <div className="flex gap-4">
               <div className="px-6 py-2 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">Global</div>
               <div className="px-6 py-2 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">UGC</div>
               <div className="px-6 py-2 bg-green-500/20 rounded-full text-green-300 border border-green-500/30">Economy</div>
            </div>
          </div>
        );

      default:
        return <div>Slide type not supported</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full h-full p-12">
      {renderContent()}
    </div>
  );
};

export default Slide;
